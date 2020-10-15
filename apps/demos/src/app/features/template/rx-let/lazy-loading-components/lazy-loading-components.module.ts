import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './lazy-loading-components.routes';
import { LazyLoadingComponentsComponent } from './lazy-loading-components.component';
import { LetModule, UnpatchEventsModule } from '@rx-angular/template';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { MatButtonModule } from '@angular/material/button';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const DECLARATIONS = [
  LazyLoadingComponentsComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    LetModule,
    UnpatchEventsModule,
    GhostElementsModule,
    MatButtonModule,
    VisualizerModule,
    MatButtonToggleModule
  ]
})
export class LazyLoadingComponentsModule {

}
