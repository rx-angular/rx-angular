import { Observable, fromEvent } from 'rxjs';
import {
  NodeStyleEventEmitter,
  NodeCompatibleEventEmitter,
  NodeEventHandler
} from 'rxjs/internal/observable/fromEvent';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

declare const type: Function;

declare function asDiagram(arg: string): Function;
declare const rxTestScheduler: TestScheduler;

/** @test {fromEvent} */
describe('fromEvent', () => {
  it('should setup an event observable on objects with "on" and "off" ', () => {
    let onEventName;
    let onHandler;
    let offEventName;
    let offHandler;

    const obj = {
      on: (a: string, b: Function) => {
        onEventName = a;
        onHandler = b;
      },
      off: (a: string, b: Function) => {
        offEventName = a;
        offHandler = b;
      }
    };

    const subscription = fromEvent(obj, 'click').subscribe(() => {
      //noop
    });

    subscription.unsubscribe();

    expect(onEventName).toEqual('click');
    expect(typeof onHandler).toEqual('function');
    expect(offEventName).toEqual(onEventName);
    expect(offHandler).toEqual(onHandler);
  });

  it('should setup an event observable on objects with "addEventListener" and "removeEventListener" ', () => {
    let onEventName;
    let onHandler;
    let offEventName;
    let offHandler;

    const obj = {
      addEventListener: (
        a: string,
        b: EventListenerOrEventListenerObject,
        useCapture?: boolean
      ) => {
        onEventName = a;
        onHandler = b;
      },
      removeEventListener: (
        a: string,
        b: EventListenerOrEventListenerObject,
        useCapture?: boolean
      ) => {
        offEventName = a;
        offHandler = b;
      }
    };

    const subscription = fromEvent(<any>obj, 'click').subscribe(() => {
      //noop
    });

    subscription.unsubscribe();

    expect(onEventName).toEqual('click');
    expect(typeof onHandler).toEqual('function');
    expect(offEventName).toEqual(onEventName);
    expect(offHandler).toEqual(onHandler);
  });

  it('should setup an event observable on objects with "addListener" and "removeListener" returning event emitter', () => {
    let onEventName;
    let onHandler;
    let offEventName;
    let offHandler;

    const obj = {
      addListener(a: string | symbol, b: (...args: any[]) => void) {
        onEventName = a;
        onHandler = b;
        return this;
      },
      removeListener(a: string | symbol, b: (...args: any[]) => void) {
        offEventName = a;
        offHandler = b;
        return this;
      }
    };

    const subscription = fromEvent(obj, 'click').subscribe(() => {
      //noop
    });

    subscription.unsubscribe();

    expect(onEventName).toEqual('click');
    expect(typeof onHandler).toEqual('function');
    expect(offEventName).toEqual(onEventName);
    expect(offHandler).toEqual(onHandler);
  });

  it('should setup an event observable on objects with "addListener" and "removeListener" returning nothing', () => {
    let onEventName;
    let onHandler;
    let offEventName;
    let offHandler;

    const obj = {
      addListener(
        a: string,
        b: (...args: any[]) => any,
        context?: any
      ): { context: any } {
        onEventName = a;
        onHandler = b;
        return { context: '' };
      },
      removeListener(a: string, b: (...args: any[]) => void) {
        offEventName = a;
        offHandler = b;
      }
    };

    const subscription = fromEvent(obj, 'click').subscribe(() => {
      //noop
    });

    subscription.unsubscribe();

    expect(onEventName).toEqual('click');
    expect(typeof onHandler).toEqual('function');
    expect(offEventName).toEqual(onEventName);
    expect(offHandler).toEqual(onHandler);
  });

  it('should setup an event observable on objects with "addListener" and "removeListener" and "length" ', () => {
    let onEventName;
    let onHandler;
    let offEventName;
    let offHandler;

    const obj = {
      addListener: (a: string, b: Function) => {
        onEventName = a;
        onHandler = b;
      },
      removeListener: (a: string, b: Function) => {
        offEventName = a;
        offHandler = b;
      },
      length: 1
    };

    const subscription = fromEvent(obj, 'click').subscribe(() => {
      //noop
    });

    subscription.unsubscribe();

    expect(onEventName).toEqual('click');
    expect(typeof onHandler).toEqual('function');
    expect(offEventName).toEqual(onEventName);
    expect(offHandler).toEqual(onHandler);
  });

  it('should error on invalid event targets', () => {
    const obj = {
      addListener: () => {
        //noop
      }
    };

    fromEvent(obj as any, 'click').subscribe({
      error(err: any) {
        expect(err).toBeTruthy();
        expect(err instanceof Error).toBeTruthy();
        expect(err.message).toBe('Invalid event target');
      }
    });
  });

  it('should pass through options to addEventListener and removeEventListener', () => {
    let onOptions;
    let offOptions;
    const expectedOptions = { capture: true, passive: true };

    const obj = {
      addEventListener: (
        a: string,
        b: EventListenerOrEventListenerObject,
        c?: any
      ) => {
        onOptions = c;
      },
      removeEventListener: (
        a: string,
        b: EventListenerOrEventListenerObject,
        c?: any
      ) => {
        offOptions = c;
      }
    };

    const subscription = fromEvent(
      <any>obj,
      'click',
      expectedOptions
    ).subscribe(() => {
      //noop
    });

    subscription.unsubscribe();

    expect(onOptions).toEqual(expectedOptions);
    expect(offOptions).toEqual(expectedOptions);
  });

  it('should pass through events that occur', done => {
    let send: any;
    const obj = {
      on: (name: string, handler: Function) => {
        send = handler;
      },
      off: () => {
        //noop
      }
    };

    fromEvent(obj, 'click')
      .pipe(take(1))
      .subscribe(
        (e: any) => {
          expect(e).toEqual('test');
        },
        (err: any) => {
          done(new Error('should not be called'));
        },
        () => {
          done();
        }
      );

    send('test');
  });

  it('should pass through events that occur and use the selector if provided', done => {
    let send: any;
    const obj = {
      on: (name: string, handler: Function) => {
        send = handler;
      },
      off: () => {
        //noop
      }
    };

    function selector(x: string) {
      return x + '!';
    }

    fromEvent(obj, 'click', selector)
      .pipe(take(1))
      .subscribe(
        (e: any) => {
          expect(e).toEqual('test!');
        },
        (err: any) => {
          done(new Error('should not be called'));
        },
        () => {
          done();
        }
      );

    send('test');
  });

  it('should not fail if no event arguments are passed and the selector does not return', done => {
    let send: any;
    const obj = {
      on: (name: string, handler: Function) => {
        send = handler;
      },
      off: () => {
        //noop
      }
    };

    function selector() {
      //noop
    }

    fromEvent(obj, 'click', selector)
      .pipe(take(1))
      .subscribe(
        (e: any) => {
          expect(e).not.toBeDefined();
        },
        (err: any) => {
          done(new Error('should not be called'));
        },
        () => {
          done();
        }
      );

    send();
  });

  it('should return a value from the selector if no event arguments are passed', done => {
    let send: any;
    const obj = {
      on: (name: string, handler: Function) => {
        send = handler;
      },
      off: () => {
        //noop
      }
    };

    function selector() {
      return 'no arguments';
    }

    fromEvent(obj, 'click', selector)
      .pipe(take(1))
      .subscribe(
        (e: any) => {
          expect(e).toEqual('no arguments');
        },
        (err: any) => {
          done(new Error('should not be called'));
        },
        () => {
          done();
        }
      );

    send();
  });

  it('should pass multiple arguments to selector from event emitter', done => {
    let send: any;
    const obj = {
      on: (name: string, handler: Function) => {
        send = handler;
      },
      off: () => {
        //noop
      }
    };

    function selector(x: number, y: number, z: number) {
      return [].slice.call(arguments);
    }

    fromEvent(obj, 'click', selector)
      .pipe(take(1))
      .subscribe(
        (e: any) => {
          expect(e[0]).toEqual(1);
          expect(e[1]).toEqual(2);
          expect(e[2]).toEqual(3);
        },
        (err: any) => {
          done(new Error('should not be called'));
        },
        () => {
          done();
        }
      );

    send(1, 2, 3);
  });

  it('should emit multiple arguments from event as an array', done => {
    let send: any;
    const obj = {
      on: (name: string, handler: Function) => {
        send = handler;
      },
      off: () => {
        //noop
      }
    };

    fromEvent(obj, 'click')
      .pipe(take(1))
      .subscribe(
        (e: any) => {
          expect(e[0]).toEqual(1);
          expect(e[1]).toEqual(2);
          expect(e[2]).toEqual(3);
        },
        (err: any) => {
          done(new Error('should not be called'));
        },
        () => {
          done();
        }
      );

    send(1, 2, 3);
  });

  it('should not throw an exception calling toString on obj with a null prototype', done => {
    // NOTE: Can not test with Object.create(null) or `class Foo extends null`
    // due to TypeScript bug. https://github.com/Microsoft/TypeScript/issues/1108
    class NullProtoEventTarget {
      on() {
        /*noop*/
      }
      off() {
        /*noop*/
      }
    }
    // tslint:disable-next-line
    NullProtoEventTarget.prototype.toString = null!;
    const obj: NullProtoEventTarget = new NullProtoEventTarget();

    expect(() => {
      fromEvent(obj, 'foo').subscribe();
      done();
    }).not.toThrow(TypeError);
  });

  type('should support node style event emitters interfaces', () => {
    /* tslint:disable */
    let a: NodeStyleEventEmitter;
    let b: Observable<any> = fromEvent(a!, 'mock');
    /* tslint:enable */
  });

  type('should support node compatible event emitters interfaces', () => {
    /* tslint:disable */
    let a: NodeCompatibleEventEmitter;
    let b: Observable<any> = fromEvent(a!, 'mock');
    /* tslint:enable */
  });

  type('should support node style event emitters objects', () => {
    /* tslint:disable:no-unused-variable */
    interface NodeEventEmitter {
      addListener(eventType: string | symbol, handler: NodeEventHandler): this;
      removeListener(
        eventType: string | symbol,
        handler: NodeEventHandler
      ): this;
    }
    /* tslint:disable */
    let a: NodeEventEmitter;
    let b: Observable<any> = fromEvent(a!, 'mock');
    /* tslint:enable  */
  });
});
