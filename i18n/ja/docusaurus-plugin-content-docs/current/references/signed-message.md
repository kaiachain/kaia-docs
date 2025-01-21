# 署名入りメッセージ規格

ウォレットの秘密鍵は主にトランザクションに署名するために使われるが、同じ鍵をアプリケーション固有のメッセージに署名するためにも使うことができる。 ユーザーは署名されたメッセージを使用して、アクションを暗号的に承認することができる。 このようなオフチェーン署名は、ガスを節約し、ブロックチェーン上のトランザクション数を減らすことができる。

メッセージ署名には、さまざまな技術的方法（標準）がある。 確かに、電子署名はECDSAの基本的な機能だ。 それにもかかわらず、メッセージ署名とトランザクション署名を分離し、アプリケーション間の相互運用性を向上させるために、いくつかの標準が考案された。 署名標準がなければ、メッセージ署名関数は任意のハッシュに署名することができるので、ユーザーはメッセージに見せかけた悪意のあるトランザクション・ハッシュに署名することになる。 これを防ぐため、メッセージ署名の標準は、署名を他の目的に使えないようにメッセージを修正する。

ウォレットやSDKによって、これらの標準のサポート範囲は異なるため、アプリケーションに適した適切な方法を選択する必要があります。

## 生メッセージへの署名

メッセージにそのまま署名するのが最もシンプルな方法だ。 上記の理由でリスクが高いため、現在ではほとんど使われていない。

