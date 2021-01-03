import { NgModule } from '@angular/core';
import { RxContext } from './rx-context.directive';
import { RxContextContainer } from './rx-context.component';

const DECLARATIONS = [
  RxContext, RxContextContainer
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS
})
export class RxContextModule {
}
