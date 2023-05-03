import { NgModule } from '@angular/core';

import { ViewportPrioDirective } from './viewport-prio.directive';

/** @deprecated use the standalone import, will be removed with v16 */
@NgModule({
  imports: [ViewportPrioDirective],
  exports: [ViewportPrioDirective],
})
export class ViewportPrioModule {}
