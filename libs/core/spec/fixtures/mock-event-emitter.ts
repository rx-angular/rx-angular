export class MockEventEmitter<T> {
  next(value: any) {}
  error(error: any) {}
  complete() {}
  subscribe() {
    return { unsubscribe() {} };
  }
  constructor(async: boolean) {}
}
