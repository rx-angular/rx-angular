import type { Metafile } from 'esbuild';

export type OutputPath = keyof Metafile['outputs'] & string;

export type MergeStrategy = Map<OutputPath, OutputPath[]>;

export type OutputImport = Metafile['outputs'][OutputPath]['imports'][number];

export type ImportKind = Extract<
  OutputImport['kind'],
  'import-statement' | 'dynamic-import'
>;

export interface BundleGraphImport {
  path: OutputPath;
  kind: ImportKind;
}

export interface BundleGraphNode {
  path: OutputPath;
  imports: BundleGraphImport[];
  entryPoint?: string;
  isEntryPoint: boolean;
  bytes: number;
}

export type BundleGraph = Map<OutputPath, BundleGraphNode>;
