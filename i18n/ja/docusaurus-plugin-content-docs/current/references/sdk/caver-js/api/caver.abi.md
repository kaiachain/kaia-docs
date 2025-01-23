# ケイバー・アビ

`caver.abi`パッケージを使うと、ABI（Application Binary Interface）を使ってパラメータをデコードしたりエンコードしたりすることができる。 これは、デプロイされたスマート・コントラクトの機能を呼び出すために使用される。

## 符号化関数シグネチャ<a id="encodefunctionsignature"></a>

```javascript
caver.abi.encodeFunctionSignature(functionSignature)
```

これは、パラメータ型を含む関数名のsha3ハッシュの最初の4バイトです。

**パラメーター**

| 名称   | タイプ         | 説明                                                                                                                                                                                                 |
| ---- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 関数署名 | string \\ | エンコードする関数のシグネチャまたはJSONインターフェース・オブジェクト。 If this is a string, it has to be in the form `function(type, type,...)`, e.g: `myFunction(uint256,uint32[],bytes10,bytes)` |

**リターン・バリュー**

| タイプ   | 説明           |
| ----- | ------------ |
| ストリング | 関数のABIシグネチャ。 |

**例**

```javascript
// JSONインターフェースオブジェクトから
> caver.abi.encodeFunctionSignature({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'mystring'
    }]
})
'0x24ee0097'

// 関数シグネチャから
> caver.abi.encodeFunctionSignature('myMethod(uint256,string)')
'0x24ee0097'
```

## エンコード・イベント署名<a id="encodeeventsignature"></a>

```javascript
caver.abi.encodeEventSignature(イベント署名)
```

このシグネチャは、入力パラメータタイプを含むイベント名のsha3ハッシュである。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                                                                           |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| イベント署名 | string \\ | エンコードするイベントのイベントシグネチャまたはJSONインターフェースオブジェクト。 文字列の場合、`event(type,type,...)`という形式でなければならない。例えば、`myEvent(uint256,uint32[],bytes10,bytes)`のようになる。 |

**リターン・バリュー**

| タイプ   | 説明              |
| ----- | --------------- |
| ストリング | イベントのABIシグネチャー。 |

**例**

```javascript
// JSONインターフェースオブジェクトから
> caver.abi.encodeEventSignature({
    name: 'myEvent',
    type: 'event',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'bytes32',
        name: 'myBytes'
    }]
})
'0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97'

// イベントシグネチャから
> caver.abi.encodeEventSignature('myEvent(uint256,bytes32)')
'0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97'
```

## エンコード・パラメータ<a id="encodeparameter"></a>

```javascript
caver.abi.encodeParameter(タイプ, パラメータ)
```

パラメータをその型に基づいて ABI 表現にエンコードする。

**パラメーター**

| 名称    | タイプ         | 説明                                                                                                           |
| ----- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| タイプ   | string \\ | パラメータの型。型のリストについては [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html) を参照してください。 |
| パラメータ | ミックス        | エンコードする実際のパラメータ。                                                                                             |

**NOTE** `tuple` 型は caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0) からサポートされています。 `tuple` 型の詳細については、[Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types) を参照してください。

**リターン・バリュー**

| タイプ   | 説明                 |
| ----- | ------------------ |
| ストリング | ABI エンコードされたパラメータ。 |

**例**

```javascript
> caver.abi.encodeParameter('uint256', '2345675643')
'0x00000000000000000000000000008bd02b7b'

> caver.abi.encodeParameter('bytes32', caver.utils.rightPad('0xdf3234', 64)
'0xdf32340000000000000000000000000000000000'

> caver.abi.encodeParameter('bytes', '0xdf3234', '0xdf32340000000000000000000000') '0x000000000000000020000000000000000008bd02b7b' encodeParameter('bytes', '0xdf3234')
'0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003df32340000000000000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameter('bytes32[]', [caver.utils.rightPad('0xdf3234', 64), caver.utils.rightPad('0xfdfd', 64)])
'0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002df32340000000000000000000000000000000000000000000000000000000000fdfd000000000000000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameter('tuple(bytes32,bool)', ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',true])
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001'

> caver.abi.encodeParameter(
    {
        components：[{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
        name: 'tupleExample',
        type：'tuple',
    },
    ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18', true]
)
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18a18abdef18710a18a18a18a0000000000000000000000000000000000000001'
```

