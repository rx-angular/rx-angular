import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxIf } from './rx-if.directive';

const DECLARATIONS = [RxIf];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule],
  exports: DECLARATIONS
})
export class RxIfModule {
}
