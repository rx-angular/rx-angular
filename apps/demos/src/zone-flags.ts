import { zoneFlagsConfigurator } from './zone/zone-flags-configurator';
import { mouseEvent } from './zone/event-names';
import { ZoneGlobalConfigurations } from './zone/model/zone.configurations.api';

// zoneFlagsConfigurator.global.__Zone_disable_requestAnimationFrame = true;
// zoneFlagsConfigurator.target.add(HTMLElement.prototype, [...mouseEvent]);
const cfg = (window as ZoneGlobalConfigurations);
cfg.__Zone_disable_requestAnimationFrame = true;
cfg.__zone_symbol__UNPATCHED_EVENTS = mouseEvent;

