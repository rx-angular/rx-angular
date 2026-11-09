// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const redirects = require('./redirects');

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

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
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
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
        redirects,
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
          // Keep the v2 behavior of rendering full posts on the blog list.
          onUntruncatedBlogPosts: 'ignore',
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
              { type: 'doc', docId: 'packages/state/overview', label: 'State' },
              {
                type: 'doc',
                docId: 'packages/template/overview',
                label: 'Template',
              },
              { type: 'doc', docId: 'packages/cdk/overview', label: 'CDK' },
              { type: 'doc', docId: 'packages/isr/overview', label: 'ISR' },
              {
                type: 'doc',
                docId: 'packages/eslint-plugin/overview',
                label: 'ESLint plugin',
              },
              {
                type: 'doc',
                docId: 'packages/rebundle/overview',
                label: 'Rebundle',
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
                to: 'docs/packages/state',
              },
              {
                label: '@rx-angular/template',
                to: 'docs/packages/template',
              },
              {
                label: '@rx-angular/cdk',
                to: 'docs/packages/cdk',
              },
              {
                label: '@rx-angular/isr',
                to: 'docs/packages/isr',
              },
              {
                label: '@rx-angular/eslint-plugin',
                to: 'docs/packages/eslint-plugin',
              },
              {
                label: '@rx-angular/rebundle',
                to: 'docs/packages/rebundle',
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
                label: 'Contributing',
                to: 'contributing',
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
        // prism-react-renderer v2 no longer bundles these by default.
        additionalLanguages: ['bash', 'scss'],
      },
    }),
  title,
  /**
   * GitHub Pages adds a trailing slash to Docusaurus URLs by default.
   */
  trailingSlash: false,
  url,
};
