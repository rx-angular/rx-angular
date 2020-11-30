import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './global-order.routes';
import { PushModule } from '@rx-angular/template';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { BComponent } from './a/b/b.component';
import { CComponent } from './a/c/c.component';
import { AComponent } from './a/a.component';
import { GlobalOrderComponent } from './global-order.component';

@NgModule({
  declarations: [
    GlobalOrderComponent,
    AComponent,
    BComponent,
    CComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    PushModule
  ],
  exports: []
})
export class GlobalOrderModule {
}
