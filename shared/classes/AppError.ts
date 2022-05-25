import { Severity } from "../enums";

/**
 * @typedef AppErrorResponse
 * @property {AppErrorResponseItem[]} errors.required - Error messages
 */
/**
 * @typedef AppErrorResponseItem
 * @property {string} msg.required - Error message - eg: Internal server error
 */
export class AppError extends Error {
  public errorCode: number;
  public source: string;
  public severity: Severity;

  constructor(message: string, errorCode: number, source: string = '', severity: Severity = Severity.ERROR) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.source = source
    this.severity = severity
  }
}
