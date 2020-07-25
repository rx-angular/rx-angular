import { StrategyConstructorType } from './strategy-constructor.type';

export interface AddStrategyRequest {
  name: string;
  constructor: StrategyConstructorType;
  options?: {
    setAsDefault: boolean;
    setAsOutOfViewPortDefault: boolean;
  };
}
