import { RxViewContext } from '@rx-angular/cdk/template';

export interface RxIfViewContext extends RxViewContext<boolean> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxIf: boolean;
}
