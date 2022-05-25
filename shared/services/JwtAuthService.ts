import * as jwt from 'jsonwebtoken'
import { AppConfiguration } from '../../configs/Application.config';
import { IUser } from '../../src/database/user.model';
import { serverMessages } from '../enums/serverMessages';
import { UserRoles } from '../enums/userEnums';
import ErrorService from './ErrorService';

export class JwtAuthService {
  private static openUrls;
  private static adminOnlyUrls;
  private static jwtKey;

  static init(openUrls, adminOnlyUrls) {
    JwtAuthService.openUrls = openUrls
    JwtAuthService.adminOnlyUrls = adminOnlyUrls
    JwtAuthService.jwtKey = AppConfiguration.jwtKey
  }

  static createToken(payload, options = {}): string {
    return jwt.sign(payload, JwtAuthService.jwtKey, options)
  }

  private static decodeToken(token: string): IUser {
    try {
      return jwt.verify(token, JwtAuthService.jwtKey)
    } catch (error) {
      ErrorService.throwError(JwtAuthService.name, `${serverMessages.AUTHENTICATION_ERROR}: ${error.message}`, 401)
    }
  }

  private static noAuth(method: string, path: string): boolean {
    return JwtAuthService.openUrls[method].some(urlRegExp => urlRegExp.test(path))
  }

  private static adminOnly(method: string, path: string): boolean {
    return JwtAuthService.adminOnlyUrls[method].some(url => url === path)
  }


  static handleRequest(req, res, next) {
    const { path, method } = req

    if (JwtAuthService.noAuth(method, path)) {
      return next()
    }

    let authorization
    try {
      authorization = req.cookies.authorization
    } catch (error) {
      ErrorService.throwError(JwtAuthService.name, serverMessages.MISSING_AUTHENTICATION, 401);
    }

    res.locals.user = JwtAuthService.decodeToken(authorization)

    if (res.locals.user?.isBanned) {
      ErrorService.throwError(JwtAuthService.name, serverMessages.ACCOUNT_BANNED, 403);
    }

    if (JwtAuthService.adminOnly(method, path)) {
      if(res.locals.user.role === UserRoles.ADMIN) {
        return next()
      }
      ErrorService.throwError(JwtAuthService.name, serverMessages.ADMIN_RIGHTS_REQUIRED, 401);
    }  

    next()
  }
}
