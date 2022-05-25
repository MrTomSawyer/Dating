import { Document, model, Schema } from 'mongoose';
import { IUser } from './user.model';

/**
 * @typedef SubscriptionCreateRequest
 * @property {string} startDate - Date of subscription start, unix time - eg: 1652721839
 * @property {user} user - Subscribed user id - eg: 62766a1a6d068f2471997584
 * @property {paymentInfo} paymentInfo - Payment info
 * @property {string} grantedBy - id of a user, who granted a subscription (in case one has not been purchased) - eg: 62766a1a6d068f2471997584
 * @property {string} promoCode - Promocode - eg: QURE-905432
 */
/**
 * @typedef paymentInfo
 * @property {string} cardNumber - last 4 numbers of a debit card - eg: 1488
 * @property {string} cost - Amount of money paid, rub - eg: 500
 * @property {string} purchaseDate - Date of purchase, unix time - eg: 1652721839
 */
/**
 * @typedef Subscription
 * @property {string} startDate - Date of subscription start, unix time - eg: 1652721839
 * @property {string} endDate - Subscription expiration date, unix time - eg: 1652721840
 * @property {user} user - Subscribed user id - eg: 62766a1a6d068f2471997584
 * @property {paymentInfo.model} paymentInfo - Payment info
 * @property {string} grantedBy - id of a user, who granted a subscription (in case one has not been purchased) - eg: 62766a1a6d068f2471997584
 * @property {string} promoCode - Promocode - eg: QURE-905432
 */

const SubscriptionSchema = new Schema({
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentInfo: {
    cardNumber: {
      type: String, 
      required: true
    },
    cost: {
      type: String, 
      required: true
    },
    purchaseDate: {
      type: String, 
      required: true
    }
  },
  grantedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  promoCode: {
    type: String
  }
})

export interface ISubscription extends Document {
  startDate: number;
  endDate: number;
  user: Partial<IUser>;
  grantedBy: Partial<IUser>;
  promoCode?: string;
  paymentInfo: {
    cardNumber: string;
    cost: string;
    purchaseDate: string;
  }
}

export default model<ISubscription>('Subscription', SubscriptionSchema);
