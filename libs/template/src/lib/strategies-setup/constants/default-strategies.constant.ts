import { createGlobalStrategy } from '../../render-strategies/strategies/global.strategy';
import {
  createLocalStrategy,
  createDetachStrategy,
} from '../../render-strategies/strategies/local.strategy';
import {
  createNativeStrategy,
  createNoopStrategy,
} from '../../render-strategies';

export const defaultStrategies = {
  global: createGlobalStrategy,
  local: createLocalStrategy,
  native: createNativeStrategy,
  noop: createNoopStrategy,
  detach: createDetachStrategy,
};
