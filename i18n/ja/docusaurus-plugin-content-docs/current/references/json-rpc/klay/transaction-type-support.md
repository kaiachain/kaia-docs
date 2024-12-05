# Transaction Types

## Working with Klaytn Transaction Types

Klaytn has various types of transaction and each type of transaction consists of different fields.
Therefore, users should understand the transaction types and specify the correct one when sending and signing a transaction.
Related APIs: `klay_signTransaction`, `klay_sendTransaction`, `klay_signTransactionAsFeePayer`, `klay_sendTransactionAsFeePayer`, `personal_signTransaction`, `personal_sendTransaction`.

## TxTypeLegacyTransaction <a id="txtypelegacytransaction"></a>

TxTypeLegacyTransaction represents a type of transaction existed previously in Klaytn.
This transaction type exists to support compatibility.
For more information, see [TxTypeLegacyTransaction](../../../learn/transactions/basic.md#txtypelegacytransaction).

**Parameters**

| Name     | Type         | Description                                                                                                                                                                                                                                     |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                 |
| to       | 20-byte DATA | (optional when creating a new contract) The address to which the transaction is directed.                                                                                                                                    |
| gas      | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted. |
| gasPrice | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice. The transaction fee is calculated by the multiplication of gas and gasPrice.                                                                                   |
| value    | QUANTITY     | (optional) Integer of the value sent with this transaction.                                                                                                                                                                  |
| data     | DATA         | The compiled byte code of a contract to deploy or data (function indicator and parameter values) required to call a contract.                                                                                                |
| nonce    | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                               |

**Example**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_signTransaction", "params":[{"from":"0x77982323172e5b6182539d3522d5a33a944206d4", "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa", "value":"0x10000", "gas":"0x1000000", "nonce":"0x2", "gasprice":"0x25000000000"}],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":{
    "raw":"0xf86c0286025000000000840100000094cd6bfdb523a4d030890d28bf1eb6ef36307c9aaa8301000080820fe8a056d2ddd231c3c111687ab351d339240db18cd721e5aa33c601dd4fc3927fb4d1a03443443392517aa7da082aa0a00b9ee5e3e1ee007d22e57cd9ff55b5ddbf4a64",
    "tx":{
      "nonce":"0x2",
      "gasPrice":"0x5d21dba00",
      "gas":"0x1000000",
      "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa",
      "value":"0x10000",
      "input":"0x",
      "v":"0xfe8",
      "r":"0x56d2ddd231c3c111687ab351d339240db18cd721e5aa33c601dd4fc3927fb4d1",
      "s":"0x3443443392517aa7da082aa0a00b9ee5e3e1ee007d22e57cd9ff55b5ddbf4a64",
      "hash":"0xb53cc9128a19c3916c0de1914725b7337bba84666c2556d8682c72ca34c6874c"
    }
  }
}
```

## TxTypeValueTransfer <a id="txtypevaluetransfer"></a>

TxTypeValueTransfer is used when a user wants to send KLAY.
For more information, see [TxTypeValueTransfer](../../../learn/transactions/basic.md#txtypevaluetransfer).

**Parameters**

| Name     | Type         | Description                                                                                                                                                                                                                                     |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt  | Integer      | The integer indicating TxTypeValueTransfer: 8                                                                                                                                                                                                   |
| from     | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                 |
| to       | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                               |
| gas      | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted. |
| gasPrice | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice. The transaction fee is calculated by the multiplication of gas and gasPrice.                                                                                   |
| nonce    | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                               |
| value    | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 8, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x76c0", "gasPrice": "0x5d21dba00", "value": "0xf4"}], "id": 69}' http://127.0.0.1:8551

// Result
{
    "id": 69,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x08f87f0b8505d21dba008276c09444711e89b0c23845b5b2ed9d3716ba42b8a3e07581f494cd01b2b44584fb143824c1ea0231bebaea826b9df847f845824e44a05ce70c3caa0bd5ab73ef1fc11d3a8d866370b36abb153a1cd9203cd15e1f77fea01e4533af9cd3f6f6a107d76f9599f0811f5bc3c89c10e545420caa5bf99ae974",
        "tx": {
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x76c0",
            "gasPrice": "0x5d21dba00",
            "hash": "0x990dab1df932e32fcf3c03578356eacd52eb5b0e8d384ed029d1d6fa53285599",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0x5ce70c3caa0bd5ab73ef1fc11d3a8d866370b36abb153a1cd9203cd15e1f77fe",
                    "S": "0x1e4533af9cd3f6f6a107d76f9599f0811f5bc3c89c10e545420caa5bf99ae974",
                    "V": "0x4e44"
                }
            ],
            "to": "0x44711e89b0c23845b5b2ed9d3716ba42b8a3e075",
            "type": "TxTypeValueTransfer",
            "typeInt": 8,
            "value": "0xf4"
        }
    }
}
```

## TxTypeFeeDelegatedValueTransfer <a id="txtypefeedelegatedvaluetransfer"></a>

Fee delegating version of TxTypeValueTransfer.
For more information, see [TxTypeFeeDelegatedValueTransfer](../../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer).

**Parameters**

| Name       | Type         | Description                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt    | Integer      | The integer indicating TxTypeFeeDelegatedValueTransfer: 9                                                                                                                                                                                                                              |
| from       | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| to         | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                                                                      |
| gas        | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice   | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice. The transaction fee is calculated by the multiplication of gas and gasPrice.                                                                                                                          |
| nonce      | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| value      | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                                                       |
| feePayer   | 20-byte DATA | The address which pays the transaction fee.                                                                                                                                                                                                                                            |
| signatures | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 9, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x76c0", "gasPrice": "0x5d21dba00", "value": "0xf4", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"}], "id": 59}' http://127.0.0.1:8551

