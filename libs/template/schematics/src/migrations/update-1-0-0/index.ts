import { Rule, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';

import { findNodes } from '@nrwl/workspace';
import { insert, insertImport } from '@nrwl/workspace/src/utils/ast-utils';
import { visitTSSourceFiles } from '../../common/utils/visitors';
import { createRemoveChange } from '../../common/utils/changes';

const renames: Record<string, string> = {
  LetModule: '@rx-angular/template/let',
  LetDirective: '@rx-angular/template/let',
  PushModule: '@rx-angular/template/push',
  PushPipe: '@rx-angular/template/push',
  UnpatchDirective: '@rx-angular/template/unpatch',
  UnpatchModule: '@rx-angular/template/unpatch',
};

export default function (): Rule {
  return (tree: Tree) => {
    visitTSSourceFiles(tree, (sourceFile, tree) => {
      const imports = sourceFile.statements
        .filter(ts.isImportDeclaration)
        .filter(
          ({ moduleSpecifier }) =>
            moduleSpecifier.getText(sourceFile) === `'@rx-angular/template'` ||
            moduleSpecifier.getText(sourceFile) === `"@rx-angular/template"`
        );

      if (imports.length === 0) {
        return;
      }

      const changes = updateTemplateImportDeclarations(sourceFile, imports);
      insert(tree, sourceFile.fileName, changes);
    });
  };
}

function updateTemplateImportDeclarations(
  sourceFile: ts.SourceFile,
  imports: ts.ImportDeclaration[]
) {
  return imports
    .flatMap((importDeclaration) => {
      const importSpecifiers = findNodes(
        importDeclaration,
        ts.SyntaxKind.ImportSpecifier
      );
      return importSpecifiers.map((importSpecifier) => ({
        importDeclaration,
        importSpecifier: importSpecifier.getText(),
      }));
    })
    .flatMap(({ importDeclaration, importSpecifier }) => {
      return [
        createRemoveChange(sourceFile, importDeclaration),
        insertImport(sourceFile, sourceFile.fileName, importSpecifier, renames[importSpecifier])
      ];
    });
}
