# Block

## 기본 블록 매개변수 <a id="the-default-block-parameter"></a>

`eth` 네임스페이스를 사용하여 API 요청을 보낼 때 블록 높이는 `defaultBlock` 매개변수에 의해 결정됩니다.

`defaultBlock` 매개변수에는 다음과 같은 옵션을 사용할 수 있습니다:

- `HEX String` - 정수 블록 번호
- 가장 초기/제네시스 블록의 경우 `String "earliest"`입니다.
- `String "latest"` - 가장 최근에 채굴된 블록입니다.
- `String "pending"` - 보류 상태/트랜잭션의 경우

## eth_blockNumber <a id="eth_blocknumber"></a>

가장 최근 블록의 번호를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명                            |
| -------- | ----------------------------- |
| QUANTITY | 클라이언트가 현재 접속 중인 블록 번호의 정수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":83,
  "result": "0xc94"
}
```

## eth_getHeaderByNumber <a id="eth_getheaderbynumber"></a>

헤더에 대한 정보를 번호별로 반환합니다.

이 API를 사용하기 전에 [Caution 헤더](./caution.md#block_header)를 확인하시기 바랍니다.

**매개변수**

| 유형              | 설명                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

**리턴 값**

[eth_getHeaderByHash](#eth_getheaderbyhash)를 참조하세요.

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByNumber","params":["0x1b4"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x5d21dba00",
        "difficulty": "0x1",
        "extraData": "0x",
        "gasLimit": "0xe8d4a50fff",
        "gasUsed": "0x28b484",
        "hash": "0x5de0dc71dec2e724be002dcad135b602810769ce26e16b3b06862405e08ca71b",
        "logsBloom": "0x02200022800002050000084080014015001001004b0002440401060a0830000200014041044010180010430018800119120098000800200241c2090a4020011040004400002201081800440a340020a4000820100848081020003000892050105a05000002100000200012c0800408982000085100000c4040a03814000800200812210100200010004018410d80004214800123210400082002214620100021028800120309200802008291c8e000904210080008110900010100081000101000501002010a0080311886000008000000240900400000100200a402005830200010300804020200000002310000008004004080a58000550000508000000000",
        "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x1b4",
        "parentHash": "0x99fcd33dddd763835ba8bdc842853d973496a7e64ea2f6cf826bc2c338e23b0c",
        "receiptsRoot": "0xd3d70ed54a9274ba3191bf2d4fd8738c5d782fe17c8bfb45c03a25dc04120c35",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x23a",
        "stateRoot": "0x1076e6726164bd6f74720a717242584109f37c55017d004eefccf9ec3be76c18",
        "timestamp": "0x61b0a6c6",
        "totalDifficulty": "0x12",
        "transactionsRoot": "0x6ec8daca98c1005d9bbd7716b5e94180e2bf0e6b77770174563a166337369344" }
}   
```

## eth_getHeaderByHash <a id="eth_getheaderbyhash"></a>

헤더에 대한 정보를 해시로 반환합니다.

