import type { MergeStrategy } from '../../core';
import { rolldownCodeSplitting } from './advanced-chunks';

describe('rolldownCodeSplitting', () => {
  it('should generate exact anchored regexes for chunk basenames', () => {
    const strategy: MergeStrategy = new Map([
      [
        'dist/apps/rebundle-demo/browser/root-chunker.routes-ABCD.js',
        [
          'dist/apps/rebundle-demo/browser/chunk-1234.js',
          'dist/apps/rebundle-demo/browser/chunk-5678.js',
        ],
      ],
    ]);

    const codeSplitting = rolldownCodeSplitting(strategy) as any;

    expect(codeSplitting?.groups).toEqual([
      {
        name: 'dist/apps/rebundle-demo/browser/root-chunker.routes-ABCD.js',
        test: /^(?:chunk-1234\.js|chunk-5678\.js)$/,
      },
    ]);

    // Test that the regex actually matches the basename
    const regex = codeSplitting!.groups![0].test as RegExp;
    expect(regex.test('chunk-1234.js')).toBe(true);
    expect(regex.test('chunk-5678.js')).toBe(true);

    // Test that it does NOT match full paths (because resolveId returns basenames)
    expect(regex.test('dist/apps/rebundle-demo/browser/chunk-1234.js')).toBe(
      false,
    );

    // Test that it does NOT match substrings due to anchors
    expect(regex.test('my-chunk-1234.js')).toBe(false);

    // Test that multiple .test() calls work correctly (no "g" flag bug)
    expect(regex.test('chunk-1234.js')).toBe(true);
    expect(regex.test('chunk-1234.js')).toBe(true);
  });
});
