# 創世紀文件

本頁描述了 `genesis.json` 文件的詳細信息。

## 創世紀 JSON 文件結構<a id="genesis-json-file-structure"></a>

下表描述了 `genesis.json` 文件結構。

| 字段名稱       | 說明                                                     |
| ---------- | ------------------------------------------------------ |
| config     | blokchain 配置。 請參閱 [配置](#config) 部分。                    |
| nonce      | (已廢棄）該字段源於以太坊，但不用於 Kaia。            |
| timestamp  | 塊創建時的 unix 時間。                                         |
| extraData  | 數據組合字段，用於簽名者虛榮和 RLP 編碼的伊斯坦布爾額外數據，其中包含驗證者列表、提議者封印和提交封印。 |
| gasLimit   | 區塊中使用的最大氣體量。                                           |
| difficulty | (已廢棄）該字段源於以太坊，但不用於 Kaia。            |
| mixhash    | (已廢棄）該字段源於以太坊，但不用於 Kaia。            |
| coinbase   | 礦工領取獎勵的地址。 該字段僅用於 Clique 共識引擎。                         |
| alloc      | 預定義賬戶。                                                 |
| number     | 區塊編號字段。                                                |
| gasUsed    | 一個區塊使用的氣體量。                                            |
| parentHash | 前一個區塊的哈希值。                                             |

### Config <a id="config"></a>

配置 "字段存儲與鏈相關的信息。

| 字段名稱                    | 說明                             |
| ----------------------- | ------------------------------ |
| chainId                 | 它能識別當前鏈，用於防止重放攻擊。              |
| istanbulCompatibleBlock | 適用伊斯坦布爾變更的區塊編號。                |
| istanbul, clique        | 共識引擎的類型。                       |
| unitPrice               | 單位價格。                          |
| deriveShaImpl           | 定義生成交易哈希值和收據哈希值的方法。            |
| governance              | 網絡管理信息。 參見 [治理](#governance)部分 |

### extraData <a id="extradata"></a>

字段 `extraData` 是提議者虛名和 RLP 編碼的伊斯坦布爾額外數據的連接：

- 建議者虛名是 32 字節數據，包含任意建議者虛名數據。
- 其餘數據為 RLP 編碼的伊斯坦布爾額外數據，包含
  - 驗證器：按升序排列的驗證器列表。
  - 印章：提案人在頁眉上的簽名。 對於 `genesis.json`，它是一個以 65 `0x0`初始化的字節數組。
  - CommittedSeal：作為共識證明的承諾簽名印章列表。 對於 `genesis.json`，它是一個空數組。

**舉例**

| 現場            | 類型                                                                                                               | 價值                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 虛榮            | 32 字節十六進制字符串                                                                                                     | 0x0000000000000000000000000000000000000000000000000000000000000000                                                                          |
| Validators    | []address                                                    | [0x48009b4e20ec72aadf306577cbe2eaf54b0ebb16,0x089fcc42fd83baeee4831319375413b8bae3aceb] |
| Seal          | 由 65 個元素組成的字節數組                                                                                                  | [0x0,...,0x0]                           |
| CommittedSeal | [][]byte | []                                                                                      |

創建包含上述數據的 `extraData` 的方法是

```
concat('0x',Vanity,RLPEncode({Validators,Seal,CommittedSeal}))
```

其中，`concat` 是字符串連接函數，`RLPEncode` 是將給定結構轉換為 RLP 編碼字符串的函數。

With this function, the output `extraData` for this example is 0x0000000000000000000000000000000000000000000000000000000000000000f86fea9448009b4e20ec72aadf306577cbe2eaf54b0ebb1694089fcc42fd83baeee4831319375413b8bae3acebb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0.

## 共識引擎<a id="consensus-engine"></a>

Kaia 網絡可用的共識引擎有 Clique 和 Istanbul。 每個引擎的說明如下。

### Clique <a id="clique"></a>

clique "字段存儲基於授權證明（POA）的密封配置。

| 字段     | 說明                    |
| ------ | --------------------- |
| period | 連續數據塊之間的最小時間間隔（單位：秒）。 |
| epoch  | 重置投票並標記為檢查點的區塊數。      |

### Istanbul <a id="istanbul"></a>

istanbul "字段存儲基於伊斯坦布爾的密封配置。

| 字段     | 說明                                                         |
| ------ | ---------------------------------------------------------- |
| epoch  | 重置選票的區塊數即為檢查點。                                             |
| policy | 區塊建議者遴選政策。 [0：循環賽，1：粘性賽，2：加權隨機賽］ |
| sub    | 委員會人數                                                      |

## Governance <a id="governance"></a>

治理 "字段存儲網絡的治理信息。

| 字段             | 說明                                                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| governanceMode | 三種治理模式之一。 [`none`, `single`, `ballot`]                                                      |
| governingNode  | 指定管理節點的地址。 只有當治理模式為 "單一 "時，它才會起作用。                                                                                                              |
| reward         | It stores the reward configuration. 請參閱 [獎勵](#reward）部分。 |

### Reward <a id="reward"></a>

獎勵 "字段存儲有關網絡代幣經濟的信息。

| 字段                     | 說明                                        |
| ---------------------- | ----------------------------------------- |
| mintingAmount          | 生成區塊時鑄造的金幣數量。 數值需要雙引號。                    |
| ratio                  | 用"/"分隔的 "CN/KIR/PoC "的分配率。 所有值的總和必須是 100。 |
| useGiniCoeff           | 是否使用 GINI 係數                              |
| deferredTxFee          | 分配區塊 TX 費用的方法。                            |
| stakingUpdateInterval  | 更新定標信息的時間間隔（塊高度）。                         |
| proposerUpdateInterval | 更新提案人信息的時間間隔（塊高度）。                        |
| minimumStake           | 加入核心單元操作員的最低金額。                           |

## 示例<a id="example"></a>

```
{
    "config": {
        "chainId": 2019,
        "istanbulCompatibleBlock": 0,
        "istanbul": {
            "epoch": 604800,
            "policy": 2,
            "sub": 13
        },
        "unitPrice": 25000000000,
        "deriveShaImpl": 2,
        "governance": {
            "governingNode": "0x46b0bd6380005952759f605d02a6365552c776f3",
            "governanceMode": "single",
            "reward": {
                "mintingAmount": 6400000000000000000,
                "ratio": "50/40/10",
                "useGiniCoeff": true,
                "deferredTxFee": true,
                "stakingUpdateInterval": 86400,
                "proposerUpdateInterval": 3600,
                "minimumStake": 5000000
            }
        }
    },
    "nonce": "0x0",
    "timestamp": "0x5c9af60e",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f89af85494aeae0ab623d4118ac62a2decc386949b5ce67ce29446b0bd6380005952759f605d02a6365552c776f394699b607851c878e29499672f42a769b71f74be8e94e67598eb5831164574c876994d53f63eab4f36d7b8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "gasLimit": "0xe8d4a50fff",
    "difficulty": "0x1",
    "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "0000000000000000000000000000000000000400": {
            "code": "0x6080604052600436106101505763ffffffff60e00a165627a7a7230582093756fe617053766b158f7c64998c746eb38f0d5431cc50231cc9fb2cd1fd9950029",
            "balance": "0x0"
        },
        "46b0bd6380005952759f605d02a6365552c776f3": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "699b607851c878e29499672f42a769b71f74be8e": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "aeae0ab623d4118ac62a2decc386949b5ce67ce2": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "e67598eb5831164574c876994d53f63eab4f36d7": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```
