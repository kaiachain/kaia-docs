# 账户

## 凯亚账户<a id="kaia-accounts"></a>

### 账户、州和地址概览<a id="overview-of-account-state-and-address"></a>

Kaia 中的账户是一种数据结构，包含个人余额或智能合约的相关信息。 Kaia 的状态是其所有账户状态的集合，即存储在 Kaia 账户中的所有数据的过去和当前状态。 在 Kaia 节点上执行事务时，Kaia 的状态会随之在所有节点上发生变化。 如果 Kaia 网络中的所有节点都以相同的顺序处理了相同的区块，那么它们的状态应该是相同的。 每个账户的状态信息都与一个 20 字节的地址相关联，该地址用于识别每个账户。

### 解耦密钥对与地址<a id="decoupling-key-pairs-from-addresses"></a>

在典型的区块链平台中，一个账户与一个经过加密处理的地址相关联，该地址具有一定长度，通常看起来像这样："0x0fe2e20716753082222b52e753854f40afddffd2". 该地址与一对密钥紧密相连。 如果选择了一对密钥，地址就会从公开密钥中导出。 这在用户体验方面有很多弊端。 其中包括

- 用户不可能拥有自己想要的地址。
- 用户不可能使用多个配对密钥来提高账户的安全性。
- 当私钥意外暴露或用户希望定期更新私钥以提高账户安全性时，用户不可能更改账户的配对密钥。

