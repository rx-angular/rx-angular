import { NoopStrategyConstructor } from './noop-strategy-constructor.type';
import { StrategyConstructor } from './strategy-constructor.type';

export interface DefaultStrategies {
  global: StrategyConstructor;
  native: StrategyConstructor;
  local: StrategyConstructor;
  detach: StrategyConstructor;
  noop: NoopStrategyConstructor;
}
