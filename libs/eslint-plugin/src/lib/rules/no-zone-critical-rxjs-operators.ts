import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';
import { namesToRegex } from '../utils/regex';

const MESSAGE_ID = 'no-rxjs-operators';
export type MessageIds = typeof MESSAGE_ID;

const operators = [
  'auditTime',
  'bufferTime',
  'debounceTime',
  'delay',
  'sampleTime',
  'throttleTime',
  'timeout',
  'timeoutWith',
  'windowTime',
];

const operatorsRegex = namesToRegex(operators);

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description: 'Detects Zone critical RxJS operators.',
    },
    type: 'problem',
    messages: {
      [MESSAGE_ID]:
        '{{ name }} uses an RxJS scheduler under the hood that relies on Zone patched API',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    [`Program:has(ImportDeclaration[source.value='rxjs/operators'] > ImportSpecifier[imported.name=${operatorsRegex}]) CallExpression[callee.name=${operatorsRegex}]`]:
      (node: TSESTree.CallExpression) => {
        if (node.callee.type === AST_NODE_TYPES.Identifier) {
          context.report({
            node,
            messageId: MESSAGE_ID,
            data: {
              name: node.callee.name,
            },
          });
        }
      },
  }),
});
