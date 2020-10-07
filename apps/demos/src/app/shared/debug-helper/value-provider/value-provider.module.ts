import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueProviderComponent } from './value-provider/value-provider.component';
import { UnpatchEventsModule } from '@rx-angular/template';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ValueProviderComponent],
  imports: [
    CommonModule,
    UnpatchEventsModule,
    MatButtonModule
  ],
  exports: [ValueProviderComponent]
})
export class ValueProviderModule {
}
