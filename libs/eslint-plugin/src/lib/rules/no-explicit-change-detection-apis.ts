import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';
import { docsUrl } from '../utils/docs';
import { isKeyof } from '../utils/guards';
import { namesToRegex } from '../utils/regex';

export const enum MessageIds {
  NoDetectChanges = 'no-detect-changes',
  NoMarkForCheck = 'no-mark-for-check',
}

const apis = {
  viewEngine: {
    detectChanges: MessageIds.NoDetectChanges,
    markForCheck: MessageIds.NoMarkForCheck,
  },
  ivy: {
    ɵmarkDirty: MessageIds.NoMarkForCheck,
    markDirty: MessageIds.NoMarkForCheck,
    ɵdetectChanges: MessageIds.NoDetectChanges,
    detectChanges: MessageIds.NoDetectChanges,
  },
};

const apisRegex: Record<keyof typeof apis, RegExp> = {
  viewEngine: namesToRegex(Object.keys(apis.viewEngine)),
  ivy: namesToRegex(Object.keys(apis.ivy)),
};

export default ESLintUtils.RuleCreator(docsUrl)({
  name: 'no-explicit-change-detection-apis',
  meta: {
    docs: {
      recommended: 'error',
      description: 'Disallow explicit calls of change detection APIs.',
    },
    type: 'problem',
    messages: {
      [MessageIds.NoDetectChanges]:
        'Use with caution - {{ name }} is synchronous and will trigger change detection in this component and all its children.',
      [MessageIds.NoMarkForCheck]:
        'Use with caution - {{ name }} will mark this component and all ancestors as dirty.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    [`CallExpression[callee.property.name=${apisRegex.viewEngine}], CallExpression[callee.name=${apisRegex.ivy}]`]:
      (node: TSESTree.CallExpression) => {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.property.type === AST_NODE_TYPES.Identifier &&
          isKeyof(node.callee.property.name, apis.viewEngine)
        ) {
          context.report({
            node,
            messageId: apis.viewEngine[node.callee.property.name],
            data: {
              name: node.callee.property.name,
            },
          });
        } else if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          isKeyof(node.callee.name, apis.ivy)
        ) {
          context.report({
            node,
            messageId: apis.ivy[node.callee.name],
            data: {
              name: node.callee.name,
            },
          });
        }
      },
  }),
});
