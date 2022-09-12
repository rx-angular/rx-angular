import { NgModule } from '@angular/core';
import { ForModule } from '@rx-angular/template/for';
import { LetModule } from '@rx-angular/template/let';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { RxContextComponent } from './rx-context.component';
import { GhostElementsModule } from '../../../shared/ghost-elements';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TriggerProviderModule } from '../../../shared/debug-helper/trigger-provider/trigger-provider.module';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { RxContextModule } from '../../../rx-angular-pocs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const DECLARATIONS = [RxContextComponent];

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
    MatCardModule,
    DirtyChecksModule,
    ForModule,
    RxContextModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: DECLARATIONS,
  providers: [],
})
export class RxContextDemoModule {}