// Result
{
    "id": 59,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x09f8950b8505d21dba008276c09444711e89b0c23845b5b2ed9d3716ba42b8a3e07581f494cd01b2b44584fb143824c1ea0231bebaea826b9df847f845824e44a0621661c647dd66e9abd8e5188dd9b60bac91bd0e6df4788d4ff34718d004f790a06349719dc6072fec3bf6baae76c4f129cfdf7cefb8a5607ab693928559c1e5bb94cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x76c0",
            "gasPrice": "0x5d21dba00",
            "hash": "0xed0646d9933e1611ebb7018056fd7ff74c076f7f53bfe1a817d3c677a8978e27",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0x621661c647dd66e9abd8e5188dd9b60bac91bd0e6df4788d4ff34718d004f790",
                    "S": "0x6349719dc6072fec3bf6baae76c4f129cfdf7cefb8a5607ab693928559c1e5bb",
                    "V": "0x4e44"
                }
            ],
            "to": "0x44711e89b0c23845b5b2ed9d3716ba42b8a3e075",
            "type": "TxTypeFeeDelegatedValueTransfer",
            "typeInt": 9,
            "value": "0xf4"
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 9, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "nonce": "0x1c", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x2e6300", "gasPrice": "0x5d21dba00", "value": "0xf4", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "signatures": [{"V": "0x4e43", "R": "0x416a7d1833322359ae7b0f9aad10185f94739a81997af0abd1330ee866564957", "S": "0x1f6bd04c4ebcccced7d2f6b57be088c69070b94ad62898427e906f35b2b48b35"}]}], "id": 69}' http://127.0.0.1:8551

// Result
{
    "id": 69,
    "jsonrpc": "2.0",
    "result": "0xd2bab65e2563fd77d8ee50ac70f6d4aff64456e36d410370a920fa54f1094043"
}
```

## TxTypeFeeDelegatedValueTransferWithRatio <a id="txtypefeedelegatedvaluetransferwithratio"></a>

Partial fee delegating version of TxTypeValueTransfer.
For more information, see [TxTypeFeeDelegatedValueTransferWithRatio](../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio).

**Parameters**

| Name       | Type         | Description                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt    | Integer      | The integer indicating TxTypeFeeDelegatedValueTransferWithRatio: 10                                                                                                                                                                                                                    |
| from       | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| to         | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                                                                      |
| gas        | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice   | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce      | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| value      | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                                                       |
| feePayer   | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| feeRatio   | QUANTITY     | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 \~ 99, if it is out of range, the transaction will not be accepted.                                                                 |
| signatures | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 10, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x76c0", "gasPrice": "0x5d21dba00", "value": "0xf4", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30}], "id": 42}' http://127.0.0.1:8551

// Result
{
    "id": 42,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x0af8960b8505d21dba008276c09444711e89b0c23845b5b2ed9d3716ba42b8a3e07581f494cd01b2b44584fb143824c1ea0231bebaea826b9d1ef847f845824e44a0dd413e74782985ca1de84c5cfe76d25ada70d4498e12fb1f52fc543884a4c0c9a029421d970b89bd271f5ecdbb91c9dcac70f556e38dd7516d2d711276ea0d63bc94cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "feeRatio": "0x1e",
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x76c0",
            "gasPrice": "0x5d21dba00",
            "hash": "0xd5728b5f292944492a452129080dbd431ac5c93cf0a8787f8fbad5852c060ae2",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0xdd413e74782985ca1de84c5cfe76d25ada70d4498e12fb1f52fc543884a4c0c9",
                    "S": "0x29421d970b89bd271f5ecdbb91c9dcac70f556e38dd7516d2d711276ea0d63bc",
                    "V": "0x4e44"
                }
            ],
            "to": "0x44711e89b0c23845b5b2ed9d3716ba42b8a3e075",
            "type": "TxTypeFeeDelegatedValueTransferWithRatio",
            "typeInt": 10,
            "value": "0xf4"
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 10, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "nonce": "0x1d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x2e6300", "gasPrice": "0x5d21dba00", "value": "0xf4", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30, "signatures": [{"V": "0x4e44", "R": "0x76377a0c1a050475fd06dfb192ef1724394a5f77ec6441764f7732d6ab0cbc4d", "S": "0xfb518b09210692bd530586cd484a9f6f653f9bb170e5da8b99d417e58692845"}]}], "id": 47}' http://127.0.0.1:8551

// Result
{
    "id": 47,
    "jsonrpc": "2.0",
    "result": "0xdf882a5ca0874b0e80e033957b53ee4be93918a3929f7c7c3e72bd100f8af646"
}
```

## TxTypeValueTransferMemo <a id="txtypevaluetransfermemo"></a>

TxTypeValueTransferMemo is used when a user wants to send KLAY with a specific message.
For more information, see [TxTypeValueTransferMemo](../../../learn/transactions/basic.md#txtypevaluetransfermemo).

**Parameters**

| Name     | Type         | Description                                                                                                                                                                                                                                     |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt  | Integer      | The integer indicating TxTypeValueTransferMemo: 16                                                                                                                                                                                              |
| from     | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                 |
| to       | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                               |
| gas      | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted. |
| gasPrice | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                         |
| nonce    | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                               |
| value    | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                |
| input    | DATA         | The data sent along with the transaction.                                                                                                                                                                                                       |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 16, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x76c0", "gasPrice": "0x5d21dba00", "value": "0xf4", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001"}], "id": 39}' http://127.0.0.1:8551

