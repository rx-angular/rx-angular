// tslint:disable:no-console
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

let i = 0;

export function start(label: string = ++i + '') {
  console.time(label);
  return () => end(label);
}

export function end(str: string = ++i + '') {
  console.timeEnd(str);
}


// Create a variety of measurements.
//   performance.measure("measure a to b", markerNameA, markerNameB);

const observableMarkerFactory = (label: string) => {
  const observableMarks = {
    subscribe: () => label + '$subscribe',
    next:  (n) => label + '$next_'+n+'',
    error:  (e) => label + '$error_'+e+'',
    complete:  () => label + '$complete',
    unsubscribe:  () => label + '$unsubscribe',
    teardown:  () => label + '$teardown'
  };

  const observableMeasures = {
    total: [label+'total', observableMarks.subscribe(), observableMarks.teardown()]
  };

  return ({
    subscribe: () => {
      performance.mark(observableMarks.subscribe());
    },
    next: (v: any) => {
      performance.mark(observableMarks.next(v));
    },
    error: (e: Error) => {
      performance.mark(observableMarks.error(e));
    },
    complete: () => {
      performance.mark(observableMarks.complete());
    },
    unsubscribe: () => {
      performance.mark(observableMarks.unsubscribe());
    },
    teardown: () => {
      performance.mark(observableMarks.teardown());
    },
    eval: () => {
      console.log('eval');
      // @ts-ignore
      performance.measure(...observableMeasures.total);
      const { name, duration } = performance.getEntriesByName(observableMeasures.total[0])[0];
      console.log(`${name}: ${duration}`);
    }
  });
}

export function measure$(label: string = ++i + '') {
  const marker = observableMarkerFactory(label);
  return o$ => new Observable((subscriber) => {
      marker.subscribe();

      const sub = o$.subscribe(
        (n) => {
          marker.next(n);
          subscriber.next(n);
        },
        (e) => {
          marker.error(e);
          subscriber.error(e);
        },
        () => {
          marker.complete();
          subscriber.complete();
        }
      );

      return () => {
        marker.teardown();
        sub.unsubscribe();
        marker.eval();
      }

    }
  );
}

export function promiseMarkerFactory(label: string) {
  const promiseMarks = {
    start: () => label+'Pstart',
    then: (r) =>  label+'Pthen' + r + '',
    catch: (e) =>  label+'Pcatch'+e+'',
    finally: () => label+'Pfinally'
  };
  const promiseMeasures = {
    total: [label+'total', promiseMarks.start(), promiseMarks.finally()]
  };


  function _then(r) {
    performance.mark(promiseMarks.then(r));
  }

  function _start() {
    performance.mark(promiseMarks.start());
  }

  function _catch(e: Error) {
    performance.mark(promiseMarks.catch(e));
  }

  function _finally() {
    performance.mark(promiseMarks.finally());
  }

  function _eval() {
    // @ts-ignore
    performance.measure(...promiseMeasures.total);
    const { name, duration } = performance.getEntriesByName(promiseMeasures.total[0])[0];
    console.log(`${name}: ${duration}`);
  }

  return {
    wrap: (p: Promise<any>): Promise<any> => {
      _start();
      return p
        .then(r => {
          _then(r);
          return Promise.resolve(r);
        })
        .catch(e => {
          _catch(e);
          return Promise.reject(e);
        })
        .finally(() => {
          _finally();
          _eval();
        });
    }
  };
}




