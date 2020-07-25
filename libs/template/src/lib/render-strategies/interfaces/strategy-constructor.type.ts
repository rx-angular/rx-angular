import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../../core/render-aware';

export type StrategyConstructorType = <T>(
  config: RenderStrategyFactoryConfig
) => RenderStrategy;
