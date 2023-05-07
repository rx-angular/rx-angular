import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OriginalLetDirective } from './original-let.directive';
import { Poc1LetDirective } from './poc1-let.directive';
import { ViewVsEmbeddedViewComponent } from './view-vs-embedded-view.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [
    OriginalLetDirective,
    Poc1LetDirective,
    ViewVsEmbeddedViewComponent,
  ],
  exports: [Poc1LetDirective],
  imports: [CommonModule, VisualizerModule, UnpatchModule, MatButtonModule],
})
export class ViewVsEmbeddedViewModule {}
