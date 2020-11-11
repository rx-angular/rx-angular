import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../../collection.json');

const workspaceOptions = {
  name: 'workspace',
  newProjectRoot: 'projects',
  version: '10.1.0',
  defaultProject: 'template',
};

const defaultAppOptions = {
  name: 'template',
};

describe('ng-add schematic', () => {
  let appTree: UnitTestTree;
  let schematicRunner: SchematicTestRunner;

  beforeEach(async () => {
    schematicRunner = new SchematicTestRunner(
      'rx-angular-schematics',
      collectionPath,
    );
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions,
      )
      .toPromise();

    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        defaultAppOptions,
        appTree,
      )
      .toPromise();
  });

  it('should add proper packages to dependencies', async () => {
    const tree = await schematicRunner
      .runSchematicAsync('ng-add', undefined, appTree)
      .toPromise();
    const packageJson = tree.readContent('/package.json');
    expect(packageJson).toBeTruthy();
    expect(packageJson).toContain('@rx-angular/template');
  });
});
