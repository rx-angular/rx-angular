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
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Old URL -> new URL for every page moved by the Diátaxis restructure,
        // so inbound links and search results keep resolving. Overview renames
        // kept their URL via `slug`, so they need no entry.
        redirects: [
          // Concepts lifted to a site-level section
          {
            from: '/docs/template/concepts/reactive-context',
            to: '/docs/concepts/reactive-context',
          },
          {
            from: '/docs/template/concepts/local-templates',
            to: '/docs/concepts/local-templates',
          },
          {
            from: '/docs/template/concepts/local-variables',
            to: '/docs/concepts/local-variables',
          },
          {
            from: '/docs/state/concepts-and-best-practices',
            to: '/docs/concepts/concepts-and-best-practices',
          },
          {
            from: '/docs/state/concepts-and-best-practices/deriving-simple-state',
            to: '/docs/concepts/deriving-simple-state',
          },
          { from: '/docs/isr/how-it-works', to: '/docs/concepts/how-it-works' },
          // Tutorials lifted to a site-level Learn section
          {
            from: '/docs/state/tutorials/increment-a-value',
            to: '/docs/learn/increment-a-value',
          },
          {
            from: '/docs/state/tutorials/passing-observables-directly',
            to: '/docs/learn/passing-observables-directly',
          },
          {
            from: '/docs/state/tutorials/migrating-to-rxstate',
            to: '/docs/learn/migrating-to-rxstate',
          },
          // CDK zone/perf pages ring-fenced onto the Legacy shelf
          {
            from: '/docs/cdk/zone-configurations',
            to: '/docs/cdk/legacy/zone-configurations',
          },
          { from: '/docs/cdk/zone-less', to: '/docs/cdk/legacy/zone-less' },
          { from: '/docs/cdk/coalescing', to: '/docs/cdk/legacy/coalescing' },
          {
            from: '/docs/cdk/zone-configurations/how-to-setup-zone-flags',
            to: '/docs/cdk/legacy/setup-zone-flags',
          },
          {
            from: '/docs/cdk/zone-configurations/how-to-debug-zone-flags',
            to: '/docs/cdk/legacy/debug-zone-flags',
          },
          // Template directives -> Reference (api)
          {
            from: '/docs/template/rx-let-directive',
            to: '/docs/template/api/rx-let-directive',
          },
          {
            from: '/docs/template/rx-for-directive',
            to: '/docs/template/api/rx-for-directive',
          },
          {
            from: '/docs/template/rx-if-directive',
            to: '/docs/template/api/rx-if-directive',
          },
          {
            from: '/docs/template/unpatch-directive',
            to: '/docs/template/api/unpatch-directive',
          },
          {
            from: '/docs/template/push-pipe',
            to: '/docs/template/api/push-pipe',
          },
          {
            from: '/docs/template/virtual-scrolling',
            to: '/docs/template/api/virtual-scrolling',
          },
          {
            from: '/docs/template/virtual-view-directive',
            to: '/docs/template/api/virtual-view-directive',
          },
          // Template performance-issues -> How-to guides
          {
            from: '/docs/template/performance-issues/ngzone-optimizations',
            to: '/docs/template/guides/performance/ngzone-optimizations',
          },
          {
            from: '/docs/template/performance-issues/handling-view-and-content-queries',
            to: '/docs/template/guides/performance/handling-view-and-content-queries',
          },
          {
            from: '/docs/template/performance-issues/change-detection-over-pipes',
            to: '/docs/template/guides/performance/change-detection-over-pipes',
          },
          {
            from: '/docs/template/performance-issues/rendering-issues-in-angular',
            to: '/docs/template/guides/performance/rendering-issues-in-angular',
          },
          // State recipes -> How-to guides
          {
            from: '/docs/state/recipes/refactor-to-rx-effects',
            to: '/docs/state/guides/refactor-to-rx-effects',
          },
          {
            from: '/docs/state/recipes/determine-state-type',
            to: '/docs/state/guides/determine-state-type',
          },
          {
            from: '/docs/state/recipes/load-data-on-route-change',
            to: '/docs/state/guides/load-data-on-route-change',
          },
          {
            from: '/docs/state/recipes/manage-viewmodel',
            to: '/docs/state/guides/manage-viewmodel',
          },
          {
            from: '/docs/state/recipes/run-partial-updates',
            to: '/docs/state/guides/run-partial-updates',
          },
          {
            from: '/docs/state/recipes/use-rxstate-as-global-state',
            to: '/docs/state/guides/use-rxstate-as-global-state',
          },
          {
            from: '/docs/state/recipes/work-with-hostbindings',
            to: '/docs/state/guides/work-with-hostbindings',
          },
          // State integrations + testing -> How-to guides
          {
            from: '/docs/state/integrations/manage-entities-using-ngrx-entity',
            to: '/docs/state/guides/integrations/manage-entities-using-ngrx-entity',
          },
          {
            from: '/docs/state/integrations/resuse-ngrx-selectors-to-compose-state',
            to: '/docs/state/guides/integrations/resuse-ngrx-selectors-to-compose-state',
          },
          { from: '/docs/state/testing', to: '/docs/state/guides/testing' },
          // ISR flat pages -> How-to guides
          { from: '/docs/isr/extra', to: '/docs/isr/guides/extra' },
          {
            from: '/docs/isr/on-demand-revalidation',
            to: '/docs/isr/guides/on-demand-revalidation',
          },
          {
            from: '/docs/isr/cache-handlers',
            to: '/docs/isr/guides/cache-handlers',
          },
          { from: '/docs/isr/cache-hooks', to: '/docs/isr/guides/cache-hooks' },
          {
            from: '/docs/isr/irs-configuration',
            to: '/docs/isr/guides/irs-configuration',
          },
          {
            from: '/docs/isr/cache-variants',
            to: '/docs/isr/guides/cache-variants',
          },
          {
            from: '/docs/isr/error-handling',
            to: '/docs/isr/guides/error-handling',
          },
          // Removed placeholder API stub -> package overview
          { from: '/docs/isr/api', to: '/docs/isr' },
        ],
      },
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
              { type: 'doc', docId: 'state/overview', label: 'State' },
              { type: 'doc', docId: 'template/overview', label: 'Template' },
              { type: 'doc', docId: 'cdk/overview', label: 'CDK' },
              { type: 'doc', docId: 'isr/overview', label: 'ISR' },
              {
                type: 'doc',
                docId: 'eslint-plugin/overview',
                label: 'ESLint plugin',
              },
            ],
          },
          {
            to: '/docs/learn',
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
            href: `https://github.com/${organizationName}/${projectName}`,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        copyright: `Funded by netidee: <a href="https://netidee.at/rxangular" title="netidee.at/rxangular" target="_blank">netidee.at/rxangular</a> <br/> Copyright © ${new Date().getFullYear()} RxAngular.`,
        style: 'dark',
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
                to: 'docs/state/',
              },
              {
                label: '@rx-angular/template',
                to: 'docs/template/',
              },
              {
                label: '@rx-angular/cdk',
                to: 'docs/cdk/',
              },
              {
                label: '@rx-angular/eslint-plugin',
                to: 'docs/eslint-plugin/',
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
                label: 'Contributing',
                to: 'docs/contributing',
              },
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
