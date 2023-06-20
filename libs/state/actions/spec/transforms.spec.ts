// eslint-disable-next-line @nx/enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import {
  eventValue,
  preventDefault,
  preventDefaultStopPropagation,
  stopPropagation,
} from '../src/lib/transforms';

const e = {
  preventDefault: () => void 0,
  stopPropagation: () => void 0,
} as any as Event;

/** @test {RxActionFactory} */
describe('Signal transforms', () => {
  beforeAll(() => mockConsole());

  it('eventValue should pluck value if an event is passed', () => {
    expect(eventValue({ target: { value: '42' } })).toBe('42');
  });

  it('eventValue should forward value if no event is passed', () => {
    expect(eventValue('42')).toBe('42');
  });

  it('preventDefault should call preventDefault on the event', () => {
    const preventDefaultSpy = jest.spyOn(e, 'preventDefault');
    const res = preventDefault(e);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(res).toStrictEqual(e);
  });

  it('stopPropagation should call stopPropagation on the event', () => {
    const stopPropagationSpy = jest.spyOn(e, 'stopPropagation');
    const res = stopPropagation(e);
    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(res).toStrictEqual(e);
  });

  it('preventDefaultStopPropagation should call preventDefault and stopPropagation on the event', () => {
    const preventDefaultSpy = jest.spyOn(e, 'preventDefault');
    const stopPropagationSpy = jest.spyOn(e, 'stopPropagation');
    const res = preventDefaultStopPropagation(e);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(res).toStrictEqual(e);
  });
});
