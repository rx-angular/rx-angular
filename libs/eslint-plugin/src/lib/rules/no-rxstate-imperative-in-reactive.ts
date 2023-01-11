import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';
import { rxstateMethodCallExpression } from '../utils/selectors';

const MESSAGE_ID = 'no-rxstate-imperative-in-reactive';
export type MessageIds = typeof MESSAGE_ID;

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description:
        'Warns against mixing imperative RxState methods in reactive methods.',
    },
    type: 'problem',
    messages: {
      [MESSAGE_ID]:
        'Avoid using imperative RxState method inside reactive method.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    [`${rxstateMethodCallExpression([
      'connect',
      'hold',
    ])} ${rxstateMethodCallExpression(['get', 'set'])}`]: (
      node: TSESTree.CallExpression
    ) => {
      context.report({
        node,
        messageId: MESSAGE_ID,
      });
    },
  }),
});
