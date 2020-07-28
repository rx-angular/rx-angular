import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../../core/render-aware';

export type NoopStrategyConstructor = (
  config?: RenderStrategyFactoryConfig
) => RenderStrategy;
