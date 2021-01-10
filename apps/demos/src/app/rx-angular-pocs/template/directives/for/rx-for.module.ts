import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxFor } from './rx-for.directive';

const DECLARATIONS = [
  RxFor
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule],
  exports: DECLARATIONS
})
export class RxForModule {
}
