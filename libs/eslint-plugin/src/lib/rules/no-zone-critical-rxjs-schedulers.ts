import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import { docsUrl } from '../utils/docs';
import path = require('path');

const MESSAGE_ID = 'no-rxjs-schedulers';

export type MessageIds = typeof MESSAGE_ID;

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description: 'Detects all RxJS schedulers.',
    },
    type: 'problem',
    messages: {
      [MESSAGE_ID]: '{{ name }} relies on Zone patched API.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    // TODO...
  }),
});
