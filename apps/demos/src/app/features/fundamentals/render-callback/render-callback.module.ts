import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { RenderCallback01Component } from './01/render-callback-01.component';
import { RenderCallback02Component } from './02/render-callback-02.component';
import { RenderCallback03Component } from './03/render-callback-03.component';
import { RenderCallback04Component } from './04/render-callback04.component';
import { RenderCallbackOverviewComponent } from './render-callback-overview.component';
import { RENDER_CALLBACK_ROUTES } from './render-callback.routes';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchEventsModule } from '@rx-angular/template';
import { RxPushModule } from '../../../shared/rx-angular-pocs/push/rx-push.module';
import { LetModule } from '../../../shared/rx-angular-pocs/let/let.module';

@NgModule({
  declarations: [
    RenderCallbackOverviewComponent,
    RenderCallback01Component,
    RenderCallback02Component,
    RenderCallback03Component,
    RenderCallback04Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RENDER_CALLBACK_ROUTES),
    MatProgressSpinnerModule,
    MatDividerModule,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchEventsModule,
    RxPushModule,
    LetModule
  ]
})
export class RenderCallbackModule {}
