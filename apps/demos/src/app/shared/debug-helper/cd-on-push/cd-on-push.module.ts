import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizerModule } from '../visualizer/visualizer.module';
import { CdOnPushComponent } from './cd-on-push/cd-on-push.component';

@NgModule({
  imports: [CommonModule, VisualizerModule, CdOnPushComponent],
  exports: [CdOnPushComponent],
})
export class CdOnPushModule {}
