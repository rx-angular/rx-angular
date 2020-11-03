import { ZoneGlobalConfigurations, ZoneRuntimeConfigurations } from './model/zone.configurations.api';

type targetSet = [WebSocket, (keyof WebSocketEventMap)[]] |
[any, (keyof WindowEventMap)[]];

export interface ZoneFlagsConfigurator {
  global: ZoneGlobalConfigurations,
  runtime: ZoneRuntimeConfigurations,
  target: {
    add: (...args: targetSet) => void
  }
}

function getZoneFlagsConfigurator(): ZoneFlagsConfigurator {
  const cfg = window as ZoneGlobalConfigurations;
  if(!Array.isArray(cfg.__Zone_ignore_on_properties)) {
    cfg.__Zone_ignore_on_properties = [];
  }

  return {
    global: cfg,
    target: {
      add: (target: any, ignoreProperties: string[]) => {
        cfg.__Zone_ignore_on_properties.push({ target, ignoreProperties })
      }
    },
    runtime: cfg as ZoneRuntimeConfigurations
  }
}

export const zoneFlagsConfigurator = getZoneFlagsConfigurator();

