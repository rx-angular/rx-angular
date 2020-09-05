import { NextObserver } from 'rxjs';

export interface RxViewContext<T> {
  // to enable `let` syntax we have to use $implicit (var; let v = var)
  $implicit: T;
  // set context var complete to true (var$; let e = $error)
  $error: false | Error;
  // set context var complete to true (var$; let c = $complete)
  $complete: boolean;
  // set context var suspense to true (var$; let c = $suspense)
  $suspense: boolean;
}

/**
 * @description
 *
 * Callbacks for the templates main states: suspense, next, error, complete
 */
export interface RxTemplateObserver<T> extends NextObserver<T> {
  suspense?: () => void;
}
