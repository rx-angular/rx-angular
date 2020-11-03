import { mouseEvent } from './zone/event-names';
import { zoneFlagsConfigurator } from './zone/zone-flags-configurator';

zoneFlagsConfigurator.global.disable.requestAnimationFrame();
zoneFlagsConfigurator.events.disable.UNPATCHED_EVENTS(mouseEvent);
