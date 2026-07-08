import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import { RxContextModule } from '../../../rx-angular-pocs';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';
import { TriggerProviderModule } from '../../../shared/debug-helper/trigger-provider/trigger-provider.module';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { GhostElementsModule } from '../../../shared/ghost-elements';
import { RxContextComponent } from './rx-context.component';

const DECLARATIONS = [RxContextComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    RxLet,
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
    RxFor,
    RxContextModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: DECLARATIONS,
  providers: [],
})
export class RxContextDemoModule {}
