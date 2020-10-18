import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';

import { ROUTES } from './coalescing.routes';
import { CoalescingComponent } from './coalescing/coalescing.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';

const DECLARATIONS = [
  CoalescingComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    VisualizerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    DirtyChecksModule,
    ValueProvidersModule
  ],
  exports: [DECLARATIONS]
})
export class CoalescingModule {
}
