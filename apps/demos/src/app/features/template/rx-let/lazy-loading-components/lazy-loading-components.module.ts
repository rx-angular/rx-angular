import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { LazyLoadingComponentsComponent } from './lazy-loading-components.component';
import { ROUTES } from './lazy-loading-components.routes';
import { LazyLoadingComponentsAsyncAwaitComponent } from './lazy-loading-components-async-await.component';
import { LazyLoadingComponentsObservableComponent } from './lazy-loading-components-observable.component';
import { LazyLoadingComponentsPromiseComponent } from './lazy-loading-components-promise.component';

const DECLARATIONS = [
  LazyLoadingComponentsObservableComponent,
  LazyLoadingComponentsPromiseComponent,
  LazyLoadingComponentsAsyncAwaitComponent,
  LazyLoadingComponentsComponent,
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    RxLet,
    RxUnpatch,
    GhostElementsModule,
    MatButtonModule,
    VisualizerModule,
    MatButtonToggleModule,
  ],
})
export class LazyLoadingComponentsModule {}
