import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';

describe('cdk migration 1.0.0', () => {
  let appTree: UnitTestTree;

  /* Increase Jest timeout because of long living tests. */
  beforeAll(() => jest.setTimeout(10_000));

  /* Reset default timeout to 5s. */
  afterAll(() => jest.setTimeout(5_000));

  it('should replace coalescing', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        RxCoalescingOptions,
        coalescingObj,
        coalesceWith,
        coalescingManager,
        CoalescingManager
      } from '@rx-angular/cdk';

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
      '@rx-angular/cdk',
      path.join(__dirname, '../../../migration.json')
    );
    const tree = new UnitTestTree(Tree.empty());

    tree.create(filePath, fileInput);

    return runner.runSchematicAsync(`update-1-0-0`, {}, tree).toPromise();
  }
});
