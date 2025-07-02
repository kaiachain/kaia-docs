export enum RoutePath {
  Home = '/',

  // Web3jsExt Routes

  // 1. Account Key
  Web3jsExt_Account_Legacy = '/web3js-ext/account/legacy',
  Web3jsExt_Account_MultiSig = '/web3js-ext/account/multisig',
  Web3jsExt_Account_Public = '/web3js-ext/account/public',
  Web3jsExt_Account_Role = '/web3js-ext/account/role',

  // 2. Sign Message
  Web3jsExt_SignMsg_Legacy = '/web3js-ext/sign/legacy',
  Web3jsExt_SignMsg_MultiSig = '/web3js-ext/sign/multisig',
  Web3jsExt_SignMsg_Public = '/web3js-ext/sign/public',
  Web3jsExt_SignMsg_Role = '/web3js-ext/sign/role',

  // 3. Sign Transaction
  Web3jsExt_SignTx_Legacy = '/web3js-ext/tx/legacy',
  Web3jsExt_SignTx_MultiSig = '/web3js-ext/tx/multisig',
  Web3jsExt_SignTx_Public = '/web3js-ext/tx/public',
  Web3jsExt_SignTx_Role = '/web3js-ext/tx/role',

  // EthersExt Routes

  // 1. Account Key
  EthersExt_Account_Legacy = '/ethers-ext-v6/account/legacy',
  EthersExt_Account_MultiSig = '/ethers-ext-v6/account/multisig',
  EthersExt_Account_Public = '/ethers-ext-v6/account/public',
  EthersExt_Account_Role = '/ethers-ext-v6/account/role',

  // 2. Sign Message
  EthersExt_SignMsg_Legacy = '/ethers-ext-v6/sign/legacy',
  EthersExt_SignMsg_MultiSig = '/ethers-ext-v6/sign/multisig',
  EthersExt_SignMsg_Public = '/ethers-ext-v6/sign/public',
  EthersExt_SignMsg_Role = '/ethers-ext-v6/sign/role',

  // 3. Sign Transaction
  EthersExt_SignTx_Legacy = '/ethers-ext-v6/tx/legacy',
  EthersExt_SignTx_MultiSig = '/ethers-ext-v6/tx/multisig',
  EthersExt_SignTx_Public = '/ethers-ext-v6/tx/public',
  EthersExt_SignTx_Role = '/ethers-ext-v6/tx/role',

  // Viem Ext

  // 1. basic transaction
  ViemExt_Account_Update = "/viem-ext/basic-transaction/AccountUpdate",
  ViemExt_Cancel_Type = "/viem-ext/basic-transaction/CancelType",
  ViemExt_Legacy_Transaction = "/viem-ext/basic-transaction/LegacyTransaction",
  ViemExt_SmartContract_Deploy = "/viem-ext/basic-transaction/SmartContractDeploy",
  ViemExt_SmartContract_Execution = "/viem-ext/basic-transaction/SmartContractExecution",
  ViemExt_Value_Transfer = "/viem-ext/basic-transaction/ValueTransfer",
  ViemExt_Value_Transfer_Memo = "/viem-ext/basic-transaction/ValueTransferMemo",

  // 2.Fee Delegated Transaction
  ViemExt_Fee_Account_Update = "/viem-ext/fee-delegated-transaction/FeeDelegatedAccountUpdate",
  ViemExt_Fee_Cancel_Type = "/viem-ext/fee-delegated-transaction/FeeDelegatedCancelType",
  ViemExt_Fee_SmartContract_Deploy = "/viem-ext/fee-delegated-transaction/FeeDelegatedSmartContractDeploy",
  ViemExt_Fee_SmartContract_Execution = "/viem-ext/fee-delegated-transaction/FeeDelegatedSmartContractExecution",
  ViemExt_Fee_Value_Transfer = "/viem-ext/fee-delegated-transaction/FeeDelegatedValueTransfer",
  ViemExt_Fee_Value_Transfer_Memo = "/viem-ext/fee-delegated-transaction/FeeDelegatedValueTransferMemo",

  // 3.SmartContract
  ViemExt_SmartContract_View = "/viem-ext/smart-contract/smartContractView",
  ViemExt_SmartContract_Write = "/viem-ext/smart-contract/smartContractWrite",
  ViemExt_SmartContract_WriteTxType = "/viem-ext/smart-contract/writeTxType",
  ViemExt_SmartContract_WriteWithFeeDelegation = "/viem-ext/smart-contract/writeWithFeeDelegation",
}

export const getPath = ({
  module,
  route,
}: {
  module: `/${string}`
  route: RoutePath
}): string => {
  return `https://codesandbox.io/embed/j28kts?module=${encodeURIComponent(
    module
  )}&initialpath=${encodeURIComponent(route)}`
}
