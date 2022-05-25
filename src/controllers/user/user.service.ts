import { IUser } from "../../database/user.model";
import User from '../../database/user.model'
import { UserRoles } from "../../../shared/enums/userEnums";
import ErrorService from "../../../shared/services/ErrorService";
import { JwtAuthService } from "../../../shared/services/JwtAuthService";
import { ISignIn } from "../../../shared/interfaces/response/ISignIn";
import { serverMessages } from "../../../shared/enums/serverMessages";
import Ban, { IBan } from "../../database/ban.model";

export class UserService {

  static async getAll(): Promise<IUser[]> {
    return await User.find({})
  }

  static async signUp(user: Partial<IUser>): Promise<IUser> {
    const {email, password, sexualPreferance, gender, name } = user
    const newUser = {
      role: UserRoles.USER,
      email,
      password,
      sexualPreferance,
      gender,
      name
    }
    return await new User(newUser).save()
  }

  static async signIn({ login, password }: { login: string, password: string }): Promise<ISignIn> {
    const user = await User.findOne({email: login})
    const isSamePassword = user?.password === password

    if (!user || !isSamePassword) {
      ErrorService.throwError(
        UserService.name,
        serverMessages.WRONG_EMAIL_OR_PASSWORD,
        500
      );
    }
    delete user.password

    return {
      token: JwtAuthService.createToken(user),
      user
    }
  }

  static async updateUser(user: Partial<IUser>, sessionUser: IUser): Promise<IUser> {
    if (sessionUser._id !== user._id) {
      ErrorService.throwError(
        UserService.name,
        serverMessages.INSUFFICIENT_ACCESS_RIGHTS,
        401
      );
    }
    return await User.findByIdAndUpdate(user._id, user, {new: true})
  }

  static async deleteUser(id: string, sessionUser: IUser): Promise<void> {
    if (sessionUser._id !== id) {
      ErrorService.throwError(
        UserService.name,
        serverMessages.INSUFFICIENT_ACCESS_RIGHTS,
        401
      );
    }
    await User.findByIdAndDelete(id)
  }

  static async banUser(data: Partial<IBan>, id: string, duration?: number): Promise<void> {
    data.banDate = Date.now()
    if (duration) {
      data.expirationDate = data.banDate + duration
    }
    const banData = await Ban.create(data)
    const userToUpdate = {
      isBanned: true,
      banData
    }
    return await User.findByIdAndUpdate(id, userToUpdate, {new: true})
  }
} 