import {
  addDependenciesToPackageJson,
  formatFiles,
  type GeneratorCallback,
  type Tree,
} from '@nx/devkit';
import { version as packageVersion } from '../../../package.json';
import { InitGeneratorSchema } from './schema';

export async function initGenerator(
  tree: Tree,
  options: InitGeneratorSchema,
): Promise<GeneratorCallback> {
  const installTask = options.skipPackageJson
    ? () => {
        /* empty */
      }
    : addDependenciesToPackageJson(
        tree,
        {},
        {
          '@rx-angular/rebundle': packageVersion,
        },
        undefined,
        options.keepExistingVersions,
      );

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return installTask;
}

export default initGenerator;
