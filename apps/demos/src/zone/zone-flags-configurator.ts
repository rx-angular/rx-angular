import {
  ZoneGlobalDisableConfigurationsKey,
  zoneGlobalDisableConfigurationsKeys,
  ZoneRuntimeConfigurationsKey,
  zoneRuntimeConfigurationsKeys,
  ZoneTestDisableConfigurationsKey,
  zoneTestDisableConfigurationsKeys,
  ZoneTestSettingsConfigurationsKey,
  zoneTestSettingsConfigurationsKeys
} from './model/configurations.types';
import { ZoneGlobalConfigurations } from './model/zone.configurations.api';

type GlobalDisableConfigurationMethods = {
  [disabledFlag in ZoneGlobalDisableConfigurationsKey]: (isDisabled?: boolean) => void;
};

type TestDisableConfigurationMethods = {
  [disabledFlag in ZoneTestDisableConfigurationsKey]: (isDisabled?: boolean) => void
} & {
  [symbolFlag in ZoneTestSettingsConfigurationsKey]: (isDisabled?: boolean) => void
};

type targetSet = [WebSocket, (keyof WebSocketEventMap)[]] |
  [any, (keyof WindowEventMap)[]];
type GlobalTargetConfigurationMethod = (...args: targetSet) => void;
type RuntimeConfigurationMethods = {
  [disabledFlag in ZoneRuntimeConfigurationsKey]: (isDisabled?: boolean) => void;
}

const zoneDisable = '__Zone_disable_';
const zoneIgnore = '__Zone_ignore';
const zoneSymbol = '__zone_symbol__';


export interface ZoneFlagsConfigurator {
  global: {
    disable: GlobalDisableConfigurationMethods
  },
  test: {
    disable: TestDisableConfigurationMethods
  },
  target: {
    disable: GlobalTargetConfigurationMethod
  }
  runtime: {
    disable: RuntimeConfigurationMethods
  },
}

function getZoneFlagsConfigurator(): ZoneFlagsConfigurator {
  const cfg = window as unknown as ZoneGlobalConfigurations & { __Zone_ignore_on_properties: { target: any, ignoreProperties: string[] }[] };

  return {
    global: {
      disable: zoneGlobalDisableConfigurationsKeys
        .reduce((map, prop) => ({
          ...map,
          [prop]: (isDisabled: boolean = true) => cfg[zoneDisable + prop] = isDisabled
        }), {} as GlobalDisableConfigurationMethods)
    },
    test: {
      disable: zoneTestDisableConfigurationsKeys
        .map(prop => ({ [prop]: (isDisabled: boolean = true) => cfg[zoneDisable + prop] = isDisabled }))
        .concat(
          zoneTestSettingsConfigurationsKeys
            .map(prop => ({ [prop]: (isDisabled: boolean = true) => cfg[zoneSymbol + prop] = isDisabled }))
        )
        .reduce((map, item) => ({ ...map, ...item }), {} as TestDisableConfigurationMethods)

    },
    target: {
      disable: (target: any, ignoreProperties: string[]) => {
        const onProps = zoneIgnore + 'on_properties';
        if (!Array.isArray(cfg[onProps])) {
          cfg[onProps] = [];
        }
        cfg[onProps].push({ target, ignoreProperties });
      }
    },
    runtime: {
      disable: zoneRuntimeConfigurationsKeys
        .reduce((map, prop) => ({
          ...map,
          [prop]: (isDisabled: boolean = true) => cfg[zoneSymbol + prop] = isDisabled
        }), {} as RuntimeConfigurationMethods)
    }
  };
}

export const zoneFlagsConfigurator = getZoneFlagsConfigurator();
