import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './no-zone-critical-rxjs-operators';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = [
  `
import { interval, fromEvent, merge, empty } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, mapTo } from 'rxjs/operators';

const COUNTDOWN_SECONDS = 10;

const remainingLabel = document.getElementById('remaining');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');

const interval$ = interval(1000).pipe(mapTo(-1));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
const resume$ = fromEvent(resumeButton, 'click').pipe(mapTo(true));

const timer$ = merge(pause$, resume$)
  .pipe(
    startWith(true),
    switchMap(val => (val ? interval$ : empty())),
    scan((acc, curr) => (curr ? curr + acc : acc), COUNTDOWN_SECONDS),
    takeWhile(v => v >= 0)
  )
  .subscribe((val) => (remainingLabel.innerHTML = val));
`,
  `
import { fromEvent, of } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { delay } from './rxjs-zoneless-operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$
  .pipe(mergeMap(event => of(event).pipe(delay(700), takeUntil(mouseup$))))
  .subscribe(event => console.log('Long Press!', event));
`,
];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: `
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const searchBox = document.getElementById('search');

const keyup$ = fromEvent(searchBox, 'keyup');

keyup$
  .pipe(
    map((i) => i.currentTarget.value),
    debounceTime(500)
  )
  .subscribe(console.log);
`,
    errors: [
      {
        messageId: 'no-rxjs-operators',
        data: { name: 'debounceTime' },
      },
    ],
  },
  {
    code: `
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$
  .pipe(mergeMap(event => of(event).pipe(delay(700), takeUntil(mouseup$))))
  .subscribe(event => console.log('Long Press!', event));
`,
    errors: [
      {
        messageId: 'no-rxjs-operators',
        data: { name: 'delay' },
      },
    ],
  },
  {
    code: `
import { interval } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

const source = interval(1000);
const example = source.pipe(throttleTime(5000));
const subscription = example.subscribe(val => console.log(val));
`,
    errors: [
      {
        messageId: 'no-rxjs-operators',
        data: { name: 'throttleTime' },
      },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
