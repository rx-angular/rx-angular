import { NgModule } from '@angular/core';

import { RxLet } from './rx-let.directive';

/** @deprecated use the standalone import, will be removed with v16 */
@NgModule({
  imports: [RxLet],
  exports: [RxLet],
})
export class LetModule {}
