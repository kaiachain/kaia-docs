# トランスファーヴァリュー

カイアのデザイン・セクションで説明したように、サービス・チェーンは、親チェーンと子チェーン間の価値（KAIA、ERC-20、ERC-721）の移転をサポートします。
このページでは、SCNでバリュー・トランスファー機能を有効にする方法を説明します。

EN と SCN を設定した後、チェーン間のバリュー・トランスファーを有効にするには、以下の手順が必要です。

1. Check the addresses of the bridge operator accounts and add KLAY to the bridge operator accounts.
2. ブリッジコントラクトを親子チェーンに展開する。
3. トークン（ERC-20または721）コントラクトを親子チェーンにデプロイする。 (If you just need KLAY-transfer, you can skip step 3 & 4.)
4. トークンコントラクトを親子チェーン上のブリッジコントラクトに登録する。
5. 親／子チェーンのブリッジ契約をサブスクライブする。

手順を追う前に、メカニズムの背後を理解するために、ハイレベルのシステム・アーキテクチャを見てみよう。

## システム・アーキテクチャ<a id="system-architecture"></a>

図1は、ブリッジ／トークンコントラクトとブリッジノードを備えたサービスチェーンのシステムアーキテクチャを示している。

以下のコントラクトは、メイン／サブブリッジを介して相互に通信し、ユーザーの価値移転要求を処理する。

- ブリッジコントラクト
- ERC-20コントラクト（必要な場合）
- ERC-721コントラクト（必要な場合）

図1. Service chain architecture](/img/nodes/sc_arch.png)

## ブリッジ・オペレーター・アカウント<a id="bridge-operator-account"></a>

ServiceChainには、親チェーンブリッジのオペレータアカウントとサービスチェーンブリッジのオペレータアカウントの2つのオペレータアカウントがあります。 各オペレーター・アカウントは、取引の署名に使用される。
トランザクションがバリューを親チェーンに移動させる場合、親チェーンのブリッジオペレー ターアカウントがトランザクションに署名する。 子チェーンには、子チェーン・ブリッジのオペレーター・アカウントが使われる。
利用者が「リクエストヴァリュートランスファー」トランザクションを提出した場合、サブブリッジはブリッジ運営者アカウントによって署名された「価値移転ハンドル」トランザクションを作成する。
Therefore, the parent chain bridge operator needs enough KLAY in their balance to pay the transaction fee to the parent chain.
If the service chain's gas price is set to non-zero, the service chain bridge operator should have KLAY in their balance as well.

### キーストアとパスワードファイル<a id="keystore-and-password-file"></a>

SCN が起動されると、親/子オペレータの鍵が存在しない場合、その鍵ストアファイルとパスワードファイルが自動的に生成されます。
特定のアカウントをオペレーターとして使いたい場合は、そのキーを指定することができる。 SCN を起動する前に、以下のファイルを指定のパスに置きます。
パスワード・ファイルは、キーストア・ファイルのパスワード文字列を持つべきである。
パスワード・ファイル名は、対応するキーストア・ファイルのアカウント・アドレスでなければならない。

**ファイル**

- keystore file : `UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b`
- password file : `0x2eD72a9D7fe5da7672fD21567e07302431649B0B`

**ファイルパス**

- 親チェーン・ブリッジ・オペレーター : $datadir/parent_bridge_account
- 子チェーン・ブリッジ・オペレーター : $datadir/child_bridge_account

```javascript
> pwd
/$dataDIR/child_bridge_account

> ls
0x2eD72a9D7fe5da7672fD21567e07302431649B0B
UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b

> cat 0x2eD72a9D7fe5da7672fD21567e07302431649B0B
%S~f5qqM38cB47jL%

> cat UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b
{"address":"2ed72a9d7fe5da7672fd21567e07302431649b0b","crypto":{"cipher":"aes-128-ctr","ciphertext":"6486509e8158bf4984608cbc5562cf2c9a27cd988a98e543731b39251144e633","cipherparams":{"iv":"96d7e5b6a936278c0797faae6cb3d903"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"8928ba41b8228af19390ec881c51452fa3ea973ad2c253ca0f5bc9197a8b24c4"},"mac":"9c8ec63694c20a473e0ea33840e7d16e9f1a20afc52b3244b703a3ac0a66cfa3"},"id":"9ae10527-7fd3-4aae-a4eb-316af211494e","version":3}
```

