// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// TODO(@LayZeeDK): Change organization to `rx-angular`
const organizationName = 'LayZeeDK';
const projectName = 'rx-angular';
const title = 'RxAngular';
// TODO(@LayZeeDK): Use top-level domain URL. Remove base path when doing this.
// const url = 'https://rx-angular.io';
const url = `https://${organizationName}.github.io`;

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  // TODO(@LayZeeDK): Remove base URL to use top-level domain URL.
  baseUrl: `/${projectName}/`,
  favicon: 'img/favicon.ico',
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
  // TODO(@LayZeeDK): Change to `'throw'` when all package categories are scaffolded.
  onBrokenMarkdownLinks: 'warn',
  organizationName,
  projectName,
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `https://github.com/${organizationName}/${projectName}/edit/main`,
        },
        // Disable the blog plugin
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  tagline: 'Extending Angular for the Reactive Web',
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          // {
          //   to: 'docs/',
          //   activeBasePath: 'docs',
          //   label: 'Docs',
          //   position: 'left',
          // },
          // {
          //   docId: 'cdk/index',
          //   label: 'CDK',
          //   position: 'left',
          //   type: 'doc',
          // },
          {
            docId: 'state/getting-started/overview',
            label: 'State',
            position: 'left',
            type: 'doc',
          },
          // {
          //   docId: 'template/index',
          //   label: 'Template',
          //   position: 'left',
          //   type: 'doc',
          // },
          // { to: 'blog', label: 'Blog', position: 'left' },
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
              // {
              //   label: '@rx-angular/cdk',
              //   to: 'docs/cdk/',
              // },
              {
                label: '@rx-angular/state',
                to: 'docs/state/getting-started/overview',
              },
              // {
              //   label: '@rx-angular/template',
              //   to: 'docs/template/',
              // },
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
              // {
              //   label: 'Blog',
              //   to: 'blog',
              // },
              {
                label: 'GitHub',
                href: `https://github.com/${organizationName}/${projectName}`,
              },
            ],
          },
        ],
      },
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