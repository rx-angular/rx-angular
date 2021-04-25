import { ɵglobal } from '@angular/core';
import {
  ZoneFlagsHelperFunctions,
  zoneGlobalDisableConfigurationsKeys,
  zoneGlobalEventsConfigurationsKeys,
  zoneGlobalSettingsConfigurationsKeys,
  zoneRuntimeConfigurationsKeys,
  zoneTestDisableConfigurationsKeys,
  zoneTestSettingsConfigurationsKeys,
} from './model/configurations.types';
import { ZoneGlobalConfigurations } from './model/zone.configurations.api';
import {
  ZoneConfigConfiguration,
  ZoneConfig,
  GlobalDisableConfigurationMethods,
  TestDisableConfigurationMethods,
  ZoneGlobalEventsConfigurationsMethods,
  RuntimeConfigurationMethods,
} from './model/zone-cfg.types';
import { convenienceMethods } from './convenience-methods';

const zoneDisable = '__Zone_disable_';
const zoneSymbol = '__zone_symbol__';

/**
 * https://angular.io/guide/zone#setting-up-zonejs
 **/
function assertZoneConfig() {
  if ((window as any).Zone !== undefined) {
    // @TODO link to docs
    console.error('zone-flags file needs to get imported before zone.js');
  }
}

const addDisableFlag = (prop: string) => ({
  [prop]: () => {
    assertZoneConfig();
    return ((window as any)[zoneDisable + prop] = true);
  },
});

const addSymbolFlag = (prop: string) => ({
  [prop]: () => {
    assertZoneConfig();
    return ((window as any)[zoneSymbol + prop] = true);
  },
});

const addArraySymbolFlag = (prop: string) => ({
  [prop]: (eventNames: string[]) => {
    assertZoneConfig();
    const w: any = window as any;
    return (w[zoneSymbol + prop] = [
      ...(Array.isArray(w[zoneSymbol + prop]) ? w[zoneSymbol + prop] : []),
      ...eventNames,
    ]);
  },
});

const reduceToObject = <T>(methodsArray: any[]): T => {
  return methodsArray.reduce((map, item) => ({ ...map, ...item }), {} as T);
};

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
  const cfg = (ɵglobal as unknown) as ZoneGlobalConfigurations;
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

  const zoneConfigObj: ZoneConfigConfiguration = {
    /**
     * Interface of `zone.js` configurations.
     *
     * You can define the following configurations on the `window/global` object before
     * importing `zone.js` to change `zone.js` default behaviors.
     */
    global: {
      disable: reduceToObject<GlobalDisableConfigurationMethods>([
        ...zoneGlobalDisableConfigurationsKeys.map(addDisableFlag),
        ...zoneGlobalSettingsConfigurationsKeys.map(addSymbolFlag),
      ]),
    },
    /**
     * Interface of `zone-testing.js` test configurations.
     *
     * You can define the following configurations on the `window` or `global` object before
     * importing `zone-testing.js` to change `zone-testing.js` default behaviors in the test runner.
     */
    test: {
      disable: reduceToObject<TestDisableConfigurationMethods>([
        ...zoneTestDisableConfigurationsKeys.map(addDisableFlag),
        ...zoneTestSettingsConfigurationsKeys.map(addSymbolFlag),
      ]),
    },
    /**
     * Interface of `zone-testing.js` test configurations, but just the event related part.
     */
    events: {
      disable: reduceToObject<ZoneGlobalEventsConfigurationsMethods>(
        zoneGlobalEventsConfigurationsKeys.map(addArraySymbolFlag)
      ),
    },
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
      disable: reduceToObject<RuntimeConfigurationMethods>(
        zoneRuntimeConfigurationsKeys.map(addSymbolFlag)
      ),
    },
  };

  return {
    ...zoneConfigObj,
    ...convenienceMethods(zoneConfigObj),
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
export const zoneConfig = createZoneFlagsConfigurator();
