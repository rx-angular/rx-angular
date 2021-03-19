import { NgModule, RendererFactory2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadWriteReadFdComponent } from './read-write-read-fd.component';
import { ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';
import { FastDomRendererRendererFactory } from '../../../../../rx-angular-pocs/cdk/renderer/fast-dom.renderer2';
import { UnpatchEventsModule } from 'templateAlpha1';
import { VisualizerModule } from '../../../../../shared/debug-helper/visualizer';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReadWriteReadFdComponent],
  imports: [
    CommonModule,
    UnpatchEventsModule,
    VisualizerModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReadWriteReadFdComponent
      }
    ])
  ],
  providers: [
    {
      provide: RendererFactory2,
      useFactory(rendererFactory) {
        return new FastDomRendererRendererFactory(rendererFactory);
      },
      deps: [DomRendererFactory2],
    },
  ],
  exports: [ReadWriteReadFdComponent],
})
export class FastDomRendererModule {}
