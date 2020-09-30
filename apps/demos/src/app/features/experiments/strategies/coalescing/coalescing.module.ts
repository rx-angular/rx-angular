import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoalescingExperimentsProfilingComponent } from './experiments-profiling/coalescing-experiments-profiling.component';
import { TemplateModule } from '@rx-angular/template';
import { CoalescingExperimentsProfilingChildComponent } from './experiments-profiling/coalescing-experiments-profiling-child.component';
import { ROUTES } from './coalescing.routes';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { RenderingsModule } from '../../../../shared/debug-helper/renderings';

const DECLARATIONS = [
  CoalescingExperimentsProfilingComponent,
  CoalescingExperimentsProfilingChildComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    DirtyChecksModule,
    RenderingsModule
  ],
  exports: [DECLARATIONS]
})
export class CoalescingModule {
}
