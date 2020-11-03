/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export interface ZoneGlobalDisableConfigurations {
  EventEmitter?: boolean;
  fs?: boolean;
  node_timers?: boolean;
  nextTick?: boolean;
  crypto?: boolean;
  defineProperty?: boolean;
  registerElement?: boolean;
  EventTargetLegacy?: boolean;
  timers?: boolean;
  requestAnimationFrame?: boolean;
  blocking?: boolean;
  EventTarget?: boolean;
  FileReader?: boolean;
  MutationObserver?: boolean;
  IntersectionObserver?: boolean;
  on_property?: boolean;
  customElements?: boolean;
  XHR?: boolean;
  geolocation?: boolean;
  canvas?: boolean;
  ZoneAwarePromise?: boolean;
}
export type ZoneGlobalDisableConfigurationsKey = keyof ZoneGlobalDisableConfigurations;
export const zoneGlobalDisableConfigurationsKeys: ZoneGlobalDisableConfigurationsKey[]  = [
  'EventEmitter',
  'fs',
  'node_timers',
  'nextTick',
  'crypto',
  'defineProperty',
  'registerElement',
  'EventTargetLegacy',
  'timers',
  'requestAnimationFrame',
  'blocking',
  'EventTarget',
  'FileReader',
  'MutationObserver',
  'IntersectionObserver',
  'on_property',
  'customElements',
  'XHR',
  'geolocation',
  'canvas',
  'ZoneAwarePromise'
];

export interface ZoneGlobalEventsConfigurations {
  __zone_symbol__UNPATCHED_EVENTS?: string[];
  __zone_symbol__PASSIVE_EVENTS?: string[];
}

// prefix: __zone_symbol__
export interface ZoneGlobalTargetsConfigurations {
  on_properties?: { target: any, ignoreProperties: string[] }[],
}
export type ZoneGlobalTargetsConfigurationsKey = keyof ZoneGlobalTargetsConfigurations;
export const zoneGlobalTargetsConfigurationsKeys: ZoneGlobalTargetsConfigurationsKey[]  = [
  'on_properties',
];
// prefix: __zone_symbol__
export interface ZoneGlobalSettingsConfigurations {
  DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION?: boolean;
}

// prefix: __zone_symbol__
export interface ZoneRuntimeConfigurations {
  ignoreConsoleErrorUncaughtError?: boolean;
}
export type ZoneRuntimeConfigurationsKey = keyof ZoneRuntimeConfigurations;
export const zoneRuntimeConfigurationsKeys: ZoneRuntimeConfigurationsKey[]  = [
  'ignoreConsoleErrorUncaughtError',
];

// prefix: __Zone_disable_
export interface ZoneTestDisableConfigurations {
  jasmine?: boolean;
  mocha?: boolean;
  jest?: boolean;
}
export type ZoneTestDisableConfigurationsKey = keyof ZoneTestDisableConfigurations;
export const zoneTestDisableConfigurationsKeys: ZoneTestDisableConfigurationsKey[]  = [
  'jasmine',
  'mocha',
  'jest',
];

// prefix: __zone_symbol__
export interface ZoneTestSettingsConfigurations {
  fakeAsyncDisablePatchingClock?: boolean;
  fakeAsyncAutoFakeAsyncWhenClockPatched?: boolean;
  supportWaitUnResolvedChainedPromise?: boolean;
}
export type ZoneTestSettingsConfigurationsKey = keyof ZoneTestSettingsConfigurations;
export const zoneTestSettingsConfigurationsKeys: ZoneTestSettingsConfigurationsKey[]  = [
  'fakeAsyncDisablePatchingClock',
  'fakeAsyncAutoFakeAsyncWhenClockPatched',
  'supportWaitUnResolvedChainedPromise'
];


