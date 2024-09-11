export interface ILogger {
  debug(message: string, ...optionalParams: unknown[]): void;
  info(message: string, ...optionalParams: unknown[]): void;
  warn(message: string, ...optionalParams: unknown[]): void;
  error(message: string, ...optionalParams: unknown[]): void;
}

export enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

export type LogLevelString = keyof typeof LogLevel;
