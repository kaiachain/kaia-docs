export enum RoutePath {
  Home = '/',

  Web3jsExt_Account_Legacy = '/web3js-ext/account/legacy',
  Web3jsExt_Account_MultiSig = '/web3js-ext/account/multisig',

  Web3jsExt_SignMsg_Legacy = '/web3js-ext/sign/legacy',
}

export const getPath = ({
  module,
  route,
}: {
  module: `/${string}`
  route: RoutePath
}): string => {
  return `https://codesandbox.io/embed/47sz67?module=${encodeURIComponent(
    module
  )}&initialpath=${encodeURIComponent(route)}`
}
