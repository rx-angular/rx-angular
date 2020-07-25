import { StrategyConstructorType } from './strategy-constructor.type';
import { NoopStrategyConstructorType } from './noop-strategy-constructor.type';

export interface AvailableStrategies {
  global: StrategyConstructorType;
  native: StrategyConstructorType;
  local: StrategyConstructorType;
  detach: StrategyConstructorType;
  noop: NoopStrategyConstructorType;
}
