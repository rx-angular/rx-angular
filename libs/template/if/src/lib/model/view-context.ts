import { RxViewContext } from '@rx-angular/cdk/template';

export interface RxIfViewContext<T = unknown> extends RxViewContext<T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxIf: T;
  $implicit: T;
}