// Result
{
    "id": 39,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x10f8a40b8505d21dba008276c09444711e89b0c23845b5b2ed9d3716ba42b8a3e07581f494cd01b2b44584fb143824c1ea0231bebaea826b9da4b3f98adc0000000000000000000000000000000000000000000000000000000000000001f847f845824e44a0be0f4469cb23dbf057590a4d479b1a921e48bcb6ea95c0d94daa1a992124194ba008c27a2c04b02bea0a1d4bc58530d15d8fb89cbc36fc2f113503942b5607befa",
        "tx": {
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x76c0",
            "gasPrice": "0x5d21dba00",
            "hash": "0x3d174e8df748329a8eb0d591a514a6933c9407affc082a13ac05ed88e8dc90fd",
            "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0xbe0f4469cb23dbf057590a4d479b1a921e48bcb6ea95c0d94daa1a992124194b",
                    "S": "0x8c27a2c04b02bea0a1d4bc58530d15d8fb89cbc36fc2f113503942b5607befa",
                    "V": "0x4e44"
                }
            ],
            "to": "0x44711e89b0c23845b5b2ed9d3716ba42b8a3e075",
            "type": "TxTypeValueTransferMemo",
            "typeInt": 16,
            "value": "0xf4"
        }
    }
}
```

## TxTypeFeeDelegatedValueTransferMemo <a id="txtypefeedelegatedvaluetransfermemo"></a>

Fee delegating version of TxTypeValueTransferMemo.
For more information, see [TxTypeFeeDelegatedValueTransferMemo](../../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfermemo).

**Parameters**

| Name       | Type         | Description                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt    | Integer      | The integer indicating TxTypeFeeDelegatedValueTransferMemo: 17                                                                                                                                                                                                                         |
| from       | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| to         | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                                                                      |
| gas        | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice   | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce      | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| value      | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                                                       |
| input      | DATA         | The data sent along with the transaction.                                                                                                                                                                                                                                              |
| feePayer   | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| signatures | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 17, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x76c0", "gasPrice": "0x5d21dba00", "value": "0xf4", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"}], "id": 80}' http://127.0.0.1:8551

// Result
{
    "id": 80,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x11f8ba0b8505d21dba008276c09444711e89b0c23845b5b2ed9d3716ba42b8a3e07581f494cd01b2b44584fb143824c1ea0231bebaea826b9da4b3f98adc0000000000000000000000000000000000000000000000000000000000000001f847f845824e43a0e8daa1ec0c5fd4201cb914382104185ce2b6eab31b488616f245a1da58c6c950a028587ef4fa5c6dad2b4090a6d452692d1b8a3e90b2b6f7902a983c4a88521f6c94cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x76c0",
            "gasPrice": "0x5d21dba00",
            "hash": "0x44050059cd96ca35461a895d2eda8fec83c725c782ca22a29be6babd0cca7348",
            "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0xe8daa1ec0c5fd4201cb914382104185ce2b6eab31b488616f245a1da58c6c950",
                    "S": "0x28587ef4fa5c6dad2b4090a6d452692d1b8a3e90b2b6f7902a983c4a88521f6c",
                    "V": "0x4e43"
                }
            ],
            "to": "0x44711e89b0c23845b5b2ed9d3716ba42b8a3e075",
            "type": "TxTypeFeeDelegatedValueTransferMemo",
            "typeInt": 17,
            "value": "0xf4"
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 17, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0xf4", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "signatures": [{"V": "0x4e43", "R": "0xf343844adff1cde850c0215c78b7f9258ab158e125ee100888f454c91c51cf51", "S": "0x245f5e78ae1b52aafd18b86de6ca615af6676f3f3b70baba601748caaf1c813f"}], "nonce": "0x1e"}], "id": 81}' http://127.0.0.1:8551

// Result
{
    "id": 81,
    "jsonrpc": "2.0",
    "result": "0x83b9a07b14c57d8cef09fee549f2e068aa1c39c3b51ca14c4b663aa5486a938f"
}
```

## TxTypeFeeDelegatedValueTransferMemoWithRatio <a id="txtypefeedelegatedvaluetransfermemowithratio"></a>

Partial fee delegating version of TxTypeValueTransferMemo.
For more information, see [TxTypeFeeDelegatedValueTransferMemoWithRatio](../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio).

**Parameters**

| Name       | Type         | Description                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt    | Integer      | The integer indicating TxTypeFeeDelegatedValueTransferMemoWithRatio: 18                                                                                                                                                                                                                |
| from       | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| to         | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                                                                      |
| gas        | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice   | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce      | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| value      | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                                                       |
| input      | DATA         | The data sent along with the transaction.                                                                                                                                                                                                                                              |
| feePayer   | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| feeRatio   | QUANTITY     | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 \~ 99, if it is out of range, the transaction will not be accepted.                                                                 |
| signatures | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 18, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x76c0", "gasPrice": "0x5d21dba00", "value": "0xf4", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30}], "id": 38}' http://127.0.0.1:8551

// Result
{
    "id": 38,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x12f8bb0b8505d21dba008276c09444711e89b0c23845b5b2ed9d3716ba42b8a3e07581f494cd01b2b44584fb143824c1ea0231bebaea826b9da4b3f98adc00000000000000000000000000000000000000000000000000000000000000011ef847f845824e44a0c17297d552eb7e1643491076a6c3d8c5a78768d38ce32b532bff91bbffa0d7fea00f3acdb36835ff4167e995b448693cefc1c28d9f5d5b18a4e74b000ca597758594cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "feeRatio": "0x1e",
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x76c0",
            "gasPrice": "0x5d21dba00",
            "hash": "0xd5c1d7037b8e38781010e55ffb143caa84b5972f80c60bacd2ca324b898896cd",
            "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0xc17297d552eb7e1643491076a6c3d8c5a78768d38ce32b532bff91bbffa0d7fe",
                    "S": "0xf3acdb36835ff4167e995b448693cefc1c28d9f5d5b18a4e74b000ca5977585",
                    "V": "0x4e44"
                }
            ],
            "to": "0x44711e89b0c23845b5b2ed9d3716ba42b8a3e075",
            "type": "TxTypeFeeDelegatedValueTransferMemoWithRatio",
            "typeInt": 18,
            "value": "0xf4"
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 18, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0xf4", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30, "signatures": [{"V": "0x4e43", "R": "0x5fecba257917e6677c51d94f0d9670621650a511aae86bd1e50a01c771fb68a0", "S": "0x441a9632f499dbce3d4fc974db3b431cf8ff0a2f93a6490c018796278f6edb2b"}], "nonce": "0x1f"}], "id": 81}' http://127.0.0.1:8551

