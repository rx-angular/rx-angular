import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './no-zone-critical-lodash-apis';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = [
  `
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$
  .pipe(mergeMap(event => of(event).pipe(delay(700), takeUntil(mouseup$))))
  .subscribe(event => console.log('Long Press!', event));
`,
  'let timestamp = Date.now();',
];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: `
import { debounce, delay } from 'lodash-es';

const debouncedHandleHover = debounce(
  handleHover,
  500
);

for (let i = 1; i <= 5; i++) {
  delay(console.log, 2000 * (i + 1), i);
}
`,
    errors: [
      {
        messageId: 'no-lodash-apis',
        data: {
          lodashApiName: 'debounce',
          browserApiName: 'requestAnimationFrame',
        },
      },
      {
        messageId: 'no-lodash-apis',
        data: {
          lodashApiName: 'delay',
          browserApiName: 'setTimeout',
        },
      },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
