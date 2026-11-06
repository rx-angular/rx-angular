// @ts-check

/**
 * Redirects from old docs addresses to their current pages.
 *
 * Published packages, READMEs and other sites link to these addresses, so keep
 * every entry. When a page moves, add its old address here and point any entry
 * that targeted it at the new page.
 */

/** @typedef {{ from: string, to: string }} Redirect */

/**
 * Maps a `/docs` address and the same address without `/docs` to one target.
 * Some old addresses circulated in both forms.
 *
 * @param {string} from An address that starts with `/docs/`.
 * @param {string} to
 * @returns {Redirect[]}
 */
function withBare(from, to) {
  return [
    { from, to },
    { from: from.replace(/^\/docs/, ''), to },
  ];
}

const ESLINT_RULES = [
  'no-explicit-change-detection-apis',
  'no-rxstate-imperative-in-reactive',
  'no-rxstate-subscriptions-outside-constructor',
  'no-zone-critical-browser-apis',
  'no-zone-critical-lodash-apis',
  'no-zone-critical-rxjs-creation-apis',
  'no-zone-critical-rxjs-operators',
  'no-zone-critical-rxjs-schedulers',
  'no-zone-run-apis',
  'prefer-no-layout-sensitive-apis',
  'prefer-no-lodash-clone-deep',
  'prefer-no-lodash-is-equal',
];

const CONCEPTS = [
  'change-detection',
  'zoneless-and-zonejs-change-detection',
  'reactive-state-global-vs-local',
  'reactive-context',
  'concurrent-scheduling',
  'rxstate-discipline-and-effects',
  'immutability-and-serializable-state',
  'how-isr-works',
  'reactive-templating',
  'how-virtual-scrolling-works',
];

