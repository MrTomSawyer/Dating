import { Document, model, Schema, SchemaOptions } from 'mongoose';
import { UserRoles, UserGender, SexualPreferance } from '../../shared/enums/userEnums';
import { ISubscription } from './subscription.model';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IBan } from './ban.model';

/**
 * @typedef UserCreateRequest
 * @property {string} name - User name - eg: Vasya Gorkin
 * @property {string} email - User email - eg: vasyag@gmail.com
 * @property {string} password - User password - eg: hothothot123
 * @property {string} phone - User phone number - eg: +79991005510
 * @property {string} gender - User gender - eg: MALE
 * @property {string} sexualPreferance - User sexual preferance - eg: GAY
 * @property {string} description - Account description - eg: Handsome vue developer
 */
/**
 * @typedef CreatedUser
 * @property {string} name - User name - eg: Vasya Gorkin
 * @property {string} email - User email - eg: vasyag@gmail.com
 * @property {string} phone - User phone number - eg: +79991005510
 * @property {string} gender - User gender - eg: MAN
 * @property {string} role - User gender - eg: USER
 * @property {string} sexualPreferance - User sexual preferance - eg: GAY
 * @property {string} description - Account description - eg: Handsome vue developer
 * @property {boolean} isBanned - If current account is banned or not - eg: false
 */
/**
 * @typedef User
 * @property {string} name - User name - eg: Vasya Gorkin
 * @property {string} email - User email - eg: vasyag@gmail.com
 * @property {string} phone - User phone number - eg: +79991005510
 * @property {string} gender - User gender - eg: GAY
 * @property {string} role - User gender - eg: USER
 * @property {string} sexualPreferance - User sexual preferance - eg: MAN
 * @property {Subscription.model} subscription - Subscription data
 * @property {string} description - Account description - eg: Handsome vue developer
 * @property {string} accessToken - Current access token
 * @property {boolean} isBanned - If current account is banned or not - eg: false
 * @property {Ban.model} banData - Ban details
 */

const userSchemaOptions: SchemaOptions = {
  toJSON: {
    transform: (doc, ret, options) => {
      delete ret.password
      return ret
    }
  }
}

const UserSchema = new Schema({
  name: {
    type: String,
    min: 1,
    max: 30,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 40,
    validate: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  phone: {
    type: String,
    max: 15
  },
  gender: {
    type: String,
    enum: Object.values(UserGender)
  },
  sexualPreferance: {
    type: String,
    enum: Object.values(SexualPreferance)
  },
  password: {
    type: String,
    required: true,
    max: 40
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(UserRoles),
    default: UserRoles.USER
  },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  description: {
    type: String,
    max: 500
  },
  accessToken: {
    type: String
  },
  isBanned: {
    type: Boolean,
    required: true,
    default: false
  },
  banData: {
    type: Schema.Types.ObjectId,
    ref: 'Ban' 
  }
}, userSchemaOptions)
UserSchema.plugin(mongoosePaginate)

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  gender?: UserGender;
  sexualPreferance?: SexualPreferance;
  password: string;
  role: UserRoles;
  subscription?: ISubscription;
  description?: string;
  isBanned?: boolean;
  banData?: IBan;
}

export default model<IUser>('User', UserSchema);
