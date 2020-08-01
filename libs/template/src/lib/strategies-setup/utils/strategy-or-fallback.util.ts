import { ExtendedStrategies } from '../interfaces/extended-strategy';
import { DefaultStrategyName } from '../interfaces/default-strategy-name.type';

export function strategyOrFallback<S extends string = DefaultStrategyName>(
  strategies: ExtendedStrategies<S>,
  strategy: keyof ExtendedStrategies<S>,
  fallback: keyof ExtendedStrategies<S>
): keyof ExtendedStrategies<S> {
  const isExisting = strategies[strategy];

  if (!isExisting) {
    console.warn(
      `Strategy '${strategy}' not found. Using '${fallback}' instead`
    );

    return fallback;
  }

  return strategy;
}
