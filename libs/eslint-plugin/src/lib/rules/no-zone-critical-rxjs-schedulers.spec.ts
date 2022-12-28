import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './no-zone-critical-rxjs-schedulers';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = [
  `
import { Observable } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { myCustomScheduler } from './custom-schedulers';

function applyCustomScheduler<T>(source: Observable<T>): Observable<T> {
  return source.pipe(observeOn(myCustomScheduler));
}
`,
  `
import { Observable } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs-zone-less';

function applyZonelessScheduler<T>(source: Observable<T>): Observable<T> {
  return source.pipe(observeOn(asyncScheduler));
}
`,
];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: `
import { interval, animationFrameScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

const someDiv = document.querySelector('#someDiv');
interval(10)
  .pipe(observeOn(animationFrameScheduler))
  .subscribe((val) => {
    someDiv.style.height = val + 'px';
  });
`,
    errors: [
      {
        messageId: 'no-rxjs-schedulers',
        data: { name: 'animationFrameScheduler' },
      },
    ],
  },
  {
    code: `
import { interval, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

interval(10)
  .pipe(observeOn(asyncScheduler))
  .subscribe(console.log);
`,
    errors: [
      {
        messageId: 'no-rxjs-schedulers',
        data: { name: 'asyncScheduler' },
      },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