### ブリッジ・オペレーター・アドレスの確認<a id="check-bridge-operator-addresses"></a>

SCN が正常に実行されれば、RPC API を使用して以下のように親子チェインブリッジのオペレータアドレスを確認することができます。

```
$ kscn attach --datadir ~/kscnd_home
Kaia JavaScript コンソールへようこそ！

インスタンス：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

詳しくは[subbridge API](../../../references/json-rpc/subbridge/parent-operator)を参照されたい。

### Send KLAY to Bridge Operators <a id="send-klay-to-bridge-operators"></a>

Like anchoring, the parent chain bridge operator needs KLAY to make a value-transfer transaction.
If the service chain's gas price is set to non-zero, the service chain bridge operator should have KLAY in their balance as well.

オペレーターの口座に入金した後、以下のように残高を確認することができる。

**親チェーンブリッジ・オペレーター**

```
$ kscn attach --datadir ~/kscnd_home
Kaia JavaScript コンソールへようこそ！

 インスタンス：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.parentOperatorBalance
1e+50
```

**子供のチェーンブリッジ・オペレーター**

```
$ kscn attach --datadir ~/kscnd_home
Kaia JavaScript コンソールへようこそ！

 インスタンス：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.childOperatorBalance
1e+50
```

## ブリッジコントラクト<a id="bridge-contract"></a>

クロスチェーンでの価値移転のためには、ブリッジコントラクトを親／子チェーンに展開する必要がある。
Users can request a KLAY transfer to the bridge contract to send their KLAY to the other chain.
さらに、トークンコントラクトがブリッジコントラクトに登録されている場合、ブリッジコントラクトは親チェーンと子チェーン間のトークン移転を処理できる。

### 配備<a id="deployment"></a>

サブブリッジはブリッジ契約展開APIを提供する。 ブリッジ・コントラクトは、以下のように1回のRPCコールで両方のチェーンにデプロイできる。
その前に、メインブリッジとサブブリッジを接続しておく必要がある。 ブリッジ設定](bridge-configuration.md)を参照してください。

```javascript
$ kscn attach --datadir ~/kscnd_home
Kaia JavaScript コンソールへようこそ！

インスタンス：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.deployBridge()
["0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5"].

> subbridge.listBridge
[{
    localAddress："0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress："0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: false
}].
```

詳しくは[subbridge API](../../..references/json-rpc/subbridge/deploy-bridge)を参照されたい。

`subbridge_listBridge`はブリッジのコントラクトアドレスとサブスクリプションステータスを表示します。
サブブリッジは、ブリッジ契約アドレスのリストをファイルに保存する。 再起動時に、サブブリッジはブリッジ契約リストをファイルからリロードする。

### 購読<a id="subscribing"></a>

ブリッジ・コントラクトをデプロイした後、サブブリッジをデプロイされたブリッジ・コントラクトにサブスクライブさせ、値の転送を可能にする必要があります。 これは、別の RPC API 呼び出しである `subbridge_subscribeBridge` を使って行うことができる。

```javascript
> subbridge.subscribeBridge("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5")
null

> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: true
}]
```

### ステータス確認<a id="checking-status"></a>

加入すると、SCNはユーザーの「リクエスト・バリュー・トランスファー」取引を自動的に処理する。
ブリッジの契約状況を確認する方法を説明します。

ブリッジコンタクトでは、`requestNonce`と`handleNonce`の2つのnonceがある。
インチェーントランザクションとは異なり、サブブリッジは上位のnonceリクエストを下位のものより先に処理することができる。

- requestNonce : このブリッジ契約に対して行われたユーザーの「クロスチェーン・バリュー転送」リクエストの数。
- handleNonce : サブブリッジが処理した最高nonce。
- lowerHandleNonce : サブブリッジが扱うべき最も低いnonce。

したがって、以下のようにnoncesが更新されれば、クロスチェーンの値転送は正しく処理されていると言える。

- 親チェーンブリッジ契約の "handleNonce "と "lowerHandleNonce "は、子チェーンブリッジ契約の "requestNonce "に近づき続ける。
- 「handleNonce "と "lowerHandleNonce "は、親チェーンブリッジ契約の "requestNonce "に近づき続ける。

handleNonce」が相手ブリッジ契約の「requestNonce」と等しく、「lowerHandleNonce」が「handleNonce」より1だけ大きい場合、ユーザーのリクエストはすべて処理されたことになる。

### ログ<a id="log"></a>

以下は、通常動作時の SCN からの典型的なログ出力です。
1秒ごとにブリッジの契約状況が表示される。

```
INFO[10/16,19:37:40 +09] [45] VT : Parent -> Child Chain                request=8699 handle=4826 lowerHandle=4826 pending=3873
INFO[10/16,19:37:40 +09] [45] VT : Child -> Parent Chain                request=7894 handle=4207 lowerHandle=4207 pending=3687
```

このログは、リクエスト、ハンドル、lowerHandle、保留中のnoncesを示す。
それぞれの値は以下のような意味である。

- request : サブスクライブされたすべてのブリッジ契約のバリュー転送リクエ ストNonceの合計。
- handle : 加入しているすべてのブリッジ契約の上位ハンドル nonce の合計。
- lowerHandle : サブスクライブされたすべてのブリッジ契約の下位ハンドル nonce の合計。
- pending : `request` と `lowerHandle` の違い。

### RPC API <a id="rpc-api"></a>

ブリッジの契約状況は以下のように確認できます。
詳しくは[subbridge API](../../../references/json-rpc/subbridge/get-bridge-information)を参照されたい。

```javascript
> subbridge.getBridgeInformation("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")
{
  counterPart: "0x22c41ae528627b790233d2e59ea520be12350eb5",
  handleNonce: 0,
  lowerHandleNonce: 0,
  isRunning: true,
  isSubscribed: true,
  onServiceChain: true,
  pendingEventSize: 0,
  requestNonce: 0
}
```

## トークン契約（ERC-20/721）<a id="token-contract-erc-20-721"></a>

サービス・チェーンはERC-20/721による価値移転もサポートしている。
これらをサポートするには、サービスチェーン互換のERC-20/721トークンコントラクトを親チェーンと子チェーンの両方に導入する必要がある。
ERC-20/721トークンコントラクトコードについては、
[Token standard](../../../build/smart-contracts/token-standard.md)を参照することができます。

### 配備 <a id="deployment"></a>

SCNはまだERC-20/721トークンをデプロイするAPIをサポートしていません。 トークンはcaver-js経由でデプロイする必要がある。
ERC-20/721契約を展開する際には、正しいブリッジ・オペレーター・アカウントを使用する必要があります。 メインチェーンのデプロイには親オペレーターのアカウントを使用し、サービスチェーンのデプロイには子オペレーターを使用する。
トークンコントラクトが間違ったアカウントでデプロイされた場合、価値の移転は機能しないため、正しいアカウントでトークンコントラクトを再度デプロイする必要があります。

### 登録 <a id="register"></a>

トークンコントラクトをデプロイしたら、以下のように親子チェーン上のブリッジコントラクトにトークンコントラクトを登録する。

```javascript
> subbridge.registerToken("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5", "0x376b72abe1b29cace831bd3f5acdfa967814c9cd", "0x53160735f7cc6ff75e48619f368bb94daff66a1b")
null
```

このコマンドは、子チェーントークン（"0x376b72abe1b29cace831bd3f5acdfa967814c9d"）を子チェーンブリッジコントラクト（"0x27caeba831d98b5fbb1d81ce0ed20801702f443a"）に登録する。 そして、親チェーントークン（"0x53160735f7cc6ff75e48619f368bb94daff66a1b"）と親チェーンブリッジコントラクト（"0x22c41ae528627b790233d2e59ea520be12350eb5"）。

詳しくは[Service Chain API](../../../references/json-rpc/subbridge/register-token)を参照してください。

## バリュー・トランスファーのリクエスト<a id="request-value-transfer"></a>

このセクションでは、ユーザーが価値譲渡を要求するために呼び出されるコントラクトメソッドについて説明します。
Request transaction does not allow zero value (KLAY/ERC-20).

### KLAY transfer <a id="klay-transfer"></a>

ユーザーは、以下の方法で**ブリッジ契約**に「価値移転要求」取引を行うことができます。

#### fallback <a id="fallback"></a>

If a user calls the fallback function of the bridge, this requests a KLAY transfer to the same account address as the requesting user in the counterpart chain.

```solidity
function () external payable;
```

#### requestKLAYTransfer <a id="requestklaytransfer"></a>

ユーザーがこの関数を `_to` で呼び出すと、相手チェーンの `_to` アドレスにKAIA転送を要求する。

```solidity
function requestKAIATransfer(address _to, uint256 _value, bytes calldata _extraData) external payable
```

### ERC-20の譲渡<a id="erc-20-transfer"></a>

#### ブリッジ契約による2ステップのリクエスト<a id="2-step-request-via-bridge-contract"></a>

ユーザーは、トークンをブリッジ契約へ[承認](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve)した後、以下の方法でブリッジ契約へ「価値移転要求」取引を行うことができます。

```solidity
function requestERC20Transfer(address _tokenAddress, address _to, uint256 _value,uint256 _feeLimit,bytes memory _extraData) external
```

#### ERC-20契約による1ステップリクエスト<a id="1-step-request-via-erc-20-contract"></a>

ユーザーは、承認することなく、以下の方法で直接**ERC-20契約**に「価値移転要求」取引を行うことができます。
ERC-20契約はその機能を実装する必要がある。

```solidity
function requestValueTransfer(uint256 _amount, address _to, uint256 _feeLimit, bytes calldata _extraData) external
```

### ERC-721 トランスファー<a id="erc-721-transfer"></a>

#### ブリッジ契約による2ステップのリクエスト<a id="2-step-request-via-bridge-contract"></a>

ユーザーは、トークンをブリッジ契約へ[承認](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve)した後、以下の方法でブリッジ契約へ「価値移転要求」取引を行うことができます。

```solidity
function requestERC721Transfer(address _tokenAddress, address _to, uint256 _tokenId, bytes memory _extraData) external
```

#### ERC-721契約による1ステップリクエスト<a id="1-step-request-via-erc-721-contract"></a>

ユーザーは、承認することなく、以下の方法で**ERC-721契約**に直接「価値譲渡要求」取引を行うことができます。
それなら、ERC-721契約はその機能を実装しているはずだ。

```solidity
function requestValueTransfer(uint256 _uid, address _to) external
```

### onERC721Received() <a id="unsupported-onERC721Received"></a>

ERC-721標準には[onERC721Received](https://eips.ethereum.org/EIPS/eip-721)コールバック関数があります。
onERC721Received()`は`safeTransferFrom()`関数と連動するが、現在のブリッジ契約の実装では`transferFrom()` を使用しているため、`onERC721Recieved()\` が呼び出されることは期待できない。

あるいは、`onERC721Recieved()`のような更なるアクションは、イベントリスニング(例えば、`event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)`)のような別の方法で実装すべきである。

## 価値移転の回復

価値移譲のリクエストは、さまざまな理由で失敗する可能性がある。 Say you requested KLAY transfer from subbridge to mainbridge or from mainbridge to subbridge.
In that case, the bridge contract on the receiver side must have enough KLAY than the requested amount of KLAY. もしそうでなければ、エラー通知なしに転送は失敗する。
つまり、失敗したトランザクションは、相手ブリッジがそのイベントを正常に処理できるようになったときに、再び成功させることができる。
In case of the above example, the failed transaction would be eventually handled by value transfer recovery when the counterpart bridge has enough KLAY.
値転送回復をデフォルトとして設定するには、2つのプロパティを設定する必要があります：

```
SC_VTRECOVERY=1
SC_VTRECOVERY_INTERVAL=5
```

SC_VTRECOVERY=1`に設定すると、値移行のリカバリーが自動的に実行される。 SC_VTRECOVERY_INTERVAL`は、値移行のリカバリーが実行される間隔を意味する。

## Collecting Fee for KLAY/ERC-20 transfer <a id="collecting-fee-for-klay-erc-20-transfer"></a>

In ServiceChain, there is a fee collecting feature for KLAY/ERC-20 transfers.

**近日中に更新予定。**

## ブリッジ契約のカスタマイズ <a id="customizing-your-bridge-contract"></a>

ServiceChainでは、オリジナルのBridgeコントラクトを継承し、独自にカスタマイズしたBridgeコントラクトを独自のサービスに使用することができます。
このセクションでは、ブリッジのコントラクトをカスタマイズする方法を説明し、サンプルコードを示します。

**まもなく更新されます。**
