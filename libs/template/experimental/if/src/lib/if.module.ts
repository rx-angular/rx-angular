import { NgModule } from '@angular/core';
import { RxIf } from './if.directive';

const DECLARATIONS = [RxIf];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS,
})
export class IfModule {}
