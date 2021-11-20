import { chain, Tree } from '@angular-devkit/schematics';
import { findNodes } from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';
import { createRemoveChange } from './changes';
import { formatFiles } from './format-files';
import { insert, insertImport } from './insert';
import { visitTSSourceFiles } from './visitors';

export function renamingRule(renames: Record<string, string | [string, string]>) {
  return () => {
    return chain([
      (tree: Tree) => {
        visitTSSourceFiles(tree, (sourceFile) => {
          /* Collect RxAngular imports. */
          const imports = sourceFile.statements
            .filter(ts.isImportDeclaration)
            .filter(
              ({ moduleSpecifier }) =>
                moduleSpecifier.getText(sourceFile) ===
                `'@rx-angular/cdk'` ||
                moduleSpecifier.getText(sourceFile) === `"@rx-angular/cdk"`
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
              const asSpecifier = /\s+as.*/gm.exec(importSpecifier);
              const as = asSpecifier != null ? asSpecifier[0] : '';
              const i = importSpecifier.replace(/\s+as.*/gm, '');
              const rename = renames[i];
              const symbolName = `${(typeof rename === 'string' ? i : rename[0])}${as}`;
              return insertImport(
                sourceFile,
                sourceFile.fileName,
                symbolName,
                typeof rename === 'string' ? rename : rename[1]
              );
            }
          );

          insert(tree, sourceFile.fileName, [...insertChanges, ...removeChanges]);
        });
      },
      formatFiles()
    ]);
  }
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
