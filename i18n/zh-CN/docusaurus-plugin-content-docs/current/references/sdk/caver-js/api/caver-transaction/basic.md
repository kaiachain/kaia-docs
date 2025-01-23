---
sidebar_label: 基本
---

# 基本类型交易类

## LegacyTransaction <a id="legacytransaction"></a>

```javascript
caver.transaction.legacyTransaction.create(transactionObject)
```

`LegacyTransaction` represents a [legacy transaction](../../../../../learn/transactions/basic.md#txtypelegacytransaction). kaiaaccount]\(.../.../.../.../.../learn/accounts.md#klaytn-accounts)只能通过[AccountKeyLegacy]执行 "LegacyTransaction"。 transactionObject "可以具有以下属性，以创建 "LegacyTransaction"。

LegacyTransaction\` 的成员变量属性如下。 标记为 "可选 "的属性是指用户创建 "LegacyTransaction "时可在 "transactionObject "中选择给出的属性。

:::note

注意：您可以从 RLP 编码的字符串中创建一个 `LegacyTransaction` 实例。 请参考下面的示例。
**注意** `caver.transaction.legacyTransaction.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

注意：从 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 开始，只支持使用 `create` 函数创建事务。 如果您一直使用类似 `new caver.transaction.legacyTransaction({...})` 的构造函数创建事务，请将其更改为 `caver.transaction.legacyTransaction.create({...})` 。

:::

**属性**

| 名称         | 类型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gas        | 字符串 | 交易允许使用的最高交易费金额。                                                                                                                                                                      |
| value      | 字符串 | (可选，默认值：`'0x0'`）要传输的 KAIA 数量，单位为 peb。 您可以使用 `caver.utils.toPeb`。                                                                                                  |
| from       | 字符串 | (可选）发件人地址。 如果省略，将设置用于签名的钥匙圈地址。                                                                                                                                    |
| to         | 字符串 | (可选，默认：`'0x'`）接收转账金额的账户地址，如果是执行智能合约的传统交易，则为智能联系人地址。 如果传统交易部署了智能合约，则无需定义 `to`。                                                                                     |
| input      | 字符串 | (可选）交易附加数据，用于智能合约部署/执行。                                                                                                                                           |
| signatures | 数组  | (可选）签名数组。 传统交易只能有一个签名。                                                                                                                                            |
| nonce      | 字符串 | (可选）用于唯一标识发件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 将用于设置 nonce。 |
| gasPrice   | 字符串 | (可选）一个乘数，用于计算发件人将支付多少代币。 如果省略，将使用 `caver.rpc.klay.getGasPrice`设置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可选）kaia 网络的链 id。 如果省略，将使用 `caver.rpc.klay.getChainId`设置 chainId。                                                                                                 |

**示例**

```javascript
// Create a legacyTransaction for sending KAIA
> caver.transaction.legacyTransaction.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Create a legacyTransaction to deploy smart contract
> caver.transaction.legacyTransaction.create({
    input: '0x60806...',
    gas: 200000,
})

// Create a legacyTransaction to execute smart contract
> caver.transaction.legacyTransaction.create({
    to: '0xfe6c9118e56a42cbc77aa3b7ee586455e3dc5b6d', // Smart contact address
    input: '0xa9059...',
    gas: 200000,
})

// Create a legacyTransaction from RLP-encoded string
> caver.transaction.legacyTransaction.create('0xf8668204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a843132333425a0b2a5a15550ec298dc7dddde3774429ed75f864c82caeb5ee24399649ad731be9a029da1014d16f2011b3307f7bbe1035b6e699a4204fc416c763def6cefd976567')
LegacyTransaction {
    _type: 'TxTypeLegacyTransaction',
    _from: '0x',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: SignatureData { _v: '0x25', _r: '0xb2a5a...', _s:  '0x29da1...' },
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _input: '0x31323334',
    _value: '0xa'
}
```

## ValueTransfer <a id="valuetransfer"></a>

```javascript
caver.transaction.valueTransfer.create(transactionObject)
```

`ValueTransfer` represents a [value transfer transaction](../../../../../learn/transactions/basic.md#txtypevaluetransfer). transactionObject "可以具有以下属性，以创建 "ValueTransfer "事务。

`ValueTransfer` 的成员变量属性如下。 标记为 "可选 "的属性是指当用户创建 "ValueTransfer "事务时，可以在 "transactionObject "中选择给出的属性。

:::note

注意：您可以从 RLP 编码的字符串中创建一个 `ValueTransfer` 实例。 请参考下面的示例。
注意：从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持 `caver.transaction.valueTransfer.create`。

注意：从 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 开始，只支持使用 `create` 函数创建事务。 如果您一直使用类似 `new caver.transaction.valueTransfer({...})` 的构造函数创建事务，请将其更改为 `caver.transaction.valueTransfer.create({...})`。

:::

**属性**

| 名称         | 类型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value      | 字符串 | 以 peb 为单位的 KAIA 转账金额。 您可以使用 `caver.utils.toPeb`。                                                                                                                                     |
| from       | 字符串 | 发件人地址。                                                                                                                                                                               |
| to         | 字符串 | 接收转账金额的账户地址。                                                                                                                                                                         |
| gas        | 字符串 | 交易允许使用的最高交易费金额。                                                                                                                                                                      |
| signatures | 数组  | (可选）签名数组。                                                                                                                                                         |
| nonce      | 字符串 | (可选）用于唯一标识发件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 将用于设置 nonce。 |
| gasPrice   | 字符串 | (可选）一个乘数，用于计算发件人将支付多少代币。 如果省略，将使用 `caver.rpc.klay.getGasPrice`设置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可选）kaia 网络的链 id。 如果省略，将使用 `caver.rpc.klay.getChainId`设置 chainId。                                                                                                 |

**示例**

```javascript
// Create a valueTransfer
> caver.transaction.valueTransfer.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Create a valueTransfer from RLP-encoded string
> caver.transaction.valueTransfer.create('0x08f87f3a8505d21dba0083015f90948723590d5d60e35f7ce0db5c09d3938b26ff80ae01947d0104ac150f749d36bb34999bcade9f2c0bd2e6f847f845820feaa03d820b27d0997baf16f98df01c7b2b2e9734ad05b2228c4d403c2facff8397f3a01f4a44eeb8b7f0b0019162d1d6b90c401078e56fcd7495e74f7cfcd37e25f017')
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0x7d0104ac150f749d36bb34999bcade9f2c0bd2e6',
    _gas: '0x15f90',
    _nonce: '0x3a',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x3d820...', _s: '0x1f4a4...' } ],
    _to: '0x8723590d5d60e35f7ce0db5c09d3938b26ff80ae',
    _value: '0x1'
}
```

## ValueTransferMemo <a id="valuetransfermemo"></a>

```javascript
caver.transaction.valueTransferMemo.create(transactionObject)
```

ValueTransferMemo "代表一个[价值转移备忘录事务]（.../.../.../.../.../learn/transactions/basic.md#txtypevaluetransfermemo）。 transactionObject "可以具有以下属性，以创建一个 "ValueTransferMemo "事务。

`ValueTransferMemo` 的成员变量属性如下。 标记为 "可选 "的属性是指当用户创建 "ValueTransferMemo "事务时，可选择在 "transactionObject "中给出的属性。

:::note

注意：您可以通过 RLP 编码字符串创建 `ValueTransferMemo` 实例。 请参考下面的示例。
注意：`caver.transaction.valueTransferMemo.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

注意：从 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 开始，只支持使用 `create` 函数创建事务。 如果您一直使用类似 `new caver.transaction.valueTransferMemo({...})` 的构造函数创建事务，请将其更改为 `caver.transaction.valueTransferMemo.create({...})`。

:::

**属性**

| 名称         | 类型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value      | 字符串 | 以 peb 为单位的 KAIA 转账金额。 您可以使用 `caver.utils.toPeb`。                                                                                                                                     |
| from       | 字符串 | 发件人地址。                                                                                                                                                                               |
| to         | 字符串 | 接收转账金额的账户地址。                                                                                                                                                                         |
| input      | 字符串 | 交易附带的数据。 信息应传递给此属性。                                                                                                                                                                  |
| gas        | 字符串 | 交易允许使用的最高交易费金额。                                                                                                                                                                      |
| signatures | 数组  | (可选）签名数组。                                                                                                                                                         |
| nonce      | 字符串 | (可选）用于唯一标识发件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 将用于设置 nonce。 |
| gasPrice   | 字符串 | (可选）一个乘数，用于计算发件人将支付多少代币。 如果省略，将使用 `caver.rpc.klay.getGasPrice`设置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可选）kaia 网络的链 id。 如果省略，将使用 `caver.rpc.klay.getChainId`设置 chainId。                                                                                                 |

**示例**

```javascript
// Create a valueTransferMemo
> caver.transaction.valueTransferMemo.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
})

// Create a valueTransferMemo from RLP-encoded string
> caver.transaction.valueTransferMemo.create('0x10f8808204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84325a07d2b0c89ee8afa502b3186413983bfe9a31c5776f4f820210cffe44a7d568d1ca02b1cbd587c73b0f54969f6b76ef2fd95cea0c1bb79256a75df9da696278509f3')
ValueTransferMemo {
    _type: 'TxTypeValueTransferMemo',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x7d2b0...', _s: '0x2b1cb...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## AccountUpdate <a id="accountupdate"></a>

```javascript
caver.transaction.accountUpdate.create(transactionObject)
```

`AccountUpdate` represents a [account update transaction](../../../../../learn/transactions/basic.md#txtypeaccountupdate). 事务对象 "可以具有以下属性，以创建 "账户更新 "事务。

`AccountUpdate` 的成员变量属性如下。 标记为 "可选 "的属性是指当用户创建 "账户更新 "事务时，可在 "事务对象 "中选择给出的属性。

:::note

注意：您可以通过 RLP 编码字符串创建 `AccountUpdate` 实例。 请参考下面的示例。
注意：从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持 `caver.transaction.accountUpdate.create`。

注意：从 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 开始，只支持使用 `create` 函数创建事务。 如果您一直使用 `new caver.transaction.accountUpdate({...})`这样的构造函数创建事务，请将其更改为 `caver.transaction.accountUpdate.create({...})`。

:::

**属性**

| 名称         | 类型    | 描述                                                                                                                                                                                   |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from       | 字符串   | 发件人地址。                                                                                                                                                                               |
| account    | \[账户] | 包含更新账户所需信息的 \[账户] 实例。                                                                                                                                                                |
| gas        | 字符串   | 交易允许使用的最高交易费金额。                                                                                                                                                                      |
| signatures | 数组    | (可选）签名数组。                                                                                                                                                         |
| nonce      | 字符串   | (可选）用于唯一标识发件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 将用于设置 nonce。 |
| gasPrice   | 字符串   | (可选）一个乘数，用于计算发件人将支付多少代币。 如果省略，将使用 `caver.rpc.klay.getGasPrice`设置 gasPrice。                                                                                        |
| chainId    | 字符串   | (可选）kaia 网络的链 id。 如果省略，将使用 `caver.rpc.klay.getChainId`设置 chainId。                                                                                                 |

关于如何为每个 "账户密钥 "创建一个\[账户]实例，请参阅[入门-账户更新](.../../get-started.md#account-update)或[caver.account.create](.../caver.account.md#caver-account-create)。

**示例**

```javascript
// Create a accountUpdate
> caver.transaction.accountUpdate.create({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
})

// Create a accountUpdate from RLP-encoded string
> caver.transaction.accountUpdate.create('0x20f88d808505d21dba0083030d4094ffb52bc54635f840013e142ebe7c06c9c91c1625a302a102c93fcbdb2b9dbef8ee5c4748ffdce11f1f5b06d7ba71cc2b7699e38be7698d1ef847f845820fe9a09c2ca281e94567846acbeef724b1a7a5f882d581aff9984755abd92272592b8ea0344fd23d7774ae9c227809bb579387dfcd69e74ae2fe3a788617f54a4001e5ab')
AccountUpdate {
    _type: 'TxTypeAccountUpdate',
    _from: '0xffb52bc54635f840013e142ebe7c06c9c91c1625',
    _gas: '0x30d40',
    _nonce: '0x0',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x9c2ca...', _s: '0x344fd...' } ],
    _account: Account {
        _address: '0xffb52bc54635f840013e142ebe7c06c9c91c1625',
        _accountKey: AccountKeyPublic { _publicKey: '0x02c93...' } 
    }
}
```

## SmartContractDeploy <a id="smartcontractdeploy"></a>

```javascript
caver.transaction.smartContractDeploy.create(transactionObject)
```

SmartContractDeploy "代表一个[智能合约部署事务]（.../.../.../.../.../learn/transactions/basic.md#txtypesmartcontractdeploy）。 事务对象 "可以具有以下属性，以创建 "SmartContractDeploy "事务。

`SmartContractDeploy` 的成员变量属性如下。 标记为 "可选 "的属性指的是用户创建 "SmartContractDeploy "事务时可在 "transactionObject "中选择给出的属性。

:::note

注意： 您可以通过 RLP 编码字符串创建 `SmartContractDeploy` 实例。 请参考下面的示例。
注意：从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持 `caver.transaction.smartContractDeploy.create`。

注意：从 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 开始，只支持使用 `create` 函数创建事务。 如果您一直使用类似 `new caver.transaction.smartContractDeploy({...})` 的构造函数创建事务，请将其更改为 `caver.transaction.smartContractDeploy.create({...})`。

:::

**属性**

| 名称            | Type | 描述                                                                                                                                                                                   |
| ------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from          | 字符串  | 发件人地址。                                                                                                                                                                               |
| input         | 字符串  | 交易附带的数据。 要部署的智能合约的字节码及其参数。 您可以通过 [caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy)获取。                                           |
| gas           | 字符串  | 交易允许使用的最高交易费金额。                                                                                                                                                                      |
| value         | 字符串  | (可选，默认：`'0x0'`）合约初始化时，将转入并存储在智能合约地址余额中的 KAIA 金额（单位：peb）。 您可以使用 `caver.utils.toPeb`。                                                                               |
| to            | 字符串  | (可选，默认：`'0x'`）智能合约的部署地址。 目前，该值无法定义。 今后将支持指定地址。                                                                                                                    |
| humanReadable | 布尔值  | (可选，默认为 `false`）由于目前还不支持人类可读地址，因此必须为 false。                                                                                                                       |
| codeFormat    | 字符串  | (可选，默认：`'EVM'`）智能合约代码的编码格式。 目前仅支持 EVM 值。 赋值后，该值将转换为十六进制字符串（例如，`EVM` 将转换为`0x0`）。                                                                                   |
| signatures    | 数组   | (可选）签名数组。                                                                                                                                                         |
| nonce         | 字符串  | (可选）用于唯一标识发件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 将用于设置 nonce。 |
| gasPrice      | 字符串  | (可选）一个乘数，用于计算发件人将支付多少代币。 如果省略，将使用 `caver.rpc.klay.getGasPrice`设置 gasPrice。                                                                                        |
| chainId       | 字符串  | (可选）kaia 网络的链 id。 如果省略，将使用 `caver.rpc.klay.getChainId`设置 chainId。                                                                                                 |

**示例**

```javascript
// Create a smartContractDeploy
> caver.transaction.smartContractDeploy.create({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
})

// Create a smartContractDeploy from RLP-encoded string
> caver.transaction.smartContractDeploy.create('0x28f9027e1f8505d21dba00830dbba0808094d91aec35bea25d379e49cfe2dff5f5775cdac1a3b9020e60806040526000805534801561001457600080fd5b506101ea806100246000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461007257806342cbb15c1461009d578063767800de146100c8578063b22636271461011f578063d14e62b814610150575b600080fd5b34801561007e57600080fd5b5061008761017d565b6040518082815260200191505060405180910390f35b3480156100a957600080fd5b506100b2610183565b6040518082815260200191505060405180910390f35b3480156100d457600080fd5b506100dd61018b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561012b57600080fd5b5061014e60048036038101908080356000191690602001909291905050506101b1565b005b34801561015c57600080fd5b5061017b600480360381019080803590602001909291905050506101b4565b005b60005481565b600043905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b50565b80600081905550505600a165627a7a7230582053c65686a3571c517e2cf4f741d842e5ee6aa665c96ce70f46f9a594794f11eb00298080f847f845820fe9a0018a9f680a74e275f1f83a5c2c45e1313c52432df4595e944240b1511a4f4ba7a02d762c3417f91b81db4907db832cb28cc64df7dca3ea9be64899ab3f4812f016')
SmartContractDeploy {
    _type: 'TxTypeSmartContractDeploy',
    _from: '0xd91aec35bea25d379e49cfe2dff5f5775cdac1a3',
    _gas: '0xdbba0',
    _nonce: '0x1f',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x018a9...', _s: '0x2d762...' } ],
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## SmartContractExecution <a id="smartcontractexecution"></a>

```javascript
caver.transaction.smartContractExecution.create(transactionObject)
```

SmartContractExecution "代表一个[智能合约执行事务]（.../.../.../.../.../learn/transactions/basic.md#txtypesmartcontractexecution）。 事务对象 "可以具有以下属性，以创建 "智能合约执行 "事务。

SmartContractExecution\` 的成员变量属性如下。 标记为 "可选 "的属性指的是用户创建 "SmartContractExecution "事务时可在 "transactionObject "中选择给出的属性。

:::note

注意： 您可以通过 RLP 编码字符串创建 `SmartContractExecution` 实例。 请参考下面的示例。
注意：`caver.transaction.smartContractExecution.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

注意：从 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 开始，只支持使用 `create` 函数创建事务。 如果您一直使用 `new caver.transaction.smartContractExecution({...})`之类的构造函数创建事务，请将其更改为 `caver.transaction.smartContractExecution.create({...})`。

:::

**属性**

| 名称         | 类型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from       | 字符串 | 发件人地址。                                                                                                                                                                               |
| to         | 字符串 | 要执行的智能合约账户的地址。                                                                                                                                                                       |
| input      | 字符串 | 附属于事务的数据，用于执行事务。 输入是一个编码字符串，表示要调用的函数和要传递给该函数的参数。 您可以通过 [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall)获取。                         |
| gas        | 字符串 | 交易允许使用的最高交易费金额。                                                                                                                                                                      |
| value      | 字符串 | (可选，默认值：`'0x0'`）要传输的 KAIA 数量，单位为 peb。 您可以使用 `caver.utils.toPeb`。                                                                                                  |
| signatures | 数组  | (可选）签名数组。                                                                                                                                                         |
| nonce      | 字符串 | (可选）用于唯一标识发件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 将用于设置 nonce。 |
| gasPrice   | 字符串 | (可选）一个乘数，用于计算发件人将支付多少代币。 如果省略，将使用 `caver.rpc.klay.getGasPrice`设置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可选）kaia 网络的链 id。 如果省略，将使用 `caver.rpc.klay.getChainId`设置 chainId。                                                                                                 |

**示例**

```javascript
// Create a smartContractExecution
> caver.transaction.smartContractExecution.create({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
})

// Create a smartContractExecution from RLP-encoded string
> caver.transaction.smartContractExecution.create('0x30f8c5038505d21dba00830dbba094e3cd4e1cd287235cc0ea48c9fd02978533f5ec2b80946b604e77c0fbebb5b2941bcde3ab5eb09d99ad24b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f847f845820feaa066e1650b5779f152489633f343581c07938f8b2fc92c919d4dd7c7295d0beacea067b0b79383dbcd42a3aa8ebb1aa4bcb1fc0623ef9e97bc1e9b82d96fe37b5881')
SmartContractExecution {
    _type: 'TxTypeSmartContractExecution',
    _from: '0x6b604e77c0fbebb5b2941bcde3ab5eb09d99ad24',
    _gas: '0xdbba0',
    _nonce: '0x3',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x66e16...', _s: '0x67b0b...' } ],
    _to: '0xe3cd4e1cd287235cc0ea48c9fd02978533f5ec2b',
    _value: '0x0',
    _input: '0xa9059...'
}
```

## Cancel <a id="cancel"></a>

```javascript
caver.transaction.cancel.create(transactionObject)
```

`Cancel` represents a [cancel transaction](../../../../../learn/transactions/basic.md#txtypecancel). 事务对象 "可以具有以下属性，以创建 "取消 "事务。

Cancel "事务会取消事务池中具有相同 nonce 的事务的执行。

取消 "的成员变量具有以下属性。 标记为 "可选 "的属性是指当用户创建 "取消 "事务时，可在 "事务对象 "中选择给出的属性。

:::note

注意：您可以从 RLP 编码的字符串中创建一个 `Cancel` 实例。 请参考下面的示例。
注意：从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持 `caver.transaction.cancel.create`。

注意：从 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 开始，只支持使用 `create` 函数创建事务。 如果您一直使用类似 `new caver.transaction.xcancelxx({...})` 的构造函数创建事务，请将其更改为 `caver.transaction.cancel.create({...})`。

:::

**属性**

| Name       | 类型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from       | 字符串 | 发件人地址。                                                                                                                                                                               |
| gas        | 字符串 | 交易允许使用的最高交易费金额。                                                                                                                                                                      |
| nonce      | 字符串 | (可选）用于唯一标识发件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 将用于设置 nonce。 |
| signatures | 数组  | (可选）签名数组。                                                                                                                                                         |
| gasPrice   | 字符串 | (可选）一个乘数，用于计算发件人将支付多少代币。 如果省略，将使用 `caver.rpc.klay.getGasPrice`设置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可选）kaia 网络的链 id。 如果省略，将使用 `caver.rpc.klay.getChainId`设置 chainId。                                                                                                 |

**示例**

```javascript
// Create a cancel
> caver.transaction.cancel.create({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
})

// Create a cancel from RLP-encoded string
> caver.transaction.cancel.create('0x38f869068505d21dba00830dbba0946b604e77c0fbebb5b2941bcde3ab5eb09d99ad24f847f845820feaa0d9994ef507951a59380309f656ee8ed685becdc89b1d1a0eb1d2f72683ae14d3a07ad5d37a89781f294fab72b254ea9266e4d039ae163db4a4c4752f1fabff023b')
Cancel {
    _type: 'TxTypeCancel',
    _from: '0x6b604e77c0fbebb5b2941bcde3ab5eb09d99ad24',
    _gas: '0xdbba0',
    _nonce: '0x6',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0xd9994...', _s: '0x7ad5d...' } ]
}
```

## 链式数据分析 <a id="chaindataanchoring"></a>

```javascript
caver.transaction.chainDataAnchoring.create(transactionObject)
```

`ChainDataAnchoring` represents a [chain data anchoring transaction](../../../../../learn/transactions/basic.md#txtypechaindataanchoring). 事务对象 "可以具有以下属性，以创建 "ChainDataAnchoring "事务。

ChainDataAnchoring\` 的成员变量属性如下。 标记为 "可选 "的属性是指用户创建 "ChainDataAnchoring "事务时，可在 "transactionObject "中选择给出的属性。

:::note

注意：您可以通过 RLP 编码字符串创建 `ChainDataAnchoring` 实例。 请参考下面的示例。

注意：从 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 开始，只支持使用 `create` 函数创建事务。 如果您一直使用类似`new caver.transaction.chainDataAnchoring({...})`的构造函数创建事务，请将其更改为`caver.transaction.chainDataAnchoring.create({...})`。

:::

**属性**

| 名称         | 类型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from       | 字符串 | 发件人地址。                                                                                                                                                                               |
| input      | 字符串 | 服务链数据。                                                                                                                                                                               |
| gas        | 字符串 | 交易允许使用的最高交易费金额。                                                                                                                                                                      |
| nonce      | 字符串 | (可选）用于唯一标识发件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 将用于设置 nonce。 |
| signatures | 数组  | (可选）签名数组。                                                                                                                                                         |
| gasPrice   | 字符串 | (可选）一个乘数，用于计算发件人将支付多少代币。 如果省略，将使用 `caver.rpc.klay.getGasPrice`设置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可选）kaia 网络的链 id。 如果省略，将使用 `caver.rpc.klay.getChainId`设置 chainId。                                                                                                 |

**示例**

```javascript
// Create a chainDataAnchoring
> caver.transaction.chainDataAnchoring.create({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
})

// Create a chainDataAnchoring from RLP-encoded string
> caver.transaction.chainDataAnchoring.create('0x48f9010e8204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8a8f8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405f845f84325a0e58b9abf9f33a066b998fccaca711553fb4df425c9234bbb3577f9d9775bb124a02c409a6c5d92277c0a812dd0cc553d7fe1d652a807274c3786df3292cd473e09')
ChainDataAnchoring {
    _type: 'TxTypeChainDataAnchoring',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0xe58b9...', _s: '0x2c409...' } ],
    _input: '0xf8a6a...'
}
```

## EthereumAccessList <a id="ethereumaccesslist"></a>

```javascript
caver.transaction.ethereumAccessList.create(transactionObject)
```

EthereumAccessList "代表一个[以太坊访问列表事务](.../.../.../.../.../learn/transactions/basic.md#txtypeethereumaccesslist)。 A [kaiaaccount](../../../../../learn/accounts.md#klaytn-accounts) can execute a `EthereumAccessList` only with [AccountKeyLegacy]. The `transactionObject` can have properties below to create a `EthereumAccessList`.

`EthereumAccessList` 的成员变量属性如下。 标记为 "optional "的属性指用户创建 "EthereumAccessList "时可在 "transactionObject "中选择给出的属性。

:::note

注意：您可以从 RLP 编码的字符串中创建一个 `EthereumAccessList` 实例。 请参考下面的示例。
注意：`caver.transaction.ethereumAccessList`从 caver-js [v1.8.0](https://www.npmjs.com/package/caver-js/v/1.8.0) 开始支持。

注意：从 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 开始，只支持使用 `create` 函数创建事务。 如果您一直使用类似 `new caver.transaction.ethereumAccessList({...})` 的构造函数创建交易，请将其更改为 `caver.transaction.ethereumAccessList.create({...})`。

:::

**属性**

| 名称         | 类型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gas        | 字符串 | 交易允许使用的最高交易费金额。                                                                                                                                                                      |
| value      | 字符串 | (可选，默认值：`'0x0'`）要传输的 KAIA 数量，单位为 peb。 您可以使用 `caver.utils.toPeb`。                                                                                                  |
| from       | 字符串 | (可选）发件人地址。 如果省略，将设置用于签名的钥匙圈地址。                                                                                                                                    |
| to         | 字符串 | (可选，默认：`'0x'`）接收转账金额的账户地址，或以太坊访问列表交易执行智能合约时的智能联系人地址。 如果以太坊访问列表交易部署了智能合约，则无需定义 `to`。                                                                               |
| input      | 字符串 | (可选）交易附加数据，用于智能合约部署/执行。                                                                                                                                           |
| signatures | 数组  | (可选）签名数组。 以太坊访问列表交易只能有一个签名。                                                                                                                                       |
| nonce      | 字符串 | (可选）用于唯一标识发件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 将用于设置 nonce。 |
| gasPrice   | 字符串 | (可选）一个乘数，用于计算发件人将支付多少代币。 如果省略，将使用 `caver.rpc.klay.getGasPrice`设置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可选）kaia 网络的链 id。 如果省略，将使用 `caver.rpc.klay.getChainId`设置 chainId。                                                                                                 |
| 访问列表       | 数组  | (可选）作为 EIP-2930 访问列表，包含事务读写的所有存储槽和地址。                                                                                                                             |

**示例**

```javascript
> caver.transaction.ethereumAccessList.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 40000,
    accessList: [
        {
            address: '0x5430192ae264b3feff967fc08982b9c6f5694023',
            storageKeys: [
                '0x0000000000000000000000000000000000000000000000000000000000000003',
                '0x0000000000000000000000000000000000000000000000000000000000000007',
            ],
        },
    ]
})

> caver.transaction.ethereumAccessList.create('0x7801f90109822710238505d21dba00829c4094c5fb1386b60160614a8151dcd4b0ae41325d1cb801b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f85bf859945430192ae264b3feff967fc08982b9c6f5694023f842a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000701a05ac25e47591243af2d6b8e7f54d608e9e0e0aeb5194d34c17852bd7e376f4857a0095a40394f33e95cce9695d5badf4270f4cc8aff0b5395cefc3a0fe213be1f30')
EthereumAccessList {
  _type: 'TxTypeEthereumAccessList',
  _from: '0x0000000000000000000000000000000000000000',
  _gas: '0x9c40',
  _nonce: '0x23',
  _chainId: '0x2710',
  _signatures: SignatureData {
    _v: '0x01',
    _r: '0x5ac25e47591243af2d6b8e7f54d608e9e0e0aeb5194d34c17852bd7e376f4857',
    _s: '0x095a40394f33e95cce9695d5badf4270f4cc8aff0b5395cefc3a0fe213be1f30'
  },
  _to: '0xc5fb1386b60160614a8151dcd4b0ae41325d1cb8',
  _input: '0xa9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039',
  _value: '0x1',
  _accessList: AccessList(0) [],
  _gasPrice: '0x5d21dba00'
}
```

## 以太坊动态费用<a id="ethereumdynamicfee"></a>

```javascript
caver.transaction.ethereumDynamicFee.create(transactionObject)
```

EthereumDynamicFee "代表\[以太坊动态费用交易]（.../.../.../.../.../learn/transactions/basic.md#txtypeethereumdynamicfee）。 A [kaiaaccount](../../../../../learn/accounts.md#klaytn-accounts) can execute a `EthereumDynamicFee` only with [AccountKeyLegacy]. The `transactionObject` can have properties below to create a `EthereumDynamicFee`.

EthereumDynamicFee\` 的成员变量属性如下。 标记为 "可选 "的属性指的是用户创建 "以太坊动态费用 "时可在 "交易对象 "中选择给出的属性。
请注意，"EthereumDynamicFee "不使用 "gasPrice"，而是使用 "maxPriorityFeePerGas "和 "maxFeePerGas"。

:::note

注意：您可以通过 RLP 编码字符串创建 `EthereumDynamicFee` 实例。 请参考下面的示例。
注意：`caver.transaction.ethereumDynamicFee`从 caver-js [v1.8.0](https://www.npmjs.com/package/caver-js/v/1.8.0) 开始支持。

注意：从 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 开始，只支持使用 `create` 函数创建事务。 如果您一直使用类似`new caver.transaction.ethereumDynamicFee({...})`的构造函数创建交易，请将其更改为`caver.transaction.ethereumDynamicFee.create({...})`。

:::

**属性**

| 名称                   | 类型  | 描述                                                                                                                                                                         |
| -------------------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gas                  | 字符串 | 交易允许使用的最高交易费金额。                                                                                                                                                            |
| value                | 字符串 | (可选，默认值：`'0x0'`）要传输的 KAIA 数量，单位为 peb。 您可以使用 `caver.utils.toPeb`。                                                                                        |
| from                 | 字符串 | (可选）发件人地址。 如果省略，则将设置为用于签名的钥匙圈地址。                                                                                                                        |
| to                   | 字符串 | (可选，默认：`'0x'`）当以太坊动态收费交易执行智能合约时，接收转账金额或智能联系人地址的账户地址。 当以太坊动态收费交易部署智能合约时，无需定义 `to`。                                                                       |
| input                | 字符串 | (可选）交易附加数据，用于智能合约部署/执行。                                                                                                                                 |
| signatures           | 数组  | (可选）签名数组。 以太坊动态收费交易只能有一个签名。                                                                                                                             |
| nonce                | 字符串 | (可选）用于唯一标识发件人交易的值。 如果省略，将设置为 `caver.rpc.klay.getTransactionCount(address,'pending')`。                                                                   |
| maxPriorityFeePerGas | 字符串 | (可选）用于 peb 交易的气嘴帽。 由于 kaia 有固定的天然气价格，因此应将其设置为与 `caver.rpc.klay.getGasPrice`相同的值。 如果省略，将设置为 `caver.rpc.klay.getMaxPriorityFeePerGas()`。                  |
| maxFeePerGas         | 字符串 | (可选）为执行交易支付的最高金额。 由于 kaia 有固定的天然气价格，因此应将其设置为与 `caver.rpc.klay.getGasPrice`相同的值。 如果省略，"baseFeePerGas \* 2 + maxPriorityFeePerGas "的值将设置为 "maxFeePerGas"。 |
| chainId              | 字符串 | (可选）kaia 网络的链 id。 如果省略，将设置为 `caver.rpc.klay.getChainId`。                                                                                                |
| accessList           | 数组  | (可选）作为 EIP-2930 访问列表，包含事务读写的所有存储槽和地址。                                                                                                                   |

**示例**

```javascript
> caver.transaction.ethereumDynamicFee.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    accessList: [
        {
            address: '0x5430192ae264b3feff967fc08982b9c6f5694023',
            storageKeys: [
                '0x0000000000000000000000000000000000000000000000000000000000000003',
                '0x0000000000000000000000000000000000000000000000000000000000000007',
            ],
        },
    ]
})

> caver.transaction.ethereumDynamicFee.create('0x7802f9010f822710258505d21dba008505d21dba00829c40941fc92c23f71a7de4cdb4394a37fc636986a0f48401b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f85bf8599467116062f1626f7b3019631f03d301b8f701f709f842a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000780a04fc52da183020a27dc4b684a45404445630e946b0c1a37edeb538d4bdae63040a07d56dbcc61f42ffcbced105f838d20b8fe71e85a4d0344c7f60815fddfeae4cc')
EthereumDynamicFee {
  _type: 'TxTypeEthereumDynamicFee',
  _from: '0x0000000000000000000000000000000000000000',
  _gas: '0x9c40',
  _nonce: '0x25',
  _chainId: '0x2710',
  _signatures: SignatureData {
    _v: '0x',
    _r: '0x4fc52da183020a27dc4b684a45404445630e946b0c1a37edeb538d4bdae63040',
    _s: '0x7d56dbcc61f42ffcbced105f838d20b8fe71e85a4d0344c7f60815fddfeae4cc'
  },
  _to: '0x1fc92c23f71a7de4cdb4394a37fc636986a0f484',
  _input: '0xa9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039',
  _value: '0x1',
  _accessList: AccessList(0) [],
  _maxPriorityFeePerGas: '0x5d21dba00',
  _maxFeePerGas: '0x5d21dba00'
}
```

[AccountKeyLegacy]: .../.../.../.../.../.../learn/accounts.md#accountkeylegacy
[Account]: ../caver.account.md#account
