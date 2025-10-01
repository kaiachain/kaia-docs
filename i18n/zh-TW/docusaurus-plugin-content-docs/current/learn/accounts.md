# 賬戶

## 凱亞賬戶<a id="kaia-accounts"></a>

### 賬戶、州和地址概覽<a id="overview-of-account-state-and-address"></a>

Kaia 中的賬戶是一種數據結構，包含個人餘額或智能合約的相關信息。 Kaia 的狀態是其所有賬戶狀態的集合，即存儲在 Kaia 賬戶中的所有數據的過去和當前狀態。 在 Kaia 節點上執行事務時，Kaia 的狀態會隨之在所有節點上發生變化。 如果 Kaia 網絡中的所有節點都以相同的順序處理了相同的區塊，那麼它們的狀態應該是相同的。 每個賬戶的狀態信息都與一個 20 字節的地址相關聯，該地址用於識別每個賬戶。

### 解耦密鑰對與地址<a id="decoupling-key-pairs-from-addresses"></a>

在典型的區塊鏈平臺中，一個賬戶與一個經過加密處理的地址相關聯，該地址具有一定長度，通常看起來像這樣："0x0fe2e20716753082222b52e753854f40afddffd2". 該地址與一對密鑰緊密相連。 如果選擇了一對密鑰，地址就會從公開密鑰中導出。 這在用戶體驗方面有很多弊端。 其中包括

- 用戶不可能擁有自己想要的地址。
- 用戶不可能使用多個配對密鑰來提高賬戶的安全性。
- 當私鑰意外暴露或用戶希望定期更新私鑰以提高賬戶安全性時，用戶不可能更改賬戶的配對密鑰。

這些都是很大的障礙，用戶無法將地址視為區塊鏈平臺中的標識符。 為了消除這一障礙，Kaia 提供了一項功能，用戶可以選擇自己的地址和密鑰對。 有了這項功能，用戶可以選擇自己想要的地址，還可以使用多個密鑰對來提高安全性。 密鑰對的數量可以是一個或多個，密鑰對也可以有不同的作用。 有關多密鑰對或基於角色的密鑰的詳細信息，請參閱 [多密鑰對和基於角色的密鑰](#multiple-key-pairs-and-role-based-keys)。

值得注意的是，Kaia 還支持密鑰對和地址強耦合的舊方案。

### 多密鑰對和基於角色的密鑰<a id="multiple-key-pairs-and-role-based-keys"></a>

如前所述，當私人密鑰被盜、暴露或以某種方式洩露時，無法恢復賬戶的安全性：最好的辦法是生成另一個密鑰對，創建一個新賬戶，並將餘額從原來洩露的賬戶轉移到新賬戶。 缺乏對多重簽名或特定用途密鑰等高級密鑰方案的支持，也是造成嚴重不便的另一個原因。 為了更有效地解決這些問題，Kaia 賬戶提供了以下功能：

- Kaia 賬戶允許更改與賬戶相關的配對密鑰。
- Kaia 賬戶支持多個密鑰對，並能為每個密鑰分配不同的用途。
- Kaia 賬戶與擁有與地址緊密相連的單一密鑰的賬戶保持兼容。

通過利用 Kaia 帳戶基於角色的多密鑰支持，終端用戶可以更好地處理現實生活中的安全風險情況，如私鑰管理不善。 例如，當用戶意識到自己的私人密鑰被洩露時，只需從自己的賬戶中刪除被洩露的密鑰對，並創建一個新的密鑰對來替換它們，就可以替換被洩露的私人密鑰。 要做到這一點，可以使用一個用於更新賬戶信息的專用密鑰，該密鑰是事先創建的，與洩露的私人密鑰分開存儲。

### Kaia 錢包鑰匙格式<a id="kaia-wallet-key-format"></a>

Kaia 錢包密鑰格式可輕鬆處理私鑰和相應地址。 它使用戶更容易通過地址來維護自己的私人密鑰。 格式為 `0x{private key}0x{type}0x{address in hex}`（十六進制），其中 `{type}`必須為 "00"。 其他值為保留值。 示例如下：

```text
0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d80x000xa94f5374fce5edbc8e2a8697c15331677e6ebf0b
```

### Kaia 賬戶類型<a id="kaia-account-types"></a>

Kaia 有兩種賬戶：<LinkWithTooltip to="../../misc/glossary#externally-owned-account-eoa" tooltip="User-controlled blockchain accounts for transactions,<br /> secured by a private key.">外部擁有賬戶</LinkWithTooltip>（EOAs）和<LinkWithTooltip to="../../misc/glossary#smart-contract-account-sca" tooltip="Blockchain account with programmable logic <br />for automated transactions.">智能合約賬戶</LinkWithTooltip>（SCA）。

#### 外部擁有賬戶（EOAs）<a id="externally-owned-accounts-eoas"></a>

外部擁有的賬戶有 nonce 和餘額等信息。 這類賬戶沒有代碼或存儲空間。 EOA 由私人密鑰控制，沒有與之相關的代碼。 可使用成對密鑰創建 EOA，然後由擁有成對密鑰的任何人進行控制。 賬戶密鑰在 [賬戶密鑰](#account-key) 一節中有說明。

**屬性**

| 屬性            | 類型                                                    | 說明                                                                                                                                                                                                                                                              |
| :------------ | :---------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 類型            | uint8 \(Go\)                     | 外部擁有賬戶的類型。 EOA 必須為 **0x1**。                                                                                                                                                                                                                                     |
| nonce         | uint64 \(Go\)                    | 用於確定交易順序的序列號。 下一個要處理的事務具有與此值相同的 nonce。                                                                                                                                                                                                                          |
| balance       | \*big.Int \(Go\) | 賬戶中 KAIA 的金額。                                                                                                                                                                                                                                                   |
| humanReadable | bool \(Go\)                      | 布爾值，表示賬戶與人類可讀地址相關聯。 由於目前還不支持 HRA（人類可讀地址），因此該值對所有賬戶都是假的。                                                                                                                                                                                                         |
| key           | [AccountKey](#account-key)                            | 與該賬戶相關的密鑰。 該字段可以是 [AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail)、[AccountKeyWeightedMultisig](#accountkeyweightedmultisig)、[AccountKeyRoleBased](#accountkeyrolebased) 中的任意一個。 交易中的簽名就是用這個密鑰驗證的。 |

#### 智能合約賬戶（SCAs）<a id="smart-contract-accounts-scas"></a>

與 EOA 不同，SCA 有與之相關的代碼，並受其代碼控制。 SCA 由智能合約部署交易創建；一旦部署完成，SCA 自身無法啟動新的交易，必須由 EOA 或其他 SCA 觸發另一個賬戶。

**屬性**

| 屬性            | 類型                                                                                           | 說明                                                                                                                                                                                                                                                              |
| :------------ | :------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 類型            | uint8 \(Go\)                                                            | 智能合約賬戶類型。 SCA 必須為 **0x2**。                                                                                                                                                                                                                                      |
| nonce         | uint64 \(Go\)                                                           | 用於確定交易順序的序列號。 下一個要處理的事務的 nonce 與此值相同。                                                                                                                                                                                                                           |
| balance       | \*big.Int \(Go\)                                        | 賬戶中 KAIA 的金額。                                                                                                                                                                                                                                                   |
| humanReadable | bool \(Go\)                                                             | 布爾值，表示賬戶與人類可讀地址相關聯。 由於目前還不支持 HRA（人類可讀地址），因此該值對所有賬戶都是假的。                                                                                                                                                                                                         |
| key           | [AccountKey](#account-key)                                                                   | 與該賬戶相關的密鑰。 該字段可以是 [AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail)、[AccountKeyWeightedMultisig](#accountkeyweightedmultisig)、[AccountKeyRoleBased](#accountkeyrolebased) 中的任意一個。 交易中的簽名就是用這個密鑰驗證的。 |
| codeHash      | \[\]byte \(Go\)   | 賬戶智能合約代碼的哈希值。 這個值是不可變的，這意味著它只有在智能合約創建時才會被設置。                                                                                                                                                                                                                    |
| storageRoot   | \[32\]byte \(Go\) | 包含賬戶中所有存儲變量值的 Merkle Patricia Trie 根的 256 位散列。                                                                                                                                                                                                                  |
| codeFormat    | uint8 \(Go\)                                                            | 支持解釋器版本。 最多可設置 16 個。 目前，它只支持 EVM\(0x00\) 。                                                                                                                                                                                                 |
| vmVersion     | uint8 \(Go\)                                                            | 合約部署時的協議升級（硬分叉）信息（例如 0x0（康斯坦丁堡）、0x1（伊斯坦布爾、倫敦......））。 最多可使用 16 個。 它與合同一起自動創建。                                                                                   |

:::note

注意：從 kaia v1.7.0 開始，智能合約賬戶將添加 vmVersion 屬性。

:::

### Kaia 帳戶類型 ID<a id="kaia-account-type-id"></a>

以下是分配給每個賬戶類型的賬戶類型 ID。

| 賬戶類型        | 賬戶類型 ID |
| ----------- | ------- |
| 外部擁有賬戶（EOA） | 0x1     |
| 智能合約賬戶（SCA） | 0x2     |

## 賬戶密鑰<a id="account-key"></a>

賬戶密鑰表示與賬戶相關的密鑰結構。

### AccountKeyNil <a id="accountkeynil"></a>

AccountKeyNil 表示空鍵。 如果賬戶試圖擁有一個 AccountKeyNil 對象，交易將失敗。 AccountKeyNil 僅用於具有基於角色密鑰的 TxTypeAccountUpdate 交易。 例如，如果一個賬戶只嘗試更新 RoleAccountUpdate 密鑰，那麼 TxTypeAccountUpdate 事務的密鑰字段將是

`[AccountKeyNil, NewKey, AccountKeyNil]`

然後，只更新 RoleAccountUpdate 密鑰。 其他角色不會更新。 詳情請參考 [基於帳戶密鑰的角色](#accountkeyrolebased)。

#### 屬性<a id="attributes"></a>

沒有 AccountKeyNil 的屬性。

#### RLP 編碼<a id="rlp-encoding"></a>

`0x80`

### AccountKeyLegacy <a id="accountkeylegacy"></a>

AccountKeyLegacy 用於地址來源於相應密鑰對的賬戶。 如果賬戶擁有 AccountKeyLegacy，則交易驗證過程如下（典型的區塊鏈平臺都是這樣做的）：

- 從 `ecrecover(txhash, txsig)` 獲取公鑰。
- 獲取公鑰地址。
- 地址是發件人。

#### 屬性<a id="attributes"></a>

| 屬性 | 類型                                | 說明                                  |
| :- | :-------------------------------- | :---------------------------------- |
| 類型 | uint8 \(Go\) | AccountKeyLegacy 的類型。 必須是 **0x01**。 |

#### RLP 編碼<a id="rlp-encoding"></a>

`0x01c0`

### AccountKeyPublic <a id="accountkeypublic"></a>

AccountKeyPublic 用於有一個公鑰的賬戶。  
如果賬戶有一個 AccountKeyPublic 對象，交易驗證過程如下：

- 從 `ecrecover(txhash, txsig)` 獲取公鑰。
- 檢查派生公鑰是否與相應的

  account's public key.

#### 屬性<a id="attributes"></a>

| 屬性  | 類型                                                                                           | 說明                                  |
| :-- | :------------------------------------------------------------------------------------------- | :---------------------------------- |
| 類型  | uint8 \(Go\)                                                            | AccountKeyPublic 的類型。 必須是 **0x02**。 |
| Key | \[33\]byte \(Go\) | 密鑰應是 S256 曲線上的壓縮公鑰。                 |

#### RLP 編碼<a id="rlp-encoding"></a>

`0x02 + encode(CompressedPubKey)`

**注意**：CompressedPubKey 是[SEC1](https://www.secg.org/SEC1-Ver-1.0.pdf) 中定義的壓縮格式的公鑰。 簡言之，如果 PubkeyY 是偶數，則為 0x02`{PubkeyX}`，否則為 0x03`{PubkeyX}`。

#### RLP 編碼 （示例）<a id="rlp-encoding-example"></a>

```javascript
prvkey 0xf8cc7c3813ad23817466b1802ee805ee417001fcce9376ab8728c92dd8ea0a6b
pubkeyX 0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
pubkeyY 0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e

RLP: 0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
```

### AccountKeyFail <a id="accountkeyfail"></a>

如果賬戶的密鑰是 AccountKeyFail，則交易驗證過程總是失敗。 它可用於智能合約賬戶，使智能合約賬戶發送的交易總是失敗。

#### 屬性<a id="attributes"></a>

| 屬性 | 類型                                | 說明                                |
| :- | :-------------------------------- | :-------------------------------- |
| 類型 | uint8 \(Go\) | AccountKeyFail 的類型。 必須是 **0x03**。 |

#### RLP 編碼<a id="rlp-encoding"></a>

`0x03c0`

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

AccountKeyWeightedMultiSig 是一種賬戶密鑰類型，包含一個閾值和加權公鑰（WeightedPublicKeys），後者包含一個由公鑰及其權重組成的列表。
要使交易對與 AccountKeyWeightedMultiSig 關聯的賬戶有效，必須滿足以下條件：

- 已簽名公鑰的加權和應大於閾值。
- 交易中不應包含無效簽名。
- 已簽名公鑰的數量應少於加權公鑰的數量。

:::note

The following multiSig validation logic has been added with the [IstanbulEVM](../misc/klaytn-history.md#istanbul-evm) hardfork.

- 交易中不應包含無效簽名。
- 已簽名公鑰的數量應少於加權公鑰的數量。

:::

#### 屬性<a id="attributes"></a>

| 屬性                 | 類型                                                                                                                                                                 | 說明                                            |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| 類型                 | uint8 \(Go\)                                                                                                                                  | AccountKeyWeightedMultiSig 的類型。 必須是 **0x04**。 |
| Threshold          | uint \(Go\)                                                                                                                                   | 驗證閾值。 要成為有效交易，簽名的權重總和應大於或等於閾值。                |
| WeightedPublicKeys | \[\]\{uint, \[33\]byte\} \(Go\) | 加權公鑰列表。 加權公開密鑰包含一個壓縮公開密鑰及其權重。                 |

#### RLP 編碼<a id="rlp-encoding"></a>

`0x04 + encode([threshold, [[weight, CompressedPubKey1], [weight2, CompressedPubKey2]]])`

#### RLP 編碼 （示例）<a id="rlp-encoding-example"></a>

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

AccountKeyRoleBased 表示基於角色的密鑰。 角色在 [角色](#roles)中指定。

#### 屬性<a id="attributes"></a>

| 屬性   | 類型                                           | 說明                                                                                                              |
| :--- | :------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| 類型   | uint8 \(Go\)            | AccountKeyRoleBased 的類型。 必須是 **0x05**。                                                                          |
| Keys | \{AccountKey}\` \(Go\) | 鑰匙列表。 密鑰可以是 AccountKeyNil、AccountKeyLegacy、AccountKeyPublic、AccountKeyFail 和 AccountKeyWeightedMultiSig 中的任意一種。 |

#### 角色<a id="roles"></a>

基於 AccountKeyRoleBased 的角色定義如下：

| 角色                | 說明                                                                                                             |
| :---------------- | :------------------------------------------------------------------------------------------------------------- |
| RoleTransaction   | 索引 0。 默認鍵。 TxTypeAccountUpdate 以外的交易應由該角色的密鑰簽名。                                                                |
| RoleAccountUpdate | 索引 1. TxTypeAccountUpdate 交易應由該密鑰簽名。 如果賬戶中沒有該鍵，則使用 RoleTransaction 鍵驗證 TxTypeAccountUpdate 交易。 |
| RoleFeePayer      | 索引 2. 如果該賬戶要代替發件人發送 tx 費用，則交易應由該密鑰簽名。  如果賬戶中沒有該密鑰，則使用 RoleTransaction 密鑰驗證收費授權交易。              |

#### RLP 編碼<a id="rlp-encoding"></a>

`0x05 + encode([key1, key2, key3])`

請注意，key1、key2 和 key3 可以是上述任何鍵（AccountKeyNil、AccountKeyLegacy、AccountKeyPublic、AccountKeyFail 和 AccountKeyWeightedMultiSig\ ）。

#### 可忽略和可擴展的角色<a id="omissible-and-expandable-roles"></a>

最後一個索引中的角色可以省略，省略的角色會映射到第一個角色。 但是，中間的角色不能省略，也就是說，如果沒有角色賬戶更新，就不能設置角色交易和角色付費人。 例如，如果基於角色的密鑰設置為 "0x05 + encode([key1,key2])"，那麼 RoleFeePayer 就會像設置為 "0x05 + encode([key1,key2,key1]) "一樣工作。

這一功能允許將來增加更多的角色。 如果提供了新角色，則已用舊角色創建的賬戶的新角色會映射到第一個角色。

#### RLP 編碼 （示例）<a id="rlp-encoding-example"></a>

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

## 賬戶密鑰類型 ID<a id="account-key-type-id"></a>

以下是分配給每個賬戶密鑰類型的賬戶密鑰類型 ID。

| 賬戶密鑰類型                     | 賬戶密鑰類型 ID |
| -------------------------- | --------- |
| AccountKeyLegacy           | 0x01      |
| AccountKeyPublic           | 0x02      |
| AccountKeyFail             | 0x03      |
| AccountKeyWeightedMultiSig | 0x04      |
| AccountKeyRoleBased        | 0x05      |

