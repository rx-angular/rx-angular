import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';

describe('Template Migration introduce-rxfor-stable', () => {
  let appTree: UnitTestTree;

  it('should replace module specifier', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        ForModule,
        RxFor
      } from '@rx-angular/template/experimental/for';
      import { RxForViewContext } from '@rx-angular/template/experimental/for';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule,
          ForModule
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
      '@rx-angular/template',
      path.join(__dirname, '../../../migration.json')
    );
    const tree = new UnitTestTree(Tree.empty());

    tree.create(filePath, fileInput);

    return runner
      .runSchematicAsync(`introduce-rxfor-stable`, {}, tree)
      .toPromise();
  }
});
