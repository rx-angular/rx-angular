import { BehaviorSubject, NEVER, of, throwError } from 'rxjs';
import { createTemplateNotifier } from './create-template-notifier';
import { RxNotification, RxNotificationKind } from './model';

describe(createTemplateNotifier.name, () => {
  it('should not emit anything when input is NEVER', () => {
    const templateNotifier = createTemplateNotifier();
    let n: RxNotification<any>;
    templateNotifier.next(NEVER);
    templateNotifier.values$.subscribe({
      next: (notification) => {
        n = notification;
      },
    });

    expect(n).toBeUndefined();
  });

  it('should not emit first undefined value', () => {
    const templateNotifier = createTemplateNotifier();
    let n: RxNotification<any>;
    templateNotifier.next(undefined);
    templateNotifier.values$.subscribe({
      next: (notification) => {
        n = notification;
      },
    });

    expect(n).toBeUndefined();
  });

  it('should skip suspense when observable has value', () => {
    const templateNotifier = createTemplateNotifier();
    const spy = jest.fn();
    let n: RxNotification<any>;
    templateNotifier.next(new BehaviorSubject<number>(1));
    templateNotifier.values$.subscribe({
      next: (notification) => {
        n = notification;
        spy();
      },
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(n.kind).toBe(RxNotificationKind.Next);
  });

  it('should treat undefined as suspense', () => {
    const templateNotifier = createTemplateNotifier();
    let n: RxNotification<any>;
    templateNotifier.values$.subscribe({
      next: (notification) => {
        n = notification;
      },
    });
    templateNotifier.next(new BehaviorSubject(undefined));
    expect(n.kind).toBe(RxNotificationKind.Suspense);
    expect(n.value).toBe(undefined);
  });

  it('should handle errors', () => {
    const spy = { next: jest.fn(), error: jest.fn() };
    const templateNotifier = createTemplateNotifier();
    templateNotifier.next(throwError(() => new Error('')));
    let n: RxNotification<any>;
    templateNotifier.values$.subscribe({
      next: (notification) => {
        n = notification;
      },
      error: spy.error,
    });

    expect(n.kind).toBe(RxNotificationKind.Error);
    expect(spy.error).not.toBeCalled();
  });

  it('should handle `null` values', () => {
    const spy = { next: jest.fn(), error: jest.fn() };
    const templateNotifier = createTemplateNotifier();

    templateNotifier.values$.subscribe(spy);

    templateNotifier.next(of(null));
    templateNotifier.next(null);

    expect(spy.next).toBeCalledTimes(3);
    expect(spy.error).not.toBeCalled();
  });
});
