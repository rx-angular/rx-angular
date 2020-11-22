import { NgModule } from '@angular/core';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { IfVisibleComponent } from './if-visible.component';
import { LetModule } from '../../../../shared/rx-angular-pocs/let/let.module';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { IfVisibleDirective } from './if-visible.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TriggerProviderModule } from '../../../../shared/debug-helper/trigger-provider/trigger-provider.module';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RxLetPocModule } from '../rx-let-poc/rx-let-poc.module';

const DECLARATIONS = [
  IfVisibleComponent,
  IfVisibleDirective
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    VisualizerModule,
    ValueProvidersModule,
    RxLetPocModule

  ],
  exports: DECLARATIONS,
  providers: []
})
export class IfVisibleModule {
}
