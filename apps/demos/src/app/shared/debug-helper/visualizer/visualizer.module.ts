import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { DirtyChecksModule } from '../dirty-checks';
import { RenderingsModule } from '../renderings';
import { PushModule } from '@rx-angular/template';


@NgModule({
  declarations: [VisualizerComponent],
  imports: [
    CommonModule,
    DirtyChecksModule,
    RenderingsModule,
    PushModule
  ],
  exports: [VisualizerComponent]
})
export class VisualizerModule { }