エコシステム・ツールの中で、MetaMaskは、明示的なユーザー同意の後、`eth_sign`メソッドによる生のメッセージ署名をサポートしている。 この機能は後方互換性のためだけに維持されており、新しいプロジェクトでは使用してはならない。 エスサイン』とは何か、なぜリスクがあるのか](https://support.metamask.io/privacy-and-security/what-is-eth_sign-and-why-is-it-a-risk/)という記事は一読の価値がある。

```js
window.ethereum.request({ method: "eth_requestAccounts" })
window.ethereum.request({ method："eth_sign", params：["0xbC7d1aBe33E6EC19cA873A3042A4DCF49149BC7A", "0x00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff"]}).then(console.log)
```

## KIP-97 クレイトン署名メッセージ

いくつかのKaiaノードとSDKは、署名の前に`"\x19Klaytn Signed Message：\n" + len(message)`を先頭につけてから署名する方法を提供している。 詳細は[KIP-97](https://kips.kaia.io/KIPs/kip-97)を参照されたい。 Klaytn-接頭辞を持つことで、チェーン間のシグネチャのリプレイを軽減することができるが、接頭辞だけではリプレイ攻撃を完全に防ぐことはできない。 アプリケーションは、アプリケーション内のリプレイ攻撃を防御するために、ランダムチャレンジやタイムスタンプなどのリプレイ保護メカニズムを採用する必要があります。

KIP-97シグネチャは以下のものに対応している：

- カイア・ウォレット [`klay_sign`](https://docs.kaiawallet.io/api_reference/caver_methods#caverklaysign) メソッド
- caver-js [`keyring.signMessage`](../sdk/caver-js/api/caver-wallet/keyring) と [`utils.recover`](../sdk/caver-js/api/caver.utils) メソッド。
- caver-java [`AbstractKeyring.signMessage​`](https://javadoc.io/doc/com.klaytn.caver/core/latest/com/klaytn/caver/wallet/keyring/AbstractKeyring.html) and [`Utils.recover`](https://javadoc.io/doc/com.klaytn.caver/core/latest/com/klaytn/caver/utils/Utils.html) methods
- v1.0.0 までの Kaia ノードでは、[`eth_sign`](../json-rpc/eth/sign), [`kaia_sign`](../json-rpc/kaia/sign), [`personal_sign`](../json-rpc/personal/sign) [`personal_ecRecover`](../json-rpc/personal/ec-recover) RPCs
- すべてのバージョンの Kaia ノードでは、[`kaia_recoverFromMessage`](../json-rpc/kaia/recover-from-message) RPC

カイア・ウォレットの例

```js
window.klaytn.request({ method: "eth_requestAccounts" })
window.klaytn.request({ method: "klay_sign", params: ["0xbC7d1aBe33E6EC19cA873A3042A4DCF49149BC7A", "0x61626364"] }).then(console.log)

0x90824271750d7a09f90a76b6f8ec1e5e2afd31790fea9f43e26c120fef3152be46ad09c76f87bd6c495859fa37127754f1f0780180df53eda80034dac036b8d31b
```

RPCの例：

```js
kaia.recoverFromMessage('0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a', '0x61626364','0x90824271750d7a09f90a76b6f8ec1e5e2afd31790fea9f43e26c120fef3152be46ad09c76f87bd6c495859fa37127754f1f0780180df53eda80034dac036b8d31b', 'latest')

"0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a"
```

## EIP-191 イーサリアム署名メッセージ

イーサリアムやいくつかのEVMチェーンでは、署名の前に`"\x19Ethereum Signed Message：\n" + len(message)`を先頭につけてから署名する。 詳細は[EIP-191](https://eips.ethereum.org/EIPS/eip-191)を参照されたい。 KaiaノードとSDKはこの機能をサポートしています。 KIP-97と同様に、EIP-191はアプリケーションにリプレイ保護メカニズムを実装することを要求する。 とはいえ、EIP-191を使用することで、他のエコシステム・ツールとの互換性が確保され、EIP/KIP分岐を必要とせず、メッセージ処理ロジックが合理化される。

EIP-191のシグネチャは、以下の国でサポートされている：

- イーサリアムウォレット（メタマスクなど）
- イーサリアムSDK（ethers.js、web3.js、web3j、web3py、viemなど）
- [kaia-sdk](https://github.com/kaiachain/kaia-sdk) スイート（ethers-ext、web3js-ext、web3j-ext、web3py-ext）は、それぞれのイーサリアムSDKからメッセージ署名機能を継承しています（[docsを参照](../sdk)）。
- v1.0.1 以降の Kaia ノードでは、[`eth_sign`](../json-rpc/eth/sign), [`kaia_sign`](../json-rpc/kaia/sign), [`personal_sign`](../json-rpc/personal/sign) [`personal_ecRecover`](../json-rpc/personal/ec-recover) RPCs
- すべてのバージョンの Kaia ノードでは、[`kaia_recoverFromMessage`](../json-rpc/kaia/recover-from-message) RPC

ethers.jsの例：

```js
const wallet = new ethers.Wallet("0x6397f5bfcef382017268d21294aed3b82d479b67323f94f7065d92a43643f20f");
await wallet.signMessage("abcd");

'0xe67ddbb12ad7c85a28b082bb3f159e637229454d34824bd96c0df38e49bf92d42167ffba7565855585de0c32407b0622b0b66fdfe7bd6566d4a19ca40b39ec631b'
```

RPCの例：

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

## EIP-712 型付き構造化データ

EIP-191とKIP-97が単一の文字列に署名する規格であったのに対し、EIP-712はJSON形式で構造化されたアプリケーション・データに署名する規格である。 このフォーマットは、より人間が読みやすく、EVMでの処理が効率的である。 詳細は[EIP-712](https://eips.ethereum.org/EIPS/eip-712)を参照。 この規格ではリプレイ攻撃を完全に防ぐことはできないことに注意。 他の規格と同様、アプリケーションはリプレイ保護メカニズムに注意しなければならない。 eth_signTypedData_v1`、`eth_signTypedData_v3`、`eth_signTypedData_v4\`などのAPIについては[こちら](https://docs.metamask.io/wallet/concepts/signing-methods/)を参照してください。

EIP-712シグネチャは以下のものに対応しています：

- イーサリアムウォレット（メタマスクなど）
- カイア・ウォレット

カイア・ウォレットの例

```js
const data = '{"domain":{"chainId":1,"name":"Ether Mail","verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC","version":"1"},"message":{"contents":"Hello, Bob!","attachedMoneyInEth":4.2,"from":{"name":"Cow","wallets":["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"]},"to":[{"name":"Bob","wallets":["0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB","0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57","0xB0B0b0b0b0b0B000000000000000000000000000"]}]},"primaryType":"Mail","types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Group":[{"name":"name","type":"string"},{"name":"members","type":"Person[]"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person[]"},{"name":"contents","type":"string"}],"Person":[{"name":"name","type":"string"},{"name":"wallets","type":"address[]"}]}}';
window.klaytn.request({ method: "eth_signTypedData_v4", params: ["0xbc7d1abe33e6ec19ca873a3042a4dcf49149bc7a", data] })
```

サンプルの作り方については[こちら](https://docs.metamask.io/wallet/how-to/sign-data/)を参照。
