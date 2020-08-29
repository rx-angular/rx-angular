import createSpy = jasmine.createSpy;

export class MockChangeDetectorRef {
  markForCheck = createSpy('markForCheck');
  detectChanges = createSpy('detectChanges');
  detach = createSpy('detach');
  reattach = createSpy('reattach');
}

export const mockPromise = {
  then: () => {},
};
