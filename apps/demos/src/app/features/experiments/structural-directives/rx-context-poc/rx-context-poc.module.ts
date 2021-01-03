import { NgModule } from '@angular/core';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { RxContextPocComponent } from './rx-context-poc.component';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TriggerProviderModule } from '../../../../shared/debug-helper/trigger-provider/trigger-provider.module';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { RxContextModule, RxLetModule } from '../../../../rx-angular-pocs';

const DECLARATIONS = [
  RxContextPocComponent
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
    RxContextModule
  ],
  exports: DECLARATIONS,
  providers: []
})
export class RxContextPocModule {
}
