import { NgModule } from '@angular/core';

import { LetModule } from './let';
import { PushModule } from './push';
import { UnpatchEventsModule } from './experimental/unpatch/events';
import { ViewportPrioModule } from './experimental/viewport-prio';
import { RX_AVAILABLE_STRATEGIES } from './strategies-setup/tokens/available-strategies.token';
import { RX_ANGULAR_DEFAULT_STRATEGY } from './strategies-setup/tokens/default-strategy.token';
import { RX_ANGULAR_DEFAULT_INVISIBLE_STRATEGY } from './strategies-setup/tokens/default-invisible-strategy.token';
import { defaultStrategies } from './strategies-setup/constants/default-strategies.constant';
import { TemplateSetup } from './strategies-setup/interfaces/template-setup.interface';
import { DefaultStrategyName } from './strategies-setup/interfaces/default-strategy-name.type';

@NgModule({
  exports: [LetModule, PushModule, UnpatchEventsModule, ViewportPrioModule],
})
export class TemplateModule {
  static forRoot<S extends string = DefaultStrategyName>(
    params?: TemplateSetup<S>
  ) {
    return {
      ngModule: TemplateModule,
      providers: [
        {
          provide: RX_AVAILABLE_STRATEGIES,
          useValue: {
            ...defaultStrategies,
            ...(params?.customStrategies || {}),
          },
        },
        {
          provide: RX_ANGULAR_DEFAULT_STRATEGY,
          useValue: params?.defaultStrategy || 'local',
        },
        {
          provide: RX_ANGULAR_DEFAULT_INVISIBLE_STRATEGY,
          useValue: params?.defaultInvisibleStrategy || 'noop',
        },
      ],
    };
  }
}
