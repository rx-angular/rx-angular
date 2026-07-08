import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdTriggerModule } from '../cd-trigger/cd-trigger.module';
import { VisualizerModule } from '../visualizer/visualizer.module';
import { CdDefaultComponent } from './cd-default/cd-default.component';

@NgModule({
  declarations: [CdDefaultComponent],
  imports: [CommonModule, VisualizerModule, CdTriggerModule],
  exports: [CdDefaultComponent],
})
export class CdDefaultModule {}
