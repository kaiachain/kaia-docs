# Use CSV Airdrop

This is a custom app in Kaia Safe that can be used to batch multiple transfers of ERC20, ERC721, ERC1155 and native tokens into a single transaction. It's as simple as uploading / copy & pasting a single CSV transfer file and hitting the submit button.

This single method saves gas ⛽ and a substantial amount of time ⌚ by requiring less signatures and transactions.

Let’s get started with an example using CSV Airdrop!

## Step 1: Login into your [KaiaSafe](https://safe.kaia.io/)  <a id="login-kaiasafe"></a>

If you haven't created a Safe account yet, please refer to our [Create a Safe Guide](./use-kaia-safe.md#create-a-safe) and [Add Asset Guide](./use-kaia-safe.md#add-assets) to set up your account and add assets (KAIA, FT, NFT).

## Step 2: Click apps, search CSV and select CSV Airdrop  <a id="search-CSV-airdrop"></a>

![](/img/build/tools/kaia-safe/search-csv-app.png)

## Step 3: Prepare a Transfer CSV file <a id="prepare-CSV-airdrop"></a>

Transfer files are expected to be in CSV format with the following required columns:

* *token_type*: The type of token that is being transferred. One of erc20,nft or native. NFT Tokens can be either ERC721 or ERC1155.
* *token_address*: Ethereum address of ERC20 token to be transferred. This has to be left blank for native (ETH) transfers.
* *receiver*: Ethereum address of transfer receiver.
* *amount*: the amount of token to be transferred. This can be left blank for erc721 transfers.
* *id*: The id of the collectible token (erc721 or erc1155) to transfer. This can be left blank for native and erc20 transfers.

:::important
The CSV file has to use "," as a separator and the header row always has to be provided as the first row and include the described column names.
[Sample Transfer File](https://ipfs.io/ipfs/bafybeiesr6b3cm76ofcm2joukgdtuyva3niftmbpbb4sgxsa3qwsenv3lu/sample.csv)
:::


### Native Token Transfers <a id="native-token-trnasfers"></a>

Since native tokens do not have a token address, you must leave the *token_address* column blank for native transfers.

![](/img/build/tools/kaia-safe/native-csv-app.png)

:::note
Make sure you have enough native tokens in the kaia safe wallet address.
:::

### ERC-20 Transfers <a id="erc20-trnasfers"></a>

Provide erc20 as *token_type* for erc20 transfers and other respective fields accordingly.

![](/img/build/tools/kaia-safe/erc20-csv-app.png)

:::note
Make sure you have enough erc20 tokens in the kaia safe wallet address.
:::

### ERC-721 Transfers <a id="erc721-transfers"></a>

Provide erc721 as *token_type* for erc721 transfers and other respective fields accordingly.

![](/img/build/tools/kaia-safe/erc721-csv-app.png)

:::note
Make sure you have enough erc721 tokens in the kaia safe wallet address.
:::

### Illustration <a id="illustration"></a>

For this illustration, we have 2 native transfers, 2 ERC20 transfers and 1 ERC721 transfers

![](/img/build/tools/kaia-safe/rs-csv-app.png)

## Step 4: Review and submit transaction <a id="review-submit-transaction"></a>

You'll be able to review and confirm the transaction. Once ready, click Submit to execute the transaction just like any other Safe transaction.

