import { NgModule } from '@angular/core';
import { ViewportPrioDirective } from './viewport-prio.experimental.directive';

const DECLARATIONS = [ViewportPrioDirective];
@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class ViewportPrioModule {}
