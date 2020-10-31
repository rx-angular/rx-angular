import { ZoneGlobalConfigurations } from './model/zone.configurations.api';

export enum zoneSymbols {
  requestAnimationFrame = '__Zone_disable_requestAnimationFrame',
  setTimeout = '__Zone_disable_setTimeout',
  setInterval = '__Zone_disable_setInterval',
  unpatchedEvents = '__zone_symbol__UNPATCHED_EVENTS',
}


type globalConfigOption = keyof ZoneGlobalConfigurations;
type flagOptions = [globalConfigOption, boolean] |
  [zoneSymbols.setInterval, boolean] |
  [zoneSymbols.setTimeout, boolean] |
  [zoneSymbols.unpatchedEvents, string[], any?]
  ;



export interface ZoneConfigurator {
  global: {
    disable: <T>(options: Partial<ZoneGlobalConfigurations>) => void
  }
}

function getZoneConfigurator(): ZoneConfigurator {
  const globalConfigurations = window as ZoneGlobalConfigurations;
  return {
    global: {
      disable: (options: Partial<ZoneGlobalConfigurations>) => {

      }
    }

  };


  function disable<T>(options: Partial<ZoneGlobalConfigurations>) {

    globalConfigurations[optionSet[0]] = optionSet[1];
  }
}

export const zoneConfigurator = getZoneConfigurator();

globalZoneConfig.__Zone_disable_EventEmitter = true;
