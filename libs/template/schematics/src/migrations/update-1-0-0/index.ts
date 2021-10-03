import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { findNodes } from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';

import { createRemoveChange } from '../../common/utils/changes';
import { insert, insertImport } from '../../common/utils/insert';
import { replaceNodeValue } from '../../common/utils/replace-node-value';
import { visitTSSourceFiles } from '../../common/utils/visitors';

const renames: Record<string, string | [string, string]> = {
  LetModule: '@rx-angular/template/let',
  LetDirective: '@rx-angular/template/let',
  PushModule: '@rx-angular/template/push',
  PushPipe: '@rx-angular/template/push',
  UnpatchDirective: '@rx-angular/template/unpatch',
  UnpatchEventsModule: ['UnpatchModule', '@rx-angular/template/unpatch'],
};

export default function (): Rule {
  return chain([
    (tree: Tree) => {
      visitTSSourceFiles(tree, (sourceFile) => {
        /* Collect RxAngular imports. */
        const imports = sourceFile.statements
          .filter(ts.isImportDeclaration)
          .filter(
            ({ moduleSpecifier }) =>
              moduleSpecifier.getText(sourceFile) ===
                `'@rx-angular/template'` ||
              moduleSpecifier.getText(sourceFile) === `"@rx-angular/template"`
          );

        if (imports.length === 0) {
          return;
        }

        /* Remove old imports. */
        const removeChanges = findImportSpecifiers(sourceFile, imports).map(
          ({ importDeclaration }) => {
            return createRemoveChange(
              sourceFile,
              importDeclaration,
              importDeclaration.getStart(),
              importDeclaration.getFullText()
            );
          }
        );

        /* Insert new imports. */
        const insertChanges = findImportSpecifiers(sourceFile, imports).map(
          ({ importSpecifier }) => {
            const rename = renames[importSpecifier];
            return insertImport(
              sourceFile,
              sourceFile.fileName,
              typeof rename === 'string' ? importSpecifier : rename[0],
              typeof rename === 'string' ? rename : rename[1]
            );
          }
        );

        insert(tree, sourceFile.fileName, [...insertChanges, ...removeChanges]);
      });
    },
    (tree: Tree) => {
      visitTSSourceFiles(tree, (sourceFile) => {
        /* Replace UnpatchEventsModule declaration to UnpatchModule. */
        (function replaceUnpatchEventsModule(node: ts.Node) {
          if (
            ts.isIdentifier(node) &&
            node.getText(sourceFile) === 'UnpatchEventsModule'
          ) {
            replaceNodeValue(
              tree,
              sourceFile.fileName,
              node,
              renames.UnpatchEventsModule[0] + ','
            );
          }
          ts.forEachChild(node, replaceUnpatchEventsModule);
        })(sourceFile);
      });
    },
  ]);
}

function findImportSpecifiers(
  sourceFile: ts.SourceFile,
  imports: ts.ImportDeclaration[]
) {
  return imports.flatMap((importDeclaration) => {
    const importSpecifiers = findNodes(
      importDeclaration,
      ts.SyntaxKind.ImportSpecifier
    );

    return importSpecifiers.map((importSpecifier) => ({
      importDeclaration,
      importSpecifier: importSpecifier.getText(sourceFile),
    }));
  });
}
