import {
  ZoneGlobalDisableConfigurationsKey,
  zoneGlobalDisableConfigurationsKeys,
  ZoneGlobalEventsConfigurationsKey,
  zoneGlobalEventsConfigurationsKeys,
  ZoneGlobalSettingsConfigurationsKey,
  zoneGlobalSettingsConfigurationsKeys,
  ZoneRuntimeConfigurationsKey,
  zoneRuntimeConfigurationsKeys,
  ZoneTestDisableConfigurationsKey,
  zoneTestDisableConfigurationsKeys,
  ZoneTestSettingsConfigurationsKey,
  zoneTestSettingsConfigurationsKeys,
} from './model/configurations.types';
import { ZoneGlobalConfigurations } from './model/zone.configurations.api';

type GlobalDisableConfigurationMethods = {
  [disabledFlag in ZoneGlobalDisableConfigurationsKey]: () => void;
} &
  {
    [symbolFlag in ZoneGlobalSettingsConfigurationsKey]: () => void;
  };

type TestDisableConfigurationMethods = {
  [disabledFlag in ZoneTestDisableConfigurationsKey]: () => void;
} &
  {
    [symbolFlag in ZoneTestSettingsConfigurationsKey]: () => void;
  };

type ZoneGlobalEventsConfigurationsMethods = {
  [disabledFlag in ZoneGlobalEventsConfigurationsKey]: (
    eventNames: string[]
  ) => void;
};

type RuntimeConfigurationMethods = {
  [disabledFlag in ZoneRuntimeConfigurationsKey]: () => void;
};

const zoneDisable = '__Zone_disable_';
const zoneSymbol = '__zone_symbol__';

function createZoneFlagsConfigurator(): ZoneConfig {
  const cfg = (window as unknown) as ZoneGlobalConfigurations;
  const configProps = [
    ...[
      ...zoneGlobalDisableConfigurationsKeys,
      ...zoneTestDisableConfigurationsKeys,
    ].map((prop) => zoneDisable + prop),
    ...[
      ...zoneGlobalSettingsConfigurationsKeys,
      ...zoneTestSettingsConfigurationsKeys,
      ...zoneGlobalEventsConfigurationsKeys,
      ...zoneRuntimeConfigurationsKeys,
    ].map((prop) => zoneSymbol + prop),
  ];
  // append as global method for easy debugging
  (cfg as any).__rxa_zone_config__log = (): void => {
    configProps.forEach((flag) => {
      // tslint:disable-next-line:no-unused-expression
      cfg[flag] && console.log(flag, cfg[flag]);
    });
  };

  return {
    global: {
      disable: zoneGlobalDisableConfigurationsKeys
        .map((prop) => ({
          [prop]: () =>
            (cfg[zoneDisable + prop] = true),
        }))
        .concat(
          zoneGlobalSettingsConfigurationsKeys.map((prop) => ({
            [prop]: () =>
              (cfg[zoneSymbol + prop] = true),
          }))
        )
        .reduce(
          (map, item) => ({ ...map, ...item }),
          {} as GlobalDisableConfigurationMethods
        ),
    },
    test: {
      disable: zoneTestDisableConfigurationsKeys
        .map((prop) => ({
          [prop]: () =>
            (cfg[zoneDisable + prop] = true),
        }))
        .concat(
          zoneTestSettingsConfigurationsKeys.map((prop) => ({
            [prop]: () =>
              (cfg[zoneSymbol + prop] = true),
          }))
        )
        .reduce(
          (map, item) => ({ ...map, ...item }),
          {} as TestDisableConfigurationMethods
        ),
    },
    events: {
      disable: zoneGlobalEventsConfigurationsKeys
        .map((prop) => ({
          [prop]: (eventNames: string[]) =>
            (cfg[zoneSymbol + prop] = [
              ...(Array.isArray(cfg[zoneSymbol + prop])
                ? cfg[zoneSymbol + prop]
                : []),
              ...eventNames,
            ]),
        }))
        .reduce(
          (map, item) => ({ ...map, ...item }),
          {} as ZoneGlobalEventsConfigurationsMethods
        ),
    },
    runtime: {
      disable: zoneRuntimeConfigurationsKeys.reduce(
        (map, prop) => ({
          ...map,
          [prop]: () =>
            (cfg[zoneSymbol + prop] = true),
        }),
        {} as RuntimeConfigurationMethods
      ),
    },
    getCompilerOptions(
      noop = true,
      coalescing = true
    ): { ngZone?: 'noop'; ngZoneEventCoalescing?: true } {
      const zoneRelevantCompilerOption: any = {};
      // tslint:disable-next-line:no-unused-expression
      // tslint:disable-next-line:no-unused-expression
      if (noop) {
        zoneRelevantCompilerOption.ngZone = 'noop';
      }
      if (coalescing) {
        zoneRelevantCompilerOption.ngZoneEventCoalescing = true;
      }
      return zoneRelevantCompilerOption;
    },
  };
}

export interface ZoneConfig {
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
  getCompilerOptions(
    noop?: boolean,
    coalescing?: boolean
  ): { ngZone?: 'noop'; ngZoneEventCoalescing?: true };
}

export const zoneConfig = createZoneFlagsConfigurator();
