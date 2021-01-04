import {
  globalEvents,
  xhrEvent,
  zoneConfig
} from './app/rx-angular-pocs/cdk/zone-configuration';

zoneConfig.global.disable.requestAnimationFrame();
zoneConfig.global.disable.timers();
zoneConfig.events.disable.UNPATCHED_EVENTS([...globalEvents, ...xhrEvent]);

(window as any).__zone_symbol__UNPATCHED_EVENTS = [
  // window
  'scroll', 'load', 'error',
  // XHREvent
  'XHR'
];
// requestAnimationFrame
(window as any).__Zone_disable_requestAnimationFrame = true;
// setTimeout, setInterval
(window as any).__Zone_disable_timers = true;
