import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

export const packageName = '@rx-angular/template';
export const peerDependencies: NodeDependency[] = [
  {
    type: NodeDependencyType.Default,
    name: '@rx-angular/cdk',
    version: '>=1.0.0-alpha.2',
    overwrite: true,
  },
];
