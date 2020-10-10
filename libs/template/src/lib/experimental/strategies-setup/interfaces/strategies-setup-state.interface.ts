import { DefaultStrategies } from './default-strategies.interface';

export interface StrategiesSetupState {
  currentStrategy: keyof DefaultStrategies;
  currentInvisibleStrategy: keyof DefaultStrategies;
}
