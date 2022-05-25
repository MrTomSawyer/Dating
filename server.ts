import 'express-async-errors';
import * as commander from 'commander';
import { AppConfiguration } from './configs/Application.config';
import { ServerConfig } from './server-configs/server.config';
import { ServerConstants } from './server-configs/server.constants';
import ServerDefaults from './server-configs/server.defaults';
import ServerRoutes from './server-configs/server.routes';
import { ServiceRunner } from './server-configs/service.runner';
import { LoggerService } from './shared/services/LoggerService';

commander
  .description('Qure backend')
  .option('-p, --port <port>',
    `Express port. Default: ${ServerConstants.DEVELOPMENT_PORT}`,
    `${ServerConstants.DEVELOPMENT_PORT}`
  )
commander.program.parse(process.argv);

const initServer = async () => {
  AppConfiguration.initConfiguration()
  LoggerService.init(AppConfiguration.appName);

  LoggerService.appLogger.info('-------------------------------------');
  LoggerService.appLogger.info('-------------------------------------');
  LoggerService.appLogger.info(`Starting application on '${AppConfiguration.env}' environment`);
  LoggerService.appLogger.info('-------------------------------------');
  LoggerService.appLogger.info('-------------------------------------');
  
  const port = commander.port;
  ServerConfig.init()
  ServerDefaults.setGeneralHandling(AppConfiguration.env, ServerConfig.app, AppConfiguration.apiPrefix);
  ServerRoutes.configureRoutes(ServerConfig.app);
  ServerDefaults.setGlobalErrorHandling(ServerConfig.app);
  ServerDefaults.setHostAndPort(ServerConfig.app, port);
  ServerDefaults.enableSwagger(ServerConfig.app);
  
  await ServiceRunner.run();
  
  ServerConfig.app.listen(port, () => {
    LoggerService.appLogger.info(`REST API can be reached by ${ServerDefaults.host}:${port}`);
  })
}

initServer()