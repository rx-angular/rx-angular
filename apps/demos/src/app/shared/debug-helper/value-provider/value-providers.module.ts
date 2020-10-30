import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueProviderComponent } from './value-provider/value-provider.component';
import { UnpatchEventsModule } from '@rx-angular/template';
import { MatButtonModule } from '@angular/material/button';
import { ArrayProviderComponent } from './array-provider/array-provider.component';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';

@NgModule({
  declarations: [ValueProviderComponent, ArrayProviderComponent],
  imports: [
    CommonModule,
    UnpatchEventsModule,
    MatButtonModule,
    ZonePatchedIconModule
  ],
  exports: [ValueProviderComponent, ArrayProviderComponent]
})
export class ValueProvidersModule {
}
