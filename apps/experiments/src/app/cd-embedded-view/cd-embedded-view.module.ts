import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule, PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { RouterModule } from '@angular/router';
import { PocForIterable } from './03/poc3-for.directive';
import { ROUTES as CD_ROUTES } from './cd-embedded-view.routes';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RendersModule } from '../renders/renders.module';
import { Poc1LetDirective } from './01/poc1-let.directive';
import { OriginalLetDirective } from './01/original-let.directive';
import { Poc1IfDirective } from './02/poc1-if.directive';
import { Poc2IfDirective } from './02/poc2-if.directive';
import { Poc1ForDirective } from './03/poc1-for.directive';
import { Poc2ForDirective } from './03/poc2-for.directive';
import { Poc1Switch } from './04/poc1-switch.directive';
import { CdEmbeddedViewOverviewComponent } from './cd-embedded-view.overview.component';
import { CdEmbeddedViewParent01Component } from './01/parent.component';
import { CdEmbeddedViewParent02Component } from './02/parent.component';
import { CdEmbeddedViewParent03Component } from './03/parent.component';
import { CdEmbeddedViewParent04Component } from './04/parent.component';
import { Poc1SwitchCase } from './04/poc1-switch-case.directive';
import { Poc5Locv5 } from './05/poc5-locv.directive';
import { CdEmbeddedViewParent05Component } from './05/parent.component';
import { Poc6Locv2Directive } from './06/poc6-locv2.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Poc6Locv6 } from './06/poc6-locv.directive';
import { CdEmbeddedViewParent06Component } from './06/parent.component';

@NgModule({
  declarations: [
    CdEmbeddedViewOverviewComponent,
    CdEmbeddedViewParent01Component,
    CdEmbeddedViewParent02Component,
    CdEmbeddedViewParent03Component,
    CdEmbeddedViewParent04Component,
    OriginalLetDirective,
    Poc1LetDirective,
    Poc1IfDirective,
    Poc2IfDirective,
    Poc1ForDirective,
    Poc2ForDirective,
    Poc1Switch,
    Poc1SwitchCase,
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
    RendersModule,
    MatIconModule,
    MatButtonModule,
    PushModule,
    LetModule,
    MatCheckboxModule
  ]
})
export class CdEmbeddedViewModule {}
