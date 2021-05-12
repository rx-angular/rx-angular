import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './lazy-loading-components.routes';
import { LazyLoadingComponentsComponent } from './lazy-loading-components.component';
import { UnpatchEventsModule } from '@rx-angular/template';
import { LetModule } from '@rx-angular/template/let';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { MatButtonModule } from '@angular/material/button';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LazyLoadingComponentsObservableComponent } from './lazy-loading-components-observable.component';
import { LazyLoadingComponentsPromiseComponent } from './lazy-loading-components-promise.component';
import { LazyLoadingComponentsAsyncAwaitComponent } from './lazy-loading-components-async-await.component';

const DECLARATIONS = [
  LazyLoadingComponentsObservableComponent,
  LazyLoadingComponentsPromiseComponent,
  LazyLoadingComponentsAsyncAwaitComponent,
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
