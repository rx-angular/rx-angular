import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './global-order.routes';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { GlobalOrderComponent } from './global-order.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NativeVModule } from './native-v/native-v.module';
import { RxLetVModule } from './rx-let-v/rx-let-v.module';
import { PushVModule } from './push-v/push-v.module';
import { RxFormVModule } from './rx-form-v/rx-form-v.module';

@NgModule({
  declarations: [
    GlobalOrderComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    MatButtonToggleModule,
    NativeVModule,
    RxLetVModule,
    PushVModule,
    RxFormVModule
  ],
  exports: []
})
export class GlobalOrderModule {
}
