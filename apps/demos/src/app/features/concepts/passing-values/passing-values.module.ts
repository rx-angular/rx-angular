import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { RouterModule } from '@angular/router';
import { PushModule } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { RecursiveModule } from '../../../shared/template-structures/recursive/recursive.module';
import { PassingValuesComponent } from './passing-values.component';
import { ROUTES } from './passing-values.routes';

@NgModule({
  declarations: [PassingValuesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ValueProvidersModule,
    FormsModule,
    MatIconModule,
    RecursiveModule,
    FormsModule,
    UnpatchModule,
    MatButtonModule,
    PushModule,
  ],
  exports: [],
})
export class PassingValuesModule {}
