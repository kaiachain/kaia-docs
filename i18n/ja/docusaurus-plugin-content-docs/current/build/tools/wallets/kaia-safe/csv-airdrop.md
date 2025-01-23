# CSVエアドロップを使用する

これはKaia Safeのカスタムアプリで、ERC20、ERC721、ERC1155、ネイティブトークンの複数の送金を一括して1つのトランザクションにすることができます。 CSV転送ファイルを1つアップロード／コピー＆ペーストし、送信ボタンを押すだけという簡単さです。 CSV転送ファイルを1つアップロード／コピー＆ペーストし、送信ボタンを押すだけという簡単さです。

この方法一つで、署名やトランザクションが少なくて済むため、ガス⛽と相当な時間⌚を節約できる。

それでは、CSV Airdropを使った例を見てみよう！

## ステップ1: [カイアセーフ](https://safe.kaia.io/)にログインします。 <a id="login-kaiasafe"></a>

セーフのアカウントをまだ作成していない場合は、[セーフの作成ガイド](./use-kaia-safe.md#create-a-safe)および[資産の追加ガイド](./use-kaia-safe.md#add-assets)を参照して、アカウントを設定し、資産 (KAIA、FT、NFT) を追加してください。

## ステップ2：アプリをクリックし、CSVを検索し、CSV Airdropを選択します。 <a id="search-CSV-airdrop"></a>

![](/img/build/tools/kaia-safe/search-csv-app.png)

## ステップ3：転送用CSVファイルの準備<a id="prepare-CSV-airdrop"></a>

転送ファイルは、以下の必須カラムを含むCSV形式であることが期待される：

- _token_type_：転送されるトークンのタイプ。 erc20、nft、ネイティブのいずれか。 NFT トークンは ERC721 または ERC1155 のいずれかとなります。
- _token_address_：転送する ERC20 トークンのイーサリアムアドレス。 ネイティブ(ETH)送金の場合、これは空白のままにしておかなければならない。 ネイティブ(ETH)送金の場合、これは空白のままにしておかなければならない。
- _receiver_：送金先のイーサリアムアドレス。
- _amount_：転送するトークンの量。 erk721転送の場合は空白のままでよい。
- _id_：転送する収集可能トークン (erc721 または erc1155) の ID。 ネイティブおよびerk20の移籍では空白のままでよい。

:::important
CSVファイルは、", "をセパレーターとして使用し、ヘッダー行は常に最初の行として提供され、記述されたカラム名を含まなければならない。
[サンプル転送ファイル](https://ipfs.io/ipfs/bafybeiesr6b3cm76ofcm2joukgdtuyva3niftmbpbb4sgxsa3qwsenv3lu/sample.csv)
[サンプル転送ファイル](https://ipfs.io/ipfs/bafybeiesr6b3cm76ofcm2joukgdtuyva3niftmbpbb4sgxsa3qwsenv3lu/sample.csv)
:::

### ネイティブ・トークン・トランスファー<a id="native-token-trnasfers"></a>

ネイティブ・トークンはトークン・アドレスを持たないため、ネイティブ転送では _token_address_ 列を空白にする必要があります。

![](/img/build/tools/kaia-safe/native-csv-app.png)

:::note
kaiaセーフウォレットのアドレスに十分なネイティブトークンがあることを確認してください。
:::

### ERC-20 移籍<a id="erc20-trnasfers"></a>

erc20 の転送には _token_type_ として erc20 を指定し、その他のフィールドもそれに合わせて指定する。

![](/img/build/tools/kaia-safe/erc20-csv-app.png)

:::note
kaia セーフウォレットのアドレスに十分な erc20 トークンがあることを確認してください。
:::

### ERC-721 移籍<a id="erc721-transfers"></a>

erc721 転送のために _token_type_ として erc721 を提供し、それに応じて他の各フィールドも提供する。

![](/img/build/tools/kaia-safe/erc721-csv-app.png)

:::note
kaia セーフウォレットのアドレスに十分な erc721 トークンがあることを確認してください。
:::

### イラスト<a id="illustration"></a>

この例では、2つのネイティブ転送、2つのERC20転送、1つのERC721転送がある。

![](/img/build/tools/kaia-safe/rs-csv-app.png)

## ステップ 4: 取引の確認と提出<a id="review-submit-transaction"></a>

取引内容を確認することができます。 取引内容を確認することができます。 準備ができたら、Submit をクリックして、他の Safe トランザクションと同様にトランザクションを実行します。
