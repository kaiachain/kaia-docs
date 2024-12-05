---
description: 노드에서 트랜잭션 풀을 검사하는 API입니다.
---

# txpool

네임스페이스 `txpool` API를 사용하면 현재 보류 중인 트랜잭션이 포함된 트랜잭션 풀의 내용을 검사할 수 있는 여러 비표준 RPC 메서드에 액세스할 수 있습니다.

## txpool_content <a id="txpool_content"></a>

`content` 검사 속성을 쿼리하여 현재 다음 블록에 포함될 예정인 트랜잭션뿐만 아니라
현재 다음 블록에 포함되기 위해 보류 중인 트랜잭션과 향후 실행을 위해
향후 실행을 위해서만.

그 결과 `pending` 및 `queued` 필드가 두 개 있는 객체가 생성됩니다. 이러한 각 필드는 연관
배열로, 각 항목은 출발지 주소를 예약된 트랜잭션 배치에 매핑합니다. 이러한 배치
자체는 nonce를 실제 트랜잭션과 연결하는 맵입니다.

| 클라이언트 | 메서드 호출                         |
| :---: | ------------------------------ |
|   콘솔  | `txpool.content`               |
|  RPC  | `{"method": "txpool_content"}` |

**매개변수**

없음

**리턴 값**

| 유형          | 설명             |
| ----------- | -------------- |
| JSON string | 트랜잭션 풀의 내용입니다. |

**예시**

콘솔

```javascript
> txpool.content
{
  pending: {
    0x18352126c43E4EC314E41b632A0c1af6b233260b: {
      733: {
        blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        blockNumber: "0x0",
        from: "0x18352126c43e4ec314e41b632a0c1af6b233260b",
        gas: "0x5208",
        gasPrice: "0x0",
        input: "0x",
        nonce: "0x2dd",
        signatures: [...],
        to: "0x18352126c43e4ec314e41b632a0c1af6b233260b",
        transactionIndex: "0x0",
        txHash: "0xeeac2d4f1255e50659cd57a58e74e46d2af7122d91e347ca341d4e2cd7da689b",
        type: "TxTypeLegacyTransaction",
        value: "0x2"
      },
    },
    0x952c9a710Ce70D58FD5C55d45c4479b82dEA6DAC: {
      756: {
        blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        blockNumber: "0x0",
        from: "0x952c9a710ce70d58fd5c55d45c4479b82dea6dac",
        gas: "0x5208",
        gasPrice: "0x0",
        input: "0x",
        nonce: "0x2f4",
        signatures: [...],
        to: "0x6afe934786fe008c79577d85d8e1af1f6f14c73a",
        transactionIndex: "0x0",
        txHash: "0x0fad399b31b520e4af5bc9f2ea40de71854a7f3c41d5918d5ed120d1b4fc5154",
        type: "TxTypeLegacyTransaction",
        value: "0x1"
      },
      757: {
        blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        blockNumber: "0x0",
        from: "0x952c9a710ce70d58fd5c55d45c4479b82dea6dac",
        gas: "0x5208",
        gasPrice: "0x0",
        input: "0x",
        nonce: "0x2f5",
        signatures: [...],
        to: "0x18352126c43e4ec314e41b632a0c1af6b233260b",
        transactionIndex: "0x0",
        txHash: "0xdfc3053ce6c27fd4610bb2e103837c4435f27bb6bb9dfd56110cbd2bbe5ea7fa",
        type: "TxTypeLegacyTransaction",
        value: "0x1"
      },
    },
  },
  queued: {
    0x7dCef85A0356c36a0B43772e1F7C2e80cE029b96: {
      786: {
        blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        blockNumber: "0x0",
        from: "0x7dcef85a0356c36a0b43772e1f7c2e80ce029b96",
        gas: "0x5208",
        gasPrice: "0x0",
        input: "0x",
        nonce: "0x312",
        signatures: [...],
        to: "0x7dcef85a0356c36a0b43772e1f7c2e80ce029b96",
        transactionIndex: "0x0",
        txHash: "0xf90dab02c355b4f09d1b1f224380a278a03fc76d1fc7d866fb2ad2f503525717",
        type: "TxTypeLegacyTransaction",
        value: "0x0"
      },
    },
    0xd5B94dd456040612d721A8Eae1e4E97a70b92812: {
      742: {
        blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        blockNumber: "0x0",
        from: "0xd5b94dd456040612d721a8eae1e4e97a70b92812",
        gas: "0x5208",
        gasPrice: "0x0",
        input: "0x",
        nonce: "0x2e6",
        signatures: [...],
        to: "0xd5b94dd456040612d721a8eae1e4e97a70b92812",
        transactionIndex: "0x0",
        txHash: "0x6266969f1221b258bb2ce6fd2bcce88ad76be1e2b3eb5c770311a2bc0c2cc74a",
        type: "TxTypeLegacyTransaction",
        value: "0x2"
      },
    }
  }
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"txpool_content","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"pending":{},"queued":{}}}
#There is no pending transaction nor queued transaction.
```

