import { zoneFlags } from './zone/zone-flags';
import { touchEvents, websocketEvents } from './zone/event-names';

zoneFlags.global.__Zone_disable_blocking = true;
zoneFlags.runtime.__zone_symbol__ignoreConsoleErrorUncaughtError = true;
zoneFlags.target.add(WebSocket.prototype, websocketEvents);
zoneFlags.target.add(HTMLElement.prototype, [...touchEvents]);
