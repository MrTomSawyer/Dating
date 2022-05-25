import { AppConfiguration } from '../configs/Application.config';
import { LoggerService } from '../shared/services/LoggerService';
import { Util } from '../shared/Util';


const ServerRoutes = {
  configureRoutes: app => {
    const allControllers = Util.findControllerFiles('src/controllers/', []);
    if (allControllers.length === 0) {
      LoggerService.appLogger.error(`No controller files found.`);
    }
    allControllers.forEach(controllerPath => {
      LoggerService.appLogger.info(`Register controller ${controllerPath}`);
      const controller = require(controllerPath);
      let prefix = '';
      let router = controller;
      if (typeof controller === 'object') {
        prefix += controller.prefix;
        router = controller.router;
      }
      app.use(prefix, router);
    });
  }
};

export default ServerRoutes;
