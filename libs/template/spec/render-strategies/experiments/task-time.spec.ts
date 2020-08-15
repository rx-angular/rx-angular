// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from "@test-helpers";


/** @test {coalesceWith} */
describe('execution order', () => {
  beforeAll(() => mockConsole());

  it('task, micro, macro', (done) => {
    const executionOrder = [1, 2, 3];
    setTimeout(() => {
      expect(executionOrder.shift()).toBe(3);
      done();
    });
    Promise.resolve().then(() => {
      expect(executionOrder.shift()).toBe(2);
    });
    expect(executionOrder.shift()).toBe(1);
  });

  it('task, micro, macro - multi', (done) => {
    const executionOrder = [1, 2, 3, 4, 5, 6];
    setTimeout(() => {
      expect(executionOrder.shift()).toBe(5);
    });
    Promise.resolve().then(() => {
      expect(executionOrder.shift()).toBe(3);
    });
    expect(executionOrder.shift()).toBe(1);
    Promise.resolve().then(() => {
      expect(executionOrder.shift()).toBe(4);
    });
    setTimeout(() => {
      expect(executionOrder.shift()).toBe(6);
      done();
    });
    expect(executionOrder.shift()).toBe(2);
  });

  it('micro nested', (done) => {
    const executionOrder = [1, 2, 3, 4, 5];
    Promise.resolve().then(() => {
      expect(executionOrder.shift()).toBe(2);
      Promise.resolve().then(() => {
        expect(executionOrder.shift()).toBe(4);
      });
    });
    expect(executionOrder.shift()).toBe(1);
    Promise.resolve().then(() => {
      expect(executionOrder.shift()).toBe(3);
    });
    setTimeout(() => {
      expect(executionOrder.shift()).toBe(5);
      done();
    });
  });

  it('macro nested', (done) => {
    const executionOrder = [1, 2, 3, 4, 5];
    setTimeout(() => {
      expect(executionOrder.shift()).toBe(3);
      setTimeout(() => {
        expect(executionOrder.shift()).toBe(5);
        done();
      });
    });
    expect(executionOrder.shift()).toBe(1);
    setTimeout(() => {
      expect(executionOrder.shift()).toBe(4);
    });
    Promise.resolve().then(() => {
      expect(executionOrder.shift()).toBe(2);
    });
  });

});