// Result
{
    "id": 81,
    "jsonrpc": "2.0",
    "result": "0x34cd8c8aed102dad5201592eed848df66377fcbbe75befac4e8da8d43167e930"
}
```

## TxTypeAccountUpdate <a id="txtypeaccountupdate"></a>

TxTypeAccountUpdate updates the key of the given account.
For more information, see [TxTypeAccountUpdate](../../../learn/transactions/basic.md#txtypeaccountupdate).

**Parameters**

| Name     | Type         | Description                                                                                                                                                                                                                                     |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt  | Integer      | The integer indicating TxTypeAccountUpdate: 32                                                                                                                                                                                                  |
| from     | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                 |
| gas      | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted. |
| gasPrice | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                         |
| nonce    | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                               |
| key      | DATA         | The new account key of the `from` account in RLP encoded format. For more information about the account key, see [Account Key](../../../learn/accounts.md#account-key).                                                                         |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 32, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "key": "0x01c0"}], "id": 68}' http://127.0.0.1:8551

// Result
{
    "id": 68,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x20f86c0b8505d21dba008304a38094cd01b2b44584fb143824c1ea0231bebaea826b9d8201c0f847f845824e43a0e297d840a0083b5a71e6c3c3c159699729da52e840f32dbd73074909d537924ca03408c830d52dfc60c3db82b048819a91b5537dbce8bc7ffb1e3a4bc70e0b61a2",
        "tx": {
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0x50f346ff1af194b160a2096a4f290e0a6c2b0d8d026c71babd7397a55541b1c2",
            "key": "0x01c0",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0xe297d840a0083b5a71e6c3c3c159699729da52e840f32dbd73074909d537924c",
                    "S": "0x3408c830d52dfc60c3db82b048819a91b5537dbce8bc7ffb1e3a4bc70e0b61a2",
                    "V": "0x4e43"
                }
            ],
            "type": "TxTypeAccountUpdate",
            "typeInt": 32
        }
    }
}
```

## TxTypeFeeDelegatedAccountUpdate <a id="txtypefeedelegatedaccountupdate"></a>

Fee delegating version of TxTypeAccountUpdate.
For more information, see [TxTypeFeeDelegatedAccountUpdate](../../../learn/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate).

**Parameters**

| Name       | Type         | Description                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt    | Integer      | The integer indicating TxTypeFeeDelegatedAccountUpdate: 33                                                                                                                                                                                                                             |
| from       | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| gas        | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice   | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce      | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| key        | DATA         | The new account key of the `from` account in RLP encoded format. For more information about the account key, see [Account Key](../../../learn/accounts.md#account-key).                                                                                                                |
| feePayer   | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| signatures | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 33, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "key": "0x01c0", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"}], "id": 85}' http://127.0.0.1:8551

// Result
{
    "id": 85,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x21f8820b8505d21dba008304a38094cd01b2b44584fb143824c1ea0231bebaea826b9d8201c0f847f845824e43a04063c2566f292e294e9e7526e6709a7efda29c131ad2f8d99d500a5ed203f5f6a0682bf0b33bfdfccfa3a810b1190c9c0e04a347733f5207d670e53fb550f22d4894cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0x0cda98d0d42afb2bfc95e256246cb86967ed815c34c8c6058172db46d28e5c70",
            "key": "0x01c0",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0x4063c2566f292e294e9e7526e6709a7efda29c131ad2f8d99d500a5ed203f5f6",
                    "S": "0x682bf0b33bfdfccfa3a810b1190c9c0e04a347733f5207d670e53fb550f22d48",
                    "V": "0x4e43"
                }
            ],
            "type": "TxTypeFeeDelegatedAccountUpdate",
            "typeInt": 33
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 33, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "key": "0x01c0", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "signatures": [{"V": "0x4e43", "R": "0x87da8ac5c398bcf379d3034d72d239c8de167cafe240da13019606aad628aa8b", "S": "0x3d11215843cbc25cdf3076e4ead6272e20d72b22e0b9d498bfcd1ceff497baf4"}], "nonce": "0x20"}], "id": 78}' http://127.0.0.1:8551

// Result
{
    "id": 78,
    "jsonrpc": "2.0",
    "result": "0x63f91622a4225953cf100b334f14e85c761278a5e5401f35b6f8a8303968e0fe"
}
```

## TxTypeFeeDelegatedAccountUpdateWithRatio <a id="txtypefeedelegatedaccountupdatewithratio"></a>

Partial fee delegating version of TxTypeAccountUpdate.
For more information, see [TxTypeFeeDelegatedAccountUpdateWithRatio](../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio).

**Parameters**

| Name       | Type         | Description                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt    | Integer      | The integer indicating TxTypeFeeDelegatedAccountUpdateWithRatio: 34                                                                                                                                                                                                                    |
| from       | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| gas        | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice   | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce      | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| key        | DATA         | The new account key of the `from` account in RLP encoded format. For more information about the account key, see [Account Key](../../../learn/accounts.md#account-key).                                                                                                                |
| feePayer   | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| feeRatio   | QUANTITY     | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 \~ 99, if it is out of range, the transaction will not be accepted.                                                                 |
| signatures | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 34, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "key": "0x01c0", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30}], "id": 78}' http://127.0.0.1:8551

// Result
{
    "id": 78,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x22f8830b8505d21dba008304a38094cd01b2b44584fb143824c1ea0231bebaea826b9d8201c01ef847f845824e43a07b86231816847655d02b68993189dcbaaae5d5168a8c1bf90ba735c1c26f4ef1a07c3e7750d0c9a3f03240ccc53125a94a7df8fce074f043d6556491869892ab9b94cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "feeRatio": "0x1e",
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0x876819fa8192f83e72b463d15b0d09bd8db4f6d3d12235f1fc2786d074cbe05e",
            "key": "0x01c0",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0x7b86231816847655d02b68993189dcbaaae5d5168a8c1bf90ba735c1c26f4ef1",
                    "S": "0x7c3e7750d0c9a3f03240ccc53125a94a7df8fce074f043d6556491869892ab9b",
                    "V": "0x4e43"
                }
            ],
            "type": "TxTypeFeeDelegatedAccountUpdateWithRatio",
            "typeInt": 34
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 34, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "key": "0x01c0", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30, "signatures": [{"V": "0x4e44", "R": "0xd285969e88c3cc92471bda4bbcdce2d23eaa9bdcc47a64421de4858b7a51fd04", "S": "0x5b8123f9666580c51fdbd5a8b1d67bf1ae774e5a8e3e1ebfbf4f2024e94e82cc"}], "nonce": "0x21"}], "id": 100}' http://127.0.0.1:8551

// Result
{
    "id": 100,
    "jsonrpc": "2.0",
    "result": "0x549ee50b4f7ab804300028b3db9e9307217ffd5873ddf090413b15ffbf6c484f"
}
```

