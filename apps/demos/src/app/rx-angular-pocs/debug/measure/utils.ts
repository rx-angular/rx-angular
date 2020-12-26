// tslint:disable:no-console
import { Observable } from 'rxjs';

/**
 * @NOTICE GENERAL INFORMATION ON MEASUREMENT NOISE
 * Notes on measurement overhead console.time vs. performance.mark cn be found here:
 * https://gist.github.com/paulirish/2fad3834e2617fb199bc12e17058dde4
 */

export const PREFIX = 'RXA-MEASURE';
const POSTFIX_START = 'START';
const POSTFIX_END = 'END';
let i = 0;

const rxaDebug = {
  getEntries,
  measure,
};

(window as any).rxaDebug = rxaDebug;

/**
 * Used performance.mark to generate a TimingMark
 * @param label
 */
export function mark(label: string = ++i + ''): void {
  performance.mark(`${PREFIX}-${label}`);
}

/**
 * Used performance.mark to generate a postfixes TimingMark for a starting mark
 * @param label
 * @return A function that marks the end of the respective measurement
 */
export function start(label: string = ++i + ''): () => () => void {
  const startLabel = `${label}-${POSTFIX_START}`;
  const endLabel = `${label}-${POSTFIX_END}`;
  mark(startLabel);
  return () => {
    end(label);
    return () => {
      measure(startLabel, endLabel);
    };
  };
}

/**
 * Used performance.mark to generate a postfixes TimingMark for a ending mark
 * @param label
 * @return A function that measures the start to end timing
 */
export function end(label: string = ++i + ''): void {
  mark(`${label}-${POSTFIX_END}`);
}

/**
 * Used performance.measure to generate a measurement for 2 TimingMarks
 */
export function measure(
  startLabel: string,
  endLabel: string,
  measureName?: string
): void {
  measureName = measureName
    ? measureName
    : `${PREFIX}-${startLabel}--${endLabel}`;
  performance.measure(
    measureName,
    `${PREFIX}-${startLabel}`,
    `${PREFIX}-${endLabel}`
  );
  const { name, duration } = performance.getEntriesByName(measureName)[0];
  console.log(`${name}: ${duration}`);
}

export function getEntries(): {}[] {
  return performance.getEntries().filter((e) => e.name.indexOf(PREFIX) === 0);
}

/**
 * Measures the observable lifecycle based on the generated marks
 *
 * @example
 *
 * @param label
 */
const observableMarkerFactory = (label: string) => {
  const observableMarks = {
    subscribe: () => label + '$subscribe',
    next: (n) => label + '$next_' + n + '',
    error: (e) => label + '$error_' + e + '',
    complete: () => label + '$complete',
    unsubscribe: () => label + '$unsubscribe',
    teardown: () => label + '$teardown',
  };

  const observableMeasures = {
    total: [
      label + 'total',
      observableMarks.subscribe(),
      observableMarks.teardown(),
    ],
  };

  return {
    subscribe: () => {
      mark(observableMarks.subscribe());
    },
    next: (v: any) => {
      mark(observableMarks.next(v));
    },
    error: (e: Error) => {
      mark(observableMarks.error(e));
    },
    complete: () => {
      mark(observableMarks.complete());
    },
    unsubscribe: () => {
      mark(observableMarks.unsubscribe());
    },
    teardown: () => {
      mark(observableMarks.teardown());
    },
    eval: () => {
      // @ts-ignore
      measure(...observableMeasures.total);
    },
  };
};

/**
 * Marks the observable lifecycle with TimingMarks
 *
 * @param label
 */
export function measure$(label: string = ++i + '') {
  const marker = observableMarkerFactory(label);
  return (o$) =>
    new Observable((subscriber) => {
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
      };
    });
}

export function promiseMarkerFactory(label: string) {
  const promiseMarks = {
    start: () => label + '-Pstart',
    then: (r) => label + '-Pthen',
    catch: (e) => label + '-Pcatch',
    finally: () => label + '-Pfinally',
  };
  const promiseMeasures = {
    total: [promiseMarks.start(), promiseMarks.finally(), label + 'total'],
  };

  function _then(r) {
    mark(promiseMarks.then(r));
  }

  function _start() {
    mark(promiseMarks.start());
  }

  function _catch(e: Error) {
    mark(promiseMarks.catch(e));
  }

  function _finally() {
    mark(promiseMarks.finally());
  }

  function _eval() {
    // @ts-ignore
    measure(...promiseMeasures.total);
  }

  return {
    wrap: (p: Promise<any>): Promise<any> => {
      _start();
      return p
        .then((r) => {
          _then(r);
          return Promise.resolve(r);
        })
        .catch((e) => {
          _catch(e);
          return Promise.reject(e);
        })
        .finally(() => {
          _finally();
          _eval();
        });
    },
  };
}
