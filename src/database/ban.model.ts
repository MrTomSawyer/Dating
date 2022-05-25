import { model, Schema } from "mongoose";

/**
 * @typedef Ban
 * @property {string} bannedBy - moderator or admin id who banned- eg: 62766a1a6d068f2471997584
 * @property {string} banDate - Ban date, unix time - eg: 1652721839
 * @property {boolean} isPermanent - If a ban ever expires or not
 * @property {string} expirationDate - Expiration date, unix time - eg: 1652721839
 * @property {string} comment - Ban reason
 */

const banSchema = new Schema({
  bannedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  banDate: {
    type: Number,
    required: true,
    default: 0
  },
  isPermanent: {
    type: Boolean,
    required: true,
    default: false
  },
  expirationDate: {
    type: Number,
    required: true,
    default: 0
  },
  comment: {
    type: String,
    default: ''
  }
})

export interface IBan extends Document {
  _id: string;
  bannedBy: string;
  banDate: number;
  isPermanent: boolean;
  expirationDate: number;
  comment: string;
}

export default model<IBan>('Ban', banSchema);
