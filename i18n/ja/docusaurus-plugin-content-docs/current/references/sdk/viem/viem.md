# ヴィエム

![](/img/references/kaiaXviem.png)

[Viem](https://viem.sh/) はイーサリアム用のタイプスクリプト・インターフェースで、イーサリアムや他のEVM互換ブロックチェーンとやり取りするための低レベルのプリミティブを提供する。 kaiaは[Ethereum Equivalence](https://medium.com/klaytn/using-ethereum-tools-in-klaytn-dc068d48de04)の機能をサポートしているため、viemのようなEthereumツールはkaia上で大きな変更を加えることなく使用することができる。

そのため、開発者はこの互換性を活用し、viemライブラリを使ってkaiaノードとやりとりすることができる。

このガイドでは、viemライブラリを使用してブロックチェーンからデータを読み取り、トランザクションを送信し、kaia Network上の既存のコントラクトとやり取りする方法を学びます。

## 前提条件

- コードエディタ：[VS Code](https://code.visualstudio.com/download)などのソースコードエディタ。
- [メタマスク](../../../build/tutorials/connecting-metamask.mdx#install-metamask)：コントラクトのデプロイ、トランザクションへの署名、コントラクトとの対話に使用される。
- RPC Endpoint: you can get this from one of the supported [Endpoint Providers](../../public-en.md).
- [Faucet](https://faucet.kaia.io)からKAIAをテスト: 口座に十分なKAIAを入金してください。
- [NodeJSとNPM](https://nodejs.org/en/)
- [TS-node](https://www.npmjs.com/package/ts-node): TypeScriptスクリプトの実行に使用される。

## セットアップ・プロジェクト

始めるには、このガイドで作成するファイルを格納するプロジェクト・ディレクトリを作成する必要がある。

```bash
mkdir viem-example
cd viem-example
```

### 1. viemをインストールする

viemをインストールするには、ターミナルで以下のコマンドを実行する：

```bash
npm i viem
```

このチュートリアルでは、ブロックチェーンからデータを読み取り、トランザクションを送信し、また既存のスマート・コントラクトとやり取りするためのスクリプト・ファイルを大量に作成する。 始めるには、スクリプト・ファイルごとにviemを設定する方法を知っておく必要がある。

### 2. パブリッククライアントとトランスポートの設定

まず、Public [Client](https://viem.sh/docs/clients/intro)に、希望する [Transport](https://viem.sh/docs/clients/intro)と [Chain](https://viem.sh/docs/chains/introduction)を設定する必要があります。 パブリッククライアントとは、[パブリックアクション](https://viem.sh/docs/actions/public/introduction)を通じて、ブロック番号やトランザクションの取得、スマートコントラクトからの読み取りなど、**パブリック** [JSON-RPC API](https://docs.kaia.io/references/public-en/)メソッドへのインターフェイスである。

```ts
import { createPublicClient, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http("https://public-en-kairos.node.kaia.io"), 
}) 

```

### 3. ウォレットクライアントとアカウントの設定

次に、アカウントとやり取りするためにウォレットクライアントを設定する必要があります。 ウォレットクライアントでは、[Wallet Actions](https://viem.sh/docs/actions/wallet/introduction)を通じて、アカウントの取得、トランザクションの実行、メッセージの署名などのアクションを実行できます。

```ts
import { createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
 
const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http("https://public-en-kairos.node.kaia.io")
})
 
const account = privateKeyToAccount("PASTE PRIVATE KEY HERE");
```

## ブロックチェーンからデータを読み取る

ブロックチェーンからデータを読み取るには、プロジェクトフォルダー内に新しい read.ts ファイルを作成します。このコマンドを実行してください：

```bash
touch read.ts
```

このファイルを作成したら、上記の**セットアップセクション**で行ったように、パブリッククライアントをセットアップします。 このセクションでは、ブロックチェーンからデータを読み取る方法（例：blockNumber、KAIAの残高）を学びます。

これを実行するには、以下のコードを read.ts に貼り付けてください。

```ts
import { createPublicClient, http, formatEther } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http("https://public-en-kairos.node.kaia.io"), 
}) 


async function getBlockNumber() {
    const blockNumber = await client.getBlockNumber() 
    console.log(`Current block number is: ${blockNumber}`);
}

async function getKlayBalance() {
  const balance = await client.getBalance({ 
    address: '0x75Bc50a5664657c869Edc0E058d192EeEfD570eb',
  })
  const formatBal = formatEther(balance);
  console.log(`Current KAIA balance is ${formatBal}`);  
}


getBlockNumber();
getKlayBalance();
```

**出力**

スクリプトを実行し、ブロックチェーンからデータを読み取るには、ターミナルに以下のコマンドを貼り付ける：

```
npx ts-node read.ts
```

取引が成功すると、ブロック番号とユーザーのKAIA残高が端末に表示されます。

![](/img/references/viem-read.png)

## ブロックチェーンにトランザクションを送信する

ブロックチェーンにトランザクションを送信するには、プロジェクトフォルダー内に新しい send.ts ファイルを作成します。このコマンドを実行してください：

```bash
touch send.ts 
```

このファイルを作成した後、上記の**セットアップセクション**で行ったようにウォレットクライアントをセットアップします。 このセクションでは、ブロックチェーンにトランザクションを送信する方法（例えば、KAIAをアドレスに送信する）を学びます。

これを実際に見るには、`send.ts`に以下のコードを貼り付ける。

```ts
import { createWalletClient, http, parseEther } from 'viem'
import { klaytnBaobab } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http("https://public-en-kairos.node.kaia.io")
})
 
const account = privateKeyToAccount("PASTE PRIVATE KEY");


async function sendKlayToRecipient() {
  const hash = await walletClient.sendTransaction({ 
    account,
    to: "PASTE RECIPIENT ADDRESS",
    value: parseEther('0.01')
  })

  console.log(`Send KAIA tx hash is: ${hash}`);
}

sendKlayToRecipient();

```

**出力**

スクリプトを実行してブロックチェーンにトランザクションを送信するには、ターミナルに以下のコマンドを貼り付ける：

```
npx ts-node send.ts
```

トランザクションが成功した場合、トランザクションのハッシュがターミナルに記録されます。

![](/img/references/viem-send.png)

## スマートコントラクトとの対話

kaia上の既存のスマートコントラクトと対話するには、以下のコマンドを実行して、プロジェクトフォルダに新しい`interact.ts`ファイルを作成する：

```bash
touch interact.ts
```

このファイルを作成した後、上記の**セットアップセクション**で行ったように、パブリッククライアントとウォレットクライアントをセットアップします。 このセクションでは、viemを両方のために使用します：

- 契約書を読む。
- 契約書を書く。

このガイドのために、simple_storageコントラクトをコンパイルし、[Remix IDE](https://remix.ethereum.org/)上にデプロイした。 そのため、 `retrieve`関数を呼び出してこのコントラクトから読み取りを行い、`store`関数を呼び出してこのコントラクトにトランザクションを送信する。

### 1. 契約書を読む

ABIエンコードされたデータ](https://viem.sh/docs/contract/encodeFunctionData)を使って[コールアクション](https://viem.sh/docs/actions/public/call)を呼び出すために、内部的に[パブリッククライアント](https://viem.sh/docs/clients/public)を使用する[readContract](https://viem.sh/docs/contract/readContract#readcontract)メソッドを使用した。 これを実際に見るには、`interact.js`に以下のコードを貼り付ける。

```ts
import { createPublicClient, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http("https://public-en-kairos.node.kaia.io"), 
}) 


const abi =  [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


async function readFromContract() {
  const retrieve = await client.readContract({
    address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",  // Contract Address
    abi: abi,
    functionName: 'retrieve'
  })

  console.log(`Value read from contract is: ${retrieve}`);
}

```

### 2. 契約書

コントラクトに書き込むには、[writeContract](https://viem.sh/docs/contract/writeContract#writecontract)メソッドを使用しました。このメソッドは内部的に[Wallet Client](https://viem.sh/docs/clients/wallet)を使用し、[sendTransaction アクション](https://viem.sh/docs/actions/wallet/sendTransaction)を[ABIエンコードされたデータ](https://viem.sh/docs/contract/encodeFunctionData)で呼び出します。 これを実際に見るには、`interact.js`に以下のコードを貼り付ける。

```ts
import { createWalletClient, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
 
const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http("https://public-en-kairos.node.kaia.io")
})
 
const account = privateKeyToAccount("PASTE PRIVATE KEY");

const abi =  [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


async function writeToContract() {

  const { request } = await client.simulateContract({
    address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",  // Contract Address
    abi: abi,
    functionName: "store",
    account: account,
    args: [694n],
  })

  const hash = await walletClient.writeContract(request)

  console.log(`Hash from writing to a contract: ${hash}`);
}


writeToContract();
```

**出力**

スクリプトを実行してスマート・コントラクトとやり取りするには、ターミナルに以下のコマンドを貼り付ける：

```bash
npx ts-node interact.ts
```

トランザクションが成功した場合、トランザクションハッシュとターミナルに保存された値が表示されます。

![](/img/references/viem-interact.png)

viemに関するより詳細なガイドについては、[viem docs](https://viem.sh/docs/getting-started)を参照してください。 また、このガイドのコードの完全な実装は[GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/sdk-and-libraries-for-interacting-with-klaytn-node/viem)にあります。
