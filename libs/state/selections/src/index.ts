export { AccumulationFn, Accumulator } from './lib/model';
export {
  select,
  stateful,
  distinctUntilSomeChanged,
  selectSlice,
} from './lib/operators/index';
export {
  isKeyOf,
  isOperateFnArrayGuard,
  isStringArrayGuard,
  isObjectGuard,
  isDefined,
} from './lib/utils/guards';
export { pipeFromArray } from './lib/utils/pipe-from-array';
export { safePluck } from './lib/utils/safe-pluck';
export { KeyCompareMap, CompareFn, PickSlice } from './lib/interfaces/index';
export { createAccumulationObservable } from './lib/accumulation-observable';
export { createSideEffectObservable } from './lib/side-effect-observable';
