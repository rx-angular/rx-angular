import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VisualizerModule } from '../visualizer/visualizer.module';
import { CdDefaultComponent } from './cd-default/cd-default.component';

@NgModule({
  imports: [CommonModule, VisualizerModule, CdDefaultComponent],
  exports: [CdDefaultComponent],
})
export class CdDefaultModule {}
