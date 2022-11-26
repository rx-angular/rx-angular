import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueProviderComponent } from './value-provider/value-provider.component';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ArrayProviderComponent } from './array-provider/array-provider.component';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ValueProviderComponent, ArrayProviderComponent],
  imports: [
    CommonModule,
    UnpatchModule,
    MatButtonModule,
    ZonePatchedIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [ValueProviderComponent, ArrayProviderComponent],
})
export class ValueProvidersModule {}
