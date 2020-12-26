import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OriginalLetDirective } from './original-let.directive';
import { Poc1LetDirective } from './poc1-let.directive';
import { ViewVsEmbeddedViewComponent } from './view-vs-embedded-view.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { UnpatchEventsModule } from '@rx-angular/template';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    OriginalLetDirective,
    Poc1LetDirective,
    ViewVsEmbeddedViewComponent
  ],
  exports: [
    Poc1LetDirective
  ],
  imports: [
    CommonModule,
    VisualizerModule,
    UnpatchEventsModule,
    MatButtonModule
  ]
})
export class ViewVsEmbeddedViewModule {
}
