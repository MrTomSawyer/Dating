import { IUser } from "../../../src/database/user.model";

export interface ISignIn {
  token: string,
  user: Partial<IUser>
}
