import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks/index';
import { RenderCallbackComponent } from './render-callback.component';
import { RENDER_CALLBACK_ROUTES } from './render-callback.routes';

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
