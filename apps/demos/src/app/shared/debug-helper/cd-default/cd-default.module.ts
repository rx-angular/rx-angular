import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdDefaultComponent } from './cd-default/cd-default.component';
import { VisualizerModule } from '../visualizer/visualizer.module';
import { CdTriggerModule } from '../cd-trigger/cd-trigger.module';



@NgModule({
  declarations: [CdDefaultComponent],
  imports: [
    CommonModule,
    VisualizerModule,
    CdTriggerModule
  ],
  exports: [CdDefaultComponent]
})
export class CdDefaultModule { }
