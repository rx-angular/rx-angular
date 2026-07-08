import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RxIf } from '@rx-angular/template/if';
import { UnpatchEventsModule } from '../../../rx-angular-pocs/template/directives/unpatch';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { ValueModule } from '../../../shared/debug-helper/value-provider/value/value.module';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { GhostElementsModule } from '../../../shared/ghost-elements';
import { ROUTES } from './rx-if.routes';
import { RxIfBasicComponent } from './rx-if-basic.component';

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
    RxIf,
  ],
  exports: DECLARATIONS,
})
export class RxIfDemoModule {}
