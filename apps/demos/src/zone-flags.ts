import {
  globalEvents,
  xhrEvent,
  zoneConfig
} from './app/rx-angular-pocs/cdk/zone-configuration';

zoneConfig.global.disable.requestAnimationFrame();
zoneConfig.global.disable.timers();
zoneConfig.events.disable.UNPATCHED_EVENTS([...globalEvents, ...xhrEvent]);
