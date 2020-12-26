import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxForOf } from './rx-for.directive';
import { RxForDirective } from './rx-for-old.directive';

const DECLARATIONS = [
  RxForOf,
  RxForDirective
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule
  ],
  exports: DECLARATIONS
})
export class RxForPocModule {
}
