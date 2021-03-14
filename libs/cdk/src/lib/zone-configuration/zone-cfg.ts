import {
  ZoneFlagsHelperFunctions,
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

function assertZoneConfig() {
  if ((window as any).Zone !== undefined) {
    // @TODO link to docs
    console.error('zone-flags file needs to get imported before zone.js');
  }
}

/**
 * factory function to create a `ZoneConfig` object.
 *
 * @Example
 * import { globalEvents,xhrEvent, zoneConfig} from '@rx-angular/cdk/zone-flags';
 *
 * const zoneConfig = createZoneFlagsConfigurator();
 *
 * zoneConfig.global.disable.requestAnimationFrame();
 * zoneConfig.global.disable.timers();
 * zoneConfig.events.disable.UNPATCHED_EVENTS([...globalEvents, ...xhrEvent]);
 *
 */
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
  (cfg as ZoneFlagsHelperFunctions).__rxa_zone_config__log = (): void => {
    configProps.forEach((flag) => {
      // tslint:disable-next-line:no-unused-expression
      cfg[flag] && console.log(flag, cfg[flag]);
    });
  };

  return {
    global: {
      disable: zoneGlobalDisableConfigurationsKeys
        .map((prop) => ({
          [prop]: () => {
            assertZoneConfig();
            return (cfg[zoneDisable + prop] = true);
          },
        }))
        .concat(
          zoneGlobalSettingsConfigurationsKeys.map((prop) => ({
            [prop]: () => {
              assertZoneConfig();
              return (cfg[zoneSymbol + prop] = true);
            },
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
          [prop]: () => {
            assertZoneConfig();
            return (cfg[zoneDisable + prop] = true);
          },
        }))
        .concat(
          zoneTestSettingsConfigurationsKeys.map((prop) => ({
            [prop]: () => {
              assertZoneConfig();
              return (cfg[zoneSymbol + prop] = true);
            },
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
          [prop]: (eventNames: string[]) => {
            assertZoneConfig();
            return (cfg[zoneSymbol + prop] = [
              ...(Array.isArray(cfg[zoneSymbol + prop])
                ? cfg[zoneSymbol + prop]
                : []),
              ...eventNames,
            ]);
          },
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
          [prop]: () => {
            assertZoneConfig();
            return (cfg[zoneSymbol + prop] = true);
          },
        }),
        {} as RuntimeConfigurationMethods
      ),
    },
  };
}

/**
 * An object for typed zone-flags configuration.
 *
 * @Example
 *
 * create file `zone-flags.ts` parallel to your `polyfills.ts` and insert following content:
 * ```typescript
 * import { globalEvents, xhrEvent, zoneConfig} from '@rx-angular/cdk/zone-flags';
 *
 * zoneConfig.global.disable.requestAnimationFrame();
 * zoneConfig.global.disable.timers();
 * zoneConfig.events.disable.UNPATCHED_EVENTS([...globalEvents, ...xhrEvent]);
 * ```
 * In `polyfills.ts` above the zone import, import `zone-flags.ts`
 *
 * ```typescript
 * import './zone-flags';
 * // Zone JS is required by default for Angular itself.
 * import 'zone.js/dist/zone';
 * ```
 *
 */
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
}

export const zoneConfig = createZoneFlagsConfigurator();
