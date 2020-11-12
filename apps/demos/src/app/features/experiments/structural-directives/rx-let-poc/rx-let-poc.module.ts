import { NgModule } from '@angular/core';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { RxLetPocComponent } from './rx-let-poc.component';
import { LetModule } from '../../../../shared/rx-angular-pocs/let/let.module';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { LetDirectiveTriggered } from './rx-let-suspense-trigger.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TriggerProviderModule } from '../../../../shared/debug-helper/trigger-provider/trigger-provider.module';
import { RxQueryComponent } from './rx-query.component';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

const DECLARATIONS = [
  RxLetPocComponent,
  LetDirectiveTriggered,
  RxQueryComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    LetModule,
    VisualizerModule,
    ValueProvidersModule,
    StrategySelectModule,
    GhostElementsModule,
    MatButtonModule,
    MatProgressBarModule,
    TriggerProviderModule,
    MatInputModule,
    RouterModule,
    MatCardModule
  ],
  exports: DECLARATIONS,
  providers: []
})
export class RxLetPocModule {
}
