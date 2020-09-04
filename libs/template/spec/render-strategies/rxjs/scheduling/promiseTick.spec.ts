import { ApplicationRef, Component, NgModule } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { getGlobalThis } from '../../../../src/lib/core/utils';
import { promiseTick } from '../../../../src/lib/render-strategies/rxjs/scheduling';

let originalGlobalPromise;

/** @test {promiseTick} */
describe('promiseTick', () => {
  async function setup() {
    @Component({
      // tslint:disable-next-line:component-selector
      selector: 'body',
      template: '<div></div>',
    })
    class NgZoneTestComponent {}

    @NgModule({
      declarations: [NgZoneTestComponent],
      exports: [NgZoneTestComponent],
      bootstrap: [NgZoneTestComponent],
      imports: [NoopAnimationsModule],
    })
    class MyAppModule {}

    const platform = getTestBed().platform;
    const moduleRef = await platform.bootstrapModule(MyAppModule, { ngZone: 'noop' });
    const appRef = moduleRef.injector.get(ApplicationRef);
    const testComp = appRef.components[0].instance;

    return { hasZone: testComp.checkNgZone };
  }

  beforeAll(() => {
    mockConsole();
    originalGlobalPromise = getGlobalThis().__zone_symbol__Promise;
  });

  beforeEach(async () => {
    await setup();
  });

  afterEach(() => {
    getGlobalThis().__zone_symbol__Promise = originalGlobalPromise;
  });

  it('should handle errors', done => {
    const error = new Error('ERROR');
    getGlobalThis().__zone_symbol__Promise = {
      resolve: () => {
        return new Promise<void>((resolve, reject) => {
          throw error;
        });
      }
    };
    promiseTick().subscribe({
      next: v => console.log(v),
      error: err => {
        console.error(err);
        expect(err).toEqual(error);
        done();
      }
    });
  });
});
