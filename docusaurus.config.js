// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github
const darkCodeTheme = require('prism-react-renderer').themes.dracula
const { navbarItemStrings, legacyDocsLinks } = require('./localeStrings'); // import locale-dependant navbar items 

const {
  remarkCodeHike,
} = require("@code-hike/mdx")

process.env.DOCUSAURUS_CURRENT_VERSION = process.env.DOCUSAURUS_CURRENT_VERSION === undefined ? 'current' : process.env.DOCUSAURUS_CURRENT_VERSION
process.env.DOCUSAURUS_CURRENT_LOCALE = process.env.DOCUSAURUS_CURRENT_LOCALE === 'undefined' || undefined ? 'en' : process.env.DOCUSAURUS_CURRENT_LOCALE

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Klaytn Docs',
  tagline: 'Welcome to the Klaytn Docs',

  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  onBrokenLinks: 'ignore',

  baseUrl: '/',
  url: 'https://docs.klaytn.foundation',

  organizationName: 'klaytn', //only needed when using `docusaurus deploy`command
  projectName: 'klaytn-docs', //only needed when using `docusaurus deploy`command
  deploymentBranch: 'main', //only needed when using `docusaurus deploy`command
  trailingSlash: true, // was "false"

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko', 'vi'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      ko: {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko',
        calendar: 'gregory',
        path: 'ko',
      },
      vi: {
        label: 'Tiếng Việt',
        direction: 'ltr',
        htmlLang: 'vi',
        calendar: 'gregory',
        path: 'vi',
      },      
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          showReadingTime: true,
        },
        docs: {
          beforeDefaultRemarkPlugins: [
            [
              remarkCodeHike, { 
                theme: "dracula",
                showCopyButton: true,
              }
            ],
          ],
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
          showLastUpdateTime: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Current',
            },
          },
          editUrl:
            'https://github.com/klaytn/klaytn-docs/tree/main/',
          
          // TODO-Klaytn : it will be activated after dacusaurus-openapi bugfix
          docRootComponent: "@theme/DocRoot",
          docItemComponent: "@theme/ApiItem"
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve("@code-hike/mdx/styles.css"),
          ]
        },
      }),
    ],
  ],

  scripts: [{src: 'https://umami.lkw1615.synology.me/script.js', async: true, 'data-website-id': '7dc4d49d-3f21-4dd2-8dd7-90a2cc948dc6'}],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // id of plugin-content-docs or preset for rendering docs
        config: {
          web3rpcKlay: {
            // template: "api.mustache",
            specPath: "./web3rpc/yaml/web3rpc-klay.yaml",
            outputDir: "docs/references/json-rpc/klay",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          },
          web3rpcEth: {
            specPath: "./web3rpc/yaml/web3rpc-eth.yaml",
            outputDir: "docs/references/json-rpc/eth",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          },
          web3rpcDebug: {
            specPath: "./web3rpc/yaml/web3rpc-debug.yaml",
            outputDir: "docs/references/json-rpc/debug",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          },
          web3rpcAdmin: {
            specPath: "./web3rpc/yaml/web3rpc-admin.yaml",
            outputDir: "docs/references/json-rpc/admin",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          },
          web3rpcPersonal: {
            specPath: "./web3rpc/yaml/web3rpc-personal.yaml",
            outputDir: "docs/references/json-rpc/personal",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          },
          web3rpcNet: {
            specPath: "./web3rpc/yaml/web3rpc-net.yaml",
            outputDir: "docs/references/json-rpc/net",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          },
          web3rpcGovernance: {
            specPath: "./web3rpc/yaml/web3rpc-governance.yaml",
            outputDir: "docs/references/json-rpc/governance",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          },
          web3rpcTxpool: {
            specPath: "./web3rpc/yaml/web3rpc-txpool.yaml",
            outputDir: "docs/references/json-rpc/txpool",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          },
          web3rpcMainbridge: {
            specPath: "./web3rpc/yaml/web3rpc-mainbridge.yaml",
            outputDir: "docs/references/json-rpc/mainbridge",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          },
          web3rpcSubbridge: {
            specPath: "./web3rpc/yaml/web3rpc-subbridge.yaml",
            outputDir: "docs/references/json-rpc/subbridge",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          },
        }
      },
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"], // export theme components
  stylesheets: [
    {
      href: "https://use.fontawesome.com/releases/v5.11.0/css/all.css",
      type: "text/css",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        contextualSearch: true,
        appId: '3JXBTKO6ZU',
        apiKey: '3ae6c772dbecf845225e7ef3f4ac18be',
        indexName: 'klaytn',
      },
      navbar: {
        title: 'Klaytn Docs',
        logo: {
          alt: 'Klaytn Logo',
          src: 'img/klaytn-logo.png',
        },
        items: [
          {
            to: "docs/learn",
            position: 'left',
            sidebarid: 'learnSidebar',
            label: 'Learn',
          },
          {
            to: "docs/build",
            position: 'left',
            sidebarid: 'buildSidebar',
            label: 'Build',
          },
          {
            to: "docs/nodes",
            position: 'left',
            sidebarid: 'nodeSidebar',
            label: 'Nodes',
          },
          {
            to: "docs/references",
            position: 'left',
            sidebarid: 'refSidebar',
            label: 'References',
          },
          {
            to: "docs/kaiatech",
            position: 'left',
            sidebarid: 'kaiaSidebar',
            label: 'Kaia Tech',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
              {
                // TODO-Klaytn : it will be activated after navBar bugfix
                // href: legacyDocsLinks[process.env.DOCUSAURUS_CURRENT_LOCALE],
                // label: navbarItemStrings[process.env.DOCUSAURUS_CURRENT_LOCALE],
                href: 'https://archive-docs.klaytn.foundation/',
                label: 'Archived',
              },
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/klaytn',
            position: 'right',
            alt: 'GitHub repository',
            className: 'header-github-link',
          },          
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "bash",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
          variant: "requests",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
          variant: "axios",
        },
        {
          highlight: "java",
          language: "java",
          logoClass: "java",
          variant: "unirest",
        },
      ],
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Sites',
            items: [
              {
                label: 'Klaytn Square',
                href: 'https://square.klaytn.foundation/Home',
              },
              {
                label: 'Klaytn Online Toolkit',
                href: 'https://toolkit.klaytn.foundation/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Medium',
                href: 'https://medium.com/klaytn',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/klaytn_official',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'KIPs',
                href: 'https://kips.klaytn.foundation/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/klaytn',
              },
            ],
          },
        ],
        copyright: `© Klaytn Foundation ${new Date().getFullYear()}. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
      }
    }),
}

module.exports = config