## エンコード・パラメータ<a id="encodeparameters"></a>

```javascript
caver.abi.encodeParameters(typesArray, parameters)
```

JSONインターフェイスオブジェクトに基づいて、関数パラメータをエンコードします。

**パラメーター**

| 名称     | タイプ        | 説明                                                                                                                            |
| ------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| タイプ配列  | Array \\ | 型の配列、または関数の JSON インターフェース。 型のリストについては[solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)を参照してください。 |
| パラメーター | 配列         | エンコードするパラメータ。                                                                                                                 |

**NOTE** `tuple` 型は caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0) からサポートされています。 `tuple` 型の詳細については、[Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types) を参照してください。

**リターン・バリュー**

| タイプ   | 説明                |
| ----- | ----------------- |
| ストリング | ABIエンコードされたパラメータ。 |

**例**

```javascript
'%']>caver.abi.encodeParameters(['uint256','string'], ['2345675643', 'Hello！%'])
'0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameters(['uint8[]','bytes32'], [['34','255'], caver.utils.rightPad('0x324567fff', 64)])
'0x0000000000000000000000000000000000000000000000000000000000000040324567fff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000ff'

> caver.abi.encodeParameters(
    ['tuple(bytes32,bool)', 'tuple(bool,address)'],
    [
        ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18'、true],
        [true, '0x77656c636f6d6520746f20657468657265756d2e']
    ].
)
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'

> caver.abi.encodeParameters(
    [
        {
            components：[{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
            name: 'tupleExample',
            type: 'tuple',
        },
        {
            components：[{ name: 'c', type: 'bool' }, { name: 'd', type: 'address' }],
            name: 'tupleExample2',
            type：'tuple',
        },
    ],
    [
        ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18', true],
        [true, '0x77656c636f6d6520746f20657468657265756d2e']
    ].
)
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'
```

## エンコード関数コール<a id="encodefunctioncall"></a>

```javascript
caver.abi.encodeFunctionCall(jsonInterface,パラメータ)
```

JSONインターフェイスオブジェクトと指定されたパラメータを使用して、関数呼び出しをエンコードします。

**パラメーター**

| 名称            | タイプ    | 説明                        |
| ------------- | ------ | ------------------------- |
| jsonInterface | オブジェクト | 関数の JSON インターフェース・オブジェクト。 |
| パラメーター        | 配列     | エンコードするパラメータ。             |

**リターン・バリュー**

| タイプ   | 説明                                   |
| ----- | ------------------------------------ |
| ストリング | ABIでエンコードされた関数呼び出し、つまり関数シグネチャ＋パラメータ。 |

**例**

```javascript
> caver.abi.encodeFunctionCall({
    name: 'myMethod',
    type: 'function',
    inputs：[{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'mystring'
    }]
}, ['2345675643', 'Hello!%'])
'0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000'
```

## decodeFunctionCall<a id="decodefunctioncall"></a>

```javascript
caver.abi.decodeFunctionCall(abi, functionCall)
```

関数または関数abi文字列のabiオブジェクトから関数呼び出しをデコードし、パラメータを返す。

**NOTE** `caver.abi.decodeFunctionCall`はcaver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3)からサポートされています。

**パラメーター**

| 名称         | タイプ    | 説明                 |
| ---------- | ------ | ------------------ |
| アビ         | オブジェクト | 関数のabiオブジェクト。      |
| ファンクションコール | ストリング  | エンコードされた関数呼び出し文字列。 |

**リターン・バリュー**

