import type { OutputFile } from 'esbuild';

export function toEsbuildOutputFile(
  filename: string,
  code: string,
  hash: string,
): OutputFile {
  return {
    path: filename,
    contents: new TextEncoder().encode(code),
    hash,
    get text() {
      return new TextDecoder().decode(this.contents);
    },
  };
}
