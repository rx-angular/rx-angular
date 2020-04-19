export class MockEventEmitterSpec<T> {
  next: (value: any) => { };
  error: (error: any) => { };
  complete: () => { };
  subscribe: () => { unsubscribe: () => {} };
  constructor(async: boolean) {
  }
}
