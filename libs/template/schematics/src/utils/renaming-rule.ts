import { chain, Tree } from '@angular-devkit/schematics';
import {
  addImports,
  createProject,
  getImports,
  ImportSpecifier,
  saveActiveProject,
  setActiveProject,
} from 'ng-morph';

import { formatFiles } from './format-files';

export function renamingRule(
  packageName: string,
  renames: Record<string, string | [string, string]>
) {
  return () => {
    const getRename = (namedImport: string) => ({
      namedImport: Array.isArray(renames[namedImport])
        ? renames[namedImport][0]
        : namedImport,
      moduleSpecifier: Array.isArray(renames[namedImport])
        ? renames[namedImport][1]
        : (renames[namedImport] as string),
    });

    return chain([
      (tree: Tree) => {
        setActiveProject(createProject(tree, '/', ['**/*.ts']));

        const imports = getImports('**.ts', {
          moduleSpecifier: packageName,
        });
        const newImports = new Map<string, string[]>();

        imports.forEach((importDeclaration) => {
          Object.keys(renames).forEach((importRename) => {
            const namedImports = importDeclaration.getNamedImports();
            const rename = getRename(importRename);

            namedImports.forEach((namedImport) => {
              if (namedImport.getText() === importRename) {
                const filePath = importDeclaration
                  .getSourceFile()
                  .getFilePath()
                  .toString();
                const key = `${filePath}__${rename.moduleSpecifier}`;

                if (newImports.has(key)) {
                  const value = newImports.get(key);
                  newImports.set(key, [...value, rename.namedImport]);
                } else {
                  newImports.set(key, [rename.namedImport]);
                }

                renameReferences(namedImport, importRename, rename.namedImport);
                namedImport.remove();
              }
            });
          });

          if (importDeclaration.getNamedImports.length === 0) {
            importDeclaration.remove();
          }
        });

        newImports.forEach((namedImports, key) => {
          const [filePath, moduleSpecifier] = key.split('__');
          addImports(filePath, {
            namedImports: namedImports,
            moduleSpecifier: moduleSpecifier,
          });
        });

        saveActiveProject();
      },
      formatFiles(),
    ]);
  };
}

function renameReferences(
  importSpecifier: ImportSpecifier,
  oldName: string,
  newName: string
) {
  importSpecifier
    .getNameNode()
    .findReferencesAsNodes()
    .forEach((ref) => {
      if (ref.getText() === oldName) {
        ref.replaceWithText(newName);
      }
    });
}
