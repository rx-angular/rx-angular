import { renamingRule } from '../../utils/renaming-rule';

const renames: Record<string, string | [string, string]> = {
  createSideEffectObservable: '@rx-angular/cdk/state',
  createAccumulationObservable: '@rx-angular/cdk/state',
  select: '@rx-angular/cdk/state',
  stateful: '@rx-angular/cdk/state',
  distinctUntilSomeChanged: '@rx-angular/cdk/state',
  selectSlice: '@rx-angular/cdk/state',
  KeyCompareMap: '@rx-angular/cdk/state',
  CompareFn: '@rx-angular/cdk/state',
  PickSlice: '@rx-angular/cdk/state',
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


