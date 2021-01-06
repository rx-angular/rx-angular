import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@nrwl/workspace';

export async function getProject(
  host: Tree,
  projectName: string
): Promise<any> {
  const workspace = await getWorkspace(host);

  if (workspace.projects.has(projectName)) {
    return workspace.projects.get(projectName)
  }

  throw new SchematicsException('Could not find project "' + projectName + '"');
}
