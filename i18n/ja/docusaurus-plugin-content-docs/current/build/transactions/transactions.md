# Implementing Transactions

This guide provides a comprehensive overview of implementing transactions on the Kaia network, covering various transaction types, encoding, signing, and network interaction.

## Kaia Transaction Components

Kaia transactions generally include the following components:

| コンポーネント       | 説明                                                                                                                                                                                                                                                                                                         |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`        | The sender's address.  Required for most Kaia transaction types due to the decoupling of key pairs and addresses.                                                                                                                                                          |
| `to`          | 送金された金額を受け取る口座アドレス。                                                                                                                                                                                                                                                                                        |
| `value`       | The amount of KLAY in `peb` to be transferred.                                                                                                                                                                                                                                             |
| `input`       | トランザクションの実行に使用される、トランザクションに添付されたデータ。                                                                                                                                                                                                                                                                       |
| `v`, `r`, `s` | 受信者が送信者のアドレスを取得するために送信者が生成した暗号署名。                                                                                                                                                                                                                                                                          |
| `nonce`       | 送信者のトランザクションを一意に識別するために使用される値。 同じnonceを持つ2つのトランザクションが送信者によって生成された場合、1つだけが実行される。                                                                                                                                                                                                                            |
| `gas`         | トランザクションが使用できる取引手数料の上限額。                                                                                                                                                                                                                                                                                   |
| `gasPrice`    | 送信者がトークンで支払う金額を得るための乗数。 送信者が支払うトークンの金額は `gas` ⑭ `gasPrice` によって計算される。 For example, the sender will pay 10 KLAY for a transaction fee if gas is 10 and gasPrice is 10^18. Unit of KAIA is described [here](../../learn/token-economics/kaia-native-token.md#units-of-kaia). |

## Signature Validation

Because Kaia decouples key pairs from addresses, signature validation differs from typical blockchains.  The `from` field is crucial, as it identifies the sender.  The [AccountKey](../../learn/accounts.md#account-key) associated with the `from` address is used to validate the signature.

## Fee Delegation and SenderTxHash

Kaia's fee delegation feature allows a third party to pay transaction fees.  This requires two signatures – one from the sender and one from the fee payer. The `SenderTxHash` is crucial for tracking fee-delegated transactions. It's a hash of the transaction _without_ the fee payer's information, allowing the sender to track the transaction before the fee payer signs it.  The sender can use the `SenderTxHash` to retrieve the complete transaction via the [kaia_getTransactionBySenderTxHash](../../references/json-rpc/kaia/get-transaction-by-sender-tx-hash) RPC method.

## Transaction Types

While typical Blockchain platforms provide a single transaction type, Klaytn provides multiple transaction types that empower transactions with new capabilities and optimizations for memory footprint and performance. The following table provides an overview of the transaction types available on Kaia:

|                        | ベーシック                                                                   | 手数料の委任                                                                                                   | 料金の一部委任                                                                                                                            |
| :--------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| Legacy                 | [TxTypeLegacyTransaction](./basic.md#txtypelegacytransaction)           | N/A                                                                                                      | N/A                                                                                                                                |
| ValueTransfer          | [TxTypeValueTransfer](./basic.md#txtypevaluetransfer)                   | [TxTypeFeeDelegatedValueTransfer](./fee-delegation.md#txtypefeedelegatedvaluetransfer)                   | [TxTypeFeeDelegatedValueTransferWithRatio](./partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [TxTypeValueTransferMemo](./basic.md#txtypevaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemo](./fee-delegation.md#txtypefeedelegatedvaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemoWithRatio](./partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [TxTypeSmartContractDeploy](./basic.md#txtypesmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeploy](./fee-delegation.md#txtypefeedelegatedsmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeployWithRatio](./partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [TxTypeSmartContractExecution](./basic.md#txtypesmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecution](./fee-delegation.md#txtypefeedelegatedsmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecutionWithRatio](./partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [TxTypeAccountUpdate](./basic.md#txtypeaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdate](./fee-delegation.md#txtypefeedelegatedaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdateWithRatio](./partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio)                   |
| Cancel                 | [TxTypeCancel](./basic.md#txtypecancel)                                 | [TxTypeFeeDelegatedCancel](./fee-delegation.md#txtypefeedelegatedcancel)                                 | [TxTypeFeeDelegatedCancelWithRatio](./partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [TxTypeChainDataAnchoring](./basic.md#txtypechaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoring](./fee-delegation.md#txtypefeedelegatedchaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoringWithRatio](./partial-fee-delegation.md#txtypefeedelegatedchaindataanchoringwithratio)         |

## Implementation Details

- **RLP Encoding:** Transactions are serialized using Recursive Length Prefix (RLP) encoding before submission.
- **Signatures:**  Transactions are signed using [Specify signature algorithm, e.g., ECDSA] to ensure authenticity.
- **Examples and RPC Outputs:**  This section will provide practical examples and expected RPC outputs for each transaction type.  (Note:  `TxTypeValueTransfer` sends KAIA without any additional data, while `TxTypeValueTransferMemo` allows for including a short memo field along with the transfer.)

By understanding these components and implementation details, developers can effectively build applications on the Kaia network.
