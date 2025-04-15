import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Brett Van Tassel\'s Luminary Library',
  tagline: 'This is a collection of notes and thoughts on bioinformatics, machine learning, and philosophy.',
  favicon: 'img/star.svg',

  // Set the production url of your site here
  url: 'https://brett-van-tussel.github.io',
  baseUrl: '/',

  // GitHub Pages deployment config
  organizationName: 'brett-van-tussler', // GitHub username
  projectName: 'brett-van-tussler.github.io', // Repository name
  deploymentBranch: 'gh-pages',
  
  // Other settings
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'CXA2345KVR',

      // Public API key: it is safe to commit it
      apiKey: 'a7b00da2dfbf6e7df2d37749883455d6',

      indexName: 'brett-van-tusslerio',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      //... other Algolia params
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Luminary Library',
      logo: {
        alt: 'My Site Logo',
        src: 'img/star.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docSidebar',
          position: 'left',
          label: 'Library',
        },
        {
          to: '/docs/bioinformatics',
          label: 'Bioinformatics',
          position: 'left',
        },
        {
          to: '/docs/machine_learning',
          label: 'Math & ML',
          position: 'left',
        },
        {
          to: '/docs/philosophy',
          label: 'Philosophy',
          position: 'left',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Luminary Library',
          items: [
            {
              label: 'Luminary Library',
              to: '/docs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/brett-van-tussler/brett-van-tussler.github.io',
            },
          ],
        },
      ],
      copyright: `${new Date().getFullYear()} Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

