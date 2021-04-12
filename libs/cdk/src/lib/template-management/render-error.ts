import { ErrorHandler } from '@angular/core';

export type RxRenderError<T> = [Error, T];

export type RxRenderErrorFactory<T, E> = (error: Error, value: T) => RxRenderError<E>;

export function isRxRenderError<T>(e: any): e is RxRenderError<T> {
  return e != null && Array.isArray(e);
}

export function createDefaultErrorHandler(
  _handler?: ErrorHandler
): ErrorHandler {
  const _handleError = _handler ? e => _handler.handleError(e) : console.error;
  return {
    handleError: error => {
      if (isRxRenderError(error)) {
        _handleError(error[0]);
        console.error('additionalErrorContext', error[1]);
      } else {
        _handleError(error);
      }
    }
  }
}

export function toRenderError<T>(e: Error, context: T): RxRenderError<T> {
  return [e, context];
}
