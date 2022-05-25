import * as express from 'express';
import {Routes} from '../../api-routes/routes';
import { SubscriptionService } from './subscription.service';

const router = express.Router();

/**
 * Creates a subscription
 * @route POST /subscription/create
 * @group Subscription - Operations about subscriptions
 * @param {SubscriptionCreateRequest.model} subscription.body.required - subscription data
 * @param {string} duration.body- amount of months subscribed (1 by default)
 * @returns {Subscription.model} 201 - created Subscription
 * @returns {AppErrorResponse.model} 500 - App error
 */
router.post(`${Routes.SUBSCRIPTION}/create`, (req, res) => {
  const {subscription, duration} = req.body
  SubscriptionService.create(subscription, duration)
    .then(data => res.status(201).send(data))
}
);

module.exports = router
