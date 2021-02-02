import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';

import { SchemaOptions } from './schema';

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

const projectPath = `/${workspaceOptions.newProjectRoot}/${defaultAppOptions.name}`;
const options: SchemaOptions = { project: 'template', module: 'app' };

describe('ng-add schematic', () => {
  let appTree: UnitTestTree;
  let schematicRunner: SchematicTestRunner;

  beforeEach(async () => {
    schematicRunner = new SchematicTestRunner(
      'rx-angular-schematics',
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

  it('should import into a specified module', async () => {
    const tree = await schematicRunner
      .runSchematicAsync('ng-add', options, appTree)
      .toPromise();

    const content = tree.readContent(`${projectPath}/src/app/app.module.ts`);

    expect(content).toMatchInlineSnapshot(`
      "import { BrowserModule } from '@angular/platform-browser';
      import { NgModule } from '@angular/core';

      import { AppComponent } from './app.component';
      import { LetModule, PushModule, ViewportPrioModule } from '@rx-angular/template';

      @NgModule({
        declarations: [
          AppComponent
        ],
        imports: [
          BrowserModule,
          LetModule,
          PushModule,
          ViewportPrioModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
      "
    `);
  });
});
