import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OriginalLetDirective } from './original-let.directive';
import { Poc1LetDirective } from './poc1-let.directive';
import { ROUTES } from './view-vs-embedded-view.routes';
import { ViewVsEmbeddedViewComponent } from './view-vs-embedded-view.component';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { UnpatchEventsModule } from '@rx-angular/template';

@NgModule({
  declarations: [
    OriginalLetDirective,
    Poc1LetDirective,
    ViewVsEmbeddedViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    UnpatchEventsModule
  ]
})
export class ViewVsEmbeddedViewModule {
}
