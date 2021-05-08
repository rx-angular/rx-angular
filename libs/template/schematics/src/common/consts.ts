import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

export type Dependency = Omit<NodeDependency, 'version'>;

export const dependencies: Dependency[] = [
  {
    type: NodeDependencyType.Default,
    name: '@rx-angular/cdk',
    overwrite: true,
  },
];
