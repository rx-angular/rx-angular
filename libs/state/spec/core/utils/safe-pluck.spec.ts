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

  it('should return undefined when object is not valid', () => {
    expect(safePluck([undefined] as any, ['prop1'] as any)).toEqual(undefined);
  });

  it('should return undefined when keys are not provided', () => {
    expect(safePluck(obj, null as any)).toEqual(undefined);
  });

  it('should return undefined when incorrect keys are provided', () => {
    expect(safePluck(obj, ['incorrect-key'] as any)).toEqual(undefined);
  });

  it('should return undefined when incorrect keys are provided', () => {
    expect(safePluck(obj, ['incorrect-key'] as any)).toEqual(undefined);
  });
});
