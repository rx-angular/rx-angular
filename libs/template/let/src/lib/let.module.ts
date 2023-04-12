import { NgModule } from '@angular/core';

import { LetDirective } from './let.directive';

/** @deprecated use the standalone import, will be removed with v16 */
@NgModule({
  imports: [LetDirective],
  exports: [LetDirective],
})
export class LetModule {}
