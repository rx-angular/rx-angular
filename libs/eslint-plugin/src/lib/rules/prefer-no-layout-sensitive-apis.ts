import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';
import * as path from 'path';
import { docsUrl } from '../utils/docs';
import { namesToRegex } from '../utils/regex';

const MESSAGE_ID = 'no-layout-sensitive-apis';

export type MessageIds = typeof MESSAGE_ID;

const apis = [
  'clientHeight',
  'clientLeft',
  'clientTop',
  'clientWidth',
  'computeCTM',
  'computedName',
  'computedRole',
  'elementFromPoint',
  'focus',
  'getBBox',
  'getBoundingClientRect',
  'getCharNumAtPosition',
  'getClientRects',
  'getComputedStyle',
  'getComputedTextLength',
  'getEndPositionOfChar',
  'getExtentOfChar',
  'getNumberOfChars',
  'getRotationOfChar',
  'getStartPositionOfChar',
  'getSubStringLength',
  'innerHeight',
  'innerText',
  'innerWidth',
  'instanceRoot',
  'layerX',
  'layerY',
  'offsetHeight',
  'offsetLeft',
  'offsetParent',
  'offsetTop',
  'offsetWidth',
  'offsetX',
  'offsetY',
  'scrollBy',
  'scrollHeight',
  'scrollingElement',
  'scrollIntoView',
  'scrollIntoViewIfNeeded',
  'scrollLeft',
  'scrollTo',
  'scrollTop',
  'scrollWidth',
  'scrollX',
  'scrollY',
  'selectSubString',
  'visualViewport',
];

const apisRegex = namesToRegex(apis);

export default ESLintUtils.RuleCreator(docsUrl)({
  name: path.parse(__filename).name,
  meta: {
    docs: {
      recommended: 'error',
      description:
        'Detects all layout sensitive apis that may cause style recalculation.',
    },
    type: 'problem',
    messages: {
      [MESSAGE_ID]:
        'Use with caution - {{ name }} may trigger style recalculation.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => ({
    [`MemberExpression[property.name=${apisRegex}], Property[key.name=${apisRegex}]`]:
      (node: TSESTree.MemberExpression | TSESTree.Property) => {
        if (
          node.type === AST_NODE_TYPES.MemberExpression &&
          node.property.type === AST_NODE_TYPES.Identifier
        ) {
          context.report({
            node,
            messageId: MESSAGE_ID,
            data: {
              name: node.property.name,
            },
          });
        } else if (
          node.type === AST_NODE_TYPES.Property &&
          node.key.type === AST_NODE_TYPES.Identifier
        ) {
          context.report({
            node,
            messageId: MESSAGE_ID,
            data: {
              name: node.key.name,
            },
          });
        }
      },
  }),
});
