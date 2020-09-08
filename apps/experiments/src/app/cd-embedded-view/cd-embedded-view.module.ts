import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnpatchEventsModule } from '@rx-angular/template';
import { RouterModule } from '@angular/router';
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
    Poc1Switch, Poc1SwitchCase
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    UnpatchEventsModule,
    RendersModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CdEmbeddedViewModule {
}
