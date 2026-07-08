export { createCommonMergeGroups } from './common-strategy.ts';
export { DEFAULT_MERGE_STRATEGY_CONFIG } from './config.ts';
export {
  type BundleGraph,
  type BundleGraphImport,
  type BundleGraphNode,
  type ImportKind,
  type MergeStrategy,
  type OutputImport,
  type OutputPath,
} from './contracts.ts';
export {
  createBundleGraph,
  findOutputForEntryPoint,
  getDynamicDependencies,
  getReachableGraphOutputPaths,
  getStaticDependencies,
  getTransitiveStaticDependencies,
  isJavaScriptOutput,
} from './graph.ts';
export { getStaticClosure } from './graph-queries.ts';
export { assignMergeGroup } from './merge-groups.ts';
export { mergeStrategyFactory } from './merge-strategy-factory.ts';
export { createReachabilityMergeGroups } from './reachability-strategy.ts';
export { createStaticClosureMergeGroups } from './static-closure-strategy.ts';
export { applyStrategies } from './strategy-applicator.ts';
export {
  type CommonStrategyDefinition,
  type MergeStrategyConfig,
  type MergeStrategyContext,
  type MergeStrategyFactory,
  type ReachabilityStrategyDefinition,
  type StaticClosureStrategyDefinition,
  STRATEGY_TYPE,
  type StrategyDefinition,
  type StrategyType,
} from './types.ts';
