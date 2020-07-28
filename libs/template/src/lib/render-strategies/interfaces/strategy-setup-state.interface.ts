import { ExtendedStrategies } from './extended-strategy';
import { DefaultStrategyName } from './default-strategy-name.type';

export interface StrategySetupState<S extends string = DefaultStrategyName> {
  strategies: ExtendedStrategies<S>;
  currentStrategy: keyof ExtendedStrategies<S>;
  currentOutOfViewportStrategy: keyof ExtendedStrategies<S>;
}
