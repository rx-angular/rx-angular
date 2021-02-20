/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { normalize } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';

export const MODULE_EXT = '.module.ts';
export const ROUTING_MODULE_EXT = '-routing.module.ts';

/**
 * Find the module referred by a set of options passed to the schematics.
 */
export function findRootModule(
  host: Tree,
  module: string,
  rootPath = '',
  skipImport = false
): string | undefined {
  if (skipImport || !module) {
    return undefined;
  }

  const modulePath = normalize(`${rootPath}/${module}`);
  if (host.exists(modulePath)) {
    return modulePath;
  } else if (host.exists(modulePath + '.ts')) {
    return normalize(modulePath + '.ts');
  } else if (host.exists(modulePath + MODULE_EXT)) {
    return normalize(modulePath + MODULE_EXT);
  } else if (host.exists(`${modulePath}/${module}${MODULE_EXT}`)) {
    return normalize(`${modulePath}/${module}${MODULE_EXT}`);
  } else if (host.exists(`${modulePath}/${module}.ts`)) {
    return normalize(`${modulePath}/${module}.ts`);
  } else {
    throw new Error(`Specified module path ${modulePath} does not exist`);
  }
}
