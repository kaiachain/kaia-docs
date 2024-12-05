# Cautions when using eth namespace APIs in Klaytn.

Klaytn supports `eth` namespace APIs, so developers using Ethereum based SDKs or tools now can easily migrate their
existing projects to Klaytn.
(e.g. You can replace the endpoint URL in the Ethereum tools to point to a Klaytn node.)

But due to the fundamental design differences existing between Klaytn and Ethereum,
some APIs cannot be fully supported. (e.g. some fields have always zero value)

This document describes the limitations of those APIs.

## Block Header <a id="block_header"></a>

Related APIs: [eth_getHeaderByNumber](./block.md#eth_getheaderbynumber), [eth_getHeaderByHash](./block.md#eth_getheaderbyhash).

- Please read the description :warning: carefully.
- The :white_check_mark: icon in the description denotes that the field used in the same way as in Ethereum.

| Ethereum Header Field | Klaytn Header Field                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas         | (added)                 | :warning: This field always has the value `0x0` because Klaytn does not have a baseFeePerGas scheme.                                                                                                                                                                                                                                                                                                                             |
| difficulty            | (added)                 | :warning: This field corresponds to `blockScore` in the Klaytn header, which is fixed to `0x1`. This is because Klaytn's consensus mechanism is not based on PoW, indicating the technical concept of block difficulty is not applicable to Klaytn core.                                                                                                                                                                         |
| extraData             | extraData                                  | :warning: This field always has the value `0x` indicating the empty value. Owing to the fact that Klaytn's `extraData` contains consensus data such as validators addresses, validators signatures, and proposer signature, it is not applicable to `eth` namespace API.                                                                                                                                                         |
| gasLimit              | (added)                 | :warning: This field always has the value `0xe8d4a50fff`(=`999999999999` in decimal), which is an arbitrary figure since Klaytn has no GasLimit. At the time of writing, this figure is 30 times higher than the [block gas limit of Ethereum](https://ethereum.org/en/developers/docs/gas/#block-size). Please refer to [Computation Cost](../../../learn/computation/computation-cost.md) for more details. |
| gasUsed               | gasUsed                                    | :white_check_mark: A scalar value equal to the total gas used in transactions in this block.                                                                                                                                                                                                                                                                                           |
|                       | governanceData(omitted) | :warning: This field is omitted because this field does not exist in Ethereum Block Header.                                                                                                                                                                                                                                                                                                                                      |
| hash                  | hash                                       | :white_check_mark: A hash of the block.                                                                                                                                                                                                                                                                                                                                                |
| logsBloom             | logsBloom                                  | :white_check_mark: The bloom filter for the logs of the block. `null` when it is pending block.                                                                                                                                                                                                                                                                                        |
| miner                 | (added)                 | :warning: This field returns the block proposer's address, because Klaytn's [consensus mechanism](../../../learn/consensus-mechanism.md) is [PBFT](../../../learn/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance), which has a block proposer instead of miners.                                                                                                                                                |
| mixHash               | (added)                 | :warning: This field always has zeroHash (`0x00...`) because Klaytn's consensus mechanism is not based on PoW.                                                                                                                                                                                                                                                                                                |
| nonce                 | (added)                 | :warning: This field always has zeroNonce (`0x00...`) because Klaytn's consensus mechanism is not based on PoW.                                                                                                                                                                                                                                                                                               |
| number                | number                                     | :white_check_mark: The block number.                                                                                                                                                                                                                                                                                                                                                   |
| parentHash            | parentHash                                 | :white_check_mark: The hash of the parent block.                                                                                                                                                                                                                                                                                                                                       |
| receiptsRoot          | receiptsRoot                               | :white_check_mark: the root of the receipts trie of the block.                                                                                                                                                                                                                                                                                                                         |
|                       | reward(omitted)         | :warning: This field is omitted because this field does not exist in Ethereum Block Header.                                                                                                                                                                                                                                                                                                                                      |
| sha3Uncles            | (added)                 | :warning: This field always has `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`, which is the Keccak256 hash of the RLP-encoded bytes of the list containing empty block header because there are no uncles blocks on Klaytn.                                                                                                                                                                               |
| size                  | size                                       | :white_check_mark: The size of this block in bytes.                                                                                                                                                                                                                                                                                                                                    |
| stateRoot             | stateRoot                                  | :white_check_mark: The root of the final state trie of the block.                                                                                                                                                                                                                                                                                                                      |
| timestamp             | timestamp                                  | :white_check_mark: The unix timestamp for when the block was collated.                                                                                                                                                                                                                                                                                                                 |
|                       | timestampFoS(omitted)   | :warning: This field is omitted because this field does not exist in Ethereum Block Header.                                                                                                                                                                                                                                                                                                                                      |
| totalDifficulty       | (added)                 | :warning: The total difficulty of the chain until the querying block.                                                                                                                                                                                                                                                                                                                                                            |
| transactionsRoot      | transactionsRoot                           | :white_check_mark: The root of the transaction trie of the block.                                                                                                                                                                                                                                                                                                                      |

## Block <a id="block"></a>

Related APIs: [eth_getBlockByHash](./block.md#eth_getblockbyhash), [eth_getBlockByNumber](./block.md#eth_getblockbynumber), [eth_getUncleByBlockHashAndIndex](./block.md#eth_getunclebyblockhashandindex), [eth_getUncleByBlockNumberAndIndex](./block.md#eth_getunclebyblocknumberandindex).

Since Block contains fields of Header and header has already been covered above,
this section describes the remaining fields of the block except for header.

- Please read the description :warning: carefully.
- The :white_check_mark: icon in the description denotes that the field used in the same way as in Ethereum.

| Ethereum Header Field | Klaytn Header Field                  | Description                                                                                                                                                      |
| --------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                       | voteData(omitted) | :warning: This field is omitted because this field does not exist in Ethereum Block.                                                                             |
| uncles                | (added)           | :warning: This field always has the value `[]` because there is no technical concept of uncles block in Klaytn core.                                             |
| transactions          | transactions                         | :white_check_mark: Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter. |

## Transaction <a id="transaction"></a>

Related APIs: [eth_getTransactionByHash](./transaction.md#eth_gettransactionbyhash), [eth_getTransactionByBlockHashAndIndex](./transaction.md#eth_gettransactionbyblockhashandindex), [eth_getTransactionByBlockNumberAndIndex](./transaction.md#eth_gettransactionbyblocknumberandindex), [eth_pendingTransactions](./transaction.md#eth_pendingtransactions).

There are lots of transaction types in Klaytn, and fields of data structure vary based on the type.

So you have to check how various types of Klaytn transaction are converted as Ethereum transaction because
during converting process some fields are omitted or added with zero or dummy values. That means
Some important information(in terms of Klaytn) will be lost during converting.

Please note that we define EthereumLegacyTransaction in this document as the Ethereum transaction format before [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

When you try to query Klaytn transactions via eth namespace JSON-RPC apis, Klaytn transactions will be
return as Ethereum Legacy Transaction type.

This document describes the details of converting process (Klaytn transactions -> Ethereum Legacy Transaction).

- Please read the description :warning: carefully.
- The :white_check_mark: icon in the description denotes that the field used in the same way as in Ethereum.

### Common Fields

Regardless of various Klaytn transaction type, there are common fields.
This section describes how that common fields are served as Ethereum Legacy Transaction.

| Ethereum Legacy Transaction Field | Klaytn Transaction Field                                                                             | Description                                                                                                                                                                                                                                                                          |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHash                         | blockHash                                                                                            | :white_check_mark: Block hash.                                                                                                                                                                                                             |
| blockNumber                       | blockNumber                                                                                          | :white_check_mark: Block number.                                                                                                                                                                                                           |
| from                              | from                                                                                                 | :white_check_mark: Address of the sender.                                                                                                                                                                                                  |
| gas                               | gas                                                                                                  | :white_check_mark: Gas provided by the sender.                                                                                                                                                                                             |
| gasPrice                          | gasPrice                                                                                             | :warning: The price the most you can pay (e.g. suggestGasPrice = 2\*latestBlock.baseFee ). For detailed information, see [here](../../../learn/transaction-fees/transaction-fees.md#gas-price-overview).                                                          |
| hash                              | hash                                                                                                 | :white_check_mark: Transaction hash.                                                                                                                                                                                                       |
| input                             | (covered in below sections)                                                       | The description of this field is covered in the detailed transaction items below.                                                                                                                                                                                                    |
| nonce                             | nonce                                                                                                | :white_check_mark: The number of transactions made by the sender prior to this one.                                                                                                                                                        |
|                                   | [senderTxHash](../../../learn/transactions/transactions.md#sendertxhash)(omitted) | :warning: This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                                                                                                                    |
|                                   | signatures(omitted)                                                               | :warning: This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                                                                                                                    |
| to                                | (covered in below sections)                                                       | The description of this field is covered in the detailed transaction items below.                                                                                                                                                                                                    |
| transactionIndex                  | transactionIndex                                                                                     | :warning: Almost same with Ethereum but unlike Ethereum, Klaytn returns integer as it is when its pending.                                                                                                                                                                           |
| value                             | (covered in below sections)                                                       | The description of this field is covered in the detailed transaction items below.                                                                                                                                                                                                    |
| type                              | type(converted)                                                                   | :warning: In Klaytn, `type` returns the transaction type in string (e.g. `"LegacyTransaction"`), but it has been converted to hexadecimal (e.g. `0x0`) to match Ethereum. Transaction types that are only valid in Klaytn always return `0x0`. |
|                                   | typeInt(omitted)                                                                  | :warning: This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                                                                                                                    |
| v                                 | (added)                                                                           | :warning: Klaytn supports MultiSig so transaction in Klaytn can have more than one signature. `signatures[0].V` is used as the value of the field `v`.                                                                                                                               |
| r                                 | (added)                                                                           | :warning: Klaytn supports MultiSig so transaction in Klaytn can have more than one signature. `signatures[0].R` is used as the value of the field `r`.                                                                                                                               |
| s                                 | (added)                                                                           | :warning: Klaytn supports MultiSig so transaction in Klaytn can have more than one signature. `signatures[0].S` is used as the value of the field `s`.                                                                                                                               |

### Common Fields For [FeeDelegation](../../../learn/transactions/fee-delegation.md)

Regardless of various Klaytn [FeeDelegation](../../../learn/transactions/fee-delegation.md) transaction type, there are common fields.
This section describes how that common fields for feeDelegation(except for the common fields covered above)
are served as Ethereum Legacy Transaction.

| Ethereum Legacy Transaction Field | Klaytn FeeDelegation Transaction Field         | Description                                                                                       |
| --------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
|                                   | feePayer(omitted)           | :warning: This field is omitted because this field does not exist in Ethereum Legacy Transaction. |
|                                   | feePayerSignatures(omitted) | :warning: This field is omitted because this field does not exist in Ethereum Legacy Transaction. |

### Common Fields For [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md)

Regardless of various Klaytn [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md) transaction type, there are common fields.
This section describes how that common fields for partialFeeDelegation(except for the common fields covered above)
are served as Ethereum Legacy Transaction.

| Ethereum Legacy Transaction Field | Klaytn PartialFeeDelegation Transaction Field | Description                                                                                       |
| --------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
|                                   | feeRatio(omitted)          | :warning: This field is omitted because this field does not exist in Ethereum Legacy Transaction. |

### Different fields for each transaction type

#### LegacyTransaction

| Ethereum Legacy Transaction Field | Klaytn LegacyTransaction Field | Description                                                                                                                            |
| --------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| input                             | input                          | :white_check_mark: The data sent along with the transaction.                                 |
| to                                | to                             | :white_check_mark: Address of the receiver. `null` when its a contract creation transaction. |
| value                             | value                          | :white_check_mark: Value transferred in Peb.                                                 |

**Klaytn LegacyTransaction** is served as Ethereum Legacy Transaction like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0xe2bbb1580...",
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 0, omitted */
    "value": "0x0"
  }
}
```

#### ValueTransfer

| Ethereum Legacy Transaction Field | Klaytn ValueTransfer Transaction Field | Description                                                                                                                               |
| --------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| input                             | (added)             | :warning: This field always has value `0x` which means empty input because this field does not exist in Klaytn ValueTransfer transaction. |
| to                                | to                                     | :white_check_mark: Address of the receiver.                                                     |
| value                             | value                                  | :white_check_mark: Value transferred in Peb.                                                    |

**Klaytn ValueTransfer Transaction** is served as Ethereum Legacy Transaction like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x", /** added */
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 8, omitted */
    "value": "0x49249695"
  }
}
```

#### ValueTransferMemo

| Ethereum Legacy Transaction Field | Klaytn ValueTransferMemo Transaction Field | Description                                                                                            |
| --------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| input                             | input                                      | :white_check_mark: The data sent along with the transaction. |
| to                                | to                                         | :white_check_mark: Address of the receiver.                  |
| value                             | value                                      | :white_check_mark: Value transferred in Peb.                 |

**Klaytn ValueTransferMemo Transaction** is served as Ethereum Legacy Transaction like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x32104204104", 
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 16, omitted */
    "value": "0x49249695"
  }
}
```

#### SmartContractDeploy

| Ethereum Legacy Transaction Field | Klaytn SmartContractDeploy Transaction Field | Description                                                                                                                                                                           |
| --------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                   | codeFormat(omitted)       | :warning: This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                     |
|                                   | humanReadable(omitted)    | :warning: This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                     |
| input                             | input                                        | :white_check_mark: The data sent along with the transaction.                                                                                |
| to                                | to                                           | :white_check_mark: Address of the receiver. This field always has value `null` because this transaction is a contract creation transaction. |
| value                             | value                                        | :white_check_mark: Value transferred in Peb.                                                                                                |

**Klaytn SmartContractDeploy Transaction** is served as Ethereum Legacy Transaction like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    /** "codeFormat": "0x0", omitted */
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "humanReadable": false, omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "null",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 40, omitted */
    "value": "0x0"
  }
}
```

#### SmartContractExecution

| Ethereum Legacy Transaction Field | Klaytn SmartContractExecution Transaction Field | Description                                                                                            |
| --------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| input                             | input                                           | :white_check_mark: The data sent along with the transaction. |
| to                                | to                                              | :white_check_mark: Address of the smart contract.            |
| value                             | value                                           | :white_check_mark: Value transferred in Peb.                 |

**Klaytn SmartContractExecution Transaction** is served as Ethereum Legacy Transaction like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x6e71df210046227af62323ae35c0ea5e606a349c",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 48, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

#### AccountUpdate

| Ethereum Legacy Transaction Field | Klaytn AccountUpdate Transaction Field | Description                                                                                                                                                                                           |
| --------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                   | key(omitted)        | :warning: This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                                     |
| input                             | (added)             | :warning: This field always has value `0x` which means empty input because this field does not exist in Klaytn AccountUpdate transaction.                                                             |
| to                                | (added)             | :warning: This field always has same address with `from` because this field does not exist in Klaytn AccountUpdate transaction and giving a value of this field as `from` address is most meaningful. |
| value                             | (added)             | :warning: This field always has value `0x0` because this field does not exist in Klaytn AccountUpdate transaction.                                                                                    |

**Klaytn AccountUpdate Transaction** is served as Ethereum Legacy Transaction like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "key": "0x02a103bf900d727fcbb4baa9f9ffc840ba947af7c7dae52ad6ef453ab5d50942e18b2f", omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 32, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

#### Cancel

| Ethereum Legacy Transaction Field | Klaytn Cancel Transaction Field | Description                                                                                                                                                                                    |
| --------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| input                             | (added)      | :warning: This field always has value `0x` which means empty input because this field does not exist in Klaytn Cancel transaction.                                                             |
| to                                | (added)      | :warning: This field always has same address with `from` because this field does not exist in Klaytn Cancel transaction and giving a value of this field as `from` address is most meaningful. |
| value                             | (added)      | :warning: This field always has value `0x0` because this field does not exist in Klaytn Cancel transaction.                                                                                    |

**Klaytn Cancel Transaction** is served as Ethereum Legacy Transaction like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x", /** added */
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 56, omitted */
    "value": "0x0" /** added */
  }
}
```

#### ChainDataAnchoring

| Ethereum Legacy Transaction Field | Klaytn ChainDataAnchoring Transaction Field | Description                                                                                                                                                                                                |
| --------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| input                             | input                                       | :white_check_mark: The data sent along with the transaction.                                                                                                     |
|                                   | inputJSON(omitted)       | :warning: This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                                          |
| to                                | (added)                  | :warning: This field always has same address with `from` because this field does not exist in Klaytn ChainDataAnchoring transaction and giving a value of this field as `from` address is most meaningful. |
| value                             | (added)                  | :warning: This field always has value `0x0` because this field does not exist in Klaytn ChainDataAnchoring transaction.                                                                                    |

**Klaytn ChainDataAnchoring Transaction** is served as Ethereum Legacy Transaction like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xfec3dab64552e3148d8dbf8fba0bdcc4f170b458683065cf47e67c35e45ac395",
    "blockNumber": "0x3052bb2",
    "from": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd",
    "gas": "0x186a0",
    "gasPrice": "0x5d21dba00",
    "hash": "0x9d64d2fb416cb4e4c2c9a4575b627d291c5139d477356af767f35dc5a887c138",
    "input": "0xf8129412941294129.",
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "nonce": "0x278",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 72, omitted */
    "value": "0x0" /** added */
  }
}
```

## Transaction Receipt <a id="transaction_receipt"></a>

Related APIs: [eth_getTransactionReceipt](./transaction.md#eth_gettransactionreceipt).

By default, the fields in the Klaytn Transaction Receipt are different depending on the transaction type.
Because there are lots of transaction types in Klaytn, fields of transaction receipt vary based on the transaction type.

When you try to query Klaytn transaction receipts via eth namespace JSON-RPC apis,
Klaytn TransactionReceipt will be returned as Ethereum Transaction Receipt.

This document describes the details of converting process (Klaytn Transaction Receipt -> Ethereum Transaction Receipt).

- Please read the description :warning: carefully.
- The :white_check_mark: icon in the description denotes that the field used in the same way as in Ethereum.

### Common Fields

Regardless of various Klaytn transaction type, there are common fields.
(Please remind that fields of Klaytn Transaction Receipt are various based on transaction types.)

This section describes how that common fields are served as Ethereum Transaction Receipt.

| Ethereum Transaction Receipt Field | Klaytn Transaction Receipt Field                                                                     | Description                                                                                                                                                                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash                          | blockHash                                                                                            | :white_check_mark: Block hash.                                                                                                                                                                                                  |
| blockNumber                        | blockNumber                                                                                          | :white_check_mark: Block number.                                                                                                                                                                                                |
| contractAddress                    | contractAddress                                                                                      | :white_check_mark: The contract address created, if the transaction was a contract creation, otherwise - `null`.                                                                                                                |
| cumulativeGasUsed                  | (added)                                                                           | :warning: The total amount of gas used when this transaction was executed in the block. It is provided with the same meaning as the Ethereum field.                                                                                                                       |
| effectiveGasPrice                  | (added)                                                                           | :warning: Dynamic gasPrice, basefee, is determined in the system via the governance processes. For more detailed, see [here](../../../learn/transaction-fees/transaction-fees.md).                                                                                        |
| from                               | from                                                                                                 | :white_check_mark: Address of the sender.                                                                                                                                                                                       |
|                                    | gas(omitted)                                                                      | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                                                                                                        |
| gasUsed                            | gasUsed                                                                                              | :white_check_mark: the amount of gas used by this specific transaction alone.                                                                                                                                                   |
|                                    | gasPrice(omitted)                                                                 | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                                                                                                        |
| logs                               | logs                                                                                                 | :white_check_mark: Array of log objects generated by transactions.                                                                                                                                                              |
| logsBloom                          | logsBloom                                                                                            | :white_check_mark: Bloom filter for light clients to quickly retrieve related logs.                                                                                                                                             |
|                                    | nonce(omitted)                                                                    | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                                                                                                        |
|                                    | [senderTxHash](../../../learn/transactions/transactions.md#sendertxhash)(omitted) | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                                                                                                        |
|                                    | signatures(omitted)                                                               | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                                                                                                        |
| status                             | status                                                                                               | :white_check_mark: Either 1(success) or 0(failure).                                                                                                                                       |
| to                                 | (covered in below sections)                                                       | The description of this field is covered in the detailed transaction items below.                                                                                                                                                                                         |
| transactionHash                    | transactionHash                                                                                      | :white_check_mark: The transaction hash.                                                                                                                                                                                        |
| transactionIndex                   | transactionIndex                                                                                     | :warning: Almost same with Ethereum but unlike Ethereum, Klaytn returns integer as it is when its pending.                                                                                                                                                                |
| type                               | type(converted)                                                                   | :warning: Value and data type of this field is converted. The type of this field is a string(e.g. `"LegacyTransaction"`) in Klaytn but it is converted and served as hexadecimal(e.g. `0x`) just like Ethereum Transaction Receipt. |
|                                    | typeInt(omitted)                                                                  | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                                                                                                        |

### Common Fields For [FeeDelegation](../../../learn/transactions/fee-delegation.md)

Regardless of various Klaytn [FeeDelegation](../../../learn/transactions/fee-delegation.md) transaction type, there are common fields.
(Please remind that fields of Klaytn Transaction Receipt are various based on transaction types.)

This section describes how that common fields for feeDelegation(except for the common fields covered above)
are served as Ethereum Transaction Receipt.

| Ethereum Transaction Receipt Field | Klaytn FeeDelegation Transaction Receipt Field | Description                                                                                        |
| ---------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
|                                    | feePayer(omitted)           | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt. |
|                                    | feePayerSignatures(omitted) | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt. |

### Common Fields For [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md)

Regardless of various Klaytn [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md) transaction type, there are common fields.
(Please remind that fields of Klaytn Transaction Receipt are various based on transaction types.)

This section describes how that common fields for partialFeeDelegation(except for the common fields covered above) are served as Ethereum Transaction Receipt.

| Ethereum Transaction Receipt Field | Klaytn PartialFeeDelegation Transaction Receipt Field | Description                                                                                        |
| ---------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
|                                    | feeRatio(omitted)                  | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt. |

### Different fields for each transaction type

#### LegacyTransaction Receipt

| Ethereum Transaction Receipt Field | Klaytn LegacyTransaction Receipt Field | Description                                                                                                                            |
| ---------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
|                                    | input(omitted)      | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                     |
| to                                 | to                                     | :white_check_mark: Address of the receiver. `null` when its a contract creation transaction. |
|                                    | value(omitted)      | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                     |

**Klaytn LegacyTransaction Receipt** is served as Ethereum Transaction Receipt like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    /** "gas": "0x204c8e", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x1c278",
    /** "input": "0xe2b...", omitted */
    "logs": [
      {
        "address": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
        "topics": [
          "0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15",
          "0x000000000000000000000000bd4fa032e6afe41cacde8e3292fb129b857bfca8",
          "0x0000000000000000000000000000000000000000000000000000000000000003"
        ],
        "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "blockNumber": "0x47ef00c",
        "transactionHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
        "transactionIndex": "0xe",
        "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
        "logIndex": "0xa",
        "removed": false
      }
    ],
    "logsBloom": "0x00...",
    /** "nonce": "0x22aa", omitted */
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "status": "0x1",
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 0, omitted */
    /** "value": "0x0" omitted */
  }
}
```

#### ValueTransfer Transaction Receipt

| Ethereum Transaction Receipt Field | Klaytn ValueTransfer Transaction Receipt Field | Description                                                                                        |
| ---------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| to                                 | to                                             | :white_check_mark: Address of the receiver.              |
|                                    | value(omitted)              | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt. |

**Klaytn ValueTransfer Transaction Receipt** is served as Ethereum Transaction Receipt like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 8, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### ValueTransferMemo Transaction Receipt

| Ethereum Transaction Receipt Field | Klaytn ValueTransferMemo Transaction Receipt Field | Description                                                                                        |
| ---------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
|                                    | input(omitted)                  | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt. |
| to                                 | to                                                 | :white_check_mark: Address of the receiver.              |
|                                    | value(omitted)                  | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt. |

**Klaytn ValueTransferMemo Transaction** is served as Ethereum Transaction Receipt like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0x32142912492149122", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 16, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### SmartContractDeploy Transaction Receipt

| Ethereum Transaction Receipt Field | Klaytn SmartContractDeploy Transaction Receipt Field | Description                                                                                                                                                                           |
| ---------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                    | codeFormat(omitted)               | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                    |
|                                    | humanReadable(omitted)            | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                    |
|                                    | input                                                | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt                                                                                     |
| to                                 | to                                                   | :white_check_mark: Address of the receiver. This field always has value `null` because this transaction is a contract creation transaction. |
|                                    | value                                                | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt                                                                                     |

**Klaytn SmartContractDeploy Transaction Receipt** is served as Ethereum Transaction Receipt like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    /** "codeFormat": "0x0", omitted */
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "humanReadable": false, omitted */
    /** "input": "0x6080...", omitted */
    "logs": [
      {
        "address": "0xf1ac00f758a5baf71507e1d62e2c9dab6aaaf49f",
        "topics": [
          "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x000000000000000000000000760fcf5159263b7cf39b0751e7d2bb008d09147d"
        ],
        "data": "0x",
        "blockNumber": "0x4857712",
        "transactionHash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
        "transactionIndex": "0x6",
        "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
        "logIndex": "0x42",
        "removed": false
      }
    ],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": null,
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 40, omitted */
    /** "value": "0x0" omitted */
  }
}
```

#### SmartContractExecution Transaction Receipt

| Ethereum Transaction Receipt Field | Klaytn SmartContractExecution Transaction Receipt Field | Description                                                                                        |
| ---------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
|                                    | input                                                   | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt. |
| to                                 | to                                                      | :white_check_mark: Address of the smart contract.        |
|                                    | value                                                   | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt. |

**Klaytn SmartContractExecution Transaction Receipt** is served as Ethereum Transaction Receipt like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0x32142912492149122", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 48, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### AccountUpdate Transaction Receipt

| Ethereum Transaction Receipt Field | Klaytn AccountUpdate Transaction Receipt Field | Description                                                                                                                                                                                                   |
| ---------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                    | key(omitted)                | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                                            |
| to                                 | (added)                     | :warning: This field always has same address with `from` because this field does not exist in Klaytn AccountUpdate transaction receipt and giving a value of this field as `from` address is most meaningful. |

**Klaytn AccountUpdate Transaction Receipt** is served as Ethereum Transaction Receipt like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "key": "0x02a102a288c3fb864a012dbe6ca84fcd2afcd9b390cf473b4d35a0126c3164ac3e7f73", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 32, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### Cancel Transaction Receipt

| Ethereum Transaction Receipt Field | Klaytn Cancel Transaction Receipt Field | Description                                                                                                                                                                                            |
| ---------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| to                                 | (added)              | :warning: This field always has same address with `from` because this field does not exist in Klaytn Cancel transaction receipt and giving a value of this field as `from` address is most meaningful. |

**Klaytn Cancel Transaction Receipt** is served as Ethereum Transaction Receipt like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 56, omitted */
  }
}
```

#### ChainDataAnchoring Transaction Receipt

| Ethereum Transaction Receipt Field | Klaytn ChainDataAnchoring Transaction Receipt Field | Description                                                                                                                                                                                                        |
| ---------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                                    | input(omitted)                   | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                                                 |
|                                    | inputJSON(omitted)               | :warning: This field is omitted because this field does not exist in Ethereum Transaction Receipt.                                                                                                                 |
| to                                 | (added)                          | :warning: This field always has same address with `from` because this field does not exist in Klaytn ChainDataAnchoring transaction receipt and giving a value of this field as `from` address is most meaningful. |

**Klaytn ChainDataAnchoring Transaction Receipt** is served as Ethereum Transaction Receipt like below.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0xf8...", omitted */
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 72, omitted */
  }
}
```
