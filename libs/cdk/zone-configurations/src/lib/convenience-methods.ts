import { xhrEvents } from './event-names';
import {
  RxZoneConfigConfiguration,
  RxZoneConfigConvenienceMethods,
} from './model/zone-config.types';

export const convenienceMethods = (
  config: RxZoneConfigConfiguration
): RxZoneConfigConvenienceMethods => ({
  unpatchXHR: () => {
    config.global.disable.XHR();
    config.events.disable.UNPATCHED_EVENTS([...xhrEvents]);
  },
  useUnpatchedPassiveScrollEvents: () => {
    config.events.disable.PASSIVE_EVENTS(['scroll']);
    config.events.disable.UNPATCHED_EVENTS(['scroll']);
  },
});
