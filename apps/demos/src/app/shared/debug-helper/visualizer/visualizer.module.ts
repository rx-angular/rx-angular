import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxPush } from '@rx-angular/template/push';
import { DirtyChecksModule } from '../dirty-checks';
import { RenderingsModule } from '../renderings';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { WorkVisualizerComponent } from './visualizer/work-visualizer.component';

@NgModule({
  imports: [
    CommonModule,
    DirtyChecksModule,
    RenderingsModule,
    RxPush,
    VisualizerComponent,
    WorkVisualizerComponent,
  ],
  exports: [VisualizerComponent, WorkVisualizerComponent],
})
export class VisualizerModule {}
