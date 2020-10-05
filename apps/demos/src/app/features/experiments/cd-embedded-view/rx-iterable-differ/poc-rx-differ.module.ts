import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdEmbeddedViewParentRxDifferComponent } from './parent.component';
import { PocRxDifferDirective } from './poc-rx-differ.directive';
import { RouterModule } from '@angular/router';
import { ROUTES } from './poc-rx-differ.routes';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { UnpatchEventsModule } from '../../../../../../../../libs/template/src/lib/experimental/unpatch/events';
import { MatButtonModule } from '@angular/material/button';
import { PushModule } from '../../../../../../../../libs/template/src/lib/push';

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
export class PocRxDifferModule { }
