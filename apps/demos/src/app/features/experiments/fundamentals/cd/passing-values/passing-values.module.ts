import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './passing-values.routes';
import { MatButtonModule } from '@angular/material/button';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../../../../shared/debug-helper/dirty-checks';
import { PassingValuesComponent } from './passing-values.component';
import { VisualizerModule } from '../../../../../shared/debug-helper/visualizer/visualizer.module';
import { RecursiveComponent } from './recursive/recursive.component';
import { CdTriggerModule } from '../../../../../shared/debug-helper/cd-trigger/cd-trigger.module';


@NgModule({
  declarations: [PassingValuesComponent, RecursiveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule,
    PushModule,
    VisualizerModule,
    CdTriggerModule
  ]
})
export class PassingValuesModule {
}
