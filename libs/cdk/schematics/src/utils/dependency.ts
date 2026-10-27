import { NodeDependency } from '@schematics/angular/utility/dependencies';
export type Dependency = Omit<NodeDependency, 'version'>;
