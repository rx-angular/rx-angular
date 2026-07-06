import { NgModule } from '@angular/core';
import { RxFor } from './rx-for.directive';

const DECLARATIONS = [RxFor];

@NgModule({
  imports: [...DECLARATIONS],
  exports: DECLARATIONS,
})
export class RxForModule {}
