import { createGlobalStrategy } from '../strategies/global.strategy';
import {
  createDetachStrategy,
  createLocalStrategy
} from '../strategies/local.strategy';
import { createNativeStrategy } from '../strategies/native.strategy';
import { createNoopStrategy } from '../strategies/noop.strategy';

export const availableStrategies = {
  global: createGlobalStrategy,
  local: createLocalStrategy,
  native: createNativeStrategy,
  noop: createNoopStrategy,
  detach: createDetachStrategy
};
