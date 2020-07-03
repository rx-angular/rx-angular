import createSpy = jasmine.createSpy;
import { ApplicationRef, Component, NgModule, NgZone } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { isNgZone } from '../../../src/lib/core/utils';

async function createNgZone(ngZone: 'zone.js'|'noop'): Promise<NgZone> {
  @Component({
    template: '<div></div>',
  })
  class NgZoneTestComponent {
    constructor(readonly injectedNgZone: NgZone) {}
  }

  @NgModule({
    bootstrap: [NgZoneTestComponent],
    declarations: [NgZoneTestComponent],
    exports: [NgZoneTestComponent],
    imports: [NoopAnimationsModule],
  })
  class MyAppModule {}

  const platform = getTestBed().platform;
  const moduleRef = await platform.bootstrapModule(MyAppModule, { ngZone });
  const appRef = moduleRef.injector.get(ApplicationRef);
  const testComp = appRef.components[0].instance;

  return testComp.injectedNgZone;
}

xdescribe('NgZone', () => {
  it('should invoke a given function by calling .apply()', async () => {
    const fn = createSpy();
    const ngZone = await createNgZone('zone.js');

    fn.apply = createSpy();
    ngZone.runOutsideAngular(fn);

    expect(fn).toHaveBeenCalledTimes(0);
    expect(fn.apply).toHaveBeenCalledTimes(1);
  });
});

xdescribe('NoopNgZone', () => {
  it('should invoke a given function directly', async () => {
    const fn = createSpy();
    const ngZone = await createNgZone('noop');

    fn.apply = createSpy();
    ngZone.runOutsideAngular(fn);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.apply).toHaveBeenCalledTimes(0);
  });
});

describe('isNgZone()', () => {
  it('should return true if `zone.js` did patch the global API', () => {
    expect(isNgZone({ runOutsideAngular (fn) { fn.apply(null) } })).toBe(true);
  });

  it('should return false if `zone.js` did not patch the global API', () => {
    expect(isNgZone({ runOutsideAngular (fn) { fn() } })).toBe(false);
  });
});
