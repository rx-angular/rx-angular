import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueProviderComponent } from './value-provider/value-provider.component';


@NgModule({
  declarations: [ValueProviderComponent],
  imports: [
    CommonModule
  ],
  exports: [ValueProviderComponent]
})
export class ValueProviderModule {
}
