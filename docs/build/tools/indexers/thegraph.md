---
sidebar_label: The Graph
---

# The Graph 

Getting historical data on a smart contract can be frustrating when building a dapp. [The Graph](https://thegraph.com/) provides an easy way to query smart contract data through APIs known as subgraphs. The Graph’s infrastructure relies on a decentralized network of indexers, enabling your dapp to become truly decentralized.

Both Kaia Mainnet & Testnet are supported by The Graph. 

## Quick Start

These subgraphs only take a few minutes to set up. To get started, follow these three steps:

1. Initialize your subgraph project
2. Deploy & Publish
3. Query from your dapp

Pricing:
 - The rate-limited test endpoints in Studio are free.
 - API calls for the decentralized network are pay-per-use at $4 per 100K queries. The first 100K queries are free!

Here’s a step by step walk through:

## 1. Initialize your subgraph project

### Create a subgraph on Subgraph Studio⁠

Go to the [Subgraph Studio](https://thegraph.com/studio/) and connect your wallet. Once your wallet is connected, you can begin by clicking “Create a Subgraph”. When choosing a name, it is recommended to use Title Case: “Subgraph Name Chain Name.”

![Create a Subgraph](/img/build/tools/graph/01-create-subgraph.png)


You will then land on your subgraph’s page. All the CLI commands you need will be visible on the right side of the page:

![CLI commands](/img/build/tools/graph/02-cli-commands.webp)


### Install the Graph CLI⁠

On your local machine run the following:
```
npm install -g @graphprotocol/graph-cli
```

### Initialize your Subgraph⁠

You can copy this directly from your subgraph page to include your specific subgraph slug:
```
graph init --studio <SUBGRAPH_SLUG>
```
You’ll be prompted to provide some info on your subgraph like this:

![CLI sample](/img/build/tools/graph/03-cli-sample.webp)


After entering the contract info, the graph-cli will attempt to fetch ABI, StartBLock & Contract name from the blockexplorer API. 

However, KaiaScan's API is not ready yet, so when asked to retry, just say "no". Here's how to obtain these manually:

1. ABI: You need to prepare a json file containing the ABI in the same directory where you're running `graph init`. From the [contract's page on Kaiascan](https://kaiascan.io/address/0x5096db80b21ef45230c9e423c373f1fc9c0198dd), go to the `Contract` tab, click `View Code` and you'll be able to copy the ABI. Save it as a json file in the same folder where you're running  `graph init`. In this screenshot above, it was saved as `abi.json`. 
![Finding ABI](/img/build/tools/graph/04-kaiascan-abi.webp)

2. Start Block: Click into the transaction hash where the contract was created. There you'll find the block where the contract was created. 
![contract creation](/img/build/tools/graph/05-contract-creation.webp)

3. Contract Name: Just type in the name of the contract. If this is the only contract you're indexing in this subgraph, it's OK to just go with the default `Contract`. 

## 2. Deploy & Publish

### Deploy to Subgraph Studio⁠

First run these commands:

```bash
$ graph codegen
$ graph build
```

Then run these to authenticate and deploy your subgraph. You can copy these commands directly from your subgraph’s page in Studio to include your specific deploy key and subgraph slug:

```bash
$ graph auth --studio <DEPLOY_KEY>
$ graph deploy --studio <SUBGRAPH_SLUG>
```

You will be asked for a version label. You can enter something like v0.0.1, but you’re free to choose the format.

### Test your subgraph⁠

You can test your subgraph by making a sample query in the playground section. The Details tab will show you an API endpoint. You can use that endpoint to test from your dapp.

![Playground](/img/build/tools/graph/06-playground.png)


### Publish Your Subgraph to The Graph’s Decentralized Network

Once your subgraph is ready to be put into production, you can publish it to the decentralized network. On your subgraph’s page in Subgraph Studio, click on the Publish button:

![publish button](/img/build/tools/graph/07-studio-publish-subgraph.webp)

> **Note:** 
> - Kaia shows as "partially supported" for now because a final on-chain voting process to unlock rewards for indexers has not been completed yet. For now, Edge & Node's Indexer (Upgrade Indexer) will be the only indexer supporting all Kaia subgraphs. 
> - The Graph's smart contracts are all on Arbitrum One, even though your subgraph is indexing data from Kaia, Ethereum or any other [supported chain](https://thegraph.com/docs/en/developing/supported-networks/). 

## 3. Query your Subgraph

Congratulations! You can now query your subgraph on the decentralized network!

For any subgraph on the decentralized network, you can start querying it by passing a GraphQL query into the subgraph’s query URL which can be found at the top of its Explorer page.

Here’s an example from the [CryptoPunks Ethereum subgraph](https://thegraph.com/explorer/subgraphs/HdVdERFUe8h61vm2fDyycHgxjsde5PbB832NHgJfZNqK) by Messari:

![Query URL](/img/build/tools/graph/08-query-url.png)


The query URL for this subgraph is:

`https://gateway-arbitrum.network.thegraph.com/api/`**[api-key]**`/subgraphs/id/HdVdERFUe8h61vm2fDyycgxjsde5PbB832NHgJfZNqK`

Now, you simply need to  fill in your own API Key to start sending GraphQL queries to this endpoint.

### Getting your own API Key

![API keys](/img/build/tools/graph/09-apikeys.png)


In Subgraph Studio, you’ll see the “API Keys” menu at the top of the page. Here you can create API Keys.

## Appendix

### Sample Query

This query shows the most expensive CryptoPunks sold.

```graphql
{
  trades(orderBy: priceETH, orderDirection: desc) {
    priceETH
    tokenId
  }
}

```

Passing this into the query URL returns this result:

```
{
  "data": {
    "trades": [
      {
        "priceETH": "124457.067524886018255505",
        "tokenId": "9998"
      },
      {
        "priceETH": "8000",
        "tokenId": "5822"
      },
//      ...
```

<aside>
💡 Trivia: Looking at the top sales on [CryptoPunks website](https://cryptopunks.app/cryptopunks/topsales) it looks like the top sale is Punk #5822, not #9998. Why? Because they censor the flash-loan sale that happened.

</aside>

### Sample code

```jsx
const axios = require('axios');

const graphqlQuery = `{
  trades(orderBy: priceETH, orderDirection: desc) {
    priceETH
    tokenId
  }
}`;
const queryUrl = 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/HdVdERFUe8h61vm2fDyycHgxjsde5PbB832NHgJfZNqK'

const graphQLRequest = {
  method: 'post',
  url: queryUrl,
  data: {
    query: graphqlQuery,
  },
};

// Send the GraphQL query
axios(graphQLRequest)
  .then((response) => {
    // Handle the response here
    const data = response.data.data
    console.log(data)

  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
```

### Additional resources:

- To explore all the ways you can optimize & customize your subgraph for a better performance, read more about [creating a subgraph here](https://thegraph.com/docs/en/developing/creating-a-subgraph/).
- For more information about querying data from your subgraph, read more [here](https://thegraph.com/docs/en/querying/querying-the-graph/).