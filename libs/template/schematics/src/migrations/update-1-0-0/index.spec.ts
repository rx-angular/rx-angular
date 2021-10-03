import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';

describe('Template Migration 1.0.0', () => {
  let appTree: UnitTestTree;

  /* Increase Jest timeout because of long living tests. */
  beforeAll(() => jest.setTimeout(10_000));

  /* Reset default timeout to 5s. */
  afterAll(() => jest.setTimeout(5_000));

  it('should replace LetModule + LetDirective module specifier', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        LetModule,
        LetDirective
      } from '@rx-angular/template';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule,
          LetModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace PushModule + PushPipe module specifier', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import { PushModule, PushPipe } from '@rx-angular/template';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule,
          PushModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace UnpatchEventsModule + UnpatchDirective module specifier', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import { UnpatchEventsModule, UnpatchDirective } from '@rx-angular/template';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule,
          UnpatchEventsModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace all module specifiers', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import { LetModule, PushModule, UnpatchEventsModule } from '@rx-angular/template';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule,
          UnpatchEventsModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace UnpatchEventsModule identifier', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import { LetModule, PushModule, UnpatchEventsModule } from '@rx-angular/template';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule,
          UnpatchEventsModule
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

    return runner.runSchematicAsync(`update-1-0-0`, {}, tree).toPromise();
  }
});
