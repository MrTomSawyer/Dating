import { AppError } from "../classes/AppError";
import { Severity } from "../enums";

export default class ErrorService {

  public static generateError(source: string, message: string, errorCode: number, severity: Severity = Severity.ERROR): AppError {
    return new AppError(message, errorCode, source, severity)
  }

  public static throwError(source: string, message: string, errorCode: number, severity: Severity = Severity.ERROR) {
    throw ErrorService.generateError(source, message, errorCode, severity)
  }
}
