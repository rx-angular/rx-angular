import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './global-order.routes';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { GlobalOrderComponent } from './global-order.component';
import { A2Module } from './a2/a2.module';
import { A1Module } from './a1/a1.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    GlobalOrderComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    A1Module,
    A2Module,
    VisualizerModule,
    MatButtonToggleModule
  ],
  exports: []
})
export class GlobalOrderModule {
}
