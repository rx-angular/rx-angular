import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PushModule, TemplateModule, UnpatchEventsModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../debug-helper/dirty-checks';
import { VisualizerModule } from '../../debug-helper/visualizer';
import { ValueProvidersModule } from '../../debug-helper/value-provider';
import { RenderingsModule } from '../../debug-helper/renderings';
import { SiblingAsyncComponent } from './sibling-async.component';
import { ViewVsEmbeddedViewModule } from '../../../features/experiments/structural-directives/view-vs-embedded-view/view-vs-embedded-view.module';
import { SiblingStaticComponent } from './sibling-static.component';
import { SiblingPushComponent } from './sibling-push.component';
import { SiblingProgressiveComponent } from './sibling-progressive.component';
import { WorkModule } from '../../debug-helper/work/work.module';
import { SiblingCustomComponent } from './sibling-custom.component';
import { StrategySelectModule } from '../../debug-helper/strategy-select';

const DECLARATIONS = [
  SiblingStaticComponent,
  SiblingAsyncComponent,
  SiblingPushComponent,
  SiblingProgressiveComponent,
  SiblingCustomComponent
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
    WorkModule,
    StrategySelectModule
  ],
  exports: DECLARATIONS
})
export class SiblingModule {
}
