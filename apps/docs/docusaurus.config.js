// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const organizationName = 'rx-angular';
const projectName = 'rx-angular';
const title = 'RxAngular';
const description =
  'RxAngular offers a comprehensive toolset for handling fully reactive Angular applications with the main focus on runtime performance and template rendering.';
const url = 'https://rx-angular.io';
const logo = 'https://www.rx-angular.io/img/logo.png';

const googleTrackingId = 'UA-180240379-1';

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  baseUrl: '/',
  favicon: 'img/logo.svg',
  /**
   * Even if you don't use internalization, you can use this field to set useful
   * metadata like html lang. For example, if your site is Chinese, you may want
   * to replace "en" with "zh-Hans".
   */
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  organizationName,
  projectName,
  plugins: [
    // Redirect shim for the Angular demos app served from /demos/. GitHub Pages
    // only serves the site-root 404.html (this Docusaurus site) for unknown
    // paths — never a per-folder /demos/404.html. So a deep link into the SPA
    // (e.g. /demos/features/foo) lands here; we stash the intended path and
    // bounce to the SPA shell (/demos/), which restores the URL before Angular
    // boots. No legitimate Docusaurus page lives under /demos/, so this is a
    // no-op for docs/blog routes.
    function demosSpaRedirectPlugin() {
      return {
        name: 'demos-spa-redirect',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `(function(){var p=location.pathname;if(p.indexOf('/demos/')===0){try{sessionStorage.setItem('rxaSpaRedirect',p+location.search+location.hash);}catch(e){}location.replace('/demos/');}})();`,
              },
            ],
          };
        },
      };
    },
    [
      require.resolve('@docusaurus/plugin-client-redirects'),
      {
        // Phase A: preserve legacy ISR URLs (bare + /docs-prefixed) after the
        // Diátaxis IA move. Every `to` target below is verified to exist on
        // disk this phase. KILLs whose target is a Phase-B/D page that does not
        // exist yet are NOT wired here — they are tracked in
        // output/documents/rxangular-docs/migration/phase-a-pending-redirects.md
        // and get wired when their target lands (wiring a redirect to a missing
        // file breaks the build under onBrokenLinks: 'throw').
        redirects: [
          { from: '/isr/api', to: '/docs/packages/isr/reference/isr-api' },
          {
            from: '/isr/irs-configuration',
            to: '/docs/packages/isr/reference/isr-render-config',
          },
          { from: '/isr/how-it-works', to: '/docs/concepts/E8-how-isr-works' },
          {
            from: '/isr/introduction',
            to: '/docs/packages/isr/isr-introduction',
          },
          { from: '/isr/benefits', to: '/docs/packages/isr/' },
          { from: '/isr/isr', to: '/docs/packages/isr/' },
          {
            from: '/isr/getting-started',
            to: '/docs/packages/isr/how-to/set-up-isr',
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
          {
            from: '/docs/isr/extra',
            to: '/docs/packages/isr/how-to/pass-extra-data',
          },
          { from: '/docs/isr/isr', to: '/docs/packages/isr/' },
          {
            from: '/docs/isr/introduction',
            to: '/docs/packages/isr/isr-introduction',
          },
          { from: '/docs/isr/benefits', to: '/docs/packages/isr/' },
          {
            from: '/docs/isr/getting-started',
            to: '/docs/packages/isr/how-to/set-up-isr',
          },
          {
            from: '/docs/isr/how-it-works',
            to: '/docs/concepts/E8-how-isr-works',
          },
          { from: '/docs/isr/api', to: '/docs/packages/isr/reference/isr-api' },
          {
            from: '/docs/isr/irs-configuration',
            to: '/docs/packages/isr/reference/isr-render-config',
          },
          // Phase B: now-unblocked KILL/MOVE salvage redirects. E1
          // (concepts/E1-change-detection.md) and E3
          // (concepts/E3-reactive-state-global-vs-local.md) landed this phase,
          // so these targets now exist on disk. Both bare and /docs-prefixed
          // old paths are wired to match the hedging used above.
          {
            from: '/state/recipes/use-rxstate-as-global-state',
            to: '/docs/concepts/E3-reactive-state-global-vs-local',
          },
          {
            from: '/docs/state/recipes/use-rxstate-as-global-state',
            to: '/docs/concepts/E3-reactive-state-global-vs-local',
          },
          {
            from: '/cdk/render-strategies/strategies/basic-strategies',
            to: '/docs/concepts/E1-change-detection',
          },
          {
            from: '/docs/cdk/render-strategies/strategies/basic-strategies',
            to: '/docs/concepts/E1-change-detection',
          },
          // Phase C — @rx-angular/state package MOVE into the Diátaxis IA.
          // Every `to` target below is verified to exist on disk this phase
          // (packages/state/{reference,how-to}/* and the two site-level
          // concept absorptions). Both bare and /docs-prefixed legacy paths
          // are preserved to match the hedging above.
          //
          // Reference
          {
            from: '/state/api/functional-rx-state',
            to: '/docs/packages/state/reference/rx-state-functional',
          },
          {
            from: '/docs/state/api/functional-rx-state',
            to: '/docs/packages/state/reference/rx-state-functional',
          },
          {
            from: '/state/api/rx-state',
            to: '/docs/packages/state/reference/rx-state-class',
          },
          {
            from: '/docs/state/api/rx-state',
            to: '/docs/packages/state/reference/rx-state-class',
          },
          {
            from: '/state/api/interfaces/compare-fn',
            to: '/docs/packages/state/reference/compare-fn',
          },
          {
            from: '/docs/state/api/interfaces/compare-fn',
            to: '/docs/packages/state/reference/compare-fn',
          },
          {
            from: '/state/api/interfaces/key-compare-map',
            to: '/docs/packages/state/reference/key-compare-map',
          },
          {
            from: '/docs/state/api/interfaces/key-compare-map',
            to: '/docs/packages/state/reference/key-compare-map',
          },
          {
            from: '/state/api/rxjs-operators/stateful',
            to: '/docs/packages/state/reference/stateful',
          },
          {
            from: '/docs/state/api/rxjs-operators/stateful',
            to: '/docs/packages/state/reference/stateful',
          },
          {
            from: '/state/api/rxjs-operators/select',
            to: '/docs/packages/state/reference/select',
          },
          {
            from: '/docs/state/api/rxjs-operators/select',
            to: '/docs/packages/state/reference/select',
          },
          {
            from: '/state/api/rxjs-operators/select-slice',
            to: '/docs/packages/state/reference/select-slice',
          },
          {
            from: '/docs/state/api/rxjs-operators/select-slice',
            to: '/docs/packages/state/reference/select-slice',
          },
          {
            from: '/state/api/rxjs-operators/distinct-until-some-changed',
            to: '/docs/packages/state/reference/distinct-until-some-changed',
          },
          {
            from: '/docs/state/api/rxjs-operators/distinct-until-some-changed',
            to: '/docs/packages/state/reference/distinct-until-some-changed',
          },
          {
            from: '/state/recipes/run-partial-updates',
            to: '/docs/packages/state/reference/partial-updates',
          },
          {
            from: '/docs/state/recipes/run-partial-updates',
            to: '/docs/packages/state/reference/partial-updates',
          },
          {
            from: '/state/selections/selections',
            to: '/docs/packages/state/reference/selections-api',
          },
          {
            from: '/docs/state/selections/selections',
            to: '/docs/packages/state/reference/selections-api',
          },
          {
            from: '/state/selections',
            to: '/docs/packages/state/reference/selections-api',
          },
          // How-to
          {
            from: '/state/getting-started',
            to: '/docs/packages/state/how-to/getting-started',
          },
          {
            from: '/docs/state/getting-started',
            to: '/docs/packages/state/how-to/getting-started',
          },
          {
            from: '/state/actions',
            to: '/docs/packages/state/how-to/manage-actions',
          },
          {
            from: '/docs/state/actions',
            to: '/docs/packages/state/how-to/manage-actions',
          },
          {
            from: '/state/effects/effects',
            to: '/docs/packages/state/how-to/manage-effects',
          },
          {
            from: '/docs/state/effects/effects',
            to: '/docs/packages/state/how-to/manage-effects',
          },
          {
            from: '/state/testing/testing',
            to: '/docs/packages/state/how-to/testing',
          },
          {
            from: '/docs/state/testing/testing',
            to: '/docs/packages/state/how-to/testing',
          },
          {
            from: '/state/testing',
            to: '/docs/packages/state/how-to/testing',
          },
          {
            from: '/state/concepts-and-best-practices/concepts-and-best-practices',
            to: '/docs/packages/state/how-to/best-practices',
          },
          {
            from: '/docs/state/concepts-and-best-practices/concepts-and-best-practices',
            to: '/docs/packages/state/how-to/best-practices',
          },
          {
            from: '/state/concepts-and-best-practices',
            to: '/docs/packages/state/how-to/best-practices',
          },
          {
            from: '/state/recipes/manage-viewmodel',
            to: '/docs/packages/state/how-to/derive-a-view-model',
          },
          {
            from: '/docs/state/recipes/manage-viewmodel',
            to: '/docs/packages/state/how-to/derive-a-view-model',
          },
          {
            from: '/state/recipes/refactor-to-rx-effects',
            to: '/docs/packages/state/how-to/refactor-to-rx-effects',
          },
          {
            from: '/docs/state/recipes/refactor-to-rx-effects',
            to: '/docs/packages/state/how-to/refactor-to-rx-effects',
          },
          {
            from: '/state/tutorials/passing-observables-directly',
            to: '/docs/packages/state/how-to/pass-observables-directly',
          },
          {
            from: '/docs/state/tutorials/passing-observables-directly',
            to: '/docs/packages/state/how-to/pass-observables-directly',
          },
          {
            from: '/state/integrations/manage-entities-using-ngrx-entity',
            to: '/docs/packages/state/how-to/manage-entities',
          },
          {
            from: '/docs/state/integrations/manage-entities-using-ngrx-entity',
            to: '/docs/packages/state/how-to/manage-entities',
          },
          // Landing
          { from: '/state/state', to: '/docs/packages/state/' },
          { from: '/docs/state/state', to: '/docs/packages/state/' },
          { from: '/state', to: '/docs/packages/state/' },
          { from: '/docs/state', to: '/docs/packages/state/' },
          // Concept absorption — determine-state-type folded into E3 (Phase B),
          // full page deleted this phase.
          {
            from: '/state/recipes/determine-state-type',
            to: '/docs/concepts/E3-reactive-state-global-vs-local',
          },
          {
            from: '/docs/state/recipes/determine-state-type',
            to: '/docs/concepts/E3-reactive-state-global-vs-local',
          },
          // Phase C — @rx-angular/template package MOVE into the Diátaxis IA.
          // Every `to` target below is verified to exist on disk this phase
          // (packages/template/{reference,how-to,legacy}/* plus the two
          // site-level concept absorptions E1 and E4). Both bare and
          // /docs-prefixed legacy paths are preserved to match the hedging
          // above. Root-absolute style (no /docs prefix on `to`).
          //
          // Reference (per-directive)
          {
            from: '/template/rx-for-directive',
            to: '/docs/packages/template/reference/rx-for',
          },
          {
            from: '/docs/template/rx-for-directive',
            to: '/docs/packages/template/reference/rx-for',
          },
          {
            from: '/template/rx-if-directive',
            to: '/docs/packages/template/reference/rx-if',
          },
          {
            from: '/docs/template/rx-if-directive',
            to: '/docs/packages/template/reference/rx-if',
          },
          {
            from: '/template/rx-let-directive',
            to: '/docs/packages/template/reference/rx-let',
          },
          {
            from: '/docs/template/rx-let-directive',
            to: '/docs/packages/template/reference/rx-let',
          },
          {
            from: '/template/virtual-scrolling',
            to: '/docs/packages/template/reference/rx-virtual-for',
          },
          {
            from: '/docs/template/virtual-scrolling',
            to: '/docs/packages/template/reference/rx-virtual-for',
          },
          {
            from: '/template/virtual-view-directive',
            to: '/docs/packages/template/reference/rx-virtual-view',
          },
          {
            from: '/docs/template/virtual-view-directive',
            to: '/docs/packages/template/reference/rx-virtual-view',
          },
          // Legacy shelf (Zone.js-era)
          {
            from: '/template/push-pipe',
            to: '/docs/packages/template/legacy/push-pipe',
          },
          {
            from: '/docs/template/push-pipe',
            to: '/docs/packages/template/legacy/push-pipe',
          },
          {
            from: '/template/unpatch-directive',
            to: '/docs/packages/template/legacy/unpatch',
          },
          {
            from: '/docs/template/unpatch-directive',
            to: '/docs/packages/template/legacy/unpatch',
          },
          {
            from: '/template/performance-issues/handling-view-and-content-queries',
            to: '/docs/packages/template/legacy/view-and-content-queries',
          },
          {
            from: '/docs/template/performance-issues/handling-view-and-content-queries',
            to: '/docs/packages/template/legacy/view-and-content-queries',
          },
          {
            from: '/template/performance-issues/ngzone-optimizations',
            to: '/docs/packages/template/legacy/ngzone-optimizations',
          },
          {
            from: '/docs/template/performance-issues/ngzone-optimizations',
            to: '/docs/packages/template/legacy/ngzone-optimizations',
          },
          // Concept absorptions — the reactive-templating leaf merges the two
          // tiny concept files; local-templates/local-variables point at it.
          {
            from: '/template/concepts/local-templates',
            to: '/docs/concepts/E9-reactive-templating',
          },
          {
            from: '/docs/template/concepts/local-templates',
            to: '/docs/concepts/E9-reactive-templating',
          },
          {
            from: '/template/concepts/local-variables',
            to: '/docs/concepts/E9-reactive-templating',
          },
          {
            from: '/docs/template/concepts/local-variables',
            to: '/docs/concepts/E9-reactive-templating',
          },
          // Concept-SOURCE retirements (Stage 3.A) — these three pages were
          // absorbed into site Concepts E1 / E4 during Phase B and are deleted
          // this phase; redirect their old URLs to the absorbing Concept.
          {
            from: '/template/performance-issues/rendering-issues-in-angular',
            to: '/docs/concepts/E1-change-detection',
          },
          {
            from: '/docs/template/performance-issues/rendering-issues-in-angular',
            to: '/docs/concepts/E1-change-detection',
          },
          {
            from: '/template/performance-issues/change-detection-over-pipes',
            to: '/docs/concepts/E1-change-detection',
          },
          {
            from: '/docs/template/performance-issues/change-detection-over-pipes',
            to: '/docs/concepts/E1-change-detection',
          },
          {
            from: '/template/concepts/reactive-context',
            to: '/docs/concepts/E4-reactive-context',
          },
          {
            from: '/docs/template/concepts/reactive-context',
            to: '/docs/concepts/E4-reactive-context',
          },
          // Landing
          { from: '/template/template', to: '/docs/packages/template/' },
          { from: '/docs/template/template', to: '/docs/packages/template/' },
          { from: '/template', to: '/docs/packages/template/' },
          { from: '/docs/template', to: '/docs/packages/template/' },
          // Phase C — @rx-angular/cdk package MOVE into the Diátaxis IA.
          // Every `to` target below is verified to exist on disk this phase
          // (packages/cdk/{reference,how-to,legacy}/* — the concurrent-rendering
          // how-to lands under packages/template/how-to per ADR-RXA-0003, so it
          // is not a CDK route and carries no redirect here). Both bare and
          // /docs-prefixed legacy paths are preserved to match the hedging
          // above. Root-absolute style (no /docs prefix on `to`). The two
          // basic-strategies KILL redirects (→ E1) were wired in Phase B above.
          //
          // Reference — transformations
          {
            from: '/cdk/transformations/transformations',
            to: '/docs/packages/cdk/reference/transformations/',
          },
          {
            from: '/docs/cdk/transformations/transformations',
            to: '/docs/packages/cdk/reference/transformations/',
          },
          {
            from: '/cdk/transformations/edge-cases-overview',
            to: '/docs/packages/cdk/reference/transformations/transformations-edge-cases',
          },
          {
            from: '/docs/cdk/transformations/edge-cases-overview',
            to: '/docs/packages/cdk/reference/transformations/transformations-edge-cases',
          },
          {
            from: '/cdk/transformations/array/insert',
            to: '/docs/packages/cdk/reference/transformations/array/insert',
          },
          {
            from: '/docs/cdk/transformations/array/insert',
            to: '/docs/packages/cdk/reference/transformations/array/insert',
          },
          {
            from: '/cdk/transformations/array/extract',
            to: '/docs/packages/cdk/reference/transformations/array/extract',
          },
          {
            from: '/docs/cdk/transformations/array/extract',
            to: '/docs/packages/cdk/reference/transformations/array/extract',
          },
          {
            from: '/cdk/transformations/array/remove',
            to: '/docs/packages/cdk/reference/transformations/array/remove',
          },
          {
            from: '/docs/cdk/transformations/array/remove',
            to: '/docs/packages/cdk/reference/transformations/array/remove',
          },
          {
            from: '/cdk/transformations/array/to-dictionary',
            to: '/docs/packages/cdk/reference/transformations/array/to-dictionary',
          },
          {
            from: '/docs/cdk/transformations/array/to-dictionary',
            to: '/docs/packages/cdk/reference/transformations/array/to-dictionary',
          },
          {
            from: '/cdk/transformations/array/update',
            to: '/docs/packages/cdk/reference/transformations/array/update',
          },
          {
            from: '/docs/cdk/transformations/array/update',
            to: '/docs/packages/cdk/reference/transformations/array/update',
          },
          {
            from: '/cdk/transformations/object/delete-prop',
            to: '/docs/packages/cdk/reference/transformations/object/delete-prop',
          },
          {
            from: '/docs/cdk/transformations/object/delete-prop',
            to: '/docs/packages/cdk/reference/transformations/object/delete-prop',
          },
          {
            from: '/cdk/transformations/object/set-prop',
            to: '/docs/packages/cdk/reference/transformations/object/set-prop',
          },
          {
            from: '/docs/cdk/transformations/object/set-prop',
            to: '/docs/packages/cdk/reference/transformations/object/set-prop',
          },
          {
            from: '/cdk/transformations/object/slice',
            to: '/docs/packages/cdk/reference/transformations/object/slice',
          },
          {
            from: '/docs/cdk/transformations/object/slice',
            to: '/docs/packages/cdk/reference/transformations/object/slice',
          },
          {
            from: '/cdk/transformations/object/patch',
            to: '/docs/packages/cdk/reference/transformations/object/patch',
          },
          {
            from: '/docs/cdk/transformations/object/patch',
            to: '/docs/packages/cdk/reference/transformations/object/patch',
          },
          {
            from: '/cdk/transformations/object/toggle',
            to: '/docs/packages/cdk/reference/transformations/object/toggle',
          },
          {
            from: '/docs/cdk/transformations/object/toggle',
            to: '/docs/packages/cdk/reference/transformations/object/toggle',
          },
          {
            from: '/cdk/transformations/object/dictionary-to-array',
            to: '/docs/packages/cdk/reference/transformations/object/dictionary-to-array',
          },
          {
            from: '/docs/cdk/transformations/object/dictionary-to-array',
            to: '/docs/packages/cdk/reference/transformations/object/dictionary-to-array',
          },
          // Reference — first-class (REPOSITION / PURIFY / MODERNIZE)
          {
            from: '/cdk/coercing/coercing',
            to: '/docs/packages/cdk/reference/coercing',
          },
          {
            from: '/docs/cdk/coercing/coercing',
            to: '/docs/packages/cdk/reference/coercing',
          },
          {
            from: '/cdk/notifications/notifications',
            to: '/docs/packages/cdk/reference/notifications',
          },
          {
            from: '/docs/cdk/notifications/notifications',
            to: '/docs/packages/cdk/reference/notifications',
          },
          {
            from: '/cdk/render-strategies/strategies/concurrent-strategies',
            to: '/docs/packages/cdk/reference/concurrent-strategies',
          },
          {
            from: '/docs/cdk/render-strategies/strategies/concurrent-strategies',
            to: '/docs/packages/cdk/reference/concurrent-strategies',
          },
          {
            from: '/cdk/hydration-tracker/hydration-tracker',
            to: '/docs/packages/cdk/reference/hydration-tracker',
          },
          {
            from: '/docs/cdk/hydration-tracker/hydration-tracker',
            to: '/docs/packages/cdk/reference/hydration-tracker',
          },
          {
            from: '/cdk/render-strategies/rx-strategy-provider',
            to: '/docs/packages/cdk/reference/rx-strategy-provider',
          },
          {
            from: '/docs/cdk/render-strategies/rx-strategy-provider',
            to: '/docs/packages/cdk/reference/rx-strategy-provider',
          },
          // Legacy shelf (Zone.js-era) — DOWNGRADE cluster
          {
            from: '/cdk/render-strategies',
            to: '/docs/packages/cdk/legacy/render-strategies-overview',
          },
          {
            from: '/docs/cdk/render-strategies',
            to: '/docs/packages/cdk/legacy/render-strategies-overview',
          },
          {
            from: '/cdk/render-strategies/strategies',
            to: '/docs/packages/cdk/legacy/custom-strategies',
          },
          {
            from: '/docs/cdk/render-strategies/strategies',
            to: '/docs/packages/cdk/legacy/custom-strategies',
          },
          {
            from: '/cdk/zone-configurations/zone-configurations',
            to: '/docs/packages/cdk/legacy/zone-configurations',
          },
          {
            from: '/docs/cdk/zone-configurations/zone-configurations',
            to: '/docs/packages/cdk/legacy/zone-configurations',
          },
          {
            from: '/cdk/zone-configurations/how-to-setup-zone-flags',
            to: '/docs/packages/cdk/legacy/setup-zone-flags',
          },
          {
            from: '/docs/cdk/zone-configurations/how-to-setup-zone-flags',
            to: '/docs/packages/cdk/legacy/setup-zone-flags',
          },
          {
            from: '/cdk/zone-configurations/how-to-debug-zone-flags',
            to: '/docs/packages/cdk/legacy/debug-zone-flags',
          },
          {
            from: '/docs/cdk/zone-configurations/how-to-debug-zone-flags',
            to: '/docs/packages/cdk/legacy/debug-zone-flags',
          },
          {
            from: '/cdk/coalescing/coalescing',
            to: '/docs/packages/cdk/legacy/coalescing',
          },
          {
            from: '/docs/cdk/coalescing/coalescing',
            to: '/docs/packages/cdk/legacy/coalescing',
          },
          // Landing
          { from: '/cdk/cdk', to: '/docs/packages/cdk/' },
          { from: '/docs/cdk/cdk', to: '/docs/packages/cdk/' },
          // Phase C — @rx-angular/eslint-plugin package MOVE into the Diátaxis
          // IA. The 12 rule pages moved from /eslint-plugin/rules/<rule> to
          // /packages/eslint-plugin/reference/<rule>, and the old landing
          // (/eslint-plugin/eslint-plugin) to /packages/eslint-plugin/. Every
          // `to` target below is verified to exist on disk this phase. Both
          // bare and /docs-prefixed legacy paths are preserved to match the
          // hedging used above.
          {
            from: '/eslint-plugin/rules/no-zone-critical-browser-apis',
            to: '/docs/packages/eslint-plugin/reference/no-zone-critical-browser-apis',
          },
          {
            from: '/docs/eslint-plugin/rules/no-zone-critical-browser-apis',
            to: '/docs/packages/eslint-plugin/reference/no-zone-critical-browser-apis',
          },
          {
            from: '/eslint-plugin/rules/no-zone-critical-lodash-apis',
            to: '/docs/packages/eslint-plugin/reference/no-zone-critical-lodash-apis',
          },
          {
            from: '/docs/eslint-plugin/rules/no-zone-critical-lodash-apis',
            to: '/docs/packages/eslint-plugin/reference/no-zone-critical-lodash-apis',
          },
          {
            from: '/eslint-plugin/rules/no-zone-critical-rxjs-creation-apis',
            to: '/docs/packages/eslint-plugin/reference/no-zone-critical-rxjs-creation-apis',
          },
          {
            from: '/docs/eslint-plugin/rules/no-zone-critical-rxjs-creation-apis',
            to: '/docs/packages/eslint-plugin/reference/no-zone-critical-rxjs-creation-apis',
          },
          {
            from: '/eslint-plugin/rules/no-zone-critical-rxjs-operators',
            to: '/docs/packages/eslint-plugin/reference/no-zone-critical-rxjs-operators',
          },
          {
            from: '/docs/eslint-plugin/rules/no-zone-critical-rxjs-operators',
            to: '/docs/packages/eslint-plugin/reference/no-zone-critical-rxjs-operators',
          },
          {
            from: '/eslint-plugin/rules/no-zone-critical-rxjs-schedulers',
            to: '/docs/packages/eslint-plugin/reference/no-zone-critical-rxjs-schedulers',
          },
          {
            from: '/docs/eslint-plugin/rules/no-zone-critical-rxjs-schedulers',
            to: '/docs/packages/eslint-plugin/reference/no-zone-critical-rxjs-schedulers',
          },
          {
            from: '/eslint-plugin/rules/no-zone-run-apis',
            to: '/docs/packages/eslint-plugin/reference/no-zone-run-apis',
          },
          {
            from: '/docs/eslint-plugin/rules/no-zone-run-apis',
            to: '/docs/packages/eslint-plugin/reference/no-zone-run-apis',
          },
          {
            from: '/eslint-plugin/rules/no-explicit-change-detection-apis',
            to: '/docs/packages/eslint-plugin/reference/no-explicit-change-detection-apis',
          },
          {
            from: '/docs/eslint-plugin/rules/no-explicit-change-detection-apis',
            to: '/docs/packages/eslint-plugin/reference/no-explicit-change-detection-apis',
          },
          {
            from: '/eslint-plugin/rules/no-rxstate-imperative-in-reactive',
            to: '/docs/packages/eslint-plugin/reference/no-rxstate-imperative-in-reactive',
          },
          {
            from: '/docs/eslint-plugin/rules/no-rxstate-imperative-in-reactive',
            to: '/docs/packages/eslint-plugin/reference/no-rxstate-imperative-in-reactive',
          },
          {
            from: '/eslint-plugin/rules/no-rxstate-subscriptions-outside-constructor',
            to: '/docs/packages/eslint-plugin/reference/no-rxstate-subscriptions-outside-constructor',
          },
          {
            from: '/docs/eslint-plugin/rules/no-rxstate-subscriptions-outside-constructor',
            to: '/docs/packages/eslint-plugin/reference/no-rxstate-subscriptions-outside-constructor',
          },
          {
            from: '/eslint-plugin/rules/prefer-no-layout-sensitive-apis',
            to: '/docs/packages/eslint-plugin/reference/prefer-no-layout-sensitive-apis',
          },
          {
            from: '/docs/eslint-plugin/rules/prefer-no-layout-sensitive-apis',
            to: '/docs/packages/eslint-plugin/reference/prefer-no-layout-sensitive-apis',
          },
          {
            from: '/eslint-plugin/rules/prefer-no-lodash-clone-deep',
            to: '/docs/packages/eslint-plugin/reference/prefer-no-lodash-clone-deep',
          },
          {
            from: '/docs/eslint-plugin/rules/prefer-no-lodash-clone-deep',
            to: '/docs/packages/eslint-plugin/reference/prefer-no-lodash-clone-deep',
          },
          {
            from: '/eslint-plugin/rules/prefer-no-lodash-is-equal',
            to: '/docs/packages/eslint-plugin/reference/prefer-no-lodash-is-equal',
          },
          {
            from: '/docs/eslint-plugin/rules/prefer-no-lodash-is-equal',
            to: '/docs/packages/eslint-plugin/reference/prefer-no-lodash-is-equal',
          },
          {
            from: '/eslint-plugin/eslint-plugin',
            to: '/docs/packages/eslint-plugin/',
          },
          {
            from: '/docs/eslint-plugin/eslint-plugin',
            to: '/docs/packages/eslint-plugin/',
          },
          // Phase D — Learn phase landed the net-new tutorials/concepts, so the
          // previously-pending KILL/MOVE redirects now have live targets on
          // disk. Wired here (both bare and /docs-prefixed) and removed from
          // output/documents/rxangular-docs/migration/phase-a-pending-redirects.md.
          //
          // MOVE: migrating-to-rxstate rewrite relocated to the net-new
          // signals-first migration tutorial.
          {
            from: '/state/tutorials/migrating-to-rxstate',
            to: '/docs/tutorials/migrate-to-signals-rxstate-optional',
          },
          {
            from: '/docs/state/tutorials/migrating-to-rxstate',
            to: '/docs/tutorials/migrate-to-signals-rxstate-optional',
          },
          // KILL: deriving-simple-state → stateful reference (Phase C salvage
          // sink now exists on disk).
          {
            from: '/state/concepts-and-best-practices/deriving-simple-state',
            to: '/docs/packages/state/reference/stateful',
          },
          {
            from: '/docs/state/concepts-and-best-practices/deriving-simple-state',
            to: '/docs/packages/state/reference/stateful',
          },
          // KILL: work-with-hostbindings → derive-a-view-model (nearest live
          // successor how-to).
          {
            from: '/state/recipes/work-with-hostbindings',
            to: '/docs/packages/state/how-to/derive-a-view-model',
          },
          {
            from: '/docs/state/recipes/work-with-hostbindings',
            to: '/docs/packages/state/how-to/derive-a-view-model',
          },
          // KILL: increment-a-value → T1 (nearest live successor tutorial; this
          // dead URL is not the same page as T1).
          {
            from: '/state/tutorials/increment-a-value',
            to: '/docs/tutorials/T1-your-first-rxstate',
          },
          {
            from: '/docs/state/tutorials/increment-a-value',
            to: '/docs/tutorials/T1-your-first-rxstate',
          },
          // KILL: load-data-on-route-change → T1 (nearest live successor; no
          // native route-data how-to was authored).
          {
            from: '/state/recipes/load-data-on-route-change',
            to: '/docs/tutorials/T1-your-first-rxstate',
          },
          {
            from: '/docs/state/recipes/load-data-on-route-change',
            to: '/docs/tutorials/T1-your-first-rxstate',
          },
          // KILL: template-management stub → cdk package landing (nearest live
          // successor; the old page was a content-free stub).
          {
            from: '/cdk/template-management/template-management',
            to: '/docs/packages/cdk/',
          },
          {
            from: '/docs/cdk/template-management/template-management',
            to: '/docs/packages/cdk/',
          },
        ],
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `https://github.com/${organizationName}/${projectName}/edit/main/apps/docs`,
        },
        blog: {
          blogTitle: 'The RxAngular blog',
          blogDescription:
            'Announcements, releases and guides from the RxAngular team',
          postsPerPage: 'ALL',
          showReadingTime: true,
          editUrl: `https://github.com/${organizationName}/${projectName}/edit/main/apps/docs`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: googleTrackingId,
        },
        gtag: {
          trackingID: googleTrackingId,
        },
      }),
    ],
  ],
  tagline: 'Performance & DX',
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexPages: true,
        language: ['en'],
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: title,
        },
        /** @type {*} - website | profile | article | product */
        {
          property: 'og:type',
          content: 'website',
        },
        { property: 'og:url', content: url },
        { property: 'og:image', content: logo },
        { property: 'og:description', content: description },
        /** @type {*} - summary | summary_large_image | app | player */
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:image',
          content: logo,
        },
      ],
      navbar: {
        title: 'RxAngular',
        logo: {
          alt: 'RxAngular',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Docs',
            position: 'left',
            items: [
              { type: 'doc', docId: 'packages/state/state', label: 'State' },
              {
                type: 'doc',
                docId: 'packages/template/template-overview',
                label: 'Template',
              },
              { type: 'doc', docId: 'packages/cdk/cdk-overview', label: 'CDK' },
              { type: 'doc', docId: 'packages/isr/isr-landing', label: 'ISR' },
              {
                type: 'doc',
                docId: 'packages/eslint-plugin/eslint-plugin-overview',
                label: 'ESLint plugin',
              },
            ],
          },
          {
            to: '/docs/tutorials',
            label: 'Learn',
            position: 'left',
          },
          {
            to: '/docs/concepts',
            label: 'Concepts',
            position: 'left',
          },
          {
            to: 'blog',
            label: 'Blog',
            position: 'left',
          },
          {
            // `pathname://` links to the Angular demos app (served from the
            // same Pages deployment at /demos/) without Docusaurus treating it
            // as an internal route — avoids the onBrokenLinks check and forces
            // a full-page navigation into the SPA.
            href: 'pathname:///demos/',
            label: 'Demos',
            position: 'left',
          },
          {
            href: `https://github.com/${organizationName}/${projectName}`,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        copyright: `Funded by netidee: <a href="https://netidee.at/rxangular" title="netidee.at/rxangular" target="_blank">netidee.at/rxangular</a> <br/> Copyright © ${new Date().getFullYear()} RxAngular.`,
        logo: {
          alt: title,
          href: url,
          src: 'img/logo.svg',
        },
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: '@rx-angular/state',
                to: 'docs/packages/state/',
              },
              {
                label: '@rx-angular/template',
                to: 'docs/packages/template/',
              },
              {
                label: '@rx-angular/cdk',
                to: 'docs/packages/cdk/',
              },
              {
                label: '@rx-angular/eslint-plugin',
                to: 'docs/packages/eslint-plugin/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Angular Community Discord',
                href: 'https://discord.gg/angular',
              },
              {
                label: 'RxAngular Slack (existing users)',
                href: 'https://rxangular.slack.com',
              },
              {
                label: 'RxAngular Slack invite (up to 100 uses)',
                href: 'https://join.slack.com/t/rxangular/shared_invite/zt-1bidnn86a-02bFi6E8b71Czmwod6H81A',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'blog',
              },
              {
                label: 'GitHub',
                href: `https://github.com/${organizationName}/${projectName}`,
              },
            ],
          },
        ],
      },
      image: 'img/logo.svg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'typescript',
      },
    }),
  title,
  /**
   * GitHub Pages adds a trailing slash to Docusaurus URLs by default.
   */
  trailingSlash: false,
  url,
};
