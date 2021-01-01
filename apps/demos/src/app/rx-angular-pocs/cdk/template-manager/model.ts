export type rxBaseTemplateNames = 'rxError' | 'rxComplete' | 'rxSuspense';

export enum RxBaseTemplateNames {
  error = 'rxError',
  complete = 'rxComplete',
  suspense = 'rxSuspense'
}

export interface RxViewContext<T> {
  // to enable `let` syntax we have to use $implicit (var; let v = var)
  $implicit: T;
  // set context var complete to true (var$; let e = $error)
  $error: false | Error;
  // set context var complete to true (var$; let c = $complete)
  $complete: boolean;
  // set context var suspense to true (var$; let s = $suspense)
  $suspense: any;
}
