import { NgModule } from '@angular/core';
import { RxContext } from './rx-context.directive';

const DECLARATIONS = [
  RxContext
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS
})
export class RxContextModule {
}
