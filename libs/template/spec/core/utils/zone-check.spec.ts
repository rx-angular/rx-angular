import { ApplicationRef, Component, NgModule, NgZone } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { envZonePatched, isNgZone, isNoopNgZone } from '../../../src/lib/core/utils';
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
      checkNoopNgZone = isNoopNgZone(this.ngZone);
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

    return { hasZone: testComp.checkNoopNgZone };
  }

  it('returns false when default zone is used', async () => {
    expect(await setup({ defaultZone: true })).toEqual({ hasZone: false });
  });

  it('returns true when noop zone is chosen', async () => {
    expect(await setup({ defaultZone: false })).toEqual({ hasZone: true });
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
      checkEnvZonePatched = envZonePatched();
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

  it('returns false when no zone is present', async () => {
    expect(envZonePatched()).toBe(true);
  });

});
