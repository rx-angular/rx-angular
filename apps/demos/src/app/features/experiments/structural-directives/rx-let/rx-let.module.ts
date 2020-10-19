import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLetDirective } from './rx-let.directive';

@NgModule({
  declarations: [
    RxLetDirective
  ],
  exports: [
    RxLetDirective
  ],
  imports: [
    CommonModule
  ]
})
export class RxLetModule {
}
