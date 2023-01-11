import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './prefer-no-lodash-is-equal';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = [
  `
if (
  prevObj.prop === currObj.prop &&
  prevObj.arr.length === currObj.arr.length &&
  prevObj.arr.every(
    (prevItem, i) =>
      prevItem.x === currObj.arr[i].x && prevItem.y === currObj.arr[i].y
  )
) {
  // ...
}
`,
  `
if (isEqual(prevObj, currObj)) {
  // ...
}

function isEqual<T>(a: T, b: T): boolean {
  return a === b;
}
`,
  `
import { isEqual } from './utils';

if (isEqual(prevObj, currObj)) {
  // ...
}
`,
];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: `
import { isEqual } from 'lodash-es';

if (isEqual(prevObj, currObj)) {
  // ...
}
`,
    errors: [
      {
        messageId: 'no-lodash-is-equal',
      },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