이 API를 사용하기 전에 [Caution 헤더](./caution.md#block_header)를 확인하시기 바랍니다.

**매개변수**

| 유형           | 설명      |
| ------------ | ------- |
| 32-byte DATA | 블록의 해시. |

**리턴 값**

`Object` - 헤더 객체, 헤더를 찾을 수 없는 경우 `null`을 반환합니다. 그렇지 않으면 오류를 반환합니다.

| 이름               | 유형            | 설명                                               |
| ---------------- | ------------- | ------------------------------------------------ |
| baseFeePerGas    | QUANTITY      | 가스당 기본 수수료입니다.                                   |
| difficulty       | QUANTITY      | 이 블록의 난이도 정수입니다.                                 |
| extraData        | DATA          | 이 블록의 "추가 데이터" 필드입니다.                            |
| gasLimit         | QUANTITY      | 이 블록에 허용되는 최대 가스입니다.                             |
| gasUsed          | QUANTITY      | 이 블록의 모든 트랜잭션에서 사용한 총 가스 양입니다.                   |
| hash             | 32-byte DATA  | 블록의 해시. 보류 중인 블록인 경우 `null`.                     |
| logsBloom        | 256-byte DATA | 블록의 로그에 대한 블룸 필터입니다.                             |
| miner            | 20-byte DATA  | 채굴 보상을 받은 수혜자의 주소입니다.                            |
| mixHash          | 32-byte DATA  | 이 블록에서 충분한 양의 연산이 수행되었음을 nonce와 결합하여 증명하는 해시입니다. |
| nonce            | 8-byte DATA   | 생성된 작업 증명의 해시입니다.                                |
| number           | QUANTITY      | 블록 번호입니다. 보류 중인 블록인 경우 `null`.                   |
| parentHash       | 32-byte DATA  | 부모 블록의 해시입니다.                                    |
| receiptsRoot     | 32-byte DATA  | 블록의 영수증 트라이의 루트입니다.                              |
| sha3Uncles       | 32-byte DATA  | 블록에 있는 엉클 데이터의 SHA3입니다.                          |
| size             | QUANTITY      | 이 블록의 크기(바이트)의 정수입니다.         |
| stateRoot        | 32-byte DATA  | 블록의 최종 상태 트라이의 루트입니다.                            |
| timestamp        | QUANTITY      | 블록이 콜레이션된 시점의 유닉스 타임스탬프입니다.                      |
| totalDifficulty  | QUANTITY      | 이 블록까지 체인의 총 블록 점수입니다.                           |
| transactionsRoot | 32-byte DATA  | 블록의 트랜잭션 시도 루트입니다.                               |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x5d21dba00",
        "difficulty": "0x1",
        "extraData": "0x",
        "gasLimit": "0xe8d4a50fff",
        "gasUsed": "0x28b484",
        "hash": "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
        "logsBloom": "0x02200022800002050000084080014015001001004b0002440401060a0830000200014041044010180010430018800119120098000800200241c2090a4020011040004400002201081800440a340020a4000820100848081020003000892050105a05000002100000200012c0800408982000085100000c4040a03814000800200812210100200010004018410d80004214800123210400082002214620100021028800120309200802008291c8e000904210080008110900010100081000101000501002010a0080311886000008000000240900400000100200a402005830200010300804020200000002310000008004004080a58000550000508000000000",
        "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0xd208de",
        "parentHash": "0x99fcd33dddd763835ba8bdc842853d973496a7e64ea2f6cf826bc2c338e23b0c",
        "receiptsRoot": "0xd3d70ed54a9274ba3191bf2d4fd8738c5d782fe17c8bfb45c03a25dc04120c35",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x23a",
        "stateRoot": "0x1076e6726164bd6f74720a717242584109f37c55017d004eefccf9ec3be76c18",
        "timestamp": "0x61b0a6c6",
        "totalDifficulty": "0xd208df",
        "transactionsRoot": "0x6ec8daca98c1005d9bbd7716b5e94180e2bf0e6b77770174563a166337369344"
    }
}   
```

## eth_getBlockByNumber <a id="eth_getblockbynumber"></a>

블록 번호별로 블록에 대한 정보를 반환합니다.

이 API를 사용하기 전에 [Caution-블록](./caution.md#block)을 확인해 주세요.

**매개변수**

| 유형              | 설명                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |
| bool            | `true`이면 전체 트랜잭션 객체를 반환하고, `false`이면 트랜잭션의 해시만 반환합니다.                                                                |

**리턴 값**

[eth_getBlockByHash](#eth_getblockbyhash)를 참조하세요.

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0xd0054e", false],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "baseFeePerGas": "0x5d21dba00",
    "difficulty": "0x1",
    "extraData": "0x",
    "gasLimit": "0xe8d4a50fff",
    "gasUsed": "0x44437",
    "hash": "0x456a7cbb6fada11a0ca8cec24510d89da1c52898f1087528752ae6e13973fbc5",
    "logsBloom": "0x0000100000000094000000400000080000000040000000000000000000000002000000000000000000000000004001000000200000000000000008000220000000080400000800000000000a000000000000000000000000000010000000000000002000000408000000000000000010000080101002000000000010000000100000010000200800000400000080000000000000000000000002000000102000024000080200000000000082000000000000000000000000010000000000000000100012000000000000011000000000002000201000000008000000002000000010002800000000001400000000000000000000000100000000200000000000",
    "miner": "0x1ad91ee08f21be3de0ba2ba6918e714da6b45836",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "number": "0xd0054e",
    "parentHash": "0x2b88fdb3821669357a0b8367115e30145135c44bb8f62641d4e7765a7f555d17",
    "receiptsRoot": "0xc36bc44d0b52dee954be9bbd519bddc0bf6e991af2ed6f6ba506f89f10cdb9a7",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x64c",
    "stateRoot": "0x123a0da1c621236e64f9b486a9a9712ec6ce07d6690acab5a18b716d17cdc29f",
    "timestamp": "0x6194f184",
    "totalDifficulty": "0xd0054f",
    "transactions": [
      "0x5b3492f8199ee2a551d991b7d00bd48967ca5e5c1c15d6e1ee9fda97e3126e9a",
      "0x8e1870262f2ba0452458280ad6ad5d54e5288623e415692c822979b7608c7297",
      "0x98053d20b01c9e56964a57084fb91ccc01b242adfb09c23534162dcbbcc094c2",
    ],
    "transactionsRoot": "0x29b9880f57c0e79d0be5aa4fcc6b4cfcbed3e51478ad8f44533acce012df8cf1",
    "uncles": []
  }
}
```

