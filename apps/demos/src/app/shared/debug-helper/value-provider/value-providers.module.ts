import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';
import { ArrayProviderComponent } from './array-provider/array-provider.component';
import { ValueProviderComponent } from './value-provider/value-provider.component';

@NgModule({
  declarations: [ValueProviderComponent, ArrayProviderComponent],
  imports: [
    CommonModule,
    RxUnpatch,
    MatButtonModule,
    ZonePatchedIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [ValueProviderComponent, ArrayProviderComponent],
})
export class ValueProvidersModule {}
