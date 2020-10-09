import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { ROUTES } from './ng-iterable-differ.routes';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MatButtonModule } from '@angular/material/button';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { NgIterableDifferComponent } from './ng-iterable-differ/ng-iterable-differ.component';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { WorkModule } from '../../../../shared/debug-helper/work';

const DECLARATIONS = [NgIterableDifferComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    DirtyChecksModule,
    MatButtonModule,
    VisualizerModule,
    ValueProvidersModule,
    WorkModule
  ]
})
export class NgIterableDifferModule {
}
