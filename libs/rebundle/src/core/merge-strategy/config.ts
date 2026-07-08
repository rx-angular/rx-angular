import { type MergeStrategyConfig, STRATEGY_TYPE } from './types.ts';

export const DEFAULT_MERGE_STRATEGY_CONFIG: MergeStrategyConfig = {
  name: 'main',
  strategies: [
    {
      label: 'reachability',
      type: STRATEGY_TYPE.REACHABILITY,
    },
  ],
};
