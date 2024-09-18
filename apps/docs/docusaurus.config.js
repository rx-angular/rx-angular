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
