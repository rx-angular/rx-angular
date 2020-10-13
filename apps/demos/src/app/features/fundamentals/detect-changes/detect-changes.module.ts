import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './detect-changes.routes';
import { MatButtonModule } from '@angular/material/button';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { UnpatchEventsModule } from '@rx-angular/template';
import { DetectChangesContainerComponent } from './detect-changes.container.component';
import { CdDefaultModule } from '../../../shared/debug-helper/cd-default/cd-default.module';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer/visualizer.module';
import { CdOnPushModule } from '../../../shared/debug-helper/cd-on-push/cd-on-push.module';
import { CdTriggerModule } from '../../../shared/debug-helper/cd-trigger/cd-trigger.module';

@NgModule({
  declarations: [
    DetectChangesContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule,
    CdDefaultModule,
    VisualizerModule,
    CdOnPushModule,
    CdTriggerModule
  ]
})
export class DetectChangesModule {
}
