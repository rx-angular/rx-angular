import { ILogger, LogLevel, LogLevelString } from '@rx-angular/isr/models';

/**
 * Logger class for ISR package
 * @internal
 */
export class ISRLogger implements ILogger {
  private currentLogLevel: LogLevel;

  constructor(
    private showLogs: boolean,
    private logLevel?: LogLevelString,
  ) {
    // Default to INFO level, if not specified
    const logLevelName = (logLevel || 'INFO').toUpperCase() as LogLevelString;
    this.currentLogLevel = LogLevel[logLevelName] || LogLevel.INFO;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.currentLogLevel && this.showLogs;
  }

  debug(message: string, ...params: unknown[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(message, ...params);
    }
  }

  info(message: string, ...params: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(message, ...params);
    }
  }

  warn(message: string, ...params: unknown[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(message, ...params);
    }
  }

  error(message: string, ...params: unknown[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(message, ...params);
    }
  }
}
