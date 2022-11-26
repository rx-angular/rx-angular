import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { TriggerProviderModule } from '../../../../shared/debug-helper/trigger-provider/trigger-provider.module';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/index';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/index';

import { TemplateTriggersComponent } from './template-triggers.component';
import { ROUTES } from './template-triggers.routes';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    StrategySelectModule,
    ValueProvidersModule,
    TriggerProviderModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CommonModule,
    LetModule,
  ],
  exports: [],
  declarations: [TemplateTriggersComponent],
  providers: [],
})
export class TemplateTriggersModule {}
