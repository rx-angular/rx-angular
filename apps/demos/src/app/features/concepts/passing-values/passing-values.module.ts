import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ROUTES } from './passing-values.routes';
import { MatButtonModule } from '@angular/material/button';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { PassingValuesComponent } from './passing-values.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RecursiveModule } from '../../../shared/template-structures/recursive/recursive.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PassingValuesComponent
  ],
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
    UnpatchEventsModule,
    MatButtonModule,
    PushModule
  ],
  exports: []
})
export class PassingValuesModule {
}
