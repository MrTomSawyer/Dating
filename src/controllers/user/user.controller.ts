import * as express from 'express';
import { cookieOptions } from '../../../server-configs/server.options';
import {Routes} from '../../api-routes/routes';
import { UserService } from './user.service';

const router = express.Router();



/**
 * Gets all users
 * @route GET /users
 * @group User - Operations about user
 * @returns {User[]} 200 - List of users
 * @returns {AppErrorResponse.model} 500 - App error
 */
router.get(Routes.USERS, (req, res) =>
  UserService.getAll()
    .then(data => res.status(200).send(data))
);

/**
 * Creates a new user
 * @route POST /user/signup
 * @group User - Operations about user
 * @param {UserCreateRequest.model} UserCreateRequest.body.required - User signup data
 * @returns {CreatedUser.model} 201 - created User
 * @returns {AppErrorResponse.model} 500 - App error
 */
router.post(`${Routes.USER}/signup`, (req, res) =>
  UserService.signUp(req.body)
    .then(data => res.status(201).send(data))
);

/**
 * Sings a user in
 * @route POST /user/signin
 * @group User - Operations about user
 * @returns {string} 201 - Auth token
 * @returns {AppErrorResponse.model} 500 - App error
 */
router.post(`${Routes.USER}/signin`, (req, res) => {
  UserService.signIn(req.body)
    .then(data => {
      res.cookie('authorization', data.token, cookieOptions)
      res.status(200).send(data.user)
    })
})

/**
 * Updates a user
 * @route POST /user/update
 * @group User - Operations about user
 * @returns {string} 200 - Updated user
 * @returns {AppErrorResponse.model} 500 - App error
 */
router.patch(`${Routes.USER}/update`, (req, res) =>
  UserService.updateUser(req.body, res.locals.user)
    .then(data => res.status(200).send(data))
);

module.exports = router;
