import { TSESLint } from '@typescript-eslint/utils';
import * as path from 'path';
import rule, { MessageIds } from './prefer-no-lodash-clone-deep';

const ruleTester = new TSESLint.RuleTester({
  parser: path.resolve('./node_modules/@typescript-eslint/parser'),
});

const valid: TSESLint.RunTests<MessageIds, never[]>['valid'] = [
  `const clone = structuredClone(original);`,
  `
type T = {
  prop: string;
  arr: { x: number, y: number }[];
}

const shallowClone: T = { ...orig };
const deepClone: T = { ...orig, arr: orig.arr.map(item => ({ ...item })) };
`,
  `
const clone = cloneDeep(orig);

function cloneDeep<T>(obj: T): T {
  return { ...obj };
}
`,
  `
import { cloneDeep } from './utils';

const clone = cloneDeep(orig);
`,
];

const invalid: TSESLint.RunTests<MessageIds, never[]>['invalid'] = [
  {
    code: `
import { cloneDeep, isEqual } from 'lodash-es';

const obj = isEqual(prevObj, currObj) ? prevObj : cloneDeep(currObj);
`,
    errors: [
      {
        messageId: 'no-lodash-clone-deep',
      },
    ],
  },
];

ruleTester.run(path.parse(__filename).name, rule, {
  valid,
  invalid,
});
