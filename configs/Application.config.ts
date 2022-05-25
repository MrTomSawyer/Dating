import { Environment } from "../shared/enums";
import * as packageData from '../package.json';

export const AppConfiguration = {
  initConfiguration() {
    const env = process.env.NODE_ENV as Environment || Environment.DEVELOPMENT;
    const isDevelopment = env === Environment.DEVELOPMENT

    AppConfiguration.env = env;
    AppConfiguration.mongoUrl = isDevelopment ?
    'mongodb://localhost:27017/qure' : process.env.MONGO_DB_URL;
    AppConfiguration.mongoTestUrl = 'mongodb://localhost:27017/qure-unit'
    AppConfiguration.appName = isDevelopment ? packageData.name : process.env.APP_NAME;
    AppConfiguration.apiPrefix = isDevelopment ? '/qure-backend/api' : process.env.API_PREFIX;
    AppConfiguration.appVersion = isDevelopment ? packageData.version : process.env.VERSION;

    AppConfiguration.emailHost = isDevelopment ? 'smtp.ethereal.email' : process.env.EMAIL_HOST;
    AppConfiguration.emailPort = isDevelopment ? '587' : process.env.EMAIL_PORT;
    AppConfiguration.fromEmail = isDevelopment ? 'test@no-reply.ru' : process.env.FROM_EMAIL;

    AppConfiguration.jwtKey = isDevelopment ? 'secret-key' : process.env.JWT_KEY;
  },

  env: '' as Environment,
  mongoUrl: '',
  mongoTestUrl: '',
  appName: '',
  apiPrefix: '',
  appVersion: '',
  emailHost: '',
  emailPort: '',
  fromEmail: '',
  jwtKey: ''
}