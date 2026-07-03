import type { Metafile } from 'esbuild';
import type { BundleGraph, MergeStrategy, OutputPath } from './contracts';

export const STRATEGY_TYPE = {
  REACHABILITY: 'reachability',
  STATIC_CLOSURE: 'static-closure',
  COMMON: 'common',
} as const;

export type StrategyType = (typeof STRATEGY_TYPE)[keyof typeof STRATEGY_TYPE];

export interface ReachabilityStrategyDefinition {
  label: string;
  type: typeof STRATEGY_TYPE.REACHABILITY;
}

export interface StaticClosureStrategyDefinition {
  label: string;
  type: typeof STRATEGY_TYPE.STATIC_CLOSURE;
  entryPoint: string;
}

export interface CommonStrategyDefinition {
  label: string;
  type: typeof STRATEGY_TYPE.COMMON;
  entryPoints: string[];
}

export type StrategyDefinition =
  | ReachabilityStrategyDefinition
  | StaticClosureStrategyDefinition
  | CommonStrategyDefinition;

export interface MergeStrategyConfig {
  name: string;
  strategies: StrategyDefinition[];
  verbose?: boolean;
}

export interface MergeStrategyContext {
  assigned: Set<OutputPath>;
  mergeStrategy: MergeStrategy;
  graph: BundleGraph;
  entryPointChunk: OutputPath;
  metafile: Metafile;
}

export interface MergeStrategyFactory {
  (
    entryPointChunk: OutputPath,
    metafile: Metafile,
    config?: MergeStrategyConfig,
  ): MergeStrategy;
}

export type { BundleGraph, MergeStrategy, OutputPath } from './contracts';
