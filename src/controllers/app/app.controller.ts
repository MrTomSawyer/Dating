import * as express from 'express';
import { AppConfiguration } from '../../../configs/Application.config';
import {Routes} from '../../api-routes/routes';

const router = express.Router();

/**
 * Gets api version
 * @route GET /version
 * @group App - Operations about app
 * @returns {string} 200 - Api version
 */
router.get(Routes.VERSION, (req, res) =>
  res.status(200).send(AppConfiguration.appVersion)
);

/**
 * Gets api health
 * @route GET /health
 * @group App - Operations about app
 * @returns {string} 204 - Api health
 */
router.get(Routes.HEALTH, (req, res) =>
  res.status(200).send()
);

module.exports = router;
