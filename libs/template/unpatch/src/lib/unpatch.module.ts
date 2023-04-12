import { NgModule } from '@angular/core';

import { UnpatchDirective } from './unpatch.directive';

/** @deprecated use the standalone import, will be removed with v16 */
@NgModule({
  imports: [UnpatchDirective],
  exports: [UnpatchDirective],
})
export class UnpatchModule {}
