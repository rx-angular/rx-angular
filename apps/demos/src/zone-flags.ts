import { mouseEvent, touchEvents, zoneConfig } from './app/rx-angular-pocs/zone-configuration';

zoneConfig.global.disable.requestAnimationFrame();
zoneConfig.global.disable.timers();
zoneConfig.events.disable.UNPATCHED_EVENTS([...mouseEvent, ...touchEvents]);
