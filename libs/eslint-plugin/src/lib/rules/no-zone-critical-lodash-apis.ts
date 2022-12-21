import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';
import { namesToRegex } from '../utils/regex';

const MESSAGE_ID = 'no-lodash-apis';
export type MessageIds = typeof MESSAGE_ID;

const apis = {
  requestAnimationFrame: ['throttle', 'debounce'],
  setTimeout: ['delay', 'defer', 'now'],
};
const apisRegex = namesToRegex([
  ...apis.requestAnimationFrame,
  ...apis.setTimeout,
]);

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description: 'Detects Zone related Lodash APIs.',
    },
    type: 'problem',
    messages: {
      [MESSAGE_ID]:
        '{{ lodashApiName }} relies on {{ browserApiName }}, which is patched by Zone.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    [`Program:has(ImportDeclaration[source.value='lodash-es'] > ImportSpecifier[imported.name=${apisRegex}]) CallExpression[callee.name=${apisRegex}]`]:
      (node: TSESTree.CallExpression) => {
        if (node.callee.type === AST_NODE_TYPES.Identifier) {
          const lodashApiName = node.callee.name;
          const browserApiName = Object.entries(apis).find(([, lodashApis]) =>
            lodashApis.includes(lodashApiName)
          )?.[0];
          context.report({
            node,
            messageId: MESSAGE_ID,
            data: {
              lodashApiName,
              browserApiName,
            },
          });
        }
      },
  }),
});
