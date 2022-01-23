import { chain, Tree } from '@angular-devkit/schematics';
import { addImports, createProject, getImports, saveActiveProject, setActiveProject } from 'ng-morph';

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

        const changes = new Map<string, string[]>();

        Object.keys(renames).forEach((namedImport) => {
          imports.forEach((imprt) => {
            const namedImports = imprt.getNamedImports();
            const rename = getRename(namedImport);

            if (namedImports.length > 1) {
              namedImports.forEach((_namedImport) => {
                if (_namedImport.getText() === namedImport) {
                  const filePath = imprt
                    .getSourceFile()
                    .getFilePath()
                    .toString();
                  const key = `${filePath}__${rename.moduleSpecifier}`;

                  if (changes.has(key)) {
                    const value = changes.get(key);
                    changes.set(key, [...value, rename.namedImport]);
                  } else {
                    changes.set(key, [rename.namedImport]);
                  }

                  _namedImport.remove();
                }
              });
            } else if (namedImports.length === 1) {
              const [_namedImport] = namedImports;
              if (_namedImport.getText() === namedImport) {
                imprt.removeNamedImports();
                imprt.addNamedImport(rename.namedImport);
                imprt.setModuleSpecifier(rename.moduleSpecifier);
              }
            }
          });
        });

        changes.forEach((namedImports, key) => {
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