/** @type {Redirect[]} */
const redirects = [
  // Site pages
  { from: '/docs/start-here', to: '/docs' },
  { from: '/docs/contributing', to: '/contributing' },
  { from: '/docs/tags/content', to: '/docs/tags' },
  { from: '/docs/tags/structure', to: '/docs/tags' },

  // Concepts and tutorials used to carry a code in their address.
  ...CONCEPTS.map((name, i) => ({
    from: `/docs/concepts/E${i + 1}-${name}`,
    to: `/docs/concepts/${name}`,
  })),
  {
    from: '/docs/tutorials/T1-your-first-rxstate',
    to: '/docs/tutorials/your-first-rxstate',
  },
  {
    from: '/docs/tutorials/T2-render-a-large-live-list',
    to: '/docs/tutorials/render-a-large-live-list',
  },
  {
    from: '/docs/tutorials/T4-loading-error-empty-states',
    to: '/docs/tutorials/loading-error-empty-states',
  },
  {
    from: '/docs/tutorials/migrate-to-signals-rxstate-optional',
    to: '/docs/packages/state/how-to/migrate-to-signals',
  },

  // isr
  { from: '/docs/packages/isr/isr-introduction', to: '/docs/packages/isr' },
  {
    from: '/docs/packages/isr/reference/isr-api',
    to: '/docs/packages/isr/reference/api',
  },
  {
    from: '/docs/packages/isr/reference/isr-render-config',
    to: '/docs/packages/isr/reference/isr-handler-config',
  },
  {
    from: '/docs/isr/cache-handlers',
    to: '/docs/packages/isr/how-to/write-a-custom-cache-handler',
  },
  {
    from: '/docs/isr/cache-variants',
    to: '/docs/packages/isr/how-to/serve-cache-variants',
  },
  {
    from: '/docs/isr/error-handling',
    to: '/docs/packages/isr/how-to/handle-render-errors',
  },
  {
    from: '/docs/isr/cache-hooks',
    to: '/docs/packages/isr/how-to/transform-cached-html',
  },
  {
    from: '/docs/isr/on-demand-revalidation',
    to: '/docs/packages/isr/how-to/invalidate-on-demand',
  },
  { from: '/docs/isr/extra', to: '/docs/packages/isr/how-to/pass-extra-data' },
  ...withBare('/docs/isr/isr', '/docs/packages/isr'),
  ...withBare('/docs/isr', '/docs/packages/isr'),
  ...withBare('/docs/isr/introduction', '/docs/packages/isr'),
  ...withBare('/docs/isr/benefits', '/docs/packages/isr'),
  ...withBare(
    '/docs/isr/getting-started',
    '/docs/packages/isr/how-to/set-up-isr',
  ),
  ...withBare('/docs/isr/how-it-works', '/docs/concepts/how-isr-works'),
  ...withBare('/docs/isr/api', '/docs/packages/isr/reference/api'),
  ...withBare(
    '/docs/isr/irs-configuration',
    '/docs/packages/isr/reference/isr-handler-config',
  ),

  // state
  {
    from: '/docs/packages/state/reference/partial-updates',
    to: '/docs/packages/state/reference/rx-state',
  },
  {
    from: '/docs/packages/state/reference/rx-actions-api',
    to: '/docs/packages/state/reference/rx-actions',
  },
  {
    from: '/docs/packages/state/reference/rx-effects-api',
    to: '/docs/packages/state/reference/rx-effects',
  },
  {
    from: '/docs/packages/state/reference/selections-api',
    to: '/docs/packages/state/reference/selections',
  },
  {
    from: '/docs/packages/state/reference/rx-state-functional',
    to: '/docs/packages/state/reference/rx-state',
  },
  {
    from: '/docs/packages/state/how-to/pass-observables-directly',
    to: '/docs/packages/state/legacy/pass-observables-directly',
  },
  ...withBare(
    '/docs/state/recipes/use-rxstate-as-global-state',
    '/docs/concepts/reactive-state-global-vs-local',
  ),
  ...withBare('/docs/state/api', '/docs/packages/state/reference'),
  ...withBare(
    '/docs/state/api/functional-rx-state',
    '/docs/packages/state/reference/rx-state',
  ),
  ...withBare(
    '/docs/state/api/rx-state',
    '/docs/packages/state/reference/rx-state-class',
  ),
  ...withBare(
    '/docs/state/api/interfaces/compare-fn',
    '/docs/packages/state/reference/compare-fn',
  ),
  ...withBare(
    '/docs/state/api/interfaces/key-compare-map',
    '/docs/packages/state/reference/key-compare-map',
  ),
  ...withBare('/docs/state/api/interfaces', '/docs/packages/state/reference'),
  ...withBare(
    '/docs/state/api/rxjs-operators/stateful',
    '/docs/packages/state/reference/stateful',
  ),
  ...withBare(
    '/docs/state/api/rxjs-operators/select',
    '/docs/packages/state/reference/select',
  ),
  ...withBare(
    '/docs/state/api/rxjs-operators/select-slice',
    '/docs/packages/state/reference/select-slice',
  ),
  ...withBare(
    '/docs/state/api/rxjs-operators/distinct-until-some-changed',
    '/docs/packages/state/reference/distinct-until-some-changed',
  ),
  ...withBare(
    '/docs/state/api/rxjs-operators',
    '/docs/packages/state/reference',
  ),
  ...withBare(
    '/docs/state/recipes/run-partial-updates',
    '/docs/packages/state/reference/rx-state',
  ),
  ...withBare(
    '/docs/state/selections/selections',
    '/docs/packages/state/reference/selections',
  ),
  ...withBare(
    '/docs/state/selections',
    '/docs/packages/state/reference/selections',
  ),
  ...withBare(
    '/docs/state/getting-started',
    '/docs/packages/state/how-to/getting-started',
  ),
  ...withBare(
    '/docs/state/actions',
    '/docs/packages/state/how-to/manage-actions',
  ),
  ...withBare(
    '/docs/state/effects/effects',
    '/docs/packages/state/how-to/manage-effects',
  ),
  ...withBare(
    '/docs/state/effects',
    '/docs/packages/state/how-to/manage-effects',
  ),
  ...withBare(
    '/docs/state/testing/testing',
    '/docs/packages/state/how-to/testing',
  ),
  ...withBare('/docs/state/testing', '/docs/packages/state/how-to/testing'),
  ...withBare(
    '/docs/state/concepts-and-best-practices/concepts-and-best-practices',
    '/docs/packages/state/how-to/best-practices',
  ),
  ...withBare(
    '/docs/state/concepts-and-best-practices',
    '/docs/packages/state/how-to/best-practices',
  ),
  ...withBare(
    '/docs/state/recipes/manage-viewmodel',
    '/docs/packages/state/how-to/derive-a-view-model',
  ),
  ...withBare(
    '/docs/state/recipes/refactor-to-rx-effects',
    '/docs/packages/state/how-to/refactor-to-rx-effects',
  ),
  ...withBare(
    '/docs/state/tutorials/passing-observables-directly',
    '/docs/packages/state/legacy/pass-observables-directly',
  ),
  ...withBare(
    '/docs/state/integrations/manage-entities-using-ngrx-entity',
    '/docs/packages/state/how-to/manage-entities',
  ),
  ...withBare(
    '/docs/state/integrations/resuse-ngrx-selectors-to-compose-state',
    '/docs/packages/state/how-to/derive-a-view-model',
  ),
  ...withBare('/docs/state/state', '/docs/packages/state'),
  ...withBare('/docs/state', '/docs/packages/state'),
  ...withBare(
    '/docs/state/recipes/determine-state-type',
    '/docs/concepts/reactive-state-global-vs-local',
  ),
  {
    from: '/docs/state/setup',
    to: '/docs/packages/state/how-to/getting-started',
  },
  {
    from: '/docs/state/tutorials/basic-tutorial/setup',
    to: '/docs/tutorials/your-first-rxstate',
  },
  ...withBare(
    '/docs/state/tutorials/migrating-to-rxstate',
    '/docs/packages/state/how-to/migrate-to-signals',
  ),
  ...withBare(
    '/docs/state/concepts-and-best-practices/deriving-simple-state',
    '/docs/packages/state/reference/stateful',
  ),
  ...withBare(
    '/docs/state/recipes/work-with-hostbindings',
    '/docs/packages/state/how-to/derive-a-view-model',
  ),
  ...withBare(
    '/docs/state/tutorials/increment-a-value',
    '/docs/tutorials/your-first-rxstate',
  ),
  ...withBare(
    '/docs/state/recipes/load-data-on-route-change',
    '/docs/tutorials/your-first-rxstate',
  ),

  // template
  ...withBare(
    '/docs/template/rx-for-directive',
    '/docs/packages/template/reference/rx-for',
  ),
  ...withBare(
    '/docs/template/rx-if-directive',
    '/docs/packages/template/reference/rx-if',
  ),
  ...withBare(
    '/docs/template/rx-let-directive',
    '/docs/packages/template/reference/rx-let',
  ),
  ...withBare(
    '/docs/template/virtual-scrolling',
    '/docs/packages/template/reference/rx-virtual-for',
  ),
  ...withBare(
    '/docs/template/virtual-view-directive',
    '/docs/packages/template/reference/rx-virtual-view',
  ),
  ...withBare(
    '/docs/template/push-pipe',
    '/docs/packages/template/legacy/push-pipe',
  ),
  ...withBare(
    '/docs/template/unpatch-directive',
    '/docs/packages/template/legacy/unpatch',
  ),
  ...withBare(
    '/docs/template/performance-issues/handling-view-and-content-queries',
    '/docs/packages/template/legacy/view-and-content-queries',
  ),
  ...withBare(
    '/docs/template/performance-issues/ngzone-optimizations',
    '/docs/packages/template/legacy/ngzone-optimizations',
  ),
  ...withBare(
    '/docs/template/concepts/local-templates',
    '/docs/concepts/reactive-templating',
  ),
  ...withBare(
    '/docs/template/concepts/local-variables',
    '/docs/concepts/reactive-templating',
  ),
  ...withBare('/docs/template/concepts', '/docs/concepts'),
  ...withBare(
    '/docs/template/performance-issues/rendering-issues-in-angular',
    '/docs/concepts/change-detection',
  ),
  ...withBare(
    '/docs/template/performance-issues/change-detection-over-pipes',
    '/docs/concepts/change-detection',
  ),
  ...withBare(
    '/docs/template/performance-issues',
    '/docs/concepts/change-detection',
  ),
  ...withBare(
    '/docs/template/concepts/reactive-context',
    '/docs/concepts/reactive-context',
  ),
  ...withBare('/docs/template/template', '/docs/packages/template'),
  ...withBare('/docs/template', '/docs/packages/template'),
  {
    from: '/docs/template/let-directive',
    to: '/docs/packages/template/reference/rx-let',
  },
  {
    from: '/docs/template/cdk/render-strategies/strategies/concurrent-strategies',
    to: '/docs/packages/cdk/reference/concurrent-strategies',
  },
  { from: '/docs/template/api', to: '/docs/packages/template/reference' },
  {
    from: '/docs/template/viewport-prio-directive',
    to: '/docs/packages/template',
  },

  // cdk
  {
    from: '/docs/packages/cdk/reference/transformations/transformations-edge-cases',
    to: '/docs/packages/cdk/reference/transformations',
  },
  ...withBare(
    '/docs/cdk/render-strategies/strategies/basic-strategies',
    '/docs/concepts/change-detection',
  ),
  {
    from: '/docs/cdk/api/transformation-helpers',
    to: '/docs/packages/cdk/reference/transformations',
  },
  ...withBare(
    '/docs/cdk/transformations/transformations',
    '/docs/packages/cdk/reference/transformations',
  ),
  ...withBare(
    '/docs/cdk/transformations',
    '/docs/packages/cdk/reference/transformations',
  ),
  ...withBare(
    '/docs/cdk/transformations/edge-cases-overview',
    '/docs/packages/cdk/reference/transformations',
  ),
  ...withBare(
    '/docs/cdk/transformations/array/insert',
    '/docs/packages/cdk/reference/transformations/array/insert',
  ),
  ...withBare(
    '/docs/cdk/transformations/array/extract',
    '/docs/packages/cdk/reference/transformations/array/extract',
  ),
  ...withBare(
    '/docs/cdk/transformations/array/remove',
    '/docs/packages/cdk/reference/transformations/array/remove',
  ),
  ...withBare(
    '/docs/cdk/transformations/array/to-dictionary',
    '/docs/packages/cdk/reference/transformations/array/to-dictionary',
  ),
  ...withBare(
    '/docs/cdk/transformations/array/update',
    '/docs/packages/cdk/reference/transformations/array/update',
  ),
  ...withBare(
    '/docs/cdk/transformations/object/delete-prop',
    '/docs/packages/cdk/reference/transformations/object/delete-prop',
  ),
  ...withBare(
    '/docs/cdk/transformations/object/set-prop',
    '/docs/packages/cdk/reference/transformations/object/set-prop',
  ),
  ...withBare(
    '/docs/cdk/transformations/object/slice',
    '/docs/packages/cdk/reference/transformations/object/slice',
  ),
  ...withBare(
    '/docs/cdk/transformations/object/patch',
    '/docs/packages/cdk/reference/transformations/object/patch',
  ),
  ...withBare(
    '/docs/cdk/transformations/object/toggle',
    '/docs/packages/cdk/reference/transformations/object/toggle',
  ),
  ...withBare(
    '/docs/cdk/transformations/object/dictionary-to-array',
    '/docs/packages/cdk/reference/transformations/object/dictionary-to-array',
  ),
  ...withBare(
    '/docs/cdk/coercing/coercing',
    '/docs/packages/cdk/reference/coercing',
  ),
  ...withBare('/docs/cdk/coercing', '/docs/packages/cdk/reference/coercing'),
  ...withBare(
    '/docs/cdk/notifications/notifications',
    '/docs/packages/cdk/reference/notifications',
  ),
  ...withBare(
    '/docs/cdk/notifications',
    '/docs/packages/cdk/reference/notifications',
  ),
  ...withBare(
    '/docs/cdk/render-strategies/strategies/concurrent-strategies',
    '/docs/packages/cdk/reference/concurrent-strategies',
  ),
  ...withBare(
    '/docs/cdk/hydration-tracker/hydration-tracker',
    '/docs/packages/cdk/reference/hydration-tracker',
  ),
  ...withBare(
    '/docs/cdk/hydration-tracker',
    '/docs/packages/cdk/reference/hydration-tracker',
  ),
  ...withBare(
    '/docs/cdk/render-strategies/rx-strategy-provider',
    '/docs/packages/cdk/reference/rx-strategy-provider',
  ),
  ...withBare(
    '/docs/cdk/render-strategies',
    '/docs/packages/cdk/legacy/render-strategies-overview',
  ),
  ...withBare(
    '/docs/cdk/render-strategies/strategies',
    '/docs/packages/cdk/legacy/custom-strategies',
  ),
  ...withBare(
    '/docs/cdk/zone-configurations/zone-configurations',
    '/docs/packages/cdk/legacy/zone-configurations',
  ),
  ...withBare(
    '/docs/cdk/zone-configurations',
    '/docs/packages/cdk/legacy/zone-configurations',
  ),
  ...withBare(
    '/docs/cdk/zone-configurations/how-to-setup-zone-flags',
    '/docs/packages/cdk/legacy/setup-zone-flags',
  ),
  ...withBare(
    '/docs/cdk/zone-configurations/how-to-debug-zone-flags',
    '/docs/packages/cdk/legacy/debug-zone-flags',
  ),
  ...withBare(
    '/docs/cdk/coalescing/coalescing',
    '/docs/packages/cdk/legacy/coalescing',
  ),
  ...withBare('/docs/cdk/coalescing', '/docs/packages/cdk/legacy/coalescing'),
  ...withBare(
    '/docs/cdk/zone-less',
    '/docs/concepts/zoneless-and-zonejs-change-detection',
  ),
  ...withBare('/docs/cdk/cdk', '/docs/packages/cdk'),
  ...withBare('/docs/cdk', '/docs/packages/cdk'),
  ...withBare(
    '/docs/cdk/template-management/template-management',
    '/docs/packages/cdk',
  ),
  ...withBare('/docs/cdk/template-management', '/docs/packages/cdk'),

  // eslint-plugin
  {
    from: '/docs/packages/eslint-plugin/reference/rules-overview',
    to: '/docs/packages/eslint-plugin/reference',
  },
  ...withBare(
    '/docs/eslint-plugin/eslint-plugin',
    '/docs/packages/eslint-plugin',
  ),
  ...withBare('/docs/eslint-plugin', '/docs/packages/eslint-plugin'),
  ...withBare(
    '/docs/eslint-plugin/rules',
    '/docs/packages/eslint-plugin/reference',
  ),
  ...ESLINT_RULES.flatMap((rule) => {
    const to = `/docs/packages/eslint-plugin/reference/${rule}`;
    return [
      ...withBare(`/docs/eslint-plugin/rules/${rule}`, to),
      // The published plugin links each rule with a `.md` suffix.
      { from: `/docs/eslint-plugin/rules/${rule}.md`, to },
    ];
  }),

  // rebundle
  {
    from: '/docs/packages/rebundle/rebundle-introduction',
    to: '/docs/packages/rebundle',
  },
  {
    from: '/docs/packages/rebundle/explanation/rebundle-architecture',
    to: '/docs/concepts/how-rebundle-works',
  },
  {
    from: '/docs/packages/rebundle/explanation/rebundle-research',
    to: '/docs/concepts/rebundle-research',
  },
];

module.exports = redirects;
