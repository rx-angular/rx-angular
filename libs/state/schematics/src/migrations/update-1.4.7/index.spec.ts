import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';

describe('state migration update-1.4.7', () => {
  let appTree: UnitTestTree;

  /* Increase Jest timeout because of long living tests. */
  beforeAll(() => jest.setTimeout(20_000));

  /* Reset default timeout to 5s. */
  afterAll(() => jest.setTimeout(5_000));

  it('should replace state/state', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import { RxState } from '@rx-angular/state';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace cdk/state', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        createSideEffectObservable,
        createAccumulationObservable,
        select,
        stateful,
        distinctUntilSomeChanged,
        selectSlice,
        KeyCompareMap,
        CompareFn,
        PickSlice
      } from '@rx-angular/state';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace cdk/transformations', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        insert,
        remove,
        toDictionary,
        update,
        extract,
        upsert,
        setProp,
        patch,
        deleteProp,
        dictionaryToArray,
        toggle,
        slice
      } from '@rx-angular/state';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  function setupTestFile(fileInput: string, filePath = './app.module.ts') {
    const runner = new SchematicTestRunner(
      '@rx-angular/state',
      path.join(__dirname, '../../../migration.json')
    );
    const tree = new UnitTestTree(Tree.empty());

    tree.create(filePath, fileInput);

    return runner.runSchematicAsync(`update-1.4.7`, {}, tree).toPromise();
  }
});
