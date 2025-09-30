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
  'misc/kaia-history',
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
        { type: 'doc', label: 'Step 1: Foundation Setup', id: 'build/get-started/foundation-setup' },
        { type: 'doc', label: 'Step 2: Set up Account and Networks', id: 'build/get-started/wallet-config-get-started' },
        { type: 'doc', label: 'Step 3: Get KAIA', id: 'build/get-started/getting-kaia' },
        { type: 'doc', label: 'Step 4: Deploy Hello World Contract', id: 'build/get-started/kaiagreeter-get-started' },
        { type: 'doc', label: 'Step 5: Deploy your First Token Contract', id: 'build/get-started/hardhat' },
        { type: 'doc', label: 'Step 6: Build your First dApp on Kaia', id: 'build/get-started/scaffold-eth-get-started' },
        { type: 'doc', label: 'Step 7: Build your Mini dApp on Kaia', id: 'minidapps/minidapps' },
      ],
    },
    {
      type: 'category',
      label: 'Wallets',
      link: { type: 'doc', id: 'build/wallets/wallets' },
      items: [
        'build/wallets/overview/kaia-wallet',
        {
          type: 'category',
          label: 'Wallet Configuration',
          items: [
            'build/wallets/wallet-config/configure-wallet-for-kaia-networks',
            'build/wallets/wallet-config/create-and-manage-wallets-securely',
          ],
        },
        {
          type: 'category',
          label: 'Wallet Operations',
          items: [
            'build/wallets/wallet-ops/send-tokens-from-your-kaia-compatible-wallet',
            'build/wallets/wallet-ops/estimate-gaslimits-prices-on-kaia-wallet-and-metamask',
          ],
        },
        {
          type: 'category',
          label: 'dApp Integration',
          items: [
            'build/wallets/dapp-integration/integrate-dapp-with-kaiawallet',
            'build/wallets/dapp-integration/how-to-integrate-fee-delegation-features-into-wallets',
          ],
        },
        {
          type: 'category',
          label: 'Wallet Libraries',
          link: {
            type: 'doc',
            id: 'build/wallets/wallet-libraries/wallet-libraries',
          },
          items: [
            'build/wallets/wallet-libraries/web3Auth',
            'build/wallets/wallet-libraries/reown',
            'build/wallets/wallet-libraries/web3Onboard',
            'build/wallets/wallet-libraries/particle',
            'build/wallets/wallet-libraries/privy',
          ],
        },
        {
          type: 'category',
          label: 'Hardware Wallets',
          items: [
            'build/wallets/hardware-wallets/dcent',
            'build/wallets/hardware-wallets/safepal-s1',
          ],
        },
        {
          type: 'category',
          label: 'Kaia Safe',
          link: {
            type: 'doc',
            id: 'build/wallets/kaia-safe/kaia-safe',
          },
          items: [
            'build/wallets/kaia-safe/overview',
            'build/wallets/kaia-safe/use-kaia-safe',
            'build/wallets/kaia-safe/contract-interaction',
            'build/wallets/kaia-safe/tx-builder',
            'build/wallets/kaia-safe/csv-airdrop',
            'build/wallets/kaia-safe/faqs',
            'build/wallets/kaia-safe/kaia-safe-api-kit',
          ],
        },
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
        {
          type: 'category',
          label: 'Fundamentals',
          items: [
            'build/smart-contracts/fundamentals/solidity-smart-contract-language',
            'build/smart-contracts/fundamentals/porting-ethereum-contract',
            'build/smart-contracts/fundamentals/best-practices-for-smart-contract-security',
          ],
        },
        {
          type: 'category',
          label: 'Tools',
          items: [
            'build/smart-contracts/tools/ide-and-tools',
            'build/smart-contracts/tools/kaia-contracts-wizard',
          ],
        },
        {
          type: 'category',
          label: 'Token Development',
          items: [
            'build/smart-contracts/token-development/token-standard',
            'build/smart-contracts/token-development/canonical-wkaia',
            {
              type: 'category',
              label: 'Sample Contracts',
              link: {
                type: 'doc',
                id: 'build/smart-contracts/token-development/samples/samples',
              },
              items: [
                'build/smart-contracts/token-development/samples/kaiagreeter',
                'build/smart-contracts/token-development/samples/erc-20',
                'build/smart-contracts/token-development/samples/erc-721',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Deployment & Verification',
          items: [
            {
              type: 'category',
              label: 'Deploy Smart Contracts',
              items: [
                'build/smart-contracts/deployment-and-verification/deploy/foundry',
                'build/smart-contracts/deployment-and-verification/deploy/thirdweb',
                'build/smart-contracts/deployment-and-verification/deploy/private-network',
              ],
            },
            {
              type: 'category',
              label: 'Verify Smart Contracts',
              items: [
                'build/smart-contracts/deployment-and-verification/verify/block-explorers',
                'build/smart-contracts/deployment-and-verification/verify/foundry',
                'build/smart-contracts/deployment-and-verification/verify/hardhat',
                'build/smart-contracts/deployment-and-verification/verify/sourcify',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      link: { type: 'doc', id: 'build/tutorials/tutorials' },
      items: [
        {
          type: 'category',
          label: 'Integrate Gas Abstraction (GA)',
          link: { type: 'doc', id: 'build/tutorials/ga-tutorial/ga-tutorial' },
          items: [
            'build/tutorials/ga-tutorial/ga-intro',
            'build/tutorials/ga-tutorial/ga-inside',
            'build/tutorials/ga-tutorial/ga-tokens',
            'build/tutorials/ga-tutorial/ga-integration',
            'build/tutorials/ga-tutorial/ga-sdk',
            'build/tutorials/ga-tutorial/ga-advanced',
          ],
        },        
        'build/tutorials/integrate-fee-delegation-service',
        'build/tutorials/how-to-send-usdt-tokens-using-kaia-sdk',
        'build/tutorials/fee-delegation-example',
        'build/tutorials/scaffold-eth',
        'build/tutorials/buy-me-a-coffee',
        'build/tutorials/connecting-remix',
        'build/tutorials/migrating-ethereum-app-to-kaia',
      ],
    },
    {
      type: 'category',
      label: 'Cookbooks',
      link: { type: 'doc', id: 'build/cookbooks/cookbooks' },
      items: [
        'build/cookbooks/wallet-config-cookbook',
		    'build/cookbooks/secure-wallet-cookbook',
        'build/cookbooks/send-tokens-cookbook',
        'build/cookbooks/estimate-gaslimits-prices-cookbook',
        'build/cookbooks/how-to-optimize-gas-fees',
        'build/cookbooks/integrate-fee-delegation-cookbook',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      link: { type: 'doc', id: 'build/best-practices/best-practices' },
      items: [
        'build/best-practices/smart-contract-security-best-practices',
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
          label: 'Oracles',
          link: { type: 'doc', id: 'build/tools/oracles/oracles' },
          items: [
            'build/tools/oracles/orakl-network',
            'build/tools/oracles/pyth-network',
            'build/tools/oracles/supraoracles',
            'build/tools/oracles/witnet',
            { type: 'doc', label: 'Proof of Play vRNG', id: 'build/tools/oracles/vrng-pop' },
          ],
        },
              {
          type: 'category',
          label: 'Gaming SDKs',
          link: { type: 'doc', id: 'build/tools/gaming-sdks/gaming-sdks' },
          items: [
            'build/tools/gaming-sdks/chainsafe',
            'build/tools/gaming-sdks/reown',
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
            'build/tools/cross-chain/chainlink-ccip',
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
      link: { type: 'doc', id: 'nodes/debugging/debugging' },
      items: [
        'nodes/debugging/monitoring-setup',
        'nodes/debugging/node-profiling',
        'nodes/debugging/node-log',
        'nodes/debugging/analytics-tool',
      ],
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
    'minidapps/minidapps',
    {
      type: 'category',
      label: 'LINE Mini DApp with Unity',
      link: { type: 'doc', id: 'minidapps/unity/unity' },
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