## eth_getBlockByHash <a id="eth_getblockbyhash"></a>

블록에 대한 정보를 해시별로 반환합니다.

이 API를 사용하기 전에 [Caution-블록](./caution.md#block)을 확인해 주세요.

**파라미터**

| 유형           | 설명                                                    |
| ------------ | ----------------------------------------------------- |
| 32-byte DATA | 블록의 해시.                                               |
| bool         | `true`이면 전체 트랜잭션 객체를 반환하고, `false`이면 트랜잭션의 해시만 반환합니다. |

**리턴 값**

`Object` - 블록 객체, 또는 블록을 찾을 수 없는 경우 `null`을 반환합니다. 그렇지 않으면 오류를 반환합니다.

| 이름               | 유형            | 설명                                               |
| ---------------- | ------------- | ------------------------------------------------ |
| baseFeePerGas    | QUANTITY      | 가스당 기본 수수료입니다.                                   |
| difficulty       | QUANTITY      | 이 블록의 난이도 정수입니다.                                 |
| extraData        | DATA          | 이 블록의 "추가 데이터" 필드입니다.                            |
| gasLimit         | QUANTITY      | 이 블록에 허용되는 최대 가스입니다.                             |
| gasUsed          | QUANTITY      | 이 블록의 모든 트랜잭션이 사용한 총 가스 사용량입니다.                  |
| hash             | 32-byte DATA  | 블록의 해시. 보류 중인 블록인 경우 `null`.                     |
| logsBloom        | 256-byte DATA | 블록의 로그에 대한 블룸 필터입니다. 보류 중인 블록인 경우 `null`.        |
| miner            | 20-byte DATA  | 채굴 보상을 받은 수혜자의 주소입니다.                            |
| mixHash          | 32-byte DATA  | 이 블록에서 충분한 양의 연산이 수행되었음을 nonce와 결합하여 증명하는 해시입니다. |
| nonce            | 8-byte DATA   | 생성된 작업 증명의 해시입니다.                                |
| number           | QUANTITY      | 블록 번호입니다. 보류 중인 블록인 경우 `null`.                   |
| parentHash       | 32-byte DATA  | 부모 블록의 해시입니다.                                    |
| receiptsRoot     | 32-byte DATA  | 블록의 영수증 트라이의 루트입니다.                              |
| sha3Uncles       | 32-byte DATA  | 블록에 있는 엉클 데이터의 SHA3입니다.                          |
| size             | QUANTITY      | 이 블록의 크기(바이트)의 정수입니다.         |
| stateRoot        | 32-byte DATA  | 블록의 최종 상태 트라이의 루트입니다.                            |
| timestamp        | QUANTITY      | 블록이 콜레이션된 시점의 유닉스 타임스탬프입니다.                      |
| totalDifficulty  | QUANTITY      | 이 블록이 콜레이트될 때까지 체인의 총 블록 점수입니다.                  |
| transactionsRoot | 32-byte DATA  | 블록의 트랜잭션 시도 루트입니다.                               |
| transactions     | Array         | 트랜잭션 객체의 배열 또는 마지막 매개변수에 따라 32바이트 트랜잭션 해시입니다.    |
| uncles           | Array         | 엉클 해시 배열입니다.                                     |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", true],"id":1}' http://localhost:8551

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      baseFeePerGas: "0x5d21dba00",
      difficulty: "0x1",
      extraData: "0xd8820505846b6c617988676f312e31312e328664617277696e00000000000000f89ed594e733cb4d279da696f30d470f8c04decb54fcb0d2b841f1f600d136f93a5a2d9c12a7a9f6d7ba80a047c3910a2bbc01e38bcce25e48ed2004d21f134df5efaf1f8cbb9a26e1548e57628ab258c935490c11a7cd65324701f843b841444b3efc40071b6eec2c4d2630b483710b8fc7a601432431b0161f489102d1ca02f2ef93153d0be3843aa563d34cee1716163f58711843442aedd94a56303c0400",
      gasLimit: "0xe8d4a50fff",
      gasUsed: "0x0",
      governanceData: "0x",
      hash: "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
      logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      miner: "0x0000000000000000000000000000000000000000",
      mixHash: "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
      nonce: "0x0000000000000000",
      number: "0x1",
      parentHash: "0x73255a60e9491b5715f9bfcb7fa1143296810f629836d4cefbd1921d9173d63d",
      receiptsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      reward: "0x0000000000000000000000000000000000000000",
      size: "0x2d7",
      stateRoot: "0xedb87f4b0f905a655c80d1768eb22b1eff2405098c4748b8364c869611e02a2b",
      timestamp: "0x5c99cbd8",
      totalDifficulty: "0x2",
      transactions: [],
      transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      uncles: [],
    }
}
```

## eth_getBlockReceipts <a id="eth_getblockreceipts"></a>

블록에 포함된 영수증을 반환합니다.

**매개변수**

| 유형                            | 설명                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Number \| 32-byte DATA \| TAG | 블록 번호 또는 해시입니다. 또는 [기본 블록 매개변수](#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

**리턴 값**

블록에 포함된 영수증.  대상 블록에 트랜잭션이 없는 경우 빈 배열 `[]`가 반환됩니다.

**예시**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_getBlockReceipts", "params":["0xb14e8716f732186f2c99bb7a215a7cb1ec40e91e8d83739bfb593ed4b9047aa1"],"id":1}' https://public-en-baobab.klaytn.net
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "blockHash": "0xb14e8716f732186f2c99bb7a215a7cb1ec40e91e8d83739bfb593ed4b9047aa1",
      "blockNumber": "0x85ef20d",
      "contractAddress": null,
      "cumulativeGasUsed": "0x23b6e",
      "effectiveGasPrice": "0x5d21dba00",
      "from": "0x60d690e4d5db4025f4781c6cf3bff8669500823c",
      "gasUsed": "0x23b6e",
      "logs": [
        ...
      ],
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000220000000400000000000000000000000000000000000002000000000010001000000000040000000000000000000000000000000000000000000000000000400000080000000100000000000000000000000000000000000000000000480000000000000000000000010000000001000000000000000000000000000000000000000000009000000000000000000000000000000000000000008000000000000000004000000000004000000000000000000000000000000000000000000000000000000000000000200",
      "status": "0x1",
      "to": "0x27e1255f2a0ea596992158a0bc838f43be34b99d",
      "transactionHash": "0xafd15213b06144a85dd02adf88c32efb3d395e784f153c213a40b7ea25de1942",
      "transactionIndex": "0x0",
      "type": "0x0"
    }
  ]
}
```

