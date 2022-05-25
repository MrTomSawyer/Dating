import * as mongoose from 'mongoose';
import * as log4js from 'log4js';

export class MongoConnectionService {

  static async connect(mongoUrl: string, logger: log4js.Logger, attempts: number = 5): Promise<void> {

    let attempt = 1;
    while (attempt <= attempts) {
      try {
        await mongoose.connect(mongoUrl);
        break;
      } catch (err) {
        const errorMessage = `Attempt ${attempt}: Unable to connect to mongo: ${err.message}`;
        if (attempt === attempts) {
          throw new Error(errorMessage);
        } else {
          logger.warn(errorMessage);
        }
        attempt++;
      }
    }
  }
}
