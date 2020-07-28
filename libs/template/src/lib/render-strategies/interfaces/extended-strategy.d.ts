import { NoopStrategyConstructor } from './noop-strategy-constructor.type';
import { StrategyConstructor } from './strategy-constructor.type';
import { DefaultStrategyName } from './default-strategy-name.type';

export type ExtendedStrategies<S extends string = DefaultStrategyName> = {
  [key in S | DefaultStrategyName]:
    | StrategyConstructor
    | NoopStrategyConstructor;
};
