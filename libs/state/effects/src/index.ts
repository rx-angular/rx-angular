export { RxEffects } from './lib/effects.service';
export { rxEffects } from './lib/rx-effects';
// The handle returned by `rxEffects()` must be re-exported from this entry point,
// not merely from its declaring module: ng-packagr flattens each entry point's
// declarations with rollup-plugin-dts, which preserves only the export list of
// THIS module. A type missing from it loses its `export` keyword in the published
// `state-effects.d.ts`, and consumers that store the handle in an exported symbol
// (e.g. a `providedIn: 'root'` `InjectionToken`) hit TS4023 "cannot be named".
// The alias is required because `RxEffects` at the package root is the deprecated
// class re-exported above.
// See https://github.com/rx-angular/rx-angular/issues/1737
export type { RxEffects as RxEffectsHandle } from './lib/rx-effects';
