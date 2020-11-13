import { StrategyCredentials, StrategyCredentialsMap } from './render-stragegies';

export function getEnsureStrategy(strategies: StrategyCredentialsMap): (strategy: string) => StrategyCredentials {
  const memoMapStrategy = new Map<string, StrategyCredentials>();
  return (strategy: string): StrategyCredentials => {
    const lastS = memoMapStrategy.get(strategy);
    if (lastS) {
      return lastS;
    }
    const s = strategies[strategy];
    if (!!s) {
      memoMapStrategy.set(strategy, s);
      return s;
    }
    throw new Error(`Strategy ${strategy} does not exist.`);
  };
}

export const toRxErrorNotification = (error) => ({ kind: 'rxError', hasValue: true, error });
export const toRxSuspenseNotification = (value) => ({ kind: 'rxSuspense', hasValue: true, value });
export const toRxCompleteNotification = () => ({ kind: 'rxComplete', hasValue: false, complete: true });


