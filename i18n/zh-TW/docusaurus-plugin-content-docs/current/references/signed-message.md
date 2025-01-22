# 簽名電文標準

錢包私鑰主要用於簽署交易，但同一密鑰也可用於簽署任何應用程序特定的信息。 用戶可以使用簽名信息對操作進行加密授權。 這些鏈外簽名可以節省氣體，減少區塊鏈上的交易次數。

信息簽名有多種技術方法或標準。 當然，數字簽名是 ECDSA 的基本功能。 儘管如此，為了將信息簽名與事務簽名分開，並提高應用程序之間的互操作性，還是制定了一些標準。 如果沒有簽名標準，報文簽名功能就可以簽署任意哈希值，這樣用戶就會簽署偽裝成報文的惡意交易哈希值。 為防止這種情況發生，信息簽名標準會修改信息，使簽名不能用於其他目的。

不同的錢包和 SDK 支持這些標準的範圍各不相同，因此您應選擇適合自己應用的方法。

## 簽署原始信息

按原樣簽署信息是最簡單的方法。 由於上述原因，這種方法風險很大，如今已很少使用。

在生態系統工具中，MetaMask 支持在用戶明確同意後通過 `eth_sign` 方法進行原始信息簽名。 保留該功能只是為了向後兼容，不得在新項目中使用。 值得一讀的文章 [什麼是 "eth sign"，為什麼會有風險？](https://support.metamask.io/privacy-and-security/what-is-eth_sign-and-why-is-it-a-risk/)

```js
window.ethereum.request({ method: "eth_requestAccounts" })
window.ethereum.request({ method："eth_sign", params：["0xbC7d1aBe33E6EC19cA873A3042A4DCF49149BC7A", "0x00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff"]}).then(console.log)
```

## KIP-97 Klaytn 簽名信息

一些 Kaia 節點和 SDK 提供了一種方法，在簽署消息之前在消息前加上`"\x19Klaytn Signed Message：\n" + len(message)` 前綴。 詳情請參閱 [KIP-97](https://kips.kaia.io/KIPs/kip-97)。 使用 Klaytn- 前綴可以減少跨鏈的簽名重放，但僅靠前綴並不能完全防止重放攻擊。 應用程序必須採用重放保護機制，包括隨機挑戰或時間戳，以抵禦應用程序內的重放攻擊。

支持 KIP-97 簽名的有：

- Kaia 錢包 [`klay_sign`](https://docs.kaiawallet.io/api_reference/caver_methods#caverklaysign) 方法
- caver-js [`keyring.signMessage`](../sdk/caver-js/api/caver-wallet/keyring) 和 [`utils.recover`](../sdk/caver-js/api/caver.utils) 方法
- caver-java [`AbstractKeyring.signMessage​`](https://javadoc.io/doc/com.klaytn.caver/core/latest/com/klaytn/caver/wallet/keyring/AbstractKeyring.html) and [`Utils.recover`](https://javadoc.io/doc/com.klaytn.caver/core/latest/com/klaytn/caver/utils/Utils.html) methods
- 在 Kaia 節點 v1.0.0 之前，[`eth_sign`](../json-rpc/eth/sign)、[`kaia_sign`](../json-rpc/kaia/sign)、[`personal_sign`](../json-rpc/personal/sign) [`personal_ecRecover`](../json-rpc/personal/ec-recover) RPCs
- 在所有版本的 Kaia 節點中，[`kaia_recoverFromMessage`](../json-rpc/kaia/recover-from-message) RPC

以 Kaia 錢包為例：

```js
window.klaytn.request({ method: "eth_requestAccounts" })
window.klaytn.request({ method: "klay_sign", params: ["0xbC7d1aBe33E6EC19cA873A3042A4DCF49149BC7A", "0x61626364"] }).then(console.log)

0x90824271750d7a09f90a76b6f8ec1e5e2afd31790fea9f43e26c120fef3152be46ad09c76f87bd6c495859fa37127754f1f0780180df53eda80034dac036b8d31b
```

RPC 示例：

```js
kaia.recoverFromMessage('0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a', '0x61626364','0x90824271750d7a09f90a76b6f8ec1e5e2afd31790fea9f43e26c120fef3152be46ad09c76f87bd6c495859fa37127754f1f0780180df53eda80034dac036b8d31b', 'latest')

"0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a"
```

## EIP-191 以太坊簽名消息

在以太坊和一些 EVM 鏈中，廣泛使用的做法是在消息前加上`"\x19Ethereum Signed Message：\n" + len(message)` 前綴。 詳情請參閱 [EIP-191](https://eips.ethereum.org/EIPS/eip-191)。 Kaia 節點和 SDK 支持此功能。 與 KIP-97 一樣，EIP-191 也要求應用程序實施重放保護機制。 不過，使用 EIP-191 可確保與其他生態系統工具兼容，並簡化信息處理邏輯，而無需 EIP/KIP 分支。

支持 EIP-191 簽名的有：

- 以太坊錢包（如 MetaMask）
- 以太坊 SDK（etherthers.js、web3.js、web3j、web3py、viem 等）
- [kaia-sdk](https://github.com/kaiachain/kaia-sdk)套件（etheres-ext、web3js-ext、web3j-ext、web3py-ext），因為它們繼承了各自以太坊 SDK 的消息簽名功能（[參見文檔](../sdk)）。
- 在自 v1.0.1 起的 Kaia 節點中，[`eth_sign`](../json-rpc/eth/sign)、[`kaia_sign`](../json-rpc/kaia/sign)、[`personal_sign`](../json-rpc/personal/sign) [`personal_ec-Recover`](../json-rpc/personal/ec-recover)RPCs。
- 在所有版本的 Kaia 節點中，[`kaia_recoverFromMessage`](../json-rpc/kaia/recover-from-message) RPC

ethers.js 示例：

```js
const wallet = new ethers.Wallet("0x6397f5bfcef382017268d21294aed3b82d479b67323f94f7065d92a43643f20f");
await wallet.signMessage("abcd");

'0xe67ddbb12ad7c85a28b082bb3f159e637229454d34824bd96c0df38e49bf92d42167ffba7565855585de0c32407b0622b0b66fdfe7bd6566d4a19ca40b39ec631b'
```

RPC 示例：

```js
personal.importRawKey('6397f5bfcef382017268d21294aed3b82d479b67323f94f7065d92a43643f20f', 'pass')
personal.unlockAccount('0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a', 'pass')
personal.sign('0x61626364', '0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a', 'pass')

"0xe67ddbb12ad7c85a28b082bb3f159e637229454d34824bd96c0df38e49bf92d42167ffba7565855585de0c32407b0622b0b66fdfe7bd6566d4a19ca40b39ec631b"
```

```js
kaia.recoverFromMessage('0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a', '0x61626364','0xe67ddbb12ad7c85a28b082bb3f159e637229454d34824bd96c0df38e49bf92d42167ffba7565855585de0c32407b0622b0b66fdfe7bd6566d4a19ca40b39ec631b', 'latest')

"0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a"
```

## EIP-712 類型化結構數據

EIP-191 和 KIP-97 是簽署單個字符串的標準，而 EIP-712 則是簽署 JSON 格式結構的應用程序數據的標準。 這種格式更便於人類閱讀，在 EVM 上處理也更有效率。 詳情請參閱 [EIP-712](https://eips.ethereum.org/EIPS/eip-712)。 請注意，該標準無法完全防止重放攻擊。 與其他標準一樣，應用程序必須注意重放保護機制。 您可以在這裡[here](https://docs.metamask.io/wallet/concepts/signing-methods/)找到更多關於應用程序編程接口的信息，如`eth_signTypedData_v1`、`eth_signTypedData_v3`和`eth_signTypedData_v4`。

支持 EIP-712 簽名的有：

- 以太坊錢包（如 MetaMask）
- Kaia 錢包

以 Kaia 錢包為例：

```js
const data = '{"domain":{"chainId":1,"name":"Ether Mail","verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC","version":"1"},"message":{"contents":"Hello, Bob!","attachedMoneyInEth":4.2,"from":{"name":"Cow","wallets":["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"]},"to":[{"name":"Bob","wallets":["0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB","0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57","0xB0B0b0b0b0b0B000000000000000000000000000"]}]},"primaryType":"Mail","types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Group":[{"name":"name","type":"string"},{"name":"members","type":"Person[]"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person[]"},{"name":"contents","type":"string"}],"Person":[{"name":"name","type":"string"},{"name":"wallets","type":"address[]"}]}}';
window.klaytn.request({ method: "eth_signTypedData_v4", params: ["0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a", data] })
```

請參閱 [此處](https://docs.metamask.io/wallet/how-to/sign-data/)，瞭解示例的構建過程。
