import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import { docsUrl } from '../utils/docs';
import path = require('path');

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
        'Use with caution - cloneDeep is a costly operation that may cause performance problems.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({}),
});
