import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdEmbeddedViewParentRxDifferComponent } from './parent.component';
import { PocRxDifferDirective } from './poc-rx-differ.directive';
import { RouterModule } from '@angular/router';
import { ROUTES } from './poc-rx-differ.routes';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CdEmbeddedViewParentRxDifferComponent, PocRxDifferDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    UnpatchEventsModule,
    MatButtonModule,
    PushModule
  ]
})
export class PocRxDifferModule {
}
