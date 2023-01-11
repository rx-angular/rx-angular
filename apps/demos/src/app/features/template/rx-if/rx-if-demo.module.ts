import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { RouterModule } from '@angular/router';
import { IfModule } from '@rx-angular/template/if';
import { ROUTES } from './rx-if.routes';
import { RxIfBasicComponent } from './rx-if-basic.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { UnpatchEventsModule } from '../../../rx-angular-pocs/template/directives/unpatch';
import { ValueModule } from '../../../shared/debug-helper/value-provider/value/value.module';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { GhostElementsModule } from '../../../shared/ghost-elements';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';

const DECLARATIONS = [RxIfBasicComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    VisualizerModule,
    UnpatchEventsModule,
    MatButtonModule,
    DirtyChecksModule,
    ValueModule,
    GhostElementsModule,
    ValueProvidersModule,
    StrategySelectModule,
    RouterModule.forChild(ROUTES),
    IfModule,
  ],
  exports: DECLARATIONS,
})
export class RxIfDemoModule {}
