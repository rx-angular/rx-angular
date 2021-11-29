import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { readJsonInTree } from '../../utils/read-json-in-tree';



const collectionPath = join(__dirname, '../../../collection.json');

const workspaceOptions = {
  name: 'workspace',
  newProjectRoot: 'projects',
  version: '10.1.0',
};

const defaultAppOptions = {
  name: 'template',
};

describe('ng-add schematic', () => {
  let appTree: UnitTestTree;
  let schematicRunner: SchematicTestRunner;

  beforeEach(async () => {
    schematicRunner = new SchematicTestRunner(
      '@rx-angular/schematics',
      collectionPath
    );
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();

    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        defaultAppOptions,
        appTree
      )
      .toPromise();
  });

  it('should add proper package to dependencies', async () => {
    const tree = await schematicRunner
      .runSchematicAsync('ng-add', undefined, appTree)
      .toPromise();

    const packageJson = readJsonInTree(tree, 'package.json');

    expect(packageJson.dependencies['@rx-angular/cdk']).toBeDefined();
    expect(packageJson.devDependencies['@rx-angular/cdk']).toBeUndefined();
  });
});
