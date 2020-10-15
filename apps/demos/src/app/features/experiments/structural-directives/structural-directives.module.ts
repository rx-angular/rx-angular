import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule, PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './structural-directives.routes';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Poc5Locv5 } from './rx-for-poc/poc5-locv.directive';
import { CdEmbeddedViewParent05Component } from './05/parent.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { RenderingsModule } from '../../../shared/debug-helper/renderings';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WorkModule } from '../../../shared/debug-helper/work';
import { MatInputModule } from '@angular/material/input';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';

@NgModule({
  declarations: [
    Poc5Locv5,
    CdEmbeddedViewParent05Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    UnpatchEventsModule,
    MatIconModule,
    MatButtonModule,
    PushModule,
    LetModule,
    MatCheckboxModule,
    DirtyChecksModule,
    RenderingsModule,
    VisualizerModule,
    MatButtonToggleModule,
    WorkModule,
    MatInputModule,
    ValueProvidersModule
  ]
})
export class StructuralDirectivesModule {
}
