import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLetVsPushComponent } from './rx-let-vs-push.component';
import { RenderingWorkModule } from '../../../shared/debug-helper/rendering-work/rendering-work.module';
import { RouterModule } from '@angular/router';
import { ROUTES as RX_LET_VS_PUSH_ROUTES } from './rx-let-vs-push.routes';
import { MatButtonModule } from '@angular/material/button';
import { TemplateModule } from '@rx-angular/template';

@NgModule({
  declarations: [RxLetVsPushComponent],
  imports: [
    TemplateModule,
    CommonModule,
    RenderingWorkModule,
    MatButtonModule,
    RouterModule.forChild(RX_LET_VS_PUSH_ROUTES),
  ],
})
export class RxLetVsPushModule {}
