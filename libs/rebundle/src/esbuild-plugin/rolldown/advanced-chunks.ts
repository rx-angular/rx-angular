import type { OutputOptions } from 'rolldown';
import type { MergeStrategy } from '../../core/index.ts';

export function rolldownCodeSplitting(
  strategy: MergeStrategy,
): OutputOptions['codeSplitting'] {
  return {
    includeDependenciesRecursively: false,
    groups: [...strategy]
      .filter(([, chunks]) => chunks.length !== 1)
      .map(([name, chunks]) => ({
        name,
        test: new RegExp(chunks.map(escapeRegExp).join('|'), 'g'),
      })),
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
