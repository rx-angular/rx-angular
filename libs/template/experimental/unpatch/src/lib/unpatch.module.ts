import { NgModule } from '@angular/core';

import { UnpatchDirective } from './unpatch.directive';

@NgModule({
  declarations: [UnpatchDirective],
  exports: [UnpatchDirective],
})
export class UnpatchModule {}
