import type { OutputOptions } from 'rolldown';
import type { MergeStrategy } from '../../core';

export function rolldownCodeSplitting(
  strategy: MergeStrategy,
): OutputOptions['codeSplitting'] {
  return {
    includeDependenciesRecursively: false,
    groups: [...strategy]
      .filter(([, chunks]) => chunks.length !== 1)
      .map(([name, chunks]) => ({
        name,
        test: new RegExp(
          '^(?:' +
            chunks
              .map((chunk) => chunk.split('/').at(-1) as string)
              .map(escapeRegExp)
              .join('|') +
            ')$',
        ),
      })),
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
