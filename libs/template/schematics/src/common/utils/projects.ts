import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from './workspace';

export async function getProject(
  host: Tree,
  projectName: string
): Promise<any> {
  const workspace = await getWorkspace(host);

  if (workspace.projects.has(projectName)) {
    return workspace.projects.get(projectName);
  } else if (
    workspace.extensions?.defaultProject &&
    workspace.projects.has(workspace.extensions.defaultProject as string)
  ) {
    return workspace.projects.get(
      workspace.extensions.defaultProject as string
    );
  }

  throw new SchematicsException('Could not find project "' + projectName + '"');
}
