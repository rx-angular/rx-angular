import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';

const MESSAGE_ID = 'no-lodash-is-equal';
export type MessageIds = typeof MESSAGE_ID;

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description: 'Detects all usages of isEqual from Lodash.',
    },
    type: 'problem',
    messages: {
      [MESSAGE_ID]:
        'Use with caution - isEqual may be a costly operation. Maybe comparing specific properties will be enough.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    "Program:has(ImportDeclaration[source.value='lodash-es'] > ImportSpecifier[imported.name=isEqual]) CallExpression[callee.name=isEqual]":
      (node: TSESTree.CallExpression) => {
        context.report({
          node,
          messageId: MESSAGE_ID,
        });
      },
  }),
});
