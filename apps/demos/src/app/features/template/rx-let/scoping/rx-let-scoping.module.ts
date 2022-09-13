import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { UnpatchEventsModule } from '../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.module';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks/index';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/strategy-select.module';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/value-providers.module';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { ContentChildDirective, ContentParent } from './intermediate.component';
import { RxLetScopingComponent } from './rx-let-scoping.component';
import { LetModule } from '@rx-angular/template/let';

const routes: Routes = [
  {
    path: '',
    component: RxLetScopingComponent,
  },
];

@NgModule({
  declarations: [RxLetScopingComponent, ContentParent, ContentChildDirective],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    ValueProvidersModule,
    UnpatchEventsModule,
    StrategySelectModule,
    VisualizerModule,
    LetModule,
    DirtyChecksModule,
  ],
})
export class RxLetScopingModule {}