## eth_getUncleByBlockHashAndIndex <a id="eth_getunclebyblockhashandindex"></a>

블록의 엉클에 대한 정보를 해시와 엉클의 인덱스 위치로 반환합니다.
클레이튼에는 엉클이 없으므로 항상 `null`을 반환합니다.

**매개변수**

| 유형           | 설명          |
| ------------ | ----------- |
| 32-byte DATA | 블록의 해시입니다.  |
| QUANTITY     | 엉클의 인덱스 위치. |

**리턴 값**
`null`

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", "0x1"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```

## eth_getUncleByBlockNumberAndIndex <a id="eth_getunclebyblocknumberandindex"></a>

블록의 엉클에 대한 정보를 번호와 엉클의 인덱스 위치로 반환합니다.
클레이튼에는 엉클이 존재하지 않으므로 항상 `null`을 반환합니다.

**매개변수**

| 유형              | 설명                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |
| QUANTITY        | 엉클의 인덱스 위치.                                                                                                          |

**리턴 값**
`null`

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0xe8", "0x1"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```

## eth_getBlockTransactionCountByNumber <a id="eth_getblocktransactioncountbynumber"></a>

주어진 블록 번호와 일치하는 블록의 트랜잭션 수를 반환합니다.

**매개변수**

| 유형              | 설명                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

