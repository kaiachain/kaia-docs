export enum RoutePath {
  Home = '/',

  // account key
  Web3jsExt_Account_Legacy = '/web3js-ext/account/legacy',
  Web3jsExt_Account_MultiSig = '/web3js-ext/account/multisig',
  Web3jsExt_Account_Public = '/web3js-ext/account/public',
  Web3jsExt_Account_Role = "/web3js-ext/account/role",

  // sign message
  Web3jsExt_SignMsg_Legacy = '/web3js-ext/sign/legacy',
  Web3jsExt_SignMsg_MultiSig = '/web3js-ext/sign/multisig',
  Web3jsExt_SignMsg_Public = '/web3js-ext/sign/public',
  Web3jsExt_SignMsg_Role = '/web3js-ext/sign/role',

  // sign stransaction
  Web3jsExt_SignTx_Legacy = '/web3js-ext/tx/legacy',
  Web3jsExt_SignTx_MultiSig = '/web3js-ext/tx/multisig',
  Web3jsExt_SignTx_Public = '/web3js-ext/tx/public',
  Web3jsExt_SignTx_Role = '/web3js-ext/tx/role',
}

export const getPath = ({
  module,
  route,
}: {
  module: `/${string}`
  route: RoutePath
}): string => {
  return `https://codesandbox.io/embed/ldf48w?module=${encodeURIComponent(
    module
  )}&initialpath=${encodeURIComponent(route)}`
}