## TxTypeSmartContractDeploy <a id="txtypesmartcontractdeploy"></a>

TxTypeSmartContractDeploy deploys a smart contract to the given address.
For more information, see [TxTypeSmartContractDeploy](../../../learn/transactions/basic.md#txtypesmartcontractdeploy).

**Parameters**

| Name          | Type         | Description                                                                                                                                                                                                                                     |
| ------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt       | Integer      | The integer indicating TxTypeSmartContractDeploy: 40                                                                                                                                                                                            |
| from          | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                 |
| to            | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                               |
| gas           | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted. |
| gasPrice      | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                         |
| nonce         | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                               |
| value         | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                |
| input         | DATA         | The data sent along with the transaction.                                                                                                                                                                                                       |
| humanReadable | Boolean      | `true` if the address is humanReadable, `false` if the address is not humanReadable. Currently, the value should be `false`. Human-readable addresses will be supported later.                                                                  |
| codeFormat    | QUANTITY     | The code format of smart contract code. The value `0` indicates EVM.                                                                                                                                                                            |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 40, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": null, "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e2200029", "humanReadable": false, "codeFormat": 0}], "id": 78}' http://127.0.0.1:8551

// Result
{
    "id": 78,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x28f9036b0b8505d21dba008304a380808094cd01b2b44584fb143824c1ea0231bebaea826b9db902fb608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e22000298080f847f845824e44a0552594bd948e5ac9afd4db267f5f39136343faea957f91b44bc90c26c29b42c2a05b16e9ba9105bc1af84552e3d299c4fe1e3d76a521c64616d1f2ae842ddf389b",
        "tx": {
            "codeFormat": "0x0",
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0x75c5d9923189be1ac6d2eb4739bcb2f0aadd3b8324e49b6228fdbc0baa074bc5",
            "humanReadable": false,
            "input": "0x608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e2200029",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0x552594bd948e5ac9afd4db267f5f39136343faea957f91b44bc90c26c29b42c2",
                    "S": "0x5b16e9ba9105bc1af84552e3d299c4fe1e3d76a521c64616d1f2ae842ddf389b",
                    "V": "0x4e44"
                }
            ],
            "to": null,
            "type": "TxTypeSmartContractDeploy",
            "typeInt": 40,
            "value": "0x0"
        }
    }
}
```

## TxTypeFeeDelegatedSmartContractDeploy <a id="txtypefeedelegatedsmartcontractdeploy"></a>

Fee delegating version of TxTypeSmartContractDeploy.
For more information, see [TxTypeFeeDelegatedSmartContractDeploy](../../../learn/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy).

**Parameters**

| Name          | Type         | Description                                                                                                                                                                                                                                                                            |
| ------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt       | Integer      | The integer indicating TxTypeFeeDelegatedSmartContractDeploy: 41                                                                                                                                                                                                                       |
| from          | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| to            | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                                                                      |
| gas           | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice      | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce         | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| value         | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                                                       |
| input         | DATA         | The data sent along with the transaction.                                                                                                                                                                                                                                              |
| humanReadable | Boolean      | `true` if the address is humanReadable, `false` if the address is not humanReadable. Currently, the value should be `false`. Human-readable addresses will be supported later.                                                                                                         |
| codeFormat    | QUANTITY     | The code format of smart contract code. The value `0` indicates EVM.                                                                                                                                                                                                                   |
| feePayer      | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| signatures    | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 41, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": null, "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e2200029", "humanReadable": false, "codeFormat": 0, "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"}], "id": 30}' http://127.0.0.1:8551

// Result
{
    "id": 30,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x29f903810b8505d21dba008304a380808094cd01b2b44584fb143824c1ea0231bebaea826b9db902fb608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e22000298080f847f845824e43a081d4349641adefcbcf5176b8ebeadc87210181630764bbe953c21a8af12174aca040816a4b6350101e9c7717e2711b8e52a0b0f900be23c6fdae73ede97979156894cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "codeFormat": "0x0",
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0x6698cb063e03f86f1efc7037691f689f9c868324d3711be0254646a08b31ccd5",
            "humanReadable": false,
            "input": "0x608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e2200029",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0x81d4349641adefcbcf5176b8ebeadc87210181630764bbe953c21a8af12174ac",
                    "S": "0x40816a4b6350101e9c7717e2711b8e52a0b0f900be23c6fdae73ede979791568",
                    "V": "0x4e43"
                }
            ],
            "to": null,
            "type": "TxTypeFeeDelegatedSmartContractDeploy",
            "typeInt": 41,
            "value": "0x0"
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 41, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": null, "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e2200029", "humanReadable": false, "codeFormat": 0, "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "signatures": [{"V": "0x4e44", "R": "0x25aaa9dcd863ec742299c7204d7720277ae39a277232a3b1ad61d4b665c89da9", "S": "0x4c00c144ac183f6b61224f4721e7e0d2c5f583e5793175cf35c04bdfb46e1b16"}], "nonce": "0x22"}], "id": 84}' http://127.0.0.1:8551

// Result
{
    "id": 84,
    "jsonrpc": "2.0",
    "result": "0x6568f35b350883cdc91f9c1c8bf039fde1fadbb43e2d1104f78586471a5edc48"
}
```

## TxTypeFeeDelegatedSmartContractDeployWithRatio <a id="txtypefeedelegatedsmartcontractdeploywithratio"></a>

Partial fee delegating version of TxTypeSmartContractDeploy.
For more information, see [TxTypeFeeDelegatedSmartContractDeployWithRatio](../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio).

**Parameters**

