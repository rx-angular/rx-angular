import { NgModule } from '@angular/core';
import { RxIf } from './rx-if.directive';

const DECLARATIONS = [RxIf];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS
})
export class RxIfModule {
}
