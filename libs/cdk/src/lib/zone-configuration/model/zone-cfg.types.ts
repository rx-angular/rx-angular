import {
  ZoneGlobalDisableConfigurationsKey,
  ZoneGlobalSettingsConfigurationsKey,
  ZoneTestDisableConfigurationsKey,
  ZoneTestSettingsConfigurationsKey,
  ZoneGlobalEventsConfigurationsKey,
  ZoneRuntimeConfigurationsKey,
} from './configurations.types';

export type GlobalDisableConfigurationMethods = {
  [disabledFlag in ZoneGlobalDisableConfigurationsKey]: () => void;
} &
  {
    [symbolFlag in ZoneGlobalSettingsConfigurationsKey]: () => void;
  };

export type TestDisableConfigurationMethods = {
  [disabledFlag in ZoneTestDisableConfigurationsKey]: () => void;
} &
  {
    [symbolFlag in ZoneTestSettingsConfigurationsKey]: () => void;
  };

export type ZoneGlobalEventsConfigurationsMethods = {
  [disabledFlag in ZoneGlobalEventsConfigurationsKey]: (
    eventNames: string[]
  ) => void;
};

export type RuntimeConfigurationMethods = {
  [disabledFlag in ZoneRuntimeConfigurationsKey]: () => void;
};

export interface ZoneConfigConvenienceMethods {
  /**
   * Unpatch all related to XHR
   **/
  unpatchXHR: () => void;
  /**
   * Unpatch passive events https://developers.google.com/web/updates/2016/06/passive-event-listeners
   **/
  useUnpatchedPassiveScrollEvents: () => void;
}

export interface ZoneConfigConfiguration {
  /**
   * Interface of `zone.js` configurations.
   *
   * You can define the following configurations on the `window/global` object before
   * importing `zone.js` to change its default behaviors.
   */
  global: {
    disable: GlobalDisableConfigurationMethods;
  };
  /**
   * Interface of `zone-testing.js` test configurations.
   *
   * You can define the following configurations on the `window` or `global` object before
   * importing `zone-testing.js` to change its default behaviors in the test runner.
   */
  test: {
    disable: TestDisableConfigurationMethods;
  };
  /**
   * Interface of `zone-testing.js` test configurations, but just the event related part.
   */
  events: {
    disable: ZoneGlobalEventsConfigurationsMethods;
  };
  /**
   * The interface of the `zone.js` runtime configurations.
   *
   * These configurations can be defined on the `Zone` object after
   * importing zone.js to change behaviors. The differences between
   * the `ZoneRuntimeConfigurations` and the `ZoneGlobalConfigurations` are,
   *
   * 1. `ZoneGlobalConfigurations` must be defined on the `global/window` object before importing
   * `zone.js`. The value of the configuration cannot be changed at runtime.
   *
   * 2. `ZoneRuntimeConfigurations` must be defined on the `Zone` object after importing `zone.js`.
   * You can change the value of this configuration at runtime.
   *
   */
  runtime: {
    disable: RuntimeConfigurationMethods;
  };
}

export type ZoneConfig = ZoneConfigConfiguration & ZoneConfigConvenienceMethods;
