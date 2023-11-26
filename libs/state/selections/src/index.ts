export {
  createAccumulationObservable,
  ACCUMULATOR_FN_TOKEN,
} from './lib/accumulation-observable';
export { CompareFn, KeyCompareMap, PickSlice } from './lib/interfaces/index';
export { AccumulationFn, Accumulator } from './lib/model';
export {
  distinctUntilSomeChanged,
  select,
  selectSlice,
  stateful,
} from './lib/operators/index';
export { createSideEffectObservable } from './lib/side-effect-observable';
export {
  isDefined,
  isKeyOf,
  isObjectGuard,
  isOperateFnArrayGuard,
  isStringAndFunctionTupleGuard,
  isStringArrayFunctionAndOptionalObjectTupleGuard,
  isStringArrayGuard,
} from './lib/utils/guards';
export { pipeFromArray } from './lib/utils/pipe-from-array';
export { safePluck } from './lib/utils/safe-pluck';
