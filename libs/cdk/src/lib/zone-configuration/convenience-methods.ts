import { ZoneConfigConfiguration } from './model/zone-cfg.types';
import { xhrEvents } from './event-names';

/**
 * Unpatch passive events https://developers.google.com/web/updates/2016/06/passive-event-listeners
 **/
export const useUnpatchedPassiveScrollEvents = (
  config: ZoneConfigConfiguration
) => () => {
  config.events.disable.PASSIVE_EVENTS(['scroll']);
  config.events.disable.UNPATCHED_EVENTS(['scroll']);
};

/**
 * Unpatch all related to XHR
 **/
export const unpatchXHR = (config: ZoneConfigConfiguration) => () => {
  config.global.disable.XHR();
  config.events.disable.UNPATCHED_EVENTS([...xhrEvents]);
};
