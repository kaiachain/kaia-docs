---
title: CSVエアドロップを使用する
sidebar_label: CSVエアドロップ
---

# CSVエアドロップを使用する

:::caution 日没に関するお知らせ

`safe.kaia.io` は **2026年8月9日** にサービス終了となります。 今後は、[app.safe.global](https://app.safe.global) の「Safe Wallet for Kaia Network」をご利用いただき、アカウントの管理を行ってください。 現在お持ちの「Safe Accounts」は、「Safe Wallet」と自動的に互換性が確保されます。

:::

**CSVエアドロップ**（「Safe Apps」に掲載されている場合）は、ERC-20、ERC-721、ERC-1155、およびネイティブトークンの複数の送金を、1つのSafeトランザクションにまとめて処理します。 送金情報をCSVファイルとしてアップロードまたは貼り付け、一度送信するだけで済みます。個別に送金するよりも、署名の回数が減り、ガス代も安くなります。

Safeアプリの提供状況は、Kaia／Kairos向けのSafe Wallet Appsカタログによって異なります。 ご利用のネットワークに「CSV Airdrop」が表示されていない場合は、[トランザクションビルダー](./tx-builder.md)をご利用いただくか、[ヘルプセンター](https://help.safe.global)をご確認ください。

## ステップ 1：Safe Wallet で「Safe」を開く<a id="login-kaiasafe"></a>

[app.safe.global](https://app.safe.global) にログインし、お使いの Kaia または Kairos Safe を選択してください。 まだアカウントをお持ちでない場合は、[セーフの作成](./use-kaia-safe.md#create-a-safe) および [資産の追加](./use-kaia-safe.md#add-assets) の手順に従ってください。

## ステップ 2: CSV Airdrop を開く<a id="search-CSV-airdrop"></a>

\*\*「アプリ」**に移動し、**「CSV」**を検索して、お使いのネットワークで利用可能な場合は**「CSV Airdrop」\*\*を開いてください。

## ステップ3：転送用CSVファイルの準備<a id="prepare-CSV-airdrop"></a>

転送ファイルはCSV形式で、以下のような列を含むことが求められます：

- _token_type_: `erc20`、`nft`、または `native`。 NFTトークンは、ERC-721またはERC-1155のいずれかです。
- _token_address_: トークン契約のアドレス。 ネイティブ（KAIA）転送の場合は、空欄のままにしてください。
- _受信者_：受信先のアドレス。
- _金額_：送金する金額。 ERC-721の転送では、空欄にしても構いません。
- _id_: コレクタブルID（ERC-721 または ERC-1155）。 ネイティブおよびERC-20の送金については、空欄でも構いません。

:::important
区切り文字として `,` を使用してください。 ヘッダー行は最初の行でなければならず、記載された列名を含んでいる必要があります。
[転送ファイルのサンプル](https://ipfs.io/ipfs/bafybeiesr6b3cm76ofcm2joukgdtuyva3niftmbpbb4sgxsa3qwsenv3lu/sample.csv)
:::

### ネイティブトークンの送金<a id="native-token-trnasfers"></a>

ネイティブ転送の場合は、_token_address_ を空欄のままにしてください。 セーフに十分な量のKAIAが入っていることを確認してください。

### ERC-20の送金<a id="erc20-trnasfers"></a>

_token_type_ を `erc20` に設定し、その他の項目を入力してください。 セーフにそのトークンが十分に保管されていることを確認してください。

### ERC-721の転送<a id="erc721-transfers"></a>

NFTの転送を行う際は、_token_type_ を設定し、アプリの要件に従ってコレクティブルの _id_ を指定してください。 「The Safe」がそれらのNFTを所有していることを確認してください。

## ステップ4：確認して送信する<a id="review-submit-transaction"></a>

アプリ内でデコードされた転送内容を確認してから、送信してください。 他の「Safe」取引と同様に、「Safe」の確認を完了してください。
