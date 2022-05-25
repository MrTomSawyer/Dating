import * as express from "express"
import { JwtAuthService } from "../shared/services/JwtAuthService"
import { Routes } from "../src/api-routes/routes"
import { ServerConstants } from "./server.constants"
import * as cookieParser from 'cookie-parser'

export const ServerConfig = {
  app: null,
  init: () => {
    ServerConfig.app = express()

    ServerConfig.app.use(express.json({limit: ServerConstants.MAX_REQUEST_SIZE}))
    ServerConfig.app.use(express.urlencoded({limit: ServerConstants.MAX_REQUEST_SIZE, extended: true}))
    ServerConfig.app.use(cookieParser())

    const openUrls = {
      'GET': [new RegExp(Routes.HEALTH), new RegExp(Routes.VERSION), new RegExp(`${Routes.API_DOCS}`)],
      'POST': [new RegExp(`${Routes.USER}/signup`), new RegExp(`${Routes.USER}/signin`)],
      'PATCH': [],
      'PUT': [],
      'DELETE': []
    }
    const adminOnlyUrls = {
      'GET': [new RegExp(Routes.SUBSCRIPTION), new RegExp(Routes.SUBSCRIPTIONS)],
      'POST': [new RegExp(`${Routes.SUBSCRIPTION}/create`)],
      'PATCH': [],
      'PUT': [],
      'DELETE': []
    }

    JwtAuthService.init(openUrls, adminOnlyUrls)
    ServerConfig.app.use(JwtAuthService.handleRequest)
  }
}

