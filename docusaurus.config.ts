import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

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
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Add stylesheets for KaTeX
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Add remark-math and rehype-katex plugins
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/brett-van-tussler/brett-van-tussler.github.io/edit/main/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
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
    image: 'img/luminary_library.jpg',
    navbar: {
      title: 'Luminary Home',
      logo: {
        alt: 'My Site Logo',
        src: 'img/star.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docSidebar',
          position: 'left',
          label: 'Luminary Library',
        },
        {
          to: '/docs/category/Bioinformatics',
          label: 'Bioinformatics',
          position: 'left',
        },
        {
          to: '/docs/category/Machine-Learning',
          label: 'ML & Math',
          position: 'left',
        },
        {
          to: '/docs/category/Philosophy',
          label: 'Philosophy',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Dictionaries',
          position: 'left',
          items: [
            {
              label: 'All Definitions',
              to: '/all-definitions',
            },
            {
              label: 'Machine Learning',
              to: '/machine-learning-dictionary',
            },
            {
              label: 'Mathematics',
              to: '/mathematics-dictionary',
            },
            {
              label: 'Bioinformatics',
              to: '/bioinformatics-dictionary',
            },
          ],
        },
        {
          href: 'https://github.com/brett-van-tussler/brett-van-tussler.github.io',
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
            {
              label: 'Resume',
              href: 'files/brettvantassel_resume.pdf',
              target: '_blank', // Open in new tab
              download: 'brettvantassel_resume.pdf', // Add download attribute
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

