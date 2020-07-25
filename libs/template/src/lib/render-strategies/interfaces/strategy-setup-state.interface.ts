import { AvailableStrategies } from './available-strategies.interface';
import { StrategyNameType } from './strategy-name.type';

export interface StrategySetupState {
  strategies: AvailableStrategies;
  currentStrategy: StrategyNameType;
  currentOutOfViewportStrategy: StrategyNameType;
}
