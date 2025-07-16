const commonSidebar = [
  {
    type: 'html',
    value: '<span class="sidebar-divider" />',
  },
  {
    type: 'category',
    label: 'Node Quick Reference',
    link: { type: 'doc', id: 'misc/operation/operation' },
    items: [
      'misc/operation/configuration',
      'misc/operation/log-management',
      'misc/operation/kaia-command',
      'misc/operation/troubleshooting',
      'misc/operation/chaindata-snapshot',
      'misc/operation/upstream-en',
      'misc/operation/node-pruning',
      'misc/operation/aws-ami',
    ],
  },
  //  'misc/klaytn-history',
  {
    type: 'category',
    label: 'Finschia to Kaia',
    link: { type: 'doc', id: 'misc/kaia-transition/kaia-transition' },
    items: [
      'misc/kaia-transition/faq-chain-transition',
      'misc/kaia-transition/kaiabridge',
      'misc/kaia-transition/finschia',
    ],
  },
  'misc/glossary',
  'misc/faq',
  'misc/internationalization',
  'misc/brand',
  {
    type: 'link',
    label: 'Docs Updates',
    href: '/misc/updates',
  },
]

const sidebars = {
  learnSidebar: [
    'learn/learn',
    'learn/why-kaia',
    'learn/kaia-vs-ethereum',
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'learn/accounts',
        'learn/transactions',
        {
          type: 'category',
          label: 'Transaction Fees',
          link: { type: 'doc', id: 'learn/transaction-fees/transaction-fees' },
          items: [
            'learn/transaction-fees/intrinsic-gas',
            'learn/transaction-fees/execution-gas',
          ],
        },
        {
          type: 'category',
          label: 'Smart Contracts',
          link: { type: 'doc', id: 'learn/smart-contracts/smart-contracts' },
          items: ['learn/smart-contracts/precompiled-contracts'],
        },
        'learn/consensus-mechanism',
        'learn/kni',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      items: [
        {
          type: 'category',
          label: 'Transaction Execution',
          link: { type: 'doc', id: 'learn/computation/computation' },
          items: [
            'learn/computation/execution-model',
            'learn/computation/computation-cost',
            'learn/computation/debug-tracing',
          ],
        },
        {
          type: 'category',
          label: 'Data Management',
          link: { type: 'doc', id: 'learn/storage/storage' },
          items: ['learn/storage/block-sync', 'learn/storage/state-pruning'],
        },
        'learn/scaling-solutions',
      ],
    },

    {
      type: 'category',
      label: 'Token Economics',
      link: { type: 'doc', id: 'learn/token-economics/token-economics' },
      items: [
        'learn/token-economics/kaia-native-token',
        'learn/token-economics/token-economy',
      ],
    },
    {
      type: 'category',
      label: 'Governance',
      link: { type: 'doc', id: 'learn/governance/governance' },
      items: ['learn/governance/governance-by-kip'],
    },
    ...commonSidebar,
  ],
  buildSidebar: [
    'build/build',
    {
      type: 'category',
      label: 'Get Started',
      link: { type: 'doc', id: 'build/get-started/get-started' },
      items: [
        'build/get-started/before-you-start',
        'build/get-started/hardhat',
        {
          type: 'category',
          label: 'Account Basics',
          link: { type: 'doc', id: 'build/get-started/account/account' },
          items: [
            'build/get-started/account/creating-accounts',
            'build/get-started/account/managing-accounts',
          ],
        },
        'build/get-started/getting-kaia',
      ],
    },
    {
      type: 'category',
      label: 'Transactions',
      link: { type: 'doc', id: 'build/transactions/transactions' },
      items: [
        'build/transactions/basic',
        'build/transactions/ethereum',
        'build/transactions/fee-delegation',
        'build/transactions/partial-fee-delegation',
      ],
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      link: { type: 'doc', id: 'build/smart-contracts/smart-contracts' },
      items: [
        'build/smart-contracts/solidity-smart-contract-language',
        'build/smart-contracts/ide-and-tools/ide-and-tools',
        {
          type: 'category',
          label: 'Deploy Smart Contracts',
          link: { type: 'doc', id: 'build/smart-contracts/deploy/deploy' },
          items: [
            'build/smart-contracts/deploy/foundry',
            'build/smart-contracts/deploy/thirdweb',
            'build/smart-contracts/deploy/private-network',
          ],
        },
        {
          type: 'category',
          label: 'Verify Smart Contracts',
          items: [
            'build/smart-contracts/verify/block-explorers',
            'build/smart-contracts/verify/foundry',
            'build/smart-contracts/verify/hardhat',
            'build/smart-contracts/verify/sourcify',
          ],
        },
        {
          type: 'category',
          label: 'Sample Contracts',
          link: { type: 'doc', id: 'build/smart-contracts/samples/samples' },
          items: [
            'build/smart-contracts/samples/kaiagreeter',
            'build/smart-contracts/samples/erc-20',
            'build/smart-contracts/samples/erc-721',
          ],
        },
        'build/smart-contracts/token-standard',
        'build/smart-contracts/porting-ethereum-contract',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      link: { type: 'doc', id: 'build/tutorials/tutorials' },
      items: [
        'build/tutorials/fee-delegation-example',
        'build/tutorials/fee-delegation-wallet-integration',
        'build/tutorials/scaffold-eth',
        'build/tutorials/buy-me-a-coffee',
        'build/tutorials/connecting-metamask',
        'build/tutorials/connecting-remix',
        'build/tutorials/kaia-wallet-dapp-integration',
        'build/tutorials/migrating-ethereum-app-to-kaia',
      ],
    },
    {
      type: 'category',
      link: { type: 'doc', id: 'build/tools/tools' },
      label: 'Tools',
      items: [
        'build/tools/kaia-online-toolkit',
             {
          type: 'category',
          label: 'Kaia Agent Kit',
          link: { type: 'doc', id: 'build/tools/kaia-agentkit/kaia-agentkit' },
          items: [
            'build/tools/kaia-agentkit/vercel-ai-guide',
            'build/tools/kaia-agentkit/eliza',
            'build/tools/kaia-agentkit/langchain',
            'build/tools/kaia-agentkit/mcp',

          ],
        },
        {
          type: 'category',
          label: 'Wallets',
          link: { type: 'doc', id: 'build/tools/wallets/wallets' },
          items: [
            {
              type: 'category',
              label: 'Hardware Wallets',
              items: [
                'build/tools/wallets/hardware-wallets/dcent',
                'build/tools/wallets/hardware-wallets/safepal-s1',
              ],
            },
            {
              type: 'category',
              label: 'Kaia Safe',
              link: {
                type: 'doc',
                id: 'build/tools/wallets/kaia-safe/kaia-safe',
              },
              items: [
                'build/tools/wallets/kaia-safe/overview',
                'build/tools/wallets/kaia-safe/use-kaia-safe',
                'build/tools/wallets/kaia-safe/contract-interaction',
                'build/tools/wallets/kaia-safe/tx-builder',
                'build/tools/wallets/kaia-safe/csv-airdrop',
                'build/tools/wallets/kaia-safe/faqs',
                'build/tools/wallets/kaia-safe/kaia-safe-api-kit',
              ],
            },
            'build/tools/wallets/kaia-wallet',
            {
              type: 'category',
              label: 'Wallet Libraries',
              link: {
                type: 'doc',
                id: 'build/tools/wallets/wallet-libraries/wallet-libraries',
              },
              items: [
                'build/tools/wallets/wallet-libraries/web3Auth',
                'build/tools/wallets/wallet-libraries/web3Modal',
                'build/tools/wallets/wallet-libraries/web3Onboard',
                'build/tools/wallets/wallet-libraries/particle',
                'build/tools/wallets/wallet-libraries/privy',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Oracles',
          link: { type: 'doc', id: 'build/tools/oracles/oracles' },
          items: [
            'build/tools/oracles/orakl-network',
            'build/tools/oracles/pyth-network',
            'build/tools/oracles/supraoracles',
            'build/tools/oracles/witnet',
          ],
        },
        {
          type: 'category',
          label: 'Indexers',
          link: { type: 'doc', id: 'build/tools/indexers/indexers' },
          items: [
            'build/tools/indexers/thegraph',
            'build/tools/indexers/subquery',
          ],
        },
        {
          type: 'category',
          label: 'Cross-chain',
          link: { type: 'doc', id: 'build/tools/cross-chain/cross-chain' },
          items: [
            'build/tools/cross-chain/layerzero',
            'build/tools/cross-chain/wormhole',
            'build/tools/cross-chain/stargate',
          ],
        },
        {
          type: 'category',
          label: 'Block Explorers',
          link: {
            type: 'doc',
            id: 'build/tools/block-explorers/block-explorers',
          },
          items: [
            'build/tools/block-explorers/kaiascan',
            'build/tools/block-explorers/okx-kaia-explorer',
          ],
        },
        {
          type: 'category',
          label: 'Token Management',
          link: {
            type: 'doc',
            id: 'build/tools/token-management/token-management',
          },
          items: [
            {
              type: 'category',
              label: 'Team Finance',
              link: {
                type: 'doc',
                id: 'build/tools/token-management/team-finance/team-finance',
              },
              items: [
                'build/tools/token-management/team-finance/liquidity-locks',
                'build/tools/token-management/team-finance/team-token-locks',
                'build/tools/token-management/team-finance/token-vesting',
                'build/tools/token-management/team-finance/token-creation',
                'build/tools/token-management/team-finance/nft-locks',
                'build/tools/token-management/team-finance/multisender',
              ],
            },
          ],
        },
        'build/tools/kaia-contracts-wizard',
      ],
    },
    ...commonSidebar,
  ],
  nodeSidebar: [
    'nodes/nodes',
    {
      type: 'category',
      label: 'Endpoint Node',
      link: { type: 'doc', id: 'nodes/endpoint-node/endpoint-node' },
      items: [
        'nodes/endpoint-node/system-requirements',
        'nodes/endpoint-node/install-endpoint-nodes',
        'nodes/endpoint-node/docker-setup',
        'nodes/endpoint-node/ken-cli-commands',
        'nodes/endpoint-node/json-rpc-apis',
      ],
    },
    {
      type: 'category',
      label: 'Core Cell',
      link: { type: 'doc', id: 'nodes/core-cell/core-cell' },
      items: [
        'nodes/core-cell/system-requirements',
        'nodes/core-cell/network-configuration',
        {
          type: 'category',
          label: 'Install Core Cell',
          link: { type: 'doc', id: 'nodes/core-cell/install/install' },
          items: [
            'nodes/core-cell/install/before-you-install',
            'nodes/core-cell/install/install-consensus-nodes',
            'nodes/core-cell/install/install-proxy-nodes',
          ],
        },
        'nodes/core-cell/monitoring-setup',
        'nodes/core-cell/h-a-setup',
        'nodes/core-cell/node-security',
      ],
    },
    {
      type: 'category',
      label: 'Service Chain',
      link: { type: 'doc', id: 'nodes/service-chain/service-chain' },
      items: [
        'nodes/service-chain/system-requirements',
        {
          type: 'category',
          label: 'Quick Start',
          link: {
            type: 'doc',
            id: 'nodes/service-chain/quick-start/quick-start',
          },
          items: [
            'nodes/service-chain/quick-start/4nodes-setup-guide',
            'nodes/service-chain/quick-start/en-scn-connection',
            'nodes/service-chain/quick-start/value-transfer',
            'nodes/service-chain/quick-start/ha-for-sc',
            'nodes/service-chain/quick-start/nested-sc',
            'nodes/service-chain/quick-start/value-transfer-between-sibling',
          ],
        },
        'nodes/service-chain/install-service-chain',
        {
          type: 'category',
          label: 'Configure Service Chain',
          link: { type: 'doc', id: 'nodes/service-chain/configure/configure' },
          items: [
            'nodes/service-chain/configure/bridge-configuration',
            'nodes/service-chain/configure/anchoring',
            'nodes/service-chain/configure/kas-anchoring',
            'nodes/service-chain/configure/value-transfer',
            'nodes/service-chain/configure/configuration-files',
            'nodes/service-chain/configure/genesis',
          ],
        },
        'nodes/service-chain/upgrade-and-hard-fork',
      ],
    },
    {
      type: 'category',
      label: 'Debugging and Diagnostics',
      link: { type: 'doc', id: 'nodes/debugging/debugging'},
      items: [
        'nodes/debugging/monitoring-setup',
        'nodes/debugging/node-profiling',
        'nodes/debugging/node-log',
        'nodes/debugging/analytics-tool',
      ]
    },
    {
      type: 'category',
      label: 'Node Package Downloads',
      link: { type: 'doc', id: 'nodes/downloads/downloads' },
      items: [],
    },
    ...commonSidebar,
  ],
  refSidebar: [
    'references/references',
    'references/public-en',
    {
      type: 'category',
      label: 'RPC API Reference',
      link: { type: 'doc', id: 'references/json-rpc/references' },
      items: [
        require('./web3rpc/web3rpc-sidebar').kaiaSidebarFormatted,
        require('./web3rpc/web3rpc-sidebar').klaySidebarFormatted,
        require('./web3rpc/web3rpc-sidebar').ethSidebarFormatted,
        require('./web3rpc/web3rpc-sidebar').governanceSidebarFormatted,
        require('./web3rpc/web3rpc-sidebar').adminSidebarFormatted,
        require('./web3rpc/web3rpc-sidebar').netSidebarFormatted,
        require('./web3rpc/web3rpc-sidebar').txpoolSidebarFormatted,
        require('./web3rpc/web3rpc-sidebar').personalSidebarFormatted,
        require('./web3rpc/web3rpc-sidebar').debugSidebarFormatted,
      ],
    },
    {
      type: 'category',
      label: 'SDKs and Libraries',
      link: { type: 'doc', id: 'references/sdk/sdk' },
      items: [
        require('./docs/references/sdk/ethers-ext/sidebar').sidebar,
        require('./docs/references/sdk/ethers-ext-prior-v1-0-1/sidebar')
          .sidebar,
        require('./docs/references/sdk/web3js-ext/sidebar').sidebar,
        require('./docs/references/sdk/viem-ext/sidebar').sidebar,
        require('./docs/references/sdk/web3j-ext/sidebar').sidebar,
        require('./docs/references/sdk/web3py-ext/sidebar').sidebar,
        'references/sdk/viem/viem',
        'references/sdk/caver-js/caver-js',
        'references/sdk/caver-java/caver-java',
      ],
    },
    'references/signed-message',
    'references/transaction-error-codes',
    'references/contract-addresses',
    ...commonSidebar,
  ],
  miniDappSidebar: [
    {
      type: 'category',
      label: 'LINE Mini DApp with Unity',
      link: { type: 'doc', id: 'minidapps/minidapps' },
      items: [
        'minidapps/unity/quick-start',
        'minidapps/unity/building-unity-ui',
        'minidapps/unity/integrate-web3-unity',
        'minidapps/unity/setting-build-template',
        'minidapps/unity/convert-unity-liff',
      ],
    },
    {
      type: 'category',
      label: 'LINE Mini DApp with Cocos',
      link: { type: 'doc', id: 'minidapps/cocos-creator/cocos-creator' },
      items: [
        'minidapps/cocos-creator/quick-start',
        'minidapps/cocos-creator/build-ui',
        'minidapps/cocos-creator/integrating-web3',
        'minidapps/cocos-creator/configure-build-template',
        'minidapps/cocos-creator/convert-to-liff',
      ],
    },
    {
      type: 'category',
      label: 'Survey Mini DApp',
      link: { type: 'doc', id: 'minidapps/survey-minidapp/intro' },
      items: [
        'minidapps/survey-minidapp/intro',
        'minidapps/survey-minidapp/build-smart-contract',
        'minidapps/survey-minidapp/integrating-frontend',
        'minidapps/survey-minidapp/api-reference',
      ],
    },
    ...commonSidebar,
  ],
}

module.exports = sidebars