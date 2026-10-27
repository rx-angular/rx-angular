import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { OriginalLetDirective } from './original-let.directive';
import { Poc1LetDirective } from './poc1-let.directive';
import { ViewVsEmbeddedViewComponent } from './view-vs-embedded-view.component';

@NgModule({
  exports: [Poc1LetDirective],
  imports: [
    CommonModule,
    VisualizerModule,
    RxUnpatch,
    MatButtonModule,
    OriginalLetDirective,
    Poc1LetDirective,
    ViewVsEmbeddedViewComponent,
  ],
})
export class ViewVsEmbeddedViewModule {}
