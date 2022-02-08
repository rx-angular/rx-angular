import { chain, Rule, Tree } from '@angular-devkit/schematics';
import {
  addImports,
  createProject,
  getImports,
  ImportSpecifier,
  ImportSpecifierStructure,
  Pattern,
  saveActiveProject,
  setActiveProject,
} from 'ng-morph';

import { formatFiles } from './format-files';

type ImportConfig = Pick<ImportSpecifierStructure, 'alias' | 'name'>;
type RenameConfig = Record<string, string | [string, string]>;

export function renamingRule(packageName: Pattern, renames: RenameConfig) {
  const getRename = configureRenames(renames);

  return (): Rule => {
    return chain([
      (tree: Tree) => {
        setActiveProject(createProject(tree, '/', ['**/*.ts']));

        const imports = getImports('**/*.ts', {
          moduleSpecifier: packageName,
        });
        const newImports = new Map<string, ImportConfig[]>();

        for (const importDeclaration of imports) {
          const namedImports = importDeclaration.getNamedImports();

          for (const namedImport of namedImports) {
            const oldName = namedImport.getName();
            const rename = getRename(oldName);

            if (rename == null) {
              continue;
            }

            const filePath = importDeclaration
              .getSourceFile()
              .getFilePath()
              .toString();
              const key = `${filePath}__${rename.moduleSpecifier}`;
            const namedImportConfig: ImportConfig = {
              name: rename.namedImport,
            };

            if (namedImport.getAliasNode()) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              namedImportConfig.alias = namedImport.getAliasNode()!.getText();
            }

            if (newImports.has(key)) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              const value = newImports.get(key)!;
              newImports.set(key, [...value, namedImportConfig]);
            } else {
              newImports.set(key, [namedImportConfig]);
            }

            renameReferences(namedImport, oldName, rename.namedImport);
            namedImport.remove();
          }

          if (importDeclaration.getNamedImports().length === 0) {
            importDeclaration.remove();
          }
        }

        for (const [key, namedImports] of newImports.entries()) {
          const [filePath, moduleSpecifier] = key.split('__');
          addImports(filePath, {
            namedImports: namedImports,
            moduleSpecifier: moduleSpecifier,
          });
        }

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

function configureRenames(renames: RenameConfig) {
  return (namedImport: string) => {
    if (renames[namedImport] == null) {
      return null;
    }

    return {
      namedImport: Array.isArray(renames[namedImport])
        ? renames[namedImport][0]
        : namedImport,
      moduleSpecifier: Array.isArray(renames[namedImport])
        ? renames[namedImport][1]
        : (renames[namedImport] as string),
    };
  };
}