| タイプ    | 説明                                                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | プレーンパラメータを含むオブジェクト。 result[0]\`は、パラメーターの順番で配列のようにアクセスできるように用意されているので、それを使うことができる。 |

**例**

```javascript
> caver.abi.decodeFunctionCall({
    name: 'myMethod',
    type: 'function',
    inputs：[{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'mystring'
    }]
}, '0x24ee009700000000000000000000000000008bd02b7b00000000000000000000748656c6c6f21250000000000000000000000000000000000000000000000')
Result {
  '0': '2345675643',
  '1': 'Hello！%',
  __length__: 2,
  myNumber: '2345675643',
  mystring: 'Hello!%'
}.
```

## decodeParameter<a id="decodeparameter"></a>

```javascript
caver.abi.decodeParameter(type, hexstring)
```

ABI エンコードされたパラメータを JavaScript の型にデコードします。

**パラメーター**

| 名称        | タイプ         | 説明                                                                                                           |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| タイプ       | string \\ | パラメータの型。型のリストについては [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html) を参照してください。 |
| ヘックスストリング | 配列          | デコードするABIバイトコード。                                                                                             |

**NOTE** `tuple` 型は caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0) からサポートされています。 `tuple` 型の詳細については、[Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types) を参照してください。

**リターン・バリュー**

| タイプ  | 説明            |
| ---- | ------------- |
| ミックス | デコードされたパラメータ。 |

**例**

```javascript
> caver.abi.decodeParameter('uint256', '0x00000000000000000000000000000010')
'16'

