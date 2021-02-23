import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, take } from 'rxjs/operators';
import fetch from 'node-fetch';
export interface NpmPackage {
  name: string;
  version: string;
}

export function getLatestNodePackage(name: string): Observable<NodeDependency> {
  return fromPromise(
    fetch(`https://registry.npmjs.org/${name}/latest`).then((res) => res.json())
  ).pipe(
    map((packageData: NpmPackage) => ({
      type: NodeDependencyType.Default,
      name: packageData.name,
      version: packageData.version,
      overwrite: false,
    })),
    take(1)
  );
}
