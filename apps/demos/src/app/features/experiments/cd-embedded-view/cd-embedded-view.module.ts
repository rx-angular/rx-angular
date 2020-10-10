import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule, PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { RouterModule } from '@angular/router';
import { PocForIterable } from './03/poc3-for.directive';
import { ROUTES as CD_ROUTES } from './cd-embedded-view.routes';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Poc1ForDirective } from './03/poc1-for.directive';
import { Poc2ForDirective } from './03/poc2-for.directive';
import { CdEmbeddedViewParent03Component } from './03/parent.component';
import { Poc5Locv5 } from './05/poc5-locv.directive';
import { CdEmbeddedViewParent05Component } from './05/parent.component';
import { Poc6Locv2Directive } from './06/poc6-locv2.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Poc6Locv6 } from './06/poc6-locv.directive';
import { CdEmbeddedViewParent06Component } from './06/parent.component';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { RenderingsModule } from '../../../shared/debug-helper/renderings';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WorkModule } from '../../../shared/debug-helper/work';
import { MatInputModule } from '@angular/material/input';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';

@NgModule({
  declarations: [
    CdEmbeddedViewParent03Component,
    Poc1ForDirective,
    Poc2ForDirective,
    PocForIterable,
    Poc5Locv5,
    CdEmbeddedViewParent05Component,
    Poc6Locv6,
    Poc6Locv2Directive,
    CdEmbeddedViewParent06Component
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
export class CdEmbeddedViewModule {
}
