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
import { xhrEvent } from './event-names';

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

  const config = {
    /**
     * Unpatch all related to XHR
     **/
    unpatchXHR: () => {
      config.global.disable.XHR();
      config.events.disable.UNPATCHED_EVENTS([...xhrEvent]);
    },
    /**
     * Unpatch passive events https://developers.google.com/web/updates/2016/06/passive-event-listeners
     **/
    usePassiveScrollEvents: () => {
      config.events.disable.PASSIVE_EVENTS(['scroll']);
      config.events.disable.UNPATCHED_EVENTS(['scroll']);
    },
    global: {
      disable: reduceToObject<GlobalDisableConfigurationMethods>([
        ...zoneGlobalDisableConfigurationsKeys.map(addDisableFlag),
        ...zoneGlobalSettingsConfigurationsKeys.map(addSymbolFlag),
      ]),
    },
    test: {
      disable: reduceToObject<TestDisableConfigurationMethods>([
        ...zoneTestDisableConfigurationsKeys.map(addDisableFlag),
        ...zoneTestSettingsConfigurationsKeys.map(addSymbolFlag),
      ]),
    },
    events: {
      disable: reduceToObject<ZoneGlobalEventsConfigurationsMethods>(
        zoneGlobalEventsConfigurationsKeys.map(addArraySymbolFlag)
      ),
    },
    runtime: {
      disable: reduceToObject<RuntimeConfigurationMethods>(
        zoneRuntimeConfigurationsKeys.map(addSymbolFlag)
      ),
    },
  };
  return config;
}

export interface ZoneConfig {
  /**
   * Unpatch all related to XHR
   **/
  unpatchXHR: () => void;
  usePassiveScrollEvents: () => void;
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
