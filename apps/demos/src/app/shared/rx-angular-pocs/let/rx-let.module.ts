import { NgModule } from '@angular/core';
import { LetDirective } from './rx-let.directive';

const DECLARATIONS = [
  LetDirective
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS
})
export class RxLetModule {
}
