import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizerModule } from '../visualizer/visualizer.module';
import { CdTriggerModule } from '../cd-trigger/cd-trigger.module';
import { CdEnvComponent } from './cd-env/cd-env.component';


@NgModule({
  declarations: [CdEnvComponent],
  imports: [
    CommonModule,
    VisualizerModule,
    CdTriggerModule
  ],
  exports: [CdEnvComponent]
})
export class CdEnvModule {
}
