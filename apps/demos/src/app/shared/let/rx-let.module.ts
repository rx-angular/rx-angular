import { NgModule } from '@angular/core';
import { LetPocDirective } from './rx-let-poc.directive';

const DECLARATIONS = [
  LetPocDirective
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS
})
export class RxLetModule {
}
