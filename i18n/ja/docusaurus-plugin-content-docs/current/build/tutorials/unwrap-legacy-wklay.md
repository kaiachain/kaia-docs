---
title: 従来のWKLAYをKAIAに移行する
sidebar_label: レガシー版WKLAYのパッケージを解凍する
description: Kaiascan を使用して、レガシーの WKLAY ラッパー契約から KAIA を回収し、正規の WKAIA をアンラップします。
---

# 従来のWKLAYをKAIAに変換する

Kaiaメインネット上の公式かつ標準的なWKAIA（旧WKLAY）コントラクトは [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432) であり、 これはKaiaエコシステム全体で確立された標準となっています。背景については、[Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md)を参照してください。

初期のトークンラッパーを使用していた古いDAppやマーケットプレイスを利用したことがある場合、**旧WKLAYコントラクト**に残高が残っている可能性があります [`0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2)に、まだ残高が残っている可能性があります。そのコントラクトを自動的に展開してくれるDappフロントエンドは存在しないため、ブロックエクスプローラーから直接呼び出す必要があります。

このガイドでは、[Kaiascan](https://kaiascan.io) でのその手順について解説します。

:::info どの契約をお持ちですか？

これら2つの契約は、互いに関連のない展開です。作業を始める前に、ウォレットまたは残高が反映された取引でトークン契約のアドレスを確認してください。以下の手順では、旧契約からの資金のみを回復することができます。標準的なWKAIAを展開するには、[標準的なWKAIAの展開](#unwrap-canonical-wkaia)を参照してください。

:::

## 手順 1：レガシー契約を開く

Kaiascanのレガシー契約のページへ移動してください：

[`https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2)

![Kaiascan上の旧WKLAY契約ページ](/img/build/tutorials/unwrap-legacy-wklay/01-legacy-contract-page.png)

## ステップ2：正確な残高を確認する

1. \*\*「契約」**タブを選択し、**「契約内容を確認」\*\*をクリックしてください。
2. `balanceOf(address)` 関数を展開し、ご自身のウォレットアドレスを入力してください。
3. **「照会」**（または\*\*「再照会」\*\*）をクリックして、残高を確認してください。
4. 返された値を、表示されているとおりに正確にコピーしてください。

![「Read Contract」タブでの balanceOf の読み取り](/img/build/tutorials/unwrap-legacy-wklay/02-read-contract-balanceof.png)

:::caution 生データをコピーし、変換は行わないでください

`balanceOf` は、KAIA ではなく、最小単位である **kei** 単位での残高を返します。 1 KAIA は<sup>1018</sup>ケイに相当するため、`100000000000000000` の残高は 0.1 KAIA となります。

ステップ3では、その同じ生データが期待されます。変更を加えずにそのまま貼り付けてください。端数を切り捨てたり、桁数を削ったり、KAIA形式に変換したりしないでください。そうしないと、誤った金額が引き落とされたり、取引が取り消されたりします。

:::

## ステップ3：トークンを引き出す

1. \*\*「契約の作成」\*\*タブに切り替えます。
2. \*\*「Web3に接続」\*\*をクリックし、残高があるウォレットを接続してください。
3. `withdraw(wad: uint256)` 関数を展開し、手順 2 でコピーした値とまったく同じ値を貼り付けてください。
4. 送信した後、ウォレットで取引を確認してください。

![引き出し機能が表示された「契約の作成」タブ](/img/build/tutorials/unwrap-legacy-wklay/03-write-contract-withdraw.png)

この取引のガス代を支払うには、同じウォレットに少量のKAIAが必要です。

## ステップ4：確認する

取引が確認されたら、ウォレットの残高を確認してください。アンラップされたKAIAは、取引を送信したのと同じアドレスに入金されます。

契約側では、トークンの送金ではなく内部送金としてKAIAを返却するため、Kaiascanの取引画面にある\*\*「内部取引」\*\*タブで送金を確認することができます。[正常に完了したアンラップ取引の例](https://kaiascan.io/tx/0x05117dc2ac21d2373fce1b6afa260ab8f9c1f747f7c9894fa302c67b2c96631d?tabId=internalTx&page=1)を以下に示します。

![Kaiascanでのアンラップ取引の確認](/img/build/tutorials/unwrap-legacy-wklay/04-verify-transaction.png)

## 標準的なWKAIAのパッケージを開封する

もし残高が標準的なWKAIA契約 [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432) にある場合は、2つの選択肢があります。

**dappをご利用ください（推奨）。** Kaiaエコシステムのスワップサービスでは、ワンクリックで標準のWKAIAをアンラップできます。例えば、[DragonSwap](https://dgswap.io/swap/?outputCurrency=KAIA&inputCurrency=0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432)などがあります。

**手動で実行してください。** 上記のKaiascanの手順に従い、レガシー版ではなく、正規のコントラクトのアドレスページを使用してください。

## 関連情報

- [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md) — 標準的なラップ型 KAIA 実装
- [コントラクトアドレス](../../references/contract-addresses.md) — メインネットおよびカイロスにデプロイされたシステムコントラクトのアドレス