## txpool_inspect <a id="txpool_inspect"></a>

`inspect` 검사 속성을 쿼리하여 현재 다음 블록에 포함되도록 보류 중인 모든 트랜잭션과
현재 다음 블록에 포함되기 위해 보류 중인 트랜잭션과 향후 실행을 위해 예약된
트랜잭션을 나열할 수 있습니다. 이는 개발자가 풀의 트랜잭션을 빠르게 확인하고
트랜잭션을 빠르게 확인하고 잠재적인 문제를 찾을 수 있도록 개발자에게 특별히 맞춤화된 방법입니다.

그 결과 `pending` 및 `queued` 필드가 두 개 있는 객체가 생성됩니다. 이러한 각 필드는 연관
배열이며, 각 항목은 출발지 주소를 예약된 트랜잭션 배치에 매핑합니다. 이러한 배치
자체는 nonce를 트랜잭션 요약 문자열과 연결하는 맵입니다.

| 클라이언트 | 메서드 호출                         |
| :---: | ------------------------------ |
|   콘솔  | `txpool.inspect`               |
|  RPC  | `{"method": "txpool_inspect"}` |

**매개변수**

없음

**리턴 값**

| 유형          | 설명                       |
| ----------- | ------------------------ |
| JSON string | 보류 중 및 대기 중인 트랜잭션 목록입니다. |

**예시**

콘솔

