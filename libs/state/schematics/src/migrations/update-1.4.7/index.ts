import { renamingRule } from '../../utils/renaming-rule';

const renames: Record<string, string | [string, string]> = {
  createSideEffectObservable: '@rx-angular/state/selections',
  createAccumulationObservable: '@rx-angular/state/selections',
  select: '@rx-angular/state/selections',
  stateful: '@rx-angular/state/selections',
  distinctUntilSomeChanged: '@rx-angular/state/selections',
  selectSlice: '@rx-angular/state/selections',
  KeyCompareMap: '@rx-angular/state/selections',
  CompareFn: '@rx-angular/state/selections',
  PickSlice: '@rx-angular/state/selections',
  insert: '@rx-angular/cdk/transformations',
  remove: '@rx-angular/cdk/transformations',
  toDictionary: '@rx-angular/cdk/transformations',
  update: '@rx-angular/cdk/transformations',
  extract: '@rx-angular/cdk/transformations',
  upsert: '@rx-angular/cdk/transformations',
  setProp: '@rx-angular/cdk/transformations',
  patch: '@rx-angular/cdk/transformations',
  deleteProp: '@rx-angular/cdk/transformations',
  dictionaryToArray: '@rx-angular/cdk/transformations',
  toggle: '@rx-angular/cdk/transformations',
  slice: '@rx-angular/cdk/transformations'
};

export default renamingRule('@rx-angular/state', renames);


