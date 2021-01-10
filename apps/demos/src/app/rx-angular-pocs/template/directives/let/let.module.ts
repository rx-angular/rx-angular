import { NgModule } from '@angular/core';
import { RxLet } from './rx-let.directive';

const DECLARATIONS = [
  RxLet
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS
})
export class RxLetModule {
}
