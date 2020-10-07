import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { ROUTES } from './rx-for-differ.routes';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MatButtonModule } from '@angular/material/button';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { RxForDifferComponent } from './rx-for-differ/rx-for-differ.component';
import { SharedModule } from '../shared';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';

const DECLARATIONS = [RxForDifferComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    DirtyChecksModule,
    MatButtonModule,
    VisualizerModule,
    SharedModule,
    ValueProvidersModule
  ]
})
export class RxForDifferModule {
}
