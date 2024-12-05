# eth

네임스페이스 `eth`는 계정, 블록, 트랜잭션과 관련된 기능을 제공합니다.

Klaytn은 이제 [이더리움의 JSON-RPC API](https://eth.wiki/json-rpc/API)의 네임스페이스 `eth`를 지원합니다. 참고하세요
일부 반환값이 이더리움의 API 응답 본문과 일치하도록 조정되었습니다.

그리고 클레이튼과 이더리움의 근본적인 설계 차이로 인해,
클레이튼의 데이터 구조(Transaction, Block, TransactionReceipt)는 `eth` 네임스페이스 API를 통해 완전히 지원되지 않습니다.

이 문서에서 [이더리움과의 차이점 개요](#differences_overview_from_ethereum)를 확인하시기 바랍니다.

**참고**: `eth` 네임스페이스 API는 Klaytn v1.8.0부터 지원됩니다.

아래 목록은 API 함수를 열거한 것입니다. 클레이튼에서는 모든 `eth` 네임스페이스 API가 지원됩니다.

### [Account](./account.md) <a id="account"></a>

- [eth_accounts](./account.md#eth_accounts)
- [eth_getBalance](./account.md#eth_getbalance)
- [eth_getCode](./account.md#eth_getcode)
- [eth_getTransactionCount](./account.md#eth_gettransactioncount)
- [eth_sign](./account.md#eth_sign)

### [Block](./block.md) <a id="block"></a>

- [eth_blockNumber](./block.md#eth_blocknumber)
- [eth_getHeaderByNumber](./block.md#eth_getheaderbynumber)
- [eth_getHeaderByHash](./block.md#eth_getheaderbyhash)
- [eth_getBlockByNumber](./block.md#eth_getblockbynumber)
- [eth_getBlockByHash](./block.md#eth_getblockbyhash)
- [eth_getUncleByBlockHashAndIndex](./block.md#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](./block.md#eth_getunclebyblocknumberandindex)
- [eth_getBlockTransactionCountByNumber](./block.md#eth_getblocktransactioncountbynumber)
- [eth_getBlockTransactionCountByHash](./block.md#eth_getblocktransactioncountbyhash)
- [eth_getUncleCountByBlockNumber](./block.md#eth_getunclecountbyblocknumber)
- [eth_getUncleCountByBlockHash](./block.md#eth_getunclecountbyblockhash)
- [eth_getStorageAt](./block.md#eth_getstorageat)
- [eth_mining](./block.md#eth_mining)
- [eth_syncing](./block.md#eth_syncing)

### [Transaction](./transaction.md) <a id="transaction"></a>

- [eth_call](./transaction.md#eth_call)
- [eth_estimateGas](./transaction.md#eth_estimategas)
- [eth_getTransactionByBlockHashAndIndex](./transaction.md#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](./transaction.md#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionByHash](./transaction.md#eth_gettransactionbyhash)
- [eth_getTransactionReceipt](./transaction.md#eth_gettransactionreceipt)
- [eth_sendRawTransaction](./transaction.md#eth_sendrawtransaction)
- [eth_sendTransaction](./transaction.md#eth_sendtransaction)
- [eth_signTransaction](./transaction.md#eth_signtransaction)
- [eth_fillTransaction](./transaction.md#eth_filltransaction)
- [eth_pendingTransactions](./transaction.md#eth_pendingtransactions)
- [eth_resend](./transaction.md#eth_resend)

### [Config](./config.md) <a id="configuration"></a>

- [eth_coinbase](./config.md#eth_coinbase)
- [eth_etherbase](./config.md#eth_etherbase)
- [eth_chainId](./config.md#eth_chainid)
- [eth_gasPrice](./config.md#eth_gasprice)

### [Filter](./filter.md) <a id="filter"></a>

- [eth_getFilterChanges](./filter.md#eth_getfilterchanges)
- [eth_getFilterLogs](./filter.md#eth_getfilterlogs)
- [eth_getLogs](./filter.md#eth_getlogs)
- [eth_newBlockFilter](./filter.md#eth_newblockfilter)
- [eth_newFilter](./filter.md#eth_newfilter)
- [eth_newPendingTransactionFilter](./filter.md#eth_newpendingtransactionfilter)
- [eth_subscribe](./filter.md#eth_subscribe)
- [eth_uninstallFilter](./filter.md#eth_uninstallfilter)
- [eth_unsubscribe](./filter.md#eth_unsubscribe)

### [Gas](./gas.md) <a id="gas"></a>

- [eth_feeHistory](./gas.md#eth_feehistory)
- [eth_maxPriorityFeePerGas](./gas.md#eth_maxpriorityfeepergas)

### [기타](./misc.md) <a id="miscellaneous"></a>

- [eth_hashrate](./misc.md#eth_hashrate)
- [eth_getWork](./misc.md#eth_getwork)
- [eth_submitWork](./misc.md#eth_submitwork)
- [eth_submitHashrate](./misc.md#eth_submithashrate)

## 이더리움과의 차이점 개요 <a id="differences_overview_from_ethereum"></a>

> eth 네임스페이스 API를 제공할 때 클레이튼과 이더리움의 차이점을 더 자세히 설명한 [주의](./caution.md) 섹션을 참고하세요.

### Block <a id="block"></a>

관련 API: [eth_getHeaderByNumber](./block.md#eth_getHeaderByNumber), [eth_getHeaderByHash](./block.md#eth_getHeaderByHash), [eth_getBlockByHash](./block.md#eth_getBlockByHash), [eth_getBlockByNumber](./block.md#eth_getBlockByNumber), [eth_getUncleByBlockHashAndIndex](./block.md#eth_getUncleByBlockHashAndIndex), [eth_getUncleByBlockNumberAndIndex](./block.md#eth_getUncleByBlockNumberAndIndex).

| 필드              | 설명                                                                                                                                                                                                                                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas   | 이 필드에는 항상 `0x0` 값이 있는데, 이는 Klaytn에 baseFeePerGas 체계가 없기 때문입니다.                                                                                                                                                                                                                                      |
| difficulty      | 이 필드는 클레이튼 헤더에서 `blockScore`에 해당하며, `0x1`로 고정되어 있습니다. 이는 클레이튼의 합의 메커니즘이 작업증명을 기반으로 하지 않기 때문에 블록 난이도라는 기술적 개념이 클레이튼 코어에 적용되지 않기 때문입니다.                                                                                                                                                               |
| extraData       | 이 필드는 항상 빈 값을 나타내는 `0x` 값을 갖습니다. 클레이튼의 `extraData`에는 검증자 주소, 검증자 서명, 제안자 서명 등의 합의 데이터가 포함되어 있기 때문에 `eth` 네임스페이스 API에는 적용되지 않습니다.                                                                                                                                                                    |
| gasLimit        | 이 필드는 항상 `0xe8d4a50fff`(=`999999999999` 소수점)의 값을 가지며, 이는 Klaytn에 GasLimit이 없기 때문에 임의의 수치입니다. 이 수치는 작성 시점에 [이더리움의 블록 가스 제한](https://ethereum.org/en/developers/docs/gas/#block-size)보다 30배 높은 수치입니다. 자세한 내용은 [연산 비용](../../../learn/computation/computation-cost.md)을 참고하시기 바랍니다. |
| miner           | 클레이튼의 [합의 메커니즘](../../../learn/consensus-mechanism.md)은 채굴자 대신 블록 제안자가 있는 [PBFT](../../../learn/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance)이므로 이 필드에 블록 제안자의 주소가 반환됩니다.                                                                                                        |
| mixhash         | 이 필드에는 항상 zeroHash (`0x00...`)가 있는데, 이는 Klaytn의 합의 메커니즘이 작업증명을 기반으로 하지 않기 때문입니다.                                                                                                                                                                                                 |
| nonce           | 클레이튼의 합의 메커니즘은 작업증명을 기반으로 하지 않기 때문에 이 필드는 항상 zeroNonce(`0x00...`)를 가집니다.                                                                                                                                                                                                         |
| sha3Uncles      | 이 필드에는 항상 `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`이 있는데, 이는 Klaytn에 언클 블록이 없기 때문에 빈 블록 헤더가 포함된 목록의 RLP 인코딩된 바이트의 Keccak256 해시입니다.                                                                                                                                       |
| totalDifficulty | 쿼리 블록까지 체인의 총 난이도입니다.                                                                                                                                                                                                                                                                               |
| uncles          | 클레이튼 코어에는 엉클 블록이라는 기술적인 개념이 없기 때문에 이 필드는 항상 `[]` 값을 가집니다.                                                                                                                                                                                                                                           |

여기서 다루지 않은 필드는 이더리움의 블록 필드에 고정됩니다.

### Transaction <a id="transaction"></a>

관련 API: [eth_getTransactionByHash](./transaction.md#eth_getTransactionByHash), [eth_getTransactionByBlockHashAndIndex](./transaction.md#eth_getTransactionByBlockHashAndIndex), [eth_getTransactionByBlockNumberAndIndex](./transaction.md#eth_getTransactionByBlockNumberAndIndex), [eth_pendingTransactions](./transaction.md#eth_pendingTransactions).

> 클레이튼과 이더리움의 근본적인 설계 차이로 인해,
> 이더리움은 `eth` 네임스페이스 API를 통해 클레이튼 트랜잭션을 완벽하게 지원할 수 없습니다.

| 필드       | 설명                                                                                                                                                                                           |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gasPrice | Also known as [Unit Price](../../../learn/transaction-fees/transaction-fees.md#gas-price-overview) in Klaytn's context, this value is determined in the system via the governance processes. |
| type     | Klaytn에서 `type`은 트랜잭션 유형을 문자열(예: `"LegacyTransaction"`)로 반환하지만, 이더리움과 일치하도록 16진수(예: `0x0`)로 변환되었습니다. 클레이튼에서만 유효한 트랜잭션 유형은 항상 `0x0`을 반환합니다.             |

Klaytn은 프로토콜 수준에서도 멀티시그(이더리움 트랜잭션에는 하나의 서명 필드(= v, r, s)만 있음)를 지원하기 때문에 Klaytn 트랜잭션은 둘 이상의 서명을 가질 수 있습니다.
이러한 맥락에서 서명(v, r, s)과 관련된 필드는 `tx.signatures[0].V`, `tx.signatures[0].R`, `tx.signatures[0].S`와 일치합니다.

여기서 다루지 않은 필드는 이더리움의 트랜잭션 필드에 고정됩니다.

### 트랜잭션 영수증 <a id="transaction_receipt"></a>

관련 API: [eth_getTransactionReceipt](./transaction.md#eth_getTransactionReceipt).

> 클레이튼과 이더리움의 근본적인 설계 차이로 인해,
> 이더리움 네임스페이스 API를 통해 클레이튼 트랜잭션 수신을 제공할 때 클레이튼 트랜잭션 수신을 완벽하게 지원할 수 없습니다.

| 필드                | 설명                                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| effectiveGasPrice | 클레이튼은 고정 가스 가격 정책을 사용하므로 가스 가격 값이 반환됩니다. gasPrice(also called [Unit Price](../../../learn/transaction-fees/transaction-fees.md#gasprice-overview)) is set in the system by the governance. |
| transactionIndex  | 이더리움과 거의 동일하지만, 이더리움과 달리 클레이튼은 보류 상태일 때 정수를 그대로 반환합니다.                                                                                                                                                        |

여기서 다루지 않은 필드는 이더리움에서 권장하는 트랜잭션_수령 필드를 따릅니다.
