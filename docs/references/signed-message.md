# Signed message standards

Wallet private keys are primarily used to sign transactions, but the same key can also be used to sign any application-specific messages. Users can use signed messages to cryptographically authorize actions. These off-chain signatures can save gas and reduce transaction count on the blockchain.

There are various technical methods, or standards, for message signing. Sure, digital signature is a fundamental function of ECDSA. Nevertheless, several standards were devised to separate message signature from transaction signature and to improve interoperability between applications. Without signature standards, message signing functions could sign arbitrary hashes so the user signs malicious transaction hashes disguised as messages. To prevent this from happening, message signing standards modify the message so the signature cannot be used for other purposes.

Different wallets and SDKs support varying range of those standards, so you should choose an appropriate method suited for your application.

## Signing raw message

Signing the message as-is is the simplest approach. Because this is risky for the reasons mentioned above, it is rarely used today.

Among the ecosystem tools, MetaMask supports raw message signing via `eth_sign` method after explicit user consent. This feature is only maintained for backwards compatibility and must not be used in new projects. It's worth reading the article [What is 'eth sign' and why is it a risk?](https://support.metamask.io/privacy-and-security/what-is-eth_sign-and-why-is-it-a-risk/)

```js
window.ethereum.request({ method: "eth_requestAccounts" })
window.ethereum.request({ method: "eth_sign", params: ["0xbC7d1aBe33E6EC19cA873A3042A4DCF49149BC7A", "0x00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff"] }).then(console.log)
```

## KIP-97 Klaytn Signed Message

Some Kaia nodes and SDKs have been providing a way to prefix messages with `"\x19Klaytn Signed Message:\n" + len(message)` before signing them. For details, please refer to [KIP-97](https://kips.kaia.io/KIPs/kip-97). Having the Klaytn- prefix can mitigate signature replay across chains, but the prefix alone cannot fully prevent replay attacks. Applications must employ replay protection mechanisms, including random challenges or timestamps, to defend against replay attacks within an application.

KIP-97 signatures are supported by:

- Kaia Wallet [`klay_sign`](https://docs.kaiawallet.io/api_reference/caver_methods#caverklaysign) method
- In Kaia nodes until v1.0.0, [`eth_sign`](../json-rpc/eth/sign), [`kaia_sign`](../json-rpc/kaia/sign), [`personal_sign`](../json-rpc/personal/sign) [`personal_ecRecover`](../json-rpc/personal/ec-recover) RPCs
- In Kaia nodes of all versions, [`kaia_recoverFromMessage`](../json-rpc/kaia/recover-from-message) RPC

Kaia Wallet example:

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

In Ethereum and several EVM chains, it is widely used practice to prefix the messages with `"\x19Ethereum Signed Message:\n" + len(message)` before signing them. For details, please refer to [EIP-191](https://eips.ethereum.org/EIPS/eip-191). Kaia nodes and SDKs support this feature. Like KIP-97, EIP-191 requires applications to implement replay protection mechanisms. Nevertheless, using EIP-191 ensures compatibility with other ecosystem tools and streamlines the message handling logic, without the need for EIP/KIP branches.

EIP-191 signatures are supported by:
- Ethereum wallets (e.g. MetaMask)
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

While EIP-191 and KIP-97 were standards for signing a single string, EIP-712 is a standard for signing application data structured in JSON format. This format is more human-readable and efficient to process on EVM. For details, please refer to [EIP-712](https://eips.ethereum.org/EIPS/eip-712). Note that this standard cannot fully prevent replay attacks. As with other standards, applications must take care about replay protection mechanisms. You can find more about the APIs such as `eth_signTypedData_v1`, `eth_signTypedData_v3`, and `eth_signTypedData_v4` [here](https://docs.metamask.io/wallet/concepts/signing-methods/)

EIP-712 signatures are supported by:
- Ethereum wallets (e.g. MetaMask)
- Kaia Wallet

Kaia Wallet example:

```js
const data = '{"domain":{"chainId":1,"name":"Ether Mail","verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC","version":"1"},"message":{"contents":"Hello, Bob!","attachedMoneyInEth":4.2,"from":{"name":"Cow","wallets":["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"]},"to":[{"name":"Bob","wallets":["0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB","0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57","0xB0B0b0b0b0b0B000000000000000000000000000"]}]},"primaryType":"Mail","types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Group":[{"name":"name","type":"string"},{"name":"members","type":"Person[]"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person[]"},{"name":"contents","type":"string"}],"Person":[{"name":"name","type":"string"},{"name":"wallets","type":"address[]"}]}}';
window.klaytn.request({ method: "eth_signTypedData_v4", params: ["0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a", data] })
```

See [here](https://docs.metamask.io/wallet/how-to/sign-data/) to learn how the example was built.

