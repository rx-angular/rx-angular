import { StrategyConstructor } from './strategy-constructor.type';
import { ExtendedStrategies } from './extended-strategy';
import { DefaultStrategyName } from './default-strategy-name.type';

export interface TemplateSetup<S extends string = DefaultStrategyName> {
  defaultStrategy?: keyof ExtendedStrategies<S>;
  defaultInvisibleStrategy?: keyof ExtendedStrategies<S>;
  customStrategies?: Record<S, StrategyConstructor>;
}
