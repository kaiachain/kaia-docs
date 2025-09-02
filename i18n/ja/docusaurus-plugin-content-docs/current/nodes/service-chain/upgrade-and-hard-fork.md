# アップグレード・サービス・チェーン

カイアとそのServiceChainは、新機能の開発とバグの修正のため、常に新しいバージョンをリリースしてきた。 このページはServiceChainのバイナリをアップグレードし、ServiceChainのハードフォークブロック番号を設定するためのガイドです。

## アップグレード<a href="#upgrade" id="upgrade"></a>

このセクションでは、ServiceChainバイナリをアップグレードする方法を示します。

**注意** ServiceChainバイナリのアップグレードは、不可逆的で後方互換性がない場合があります。 詳細はリリースノートを参照。 例えば、[Kaia v1.9.0 release note](https://medium.com/klaytn/klaytn-v1-9-0-release-notes-medium-58e4644f7544)にはこうある：

> 注：このバージョンは、スナップショット同期をサポートするためにデータベースのバージョンを更新します。 v1.9.0にアップデート後、既存のデータで旧バージョンにダウングレードすることはできません。

最新版のKaiaとServiceChainのバイナリは、以下のリンクから入手できます：

- [カイア・ドックス](../downloads/downloads.md)
- [カイアGithubリポジトリ](https://github.com/kaiachain/kaia/releases)

ServiceChainバイナリをアップグレードするには、ServiceChainノードを停止してバイナリを置き換えます。 例えば、以下のコマンドを使って SCN ノードを停止し、バイナリを新しいものに置き換えることができます。

```bash
$ kscnd stop
Shutting down kscnd: OK
$ cp /path/to/new/kscn /path/to/original/kscn
```

アップグレード後にServiceChainノードを再起動することができます。 しかし、ServiceChainでハードフォークを計画している場合は、ServiceChainのノードを停止させておく必要があります。 ServiceChainのハードフォークの手順については、[ハードフォーク](#hard-fork)を参照してください。

```bash
$ kscnd start
```

## ハードフォーク<a href="#hard-fork" id="hard-fork"></a>

このセクションでは、カイアの[ハードフォーク](../../misc/kaia-history.md)をServiceChainに適用する手順について説明します。

ServiceChainにハードフォークを適用するには、次のことが必要だ：

1. ハードフォークに適切なブロック番号を選ぶ
2. ServiceChainのバイナリをハードフォークをサポートするバージョンにアップグレードする。
3. ServiceChainにハードフォークのブロック番号を設定する

### 1) 1) 1) Pick an appropriate block number for the hard fork <a href="#1-pick-an-appropriate-block-number-for-the-hard-fork" id="1-pick-an-appropriate-block-number-for-the-hard-fork"></a>

ServiceChainのJavascriptコンソールでは、以下のように現在のブロック番号を確認できる。

```bash
$ kscn attach --datadir ~/kscnd_home
Kaia JavaScript コンソールへようこそ！

インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> kaia.blockNumber
1234
```

ここで、ハードフォークを有効にするために適切なブロック番号を選択する必要があります。 現在のブロックとハードフォークのブロックの間に十分なブロック数（1秒ごとに生成される）があることを確認する。

### 2. ServiceChainバイナリのアップグレード<a href="#2-upgrade-the-servicechain-binary" id="2-upgrade-the-servicechain-binary"></a>

ServiceChain バイナリのアップグレード方法については、このページの [Upgrade](#upgrade) セクションを参照してください。 当面はServiceChainノードを停止しておくこと。 ハードフォークのブロック番号を設定した後、それらを再開します。

### 3. ハードフォーク・ブロック番号の設定<a href="#3-set-the-hard-fork-block-number" id="3-set-the-hard-fork-block-number"></a>

ServiceChainのバイナリを希望するハードフォークをサポートするバージョンにアップグレードした場合、更新されたgenesisでチェーン設定を再初期化することで、ServiceChainにハードフォークブロック番号を設定することができます。

#### すべてのServiceChainノードのgenesisを更新し、チェーン設定を再初期化する。<a href="#update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes" id="update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes"></a>

まず、`genesis.json`の`config`フィールドにハードフォーク番号を指定する。 例えば、ServiceChainでMagmaのハードフォークを有効化しようとする場合、以下のようにgenesisの`config`フィールドで`magmaCompatibleBlock`を指定する必要がある。

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    ...
    "magmaCompatibleBlock": 1500,
    ...
  },
  ...
}
```

チェーン設定でハードフォークを有効にするには、以前のハードフォークが有効になっていなければならない。 つまり、Magmaハードフォークを有効にするには、EthTxTypeハードフォークがすでに有効になっていなければならない。 チェーン設定に先行ハードフォークの互換ブロック番号のフィールドがない場合は、それも追加しなければならない。

例えば、Magmaのハードフォークブロック番号を設定したい場合、`genesis.json`の`config`フィールドに以下のように`ethTxTypeCompatibleBlock`がない：

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

以下のように、`config`フィールドに`magmaCompatibleBlock`を追加する際に、`ethTxTypeCompatibleBlock`も追加する必要がある。

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "ethTxTypeCompatibleBlock": 1500,
    "magmaCompatibleBlock": 1500,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

Kaiaのハードフォークの歴史は[Kaia Docs](../../misc/kaia-history.md)にあります。

ハードフォークを使用して `genesis.json` を更新した場合は、チェーン設定を再初期化して変更を適用します。

```bash
$ kscn --datadir /path/to/data/directory init /path/to/genesis.json
```

**注** チェーン・コンフィグを再初期化すると、以下のエラー・ログが出力されるのが普通である。

```
ERROR[08/02,09:12:39 Z] [48] The same or more recent governance index exist. Skip writing governance index  newIdx=0 govIdxes=[0]
```

#### 更新されたチェーンの設定を確認する<a href="#confirm-the-updated-chain-config" id="confirm-the-updated-chain-config"></a>

ここで、ServiceChainノードを再起動する。 例えば、以下のコマンドでSCNノードを再起動できます。

```bash
$ kscnd start
```

その後、SCN の Javascript コンソールで、更新されたチェーンの設定を確認することができます。

```bash
$ kscn attach --datadir ~/kscnd_home
Kaia JavaScript コンソールへようこそ！

インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.chainConfig.magmaCompatibleBlock
1500
```

## ハードフォークについて<a href="#some-hard-fork-specifics" id="some-hard-fork-specifics"></a>

このセクションでは、特定のハードフォークに関するいくつかの詳細について説明します。

### Magma <a href="#magma" id="magma"></a>

マグマのハードフォークでは、KIP-71、ダイナミック・ガス料金が導入される。 これにはガス価格の上限と下限が含まれる。

デフォルトでは、上限は`7500000000`、下限は`25000000000`に設定されている。 これらの境界は SCN ノードの Javascript コンソールで [governance API](../../../references/json-rpc/governance/chain-config) を使って変更することができます。 もちろん、下限が上限を超えることはない。

ガス料金を固定値に設定するには、ガス料金の上限と下限を同じ値に設定する必要がある。 例えば、SCNノードのJavascriptコンソールで`governance.vote` APIを使用して、ガス料金を`0`に設定することができます。

```bash
$ kscn attach --datadir ~/kscnd_home
Kaia JavaScript コンソールへようこそ！

インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.vote("kip71.lowerboundbasefee", 0)
"あなたの投票が準備されました。あなたのノードが提案者としてブロックを生成するときに、ブロックヘッダに入れられるか、適用されます。あなたの票は重複する可能性があることに注意してください。"
> governance.vote("kip71.upperboundbasefee", 0)
"あなたの投票は準備中です。ブロックヘッダに入れるか、あなたのノードが提案者としてブロックを生成するときに適用されます。あなたの票は重複する可能性があることに注意してください。"
```

**注** ガバナンス投票とそのアップデートは、マグマのハードフォークの発動に関係なく利用可能である。 つまり、ガバナンス投票はマグマのハードフォーク発動前にも行うことができる。

ガス価格の上限と下限を更新するための投票が成功した場合、その変更は2イスタンブール・エポック後に有効になる（エポックはブロック番号で表される）。

例えば、エポックが3600で、ガス価格の上限と下限を更新する投票がブロック#4000に置かれた場合、その変更はブロック#10800から有効になる。 詳細には、ブロック#7200で最初のエポックに達した時点で投票が確定し、2番目のエポック（ブロック#10800）で変更が適用される。

エポックを確認するには、以下のように `governanace.itemsAt` API を使用する。

```javascript
> governance.itemsAt(kaia.blockNumber)
{
  governance.governancemode: "none",
  governance.governingnode: "0x05ad406f31e22b74f18c9ed65ed1ccd349bbbee0",
  governance.unitprice: 0,
  istanbul.committeesize: 21,
  istanbul.epoch: 3600,
  istanbul.policy: 0,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: false,
  reward.minimumstake: "2000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.useginicoeff: false
}
```

`istanbul.epoch`の値が3600ブロックであることがわかる。

`governance.vote`のAPIを使えば、エポックも変更できる。

```javascript
> governance.vote("istanbul.epoch", 60)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```