> caver.abi.decodeParameter('string', '0x0000000000000000000000200000000000000000000000000000000848656510') > caver.abi.decodeParameter('string', '0x000000000000000000000000000000000000000000000000000010')decodeParameter('string', '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
'Hello!%!'

> caver.abi.decodeParameter('tuple(bytes32,bool)'、'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001')
[ '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true ]

> caver.abi.decodeParameter(
    {
        components：[{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
        name: 'tupleExample',
        type: 'tuple',
    },
    '0xabdef18710a18abdef18710a18abdef18710a18abdef18710a18a180000000000000000000000000000000000000001'
)
[
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18',
    true,
    a：'0xabdef18710a18a18abdef18710a18abdef18710a18a18',
    b: true
].
```

## decodeParameters<a id="decodeparameters"></a>

```javascript
caver.abi.decodeParameters(typesArray, hexstring)
```

ABI エンコードされたパラメータを JavaScript の型にデコードする。

**パラメーター**

| 名称        | タイプ        | 説明                                                                                                                          |
| --------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| タイプ配列     | Array \\ | 型、または JSON インタフェース出力の配列。 型のリストについては[solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)を参照してください。 |
| ヘックスストリング | ストリング      | デコードするABIバイトコード。                                                                                                            |

**NOTE** `tuple` 型は caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0) からサポートされています。 `tuple` 型の詳細については、[Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types) を参照してください。

**リターン・バリュー**

| タイプ    | 説明                       |
| ------ | ------------------------ |
| オブジェクト | デコードされたパラメータを含む結果オブジェクト。 |

**例**

```javascript
> caver.abi.decodeParameters(['string', 'uint256'], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
Result { '0': 'Hello!%!', '1': '234' }

> caver.abi.decodeParameters([{
        type: 'string',
        name: 'mystring'
    },{
        type: 'uint256',
        name: 'myNumber'
    }], '0x000000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000848656c6f212521000000000000000000000000')
Result {
    '0': 'Hello！%!',
    '1': '234',
    mystring: 'Hello!%!',
    myNumber: '234'
}.

> caver.abi.decodeParameters(
    ['tuple(bytes32,bool)', 'tuple(bool,address)']、
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'
)
結果 {
    '0'：[ '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18', true ],
    '1'：[ true, '0x77656c636f6d6520746F20657468657265756d2E' ],
}.

> caver.abi.decodeParameters(
    [
        {
            components：[{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
            name: 'tupleExample',
            type: 'tuple',
        },
        {
            components：[{ name: 'c', type: 'bool' }, { name: 'd', type: 'address' }],
            name: 'tupleExample2',
            type：'tuple',
        },
    ]、
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'
)
結果 {
    '0'：[
        '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18',
        true,
        a：'0xabdef18710a18a18abdef18710a18abdef18710a18a18',
        b: true
    ],
    '1'：[
        true,
        '0x77656c636f6d6520746F20657468657265756d2E',
        c: true,
        d: '0x77656c636f6d6520746F20657468657265756d2E'
    ],
    tupleExample：[
        '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18',
        true,
        a：'0xabdef18710a18a18abdef18710a18abdef18710a18a18',
        b: true
    ],
    tupleExample2：[
        true,
        '0x77656c636f6d6520746F20657468657265756d2E',
        c: true,
        d: '0x77656c636f6d6520746F20657468657265756d2E'
    ].
}
```

## デコードログ<a id="decodelog"></a>

```javascript
caver.abi.decodeLog(inputs, hexstring, topics)
```

ABIエンコードされたログデータとインデックス化されたトピックデータをデコードする。

**パラメーター**

| 名称        | タイプ   | 説明                                                                                                                                                                                |
| --------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| インプット     | 配列    | JSON インターフェース入力の配列。 型のリストについては[solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)を参照してください。                                                            |
| ヘックスストリング | ストリング | The ABI byte code in the `data` field of a log.                                                                                                                   |
| トピックス     | 配列    | ログのインデックスパラメータトピックの配列。 この配列は、非匿名イベントの場合はtopic[0]を持たず、そうでない場合はtopic[0]を持つ。 |

**リターン・バリュー**

| タイプ    | 説明                    |
| ------ | --------------------- |
| オブジェクト | デコードされたログを含む結果オブジェクト。 |

**例**

```javascript
> caver.abi.decodeLog([{
        type: 'string',
        name: 'mystring'
    },{
        type: 'uint256',
        name: 'myNumber',
        indexed: true
    },{
        type: 'uint8',
        name: 'mySmallNumber',
        indexed: true
    }],
    '0x00000000000000000000000000000000000020000000000000000000000000000748656c6c6f2521000000000000000000000000000000',
    ['0x0000000000000000000000000000000000f310', '0x000000000000000000000000000000000010'])
結果 {
    '0': 'Hello%!',
    '1': '62224',
    '2': '16',
    mystring: 'Hello%!',
    myNumber: '62224',
    mySmallNumber: '16'
}.
```

## エンコード・コントラクト・デプロイ<a id="encodecontractdeploy"></a>

```javascript
caver.abi.encodeContractDeploy(jsonInterface、hexstring [, params])
```

スマート・コントラクトのバイトコードをコンストラクタの引数でエンコードします。

**パラメーター**

| 名称            | タイプ   | 説明                                       |
| ------------- | ----- | ---------------------------------------- |
| jsonInterface | 配列    | 契約の JSON インターフェース。                       |
| ヘックスストリング     | ストリング | デプロイされるスマート・コントラクトのバイトコード。               |
| パラメータ         | ミックス  | (オプション) コンストラクタに渡す引数。 |

**リターン・バリュー**

| タイプ   | 説明                                                                |
| ----- | ----------------------------------------------------------------- |
| ストリング | ABIでエンコードされたスマート・コントラクトのデプロイメントでは、コンストラクタの引数はbyteCode + パラメータとなる。 |

**例**

```javascript
// There is no argument for constructor
> caver.abi.encodeContractDeploy([
        {"constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
    ],'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029')
'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029'

// There is one argument for constructor(uint256)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf0029', 1)
'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf00290000000000000000000000000000000000000000000000000000000000000001'

// There are two arguments for constructor(uint256, uint256)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2)
'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee002900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002'

// There is one argument for constructor(string)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a60029', 'stringParams')
'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a600290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c737472696e67506172616d730000000000000000000000000000000000000000'
```
