import { mouseEvent, touchEvents } from './zone/event-names';
import { zoneFlagsConfigurator } from './zone/zone-flags-configurator';

zoneFlagsConfigurator.global.disable.requestAnimationFrame();
zoneFlagsConfigurator.global.disable.timers();
zoneFlagsConfigurator.events.disable.UNPATCHED_EVENTS([...mouseEvent, ...touchEvents]);
