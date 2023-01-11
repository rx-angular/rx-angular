import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';
import { namesToRegex } from '../utils/regex';

const MESSAGE_ID = 'no-rxjs-creators';
export type MessageIds = typeof MESSAGE_ID;

const apis = ['timer', 'interval', 'fromEvent'];
const apisRegex = namesToRegex(apis);

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description: 'Detects Zone critical rxjs creation APIs.',
    },
    type: 'problem',
    messages: {
      [MESSAGE_ID]:
        '{{ name }} uses RxJS scheduler under the hood that relies on Zone patched API.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    [`Program:has(ImportDeclaration[source.value='rxjs'] > ImportSpecifier[imported.name=${apisRegex}]) CallExpression[callee.name=${apisRegex}]`]:
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
