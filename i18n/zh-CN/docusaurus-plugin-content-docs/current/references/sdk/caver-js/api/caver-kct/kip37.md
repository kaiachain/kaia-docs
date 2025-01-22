# caver.kct.kip37

caver.kct.kip37 "可帮助您在 kaia 区块链上轻松处理以 JavaScript 对象形式实现 KIP-37 的智能合约。

caver.kct.kip37 "继承了[caver.contract](../caver.contract.md)，以实现 KIP-37 代币合约。 caver.kct.kip37 "拥有与 "caver.contract "相同的属性，但还有其他方法来实现额外的功能。 本节仅介绍 "caver.kct.kip37 "新增的绑定方法。

为 caver-js 实现 KIP-37 的代码可在 [Kaia Contracts Github Repo](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP37) 上获取。 用于 caver-js 的 KIP-37 支持 Ownable 接口。 使用此功能，您可以在部署合约时指定合约所有者

有关 KIP-37 的更多信息，请参阅 [Kaia 改进提案](https://kips.kaia.io/KIPs/kip-37)。

**注意** `caver.kct.kip37`从 caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7) 开始支持。

## caver.kct.kip37.deploy <a id="caver-klay-kip37-deploy"></a>

```javascript
caver.kct.kip37.deploy(tokenInfo, deployer)
```

将 KIP-37 代币合约部署到 kaia 区块链上。 使用 caver.kct.kip37.deploy 部署的合约是一种遵循 KIP-37 标准的不可篡改令牌。

成功部署后，将使用新的 KIP17 实例解决承诺问题。

**参数**