这些都是很大的障碍，用户无法将地址视为区块链平台中的标识符。 为了消除这一障碍，Kaia 提供了一项功能，用户可以选择自己的地址和密钥对。 有了这项功能，用户可以选择自己想要的地址，还可以使用多个密钥对来提高安全性。 密钥对的数量可以是一个或多个，密钥对也可以有不同的作用。 有关多密钥对或基于角色的密钥的详细信息，请参阅 [多密钥对和基于角色的密钥](#multiple-key-pairs-and-role-based-keys)。

值得注意的是，Kaia 还支持密钥对和地址强耦合的旧方案。

### 多密钥对和基于角色的密钥<a id="multiple-key-pairs-and-role-based-keys"></a>

如前所述，当私人密钥被盗、暴露或以某种方式泄露时，无法恢复账户的安全性：最好的办法是生成另一个密钥对，创建一个新账户，并将余额从原来泄露的账户转移到新账户。 缺乏对多重签名或特定用途密钥等高级密钥方案的支持，也是造成严重不便的另一个原因。 为了更有效地解决这些问题，Kaia 账户提供了以下功能：

- Kaia 账户允许更改与账户相关的配对密钥。
- Kaia 账户支持多个密钥对，并能为每个密钥分配不同的用途。
- Kaia 账户与拥有与地址紧密相连的单一密钥的账户保持兼容。

通过利用 Kaia 帐户基于角色的多密钥支持，终端用户可以更好地处理现实生活中的安全风险情况，如私钥管理不善。 例如，当用户意识到自己的私人密钥被泄露时，只需从自己的账户中删除被泄露的密钥对，并创建一个新的密钥对来替换它们，就可以替换被泄露的私人密钥。 要做到这一点，可以使用一个用于更新账户信息的专用密钥，该密钥是事先创建的，与泄露的私人密钥分开存储。

### Kaia 钱包钥匙格式<a id="kaia-wallet-key-format"></a>

Kaia 钱包密钥格式可轻松处理私钥和相应地址。 它使用户更容易通过地址来维护自己的私人密钥。 格式为 `0x{private key}0x{type}0x{address in hex}`（十六进制），其中 `{type}`必须为 "00"。 其他值为保留值。 示例如下：

```text
0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d80x000xa94f5374fce5edbc8e2a8697c15331677e6ebf0b
```

### Kaia 账户类型<a id="kaia-account-types"></a>

Kaia 有两种账户：<LinkWithTooltip to="../../misc/glossary#externally-owned-account-eoa" tooltip="User-controlled blockchain accounts for transactions,<br /> secured by a private key.">外部拥有账户</LinkWithTooltip>（EOAs）和<LinkWithTooltip to="../../misc/glossary#smart-contract-account-sca" tooltip="Blockchain account with programmable logic <br />for automated transactions.">智能合约账户</LinkWithTooltip>（SCA）。

#### 外部拥有账户（EOAs）<a id="externally-owned-accounts-eoas"></a>

外部拥有的账户有 nonce 和余额等信息。 这类账户没有代码或存储空间。 EOA 由私人密钥控制，没有与之相关的代码。 可使用成对密钥创建 EOA，然后由拥有成对密钥的任何人进行控制。 账户密钥在 [账户密钥](#account-key) 一节中有说明。

**属性**

| 属性            | 类型                                                    | 说明                                                                                                                                                                                                                                                              |
| :------------ | :---------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 类型            | uint8 \(Go\)                     | 外部拥有账户的类型。 EOA 必须为 **0x1**。                                                                                                                                                                                                                                     |
| nonce         | uint64 \(Go\)                    | 用于确定交易顺序的序列号。 下一个要处理的事务具有与此值相同的 nonce。                                                                                                                                                                                                                          |
| balance       | \*big.Int \(Go\) | 账户中 KAIA 的金额。                                                                                                                                                                                                                                                   |
| humanReadable | bool \(Go\)                      | 布尔值，表示账户与人类可读地址相关联。 由于目前还不支持 HRA（人类可读地址），因此该值对所有账户都是假的。                                                                                                                                                                                                         |
| key           | [AccountKey](#account-key)                            | 与该账户相关的密钥。 该字段可以是 [AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail)、[AccountKeyWeightedMultisig](#accountkeyweightedmultisig)、[AccountKeyRoleBased](#accountkeyrolebased) 中的任意一个。 交易中的签名就是用这个密钥验证的。 |

#### 智能合约账户（SCAs）<a id="smart-contract-accounts-scas"></a>

与 EOA 不同，SCA 有与之相关的代码，并受其代码控制。 SCA 由智能合约部署交易创建；一旦部署完成，SCA 自身无法启动新的交易，必须由 EOA 或其他 SCA 触发另一个账户。

**属性**

| 属性            | 类型                                                                                           | 说明                                                                                                                                                                                                                                                              |
| :------------ | :------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 类型            | uint8 \(Go\)                                                            | 智能合约账户类型。 SCA 必须为 **0x2**。                                                                                                                                                                                                                                      |
| nonce         | uint64 \(Go\)                                                           | 用于确定交易顺序的序列号。 下一个要处理的事务的 nonce 与此值相同。                                                                                                                                                                                                                           |
| balance       | \*big.Int \(Go\)                                        | 账户中 KAIA 的金额。                                                                                                                                                                                                                                                   |
| humanReadable | bool \(Go\)                                                             | 布尔值，表示账户与人类可读地址相关联。 由于目前还不支持 HRA（人类可读地址），因此该值对所有账户都是假的。                                                                                                                                                                                                         |
| key           | [AccountKey](#account-key)                                                                   | 与该账户相关的密钥。 该字段可以是 [AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail)、[AccountKeyWeightedMultisig](#accountkeyweightedmultisig)、[AccountKeyRoleBased](#accountkeyrolebased) 中的任意一个。 交易中的签名就是用这个密钥验证的。 |
| codeHash      | \[\]byte \(Go\)   | 账户智能合约代码的哈希值。 这个值是不可变的，这意味着它只有在智能合约创建时才会被设置。                                                                                                                                                                                                                    |
| storageRoot   | \[32\]byte \(Go\) | 包含账户中所有存储变量值的 Merkle Patricia Trie 根的 256 位散列。                                                                                                                                                                                                                  |
| codeFormat    | uint8 \(Go\)                                                            | 支持解释器版本。 最多可设置 16 个。 目前，它只支持 EVM\(0x00\) 。                                                                                                                                                                                                 |
| vmVersion     | uint8 \(Go\)                                                            | 合约部署时的协议升级（硬分叉）信息（例如 0x0（康斯坦丁堡）、0x1（伊斯坦布尔、伦敦......））。 最多可使用 16 个。 它与合同一起自动创建。                                                                                   |

:::note

注意：从 kaia v1.7.0 开始，智能合约账户将添加 vmVersion 属性。

:::

### Kaia 帐户类型 ID<a id="kaia-account-type-id"></a>

以下是分配给每个账户类型的账户类型 ID。

| 账户类型        | 账户类型 ID |
| ----------- | ------- |
| 外部拥有账户（EOA） | 0x1     |
| 智能合约账户（SCA） | 0x2     |

## 账户密钥<a id="account-key"></a>

账户密钥表示与账户相关的密钥结构。

### AccountKeyNil <a id="accountkeynil"></a>

AccountKeyNil 表示空键。 如果账户试图拥有一个 AccountKeyNil 对象，交易将失败。 AccountKeyNil 仅用于具有基于角色密钥的 TxTypeAccountUpdate 交易。 例如，如果一个账户只尝试更新 RoleAccountUpdate 密钥，那么 TxTypeAccountUpdate 事务的密钥字段将是

`[AccountKeyNil, NewKey, AccountKeyNil]`

然后，只更新 RoleAccountUpdate 密钥。 其他角色不会更新。 详情请参考 [基于帐户密钥的角色](#accountkeyrolebased)。

#### 属性<a id="attributes"></a>

没有 AccountKeyNil 的属性。

#### RLP 编码<a id="rlp-encoding"></a>

`0x80`

### AccountKeyLegacy <a id="accountkeylegacy"></a>

AccountKeyLegacy 用于地址来源于相应密钥对的账户。 如果账户拥有 AccountKeyLegacy，则交易验证过程如下（典型的区块链平台都是这样做的）：

- 从 `ecrecover(txhash, txsig)` 获取公钥。
- 获取公钥地址。
- 地址是发件人。

#### 属性<a id="attributes"></a>

| 属性 | 类型                                | 说明                                  |
| :- | :-------------------------------- | :---------------------------------- |
| 类型 | uint8 \(Go\) | AccountKeyLegacy 的类型。 必须是 **0x01**。 |

#### RLP 编码<a id="rlp-encoding"></a>

`0x01c0`

### AccountKeyPublic <a id="accountkeypublic"></a>

AccountKeyPublic 用于有一个公钥的账户。  
如果账户有一个 AccountKeyPublic 对象，交易验证过程如下：

- 从 `ecrecover(txhash, txsig)` 获取公钥。
- 检查派生公钥是否与相应的

  account's public key.

#### 属性<a id="attributes"></a>

| 属性  | 类型                                                                                           | 说明                                  |
| :-- | :------------------------------------------------------------------------------------------- | :---------------------------------- |
| 类型  | uint8 \(Go\)                                                            | AccountKeyPublic 的类型。 必须是 **0x02**。 |
| Key | \[33\]byte \(Go\) | 密钥应是 S256 曲线上的压缩公钥。                 |

#### RLP 编码<a id="rlp-encoding"></a>

`0x02 + encode(CompressedPubKey)`

**注意**：CompressedPubKey 是[SEC1](https://www.secg.org/SEC1-Ver-1.0.pdf) 中定义的压缩格式的公钥。 简言之，如果 PubkeyY 是偶数，则为 0x02`{PubkeyX}`，否则为 0x03`{PubkeyX}`。

#### RLP 编码 （示例）<a id="rlp-encoding-example"></a>

```javascript
prvkey 0xf8cc7c3813ad23817466b1802ee805ee417001fcce9376ab8728c92dd8ea0a6b
pubkeyX 0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
pubkeyY 0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e

RLP: 0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
```

### AccountKeyFail <a id="accountkeyfail"></a>

如果账户的密钥是 AccountKeyFail，则交易验证过程总是失败。 它可用于智能合约账户，使智能合约账户发送的交易总是失败。

#### 属性<a id="attributes"></a>

| 属性 | 类型                                | 说明                                |
| :- | :-------------------------------- | :-------------------------------- |
| 类型 | uint8 \(Go\) | AccountKeyFail 的类型。 必须是 **0x03**。 |

#### RLP 编码<a id="rlp-encoding"></a>

`0x03c0`

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

AccountKeyWeightedMultiSig 是一种账户密钥类型，包含一个阈值和加权公钥（WeightedPublicKeys），后者包含一个由公钥及其权重组成的列表。
要使交易对与 AccountKeyWeightedMultiSig 关联的账户有效，必须满足以下条件：

- 已签名公钥的加权和应大于阈值。
- 交易中不应包含无效签名。
- 已签名公钥的数量应少于加权公钥的数量。

:::note

在 [IstanbulEVM](../misc/klaytn-history.md#istanbul-evm) 硬分叉中添加了以下 multiSig 验证逻辑。

- 交易中不应包含无效签名。
- 已签名公钥的数量应少于加权公钥的数量。

:::

#### 属性<a id="attributes"></a>

| 属性                 | 类型                                                                                                                                                                 | 说明                                            |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| 类型                 | uint8 \(Go\)                                                                                                                                  | AccountKeyWeightedMultiSig 的类型。 必须是 **0x04**。 |
| Threshold          | uint \(Go\)                                                                                                                                   | 验证阈值。 要成为有效交易，签名的权重总和应大于或等于阈值。                |
| WeightedPublicKeys | \[\]\{uint, \[33\]byte\} \(Go\) | 加权公钥列表。 加权公开密钥包含一个压缩公开密钥及其权重。                 |

#### RLP 编码<a id="rlp-encoding"></a>

`0x04 + encode([threshold, [[weight, CompressedPubKey1], [weight2, CompressedPubKey2]]])`

#### RLP 编码 （示例）<a id="rlp-encoding-example"></a>

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

AccountKeyRoleBased 表示基于角色的密钥。 角色在 [角色](#roles)中指定。

#### 属性<a id="attributes"></a>

| 属性   | 类型                                           | 说明                                                                                                              |
| :--- | :------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| 类型   | uint8 \(Go\)            | AccountKeyRoleBased 的类型。 必须是 **0x05**。                                                                          |
| Keys | \{AccountKey}\` \(Go\) | 钥匙列表。 密钥可以是 AccountKeyNil、AccountKeyLegacy、AccountKeyPublic、AccountKeyFail 和 AccountKeyWeightedMultiSig 中的任意一种。 |

#### 角色<a id="roles"></a>

基于 AccountKeyRoleBased 的角色定义如下：

| 角色                | 说明                                                                                                             |
| :---------------- | :------------------------------------------------------------------------------------------------------------- |
| RoleTransaction   | 索引 0。 默认键。 TxTypeAccountUpdate 以外的交易应由该角色的密钥签名。                                                                |
| RoleAccountUpdate | 索引 1. TxTypeAccountUpdate 交易应由该密钥签名。 如果账户中没有该键，则使用 RoleTransaction 键验证 TxTypeAccountUpdate 交易。 |
| RoleFeePayer      | 索引 2. 如果该账户要代替发件人发送 tx 费用，则交易应由该密钥签名。  如果账户中没有该密钥，则使用 RoleTransaction 密钥验证收费授权交易。              |

#### RLP 编码<a id="rlp-encoding"></a>

`0x05 + encode([key1, key2, key3])`

请注意，key1、key2 和 key3 可以是上述任何键（AccountKeyNil、AccountKeyLegacy、AccountKeyPublic、AccountKeyFail 和 AccountKeyWeightedMultiSig\ ）。

#### 可忽略和可扩展的角色<a id="omissible-and-expandable-roles"></a>

最后一个索引中的角色可以省略，省略的角色会映射到第一个角色。 但是，中间的角色不能省略，也就是说，如果没有角色账户更新，就不能设置角色交易和角色付费人。 例如，如果基于角色的密钥设置为 "0x05 + encode([key1,key2])"，那么 RoleFeePayer 就会像设置为 "0x05 + encode([key1,key2,key1]) "一样工作。

这一功能允许将来增加更多的角色。 如果提供了新角色，则已用旧角色创建的账户的新角色会映射到第一个角色。

#### RLP 编码 （示例）<a id="rlp-encoding-example"></a>

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

## 账户密钥类型 ID<a id="account-key-type-id"></a>

以下是分配给每个账户密钥类型的账户密钥类型 ID。

| 账户密钥类型                     | 账户密钥类型 ID |
| -------------------------- | --------- |
| AccountKeyLegacy           | 0x01      |
| AccountKeyPublic           | 0x02      |
| AccountKeyFail             | 0x03      |
| AccountKeyWeightedMultiSig | 0x04      |
| AccountKeyRoleBased        | 0x05      |

