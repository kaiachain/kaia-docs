# トランザクションの実装

本ガイドは、Kaiaネットワーク上でのトランザクション実装の包括的な概要を提供し、様々なトランザクションタイプ、エンコーディング、署名、ネットワークインタラクションをカバーする。

## カイア トランザクション コンポーネント

カイアの取引には一般的に以下の要素が含まれる：

| コンポーネント       | 説明                                                                                                                                                                                                                                     |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| から            | 送信者のアドレス。  送信者の住所。  キー・ペアとアドレスの分離のため、ほとんどのKaiaトランザクション・タイプに必要である。                                                                                                                                                                      |
| へ\`。          | 送金された金額を受け取る口座アドレス。                                                                                                                                                                                                                    |
| 値             | 譲渡される`kei`のKAIAの量。                                                                                                                                                                                                                     |
| 入力\\`        | トランザクションの実行に使用される、トランザクションに添付されたデータ。                                                                                                                                                                                                   |
| `v`, `r`, `s` | 受信者が送信者のアドレスを取得するために送信者が生成した暗号署名。                                                                                                                                                                                                      |
| 一度たりとも        | 送信者のトランザクションを一意に識別するために使用される値。 送信者のトランザクションを一意に識別するために使用される値。 同じnonceを持つ2つのトランザクションが送信者によって生成された場合、1つだけが実行される。                                                                                                                         |
| ガス            | トランザクションが使用できる取引手数料の上限額。                                                                                                                                                                                                               |
| ガス料金          | 送信者がトークンで支払う金額を得るための乗数。 送信者が支払うトークンの金額は`gas` \* `gasPrice`.によって計算される。 例えば、gasが10でgasPriceが10^18の場合、送信者は取引手数料として10KAIAを支払う。 KAIAのユニットについては[こちら](../../learn/token-economics/kaia-native-token.md#units-of-kaia)を参照されたい。 |

## 署名検証

Kaiaはキー・ペアをアドレスから切り離すため、署名の検証は一般的なブロックチェーンとは異なる。  `from`フィールドは送信者を特定するために非常に重要である。  `from`アドレスに関連付けられた[AccountKey](../../learn/accounts.md#account-key)は、署名の検証に使用される。

## 手数料の委任とSenderTxHash

カイアの手数料委任機能は、第三者が取引手数料を支払うことを可能にする。  これには2つの署名が必要である。1つは差出人の署名、もう1つは手数料支払者の署名である。 `SenderTxHash`は、料金委譲されたトランザクションを追跡するために重要である。 これは、手数料支払者の情報を含まない\*トランザクションのハッシュであり、手数料支払者が署名する前に送信者がトランザクションを追跡することを可能にする。  送信者は `SenderTxHash` を使用して、[kaia_getTransactionBySenderTxHash](../../references/json-rpc/kaia/get-transaction-by-sender-tx-hash) RPC メソッドでトランザクション全体を取得することができる。

## トランザクションの種類

一般的なブロックチェーンプラットフォームが単一のトランザクションタイプを提供するのに対し、Kaiaは複数のトランザクションタイプを提供し、新しい機能とメモリフットプリントとパフォーマンスの最適化によってトランザクションを強化します。 次の表は、カイアで利用可能な取引タイプの概要を示しています：

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

## 実施内容

- **RLPエンコーディング:** トランザクションは、提出前にRLP（Recursive Length Prefix）エンコーディングを使用してシリアライズされます。
- **署名：** トランザクションは、真正性を保証するために、[署名アルゴリズムを指定、例：ECDSA] を使用して署名されます。
- **例とRPC出力：** このセクションでは、各トランザクション・タイプについて、実用的な例と予想されるRPC出力を提供する。  **例とRPC出力：** このセクションでは、各トランザクション・タイプについて、実用的な例と予想されるRPC出力を提供する。  (注意: `TxTypeValueTransfer` は追加データなしでKAIAを送信するが、 `TxTypeValueTransferMemo` は転送と一緒に短いメモフィールドを含めることができる)。

これらのコンポーネントと実装の詳細を理解することで、開発者はKaiaネットワーク上で効果的にアプリケーションを構築することができる。
