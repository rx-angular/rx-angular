import { ExtendedStrategies } from './extended-strategy';
import { DefaultStrategyName } from './default-strategy-name.type';

export interface StrategiesSetupState<S extends string = DefaultStrategyName> {
  currentStrategy: keyof ExtendedStrategies<S>;
  currentInvisibleStrategy: keyof ExtendedStrategies<S>;
}
