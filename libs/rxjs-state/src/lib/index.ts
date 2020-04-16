export {
  select,
  stateful,
  createAccumulationObservable,
  createSideEffectObservable
} from './core';
/* @hack importing /index fixes "Maximum call stack size exceeded" error
 * when building library with ng-packagr.
 * Cf. https://github.com/ng-packagr/ng-packagr/issues/1093#issuecomment-427570451
 * Do we really need this indirection? */
export { RxJsState } from './state/index';
