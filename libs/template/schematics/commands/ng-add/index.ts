import { branchAndMerge, chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import * as ts from 'typescript';

import { packageName } from '../../consts';
import { addImportToModule, insertImport } from '../../utils/ast';
import { InsertChange } from '../../utils/change';
import { findRootModule } from '../../utils/find-module';
import { getLatestNodeVersion } from '../../utils/npm';
import { getProject } from '../../utils/projects';
import { SchemaOptions } from './schema';

function getModuleFile(tree: Tree, options: any): ts.SourceFile {
  const modulePath = options.module;

  if (!tree.exists(modulePath)) {
    throw new SchematicsException(`File ${modulePath} does not exist.`);
  }

  const text = tree.read(modulePath);
  if (text === null) {
    throw new SchematicsException(`File ${modulePath} does not exist.`);
  }
  const sourceText = text.toString('utf-8');

  return ts.createSourceFile(
    modulePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );
}

function applyChanges(
  tree: Tree,
  path: string,
  changes: InsertChange[]
): Tree {
  const recorder = tree.beginUpdate(path);

  for (const change of changes) {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  }
  tree.commitUpdate(recorder);

  return tree;
}

function addImportsToModuleFile(
  options: SchemaOptions,
  imports: string[],
  file = packageName
): Rule {
  return (tree) => {
    const module = getModuleFile(tree, options);
    const importChanges = insertImport(
      module,
      options.module,
      imports.join(', '),
      file
    );

    return applyChanges(tree, options.module, [
      importChanges,
    ] as InsertChange[]);
  };
}

function addImportsToModuleDeclaration(
  options: SchemaOptions,
  imports: string[]
): Rule {
  return (tree) => {
    const module = getModuleFile(tree, options);

    const importChanges = imports.map(
      (imp) => addImportToModule(module, options.module, imp, packageName)[0]
    );
    return applyChanges(tree, options.module, importChanges as InsertChange[]);
  };
}

function addDependency(): Rule {
  return (tree, ctx): any => {
    return of(packageName).pipe(
      concatMap((dep) => getLatestNodeVersion(dep)),
      map(({ name, version }) => {
        ctx.logger.info(
          `✅️ Added ${name}@${version} to ${NodeDependencyType.Default}`
        );
        const nodeDependency: NodeDependency = {
          name,
          version,
          type: NodeDependencyType.Default,
          overwrite: false,
        };
        addPackageJsonDependency(tree, nodeDependency);
        return tree;
      })
    );
  };
}

function installDependencies(): Rule {
  return (tree: Tree, ctx: SchematicContext) => {
    ctx.addTask(new NodePackageInstallTask());
    ctx.logger.debug('✅️ Dependencies installed');
    return tree;
  };
}

export function ngAdd(options: SchemaOptions): Rule {
  return (tree: Tree, ctx: SchematicContext) => {
    const project = getProject(tree, options.project);
    const sourceRoot = (project && project.sourceRoot) ?? 'src';
    options.module = findRootModule(tree, options.module, sourceRoot) as string;

    return chain([
      branchAndMerge(
        chain([
          addImportsToModuleFile(options, [
            'LetModule',
            'PushModule',
            'ViewportPrioModule',
          ]),
          addImportsToModuleDeclaration(options, [
            'LetModule',
            'PushModule',
            'ViewportPrioModule',
          ]),
        ])
      ),
      addDependency(),
      installDependencies(),
    ])(tree, ctx);
  };
}
