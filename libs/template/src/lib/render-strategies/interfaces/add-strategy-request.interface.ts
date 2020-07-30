import { StrategyConstructor } from './strategy-constructor.type';
import { DefaultStrategyName } from './default-strategy-name.type';

export interface AddStrategyRequest<S extends string = DefaultStrategyName> {
  name: S;
  constructor: StrategyConstructor;
  options?: {
    setAsDefault: boolean;
    setAsOutOfViewPortDefault: boolean;
  };
}
