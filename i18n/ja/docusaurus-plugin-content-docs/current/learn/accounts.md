# アカウント

## カイアアカウント<a id="kaia-accounts"></a>

### 口座、ステート、アドレスの概要<a id="overview-of-account-state-and-address"></a>

カイアのアカウントは、個人の残高やスマートコントラクトに関する情報を含むデータ構造です。 つまり、カイアのアカウントに保存されているすべてのデータの過去と現在の状態です。 トランザクションがKaiaノード上で実行されると、Kaiaの状態は結果的にすべてのノードで変更されます。 Kaiaネットワーク内のすべてのノードが同じブロックを同じ順序で処理した場合、状態は同じになるはずです。 各アカウントの状態情報は、各アカウントを識別するために使用される20バイトのアドレスに関連付けられている。

### アドレスからキー・ペアを切り離す<a id="decoupling-key-pairs-from-addresses"></a>

一般的なブロックチェーンプラットフォームのアカウントは、暗号処理された一定の長さのアドレスに関連付けられており、通常は次のようになります："0x0fe2e20716753082222b52e753854f40afddffd2". このアドレスはキー・ペアと強く結びついている。 鍵ペアが選ばれた場合、アドレスは公開鍵から導き出される。 これは、ユーザーエクスペリエンスの面で多くの欠点がある。 そのいくつかを紹介しよう：

- ユーザーが望むアドレスを持つことは不可能だ。
- ユーザーがアカウントのセキュリティを高めるために複数のキー・ペアを使用することは不可能である。
- 秘密鍵が誤って公開されたときや、アカウントのセキュリティを高めるために秘密鍵を定期的に更新したいときに、ユーザーがアカウントの鍵ペアを変更することは不可能である。

