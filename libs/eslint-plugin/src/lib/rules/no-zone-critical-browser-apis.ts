import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';
import { namesToRegex } from '../utils/regex';

const MESSAGE_ID = 'no-zone-critical-browser-apis';
export type MessageIds = typeof MESSAGE_ID;

const apis = [
  'setTimeout',
  'clearTimeout',
  'setImmediate',
  'clearImmediate',
  'setInterval',
  'clearInterval',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'mozRequestAnimationFrame',
  'mozCancelAnimationFrame',
  'webkitRequestAnimationFrame',
  'webkitRequestAnimationFrame',
];
const operatorsRegex = namesToRegex(apis);

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description:
        'Detects all scheduling APIs (setTimeout, setInterval, requestAnimationFrame).',
    },
    type: 'problem',
    messages: {
      [MESSAGE_ID]:
        'Use with caution - {{ name }} will trigger change detection in the whole app.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    [`Program:not(:has(ImportSpecifier[imported.name=${operatorsRegex}])) CallExpression[callee.name=${operatorsRegex}], CallExpression[callee.object.name=window][callee.property.name=${operatorsRegex}]`]:
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
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.property.type === AST_NODE_TYPES.Identifier
        ) {
          context.report({
            node,
            messageId: MESSAGE_ID,
            data: {
              name: node.callee.property.name,
            },
          });
        }
      },
  }),
});
