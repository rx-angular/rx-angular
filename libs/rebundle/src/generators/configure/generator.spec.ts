import {
  addProjectConfiguration,
  readJson,
  readProjectConfiguration,
  type Tree,
  updateProjectConfiguration,
} from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { version as packageVersion } from '../../../package.json';
import configureGenerator from './generator';

describe('configure generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(tree, 'demo', {
      root: 'apps/demo',
      sourceRoot: 'apps/demo/src',
      projectType: 'application',
      targets: {
        build: {
          executor: '@nx/angular:application',
          options: {
            outputPath: 'dist/apps/demo',
            tsConfig: 'apps/demo/tsconfig.app.json',
          },
        },
      },
    });
  });

  it('adds rebundle to the Angular build plugins array', async () => {
    await configureGenerator(tree, {
      project: 'demo',
      skipFormat: true,
    });

    const project = readProjectConfiguration(tree, 'demo');

    expect(project.targets?.['build'].options?.['plugins']).toEqual([
      '@rx-angular/rebundle',
    ]);
  });

  it('does not add a duplicate plugin entry', async () => {
    await configureGenerator(tree, {
      project: 'demo',
      skipFormat: true,
    });
    await configureGenerator(tree, {
      project: 'demo',
      skipFormat: true,
    });

    const project = readProjectConfiguration(tree, 'demo');

    expect(project.targets?.['build'].options?.['plugins']).toEqual([
      '@rx-angular/rebundle',
    ]);
  });

  it('preserves plugin spec object entries', async () => {
    const project = readProjectConfiguration(tree, 'demo');
    const buildTarget = project.targets?.['build'];
    if (!buildTarget?.options) {
      throw new Error(
        'Expected demo project to have a configured build target.',
      );
    }

    buildTarget.options['plugins'] = [
      {
        path: './esbuild.plugins.ts',
        options: {
          custom: true,
        },
      },
    ];
    updateProjectConfiguration(tree, 'demo', project);

    await configureGenerator(tree, {
      project: 'demo',
      skipFormat: true,
    });

    const updatedProject = readProjectConfiguration(tree, 'demo');

    expect(updatedProject.targets?.['build'].options?.['plugins']).toEqual([
      {
        path: './esbuild.plugins.ts',
        options: {
          custom: true,
        },
      },
      '@rx-angular/rebundle',
    ]);
  });

  it('adds rebundle to devDependencies', async () => {
    await configureGenerator(tree, {
      project: 'demo',
      skipFormat: true,
    });

    const packageJson = readJson(tree, 'package.json');

    expect(packageJson.devDependencies['@rx-angular/rebundle']).toBe(
      packageVersion,
    );
  });

  it('migrates Angular application build targets to Nx executors', async () => {
    const project = readProjectConfiguration(tree, 'demo');
    const buildTarget = project.targets?.['build'];
    if (!buildTarget) {
      throw new Error(
        'Expected demo project to have a configured build target.',
      );
    }

    buildTarget.executor = '@angular/build:application';
    project.targets ??= {};
    project.targets['serve'] = {
      executor: '@angular/build:dev-server',
      options: {
        buildTarget: 'demo:build',
      },
    };
    updateProjectConfiguration(tree, 'demo', project);

    await configureGenerator(tree, {
      project: 'demo',
      skipFormat: true,
    });

    const updatedProject = readProjectConfiguration(tree, 'demo');

    expect(updatedProject.targets?.['build'].executor).toBe(
      '@nx/angular:application',
    );
    expect(updatedProject.targets?.['build'].options?.['plugins']).toEqual([
      '@rx-angular/rebundle',
    ]);
    expect(updatedProject.targets?.['serve'].executor).toBe(
      '@nx/angular:dev-server',
    );
  });

  it('throws when the project does not have a build target', async () => {
    addProjectConfiguration(
      tree,
      'library',
      {
        root: 'libs/library',
        projectType: 'library',
      },
      true,
    );

    await expect(
      configureGenerator(tree, {
        project: 'library',
        skipFormat: true,
      }),
    ).rejects.toThrow('Project "library" does not have a build target.');
  });
});
