import { of } from 'rxjs';
import { createTemplateNotifier } from './create-template-notifier';

describe(createTemplateNotifier.name, () => {
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
