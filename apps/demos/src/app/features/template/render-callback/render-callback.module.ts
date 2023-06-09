import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { RouterModule } from '@angular/router';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks/index';
import { RenderCallbackComponent } from './render-callback.component';
import { RENDER_CALLBACK_ROUTES } from './render-callback.routes';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';

@NgModule({
  declarations: [RenderCallbackComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RENDER_CALLBACK_ROUTES),
    MatProgressSpinnerModule,
    MatDividerModule,
    DirtyChecksModule,
    MatButtonModule,
    RxUnpatch,
    RxPush,
    RxLet,
  ],
})
export class RenderCallbackModule {}