**리턴 값**

| 유형       | 설명                      |
| -------- | ----------------------- |
| QUANTITY | 이 블록에 있는 트랜잭션 수의 정수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa" // 10
}
```

## eth_getBlockTransactionCountByHash <a id="eth_getblocktransactioncountbyhash"></a>

주어진 해시와 일치하는 블록에서 블록의 트랜잭션 수를 반환합니다.

**매개변수**

| 유형           | 설명     |
| ------------ | ------ |
| 32-byte DATA | 블록의 해시 |

**리턴 값**

| 유형       | 설명                      |
| -------- | ----------------------- |
| QUANTITY | 이 블록에 있는 트랜잭션 수의 정수입니다. |

**예제**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getUncleCountByBlockNumber <a id="eth_getunclecountbyblocknumber"></a>

주어진 블록 번호와 일치하는 블록에서 블록에 있는 엉클의 수를 반환합니다.
클레이튼에는 엉클이 없으므로 `0x0`을 반환합니다. 일치하는 블록이 없으면 `null`을 반환합니다.

**매개변수**

| 유형              | 설명                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

**리턴 값**

| 유형       | 설명                                                  |
| -------- | --------------------------------------------------- |
| QUANTITY | 이 블록에 있는 트랜잭션 수의 정수입니다. 일치하는 블록이 없으면 `null`을 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0" // 0
}
```

## eth_getUncleCountByBlockHash <a id="eth_getunclecountbyblockhash"></a>

주어진 블록 해시와 일치하는 블록에서 블록의 엉클 개수를 반환합니다.
클레이튼에는 엉클이 없으므로 `0x0`을 반환합니다. 일치하는 블록이 없으면 `null`을 반환합니다.

**매개변수**

| 유형           | 설명     |
| ------------ | ------ |
| 32-byte DATA | 블록의 해시 |

