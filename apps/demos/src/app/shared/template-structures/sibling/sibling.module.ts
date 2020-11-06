import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { ViewVsEmbeddedViewModule } from '../../../features/experiments/structural-directives/view-vs-embedded-view/view-vs-embedded-view.module';
import { DirtyChecksModule } from '../../debug-helper/dirty-checks';
import { RenderingsModule } from '../../debug-helper/renderings';
import { StrategySelectModule } from '../../debug-helper/strategy-select';
import { ValueProvidersModule } from '../../debug-helper/value-provider';
import { VisualizerModule } from '../../debug-helper/visualizer';
import { WorkModule } from '../../debug-helper/work/work.module';
import { SiblingAsyncComponent } from './sibling-async.component';
import { SiblingCustomComponent } from './sibling-custom.component';
import { SiblingProgressiveComponent } from './sibling-progressive.component';
import { SiblingPushComponent } from './sibling-push.component';
import { SiblingStaticComponent } from './sibling-static.component';
import { RxLetModule } from '../../rx-angular-pocs/let/rx-let.module';
import { SiblingStrategyComponent } from './sibling-strategy.component';
import { ImageArrayModule } from '../../image-array/image-array.module';
import { SiblingPixelImgComponent } from './sibling-pixel-img.component';

const DECLARATIONS = [
  SiblingStaticComponent,
  SiblingAsyncComponent,
  SiblingPushComponent,
  SiblingProgressiveComponent,
  SiblingCustomComponent,
  SiblingStrategyComponent,
  SiblingPixelImgComponent
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
    RxLetModule,
    ViewVsEmbeddedViewModule,
    WorkModule,
    StrategySelectModule,
    ImageArrayModule
  ],
  exports: DECLARATIONS
})
export class SiblingModule {
}
