import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { RouterModule } from '@angular/router';
import { ROUTES } from './passing-values.routes';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RxPush } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { PassingValuesComponent } from './passing-values.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RecursiveModule } from '../../../shared/template-structures/recursive/recursive.module';
import { FormsModule } from '@angular/forms';

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
    RxPush,
  ],
  exports: [],
})
export class PassingValuesModule {}
