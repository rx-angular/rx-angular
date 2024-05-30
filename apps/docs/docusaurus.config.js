// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const organizationName = 'rx-angular';
const projectName = 'rx-angular';
const title = 'RxAngular';
const url = 'https://rx-angular.io';

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
          content:
            'Official documentation for RxAngular, the ultimate reactive programming library for Angular.',
        },
        { property: 'og:title', content: 'RxAngular Documentation' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.rx-angular.io' },
        {
          property: 'og:image',
          content: 'https://www.rx-angular.io/img/logo.png',
        },
        {
          property: 'og:description',
          content:
            'Official documentation for RxAngular, the ultimate reactive programming library for Angular.',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'RxAngular Documentation' },
        {
          name: 'twitter:description',
          content:
            'Official documentation for RxAngular, the ultimate reactive programming library for Angular.',
        },
        {
          name: 'twitter:image',
          content: 'https://www.rx-angular.io/img/logo.png',
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
            docId: 'state/state',
            label: 'State',
            position: 'left',
            type: 'doc',
          },
          {
            docId: 'template/template',
            label: 'Template',
            position: 'left',
            type: 'doc',
          },
          {
            docId: 'cdk/cdk',
            label: 'CDK',
            position: 'left',
            type: 'doc',
          },
          {
            docId: 'isr/isr',
            label: 'ISR',
            position: 'left',
            type: 'doc',
          },
          {
            docId: 'eslint-plugin/eslint-plugin',
            label: 'ESLint',
            position: 'left',
            type: 'doc',
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
        copyright: `Copyright © ${new Date().getFullYear()} RxAngular.`,
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
                href: 'https://discord.com/invite/XWWGZsQ',
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
