# Signed message standards

Wallet private keys are primarily used to sign transactions, but the same key can also be used to sign any application-specific messages. Users can use signed message to allow users to cryptographically authorize an action. This off-chain signaturess can save gas and transaction count on the blockchain.

There are various technical methods, or standards to message signing. Sure, digital signature is a fundamental function of ECDSA. Nevertheless, several standards were devised to separate message signature from transaction signature and to improve interoperability between applications. Without signature standards, message signing functions could sign arbitrary ashes so the user signs malicious transaction hashes disguised as messages. To prevent this from happening, messagge signing standards modifies the message so the signature cannot be used for other purposes.

Different wallets and SDKs support varying range of those standards, so you should choose an appropriate method suited for your application.

## Signing raw message

Signing the massage as-is is the most simple approach. Because this is risky for the reasons mentioned above, it is rarely used today.

Among the ecosystem tools, MetaMask supports raw message signing via `eth_sign` method after explicit user consent. This feature is only maintained for backwards compatibility and must not be used in new projects. It's worth reading the article [What is 'eth sign' and why is it a risk?](https://support.metamask.io/privacy-and-security/what-is-eth_sign-and-why-is-it-a-risk/)

```js
window.ethereum.request({ method: "eth_requestAccounts" })
window.ethereum.request({ method: "eth_sign", params: ["0xbC7d1aBe33E6EC19cA873A3042A4DCF49149BC7A", "0x00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff"] }).then(console.log)
```

## KIP-97 Klaytn Signed Message

Some Kaia nodes and SDKs has been providing the way to prefix messages with "Klaytn Signed Message" before signing them. For details, please refer to [KIP-97](https://kips.kaia.io/KIPs/kip-97). Having the Klaytn- prefix can mitigate signature replay across chains, but the prefix alone cannot fully prevent replay attacks. Applications must employ replay protection mechanisms including random challenges or timestamps, to defend from replay attacks within an application.

KIP-97 signatures are supported by:
- Kaikas [`klay_sign`](https://docs.kaikas.io/02_api_reference) method
- caver-js [`keyring.signMessage`](../sdk/caver-js/api/caver-wallet/keyring) and [`utils.recover`](../sdk/caver-js/api/caver.utils) methods
- caver-java [`AbstractKeyring.signMessage​`](https://javadoc.io/doc/com.klaytn.caver/core/latest/com/klaytn/caver/wallet/keyring/AbstractKeyring.html) and [`Utils.recover`](https://javadoc.io/doc/com.klaytn.caver/core/latest/com/klaytn/caver/utils/Utils.html) methods
- In Kaia nodes until v1.0.0, [`eth_sign`](../json-rpc/eth/sign), [`kaia_sign`](../json-rpc/kaia/sign), [`personal_sign`](../json-rpc/personal/sign) [`personal_ecRecover`](../json-rpc/personal/ec-recover) RPCs
- In Kaia nodes of all versions, [`kaia_recoverFromMessage`](../json-rpc/kaia/recover-from-message) RPC

Kaikas example:

```js
window.klaytn.request({ method: "eth_requestAccounts" })
window.klaytn.request({ method: "klay_sign", params: ["0xbC7d1aBe33E6EC19cA873A3042A4DCF49149BC7A", "0x61626364"] }).then(console.log)

0x90824271750d7a09f90a76b6f8ec1e5e2afd31790fea9f43e26c120fef3152be46ad09c76f87bd6c495859fa37127754f1f0780180df53eda80034dac036b8d31b
```

RPC example:

```js
kaia.recoverFromMessage('0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a', '0x61626364', '0x90824271750d7a09f90a76b6f8ec1e5e2afd31790fea9f43e26c120fef3152be46ad09c76f87bd6c495859fa37127754f1f0780180df53eda80034dac036b8d31b', 'latest')

"0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a"
```

## EIP-191 Ethereum Signed Message

In Ethereum and several EVM chains, it is widely used practice to prefix the messages with "Ethereum Signed Message" before signing them. For details, please refer to [EIP-191](https://eips.ethereum.org/EIPS/eip-191). Kaia nodes and SDKs support this feature. As with KIP-97, the application has to take care with replay protection when using EIP-191. Nevertheless, using EIP-191 ensures compatibility with other ecosystem tools and streamlines the message handling logic, without the need for EIP/KIP branches.

EIP-191 signatures are supported by:
- Ethereum SDKs (ethers.js, web3.js, web3j, web3py, viem, etc)
- [kaia-sdk](https://github.com/kaiachain/kaia-sdk) suite (ethers-ext, web3js-ext, web3j-ext, web3py-ext), as they inherit the message signing features from their respective Ethereum SDKs ([see docs](../sdk))
- In Kaia nodes since v1.0.1, [`eth_sign`](../json-rpc/eth/sign), [`kaia_sign`](../json-rpc/kaia/sign), [`personal_sign`](../json-rpc/personal/sign) [`personal_ecRecover`](../json-rpc/personal/ec-recover) RPCs
- In Kaia nodes of all versions, [`kaia_recoverFromMessage`](../json-rpc/kaia/recover-from-message) RPC

ethers.js example:

```js
const wallet = new ethers.Wallet("0x6397f5bfcef382017268d21294aed3b82d479b67323f94f7065d92a43643f20f");
await wallet.signMessage("abcd");

'0xe67ddbb12ad7c85a28b082bb3f159e637229454d34824bd96c0df38e49bf92d42167ffba7565855585de0c32407b0622b0b66fdfe7bd6566d4a19ca40b39ec631b'
```

RPC example:

```js
personal.importRawKey('6397f5bfcef382017268d21294aed3b82d479b67323f94f7065d92a43643f20f', 'pass')
personal.unlockAccount('0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a', 'pass')
personal.sign('0x61626364', '0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a', 'pass')

"0xe67ddbb12ad7c85a28b082bb3f159e637229454d34824bd96c0df38e49bf92d42167ffba7565855585de0c32407b0622b0b66fdfe7bd6566d4a19ca40b39ec631b"
```

```js
kaia.recoverFromMessage('0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a', '0x61626364', '0xe67ddbb12ad7c85a28b082bb3f159e637229454d34824bd96c0df38e49bf92d42167ffba7565855585de0c32407b0622b0b66fdfe7bd6566d4a19ca40b39ec631b', 'latest')

"0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a"
```

## EIP-712 Typed Structured Data

While EIP-191 and KIP-97 were standards for signing a single string, EIP-712 is a standard for signing application data structured in JSON format. This format is more human-readable and efficient to process on EVM. For details, please refer to [EIP-712](https://eips.ethereum.org/EIPS/eip-712). Note that this standard cannot fully prevent replay attacks. As with other standards, applications must take care about replay protection mechanisms.

Some wallets like [MetaMask](https://docs.metamask.io/wallet/how-to/sign-data#use-eth_signtypeddata_v4) support EIP-712 via its `eth_signTypedData_v4` method.
