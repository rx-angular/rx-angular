import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../debug-helper/dirty-checks';
import { VisualizerModule } from '../../debug-helper/visualizer';
import { RecursiveObservableWorkAsyncComponent } from './recursive-observable-work-async.component';
import { RecursiveObservableWorkPushComponent } from './recursive-observable-work-push.component';
import { RecursiveObservableComponent } from './recursive-observable.component';
import { RecursiveStaticComponent } from './recursive-static.component';
import { ValueProvidersModule } from '../../debug-helper/value-provider';
import { RenderingsModule } from '../../debug-helper/renderings';
import { RecursiveAsyncComponent } from './recursive-async.component';
import { RecursivePushComponent } from './recursive-push.component';
import { RecursiveEmbeddedViewLetComponent } from './recursive-embedded-view-let.component';
import { RecursiveComponentLetComponent } from './recursive-component-let.component';

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
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    MatButtonModule,
    DirtyChecksModule,
    RxUnpatch,
    RxPush,
    VisualizerModule,
    ValueProvidersModule,
    RenderingsModule,
    RxLet,
  ],
  exports: DECLARATIONS,
})
export class RecursiveModule {}
