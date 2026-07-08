import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdTriggerModule } from '../cd-trigger/cd-trigger.module';
import { VisualizerModule } from '../visualizer/visualizer.module';
import { CdOnPushComponent } from './cd-on-push/cd-on-push.component';

@NgModule({
  declarations: [CdOnPushComponent],
  imports: [CommonModule, VisualizerModule, CdTriggerModule],
  exports: [CdOnPushComponent],
})
export class CdOnPushModule {}
