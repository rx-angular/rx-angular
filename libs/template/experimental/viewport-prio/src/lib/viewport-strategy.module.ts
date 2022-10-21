import { NgModule } from '@angular/core';
import { ViewportStrategyDirective } from './viewport-strategy.directive';

const DECLARATIONS = [ViewportStrategyDirective];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class ViewportStrategyModule {
}
