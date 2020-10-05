import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizerModule } from '../visualizer/visualizer.module';
import { CdOnPushComponent } from './cd-on-push/cd-on-push.component';
import { CdTriggerModule } from '../cd-trigger/cd-trigger.module';


@NgModule({
  declarations: [CdOnPushComponent],
  imports: [
    CommonModule,
    VisualizerModule,
    CdTriggerModule
  ],
  exports: [CdOnPushComponent]
})
export class CdOnPushModule {
}
