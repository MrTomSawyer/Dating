import { AppConfiguration } from "../configs/Application.config";
import { LoggerService } from "../shared/services/LoggerService";
import { MongoConnectionService } from "../shared/services/MongoConnectionService";

const ServiceRunner = {
  run: async () => {
    await MongoConnectionService.connect(AppConfiguration.mongoUrl, LoggerService.appLogger);
  }
}

export { ServiceRunner };