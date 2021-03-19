import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReadWriteReadComponent } from './read-write-read/read-write-read.component';
import {
  LetModule,
  PushModule,
  UnpatchEventsModule,
} from '@rx-angular/template';
import { ROUTES } from './read-write-read.routes';
import { MatButtonModule } from '@angular/material/button';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { ReadWriteReadDefaultComponent } from './read-write-read/read-write-read-default.component';
import { FastDomRendererModule } from './read-write-read/fast-dom-renderer/fast-dom-renderer.module';

const DECLARATIONS = [ReadWriteReadComponent, ReadWriteReadDefaultComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    LetModule,
    PushModule,
    UnpatchEventsModule,
    MatButtonModule,
    VisualizerModule
  ],
  exports: [DECLARATIONS],
})
export class ReadWriteReadModule {}
