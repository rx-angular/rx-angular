import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BootstrapTimeComponent } from './bootstrap-time.component';
import { ROUTES as BOOTSTRAP_TIME_ROUTES } from './bootstrap-time.routes';
import { BootstrapPureComponent } from './bootstrap-pure/bootstrap-pure.component';
import { BootstrapStateInjectComponent } from './bootstrap-state-inject/bootstrap-state-inject.component';
import { BootstrapStateExtendComponent } from './bootstrap-state-extend/bootstrap-state-extend.component';
import { BootstrapServiceInjectComponent } from './bootstrap-service-inject/bootstrap-service-inject.component';
import { BootstrapServiceExtendComponent } from './bootstrap-service-extend/bootstrap-service-extend.component';
import { BootstrapAsyncPipeComponent } from './bootstrap-async-pipe/bootstrap-async-pipe.component';
import { BootstrapPushPipeComponent } from './bootstrap-push-pipe/bootstrap-push-pipe.component';
import { BootstrapLetDirectiveComponent } from './bootstrap-let-directive/bootstrap-let-directive.component';
import { TemplateModule } from '@rx-angular/template';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    BootstrapTimeComponent,
    BootstrapPureComponent,
    BootstrapServiceInjectComponent,
    BootstrapServiceExtendComponent,
    BootstrapStateInjectComponent,
    BootstrapStateExtendComponent,
    BootstrapAsyncPipeComponent,
    BootstrapPushPipeComponent,
    BootstrapLetDirectiveComponent,
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    RouterModule.forChild(BOOTSTRAP_TIME_ROUTES),
    TemplateModule,
  ],
  exports: [],
})
export class BootstrapTimeModule {}
