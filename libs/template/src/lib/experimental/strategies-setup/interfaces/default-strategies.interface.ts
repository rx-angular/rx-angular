import { RenderStrategy } from '../../../core';

export interface DefaultStrategies {
  global: RenderStrategy;
  native: RenderStrategy;
  local: RenderStrategy;
  detach: RenderStrategy;
  noop: RenderStrategy;
}
