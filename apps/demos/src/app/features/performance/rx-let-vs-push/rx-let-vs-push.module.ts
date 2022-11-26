import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { RenderingWorkModule } from '../../../shared/debug-helper/rendering-work/rendering-work.module';
import { ListToggleTestComponent } from './list-toggle-test-component/list-toggle-test.component';
import { RxLetVsPushComponent } from './rx-let-vs-push.component';
import { ROUTES as RX_LET_VS_PUSH_ROUTES } from './rx-let-vs-push.routes';

@NgModule({
  declarations: [RxLetVsPushComponent, ListToggleTestComponent],
  imports: [
    LetModule,
    PushModule,
    CommonModule,
    RenderingWorkModule,
    MatButtonModule,
    RouterModule.forChild(RX_LET_VS_PUSH_ROUTES),
  ],
})
export class RxLetVsPushModule {}
