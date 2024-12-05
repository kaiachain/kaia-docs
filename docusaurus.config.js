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
/**      announcementBar: {
        id: 'docs_archive',
        content: '<div style="font-size: 15px">📢 The Finschia and Klaytn blockchains have transitioned to the Kaia blockchain (<a target="_blank" href="https://docs.kaia.io/misc/kaia-transition/faq-chain-transition/">Transition FAQ</a>). For node operators, see <b><a target="_blank" href="https://docs.kaia.io/references/public-en/#public-json-rpc-endpoints-1">Old Endpoints Termination Notice</a></b> first! 🙏🏻</div>',
        backgroundColor: '#789806',
        textColor: '#FFFFFF',
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
            to: "learn",
            position: 'left',
            sidebarid: 'learnSidebar',
            label: 'Learn',
          },
          {
            to: "build",
            position: 'left',
            sidebarid: 'buildSidebar',
            label: 'Build',
          },
          {
            to: "nodes",
            position: 'left',
            sidebarid: 'nodeSidebar',
            label: 'Nodes',
          },
          {
            to: "references",
            position: 'left',
            sidebarid: 'refSidebar',
            label: 'References',
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
                href: 'https://x.com/klaytn_official',
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
