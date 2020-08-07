import { safePluck } from '../../../src/lib/core/utils';

interface ISafePluckSpec {
  foo: { bar: string };
}
describe('safePluck', () => {
  const bar = 'hello';
  const obj: ISafePluckSpec = { foo: { bar } };
  it('should not touch passed arguments', () => {
    const args = ['foo', 'bar'] as any;
    safePluck(obj, args);
    expect(args.length).toBe(2);
  });

  it('should return `bar` when keys are provided', () => {
    expect(safePluck(obj, ['foo', 'bar'])).toEqual(bar);
  });

  it('should throw error when object and key are invalid', () => {
    expect(() => safePluck(undefined as any, null as any)).toThrowError(
      'No keys given to pluck'
    );
  });

  it('should throw error when object is invalid', () => {
    const args = ['foo', 'bar'] as any;
    expect(() => safePluck(undefined as any, args)).toThrowError(
      'No object to pluck from'
    );
  });

  it('should throw error when object is empty', () => {
    const args = ['foo', 'bar'] as any;
    expect(() => safePluck({}, args)).toThrowError(
      "Can't pluck from empty object"
    );
  });

  it('should throw error when keys are not provided', () => {
    expect(() => safePluck(obj, null as any)).toThrowError(
      'No keys given to pluck'
    );
  });

  it('should return undefined when incorrect keys are provided', () => {
    expect(safePluck(obj, ['incorrect-key'] as any)).toEqual(undefined);
  });
});
