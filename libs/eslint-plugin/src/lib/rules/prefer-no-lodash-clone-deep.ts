import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';

const MESSAGE_ID = 'no-lodash-clone-deep';
export type MessageIds = typeof MESSAGE_ID;

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description: 'Detects all usages of cloneDeep from Lodash.',
    },
    type: 'problem',
    messages: {
      [MESSAGE_ID]:
        'Use with caution - cloneDeep is a costly operation that may cause performance problems. Have you considered using structuredClone?',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    "Program:has(ImportDeclaration[source.value='lodash-es'] > ImportSpecifier[imported.name=cloneDeep]) CallExpression[callee.name=cloneDeep]":
      (node: TSESTree.CallExpression) => {
        context.report({
          node,
          messageId: MESSAGE_ID,
        });
      },
  }),
});
