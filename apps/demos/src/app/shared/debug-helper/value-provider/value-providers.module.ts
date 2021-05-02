import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueProviderComponent } from './value-provider/value-provider.component';
import { UnpatchEventsModule } from '@rx-angular/template';
import { MatButtonModule } from '@angular/material/button';
import { ArrayProviderComponent } from './array-provider/array-provider.component';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ValueProviderComponent, ArrayProviderComponent],
  imports: [
    CommonModule,
    UnpatchEventsModule,
    MatButtonModule,
    ZonePatchedIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [ValueProviderComponent, ArrayProviderComponent],
})
export class ValueProvidersModule {}
