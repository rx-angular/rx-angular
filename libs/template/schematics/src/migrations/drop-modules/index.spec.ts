import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';

describe('Template Migration drop-modules', () => {
  let appTree: UnitTestTree;

  it('should should replace modules with standalone', async () => {
    appTree = await setupTestFile(`
      import { Component } from '@angular/core';
      import { LetModule } from '@rx-angular/template/let';
      import { ForModule } from '@rx-angular/template/for';
      import { UnpatchModule } from '@rx-angular/template/unpatch';
      import { PushModule } from '@rx-angular/template/push';
      import { IfModule } from '@rx-angular/template/if';

      @Component({
        imports: [
          LetModule,
          ForModule,
          UnpatchModule,
          PushModule,
          IfModule
        ]
      })
      export class Component { }
  `);

    const file = appTree.readContent('component.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace LetDirective with RxLet', async () => {
    appTree = await setupTestFile(`
      import { Component } from '@angular/core';
      import {
        LetDirective
      } from '@rx-angular/template/let';

      @Component({
        imports: [LetDirective]
      })
      export class Component { }
  `);

    const file = appTree.readContent('component.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace UnpatchDirective with RxUnpatch', async () => {
    appTree = await setupTestFile(`
      import { Component } from '@angular/core';
      import {
        UnpatchDirective
      } from '@rx-angular/template/unpatch';

      @Component({
        imports: [UnpatchDirective]
      })
      export class Component { }
  `);

    const file = appTree.readContent('component.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace PushPipe with RxPush', async () => {
    appTree = await setupTestFile(`
      import { Component } from '@angular/core';
      import {
        PushPipe
      } from '@rx-angular/template/push';

      @Component({
        imports: [PushPipe]
      })
      export class Component { }
  `);

    const file = appTree.readContent('component.ts');

    expect(file).toMatchSnapshot();
  });

  function setupTestFile(fileInput: string, filePath = './component.ts') {
    const runner = new SchematicTestRunner(
      '@rx-angular/template',
      path.join(__dirname, '../../../migration.json')
    );
    const tree = new UnitTestTree(Tree.empty());

    tree.create(filePath, fileInput);

    return runner.runSchematic(`drop-modules`, {}, tree);
  }
});
