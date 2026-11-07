import { createRequire } from 'node:module';

// @angular-devkit/schematics resolves schematic factories with Node's native
// `require.resolve`, then loads them through Vitest's CommonJS executor.
// Teach the native resolver about `.ts` and let ts-node compile them.
const nativeExtensions = (
  process.getBuiltinModule('module') as unknown as {
    _extensions: Record<string, unknown>;
  }
)._extensions;
nativeExtensions['.ts'] ??= nativeExtensions['.js'];

createRequire(import.meta.url)('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    moduleResolution: 'node',
    ignoreDeprecations: '6.0',
  },
});
