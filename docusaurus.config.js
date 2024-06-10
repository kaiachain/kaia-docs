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
  title: 'Kaia Docs',
  tagline: 'Welcome to the Kaia Docs',

  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  onBrokenLinks: 'ignore',

  baseUrl: '/',
  url: 'https://docs.kaia.io',

  organizationName: 'kaia', //only needed when using `docusaurus deploy`command
  projectName: 'kaia-docs', //only needed when using `docusaurus deploy`command
  deploymentBranch: 'main', //only needed when using `docusaurus deploy`command
  trailingSlash: true, // was "false"

  i18n: {
    defaultLocale: 'en',
    //locales: ['en', 'ko', 'vi'],
    locales: ['en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
/**      ko: {
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
      },*/
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
            'https://github.com/kaiachain/kaia-docs/tree/main/',
          
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

  scripts: [{src: 'https://umami.lkw1615.synology.me/script.js', async: true, 'data-website-id': 'ae21f682-27e8-4670-bf7f-8eec7a2097cf'}],

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
      announcementBar: {
        id: 'docs_archive',
        content: '<div style="font-size: 15px">📢 Kaia docs is now open, but <b>some content is still being updated to reflect the transition from Klaytn and may refer to outdated information until July.</b> Thank you for your understanding. 🙏🏻</div>',
        backgroundColor: '#789806',
        textColor: '#FFFFFF',
        isCloseable: true,
      },
      navbar: {
        title: 'Kaia Docs',
        logo: {
          alt: 'Klaytn Logo',
          src: 'img/kaia-logo.png',
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
                // TODO-Kaia : it will be activated after navBar bugfix
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
            href: 'https://github.com/kaiachain',
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
                label: 'Kaia Square',
                href: 'https://square.kaia.io/Home',
              },
              /*{
                label: 'Klaytn Online Toolkit',
                href: 'https://toolkit.klaytn.foundation/',
              },*/
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Medium',
                href: 'https://medium.com/kaiachain',
              },
              {
                label: 'X (formerly Twitter)',
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
                href: 'https://github.com/kaiachain',
              },
            ],
          },
        ],
        copyright: `© Kaia Foundation ${new Date().getFullYear()}. All rights reserved.`,
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
