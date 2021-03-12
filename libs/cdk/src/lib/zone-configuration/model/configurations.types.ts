// prefix: __Zone_disable_
export const zoneGlobalDisableConfigurationsKeys: readonly string[] = [
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
  'ZoneAwarePromise',
] as const;

export type ZoneGlobalDisableConfigurationsKey = typeof zoneGlobalDisableConfigurationsKeys[number];

// prefix: __zone_symbol__
export const zoneGlobalEventsConfigurationsKeys: readonly string[] = [
  'UNPATCHED_EVENTS',
  'PASSIVE_EVENTS',
] as const;
export type ZoneGlobalEventsConfigurationsKey = typeof zoneGlobalEventsConfigurationsKeys[number];

// prefix: __zone_symbol__
export const zoneGlobalSettingsConfigurationsKeys: readonly string[] = [
  'DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION',
] as const;
export type ZoneGlobalSettingsConfigurationsKey = typeof zoneGlobalSettingsConfigurationsKeys[number];

// prefix: __zone_symbol__
export const zoneRuntimeConfigurationsKeys: readonly string[] = [
  'ignoreConsoleErrorUncaughtError',
] as const;
export type ZoneRuntimeConfigurationsKey = typeof zoneRuntimeConfigurationsKeys[number];

// prefix: __Zone_disable_

export const zoneTestDisableConfigurationsKeys: readonly string[] = [
  'jasmine',
  'mocha',
  'jest',
] as const;
export type ZoneTestDisableConfigurationsKey = typeof zoneTestDisableConfigurationsKeys[number];

// prefix: __zone_symbol__
export const zoneTestSettingsConfigurationsKeys: readonly string[] = [
  'fakeAsyncDisablePatchingClock',
  'fakeAsyncAutoFakeAsyncWhenClockPatched',
  'supportWaitUnResolvedChainedPromise',
] as const;
export type ZoneTestSettingsConfigurationsKey = typeof zoneTestSettingsConfigurationsKeys[number];

export interface ZoneFlagsHelperFunctions {
  __rax_zone_config__log?: () => void;
}
