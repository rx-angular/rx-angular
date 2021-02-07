import {
  globalEvents,
  xhrEvent,
  zoneConfig
} from './app/rx-angular-pocs';

//zoneConfig.global.disable.requestAnimationFrame();
//zoneConfig.global.disable.timers();
zoneConfig.events.disable.UNPATCHED_EVENTS([...globalEvents, ...xhrEvent]);
// requestAnimationFrame
//(window as any).__Zone_disable_requestAnimationFrame = true;
// setTimeout, setInterval
//(window as any).__Zone_disable_timers = true;
