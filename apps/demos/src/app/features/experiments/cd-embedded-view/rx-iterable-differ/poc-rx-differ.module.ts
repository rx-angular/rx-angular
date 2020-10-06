import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { ROUTES } from './poc-rx-differ.routes';
import { PocRxDifferDirective } from './poc-rx-differ.directive';
import { CdEmbeddedViewParentRxDifferComponent } from './parent.component';

@NgModule({
  declarations: [CdEmbeddedViewParentRxDifferComponent, PocRxDifferDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    UnpatchEventsModule,
    MatButtonModule,
    PushModule,
    DirtyChecksModule
  ]
})
export class PocRxDifferModule {
}
