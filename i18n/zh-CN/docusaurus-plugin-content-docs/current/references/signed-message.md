# 签名电文标准

钱包私钥主要用于签署交易，但同一密钥也可用于签署任何应用程序特定的信息。 用户可以使用签名信息对操作进行加密授权。 这些链外签名可以节省气体，减少区块链上的交易次数。

信息签名有多种技术方法或标准。 当然，数字签名是 ECDSA 的基本功能。 尽管如此，为了将信息签名与事务签名分开，并提高应用程序之间的互操作性，还是制定了一些标准。 如果没有签名标准，报文签名功能就可以签署任意哈希值，这样用户就会签署伪装成报文的恶意交易哈希值。 为防止这种情况发生，信息签名标准会修改信息，使签名不能用于其他目的。

不同的钱包和 SDK 支持这些标准的范围各不相同，因此您应选择适合自己应用的方法。

## 签署原始信息

按原样签署信息是最简单的方法。 由于上述原因，这种方法风险很大，如今已很少使用。

在生态系统工具中，MetaMask 支持在用户明确同意后通过 `eth_sign` 方法进行原始信息签名。 保留该功能只是为了向后兼容，不得在新项目中使用。 值得一读的文章 [什么是 "eth sign"，为什么会有风险？](https://support.metamask.io/privacy-and-security/what-is-eth_sign-and-why-is-it-a-risk/)

```js
window.ethereum.request({ method: "eth_requestAccounts" })
window.ethereum.request({ method："eth_sign", params：["0xbC7d1aBe33E6EC19cA873A3042A4DCF49149BC7A", "0x00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff"]}).then(console.log)
```

## KIP-97 Klaytn 签名信息

一些 Kaia 节点和 SDK 提供了一种方法，在签署消息之前在消息前加上`"\x19Klaytn Signed Message：\n" + len(message)` 前缀。 详情请参阅 [KIP-97](https://kips.kaia.io/KIPs/kip-97)。 使用 Klaytn- 前缀可以减少跨链的签名重放，但仅靠前缀并不能完全防止重放攻击。 应用程序必须采用重放保护机制，包括随机挑战或时间戳，以抵御应用程序内的重放攻击。

支持 KIP-97 签名的有：

- Kaia 钱包 [`klay_sign`](https://docs.kaiawallet.io/api_reference/caver_methods#caverklaysign) 方法
- 在 Kaia 节点 v1.0.0 之前，[`eth_sign`](../json-rpc/eth/sign)、[`kaia_sign`](../json-rpc/kaia/sign)、[`personal_sign`](../json-rpc/personal/sign) [`personal_ecRecover`](../json-rpc/personal/ec-recover) RPCs
- 在所有版本的 Kaia 节点中，[`kaia_recoverFromMessage`](../json-rpc/kaia/recover-from-message) RPC

以 Kaia 钱包为例：

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

## EIP-191 以太坊签名消息

在以太坊和一些 EVM 链中，广泛使用的做法是在消息前加上`"\x19Ethereum Signed Message：\n" + len(message)` 前缀。 详情请参阅 [EIP-191](https://eips.ethereum.org/EIPS/eip-191)。 Kaia 节点和 SDK 支持此功能。 与 KIP-97 一样，EIP-191 也要求应用程序实施重放保护机制。 不过，使用 EIP-191 可确保与其他生态系统工具兼容，并简化信息处理逻辑，而无需 EIP/KIP 分支。

支持 EIP-191 签名的有：

- 以太坊钱包（如 MetaMask）
- 以太坊 SDK（etherthers.js、web3.js、web3j、web3py、viem 等）
- [kaia-sdk](https://github.com/kaiachain/kaia-sdk)套件（etheres-ext、web3js-ext、web3j-ext、web3py-ext），因为它们继承了各自以太坊 SDK 的消息签名功能（[参见文档](../sdk)）。
- 在自 v1.0.1 起的 Kaia 节点中，[`eth_sign`](../json-rpc/eth/sign)、[`kaia_sign`](../json-rpc/kaia/sign)、[`personal_sign`](../json-rpc/personal/sign) [`personal_ec-Recover`](../json-rpc/personal/ec-recover)RPCs。
- 在所有版本的 Kaia 节点中，[`kaia_recoverFromMessage`](../json-rpc/kaia/recover-from-message) RPC

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

## EIP-712 类型化结构数据

EIP-191 和 KIP-97 是签署单个字符串的标准，而 EIP-712 则是签署 JSON 格式结构的应用程序数据的标准。 这种格式更便于人类阅读，在 EVM 上处理也更有效率。 详情请参阅 [EIP-712](https://eips.ethereum.org/EIPS/eip-712)。 请注意，该标准无法完全防止重放攻击。 与其他标准一样，应用程序必须注意重放保护机制。 您可以在这里[here](https://docs.metamask.io/wallet/concepts/signing-methods/)找到更多关于应用程序编程接口的信息，如`eth_signTypedData_v1`、`eth_signTypedData_v3`和`eth_signTypedData_v4`。

支持 EIP-712 签名的有：

- 以太坊钱包（如 MetaMask）
- Kaia 钱包

以 Kaia 钱包为例：

```js
const data = '{"domain":{"chainId":1,"name":"Ether Mail","verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC","version":"1"},"message":{"contents":"Hello, Bob!","attachedMoneyInEth":4.2,"from":{"name":"Cow","wallets":["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"]},"to":[{"name":"Bob","wallets":["0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB","0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57","0xB0B0b0b0b0b0B000000000000000000000000000"]}]},"primaryType":"Mail","types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Group":[{"name":"name","type":"string"},{"name":"members","type":"Person[]"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person[]"},{"name":"contents","type":"string"}],"Person":[{"name":"name","type":"string"},{"name":"wallets","type":"address[]"}]}}';
window.klaytn.request({ method: "eth_signTypedData_v4", params: ["0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a", data] })
```

请参阅 [此处](https://docs.metamask.io/wallet/how-to/sign-data/)，了解示例的构建过程。

