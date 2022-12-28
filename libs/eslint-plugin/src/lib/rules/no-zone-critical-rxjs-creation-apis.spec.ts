import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './no-zone-critical-rxjs-creation-apis';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = [
  `
import { from } from 'rxjs';

const arraySource = from([1, 2, 3, 4, 5]);
const subscribe = arraySource.subscribe(val => console.log(val));
`,
  `
import { interval } from 'rxjs-zone-less';

const source = interval(1000);
const subscribe = source.subscribe(val => console.log(val));
`,
];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: `
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const source = fromEvent(document, 'click');
const example = source.pipe(map(event => 'Event time: ' + event.timeStamp));
const subscribe = example.subscribe(val => console.log(val));
`,
    errors: [
      {
        messageId: 'no-rxjs-creators',
        data: { name: 'fromEvent' },
      },
    ],
  },
  {
    code: `
import { interval } from 'rxjs';

const source = interval(1000);
const subscribe = source.subscribe(val => console.log(val));
`,
    errors: [
      {
        messageId: 'no-rxjs-creators',
        data: { name: 'interval' },
      },
    ],
  },
  {
    code: `
import { timer } from 'rxjs';

const source = timer(1000, 2000);
const subscribe = source.subscribe(val => console.log(val));
`,
    errors: [
      {
        messageId: 'no-rxjs-creators',
        data: { name: 'timer' },
      },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