| Name          | Type         | Description                                                                                                                                                                                                                                                                            |
| ------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt       | Integer      | The integer indicating TxTypeFeeDelegatedSmartContractDeployWithRatio: 42                                                                                                                                                                                                              |
| from          | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| to            | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                                                                      |
| gas           | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice      | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce         | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| value         | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                                                       |
| input         | DATA         | The data sent along with the transaction.                                                                                                                                                                                                                                              |
| humanReadable | Boolean      | `true` if the address is humanReadable, `false` if the address is not humanReadable. Currently, the value should be `false`. Human-readable addresses will be supported later.                                                                                                         |
| codeFormat    | QUANTITY     | The code format of smart contract code. The value `0` indicates EVM.                                                                                                                                                                                                                   |
| feePayer      | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| feeRatio      | QUANTITY     | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 \~ 99, if it is out of range, the transaction will not be accepted.                                                                 |
| signatures    | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 42, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": null, "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e2200029", "humanReadable": false, "codeFormat": 0, "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30}], "id": 49}' http://127.0.0.1:8551

// Result
{
    "id": 49,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x2af903820b8505d21dba008304a380808094cd01b2b44584fb143824c1ea0231bebaea826b9db902fb608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e2200029801e80f847f845824e44a08b3bb148f0f9c5e5f73d0ab92147ca5c13e282ba645b57a36616560c5f0d1bb8a017e249300e72a0ab8fa06068993bc2b3f15d56583461801931879bc2bf48444294cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "codeFormat": "0x0",
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "feeRatio": "0x1e",
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0x0c1dceb1884c2bf8caa7c8d775a5709d912ebd03263888c10bcbee378562dd37",
            "humanReadable": false,
            "input": "0x608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e2200029",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0x8b3bb148f0f9c5e5f73d0ab92147ca5c13e282ba645b57a36616560c5f0d1bb8",
                    "S": "0x17e249300e72a0ab8fa06068993bc2b3f15d56583461801931879bc2bf484442",
                    "V": "0x4e44"
                }
            ],
            "to": null,
            "type": "TxTypeFeeDelegatedSmartContractDeployWithRatio",
            "typeInt": 42,
            "value": "0x0"
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 42, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": null, "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x608060405234801561001057600080fd5b506040516020806102fb8339810180604052602081101561003057600080fd5b810190808051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003816100fd919061010c565b50600f6000819055505061015f565b815481835581811115610133578183600052602060002091820191016101329190610138565b5b505050565b61015c91905b80821115610158576000808201600090555060010161013e565b5090565b90565b61018d8061016e6000396000f3fe60806040526004361061003b576000357c010000000000000000000000000000000000000000000000000000000090048063b3f98adc14610040575b600080fd5b34801561004c57600080fd5b5061007c6004803603602081101561006357600080fd5b81019080803560ff16906020019092919050505061007e565b005b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806100e657506003805490508260ff1610155b156100f1575061015e565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff1681548110151561014257fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a72305820dad6d3e144a160eb6e34d8d99084ed29d207271e201aaac513007f652a26e2200029", "humanReadable": false, "codeFormat": 0, "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30, "signatures": [{"V": "0x4e44", "R": "0xc4e11861dd7c2849a727c979cc96ff4dfbfddc36ffe443437e9a27a9dcd028c2", "S": "0x475dc05fe78c62ced1c3d2b260c47c3e971cd66edad28da5adeeb7de63ed9413"}], "nonce": "0x23"}], "id": 68}' http://127.0.0.1:8551

// Result
{
    "id": 68,
    "jsonrpc": "2.0",
    "result": "0xc0e14928ee5eb9b81d2c8d0303c78df0d6fa3bffaa4d5b8c3008e04230447fa6"
}
```

## TxTypeSmartContractExecution <a id="txtypesmartcontractexecution"></a>

TxTypeSmartContractExecution executes a smart contract with the given data in `input`.
For more information, see [TxTypeSmartContractExecution](../../../learn/transactions/basic.md#txtypesmartcontractexecution).

**Parameters**

| Name     | Type         | Description                                                                                                                                                                                                                                     |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt  | Integer      | The integer indicating TxTypeSmartContractExecution: 48                                                                                                                                                                                         |
| from     | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                 |
| to       | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                               |
| gas      | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted. |
| gasPrice | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                         |
| nonce    | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                               |
| value    | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                |
| input    | DATA         | The data sent along with the transaction.                                                                                                                                                                                                       |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 48, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x5614dd922069d284ac9219f53cd235935c527954", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001"}], "id": 69}' http://127.0.0.1:8551

// Result
{
    "id": 69,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x30f8a40b8505d21dba008304a380945614dd922069d284ac9219f53cd235935c5279548094cd01b2b44584fb143824c1ea0231bebaea826b9da4b3f98adc0000000000000000000000000000000000000000000000000000000000000001f847f845824e43a00e4ae419c0eaa7a8b26372250583acff5ac4958e1e93b0ef73fcf2294d3970e5a00663c79625384ceff103b4317102434cc3c5a89e71dd11056b738cb89ff5655e",
        "tx": {
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0x1dc3e1b9f6fdf8aad78c7b9afea0f6ecdff98a109eb4c093aff9dfd4b4aed7f2",
            "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0xe4ae419c0eaa7a8b26372250583acff5ac4958e1e93b0ef73fcf2294d3970e5",
                    "S": "0x663c79625384ceff103b4317102434cc3c5a89e71dd11056b738cb89ff5655e",
                    "V": "0x4e43"
                }
            ],
            "to": "0x5614dd922069d284ac9219f53cd235935c527954",
            "type": "TxTypeSmartContractExecution",
            "typeInt": 48,
            "value": "0x0"
        }
    }
}
```

## TxTypeFeeDelegatedSmartContractExecution <a id="txtypefeedelegatedsmartcontractexecution"></a>

Fee delegating version of TxTypeSmartContractExecution.
For more information, see [TxTypeFeeDelegatedSmartContractExecution](../../../learn/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractexecution).

**Parameters**

