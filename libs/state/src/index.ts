export {
  RxState,
  ProjectStateFn,
  ProjectValueFn,
  ProjectStateReducer,
  ProjectValueReducer
} from './lib/rx-state.service';
export {
  createSideEffectObservable,
  createAccumulationObservable,
  select,
  stateful,
  distinctUntilSomeChanged,
  selectSlice,
  KeyCompareMap,
  CompareFn,
  PickSlice,
  insert,
  remove,
  toDictionary,
  update,
  extract,
  upsert,
  setProp,
  patch,
  deleteProp,
  dictionaryToArray,
  toggle,
  slice
} from './lib/deprecated'
