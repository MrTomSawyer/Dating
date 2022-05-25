import * as log4js from 'log4js';
import {Application} from 'express';

export class LoggerService {
  static expressLogger: log4js.Logger;
  static appLogger: log4js.Logger;
  static auditLogger: log4js.Logger;

  private static logAppenders = {
    console: {
      type: 'console'
    }
  };
  private static logCategories = {
    default: {
      appenders: ['console'],
      level: 'info'
    },
    audit: {
      appenders: ['console'],
      level: 'info'
    }
  };

  static init(appLoggerName: string, appLoggerLevel: string = 'info') {
    LoggerService.logCategories[appLoggerName] = {
      appenders: ['console'],
      level: appLoggerLevel
    };

    log4js.configure({
      appenders: LoggerService.logAppenders,
      categories: LoggerService.logCategories
    });

    LoggerService.expressLogger = log4js.getLogger('expressLogger');
    LoggerService.appLogger = log4js.getLogger(appLoggerName);
    LoggerService.auditLogger = log4js.getLogger('audit');
  }

  static enableExpressLoggerForApplication(app: Application) {
    app.use(log4js.connectLogger(LoggerService.expressLogger, {level: 'auto', nolog: '\\/api/health'}));
  }
}
