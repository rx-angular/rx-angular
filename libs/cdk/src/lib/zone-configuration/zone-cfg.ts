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
function assertZoneObjectPresentBeforeZoneJs() {
  if ((window as any).Zone !== undefined) {
    console.error(
      'zone configuration file for global configuration needs to get imported before zone.js. https://angular.io/guide/zone#setting-up-zonejs'
    );
  }
}

/**
 * https://github.com/angular/angular/blob/master/packages/zone.js/lib/zone.configurations.api.ts#L775-L776
 **/
function assertZoneObjectPresentAfterZoneJs() {
  if ((window as any).Zone === undefined) {
    console.error(
      'zone configuration file for runtime configuration needs to get imported/used after zone.js. https://github.com/angular/angular/blob/master/packages/zone.js/lib/zone.configurations.api.ts#L775-L776'
    );
  }
}

const addDisableFlagBeforeZoneJs = (prop: string) => ({
  [prop]: () => {
    assertZoneObjectPresentBeforeZoneJs();
    return ((window as any)[zoneDisable + prop] = true);
  },
});

const addSymbolBeforeZoneJs = (prop: string) => ({
  [prop]: () => {
    assertZoneObjectPresentBeforeZoneJs();
    return ((window as any)[zoneSymbol + prop] = true);
  },
});

const addSymbolAfterZoneJs = (prop: string) => ({
  [prop]: () => {
    assertZoneObjectPresentAfterZoneJs();
    return ((window as any)[zoneSymbol + prop] = true);
  },
});

const addArraySymbolFlagBeforeZoneJs = (prop: string) => ({
  [prop]: (eventNames: string[]) => {
    assertZoneObjectPresentBeforeZoneJs();
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
    global: {
      disable: reduceToObject<GlobalDisableConfigurationMethods>([
        ...zoneGlobalDisableConfigurationsKeys.map(addDisableFlagBeforeZoneJs),
        ...zoneGlobalSettingsConfigurationsKeys.map(addSymbolBeforeZoneJs),
      ]),
    },
    test: {
      disable: reduceToObject<TestDisableConfigurationMethods>([
        ...zoneTestDisableConfigurationsKeys.map(addDisableFlagBeforeZoneJs),
        ...zoneTestSettingsConfigurationsKeys.map(addSymbolBeforeZoneJs),
      ]),
    },
    events: {
      disable: reduceToObject<ZoneGlobalEventsConfigurationsMethods>(
        zoneGlobalEventsConfigurationsKeys.map(addArraySymbolFlagBeforeZoneJs)
      ),
    },
    runtime: {
      disable: reduceToObject<RuntimeConfigurationMethods>(
        zoneRuntimeConfigurationsKeys.map(addSymbolAfterZoneJs)
      ),
    },
  };

  return {
    ...zoneConfigObj,
    ...convenienceMethods(zoneConfigObj),
  };
}

/**
 * An object for typed zone-flags configuration. It exposes flags under the following scopes:
 * - global (global environment API)
 * - events (event listener names and behavior)
 * - runtime (configurable behaviour at runtime)
 * - test (patches for testing libs like jasmine, jest etc)
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