これらは、ユーザーがブロックチェーン・プラットフォームにおける識別子としてアドレスを考えることができないという大きなハードルである。 このハードルをクリアするために、カイアはユーザーがアドレスとキー・ペアを選択できる機能を提供している。 この機能を使えば、ユーザーは好きなアドレスを選ぶことができ、セキュリティを高めるために複数のキー・ペアを使うことができる。 キー・ペアの数は1つでも複数でもよく、キー・ペアは異なる役割を持つことができる。 複数キー・ペアまたはロール・ベース・キーの詳細については、[「複数キー・ペアおよびロール・ベース・キー」](#multiple-key-pairs-and-role-based-keys)を参照されたい。

Kaiaは、鍵ペアとアドレスが強く結合しているという古いスキームもサポートしていることは注目に値する。

### 複数の鍵ペアと役割ベースの鍵<a id="multiple-key-pairs-and-role-based-keys"></a>

前述したように、秘密鍵が盗まれたり、公開されたり、何らかの形で漏洩した場合、アカウントのセキュリティを回復するためにできることは何もない。最善の選択肢は、別の鍵ペアを生成して新しいアカウントを作成し、漏洩した古いアカウントから新しいアカウントに残高を移行することである。 マルチシグや用途別キーのような高度な鍵スキームをサポートしていないことも、大きな不便の原因となっている。 これらの問題をより効率的に解決するために、Kaiaアカウントは以下の機能を提供します：

- Kaiaアカウントでは、アカウントに関連付けられたキーペアを変更することができます。
- カイアカウントは複数のキーペアをサポートしており、それぞれのキーに異なる目的を割り当てることができます。
- カイアカウントは、アドレスと強く結合された単一のキーを持つアカウントとの互換性を維持します。

Kaiaアカウントのロールベースのマルチキーサポートを利用することで、エンドユーザは秘密鍵の誤操作などの現実のセキュリティリスク状況にうまく対処することができます。 例えば、ユーザが自分の秘密鍵が漏洩したことに気づいた場合、ユーザは、漏洩した鍵ペアを自分のアカウントから削除し、新しい鍵ペアを作成することで、漏洩した秘密鍵を単純に置き換えることができる。 これは、アカウント情報の更新に使用する専用の鍵をあらかじめ作成し、漏洩した秘密鍵とは別に保管することで実現できる。

### Kaia 財布キーフォーマット <a id="kaia-wallet-key-format"></a>

Kaiaウォレット鍵フォーマットは、対応するアドレスと共に秘密鍵を簡単に扱うために提供されます。 これによって、ユーザーは自分の秘密鍵をアドレスで管理しやすくなる。 フォーマットは16進数表記で`0x{private key}0x{type}0x{address in hex}`で、`{type}`は`00`でなければならない。 その他の値は予約されている。 以下に例を示す：

```text
0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d80x000xa94f5374fce5edbc8e2a8697c15331677e6ebf0b
```

### Kaiaアカウントの種類 <a id="kaia-account-types"></a>

Kaiaのアカウントには、<LinkWithTooltip to="../../misc/glossary#externally-owned-account-eoa" tooltip="User-controlled blockchain accounts for transactions,<br /> secured by a private key.">外部所有アカウント</LinkWithTooltip>(EOAs)と<LinkWithTooltip to="../../misc/glossary#smart-contract-account-sca" tooltip="Blockchain account with programmable logic <br />for automated transactions.">スマートコントラクトアカウント</LinkWithTooltip>(SCAs)がある。

#### 外部保有口座数<a id="externally-owned-accounts-eoas"></a>

外部所有のアカウントは、nonceや残高などの情報を持っている。 このタイプのアカウントは、コードやストレージを持たない。 EOAは秘密鍵で管理され、それに関連するコードはない。 EOAは、キー・ペアを使用して作成することができ、その後、キー・ペアを持つ誰でも制御することができる。 アカウント・キーについては、[アカウント・キー](#account-key)のセクションで説明しています。

**属性**

| 属性            | タイプ                                                   | 説明                                                                                                                                                                                                                                                                               |
| :------------ | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| タイプ           | uint8 \(Go\)                     | 外部所有口座の種類。 EOAの場合は**0x1**でなければならない。                                                                                                                                                                                                                                              |
| nonce         | uint64 \(Go\)                    | トランザクションの順序を決定するために使用されるシーケンス番号。 次に処理されるトランザクションは、この値と同じnonceを持つ。                                                                                                                                                                                                                |
| balance       | \*big.Int \(Go\) | 口座が保有するKAIAの金額。                                                                                                                                                                                                                                                                  |
| humanReadable | bool \(Go\)                      | アカウントが人間が読める住所に関連付けられていることを示すブール値。 HRA（人間が読めるアドレス）はまだサポートされていないため、この値はすべてのアカウントでfalseになります。                                                                                                                                                                                      |
| key           | [AccountKey](#account-key)                            | このアカウントに関連付けられたキー。 このフィールドには、[AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail)、[AccountKeyWeightedMultisig](#accountkeyweightedmultisig)、[AccountKeyRoleBased](#accountkeyrolebased)のいずれかを指定する。 取引における署名は、この鍵で検証される。 |

#### スマートコントラクトアカウント<a id="smart-contract-accounts-scas"></a>

EOAとは対照的に、SCAはそれらに関連するコードを持ち、そのコードによって制御される。 SCAはスマートコントラクトのデプロイメントトランザクションによって作成される。一旦デプロイされると、SCAはそれ自体で新しいトランザクションを開始することはできず、EOAまたは別のSCAによって、別のアカウントによってトリガーされなければならない。

**属性**

| 属性            | タイプ                                                                                          | 説明                                                                                                                                                                                                                                                                               |
| :------------ | :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| タイプ           | uint8 \(Go\)                                                            | スマート・コントラクトのアカウントの種類。 SCAの場合は**0x2**でなければならない。                                                                                                                                                                                                                                   |
| nonce         | uint64 \(Go\)                                                           | トランザクションの順序を決定するために使用されるシーケンス番号。 次に処理されるトランザクションは、この値と同じnonceを持つ。                                                                                                                                                                                                                |
| balance       | \*big.Int \(Go\)                                        | 口座が保有するKAIAの金額。                                                                                                                                                                                                                                                                  |
| humanReadable | bool \(Go\)                                                             | アカウントが人間が読める住所に関連付けられていることを示すブール値。 HRA（人間が読めるアドレス）はまだサポートされていないため、この値はすべてのアカウントでfalseになります。                                                                                                                                                                                      |
| key           | [AccountKey](#account-key)                                                                   | このアカウントに関連付けられたキー。 このフィールドには、[AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail)、[AccountKeyWeightedMultisig](#accountkeyweightedmultisig)、[AccountKeyRoleBased](#accountkeyrolebased)のいずれかを指定する。 取引における署名は、この鍵で検証される。 |
| codeHash      | \[\]byte \(Go\)   | アカウントのスマート・コントラクト・コードのハッシュ。 この値は不変であり、スマート・コントラクトの作成時にのみ設定される。                                                                                                                                                                                                                   |
| storageRoot   | \[32\]byte \(Go\) | アカウント内のすべてのストレージ変数の値を含むMerkle Patricia Trieのルートの256ビットハッシュ。                                                                                                                                                                                                                      |
| codeFormat    | uint8 \(Go\)                                                            | サポートするインタープリターのバージョン。 最大16個まで設定可能。 現在、EVM(0x00)のみをサポートしている。                                                                                                                                                                                                   |
| vmVersion     | uint8 \(Go\)                                                            | 契約展開時のプロトコルアップグレード（ハードフォーク）情報（例：0x0(constantinople)、0x1(istanbul,london,...)）。 最大16本まで使用可能。 契約書とともに自動的に作成される。                                                                              |

:::note

注意：kaia v1.7.0以降、スマートコントラクトアカウントにvmVersion属性が追加されます。

:::

### Kaia アカウント タイプ ID <a id="kaia-account-type-id"></a>

以下は、各アカウント・タイプに割り当てられたアカウント・タイプIDです。

| 口座種別                 | 口座タイプID |
| -------------------- | ------- |
| 外部所有口座（EOA）          | 0x1     |
| スマートコントラクトアカウント（SCA） | 0x2     |

## アカウント・キー<a id="account-key"></a>

アカウント・キーは、アカウントに関連するキー構造を表す。

### AccountKeyNil <a id="accountkeynil"></a>

AccountKeyNil は空のキーを表します。 アカウントが AccountKeyNil オブジェクトを持とうとすると、トランザクションは失敗する。 AccountKeyNil は、ロールベースのキーを持つ TxTypeAccountUpdate トランザクションにのみ使用される。 例えば、アカウントがRoleAccountUpdateキーのみを更新しようとする場合、 TxTypeAccountUpdateトランザクションのキーフィールドは以下のようになる：

`[AccountKeyNil, NewKey, AccountKeyNil]`

そして、RoleAccountUpdateキーのみが更新される。 その他の役割は更新されない。 詳細は[AccountKeyRoleBased](#accountkeyrolebased)を参照。

#### 属性<a id="attributes"></a>

AccountKeyNil の属性はありません。

#### RLPエンコーディング<a id="rlp-encoding"></a>

`0x80`

### AccountKeyLegacy <a id="accountkeylegacy"></a>

AccountKeyLegacyは、対応するキー・ペアから派生したアドレスを持つアカウントに使用される。 アカウントに AccountKeyLegacy がある場合、トランザクションの検証は以下のように行われる：

- ecrecover(txhash, txsig)\`から公開鍵を取得する。
- 公開鍵のアドレスを取得する。
- アドレスは送信者である。

#### 属性<a id="attributes"></a>

| 属性  | タイプ                               | 説明                                           |
| :-- | :-------------------------------- | :------------------------------------------- |
| タイプ | uint8 \(Go\) | AccountKeyLegacy のタイプ。 これは**0x01**でなければならない。 |

#### RLPエンコーディング<a id="rlp-encoding"></a>

`0x01c0`

### AccountKeyPublic <a id="accountkeypublic"></a>

AccountKeyPublicは、1つの公開鍵を持つアカウントに使用される。\
アカウントにAccountKeyPublicオブジェクトがある場合、トランザクションの検証処理は以下のように行われる：

- ecrecover(txhash, txsig)\`から公開鍵を取得する。
- 派生した公開鍵が、対応する

  account's public key.

#### 属性<a id="attributes"></a>

| 属性  | タイプ                                                                                          | 説明                                         |
| :-- | :------------------------------------------------------------------------------------------- | :----------------------------------------- |
| タイプ | uint8 \(Go\)                                                            | AccountKeyPublic の型。 これは**0x02**でなければならない。 |
| Key | \[33\]byte \(Go\) | 鍵はS256カーブで圧縮された公開鍵でなければならない。               |

#### RLPエンコーディング<a id="rlp-encoding"></a>

`0x02 + encode(CompressedPubKey)`

**注**：CompressedPubKey は、[SEC1](https://www.secg.org/SEC1-Ver-1.0.pdf) で定義されている圧縮形式の公開鍵である。 つまり、PubkeyY が偶数であれば 0x02`{PubkeyX}`、そうでなければ 0x03`{PubkeyX}` となる。

#### RLP Encoding \(Example)<a id="rlp-encoding-example"></a>

```javascript
prvkey 0xf8cc7c3813ad23817466b1802ee805ee417001fcce9376ab8728c92dd8ea0a6b
pubkeyX 0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
pubkeyY 0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e

RLP: 0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
```

### AccountKeyFail <a id="accountkeyfail"></a>

アカウントがAccountKeyFailキーを持つ場合、トランザクション検証処理は常に失敗する。 スマート・コントラクトのアカウントから送信された取引が常に失敗するように、スマート・コントラクトのアカウントに使用することができる。

#### 属性<a id="attributes"></a>

| 属性  | タイプ                               | 説明                                     |
| :-- | :-------------------------------- | :------------------------------------- |
| タイプ | uint8 \(Go\) | AccountKeyFail のタイプ。 それは**0x03**に違いない。 |

#### RLPエンコーディング<a id="rlp-encoding"></a>

`0x03c0`

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

AccountKeyWeightedMultiSigは、閾値と、公開鍵とその重みからなるリストを含むWeightedPublicKeysを含むアカウント鍵タイプである。
トランザクションが AccountKeyWeightedMultiSig に関連付けられたアカウントに対して有効であるためには、以下の条件を満たす必要がある：

- 署名された公開鍵の加重和は、閾値より大きくなければならない。
- 無効な署名はトランザクションに含めるべきでない。
- 署名された公開鍵の数は、weightedPublicKeysの数より少なくなければならない。

:::note

[IstanbulEVM](../misc/klaytn-history.md#istanbul-evm) ハードフォークにより、以下のマルチシグ検証ロジックが追加された。

- 無効な署名はトランザクションに含めるべきでない。
- 署名された公開鍵の数は、weightedPublicKeysの数より少なくなければならない。

:::

#### 属性<a id="attributes"></a>

| 属性                 | タイプ                                                                                                                                                                | 説明                                                   |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| タイプ                | uint8 \(Go\)                                                                                                                                  | AccountKeyWeightedMultiSig の型。 これは**0x04**でなければならない。 |
| Threshold          | uint \(Go\)                                                                                                                                   | 検証のしきい値。 有効なトランザクションであるためには、署名の重みの合計が閾値以上でなければならない。  |
| WeightedPublicKeys | \[\]\{uint, \[33\]byte\} \(Go\) | 重み付けされた公開鍵のリスト。 重み付き公開鍵には、圧縮された公開鍵とその重みが含まれる。        |

#### RLPエンコーディング<a id="rlp-encoding"></a>

`0x04 + encode([threshold, [[weight, CompressedPubKey1], [weight2, CompressedPubKey2]]])`

#### RLP Encoding \(Example)<a id="rlp-encoding-example"></a>

```javascript
Threshold 3
Key0 Weight: 1
PubkeyX 0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e
PubkeyY 0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712
Key1 Weight: 1
PubkeyX 0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb
PubkeyY 0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842
Key2 Weight: 1
PubkeyX 0xea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cd
PubkeyY 0xb95ebb02d9397b4a8faceb58d485d612f0379a923ec0ddcf083378460a56acca
Key3 Weight: 1
PubkeyX 0x8551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6
PubkeyY 0x4206aa84bc8955fcbfcc396854228aa63ebacd81b7311a31ab9d71d90b7ec3d7

RLP: 0x04f89303f890e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfbe301a102ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cde301a1038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6
```

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

AccountKeyRoleBasedはロールベースのキーを表します。 ロールは[Roles](#roles)で指定される。

#### 属性<a id="attributes"></a>

| 属性   | タイプ                                        | 説明                                                                                                                 |
| :--- | :----------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| タイプ  | uint8 \(Go\)          | AccountKeyRoleBased の型。 それは**0x05**に違いない。                                                                          |
| Keys | \{AccountKey}\` ︓︓(Go) | キーのリスト。 鍵は、AccountKeyNil、AccountKeyLegacy、AccountKeyPublic、AccountKeyFail、および AccountKeyWeightedMultiSig のいずれでもよい。 |

#### 役割<a id="roles"></a>

AccountKeyRoleBased のロールは以下のように定義される：

| 役割                | 説明                                                                                                                                                |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| RoleTransaction   | インデックス 0. デフォルトのキー。 TxTypeAccountUpdate以外のトランザクションは、このロールのキーによって署名されなければならない。                                                     |
| RoleAccountUpdate | インデックス 1. TxTypeAccountUpdateトランザクションはこの鍵で署名されるべきである。 このキーがアカウントに存在しない場合、TxTypeAccountUpdateトランザクションはRoleTransactionキーを使用して検証される。 |
| RoleFeePayer      | インデックス 2. このアカウントが送信者の代わりにtx料金を送りたい場合、トランザクションはこの鍵で署名されるべきである。  このキーが口座に存在しない場合、料金委譲取引はRoleTransactionキーを使用して検証される。               |

#### RLPエンコーディング<a id="rlp-encoding"></a>

`0x05 + encode([key1, key2, key3])`

key1、key2、key3 は、上記の鍵のいずれかであることに注意。

#### 許される役割と拡大可能な役割<a id="omissible-and-expandable-roles"></a>

ロールは最後のインデックスから省略することができ、省略されたロールは最初のロールにマップされます。 つまり、RoleTransaction と RoleFeePayer は RoleAccountUpdate なしでは設定できない。 例えば、ロールベースのキーが`0x05 + encode([key1, key2])`に設定されている場合、RoleFeePayerはキーが`0x05 + encode([key1, key2, key1])`のように設定されているかのように動作する。

この機能により、将来的に役割を増やすことができる。 新しいロールが提供された場合、既に古いロールで作成されたアカウントの新しいロールは最初のロールにマップされます。

#### RLP Encoding \(Example)<a id="rlp-encoding-example"></a>

```javascript
RoleTransaction Key
PubkeyX 0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d
PubkeyY 0x0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919
RoleAccountUpdate Key
Threshold: 2
Key0 Weight:1
PubkeyX 0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d
PubkeyY 0x0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919
Key1 Weight:1
PubkeyX 0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06
PubkeyY 0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d
RoleFeePayer Key
PubkeyX 0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447
PubkeyY 0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2

RLP: 0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06a302a102c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447
```

## アカウント・キー・タイプID<a id="account-key-type-id"></a>

以下は、各アカウント・キー・タイプに割り当てられたアカウント・キー・タイプIDである。

| アカウント・キー・タイプ               | アカウント・キー・タイプID |
| -------------------------- | -------------- |
| AccountKeyLegacy           | 0x01           |
| AccountKeyPublic           | 0x02           |
| AccountKeyFail             | 0x03           |
| AccountKeyWeightedMultiSig | 0x04           |
| AccountKeyRoleBased        | 0x05           |