| 名称        | 类型                 | 描述                                                                                                                                                                                                                                                                                         |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tokenInfo | object             | 在 kaia 区块链上部署 KIP-37 代币合约所需的信息。 详见下表。                                                                                                                                                                                                                                                      |
| deployer  | string \\| object | 密钥环实例中部署 KIP-37 代币合约的地址。 该地址必须有足够的 KAIA 才能部署。 详情请参见 [Keyring](../caver-wallet/keyring.md#caver-wallet-keyring) 。 如果要定义发送事务时使用的字段，可以将对象类型作为参数传递。 如果要在部署 KIP-17 合约时使用费用委托，可以在对象中定义与费用委托相关的字段。 关于可在对象中定义的字段，请参阅 [创建]（#kip37-create）的参数说明。 |

tokenInfo 对象必须包含以下内容：

| 名称  | 类型     | 描述                                                                                |
| --- | ------ | --------------------------------------------------------------------------------- |
| uri | string | 所有标记类型的 URI，依靠[标记类型 ID 替换机制](http://kips.klaytn.foundation/KIPs/kip-37#metadata)。 |

**返回价值**

PromiEvent\`：一个承诺组合事件发射器，用一个新的 KIP17 实例来解决。 此外，还可能发生以下事件：

| 名称              | 类型     | 描述                                                                                                        |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| transactionHash | string | 在事务发送且事务哈希值可用后立即触发。                                                                                       |
| receipt         | object | 当交易收据可用时触发。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt]。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。 |
| error           | Error  | 发送过程中发生错误时触发。                                                                                             |

**代币注册**

1. 要在区块资源管理器上注册代币，合约创建者必须填写一份提交申请表。 记下表格上所需的具体信息。

2. 智能合约环境

   - 编译器类型固态

   - 编译器版本：v0.8.4+commit.c7e474f2

   - 开源许可证类型：MIT

3. 智能合约详情

   - 优化： --optimize-run 200

   - 源代码：[KIP17 合约 Github 链接](https://github.com/kaiachain/caver-js/blob/dev/packages/caver-kct/src/kip37Token.sol)。

4. ABI 编码值：[kip17JsonInterface at dev - kaiachain/caver-js - GitHub](https://github.com/kaiachain/caver-js/blob/dev/packages/caver-kct/src/kctHelper.js#L1329-L2374)

**示例**

```javascript
// using the promise
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}').then(console.log)
KIP37 {
    ...
    _address: '0x7314B733723AA4a91879b15a6FEdd8962F413CB2',
    _jsonInterface: [
        ...
        {
            anonymous: false,
            inputs: [{ indexed: false, name: 'value', type: 'string' }, { indexed: true, name: 'id', type: 'uint256' }],
            name: 'URI',
            type: 'event',
            signature: '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b',
        }
    ] 
}

// Send object as second parameter
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP37Instance) {
    console.log(newKIP37Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip37.detectInterface <a id="caver-kct-kip37-detectinterface"></a>

```javascript
caver.kct.kip37.detectInterface(contractAddress
```

返回代币合约实现的接口信息。 此静态函数将使用 [kip17.detectInterface](#kip17-detectinterface)。

**参数**

| 名称              | 类型     | 描述             |
| --------------- | ------ | -------------- |
| contractAddress | string | KIP-37 代币合约的地址 |

**返回价值**

Promise "会返回一个 "对象"，其中包含每个[KIP-37 接口](https://kips.kaia.io/KIPs/kip-37#kip-13-identifiers)是否已实现的布尔值结果。

**示例**

```javascript
> caver.kct.kip37.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## caver.kct.kip37.create <a id="caver-kct-kip37-create"></a>

```javascript
caver.kct.kip37.create([tokenAddress
```

创建新的 KIP17 实例及其绑定的方法和事件。 该功能与 [new KIP17]（#new-kip17）相同。

**注意** `caver.kct.kip37.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

**参数**

请参见 [new KIP17]（#new-kip17）。

**返回价值**

请参见 [new KIP17]（#new-kip17）。

**示例**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = caver.kct.kip37.create()

// Create a KIP37 instance with a token address
> const kip37 = caver.kct.kip37.create('0x{address in hex}')
```

## 新 KIP17<a id="new-kip17"></a>

```javascript
new caver.kct.kip37([tokenAddress])
```

创建新的 KIP17 实例及其绑定的方法和事件。

**参数**

| 名称           | 类型     | 描述                                                                                    |
| ------------ | ------ | ------------------------------------------------------------------------------------- |
| tokenAddress | string | (可选）KIP-37 代币合约的地址，可稍后通过 `kip17.options.address = '0x1234...'` 指定。 |

**返回价值**

| 类型     | 描述                  |
| ------ | ------------------- |
| object | KIP17 实例及其绑定的方法和事件。 |

**示例**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = new caver.kct.kip37()

// Create a KIP37 instance with a token address
> const kip37 = new caver.kct.kip37('0x{address in hex}')
```

## kip17.clone<a id="kip17-clone"></a>

```javascript
kip17.clone([tokenAddress])
```

克隆当前 KIP17 实例。

**参数**

| 名称           | 类型     | 描述                                                                   |
| ------------ | ------ | -------------------------------------------------------------------- |
| tokenAddress | string | (可选）部署另一个 KIP-17 代币的智能合约地址。 如果省略，则将设置为原始实例中的合约地址。 |

**返回价值**

| 类型     | 描述              |
| ------ | --------------- |
| object | 原始 KIP17 实例的克隆。 |

**示例**

```javascript
> const kip37 = new caver.kct.kip37(address)

// Clone without a parameter
> const cloned = kip37.clone()

// Clone with the address of the new token contract
> const cloned = kip37.clone('0x{address in hex}')
```

## kip17.detectInterface<a id="kip17-detectinterface"></a>

```javascript
kip17.detectInterface()
```

返回代币合约实现的接口信息。

**参数**

无

**返回价值**

Promise "会返回一个 "对象"，其中包含每个[KIP-37 接口](https://kips.kaia.io/KIPs/kip-37#kip-13-identifiers)是否已实现的布尔值结果。

**示例**

```javascript
> kip37.detectInterface().then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## kip17.supportsInterface<a id="kip17-supportsinterface"></a>

```javascript
kip17.supportsInterface(interfaceId)
```

如果此合约实现了由 `interfaceId` 定义的接口，则返回 `true`。

**参数**

| 名称          | 类型     | 描述                |
| ----------- | ------ | ----------------- |
| interfaceId | string | 要检查的 interfaceId。 |

**返回价值**

`Promise` 返回 `boolean`：如果此合约实现了由 "`interfaceId` 定义的接口，则返回 "true"。

**示例**

```javascript
> kip17.supportsInterface('0x80ac58cd').then(console.log)
true

> kip17.supportsInterface('0xa22cb465').then(console.log)
false
```

## kip17.burn<a id="kip17-burn"></a>

```javascript
kip37.uri(id)
```

返回给定标记的不同统一资源标识符 (URI)。

如果任何 URI 中存在字符串 `{id}`，该函数将用十六进制形式的实际代币 ID 代替。
请参阅 [KIP-34 元数据](http://kips.klaytn.foundation/KIPs/kip-37#metadata)。

**参数**

| 名称 | 类型                                | 描述              |
| -- | --------------------------------- | --------------- |
| id | BigNumber \\| string \\| number | 要获取 uri 的代币 ID。 |

**注意** `index`参数接受`number`类型，但如果输入值超出了number.MAX_SAFE_INTEGER的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

**返回价值**

`Promise` 返回 `string`：代币的名称。

**示例**

```javascript
> kip37.uri('0x0').then(console.log)
'https://caver.example/0000000000000000000000000000000000000000000000000000000000000000.json'
```

## kip17.totalSupply<a id="kip17-totalsupply"></a>

```javascript
kip17.totalSupply()
```

返回特定代币的总供应量。

**参数**

| 名称 | 类型                                | 描述              |
| -- | --------------------------------- | --------------- |
| id | BigNumber \\| string \\| number | 通过代币 ID 查看总供应量。 |

**注意** `index`参数接受`number`类型，但如果输入值超出了number.MAX_SAFE_INTEGER的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

**返回价值**

`Promise` 返回 `BigNumber`：代币总数。

**示例**

```javascript
> kip17.totalSupply().then(console.log)
10
```

## kip17.balanceOf<a id="kip17-balanceof"></a>

```javascript
kip37.balanceOf(account, id)
```

返回 `account` 拥有的代币类型 `id` 的代币数量。

**参数**

| 名称      | 类型                                | 描述           |
| ------- | --------------------------------- | ------------ |
| account | string                            | 您要查看余额的账户地址。 |
| id      | BigNumber \\| string \\| number | 要查看余额的代币 ID。 |

**注意** `index`参数接受`number`类型，但如果输入值超出了number.MAX_SAFE_INTEGER的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

**返回价值**

Promise`返回`BigNumber\`：账户拥有的代币数量。

**示例**

```javascript
> kip17.balanceOf('0x{address in hex}').then(console.log)
9
```

## kip17.balanceOf<a id="kip17-balanceof"></a>

```javascript
kip37.balanceOfBatch(accounts, ids)
```

返回多个账户/代币对的余额。 balanceOfBatch "是[balanceOf](#kip37-balanceof)的批处理操作，包含 "accounts "和 "ids "的数组长度必须相同。

**参数**

| 名称      | 类型    | 描述              |
| ------- | ----- | --------------- |
| account | Array | 您要查看余额的账户地址。    |
| ids     | Array | 要查看余额的代币 ID 数组。 |

**返回价值**

承诺 "返回 "数组"：多个账户/代币对的余额。

**示例**

```javascript
> kip37.balanceOfBatch(['0x{address in hex}', '0x{address in hex}'], [0, 1]).then(console.log)
[ 20, 30 ].
```

## kip17.isMinter<a id="kip17-isminter"></a>

```javascript
kip17.isMinter(address)
```

如果给定账户是可以暂停转让代币的暂停者，则返回 `true`。

**参数**

| 名称 | 类型     | 描述              |
| -- | ------ | --------------- |
| 地址 | string | 检查是否拥有铸币权的账户地址。 |

**返回价值**

`Promise`  返回 \`boolean：如果账户是矿工，则返回 "true"。

**示例**

```javascript
> kip17.isMinter('0x{address in hex}').then(console.log)
true

> kip17.isMinter('0x{address in hex}').then(console.log)
false
```

## kip17.isPauser<a id="kip17-ispauser"></a>

```javascript
kip17.isPauser(address)
```

如果给定账户是可以暂停转让代币的暂停者，则返回 `true`。

**参数**

| 名称      | 类型     | 描述                         |
| ------- | ------ | -------------------------- |
| address | string | 要检查的账户地址，以确定该账户是否有权暂停代币转账。 |

**返回价值**

`Promise` 返回 \`boolean：如果账户是 pauser，则返回 "true"。

**示例**

```javascript
> kip17.isPauser('0x{address in hex}').then(console.log)
true

> kip17.isPauser('0x{address in hex}').then(console.log)
false
```

## kip17.paused<a id="kip17-paused"></a>

```javascript
kip17.paused()
```

返回代币合约的交易（或特定代币）是否暂停。

如果 id 参数未定义，则返回代币合约的交易是否暂停。 如果定义了 id 参数，则返回特定代币是否暂停。

**参数**

| 名称 | 类型                                | 描述                                                                      |
| -- | --------------------------------- | ----------------------------------------------------------------------- |
| id | BigNumber \\| string \\| number | (可选）要检查是否暂停的代币 ID。 如果省略此参数，"paused "函数将返回合约是否处于暂停状态。 |

**注意** `index`参数接受`number`类型，但如果输入值超出了number.MAX_SAFE_INTEGER的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

**返回价值**

`Promise` 返回 `boolean`：如果合约暂停，则返回 `true`。

**示例**

```javascript
// without token id parameter
> kip37.paused().then(console.log)
true
> kip37.paused().then(console.log)
false

// with token id parameter
> kip37.paused(0).then(console.log)
true
> kip37.paused(1).then(console.log)
false
```

## kip17.isApprovedForAll<a id="kip17-isapprovedforall"></a>

```javascript
kip17.isApprovedForAll(owner, operator)
```

查询给定所有者的操作员批准状态。 如果操作员已获得给定所有者的批准，则返回 `true`。

**参数**

| 名称       | 类型     | 描述      |
| -------- | ------ | ------- |
| owner    | string | 所有者地址。  |
| operator | string | 操作员的地址。 |

**返回价值**

`Promise` 返回 `boolean`：如果操作符通过则返回 true，否则返回 false

**示例**

```javascript
> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false

> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true
```

## kip17.name<a id="kip17-name"></a>

```javascript
kip37.create(id, initialSupply [, uri] [, sendParam])
```

创建新的代币类型，并将 `initialSupply` 分配给矿工。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称            | 类型                                | 描述                                    |
| ------------- | --------------------------------- | ------------------------------------- |
| id            | BigNumber \\| string \\| number | 要创建的代币 ID。                            |
| initialSupply | Buffer \\| string \\| number    | 正在铸造的代币数量。                            |
| uri           | string                            | (可选）已创建标记的 URI。    |
| sendParam     | object                            | (可选）保存发送事务所需参数的对象。 |

**注意** `index`参数接受`number`类型，但如果输入值超出了number.MAX_SAFE_INTEGER的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

tokenInfo 对象必须包含以下内容：

| 名称            | 类型                                        | 描述                                                                                                                                                                                                      |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | string                                    | (可选） 发送交易的地址。 如果省略，将由 `kip17.options.from` 设置。 如果未提供 `sendParam` 对象中的 `from` 或 `kip17.options.from`，则会发生错误。                                                                          |
| gas           | number \\| string                        | (可选）本次交易提供的最大 gas（gas 限值）。 如果省略，将由 caver-js 通过调用`kip17.methods.approve(spender, tokenId).estimateGas({from})`来设置。                                                                    |
| gasPrice      | number \\| string                        | (可选）本次交易使用的 Gas 价格（以 peb 为单位）。 如果省略，将由 caver-js 通过调用 `caver.klay.getGasPrice`来设置。                                                                                                    |
| value         | number \\| string \\| BN \\| BigNumber | (可选）以 peb 为单位传输的值。                                                                                                                                                                   |
| feeDelegation | boolean                                   | (可选，默认为 `false`）是否使用费用委托交易。 如果省略，将使用 \`kip17.options.feeDelegation'。 如果两者都省略，则不使用收费授权。                                                               |
| feePayer      | string                                    | (可选）支付交易费的缴费人地址。 当 "feeDelegation "为 "true "时，该值将设置为交易中的 "feePayer "字段。 如果省略，将使用 \`kip17.options.feePayer'。 如果两者都省略，则会出错。                            |
| feeRatio      | string                                    | (可选）缴费人将承担的交易费比例。 如果 "feeDelegation "为 "true"，且 "feeRatio "设置为有效值，则使用部分费用委托交易。 有效范围为 1 到 99。 不允许比率为 0 或 100 及以上。 如果省略，将使用 \`kip17.options.feeRatio'。 |

**注意** `feeDelegation`、`feePayer` 和 `feeRatio`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.create(2, '1000000000000000000', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
    blocknumber: 2823,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 2823,
            transactionHash: '0xee8cdaa0089681d90a52c1539e75c6e26b3eb67affd4fbf70033ba010a3f0d26',
            transactionIndex: 0,
            blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
            logIndex: 0,
            id: 'log_ca64e74b',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '3': '2',
                '4': '1000000000000000000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                id: '2',
                value: '1000000000000000000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x...40000',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...f48' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.create(2, '1000000000000000000', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.create(2, '1000000000000000000').then(console.log)
```

## kip17.setApprovalForAll<a id="kip17-setApprovalforall"></a>

```javascript
kip17.setApprovalForAll(to, approved [, sendParam])
```

批准给定操作符 "转 "或禁止给定操作符转移所有者的所有代币。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型      | 描述                                                                                                                                     |
| --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| operator  | string  | 批准/禁止转让所有者所有代币的账户地址。                                                                                                                   |
| approved  | boolean | 如果 "true"，该操作符将被批准。 如果为 `false`，则不允许使用操作符。                                                                                             |
| sendParam | object  | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.setApprovalForAll('0x{address in hex}', true, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
	blockNumber: 3289,
	contractAddress: null,
	from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
	...
	status: true,
	to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
	...
	events: {
        ApprovalForAll: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3289,
            transactionHash: '0x5e94aa4af5f7604f1b32129fa8463c43cae4ff118f80645bfabcc6181667b8ab',
            transactionIndex: 0,
            blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
            logIndex: 0,
            id: 'log_b1f9938f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '2': true,
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                operator: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                approved: true,
            },
            event: 'ApprovalForAll',
            signature: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
            raw: {
                data: '0x00...001',
                topics: [ '0x17307...', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.setApprovalForAll('0x{address in hex}', true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.setApprovalForAll('0x{address in hex}', true).then(console.log)
```

## kip17.safeTransferFrom<a id="kip17-safetransferfrom"></a>

```javascript
kip17.safeTransferFrom(from, to, tokenId [, data] [, sendParam])
```

安全地将特定代币类型 "id "的给定 "金额 "代笔从 "发送方 "传输到 "接收方"。

授权发送代币所有者代币的地址（操作员）或代币所有者本人将执行该代币转移交易。 因此，授权地址或令牌所有者应是该交易的发送方，其地址必须在 `sendParam.from` 或 `kip17Instance.options.from` 中给出。 除非同时提供 `sendParam.from` 和 `kip17Instance.options.from`，否则会发生错误。

如果 `to` 是合约地址，则必须执行 [IKIP17Receiver.onKIP17Received](https://kips.kaia.io/KIPs/kip-37#kip-37-token-receiver). 否则，转账将被撤销。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型                                | 描述                                                                                                                                     |
| --------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| from      | string                            | 拥有要与津贴机制一起发送的代币的账户地址。                                                                                                                  |
| recipient | string                            | 接收代币的账户地址。                                                                                                                             |
| id        | BigNumber \\| string \\| number | 要传输的代币 ID。                                                                                                                             |
| 数量        | Buffer \\| string \\| number    | 您要转移的代币的 ID。                                                                                                                           |
| data      | Buffer \\| string \\| number    | (可选）与呼叫一起发送的可选数据。                                                                                                   |
| sendParam | object                            | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意** `index`参数接受`number`类型，但如果输入值超出了number.MAX_SAFE_INTEGER的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
    blocknumber: 3983,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3983,
            transactionHash: '0x0efc60b88fc55ef37eafbd18057404334dfd595ce4c2c0ff75f0922b928735e7',
            transactionIndex: 0,
            blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
            logIndex: 0,
            id: 'log_cddf554f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, 'data' { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000).then(console.log)
```

## kip17.safeTransferFrom<a id="kip17-safetransferfrom"></a>

```javascript
kip17.safeTransferFrom(from, to, tokenId [, data] [, sendParam])
```

安全地批量传输多个令牌 id 和值，从 `from` 到 `recipient`。

授权发送代币所有者代币的地址（操作员）或代币所有者本人将执行该代币转移交易。 因此，授权地址或令牌所有者应是该交易的发送方，其地址必须在 `sendParam.from` 或 `kip17Instance.options.from` 中给出。 除非同时提供 `sendParam.from` 和 `kip17Instance.options.from`，否则会发生错误。

如果 `to` 是合约地址，则必须执行 [IKIP17Receiver.onKIP17Received](https://kips.kaia.io/KIPs/kip-37#kip-37-token-receiver). 否则，转账将被撤销。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型                             | 描述                                                                                                                                     |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| from      | string                         | 拥有要与津贴机制一起发送的代币的账户地址。                                                                                                                  |
| recipient | string                         | 接收代币的账户地址。                                                                                                                             |
| ids       | Array                          | 要查看余额的代币 ID 数组。                                                                                                                        |
| amounts   | Array                          | 一个数组，包含您要转移的令牌金额。                                                                                                                      |
| data      | Buffer \\| string \\| number | (可选）与呼叫一起发送的可选数据。                                                                                                   |
| sendParam | object                         | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意** `index`参数接受`number`类型，但如果输入值超出了number.MAX_SAFE_INTEGER的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
    blocknumber: 4621,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 4621,
            transactionHash: '0x557213eef8ae096bc35f5b3bee0e7cf87ecd87129b4a16d4e35a7356c341dad8',
            transactionIndex: 0,
            blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
            logIndex: 0,
            id: 'log_b050bacc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['10', '1000'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['10', '1000'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...3e8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], 'data', { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000]).then(console.log)
```

## kip17.clone<a id="kip17-clone"></a>

```javascript
kip37.mint(to, id, value [, sendParam])
```

根据变量 `to` 和 `value` 提取特定标记类型 `id` 的标记并分配标记。 通过 mint 函数，您可以将 `to` 和 `value` 数组作为参数传递给多个账户，从而一次向多个账户注入特定令牌。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型                             | 描述                                                                                                                                     |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| to        | string \\| Array              | 账户地址或地址数组，将向其发放铸造的代币。                                                                                                                  |
| id        | Buffer \\| string \\| number | 要创建的代币 ID。                                                                                                                             |
| value     | Buffer \\| string \\| number | 正在铸造的代币数量。 如果向 `to` 参数传送包含多个地址的数组，则必须以数组形式传送值。                                                                                         |
| sendParam | object                         | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意** `index`参数接受`number`类型，但如果输入值超出了number.MAX_SAFE_INTEGER的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

**注意**\* 如果给出了 `sendParam.from` 或 `kip17.options.from` ，则应是具有 MinterRole 的矿工。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。

**Example**

```javascript
// Send via a sendParam object with the from field given (Mint the specific tokens to a account)
> kip37.mint('0x{address in hex}', 2, 1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
    blocknumber: 12868,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 12868,
            transactionHash: '0xed25e305904e6efb613a6fe8b7370488554f6508b6701e9a0167c95d341c73dc',
            transactionIndex: 0,
            blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
            logIndex: 0,
            id: 'log_04dffde1',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// Send via a sendParam object with the from field given (Mint the specific tokens to the multiple accounts)
> kip37.mint(['0x{address in hex}', '0x{address in hex}'], 2, [1, 2], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
    blocknumber: 13378,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: [
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 0,
                id: 'log_6975145c',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    '3': '2',
                    '4': '1',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    id: '2',
                    value: '1',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x00...001',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
                },
            },
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 1,
                id: 'log_7fcd4837',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    '3': '2',
                    '4': '2',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    id: '2',
                    value: '2',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x000...002',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...3c4' ],
                },
            },
        ],
    },
}

// Using FD transaction to execute the smart contract
> kip37.mint('0x{address in hex}', 2, 1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mint('0x{address in hex}', 2, 1000).then(console.log)
```

## kip17.balanceOf<a id="kip17-balanceof"></a>

```javascript
kip37.mintBatch(to, ids, values [, sendParam])
```

在一个批次中为特定令牌类型 "ids "的多个 KIP-37 令牌造币，并根据变量 "to "和 "values "分配令牌。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| to        | string | 将向其发行新币的账户地址。                                                                                                                          |
| ids       | Array  | 要查看余额的代币 ID 数组。                                                                                                                        |
| value     | Array  | 一个代币金额数组，表示要铸造的代币金额。                                                                                                                   |
| sendParam | object | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意** `index`参数接受`number`类型，但如果输入值超出了number.MAX_SAFE_INTEGER的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

**注意**\* 如果给出了 `sendParam.from` 或 `kip17.options.from` ，则应是具有 MinterRole 的矿工。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP37 实例的收件具有通过 ABI 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
    blocknumber: 13981,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 13981,
            transactionHash: '0x3e2ddc38210eb3257379a6a59c2e6e341937a4c9e7ef848f1cd0462dfd0b3af6',
            transactionIndex: 0,
            blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
            logIndex: 0,
            id: 'log_d07901ef',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```

## kip37.addMinter <a id="kip37-addminter"></a>

```javascript
kip37.addMinter(account [, sendParam])
```

添加一个允许铸造代币的矿工账户。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| account   | string | 要添加为矿工的账户地址。                                                                                                                           |
| sendParam | object | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意**\* 如果给出了 `sendParam.from` 或 `kip17.options.from` ，则应是矿工。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP37 实例的收件具有通过 ABI 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
    blocknumber: 14172,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        MinterAdded:{
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14172,
            transactionHash: '0xa2c492abde161356d03a23d9ba48e5fd6e69a2e1603dc0286c7c65aac65d0356',
            transactionIndex: 0,
            blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
            logIndex: 0,
            id: 'log_712e7c09',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addMinter('0x{address in hex}').then(console.log)
```

## kip37.renounceMinter<a id="kip37-renounceminter"></a>

```javascript
kip37.renounceMinter([sendParam])
```

放弃铸造代币的权利。 只有铸币厂地址可以放弃铸币权。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | object | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意**\* 如果给出了 `sendParam.from` 或 `kip17.options.from` ，则应是具有 MinterRole 的矿工。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP37 实例的收件具有通过 ABI 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
    blocknumber: 14174,
    contractAddress: null,
    from: '0xf896c5afd69239722013ad0041ef33b5a2fdb1a6',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        MinterRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14174,
            transactionHash: '0x4b06b298f3de6f119901a4444326d21add6fb1b9a5d69c91c998a41af8fd46c9',
            transactionIndex: 0,
            blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
            logIndex: 0,
            id: 'log_9b0f3967',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renounceMinter().then(console.log)
```

## kip37.burn<a id="kip37-burn"></a>

```javascript
kip37.burn(account, id, value [, sendParam])
```

销毁特定的 KIP-37 令牌。

授权发送代币所有者代币的地址（操作员）或代币所有者本人将执行该代币转移交易。 因此，授权地址或代币所有者应是该交易的发送方，其地址必须在 `sendParam.from` 或 `kip17Instance.options.from` 中给出。 除非同时提供 `sendParam.from` 和 `kip17Instance.options.from`，否则会发生错误。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型                             | 描述                                                                                                                                     |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| account   | string                         | 要销毁的代币的账户地址。                                                                                                                           |
| id        | Buffer \\| string \\| number | 要销毁的代币的 ID。                                                                                                                            |
| value     | Buffer \\| string \\| number | 要销毁的代币数量。                                                                                                                              |
| sendParam | object                         | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意** `id` 和 `amount` 参数接受 `number` 类型，但如果输入值超出 number.MAX_SAFE_INTEGER 的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.burn('0x{address in hex}', 2, 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
    blocknumber: 16076,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16076,
            transactionHash: '0xec16313d00d0dbf34608c84e7563bacbde04e7e9c5fbcfffae54f0161356f19c',
            transactionIndex: 0,
            blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
            logIndex: 0,
            id: 'log_9c9ddbc9',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': '2',
                '4': '10',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                id: '2',
                value: '10',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...00a',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burn('0x{address in hex}', 2, 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burn('0x{address in hex}', 2, 10).then(console.log)
```

## kip17.balanceOf<a id="kip17-balanceof"></a>

```javascript
kip37.mintBatch(to, ids, values [, sendParam])
```

烧毁多个 KIP-37 代币。

授权发送代币所有者代币的地址（操作员）或代币所有者本人将执行该代币转移交易。 因此，授权地址或令牌所有者应是该交易的发送方，其地址必须在 `sendParam.from` 或 `kip17Instance.options.from` 中给出。 除非同时提供 `sendParam.from` 和 `kip17Instance.options.from`，否则会发生错误。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| account   | string | 要销毁的代币的账户地址。                                                                                                                           |
| ids       | Array  | 要查看余额的代币 ID 数组。                                                                                                                        |
| value     | Array  | 一个代币金额数组，表示要铸造的代币金额。                                                                                                                   |
| sendParam | object | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意** `index`参数接受`number`类型，但如果输入值超出了number.MAX_SAFE_INTEGER的范围，可能会导致意外结果或错误。 在这种情况下，建议使用 `BigNumber` 类型，特别是对于 `uint256` 大小的数值输入值。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
    blocknumber: 16930,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16930,
            transactionHash: '0xa19ee5c01ad67fd27bb2818b7cbad58ba529d5a7885d79558dea8006e7a760bf',
            transactionIndex: 0,
            blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
            logIndex: 0,
            id: 'log_66e4d23e',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```

## kip17.addPauser<a id="kip17-addpauser"></a>

```javascript
kip17.addPauser(account [, sendParam])
```

添加一个有权中止合约的暂停账户。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| account   | string | 将成为新暂停者的账户地址。                                                                                                                          |
| sendParam | object | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意**\* 如果给出了 `sendParam.from` 或 `kip17.options.from`，则应是具有 PauserRole 的暂停器。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
    blocknumber: 17007,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        PauserAdded: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17007,
            transactionHash: '0xe1d702bbbb44c25b5f4d18cf1e1a1745eb134d6438d5cae77611b1b73944aa93',
            transactionIndex: 0,
            blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
            logIndex: 0,
            id: 'log_50e810b0',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addPauser('0x{address in hex}').then(console.log)
```

## kip17.renouncePauser<a id="kip17-renouncepauser"></a>

```javascript
kip17.renouncePauser([sendParam])
```

放弃暂停合约的权利。 只有暂停地址可以放弃自己的暂停权。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | object | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意**\* 如果给出了 `sendParam.from` 或 `kip17.options.from`，则应是具有 PauserRole 的暂停器。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
    blocknumber: 17010,
    contractAddress: null,
    from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        PauserRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17010,
            transactionHash: '0xa0557cf370cdff56ee2f53555da3e816361125a19cc832caa9d7a62808afeda1',
            transactionIndex: 0,
            blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
            logIndex: 0,
            id: 'log_ebd8d4a4',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renouncePauser().then(console.log)
```

## kip17.paused<a id="kip17-paused"></a>

```javascript
kip17.pause([sendParam])
```

暂停与发送代币相关的功能。 如果定义了 `id` 参数，则暂停特定标记。 否则暂停代币合约。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称        | 类型                             | 描述                                                                                                                                     |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| id        | Buffer \\| string \\| number | (可选）要暂停的代币 ID。 如果省略此参数，"pause "函数将暂停令牌合约。                                                                           |
| sendParam | object                         | (可选）一个对象，包含用于发送事务的定义参数。 有关 sendParam 的更多信息，请参阅 [approve] 的参数说明。 |

**注意**\* 如果给出了 `sendParam.from` 或 `kip17.options.from`，则应是具有 PauserRole 的暂停器。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP17 实例的收据有一个通过 abi 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given (pause the token contract)
> kip37.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
    blocknumber: 17521,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17521,
            transactionHash: '0xc5f3bebe83c86f68d582240f6bb47a8f56867650c9fec3b7caf1cb5861d31af2',
            transactionIndex: 0,
            blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
            logIndex: 0,
            id: 'log_55bd1adc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x00...f48',
                topics: ['0x62e78...'],
            },
        },
    },
}

// Send via a sendParam object with the from field given (pause the specific token)
> kip37.pause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
    blocknumber: 17738,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17738,
            transactionHash: '0x437834d4ccb944397607a81abe1bc229c44749d20c2b4f4b73ae1dd5907f79c9',
            transactionIndex: 0,
            blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
            logIndex: 0,
            id: 'log_b89719ed',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0xabdb1c9133626eb4f8c5f2ec7e3c60a969a2fb148a0c341a3cf6597242c8f8f5',
            raw: {
                data: '0x00...f48',
                topics: ['0xabdb1...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.pause().then(console.log)
```

## kip17.unpause<a id="kip17-unpause"></a>

```javascript
kip17.unpause([sendParam])
```

恢复已暂停的合约或特定代币。 如果定义了 `id` 参数，则取消特定标记的暂停。 否则取消代币合约的暂停。

请注意，此方法将向 kaia 网络提交交易，而 kaia 网络将向发送方收取交易费。

**参数**

| 名称 | 类型                             | 描述                                                               |
| -- | ------------------------------ | ---------------------------------------------------------------- |
| id | Buffer \\| string \\| number | (可选）要取消暂停的代币 ID。 如果省略此参数，"取消暂停 "函数将取消代币合约的暂停。 |

**注意**\* 如果给出了 `sendParam.from` 或 `kip17.options.from`，则应是具有 PauserRole 的暂停器。

**返回价值**

`Promise` 返回 `object` - 包含事务执行结果的收据。 如果您想了解收据对象内部的属性，请参阅 [getTransactionReceipt] 的说明。 来自 KIP37 实例的收件具有通过 ABI 解析的 "事件 "属性，而不是 "日志 "属性。

**示例**

```javascript
// Send via a sendParam object with the from field given (unpause the token contract)
> kip37.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
    blocknumber: 17524,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17524,
            transactionHash: '0x5e67040e12297ee85a3464eae406904c32b7f3c7493cbdbc8f73a2e92b10f56d',
            transactionIndex: 0,
            blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
            logIndex: 0,
            id: 'log_78d5bc18',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x00...f48',
                topics: ['0x5db9e...'],
            },
        },
    },
}

// Send via a sendParam object with the from field given (unpause the specific token)
> kip37.unpause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
    blocknumber: 17742,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17742,
            transactionHash: '0xed920c7b487c3133508cc37f930e4ae3b9c05f01e4ad823909c9b4aacf040f62',
            transactionIndex: 0,
            blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
            logIndex: 0,
            id: 'log_2811c3c5',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0xfe9b5e5216db9de81757f43d20f846bea509c040a560d136b8263dd8cd764238',
            raw: {
                data: '0x00...f48',
                topics: ['0xfe9b5...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.unpause().then(console.log)
```

[getTransactionReceipt]: ../caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt
