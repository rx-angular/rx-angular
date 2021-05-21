import { Tree } from '@angular-devkit/schematics';

export function readJsonInTree<T = any>(host: Tree, path: string): T {
  if (!host.exists(path)) {
    throw new Error(`Cannot find ${path}`);
  }
  // tslint:disable-next-line:no-non-null-assertion
  const contents = host.read(path)!.toString('utf-8');
  try {
    return JSON.parse(contents);
  } catch (e) {
    throw new Error(`Cannot parse ${path}: ${e.message}`);
  }
}
