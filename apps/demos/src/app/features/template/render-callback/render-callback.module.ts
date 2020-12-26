import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks/index';
import { RenderCallbackComponent } from './render-callback.component';
import { RENDER_CALLBACK_ROUTES } from './render-callback.routes';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchEventsModule } from '@rx-angular/template';
import { PushModule, RxLetModule } from '../../../rx-angular-pocs';

@NgModule({
  declarations: [
    RenderCallbackComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RENDER_CALLBACK_ROUTES),
    MatProgressSpinnerModule,
    MatDividerModule,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchEventsModule,
    PushModule,
    RxLetModule
  ]
})
export class RenderCallbackModule {}
