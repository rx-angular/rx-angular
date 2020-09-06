import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnpatchEventsModule } from '@rx-angular/template';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './cd-embedded-view.routes';

import { CdEmbeddedViewOverviewComponent } from './cd-embedded-view.overview.component';
import { CdEmbeddedViewParent01Component } from './01/parent.component';
import { PocLetDirective } from './01/poc-let.directive';
import { RendersModule } from '../renders/renders.module';
import { OriginalLetDirective } from './01/original-let.directive';

@NgModule({
  declarations: [
    PocLetDirective,
    OriginalLetDirective,
    CdEmbeddedViewParent01Component,
    CdEmbeddedViewOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    UnpatchEventsModule,
    RendersModule
  ]
})
export class CdEmbeddedViewModule {
}
