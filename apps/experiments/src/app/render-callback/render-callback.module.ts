import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { RendersModule } from '../renders/renders.module';
import { RenderCallback01Component } from './01/render-callback-01.component';
import { RenderCallback02Component } from './02/render-callback-02.component';
import { RenderCallback03Component } from './03/render-callback-03.component';
import { RxNotificationComponent } from './components/rx-notification/rx-notification.component';
import { RenderCallbackOverviewComponent } from './render-callback-overview.component';
import { RENDER_CALLBACK_ROUTES } from './render-callback.routes';

@NgModule({
  declarations: [
    RenderCallbackOverviewComponent,
    RenderCallback01Component,
    RenderCallback02Component,
    RenderCallback03Component,
    RxNotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RENDER_CALLBACK_ROUTES),
    TemplateModule,
    RendersModule
  ]
})
export class RenderCallbackModule {}
