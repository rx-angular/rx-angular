import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';
import { namesToRegex } from '../utils/regex';

const MESSAGE_ID = 'no-rxjs-schedulers';
export type MessageIds = typeof MESSAGE_ID;

const schedulers = [
  'queueScheduler',
  'asapScheduler',
  'asyncScheduler',
  'animationFrameScheduler',
];

const schedulersRegex = namesToRegex(schedulers);

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
    [`Program:has(ImportDeclaration[source.value='rxjs'] > ImportSpecifier[imported.name=${schedulersRegex}]) *:not(ImportSpecifier) > Identifier[name=${schedulersRegex}]`]:
      (node: TSESTree.Identifier) => {
        context.report({
          node,
          messageId: MESSAGE_ID,
          data: {
            name: node.name,
          },
        });
      },
  }),
});
