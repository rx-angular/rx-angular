import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ROUTES } from './passing-values.routes';
import { MatButtonModule } from '@angular/material/button';
import { PushModule, UnpatchEventsModule, TemplateModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { PassingValuesComponent } from './passing-values.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { RecursiveObservableComponent } from './recursive/recursive-observable.component';
import { RecursiveStaticComponent } from './recursive/recursive-static.component';
import { CdTriggerModule } from '../../../shared/debug-helper/cd-trigger/cd-trigger.module';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RenderingsModule } from '../../../shared/debug-helper/renderings';
import { RecursiveAsyncComponent } from './recursive/recursive-async.component';
import { RecursivePushComponent } from './recursive/recursive-push.component';
import { RecursiveEmbeddedViewLetComponent } from './recursive/recursive-embedded-view-let.component';
import { ViewVsEmbeddedViewModule } from '../../experiments/structural-directives/view-vs-embedded-view/view-vs-embedded-view.module';
import { RecursiveComponentLetComponent } from './recursive/recursive-component-let.component';


@NgModule({
  declarations: [
    RecursiveStaticComponent,
    RecursiveObservableComponent,
    RecursiveAsyncComponent,
    RecursivePushComponent,
    PassingValuesComponent,
    RecursiveComponentLetComponent,
    RecursiveEmbeddedViewLetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule,
    PushModule,
    VisualizerModule,
    CdTriggerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ValueProvidersModule,
    MatButtonToggleModule,
    RenderingsModule,
    TemplateModule,
    ViewVsEmbeddedViewModule
  ],
  exports: []
})
export class PassingValuesModule {
}
