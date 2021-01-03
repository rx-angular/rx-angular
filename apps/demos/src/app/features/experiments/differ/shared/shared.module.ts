import { NgModule } from '@angular/core';
import { RxForDifferDirective } from './rx-for-differ.directive';
import { RxForDiffer2Directive } from './rx-for-differ2.directive';

const DECLARATIONS = [RxForDifferDirective,RxForDiffer2Directive];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [],
  exports: [DECLARATIONS]
})
export class SharedModule {
}
