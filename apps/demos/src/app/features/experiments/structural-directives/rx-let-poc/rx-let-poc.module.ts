import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { RxContextModule, RxLetModule } from '../../../../rx-angular-pocs';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { TriggerProviderModule } from '../../../../shared/debug-helper/trigger-provider/trigger-provider.module';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { RxLetPocComponent } from './rx-let-poc.component';
import { RxQueryComponent } from './rx-query.component';
import { RxQueryChildrenComponent } from './rx-query-children.component';
import {
  RxQueryContentComponent,
  RxQueryContentTestDirective,
} from './rx-query-content.component';

const DECLARATIONS = [
  RxLetPocComponent,
  RxQueryComponent,
  RxQueryChildrenComponent,
  RxQueryContentComponent,
  RxQueryContentTestDirective,
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    RxLetModule,
    VisualizerModule,
    ValueProvidersModule,
    StrategySelectModule,
    GhostElementsModule,
    MatButtonModule,
    MatProgressBarModule,
    TriggerProviderModule,
    MatInputModule,
    RouterModule,
    MatCardModule,
    DirtyChecksModule,
    RxContextModule,
  ],
  exports: DECLARATIONS,
  providers: [],
})
export class RxLetPocModule {}
