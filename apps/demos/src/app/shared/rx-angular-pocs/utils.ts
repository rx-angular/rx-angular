import { StrategySelection, RenderStrategy } from '@rx-angular/template';

export function getEnsureStrategy(strategies: StrategySelection) {
  return (strategy: string): RenderStrategy => {
    const s = strategies[strategy];
    if (!!s) {
      return s;
    }
    throw new Error(`Strategy ${strategy} does not exist.`);
  };
}
