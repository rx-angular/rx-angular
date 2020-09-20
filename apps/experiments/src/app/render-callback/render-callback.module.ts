import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { RendersModule } from '../renders/renders.module';
import { RenderCallback01Component } from './01/render-callback-01.component';
import { RenderCallbackOverviewComponent } from './render-callback-overview.component';
import { RENDER_CALLBACK_ROUTES } from './render-callback.routes';
import { RxNotificationComponent } from './components/rx-notification/rx-notification.component';

@NgModule({
  declarations: [RenderCallbackOverviewComponent, RenderCallback01Component, RxNotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RENDER_CALLBACK_ROUTES),
    TemplateModule,
    RendersModule
  ]
})
export class RenderCallbackModule { }
