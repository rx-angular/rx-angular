import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnpatchEventsModule } from '@rx-angular/template';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './cd-embedded-view.routes';

import { CdEmbeddedViewOverviewComponent } from './cd-embedded-view.overview.component';
import { CdEmbeddedViewParent01Component } from './01/parent.component';
import { Poc1LetDirective } from './01/poc1-let.directive';
import { RendersModule } from '../renders/renders.module';
import { OriginalLetDirective } from './01/original-let.directive';
import { CdEmbeddedViewParent02Component } from './02/parent.component';
import { Poc2LetDirective } from './02/poc2-let.directive';
import { CdEmbeddedViewParent03Component } from './03/parent.component';
import { PocForDirective } from './03/poc-for.directive';
import { Poc2ForDirective } from './03/poc2-for.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    OriginalLetDirective,
    Poc1LetDirective,
    Poc2LetDirective,
    PocForDirective,
    Poc2ForDirective,
    CdEmbeddedViewParent01Component,
    CdEmbeddedViewParent02Component,
    CdEmbeddedViewParent03Component,
    CdEmbeddedViewOverviewComponent
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
