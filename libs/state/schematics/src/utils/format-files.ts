import { CreateFileAction, noop, OverwriteFileAction, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as path from 'path';
import { from } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

export function formatFiles(
  options: { skipFormat: boolean } = { skipFormat: false }
): Rule {
  let prettier: any;
  try {
    prettier = require('prettier');
  } catch (e) {}

  if (options.skipFormat) {
    return noop();
  }

  return (host: Tree, context: SchematicContext): any => {
    if (!prettier) {
      return host;
    }

    const files = new Set(
      host.actions
        .filter((action) => action.kind !== 'd' && action.kind !== 'r')
        .map((action) => ({
          path: action.path,
          content: (
            action as OverwriteFileAction | CreateFileAction
          ).content.toString(),
        }))
    );
    if (files.size === 0) {
      return host;
    }
    return from(files).pipe(
      filter((file) => host.exists(file.path)),
      mergeMap(async (file) => {
        const systemPath = path.join(process.cwd(), file.path);
        let options: any = {
          filepath: systemPath,
        };
        const resolvedOptions = await prettier.resolveConfig(systemPath);
        if (resolvedOptions) {
          options = {
            ...options,
            ...resolvedOptions,
          };
        }
        const support = await prettier.getFileInfo(systemPath, options);
        if (support.ignored || !support.inferredParser) {
          return;
        }

        try {
          host.overwrite(file.path, prettier.format(file.content, options));
        } catch (e) {
          context.logger.warn(
            `Could not format ${file.path} because ${e.message}`
          );
        }
      }),
      map(() => host)
    );
  };
}
