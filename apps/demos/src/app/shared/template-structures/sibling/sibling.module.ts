import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PushModule } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';

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

import { SiblingStrategyComponent } from './sibling-strategy.component';
import { ImageArrayModule } from '../../image-array/image-array.module';
import { SiblingPixelImgComponent } from './sibling-pixel-img.component';
import {
  RxContextModule,
  RxForModule,
  RxLetModule,
} from '../../../rx-angular-pocs';

const DECLARATIONS = [
  SiblingStaticComponent,
  SiblingAsyncComponent,
  SiblingPushComponent,
  SiblingProgressiveComponent,
  SiblingCustomComponent,
  SiblingStrategyComponent,
  SiblingPixelImgComponent,
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
    RxLetModule,
    WorkModule,
    StrategySelectModule,
    ImageArrayModule,
    RxForModule,
    RxContextModule,
    MatProgressSpinnerModule,
  ],
  exports: DECLARATIONS,
})
export class SiblingModule {}
