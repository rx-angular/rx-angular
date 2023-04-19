import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { ChunkModule } from '@rx-angular/template/chunk';
import { LetModule } from '@rx-angular/template/let';
import { RenderingWorkModule } from '../../../../shared/debug-helper/rendering-work/rendering-work.module';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/index';
import { WorkModule } from '../../../../shared/debug-helper/work/work.module';
import { RxChunkBasicComponent } from './rx-chunk-basic.component';

const routes: Routes = [
  {
    path: '',
    component: RxChunkBasicComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    VisualizerModule,
    StrategySelectModule,
    ChunkModule,
    CommonModule,
    LetModule,
    RenderingWorkModule,
    WorkModule,
    MatButtonModule,
  ],
  exports: [],
  declarations: [RxChunkBasicComponent],
  providers: [],
})
export class RxChunkBasicModule {}
