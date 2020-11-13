import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PushModule, TemplateModule, UnpatchEventsModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../debug-helper/dirty-checks';
import { VisualizerModule } from '../../debug-helper/visualizer';
import { RecursiveObservableWorkAsyncComponent } from './recursive-observable-work-async.component';
import { RecursiveObservableWorkPushComponent } from './recursive-observable-work-push.component';
import { RecursiveObservableComponent } from './recursive-observable.component';
import { RecursiveStaticComponent } from './recursive-static.component';
import { CdTriggerModule } from '../../debug-helper/cd-trigger/cd-trigger.module';
import { ValueProvidersModule } from '../../debug-helper/value-provider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RenderingsModule } from '../../debug-helper/renderings';
import { RecursiveAsyncComponent } from './recursive-async.component';
import { RecursivePushComponent } from './recursive-push.component';
import { RecursiveEmbeddedViewLetComponent } from './recursive-embedded-view-let.component';
import { ViewVsEmbeddedViewModule } from '../../../features/experiments/structural-directives/view-vs-embedded-view/view-vs-embedded-view.module';
import { RecursiveComponentLetComponent } from './recursive-component-let.component';
import { CdHelper } from '../../utils/cd-helper';

const DECLARATIONS = [
  RecursiveStaticComponent,
  RecursiveObservableComponent,
  RecursiveAsyncComponent,
  RecursivePushComponent,
  RecursiveComponentLetComponent,
  RecursiveEmbeddedViewLetComponent,
  RecursiveObservableWorkPushComponent,
  RecursiveObservableWorkAsyncComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule,
    PushModule,
    VisualizerModule,
    ValueProvidersModule,
    RenderingsModule,
    TemplateModule,
    ViewVsEmbeddedViewModule,
  ],
  exports: DECLARATIONS
})
export class RecursiveModule {
}
