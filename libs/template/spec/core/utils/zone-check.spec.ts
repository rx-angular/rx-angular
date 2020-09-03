import { ApplicationRef, Component, NgModule, NgZone } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { isEnvZonePatched, isNgZone, isNoopNgZone } from '../../../src/lib/core/utils';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';


describe('hasZone', () => {
  beforeAll(() => mockConsole());

  async function setup({ defaultZone }: { defaultZone: boolean }) {
    @Component({
      // tslint:disable-next-line:component-selector
      selector: 'body',
      template: '<div></div>',
    })
    class NgZoneTestComponent {
      checkNgZone = isNgZone(this.ngZone);
      constructor(readonly ngZone: NgZone) {}
    }

    @NgModule({
      declarations: [NgZoneTestComponent],
      exports: [NgZoneTestComponent],
      bootstrap: [NgZoneTestComponent],
      imports: [NoopAnimationsModule],
    })
    class MyAppModule {}

    const platform = getTestBed().platform;
    const moduleRef = defaultZone
      ? await platform.bootstrapModule(MyAppModule)
      : await platform.bootstrapModule(MyAppModule, { ngZone: 'noop' });
    const appRef = moduleRef.injector.get(ApplicationRef);
    const testComp = appRef.components[0].instance;

    return { hasZone: testComp.checkNgZone };
  }

  it('returns false when default zone is used', async () => {
    expect(await setup({ defaultZone: true })).toEqual({ hasZone: true });
  });

  it('returns true when noop zone is chosen', async () => {
    expect(await setup({ defaultZone: false })).toEqual({ hasZone: false });
  });
});

describe('isNoopNgZone', () => {
  async function setup({ defaultZone }: { defaultZone: boolean }) {
    @Component({
      // tslint:disable-next-line:component-selector
      selector: 'body',
      template: '<div></div>',
    })
    class NgZoneTestComponent {
      constructor(readonly ngZone: NgZone) {}
    }

    @NgModule({
      declarations: [NgZoneTestComponent],
      exports: [NgZoneTestComponent],
      bootstrap: [NgZoneTestComponent],
      imports: [NoopAnimationsModule],
    })
    class MyAppModule {}

    const platform = getTestBed().platform;
    const moduleRef = defaultZone
      ? await platform.bootstrapModule(MyAppModule)
      : await platform.bootstrapModule(MyAppModule, { ngZone: 'noop' });
    const appRef = moduleRef.injector.get(ApplicationRef);
    const testComp = appRef.components[0].instance;

    return { component: testComp, ngZone: testComp.ngZone };
  }

  it('returns false when default zone is used', async () => {
    const componentSetup = await setup({ defaultZone: true });
    expect(isNoopNgZone(componentSetup.ngZone)).toEqual(false);
  });

  it('should return same value from cache', async () => {
    const componentSetup = await setup({ defaultZone: false });
    expect(isNoopNgZone(componentSetup.ngZone)).toEqual(true);
    expect(isNoopNgZone(componentSetup.ngZone)).toEqual(true);
  });

  it('returns true when noop zone is chosen', async () => {
    const componentSetup = await setup({ defaultZone: false });
    expect(isNoopNgZone(componentSetup.ngZone)).toEqual(true);
  });
});

describe('envZonePatched', () => {
  async function setup({ defaultZone }: { defaultZone: boolean }) {
    @Component({
      // tslint:disable-next-line:component-selector
      selector: 'body',
      template: '<div></div>',
    })
    class NgZoneTestComponent {
      checkEnvZonePatched = isEnvZonePatched();
    }

    @NgModule({
      declarations: [NgZoneTestComponent],
      exports: [NgZoneTestComponent],
      bootstrap: [NgZoneTestComponent],
      imports: [NoopAnimationsModule],
    })
    class MyAppModule {}

    const platform = getTestBed().platform;
    const moduleRef = defaultZone
      ? await platform.bootstrapModule(MyAppModule)
      : await platform.bootstrapModule(MyAppModule, { ngZone: 'noop' });
    const appRef = moduleRef.injector.get(ApplicationRef);
    const testComp = appRef.components[0].instance;

    return { checkEnvZonePatched: testComp.checkEnvZonePatched };
  }

  it('returns true when default zone is used', async () => {
    expect(await setup({ defaultZone: true })).toEqual({ checkEnvZonePatched: true });
  });

  it('returns true when zone is present', async () => {
    expect(isEnvZonePatched()).toBe(true);
  });

});
