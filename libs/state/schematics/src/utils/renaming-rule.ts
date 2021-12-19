import { chain, Tree } from '@angular-devkit/schematics';
import { findNodes } from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';
import { createRemoveChange, ReplaceChange } from './changes';
import { formatFiles } from './format-files';
import { insert, insertImport } from './insert';
import { visitTSSourceFiles } from './visitors';

export function renamingRule(
  packageName: string,
  renames: Record<string, string | [string, string]>
) {
  return () => {
    return chain([
      (tree: Tree) => {
        visitTSSourceFiles(tree, (sourceFile) => {
          /* Collect RxAngular imports. */
          const imports = sourceFile.statements
            .filter(ts.isImportDeclaration)
            .filter(
              ({ moduleSpecifier }) =>
                moduleSpecifier.getText(sourceFile) === `'${packageName}'` ||
                moduleSpecifier.getText(sourceFile) === `"${packageName}"`
            );

          if (imports.length === 0) {
            return;
          }

          /* Remove old imports. */
          const removeChanges = findImportSpecifiers(
            sourceFile,
            imports,
            renames
          ).map(({ importDeclaration }) => {
            return createRemoveChange(
              sourceFile,
              importDeclaration,
              importDeclaration.getStart(),
              importDeclaration.getFullText()
            );
          });

          /* Insert new imports. */
          const insertChanges = findImportSpecifiers(
            sourceFile,
            imports,
            renames
          ).map(({ importSpecifier }) => {
            const asSpecifier = /\s+as.*/gm.exec(importSpecifier);
            const as = asSpecifier != null ? asSpecifier[0] : '';
            const i = importSpecifier.replace(/\s+as.*/gm, '');
            const rename = renames[i];
            const symbolName = `${
              typeof rename === 'string' ? i : rename[0]
            }${as}`;
            return insertImport(
              sourceFile,
              sourceFile.fileName,
              symbolName,
              typeof rename === 'string' ? rename : rename[1],
              false,
              packageName
            );
          });

          /* Replace node occurrences if a rename is specified, eg: { OldModuleName: ['NewModuleName', 'new-path.ts'] } */
          const replaceChanges = Object.entries(renames)
            .filter(([, rename]) => Array.isArray(rename))
            .flatMap(([oldName, [newName]]) =>
              replaceNodeOccurrences(sourceFile, oldName, newName)
            );

          insert(tree, sourceFile.fileName, [
            ...removeChanges,
            ...insertChanges,
            ...replaceChanges,
          ]);
        });
      },
      formatFiles(),
    ]);
  };
}

function replaceNodeOccurrences(
  sourceFile: ts.SourceFile,
  oldName: string,
  newName: string
) {
  const nodeOccurrences: ReplaceChange[] = [];
  (function collectReplaces(node: ts.Node) {
    if (ts.isIdentifier(node) && node.getText(sourceFile) === oldName) {
      nodeOccurrences.push(
        new ReplaceChange(
          sourceFile.fileName,
          node.getStart(),
          node.getText(),
          newName
        )
      );
    }
    /* Skip replacing imports since it was already replaced previously. */
    if (!ts.isImportDeclaration(node)) {
      ts.forEachChild(node, collectReplaces);
    }
  })(sourceFile);
  return nodeOccurrences;
}

function findImportSpecifiers(
  sourceFile: ts.SourceFile,
  imports: ts.ImportDeclaration[],
  renames: Record<string, string | [string, string]>
) {
  return imports.flatMap((importDeclaration) => {
    const importSpecifiers = findNodes(
      importDeclaration,
      ts.SyntaxKind.ImportSpecifier
    );

    return importSpecifiers
      .map((importSpecifier) => ({
        importDeclaration,
        importSpecifier: importSpecifier.getText(sourceFile),
      }))
      .filter(({ importDeclaration, importSpecifier }) => {
        const i = importSpecifier.replace(/\s+as.*/gm, '');
        const rename = renames[i];
        if (!rename) {
          return false;
        }
        const imports = importDeclaration.importClause
          .getText(sourceFile)
          .replace(/{/g, '')
          .replace(/}/g, '')
          .trim()
          .split(',');
        if (imports.length > 1) {
          return true;
        }
        const symbolName = `${typeof rename === 'string' ? i : rename[0]}`;
        const importPath = (typeof rename === 'string' ? rename : rename[1])
          .replace(/'/g, '')
          .replace(/"/g, '');
        const currentImport = importDeclaration.moduleSpecifier
          .getText(sourceFile)
          .replace(/'/g, '')
          .replace(/"/g, '');

        return currentImport !== importPath || symbolName !== importSpecifier;
      });
  });
}
