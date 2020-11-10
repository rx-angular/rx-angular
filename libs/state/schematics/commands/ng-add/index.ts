import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { packageName } from '../../consts';
import { getLatestNodeVersion } from '../../utils/npm';

function addPackageJsonDependencies(): Rule {
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

export function ngAdd(): Rule {
  return (tree: Tree, ctx: SchematicContext) => {
    return chain([
      addPackageJsonDependencies(),
      installDependencies(),
    ])(tree, ctx);
  };
}
