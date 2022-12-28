import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';
import { isKeyof } from '../utils/guards';
import { namesToRegex } from '../utils/regex';

export enum MessageIds {
  NoRunInsideZone = 'no-run-inside-zone',
  NoRunOutsideZone = 'no-run-outside-zone',
}

const apis = {
  run: MessageIds.NoRunInsideZone,
  runOutsideAngular: MessageIds.NoRunOutsideZone,
  runTask: MessageIds.NoRunInsideZone,
  runGuarded: MessageIds.NoRunInsideZone,
};
const apisRegex = namesToRegex(Object.keys(apis));

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description: 'Detects zone.run APIs.',
    },
    type: 'problem',
    messages: {
      [MessageIds.NoRunInsideZone]:
        'Use with caution - zone.{{ name }} will invoke Zone and cause change detection cycle.',
      [MessageIds.NoRunOutsideZone]:
        'Use with caution - {{ name }} will not bring benefits if you use Zone patched APIs inside.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    [`Program:has(ImportSpecifier[imported.name='NgZone']) CallExpression[callee.property.name=${apisRegex}]`]:
      (node: TSESTree.CallExpression) => {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.property.type === AST_NODE_TYPES.Identifier &&
          isKeyof(node.callee.property.name, apis)
        ) {
          context.report({
            node,
            messageId: apis[node.callee.property.name],
            data: {
              name: node.callee.property.name,
            },
          });
        }
      },
  }),
});
