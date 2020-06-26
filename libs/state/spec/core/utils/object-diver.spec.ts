import { objectDiver } from '../../../src/lib/core/utils';

describe('objectDiver', () => {
    const bar = 'hello'
    const obj = { foo: { bar } };

    it('should return `bar` when keys are provided', () => {
        expect(objectDiver(obj, ['foo', 'bar'])).toEqual(bar);
    })

    it('should return whole `obj` when keys are not provided', () => {
        expect(objectDiver(obj, [])).toEqual(obj);
    })

    it('should return whole `obj` when incorrect keys are provided', () => {
        expect(objectDiver(obj, ['incorrect-key'])).toEqual(obj);
    })
})