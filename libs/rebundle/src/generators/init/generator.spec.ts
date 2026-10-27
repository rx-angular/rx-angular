import { readJson, type Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { version as packageVersion } from '../../../package.json';
import initGenerator from './generator';

describe('init generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('adds rebundle to devDependencies', async () => {
    await initGenerator(tree, { skipFormat: true });

    const packageJson = readJson(tree, 'package.json');

    expect(packageJson.devDependencies['@rx-angular/rebundle']).toBe(
      packageVersion,
    );
  });

  it('does not update package.json when skipPackageJson is true', async () => {
    await initGenerator(tree, {
      skipFormat: true,
      skipPackageJson: true,
    });

    const packageJson = readJson(tree, 'package.json');

    expect(packageJson.devDependencies['@rx-angular/rebundle']).toBe(undefined);
  });
});
