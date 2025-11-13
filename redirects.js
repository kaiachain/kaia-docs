const redirects = [
  { from: '/misc/operation/node-log', to: '/nodes/debugging/node-log' },
  { from: '/misc/operation/monitoring-setup', to: '/nodes/debugging/monitoring-setup' },
  { from: '/misc/operation/node-profiling', to: '/nodes/debugging/node-profiling' },
  { from: '/references/sdk/caver-js/get-started', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/send-transaction', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver.account', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-wallet', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-wallet/keyring', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-transaction', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-transaction/basic', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-transaction/fee-delegation', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-transaction/partial-fee-delegation', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-rpc', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-rpc/governance', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-rpc/klay', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-rpc/net', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver.contract', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver.abi', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-kct', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-kct/kip7', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-kct/kip17', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver-kct/kip37', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver.validator', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver.utils', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-js/api/caver.ipfs', to: '/references/sdk/caver-js' },
  { from: '/references/sdk/caver-java/get-started', to: '/references/sdk/caver-java' },
  { from: '/minidapps/build-unity-app', to: '/minidapps/unity/quick-start' },
  { from: '/minidapps/convert-unity-liff', to: '/minidapps/unity/convert-unity-liff' },
  { from: '/learn/transactions/basic', to: '/build/transactions/basic' },
  { from: '/learn/transactions/ethereum', to: '/build/transactions/ethereum' },
  { from: '/learn/transactions/fee-delegation', to: '/build/transactions/fee-delegation' },
  { from: '/learn/transactions/partial-fee-delegation', to: '/build/transactions/partial-fee-delegation' },
  { from: '/learn/computation/kaia-smart-contract', to: '/learn/smart-contracts' },
  { from: '/learn/computation/precompiled-contracts', to: '/learn/smart-contracts/precompiled-contracts' },
  { from: '/learn/multiport', to: '/learn/scaling-solutions' },
  { from: '/learn/kaia-native-token', to: '/learn/token-economics/kaia-native-token' },
  { from: '/learn/token-economy', to: '/learn/token-economics/token-economy' },
  { from: '/misc/operation/chaindata-change', to: '/misc/operation/chaindata-snapshot' },
  { from: '/misc/operation/chaindata-migration', to: '/misc/operation/node-pruning/#how-to-perform-batch-pruning' },
  { from: '/learn/storage/live-pruning', to: '/learn/storage/storage-optimization/#state-live-pruning' },
  { from: '/learn/storage/state-migration', to: '/learn/storage/storage-optimization/#state-batch-pruning-state-migration' },
  { from: '/learn/storage/upstream-en', to: '/misc/operation/upstream-en' },
  { from: '/learn/storage/chaindata-snapshot', to: '/misc/operation/chaindata-snapshot' },
  { from: '/build/smart-contracts/deploy/ken', to: '/build/smart-contracts/deployment-and-verification/deploy/private-network' },
  { from: '/references/service-providers/public-en', to: '/references/public-en' },
  { from: '/misc/finschia', to: '/misc/kaia-transition/finschia' },
  { from: '/kaiatech', to: '/kaiatech/kaia-white-paper' },
  { from: '/build/smart-contracts/porting-ethereum-contract', to: '/build/smart-contracts/fundamentals/porting-ethereum-contract' },
  { from: '/build/smart-contracts/solidity-smart-contract-language', to: '/build/smart-contracts/fundamentals/solidity-smart-contract-language' },
  { from: '/build/smart-contracts/token-standard', to: '/build/smart-contracts/token-development/token-standard' },
  { from: '/build/smart-contracts/ide-and-tools', to: '/build/smart-contracts/tools/ide-and-tools' },  
  { from: '/build/tools/kaia-contracts-wizard', to: '/build/smart-contracts/tools/kaia-contracts-wizard' },
  { from: '/build/tutorials/fee-delegation-wallet-integration', to: '/build/wallets/dapp-integration/how-to-integrate-fee-delegation-features-into-wallets' },
  { from: '/build/tutorials/kaia-wallet-dapp-integration', to: '/build/wallets/dapp-integration/integrate-dapp-with-kaiawallet' },
  { from: '/build/tools/wallets/kaia-wallet', to: '/build/wallets/overview/kaia-wallet' },
  { from: ['/build/get-started/account', '/build/get-started/account/creating-accounts', '/build/get-started/account/managing-accounts'], to: '/nodes/endpoint-node/ken-cli-commands' },
  { from: '/build/get-started/before-you-start', to: '/build/get-started/foundation-setup' },
  { from: '/learn/storage/state-pruning', to: '/learn/storage/storage-optimization' },
];

// Folder-wide mappings (oldBase -> newBase)
const folderRedirects = [
  ['/build/smart-contracts/deploy', '/build/smart-contracts/deployment-and-verification/deploy'],
  ['/build/smart-contracts/verify', '/build/smart-contracts/deployment-and-verification/verify'],
  ['/build/smart-contracts/samples', '/build/smart-contracts/token-development/samples'],
  ['/build/tools/wallets/hardware-wallets', '/build/wallets/hardware-wallets'],
  ['/build/tools/wallets/kaia-safe', '/build/wallets/kaia-safe'],
  ['/build/tools/wallets/wallet-libraries', '/build/wallets/wallet-libraries'],
];

const stripTrailing = (p) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p);
const addTrailing = (p) => (p.endsWith('/') ? p : `${p}/`);

function createRedirects(existingPath) {
  const froms = [];
  const epNo = stripTrailing(existingPath);

  for (const [oldBase, newBase] of folderRedirects) {
    const oldNo = stripTrailing(oldBase);
    const newNo = stripTrailing(newBase);

    if (epNo === newNo || epNo.startsWith(`${newNo}/`)) {
      const fromNo = epNo.replace(newNo, oldNo);
      const from = existingPath.endsWith('/') ? addTrailing(fromNo) : fromNo;
      froms.push(from);
    }
  }

  return froms.length ? froms : undefined;
}

module.exports = { redirects, createRedirects };