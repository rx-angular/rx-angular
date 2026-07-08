import {
  type OutputOptions,
  type Plugin,
  type PreRenderedChunk,
  rolldown,
  type RolldownOutput,
} from 'rolldown';
import type { MergeStrategy } from '../../core/index.ts';
import { rolldownCodeSplitting } from './advanced-chunks.ts';

export async function rolldownRebundle(
  entry: string,
  sourcemap: OutputOptions['sourcemap'],
  strategy: MergeStrategy,
  loaderPlugin: Plugin,
  outputOptions?: {
    entryFileNames?: OutputOptions['entryFileNames'];
  },
): Promise<RolldownOutput['output']> {
  const bundle = await rolldown({
    input: [entry],
    plugins: [loaderPlugin],
    preserveEntrySignatures: false,
    logLevel: 'silent',
  });

  const bundleOutput = await bundle.generate({
    sourcemap,
    hashCharacters: 'base36',
    chunkFileNames: preserveFacade,
    codeSplitting: rolldownCodeSplitting(strategy),
    entryFileNames: outputOptions?.entryFileNames,
  });

  await bundle.close();

  return bundleOutput.output;
}

function preserveFacade({ facadeModuleId }: PreRenderedChunk): string {
  if (!facadeModuleId) {
    return 'chunk-[hash].js';
  }

  return facadeModuleId.replace(getHashFromFileName(facadeModuleId), '[hash]');
}

function getHashFromFileName(name: string): string {
  return name.replace(/(\.js(\.map)?)$/, '').slice(-8);
}
