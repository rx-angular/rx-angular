import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';

describe('Template Migration virtual-scrolling-stable', () => {
  let appTree: UnitTestTree;

  it('should replace module specifier', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        ListRange,
        RxVirtualForViewContext,
        RxVirtualScrollElement,
        RxVirtualScrollStrategy,
        RxVirtualScrollViewport,
        RxVirtualViewRepeater,
        AutoSizeVirtualScrollStrategy,
        DynamicSizeVirtualScrollStrategy,
        FixedSizeVirtualScrollStrategy,
        RxVirtualFor,
        RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
        RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS_FACTORY,
        RxVirtualScrollDefaultOptions,
        RxVirtualScrollElementDirective,
        RxVirtualScrollViewportComponent,
        RxVirtualScrollWindowDirective
      } from '@rx-angular/template/experimental/virtual-scrolling';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule,
          RxVirtualFor,
          RxVirtualScrollViewportComponent,
          RxVirtualScrollElementDirective,
          RxVirtualScrollWindowDirective
        ],
        providers: [
          { provide: RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS, useValue: {} }
        ],
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
      path.join(__dirname, '../../../migration.json'),
    );
    const tree = new UnitTestTree(Tree.empty());

    tree.create(filePath, fileInput);

    return runner.runSchematic(`virtual-scrolling-stable`, {}, tree);
  }
});
