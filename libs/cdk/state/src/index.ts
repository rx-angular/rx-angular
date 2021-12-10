export { ObservableAccumulation, ObservableMap, AccumulationFn, Accumulator } from './lib/model';
export { accumulateObservables } from './lib/accumulateObservables';
export {
  select,
  stateful,
  distinctUntilSomeChanged,
  selectSlice,
} from './lib/operators';
export { KeyCompareMap, CompareFn, PickSlice } from './lib/interfaces';
export {createAccumulationObservable} from './lib/accumulation-observable';
export {createSideEffectObservable} from './lib/side-effect-observable';
