import { ErrorHandler } from '@angular/core';

/** @internal **/
export type RxRenderError<T> = [Error, T];

/** @internal **/
export type RxRenderErrorFactory<T, E> = (
  error: Error,
  value: T
) => RxRenderError<E>;

/** @internal **/
export function isRxRenderError<T>(e: any): e is RxRenderError<T> {
  return (
    e != null && Array.isArray(e) && e.length === 2 && e[0] instanceof Error
  );
}

/** @internal **/
export function createErrorHandler(
  _handler?: ErrorHandler
): ErrorHandler {
  const _handleError = _handler
    ? (e) => _handler.handleError(e)
    : console.error;
  return {
    handleError: (error) => {
      if (isRxRenderError(error)) {
        _handleError(error[0]);
        console.error('additionalErrorContext', error[1]);
      } else {
        _handleError(error);
      }
    },
  };
}

/** @internal **/
export function toRenderError<T>(e: Error, context: T): RxRenderError<T> {
  return [e, context];
}
