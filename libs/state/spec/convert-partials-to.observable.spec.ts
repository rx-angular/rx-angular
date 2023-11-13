import { convertPartialsToObservable } from '../src/lib/convert-partials-to.observable';
import { EMPTY, NEVER, of } from 'rxjs';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('convertPartialsToObservable', () => {
  it('should emit once initially and combine all partials', (done) => {
    TestBed.runInInjectionContext(() => {
      const result = convertPartialsToObservable<TestModel, keyof TestModel>({
        a: of('Hi'),
        b: signal(10),
        // c: NEVER,
        // d: EMPTY
      });

      result.subscribe((value) => {
        expect(value).toEqual({ a: 'Hi', b: 10, c: undefined, d: undefined });
        done();
      });
    });
  });
});
interface TestModel {
  a: string;
  b: number;
  c: boolean;
  d: string;
}
