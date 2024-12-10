# 创世纪文件

本页描述了 `genesis.json` 文件的详细信息。

## 创世纪 JSON 文件结构<a id="genesis-json-file-structure"></a>

下表描述了 `genesis.json` 文件结构。

| 字段名称       | 说明                                                     |
| ---------- | ------------------------------------------------------ |
| config     | blokchain 配置。 请参阅 [配置](#config) 部分。                    |
| nonce      | (已废弃）该字段源于以太坊，但不用于 Kaia。            |
| timestamp  | 块创建时的 unix 时间。                                         |
| extraData  | 数据组合字段，用于签名者虚荣和 RLP 编码的伊斯坦布尔额外数据，其中包含验证者列表、提议者封印和提交封印。 |
| gasLimit   | 区块中使用的最大气体量。                                           |
| difficulty | (已废弃）该字段源于以太坊，但不用于 Kaia。            |
| mixhash    | (已废弃）该字段源于以太坊，但不用于 Kaia。            |
| coinbase   | 矿工领取奖励的地址。 该字段仅用于 Clique 共识引擎。                         |
| alloc      | 预定义账户。                                                 |
| number     | 区块编号字段。                                                |
| gasUsed    | 一个区块使用的气体量。                                            |
| parentHash | 前一个区块的哈希值。                                             |

### Config <a id="config"></a>

配置 "字段存储与链相关的信息。

| 字段名称                    | 说明                             |
| ----------------------- | ------------------------------ |
| chainId                 | 它能识别当前链，用于防止重放攻击。              |
| istanbulCompatibleBlock | 适用伊斯坦布尔变更的区块编号。                |
| istanbul, clique        | 共识引擎的类型。                       |
| unitPrice               | 单位价格。                          |
| deriveShaImpl           | 定义生成交易哈希值和收据哈希值的方法。            |
| governance              | 网络管理信息。 参见 [治理](#governance)部分 |

### extraData <a id="extradata"></a>

字段 `extraData` 是提议者虚名和 RLP 编码的伊斯坦布尔额外数据的连接：

- 建议者虚名是 32 字节数据，包含任意建议者虚名数据。
- 其余数据为 RLP 编码的伊斯坦布尔额外数据，包含
  - 验证器：按升序排列的验证器列表。
  - 印章：提案人在页眉上的签名。 对于 `genesis.json`，它是一个以 65 `0x0`初始化的字节数组。
  - CommittedSeal：作为共识证明的承诺签名印章列表。 对于 `genesis.json`，它是一个空数组。

**举例**

| 现场            | 类型                                                                                                               | 价值                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 虚荣            | 32 字节十六进制字符串                                                                                                     | 0x0000000000000000000000000000000000000000000000000000000000000000                                                                          |
| Validators    | []address                                                    | [0x48009b4e20ec72aadf306577cbe2eaf54b0ebb16,0x089fcc42fd83baeee4831319375413b8bae3aceb] |
| Seal          | 由 65 个元素组成的字节数组                                                                                                  | [0x0,...,0x0]                           |
| CommittedSeal | [][]byte | []                                                                                      |

创建包含上述数据的 `extraData` 的方法是

```
concat('0x',Vanity,RLPEncode({Validators,Seal,CommittedSeal}))
```

其中，`concat` 是字符串连接函数，`RLPEncode` 是将给定结构转换为 RLP 编码字符串的函数。

With this function, the output `extraData` for this example is 0x0000000000000000000000000000000000000000000000000000000000000000f86fea9448009b4e20ec72aadf306577cbe2eaf54b0ebb1694089fcc42fd83baeee4831319375413b8bae3acebb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0.

## 共识引擎<a id="consensus-engine"></a>

Kaia 网络可用的共识引擎有 Clique 和 Istanbul。 每个引擎的说明如下。

### Clique <a id="clique"></a>

clique "字段存储基于授权证明（POA）的密封配置。

| 字段     | 说明                    |
| ------ | --------------------- |
| period | 连续数据块之间的最小时间间隔（单位：秒）。 |
| epoch  | 重置投票并标记为检查点的区块数。      |

### Istanbul <a id="istanbul"></a>

istanbul "字段存储基于伊斯坦布尔的密封配置。

| 字段     | 说明                                                         |
| ------ | ---------------------------------------------------------- |
| epoch  | 重置选票的区块数即为检查点。                                             |
| policy | 区块建议者遴选政策。 [0：循环赛，1：粘性赛，2：加权随机赛］ |
| sub    | 委员会人数                                                      |

## Governance <a id="governance"></a>

治理 "字段存储网络的治理信息。

| 字段             | 说明                                                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| governanceMode | 三种治理模式之一。 [`none`, `single`, `ballot`]                                                      |
| governingNode  | 指定管理节点的地址。 只有当治理模式为 "单一 "时，它才会起作用。                                                                                                              |
| reward         | It stores the reward configuration. 请参阅 [奖励](#reward）部分。 |

### Reward <a id="reward"></a>

奖励 "字段存储有关网络代币经济的信息。

| 字段                     | 说明                                        |
| ---------------------- | ----------------------------------------- |
| mintingAmount          | 生成区块时铸造的金币数量。 数值需要双引号。                    |
| ratio                  | 用"/"分隔的 "CN/KIR/PoC "的分配率。 所有值的总和必须是 100。 |
| useGiniCoeff           | 是否使用 GINI 系数                              |
| deferredTxFee          | 分配区块 TX 费用的方法。                            |
| stakingUpdateInterval  | 更新定标信息的时间间隔（块高度）。                         |
| proposerUpdateInterval | 更新提案人信息的时间间隔（块高度）。                        |
| minimumStake           | 加入核心单元操作员的最低金额。                           |

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
