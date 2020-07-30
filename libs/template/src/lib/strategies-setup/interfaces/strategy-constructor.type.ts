import {
  RenderStrategy,
  RenderStrategyFactoryConfig,
} from '../../core/render-aware';

export type StrategyConstructor = (
  config: RenderStrategyFactoryConfig
) => RenderStrategy;
