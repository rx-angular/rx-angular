import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import { docsUrl } from '../utils/docs';
import path = require('path');

const MESSAGE_ID = 'no-lodash-apis';
export type MessageIds = typeof MESSAGE_ID;

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
  create: (context) => ({}),
});
