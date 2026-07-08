import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VisualizerModule } from '../visualizer/visualizer.module';
import { CdEnvComponent } from './cd-env/cd-env.component';

@NgModule({
  imports: [CommonModule, VisualizerModule, CdEnvComponent],
  exports: [CdEnvComponent],
})
export class CdEnvModule {}
