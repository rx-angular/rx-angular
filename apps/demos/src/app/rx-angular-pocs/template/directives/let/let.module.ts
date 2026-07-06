import { NgModule } from '@angular/core';
import { RxLet } from './rx-let.directive';

const DECLARATIONS = [RxLet];

@NgModule({
  imports: [...DECLARATIONS],
  exports: DECLARATIONS,
})
export class RxLetModule {}