**반환 값**

| 유형       | 설명                                                  |
| -------- | --------------------------------------------------- |
| QUANTITY | 이 블록에 있는 트랜잭션 수의 정수입니다. 일치하는 블록이 없으면 `null`을 반환합니다. |

**예제**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getStorageAt <a id="eth_getstorageat"></a>

지정된 주소의 저장 위치에서 값을 반환합니다.

**매개변수**

| 유형                      | 설명                                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA            | 저장소 주소.                                                                                                                     |
| QUANTITY                | 스토리지 내 위치의 정수입니다.                                                                                                           |
| QUANTITY \| TAG \| HASH | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](#the-default-block-parameter)에 있는 `"earliest"`, `"latest"` 또는 `"pending"` 문자열 또는 블록 해시입니다. |

**리턴 값**

| 유형   | 설명             |
| ---- | -------------- |
| DATA | 이 저장 위치의 값입니다. |

**예시**

정확한 위치를 계산하는 것은 검색할 스토리지에 따라 다릅니다. `0x295a70b2de5e3953354a6a8344e616ed314d7251` 주소로 `0x391694e7e0b0cce554cb130d723a9d27458f9298`에 배포된 다음 컨트랙트를 예로 들어보겠습니다.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;

    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

`pos0`의 값을 검색하는 것은 간단합니다:

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

맵의 요소를 검색하는 것은 더 어렵습니다. 맵에서 요소의 위치는 다음을 사용하여 계산됩니다:

```javascript
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

즉, `pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]`에서 저장소를 검색하려면 다음 값으로 위치를 계산해야 합니다:

```javascript
keccak(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

`klay` 라이브러리와 함께 제공되는 Klaytn 콘솔을 사용하여 계산할 수 있습니다.

```javascript
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> klay.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

이제 스토리지를 가져옵니다:

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

## eth_mining <a id="eth_mining"></a>

클라이언트가 새 블록을 활발하게 채굴하고 있으면 `true`를 반환합니다.

**참고**: 현재 모든 노드는 트랜잭션을 재전송하기 위해 기본적으로 마이닝 모드로 설정되어 있습니다. 실제 "마이닝"은 합의 노드(CN)에 의해서만 수행된다는 점에 유의하시기 바랍니다.

**매개변수**

없음

**리턴 값**

| 유형   | 설명                                      |
| ---- | --------------------------------------- |
| bool | 클라이언트가 마이닝 중이면 `true`, 그렇지 않으면 `false`. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":true
}
```

## eth_syncing <a id="eth_syncing"></a>

동기화 상태에 대한 데이터가 있는 객체를 반환하거나 `false`를 반환합니다.

**매개변수**

없음

**리턴 값**

동기화 상태 데이터가 있는 오브젝트 또는 동기화하지 않는 경우 `false`인 `Object|Boolean`입니다:

| 이름            | 유형       | 설명                                                           |
| ------------- | -------- | ------------------------------------------------------------ |
| startingBlock | QUANTITY | 가져오기가 시작된 블록(동기화가 헤드에 도달한 후에만 재설정됨).      |
| currentBlock  | QUANTITY | 현재 블록, `eth_blockNumber`와 동일합니다.                             |
| highestBlock  | QUANTITY | 예상 최고 블록입니다.                                                 |
| pulledStates  | QUANTITY | 지금까지 처리된 상태 항목의 수입니다.  동기화 모드가 "fast"가 아닌 경우 0이 반환됩니다.       |
| knownStates   | QUANTITY | 아직 가져와야 하는 알려진 상태 항목의 수입니다.  동기화 모드가 "fast"가 아닌 경우 0이 반환됩니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    "currentBlock":"0x3e31e",
    "highestBlock":"0x827eef",
    "knownStates":"0x0",
    "pulledStates":"0x0",
    "startingBlock":"0x0"
  }
}
// Or when not syncing
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```
