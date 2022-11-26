import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../debug-helper/dirty-checks';
import { RenderingsModule } from '../../debug-helper/renderings';
import { ValueProvidersModule } from '../../debug-helper/value-provider';
import { VisualizerModule } from '../../debug-helper/visualizer';
import { RecursiveAsyncComponent } from './recursive-async.component';
import { RecursiveComponentLetComponent } from './recursive-component-let.component';
import { RecursiveEmbeddedViewLetComponent } from './recursive-embedded-view-let.component';
import { RecursiveObservableWorkAsyncComponent } from './recursive-observable-work-async.component';
import { RecursiveObservableWorkPushComponent } from './recursive-observable-work-push.component';
import { RecursiveObservableComponent } from './recursive-observable.component';
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
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    MatButtonModule,
    DirtyChecksModule,
    UnpatchModule,
    PushModule,
    VisualizerModule,
    ValueProvidersModule,
    RenderingsModule,
    LetModule,
    PushModule,
  ],
  exports: DECLARATIONS,
})
export class RecursiveModule {}
