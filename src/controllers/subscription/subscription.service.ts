import { ISubscription } from "../../database/subscription.model";
import Subscription from "../../database/subscription.model";
import { ServerConstants } from "../../../server-configs/server.constants";
import ErrorService from "../../../shared/services/ErrorService";
import { serverMessages } from "../../../shared/enums/serverMessages";

export class SubscriptionService {

  static async create(subscription: Partial<ISubscription>, duration: number = 1): Promise<ISubscription> {
    if (duration < 1 || !Number.isInteger(duration)) {
      ErrorService.throwError(SubscriptionService.name, serverMessages.INCORRECT_DURATION, 400)
    }
    subscription.startDate = Date.now()
    subscription.endDate = subscription.startDate + (duration * ServerConstants.MONTH_MILISECONDS)
    return await Subscription.create(subscription)
  }

  static async updateSubscription(subscription: Partial<ISubscription>, id: string): Promise<ISubscription> {
    return await Subscription.findByIdAndUpdate(id, subscription)
  }

  static async deleteSubscription(id: string): Promise<ISubscription> {
    return await Subscription.findByIdAndDelete(id)
  }
}