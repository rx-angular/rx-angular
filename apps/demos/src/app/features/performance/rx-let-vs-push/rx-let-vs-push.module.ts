import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { ListToggleTestComponent } from './list-toggle-test-component/list-toggle-test.component';
import { RxLetVsPushComponent } from './rx-let-vs-push.component';
import { ROUTES as RX_LET_VS_PUSH_ROUTES } from './rx-let-vs-push.routes';

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
