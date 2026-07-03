import { createCommonMergeGroups } from './common-strategy';
import { assignMergeGroup } from './merge-groups';
import { createReachabilityMergeGroups } from './reachability-strategy';
import { createStaticClosureMergeGroups } from './static-closure-strategy';
import {
  type MergeStrategy,
  type MergeStrategyConfig,
  type MergeStrategyContext,
  STRATEGY_TYPE,
  type StrategyDefinition,
} from './types';

export function applyStrategies(
  config: MergeStrategyConfig,
  context: MergeStrategyContext,
): void {
  for (const strategy of config.strategies) {
    applyStrategy(strategy, context);
  }
}

function applyStrategy(
  strategy: StrategyDefinition,
  context: MergeStrategyContext,
): void {
  switch (strategy.type) {
    case STRATEGY_TYPE.REACHABILITY:
      applyMergeGroups(
        createReachabilityMergeGroups(context.entryPointChunk, context.graph),
        strategy.label,
        context,
      );
      return;

    case STRATEGY_TYPE.STATIC_CLOSURE:
      applyMergeGroups(
        createStaticClosureMergeGroups(strategy, context),
        strategy.label,
        context,
      );
      return;

    case STRATEGY_TYPE.COMMON:
      applyMergeGroups(
        createCommonMergeGroups(strategy, context),
        strategy.label,
        context,
      );
      return;

    default:
      assertUnreachable(strategy);
  }
}

function applyMergeGroups(
  mergeGroups: MergeStrategy,
  strategyLabel: string,
  context: MergeStrategyContext,
): void {
  for (const [owner, chunks] of mergeGroups) {
    if (context.assigned.has(owner)) {
      throw new Error(
        `Merge group owner "${owner}" specified in "${strategyLabel}" has already been assigned.`,
      );
    }

    assignMergeGroup(owner, chunks, context);
  }
}

function assertUnreachable(value: never): never {
  throw new Error(`Unknown merge strategy: ${JSON.stringify(value)}`);
}
