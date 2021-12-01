import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import { docsUrl } from '../utils/docs';
import path = require('path');

const MESSAGE_ID = 'no-rxjs-creators';

export type MessageIds = typeof MESSAGE_ID;

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description: 'Detects zone critical rxjs creation APIs.',
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
    // TODO
  }),
});
