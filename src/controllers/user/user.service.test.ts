import { expect, should } from 'chai';
import 'mocha';
import { AppConfiguration } from '../../../configs/Application.config';
import { Environment } from '../../../shared/enums';
import { serverMessages } from '../../../shared/enums/serverMessages';
import { UserRoles } from '../../../shared/enums/userEnums';
import { LoggerService } from "../../../shared/services/LoggerService";
import { MongoConnectionService } from '../../../shared/services/MongoConnectionService';
import User, { IUser } from "../../database/user.model"
import { UserService } from './user.service';

LoggerService.init('qure-backend');

const user = {
  email: 'vandarkholme@gachimuchi.com',
  password: 'password',
  name: 'Van Darkholme',
  role: UserRoles.ADMIN
}

let sessionUser: IUser

describe('User', () => {
  before(async () => {
    AppConfiguration.env = Environment.DEVELOPMENT;
    AppConfiguration.initConfiguration();
    await MongoConnectionService.connect(AppConfiguration.mongoTestUrl, LoggerService.appLogger);

    await User.deleteMany({});
  })
  afterEach(async () => {
    await User.deleteMany({})
  })
  after(async () => {
  })

  it('Registers a user', async () => {
    const newUser = await UserService.signUp(user)
    expect(newUser).to.have.property('_id')
    expect(newUser).to.not.have.own.property('subscription')
  })

  it('Disallows to set ADMIN role on creation/update', async () => {
    const newUser = await UserService.signUp(user)
    expect(newUser.role).not.eq(UserRoles.ADMIN)
    sessionUser = newUser
    const updateUser = await UserService.updateUser(newUser, sessionUser)
    expect(updateUser.role).not.eq(UserRoles.ADMIN)
  })

  it('Deletes a user', async () => {
    const newUser = await UserService.signUp(user)
    sessionUser._id = newUser._id
    await UserService.deleteUser(newUser._id, sessionUser)
    const deletedUser = await User.find({_id: newUser._id})
    expect(deletedUser).to.not.have.own.property('_id')
  })

  it('Rejects incorrect user password', async () => {
    await UserService.signUp(user)
    try {
      await UserService.signIn({login: user.email, password: 'wrong_password'})
    } catch (error) {
      expect(error.message).to.eq(serverMessages.WRONG_EMAIL_OR_PASSWORD)
    }
  })
})