import { NgModule } from '@angular/core';
import { RxForDifferDirective } from './rx-for-differ.directive';

const DECLARATIONS = [RxForDifferDirective];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [],
  exports: [DECLARATIONS]
})
export class SharedModule {
}
