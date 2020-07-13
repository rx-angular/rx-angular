import { safePluck } from '../../../src/lib/core/utils';

describe('safePluck', () => {
    const bar = 'hello'
    const obj = { foo: { bar } };
    it('should not touch passed arguments', () => {
        const args = ['foo', 'bar'];
        expect(safePluck(args.length)).toBe(2);
    })
    it('should return `bar` when keys are provided', () => {
        expect(safePluck(obj, ['foo', 'bar'])).toEqual(bar);
    })

    it('should return whole `obj` when keys are not provided', () => {
        expect(safePluck(obj, [])).toEqual(obj);
    })

    it('should return whole `obj` when incorrect keys are provided', () => {
        expect(safePluck(obj, ['incorrect-key'])).toEqual(obj);
    })
})
