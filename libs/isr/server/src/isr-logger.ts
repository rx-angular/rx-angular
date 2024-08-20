/**
 * Logger class for ISR package
 * @internal
 */
export class ISRLogger {
  constructor(private showLogs: boolean) {}

  /**
   * Log a message to the console
   * @param message The message to log
   * @param optionalParams Optional parameters to log
   * @internal
   */
  log(message?: string, ...optionalParams: unknown[]): void {
    this.showLogs && console.log(message, ...optionalParams);
  }
}
