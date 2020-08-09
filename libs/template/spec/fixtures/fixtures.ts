import createSpy = jasmine.createSpy;

export class MockChangeDetectorRef {
  markForCheck = createSpy('markForCheck');
  detectChanges = createSpy('detectChanges');
}

export const mockPromise = {
  then: () => {},
};
