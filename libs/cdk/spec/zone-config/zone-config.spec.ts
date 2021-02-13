import { zoneConfig, ZoneGlobalConfigurations } from '@rx-angular/cdk';

describe('zone-config', () => {
  const w = window as ZoneGlobalConfigurations;
  it('should be created', () => {
    expect(zoneConfig).toBeTruthy();
  });

  describe('global flags', () => {
    it('should have global and disable flags present', () => {
      expect(typeof zoneConfig.global).toBe('object');
      expect(typeof zoneConfig.global.disable).toBe('object');
    });

    it('should have EventEmitter present', () => {
      expect(typeof zoneConfig.global.disable.EventEmitter).toBe('function');
      expect(w.__Zone_disable_EventEmitter).toBe(undefined);
      zoneConfig.global.disable.EventEmitter();
      expect(w.__Zone_disable_EventEmitter).toBe(true);
    });

    it('should have fs present', () => {
      expect(typeof zoneConfig.global.disable.fs).toBe('function');
      expect(w.__Zone_disable_fs).toBe(undefined);
      zoneConfig.global.disable.fs();
      expect(w.__Zone_disable_fs).toBe(true);
    });

    it('should have node_timers present', () => {
      expect(typeof zoneConfig.global.disable.node_timers).toBe('function');
      expect(w.__Zone_disable_node_timers).toBe(undefined);
      zoneConfig.global.disable.node_timers();
      expect(w.__Zone_disable_node_timers).toBe(true);
    });

    it('should have nextTick present', () => {
      expect(typeof zoneConfig.global.disable.nextTick).toBe('function');
      expect(w.__Zone_disable_nextTick).toBe(undefined);
      zoneConfig.global.disable.nextTick();
      expect(w.__Zone_disable_nextTick).toBe(true);
    });

    it('should have crypto present', () => {
      expect(typeof zoneConfig.global.disable.crypto).toBe('function');
      expect(w.__Zone_disable_crypto).toBe(undefined);
      zoneConfig.global.disable.crypto();
      expect(w.__Zone_disable_crypto).toBe(true);
    });

    it('should have defineProperty present', () => {
      expect(typeof zoneConfig.global.disable.defineProperty).toBe('function');
      expect(w.__Zone_disable_defineProperty).toBe(undefined);
      zoneConfig.global.disable.defineProperty();
      expect(w.__Zone_disable_defineProperty).toBe(true);
    });

    it('should have registerElement present', () => {
      expect(typeof zoneConfig.global.disable.registerElement).toBe('function');
      expect(w.__Zone_disable_registerElement).toBe(undefined);
      zoneConfig.global.disable.registerElement();
      expect(w.__Zone_disable_registerElement).toBe(true);
    });

    it('should have EventTargetLegacy present', () => {
      expect(typeof zoneConfig.global.disable.EventTargetLegacy).toBe('function');
      expect(w.__Zone_disable_EventTargetLegacy).toBe(undefined);
      zoneConfig.global.disable.EventTargetLegacy();
      expect(w.__Zone_disable_EventTargetLegacy).toBe(true);
    });

    it('should have timers present', () => {
      expect(typeof zoneConfig.global.disable.timers).toBe('function');
      expect(w.__Zone_disable_timers).toBe(undefined);
      zoneConfig.global.disable.timers();
      expect(w.__Zone_disable_timers).toBe(true);
    });


    it('should have blocking present', () => {
      expect(typeof zoneConfig.global.disable.blocking).toBe('function');
      expect(w.__Zone_disable_blocking).toBe(undefined);
      zoneConfig.global.disable.blocking();
      expect(w.__Zone_disable_blocking).toBe(true);
    });

    it('should have EventTarget present', () => {
      expect(typeof zoneConfig.global.disable.EventTarget).toBe('function');
      expect(w.__Zone_disable_EventTarget).toBe(undefined);
      zoneConfig.global.disable.EventTarget();
      expect(w.__Zone_disable_EventTarget).toBe(true);
    });

    it('should have FileReader present', () => {
      expect(typeof zoneConfig.global.disable.FileReader).toBe('function');
      expect(w.__Zone_disable_FileReader).toBe(undefined);
      zoneConfig.global.disable.FileReader();
      expect(w.__Zone_disable_FileReader).toBe(true);
    });

    it('should have MutationObserver present', () => {
      expect(typeof zoneConfig.global.disable.MutationObserver).toBe('function');
      expect(w.__Zone_disable_MutationObserver).toBe(undefined);
      zoneConfig.global.disable.MutationObserver();
      expect(w.__Zone_disable_MutationObserver).toBe(true);
    });

    it('should have IntersectionObserver present', () => {
      expect(typeof zoneConfig.global.disable.IntersectionObserver).toBe('function');
      expect(w.__Zone_disable_IntersectionObserver).toBe(undefined);
      zoneConfig.global.disable.IntersectionObserver();
      expect(w.__Zone_disable_IntersectionObserver).toBe(true);
    });

    it('should have on_property present', () => {
      expect(typeof zoneConfig.global.disable.on_property).toBe('function');
      expect(w.__Zone_disable_on_property).toBe(undefined);
      zoneConfig.global.disable.on_property();
      expect(w.__Zone_disable_on_property).toBe(true);
    });

    it('should have customElements present', () => {
      expect(typeof zoneConfig.global.disable.customElements).toBe('function');
      expect(w.__Zone_disable_customElements).toBe(undefined);
      zoneConfig.global.disable.customElements();
      expect(w.__Zone_disable_customElements).toBe(true);
    });

    it('should have XHR present', () => {
      expect(typeof zoneConfig.global.disable.XHR).toBe('function');
      expect(w.__Zone_disable_XHR).toBe(undefined);
      zoneConfig.global.disable.XHR();
      expect(w.__Zone_disable_XHR).toBe(true);
    });

    it('should have geolocation present', () => {
      expect(typeof zoneConfig.global.disable.geolocation).toBe('function');
      expect(w.__Zone_disable_geolocation).toBe(undefined);
      zoneConfig.global.disable.geolocation();
      expect(w.__Zone_disable_geolocation).toBe(true);
    });

    it('should have canvas present', () => {
      expect(typeof zoneConfig.global.disable.canvas).toBe('function');
      expect(w.__Zone_disable_canvas).toBe(undefined);
      zoneConfig.global.disable.canvas();
      expect(w.__Zone_disable_canvas).toBe(true);
    });

    it('should have ZoneAwarePromise present', () => {
      expect(typeof zoneConfig.global.disable.ZoneAwarePromise).toBe('function');
      expect(w.__Zone_disable_ZoneAwarePromise).toBe(undefined);
      zoneConfig.global.disable.ZoneAwarePromise();
      expect(w.__Zone_disable_ZoneAwarePromise).toBe(true);
    });

  });

  describe('test flags', () => {
    it('should have test flags present', () => {
      expect(typeof zoneConfig.test).toBe('object');
    });
  });

  describe('events flags', () => {
    it('should have events flags present', () => {
      expect(typeof zoneConfig.events).toBe('object');
    });
  });

  describe('runtime flags', () => {
    it('should have runtime flags present', () => {
      expect(typeof zoneConfig.runtime).toBe('object');
    });
  });
});
