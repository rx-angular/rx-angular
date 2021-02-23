import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export interface NpmPackage {
  name: string;
  version: string;
}

export function getLatestNodePackage(name: string): Observable<NodeDependency> {
  return ajax.getJSON(`https://registry.npmjs.org/${name}/latest`).pipe(
    map((packageData: NpmPackage) => {
      console.log({ packageData });
      return {
        type: NodeDependencyType.Default,
        name: packageData.name,
        version: packageData.version,
        overwrite: false,
      };
    })
  );
}
