import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './partial-tree-update.routes';
import { PartialTreeUpdateContainerComponent } from './partial-tree-update.container.component';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const DECLARATIONS = [PartialTreeUpdateContainerComponent];
@NgModule({
  declarations: [DECLARATIONS],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    VisualizerModule,
    ValueProvidersModule,
    MatButtonToggleModule
  ]
})
export class PartialTreeUpdateModule {
}
