import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdDefaultComponent } from './cd-default/cd-default.component';
import { VisualizerModule } from '../visualizer/visualizer.module';

@NgModule({
  imports: [CommonModule, VisualizerModule, CdDefaultComponent],
  exports: [CdDefaultComponent],
})
export class CdDefaultModule {}
