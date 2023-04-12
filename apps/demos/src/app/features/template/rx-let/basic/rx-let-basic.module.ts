import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule, Routes } from '@angular/router';
import { DirtyChecksModule } from '../../../../rx-angular-pocs/cdk/debug/dirty-check/dirty-checks.module';
import { UnpatchEventsModule } from '../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.module';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/strategy-select.module';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/value-providers.module';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { RxLetBasicComponent } from './rx-let-basic.component';
import { LetModule } from '@rx-angular/template/let';

const routes: Routes = [
  {
    path: '',
    component: RxLetBasicComponent,
  },
];

@NgModule({
  declarations: [RxLetBasicComponent],
  imports: [
    RouterModule.forChild(routes),
    DirtyChecksModule,
    MatButtonModule,
    ValueProvidersModule,
    UnpatchEventsModule,
    StrategySelectModule,
    VisualizerModule,
    LetModule,
  ],
})
export class RxLetBasicModule {}
