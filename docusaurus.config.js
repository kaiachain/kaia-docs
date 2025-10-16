const lightCodeTheme = require('prism-react-renderer').themes.github
const darkCodeTheme = require('prism-react-renderer').themes.dracula
const {
  remarkCodeHike,
} = require("@code-hike/mdx")
const { redirects, createRedirects } = require('./redirects');
import 'dotenv/config';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Kaia Docs',
  tagline: 'Welcome to the Kaia Docs',
  favicon: 'img/favicon.ico',
  onBrokenLinks: 'ignore',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  baseUrl: '/',
  url: 'https://docs.kaia.io',

  organizationName: 'kaia', //only needed when using `docusaurus deploy`command
  projectName: 'kaia-docs', //only needed when using `docusaurus deploy`command
  deploymentBranch: 'main', //only needed when using `docusaurus deploy`command
  trailingSlash: true, // was "false"

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko', 'ja', 'zh-CN', 'zh-TW', 'vi'],
    path: 'i18n',
    localeConfigs: {
      'en': {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      'ko': {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko',
        calendar: 'gregory',
        path: 'ko',
      },
      'ja': {
        label: '日本語',
        direction: 'ltr',
        htmlLang: 'ja',
        calendar: 'gregory',
        path: 'ja',
      },
      'zh-CN': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-Hans',
        calendar: 'gregory',
        path: 'zh-CN',
      },
      'zh-TW': {
        label: '繁體中文',
        direction: 'ltr',
        htmlLang: 'zh-Hant',
        calendar: 'gregory',
        path: 'zh-TW',
      },
      'vi': {
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
        blog: false,
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
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
            require.resolve("@code-hike/mdx/styles.css"),
            require.resolve('./src/css/custom.css'),
          ]
        },
      }),
    ],
  ],

  scripts: [
    ...(process.env.UMAMI_SRC ? [{
      src: process.env.UMAMI_SRC,
      async: true,
      'data-website-id': process.env.UMAMI_WEBSITE_ID,
    }] : []),
    {
      src: '/js/formbricks-loader.js',
      async: true,
    },
  ],

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
          web3rpcKaia: {
            // template: "api.mustache",
            specPath: "./web3rpc/yaml/web3rpc-kaia.yaml",
            outputDir: "docs/references/json-rpc/kaia",
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
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects,
        createRedirects, // dynamic folder-wide redirects
      },
    ],
    [
      require.resolve("./plugins/copy-page-button-extension"),
      {
        llmsTxtUrl: "https://docs.kaia.io/llms.txt",
      },
    ],
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
      algolia: process.env.ALGOLIA_APP_ID
        ? {
            contextualSearch: true,
            appId: process.env.ALGOLIA_APP_ID,
            apiKey: process.env.ALGOLIA_API_KEY,
            indexName: 'klaytn',
            askAi: {
              indexName: 'kaia-docs-md-index',
              appId: process.env.ALGOLIA_APP_ID,
              apiKey: process.env.ALGOLIA_API_KEY,
              assistantId: process.env.ALGOLIA_ASSISTANT_ID,
            }
          }
        : undefined,
     /**announcementBar: {
        id: 'kaiascope_termination',
        content: '<div style="font-size: 15px; font-weight: bold;">📢 Urgent: Kaiascope will be discontinued on July 2, 2025. Please switch to <a target="_blank" href="https://kaiascan.io/">KaiaScan</a> immediately as the main block explorer for the Kaia blockchain. 🙏🏻</div>',
        backgroundColor: '#abd908',
        textColor: '#191919',
        isCloseable: true,
      },*/
      navbar: {
        title: 'Kaia Docs',
        logo: {
          alt: 'Kaia Logo',
          src: 'img/kaia_logo_L.svg',
          srcDark: 'img/kaia_logo_D.svg',
          width: 150,
        },
        items: [
          {
            type: 'dropdown',
            to: "build",
            position: 'left',
            sidebarid: 'buildSidebar',
            label: 'Build',
            items: [
              {
                to: "build/get-started",
                label: 'Get Started',
              },
              {
                to: "build/wallets",
                label: 'Wallets',
              },
              {
                to: "build/smart-contracts",
                label: 'Smart Contracts',
              },
              {
                to: "build/tutorials",
                label: 'Tutorials',
              },              
              {
                to: "build/cookbooks",
                label: 'Cookbooks',
              },              
              {
                to: "build/tools",
                label: 'Tools',
              },
            ],
          },
          {
            type: 'dropdown',
            to: "nodes",
            position: 'left',
            sidebarid: 'nodeSidebar',
            label: 'Nodes',
            items: [
              {
                to: "misc/operation",
                label: 'Node Quick Reference',
              },
              {
                to: "nodes/endpoint-node",
                label: 'Endpoint Node',
              },
              {
                to: "nodes/core-cell",
                label: 'Core Cell',
              },
              {
                to: "nodes/service-chain",
                label: 'Service Chain',
              },
              {
                to: "nodes/debugging",
                label: 'Debugging and Diagnostics',
              },
              {
                to: "nodes/downloads",
                label: 'Node Downloads',
              },
            ],
          },
          {
            type: 'dropdown',
            to: "references",
            position: 'left',
            sidebarid: 'refSidebar',
            label: 'References',
            items: [
              {
                to: "references/public-en",
                label: 'Public RPC Endpoints',
              },
              {
                to: "references/json-rpc/references",
                label: 'RPC API References',
              },
              {
                to: "references/sdk",
                label: 'Kaia SDK',
              },
              {
                to: "references/contract-addresses",
                label: 'Contract Addresses',
              },
            ],
          },
          {
            type: 'dropdown',
            to: "learn",
            position: 'left',
            sidebarid: 'learnSidebar',
            label: 'Learn',
            items: [
              {
                to: "learn/why-kaia",
                label: 'Why Kaia',
              },
              {
                to: "learn/accounts",
                label: 'Accounts',
              },
              {
                to: "learn/consensus-mechanism",
                label: 'Consensus Mechanism',
              },
              {
                to: "learn/token-economics/kaia-native-token/",
                label: 'Kaia Native Token',
              },
              {
                to: "learn/token-economics/token-economy",
                label: 'Token Economy',
              },
            ],
          },
          {
            to: "minidapps",
            position: 'left',
            sidebarid: 'miniDappSidebar',
            label: 'Mini DApps',
            items: [
              {
                to: "minidapps/unity/quick-start",
                label: 'LINE Mini DApp with Unity',
              },
              {
                to: "minidapps/cocos-creator",
                label: 'LINE Mini DApp with Cocos',
              },
              {
                to: "minidapps/survey-minidapp/intro",
                label: 'Survey Mini DApp',
              },
            ],
          },
/*          {
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
          },*/
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr style="margin: 0.3rem 0;">',
              },
              {
                href: 'https://github.com/kaiachain/kaia-docs/blob/main/CONTRIBUTING.md#content-translation',
                label: 'Help Us Translate',
              },
            ],
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
          codeSampleLanguage: "cURL",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
          codeSampleLanguage: "Python",
          // variant: "requests",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
          codeSampleLanguage: "JavaScript",
          // variant: "axios",
        },
        {
          highlight: "java",
          language: "java",
          logoClass: "java",
          codeSampleLanguage: "Java",
          // variant: "unirest",
        },
      ],
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Sites',
            items: [
              {
                label: 'Kaia Developer Hub',
                href: 'https://developer.kaia.io/',
              },
              {
                label: 'Kaia Square',
                href: 'https://square.kaia.io/Home',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Kaia Developer Forum',
                href: 'https://devforum.kaia.io/',
              },
              {
                label: 'Medium',
                href: 'https://medium.com/kaiachain',
              },
              {
                label: 'X (formerly Twitter)',
                href: 'https://x.com/KaiaChain',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'KIPs',
                href: 'https://kips.kaia.io/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/kaiachain',
              },
              {
                label: 'White Paper',
                href: 'https://docs.kaia.io/kaiatech/kaia-white-paper/',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Terms of Use',
                href: 'https://docs.kaia.io/misc/terms-of-use/',
              },
              {
                label: 'Open Source',
                href: 'https://docs.kaia.io/misc/opensource/',
              },
            ],
          },
        ],
        copyright: `© Kaia DLT Foundation ${new Date().getFullYear()}. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
      }
    }),

  customFields: {
    projectId: process.env.FEEDBACK_PROJECT_ID || null,
    contentSetId: process.env.RATING_CONTENT_SET_ID || null,
  },
}

module.exports = config
