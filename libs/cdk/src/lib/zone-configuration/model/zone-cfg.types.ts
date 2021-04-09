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
  global: {
    disable: GlobalDisableConfigurationMethods;
  };
  test: {
    disable: TestDisableConfigurationMethods;
  };
  events: {
    disable: ZoneGlobalEventsConfigurationsMethods;
  };
  runtime: {
    disable: RuntimeConfigurationMethods;
  };
}

export type ZoneConfig = ZoneConfigConfiguration & ZoneConfigConvenienceMethods;
