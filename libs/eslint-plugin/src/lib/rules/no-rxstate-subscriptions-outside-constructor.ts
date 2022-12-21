import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';
import { namesToRegex } from '../utils/regex';
import { rxstateMethodCallExpression } from '../utils/selectors';

const MESSAGE_ID = 'no-rxstate-subscriptions-outside-constructor';
export type MessageIds = typeof MESSAGE_ID;

export type Options = [
  {
    allowedMethods?: string[];
  }
];

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description:
        'Warns against using RxState subscription methods outside constructor.',
    },
    type: 'problem',
    messages: {
      [MESSAGE_ID]: 'Avoid using `state#{{ name }}` outside {{ allowed }}',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedMethods: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{}] as Options,
  create: (context) => {
    const methodNames = [
      'constructor',
      ...(context.options[0]?.allowedMethods ?? []),
    ];
    return {
      [`MethodDefinition[key.name!=${namesToRegex(
        methodNames
      )}] ${rxstateMethodCallExpression(['connect', 'hold'])}`]: (
        node: TSESTree.CallExpression
      ) => {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.property.type === AST_NODE_TYPES.Identifier
        ) {
          context.report({
            node,
            messageId: MESSAGE_ID,
            data: {
              name: node.callee.property.name,
              allowed: methodNames.join(', '),
            },
          });
        }
      },
    };
  },
});