| Name       | Type         | Description                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt    | Integer      | The integer indicating TxTypeFeeDelegatedSmartContractExecution: 49                                                                                                                                                                                                                    |
| from       | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| to         | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                                                                      |
| gas        | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice   | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce      | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| value      | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                                                       |
| input      | DATA         | The data sent along with the transaction.                                                                                                                                                                                                                                              |
| feePayer   | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| signatures | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 49, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x5614dd922069d284ac9219f53cd235935c527954", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"}], "id": 25}' http://127.0.0.1:8551

// Result
{
    "id": 25,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x31f8ba0b8505d21dba008304a380945614dd922069d284ac9219f53cd235935c5279548094cd01b2b44584fb143824c1ea0231bebaea826b9da4b3f98adc0000000000000000000000000000000000000000000000000000000000000001f847f845824e44a0ce5a5c8c3d333c3c8869715d4512707d1464a09cbe178eb48d957f6cbb958471a0481a65733bca3ef988bfb82482e057289b57706a2d435a7cabc1d0f42e8986aa94cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0x8d2d26c07ed386b618154261b5c044a84da71136397c3482e534057b7650daaf",
            "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0xce5a5c8c3d333c3c8869715d4512707d1464a09cbe178eb48d957f6cbb958471",
                    "S": "0x481a65733bca3ef988bfb82482e057289b57706a2d435a7cabc1d0f42e8986aa",
                    "V": "0x4e44"
                }
            ],
            "to": "0x5614dd922069d284ac9219f53cd235935c527954",
            "type": "TxTypeFeeDelegatedSmartContractExecution",
            "typeInt": 49,
            "value": "0x0"
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 49, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0xa85553604e37603a461e9b085cdac5f713210339", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "signatures": [{"V": "0x4e43", "R": "0x8d179a52bd2c819a6b8a61bac63ec6e68583696bb7a2968e8071cb687808e92f", "S": "0x68b47095625c2af8c9996d19d64356a54b98f23de2585af7cb21db56c24e168"}], "nonce": "0x24"}], "id": 84}' http://127.0.0.1:8551

// Result
{
    "id": 84,
    "jsonrpc": "2.0",
    "result": "0x4bc27d46fed8d402ff1f22c971ac91d066568cf9f9c4bab163842c3c17af164d"
}
```

## TxTypeFeeDelegatedSmartContractExecutionWithRatio <a id="txtypefeedelegatedsmartcontractexecutionwithratio"></a>

Partial fee delegating version of TxTypeSmartContractExecution.
For more information, see [TxTypeFeeDelegatedSmartContractExecutionWithRatio](../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio).

**Parameters**

| Name       | Type         | Description                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt    | Integer      | The integer indicating TxTypeFeeDelegatedSmartContractExecutionWithRatio: 50                                                                                                                                                                                                           |
| from       | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| to         | 20-byte DATA | The address to which the transaction is directed.                                                                                                                                                                                                                                      |
| gas        | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice   | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce      | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| value      | QUANTITY     | Integer of the value sent with this transaction.                                                                                                                                                                                                                                       |
| input      | DATA         | The data sent along with the transaction.                                                                                                                                                                                                                                              |
| feePayer   | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| feeRatio   | QUANTITY     | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 \~ 99, if it is out of range, the transaction will not be accepted.                                                                 |
| signatures | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 50, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x5614dd922069d284ac9219f53cd235935c527954", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30}], "id": 13}' http://127.0.0.1:8551

// Result
{
    "id": 13,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x32f8bb0b8505d21dba008304a380945614dd922069d284ac9219f53cd235935c5279548094cd01b2b44584fb143824c1ea0231bebaea826b9da4b3f98adc00000000000000000000000000000000000000000000000000000000000000011ef847f845824e44a01aad5fc01801b4f07f2d140c6aab84e19909add2b97cc6da826bed19d62acdf2a01c8368781372890a7a339e43f0aec14c2b587604c365c2f46b075c5ea35b500594cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "feeRatio": "0x1e",
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0xae60a77bbab218ca43dfc2013a1c16a886ab9d2a2b3bdecad6fd0d68c35a65f4",
            "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0x1aad5fc01801b4f07f2d140c6aab84e19909add2b97cc6da826bed19d62acdf2",
                    "S": "0x1c8368781372890a7a339e43f0aec14c2b587604c365c2f46b075c5ea35b5005",
                    "V": "0x4e44"
                }
            ],
            "to": "0x5614dd922069d284ac9219f53cd235935c527954",
            "type": "TxTypeFeeDelegatedSmartContractExecutionWithRatio",
            "typeInt": 50,
            "value": "0x0"
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 50, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0xa85553604e37603a461e9b085cdac5f713210339", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30, "signatures": [{"V": "0x4e44", "R": "0xd742608c411371d7b1db08dc6f43adabdb9b75ec03c2fa185216103de600556b", "S": "0x24b541a84945f8bc96f563909aa0ad2c7ac8376d31a65eca7a2d79b721701170"}], "nonce": "0x25"}], "id": 44}' http://127.0.0.1:8551

// Result
{
    "id": 44,
    "jsonrpc": "2.0",
    "result": "0xbf9e14ae6145544904985fa1188af5c39242ccd34412b5e42f0923f171fef5da"
}
```

## TxTypeCancel <a id="txtypecancel"></a>

TxTypeCancel cancels the execution of the transaction with the same nonce in the transaction pool.
For more information, see [TxTypeCancel](../../../learn/transactions/basic.md#txtypecancel).

**Parameters**

| Name     | Type         | Description                                                                                                                                                                                                                                     |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt  | Integer      | The integer indicating TxTypeCancel: 56                                                                                                                                                                                                         |
| from     | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                 |
| gas      | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted. |
| gasPrice | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                         |
| nonce    | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                               |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 56, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "gas": "0x4a380", "gasPrice": "0x5d21dba00"}], "id": 81}' http://127.0.0.1:8551

