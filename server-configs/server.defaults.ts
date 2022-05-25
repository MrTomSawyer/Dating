import { Application } from "express";
import { AppError } from "../shared/classes/AppError";
import { Environment, Severity } from "../shared/enums";
import { LoggerService } from "../shared/services/LoggerService";
import { ServerConstants } from "./server.constants";
import * as expressSwagger from 'express-swagger-generator'

const ServerDefaults = {

  setGeneralHandling: (env: Environment, app: Application, apiPrefix: string) => {
    ServerDefaults.setContentTypeChecking(app);
    ServerDefaults.setAuditLoggerHandling(app);
  },

  setContentTypeChecking: (app: Application) => {
    app.use((req, res, next) => {
      if ((req.method === 'POST' || req.method === 'PUT') && !req.is('application/json')) {
        LoggerService.appLogger.error(`Unsupported 'content-type' detected. Request rejected.`);
        return res.sendStatus(415);
      }
      next();
    });
  },

  setGlobalErrorHandling: (app: Application) => {
    app.use((err, req, res, next) => {
      let errorCode = 500;
      let severity: Severity = Severity.ERROR;
      if (err instanceof AppError) {
        errorCode = err.errorCode;
        severity = err.severity;
      }

      let errorHandler = (message: string) => LoggerService.appLogger.error(message);
      if (severity === Severity.CRITICAL) {
        errorHandler = (message: string) => LoggerService.appLogger.fatal(message);
      }

      errorHandler(`${err.source}: ${err.errorCode} – ${err.message}`);
      if (!err.source) {
        errorHandler(err.stack);
      }
      res.status(errorCode).json({errors: [{msg: err.message ? err.message : err}]});
      next();
    });
  },

  setAuditLoggerHandling: (app: Application) => {
    app.use((req, res, next) => {
      const method = req.method;
      if (method !== 'GET') {
        LoggerService.auditLogger.info(`Method ${method}, Path: ${req.path}, Params: ${JSON.stringify(req.params)}`);
      }
      next();
    });
  },

  enableSwagger: (app: Application) => {
    const swagger = expressSwagger(app)
    let options = {
      swaggerDefinition: {
          info: {
              description: 'This is a sample server',
              title: 'Swagger',
              version: '1.0.0',
          },
          host: 'localhost:3002',
          basePath: '',
          produces: [
              "application/json",
              "application/xml"
          ],
          schemes: ['http', 'https'],
          securityDefinitions: {
              JWT: {
                  type: 'apiKey',
                  in: 'header',
                  name: 'Authorization',
                  description: "",
              },
              basicAuth: {
                type: 'basic'
              }
          }
      },
      basedir: __dirname,
      files: [
        '../src/controllers/**/*.controller{.notenant,}.{js,ts}',
        '../src/database/**/*.model.{js,ts}',
        '../shared/interfaces/**/**/*.{js,ts}',
        '../shared/classes/AppError.{js,ts}'
      ]
  };
  swagger(options)
},

  port: null,
  host: '',

  setHostAndPort: (app: Application, port: number) => {
    ServerDefaults.port = port;
    ServerDefaults.host = ServerConstants.DEVELOPMENT_HOST;
    //@ts-ignore
    app.set('host', this.host);
    //@ts-ignore
    app.set('port', this.port);
  }
};

export default ServerDefaults;
