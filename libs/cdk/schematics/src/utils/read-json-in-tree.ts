import { Tree } from '@angular-devkit/schematics';

export function readJsonInTree<T = any>(host: Tree, path: string): T {
  if (!host.exists(path)) {
    throw new Error(`Cannot find ${path}`);
  }

  const buffer = host.read(path);
  if (buffer != null) {
    const contents = buffer.toString('utf-8');
    try {
      return JSON.parse(contents);
    } catch (e) {
      throw new Error(`Cannot parse ${path}: ${e.message}`);
    }
  }
  throw new Error(`cannot read ${path}`);
}