// Result
{
    "id": 81,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x38f8690b8505d21dba008304a38094cd01b2b44584fb143824c1ea0231bebaea826b9df847f845824e44a0a72b71b46fe45bdafd4d8ea170fe5394897390a1442daeb4d996038a5e94209fa04324cf8ce69b84042651e7a0d0c40159fe41a76b708ae9119143e67f5267f9a2",
        "tx": {
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0xc37ed41959d4188ad51f4afd2c74cb0f6a1c4e3340d7d8290b103e22947e6843",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0xa72b71b46fe45bdafd4d8ea170fe5394897390a1442daeb4d996038a5e94209f",
                    "S": "0x4324cf8ce69b84042651e7a0d0c40159fe41a76b708ae9119143e67f5267f9a2",
                    "V": "0x4e44"
                }
            ],
            "type": "TxTypeCancel",
            "typeInt": 56
        }
    }
}
```

## TxTypeFeeDelegatedCancel <a id="txtypefeedelegatedcancel"></a>

Fee delegating version of TxTypeCancel.
For more information, see [TxTypeFeeDelegatedCancel](../../../learn/transactions/fee-delegation.md#txtypefeedelegatedcancel).

**Parameters**

| Name       | Type         | Description                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt    | Integer      | The integer indicating TxTypeFeeDelegatedCancel: 57                                                                                                                                                                                                                                    |
| from       | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| gas        | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice   | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce      | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| feePayer   | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| signatures | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 57, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"}], "id": 15}' http://127.0.0.1:8551

// Result
{
    "id": 15,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x39f87f0b8505d21dba008304a38094cd01b2b44584fb143824c1ea0231bebaea826b9df847f845824e44a0f153ef31f56eda62da8bd28138f07b39d9c4158b9f96fb4db6dd5d77f4cc31bba06f787bddc96928c5bc83669ea26d23aa75fd1640241ab28fdbffaa23f13e677994cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0x14df6ed72ca4aab0db13f9b105ff5d89a1186100969b7c2bf506c7757e278523",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0xf153ef31f56eda62da8bd28138f07b39d9c4158b9f96fb4db6dd5d77f4cc31bb",
                    "S": "0x6f787bddc96928c5bc83669ea26d23aa75fd1640241ab28fdbffaa23f13e6779",
                    "V": "0x4e44"
                }
            ],
            "type": "TxTypeFeeDelegatedCancel",
            "typeInt": 57
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 57, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "signatures": [{"V": "0x4e44", "R": "0xf276dcf90e7ba5aef0c77a940d7f360bb60d761ba0ddced96584ededf56e87d3", "S": "0x2e5feb5b09985da167cce835a93ad60d56b4c125e62da4d3379fc6bcb37ef479"}], "nonce": "0x26"}], "id": 87}' http://127.0.0.1:8551

// Result
{
    "id": 87,
    "jsonrpc": "2.0",
    "result": "0xe5a3d4be46c0bab979d307660cd2c54f73c96efca8ead4b8c919ad699e9e30a9"
}
```

## TxTypeFeeDelegatedCancelWithRatio <a id="txtypefeedelegatedcancelwithratio"></a>

Partial fee delegating version of TxTypeCancel.
For more information, see [TxTypeFeeDelegatedCancelWithRatio](../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio).

**Parameters**

| Name       | Type         | Description                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeInt    | Integer      | The integer indicating TxTypeFeeDelegatedCancelWithRatio: 58                                                                                                                                                                                                                           |
| from       | 20-byte DATA | The address from which the transaction is sent.                                                                                                                                                                                                                                        |
| gas        | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. Unused gas will be refunded to the sender. If the specified gas is not enough to execute the transaction, the transaction is reverted.                                        |
| gasPrice   | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                                                                                                                                                                                |
| nonce      | QUANTITY     | (optional) Integer of a nonce.                                                                                                                                                                                                                                      |
| feePayer   | 20-byte DATA | The fee payer address of the transaction.                                                                                                                                                                                                                                              |
| feeRatio   | QUANTITY     | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 \~ 99, if it is out of range, the transaction will not be accepted.                                                                 |
| signatures | DATA         | (optional - only for `klay_sendTransactionAsFeePayer` API) An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |

**Example 1 (`klay_signTransaction`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransaction", "params": [{"typeInt": 58, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30}], "id": 100}' http://127.0.0.1:8551

// Result
{
    "id": 100,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x3af8800b8505d21dba008304a38094cd01b2b44584fb143824c1ea0231bebaea826b9d1ef847f845824e43a0db346a4577ab7005271b8c6f87abce971aa84dfc99bb5b21656c6241fd48886aa07b48b59572b6c7e1cb9710a3e41a6a2064fa0afd5de5de16554d91d905a018be94cd01b2b44584fb143824c1ea0231bebaea826b9dc0",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [],
            "feeRatio": "0x1e",
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x4a380",
            "gasPrice": "0x5d21dba00",
            "hash": "0xa49f09dda70e9571da57c6dc755cd7f21587cdafea20faa76557d4e47e8f0ce5",
            "nonce": "0xb",
            "signatures": [
                {
                    "R": "0xdb346a4577ab7005271b8c6f87abce971aa84dfc99bb5b21656c6241fd48886a",
                    "S": "0x7b48b59572b6c7e1cb9710a3e41a6a2064fa0afd5de5de16554d91d905a018be",
                    "V": "0x4e43"
                }
            ],
            "type": "TxTypeFeeDelegatedCancelWithRatio",
            "typeInt": 58
        }
    }
}
```

**Example 2 (`klay_sendTransactionAsFeePayer`)**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_sendTransactionAsFeePayer", "params": [{"typeInt": 58, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "gas": "0x4a380", "gasPrice": "0x5d21dba00", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "feeRatio": 30, "signatures": [{"V": "0x4e44", "R": "0x8f966ed84221298383ad1d7599a18aa461f42206284a9121a58351b1e4a51bd8", "S": "0x2272e9eb953ed69a65a392c3a67b58a981acd503abeceaf60679ddb38e4fb4b0"}], "nonce": "0x27"}], "id": 96}' http://127.0.0.1:8551

// Result
{
    "id": 96,
    "jsonrpc": "2.0",
    "result": "0xa214d6cfdfc4501a976a00038dc39d57247947c2cb7d8c79f3e647447a6370c8"
}
```