```javascript
> txpool.inspect
{
  pending: {
    0x26588a9301b0428d95e6fc3a5024fce8bec12d51: {
      31813: "0x3375ee30428b2a71c428afa5e89e427905f95f7e: 0 peb + 500000 gas × 25000000000 peb"
    },
    0x2a65aca4d5fc5b5c859090a6c34d164135398226: {
      563662: "0x958c1fa64b34db746925c6f8a3dd81128e40355e: 1051546810000000000 peb + 90000 gas × 25000000000 peb",
      563663: "0x77517b1491a0299a44d668473411676f94e97e34: 1051190740000000000 peb + 90000 gas × 25000000000 peb",
      563664: "0x3e2a7fe169c8f8eee251bb00d9fb6d304ce07d3a: 1050828950000000000 peb + 90000 gas × 25000000000 peb",
      563665: "0xaf6c4695da477f8c663ea2d8b768ad82cb6a8522: 1050544770000000000 peb + 90000 gas × 25000000000 peb",
      563666: "0x139b148094c50f4d20b01caf21b85edb711574db: 1048598530000000000 peb + 90000 gas × 25000000000 peb",
      563667: "0x48b3bd66770b0d1eecefce090dafee36257538ae: 1048367260000000000 peb + 90000 gas × 25000000000 peb"
    },
    0x9174e688d7de157c5c0583df424eaab2676ac162: {
      3: "0xbb9bc244d798123fde783fcc1c72d3bb8c189413: 30000000000000000000 peb + 85000 gas × 25000000000 peb"
    },
    0xb18f9d01323e150096650ab989cfecd39d757aec: {
      777: "0xcd79c72690750f079ae6ab6ccd7e7aedc03c7720: 0 peb + 1000000 gas × 25000000000 peb"
    },
    0xb2916c870cf66967b6510b76c07e9d13a5d23514: {
      2: "0x576f25199d60982a8f31a8dff4da8acb982e6aba: 26000000000000000000 peb + 90000 gas × 25000000000 peb"
    },
    0xbc0ca4f217e052753614d6b019948824d0d8688b: {
      0: "0x2910543af39aba0cd09dbb2d50200b3e800a63d2: 1000000000000000000 peb + 50000 gas × 25000000000 peb"
    },
    0xea674fdde714fd979de3edf0f56aa9716b898ec8: {
      70148: "0xe39c55ead9f997f7fa20ebe40fb4649943d7db66: 1000767667434026200 peb + 90000 gas × 25000000000 peb"
    }
  },
  queued: {
    0x0f6000de1578619320aba5e392706b131fb1de6f: {
      6: "0x8383534d0bcd0186d326c993031311c0ac0d9b2d: 9000000000000000000 peb + 21000 gas × 25000000000 peb"
    },
    0x5b30608c678e1ac464a8994c3b33e5cdf3497112: {
      6: "0x9773547e27f8303c87089dc42d9288aa2b9d8f06: 50000000000000000000 peb + 90000 gas × 25000000000 peb"
    },
    0x976a3fc5d6f7d259ebfb4cc2ae75115475e9867c: {
      3: "0x346fb27de7e7370008f5da379f74dd49f5f2f80f: 140000000000000000 peb + 90000 gas × 25000000000 peb"
    },
    0x9b11bf0459b0c4b2f87f8cebca4cfc26f294b63a: {
      2: "0x24a461f25ee6a318bdef7f33de634a67bb67ac9d: 17000000000000000000 peb + 90000 gas × 25000000000 peb",
      6: "0x6368f3f8c2b42435d6c136757382e4a59436a681: 17990000000000000000 peb + 90000 gas × 25000000000 peb",
      7: "0x6368f3f8c2b42435d6c136757382e4a59436a681: 17900000000000000000 peb + 90000 gas × 25000000000 peb"
    }
  }
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"txpool_inspect","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"pending":{"0x1A789E38cD567a00b7Fb8e1D39100ac395fa463B":{"0":"0x87AC99835e67168d4f9a40580f8F5C33550bA88b: 0 peb + 99000000 gas × 25000000000 peb"},"0xAb552FC3d76de919c74435A4C6B04576a9763934":{"0":"0x87AC99835e67168d4f9a40580f8F5C33550bA88b: 0 peb + 99000000 gas × 25000000000 peb"}},"queued":{}}}
```

## txpool_status <a id="txpool_status"></a>

다음 블록에 포함하기 위해 보류 중인 트랜잭션과 향후 실행을 위해 예약된 트랜잭션만 조회할 수 있습니다.

결과는 두 개의 필드 `pending`과 `queued`이 있는 객체이며, 각 필드는 특정 상태의 트랜잭션 수를 나타내는 카운터입니다.

| 클라이언트 | 메서드 호출                        |
| :---: | ----------------------------- |
|   콘솔  | `txpool.status`               |
|  RPC  | `{"method": "txpool_status"}` |

**매개변수**

없음

**리턴 값**

| 이름      | 유형  | 설명                |
| ------- | --- | ----------------- |
| pending | int | 대기 중인 트랜잭션의 수입니다. |
| queued  | int | 보류 중인 트랜잭션의 수입니다. |

**예시**

콘솔

```javascript
> txpool.status
{
  pending: 10,
  queued: 7
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"txpool_status","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"pending":"0x0","queued":"0x0"}}
```
