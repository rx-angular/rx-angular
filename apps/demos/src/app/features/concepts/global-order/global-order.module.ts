import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { GlobalOrderComponent } from './global-order.component';
import { ROUTES } from './global-order.routes';
import { NativeVModule } from './native-v/native-v.module';
import { PushVModule } from './push-v/push-v.module';
import { RxFormVModule } from './rx-form-v/rx-form-v.module';
import { RxLetVModule } from './rx-let-v/rx-let-v.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    MatButtonToggleModule,
    NativeVModule,
    RxLetVModule,
    PushVModule,
    RxFormVModule,
    GlobalOrderComponent,
  ],
  exports: [],
})
export class GlobalOrderModule {}
