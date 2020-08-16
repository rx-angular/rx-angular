export { RxState } from './rx-state.service';
export {
  select,
  stateful,
  distinctUntilSomeChanged,
  selectSlice,
} from './rxjs/operators';
export {
  insert,
  remove,
  toDictionary,
  update,
} from './transformation-helpers/array/index';
export {
  setProp,
  patch,
  deleteProp,
  dictionaryToArray,
  toggle,
} from './transformation-helpers/object/index';
export { KeyCompareMap, CompareFn } from './rxjs/interfaces';
