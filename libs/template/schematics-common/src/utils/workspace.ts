import { Tree } from '@angular-devkit/schematics';
import { workspaces } from '@angular-devkit/core';

export async function getWorkspace(tree: Tree, path = '/') {
  const host = createHost(tree);

  const { workspace } = await workspaces.readWorkspace(path, host);

  return workspace;
}

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new Error('File not found.');
      }

      return data.toString();
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      // approximate a directory check
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}
