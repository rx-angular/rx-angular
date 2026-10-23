import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../debug-helper/dirty-checks';
import { RenderingsModule } from '../../debug-helper/renderings';
import { VisualizerModule } from '../../debug-helper/visualizer';
import { RecursiveAsyncComponent } from './recursive-async.component';
import { RecursiveComponentLetComponent } from './recursive-component-let.component';
import { RecursiveEmbeddedViewLetComponent } from './recursive-embedded-view-let.component';
import { RecursiveObservableComponent } from './recursive-observable.component';
import { RecursiveObservableWorkAsyncComponent } from './recursive-observable-work-async.component';
import { RecursiveObservableWorkPushComponent } from './recursive-observable-work-push.component';
import { RecursivePushComponent } from './recursive-push.component';
import { RecursiveStaticComponent } from './recursive-static.component';

const DECLARATIONS = [
  RecursiveStaticComponent,
  RecursiveObservableComponent,
  RecursiveAsyncComponent,
  RecursivePushComponent,
  RecursiveComponentLetComponent,
  RecursiveEmbeddedViewLetComponent,
  RecursiveObservableWorkPushComponent,
  RecursiveObservableWorkAsyncComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DirtyChecksModule,
    RxUnpatch,
    RxPush,
    VisualizerModule,
    RenderingsModule,
    RxLet,
    ...DECLARATIONS,
  ],
  exports: DECLARATIONS,
})
export class RecursiveModule {}
