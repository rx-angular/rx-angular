import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLetVsPushComponent } from './rx-let-vs-push.component';

import { RouterModule } from '@angular/router';
import { ROUTES as RX_LET_VS_PUSH_ROUTES } from './rx-let-vs-push.routes';
import { MatButtonModule } from '@angular/material/button';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { ListToggleTestComponent } from './list-toggle-test-component/list-toggle-test.component';

@NgModule({
  imports: [
    RxLet,
    RxPush,
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(RX_LET_VS_PUSH_ROUTES),
    RxLetVsPushComponent,
    ListToggleTestComponent,
  ],
})
export class RxLetVsPushModule {}
