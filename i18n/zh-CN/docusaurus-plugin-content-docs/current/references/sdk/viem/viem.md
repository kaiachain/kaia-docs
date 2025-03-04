# viem

![](/img/references/kaiaXviem.png)

[Viem](https://viem.sh/)是以太坊的类型码接口，提供与以太坊和其他 EVM 兼容区块链交互的底层基元。 由于 kaia 支持[Ethereum Equivalence](https://medium.com/klaytn/using-ethereum-tools-in-klaytn-dc068d48de04)功能，因此 viem 等以太坊工具无需进行任何重大修改即可在 kaia 上使用。

因此，开发人员可以利用这种兼容性，使用 viem 库与 kaia 节点进行交互。

在本指南中，您将学习如何使用 viem 库从区块链读取数据、发送交易以及与 kaia 网络上的现有合约交互。

## 要求

- 代码编辑器：源代码编辑器，如 [VS Code](https://code.visualstudio.com/download)。
- [Metamask](.../.../.../build/tutorials/connecting-metamask.mdx#install-metamask)：用于部署合约、签署事务和与合约交互。
- RPC 端点：可从受支持的 [Endpoint Providers](../../public-en.md) 中获取。
- 从 [水龙头](https://faucet.kaia.io)测试 KAIA：为您的账户注入足够的 KAIA。
- [NodeJS和NPM](https://nodejs.org/en/)
- [TS-node](https://www.npmjs.com/package/ts-node)：用于运行 TypeScript 脚本。

## 设置项目

开始时，您需要创建一个项目目录来存放本指南中要创建的文件。

```bash
mkdir viem-example
cd viem-example
```

### 1. 安装 viem

要安装 viem，请在终端运行以下命令：

```bash
npm i viem
```

在本教程中，我们将创建一系列脚本文件，用于从区块链读取数据、发送交易以及与现有智能合约交互。 要开始使用，您需要知道如何为每个脚本文件设置 viem。

### 2. 设置公共客户端和传输

首先，您需要用所需的 [Transport](https://viem.sh/docs/clients/intro) 和 [Chain](https://viem.sh/docs/chains/introduction) 设置公共 [客户端](https://viem.sh/docs/clients/intro)。 公共客户端是**公共**[JSON-RPC API](https://docs.kaia.io/references/public-en/) 方法的接口，例如通过[公共操作](https://viem.sh/docs/actions/public/introduction)检索区块编号、交易、读取智能合约等。

```ts
import { createPublicClient, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http("https://public-en-kairos.node.kaia.io"), 
}) 

```

### 3. 设置钱包客户端和账户

其次，您需要设置一个钱包客户端与账户进行交互。 使用钱包客户端，您可以通过[钱包操作](https://viem.sh/docs/actions/wallet/introduction)执行检索账户、执行交易、签署信息等操作。

```ts
import { createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
 
const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http("https://public-en-kairos.node.kaia.io")
})
 
const account = privateKeyToAccount("PASTE PRIVATE KEY HERE");
```

## 从区块链读取数据

要从区块链中读取数据，请运行以下命令在项目文件夹中创建一个新的 `read.ts` 文件：

```bash
touch read.ts
```

创建该文件后，按照上文**设置部分**的步骤设置公共客户端。 在本节中，您将学习如何从区块链中读取数据（如 blockNumber、KAIA 余额）。

要查看实际效果，请在您的 `read.ts` 中粘贴以下代码。

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

**输出**

要运行脚本并从区块链中读取数据，请在终端中粘贴以下命令：

```
npx ts-node read.ts
```

如果交易成功，您将在终端上看到区块编号和用户的 KAIA 余额。

![](/img/references/viem-read.png)

## 向区块链发送交易

要向区块链发送交易，请运行此命令在项目文件夹中创建一个新的 `send.ts` 文件：

```bash
touch send.ts 
```

创建该文件后，按照上文**设置部分**的步骤设置钱包客户端。 在本节中，您将学习如何向区块链发送交易（例如，向某个地址发送 KAIA）。

要查看实际效果，请在您的 `send.ts` 中粘贴以下代码。

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

**输出**

要运行脚本并向区块链发送交易，请在终端中粘贴以下命令：

```
npx ts-node send.ts
```

如果交易成功，你会在终端中看到交易哈希值记录。

![](/img/references/viem-send.png)

## 与智能合约互动

要与 kaia 上现有的智能合约交互，请运行此命令在项目文件夹中创建一个新的 `interact.ts` 文件：

```bash
touch interact.ts
```

创建该文件后，按照上文**设置部分**的步骤设置公共客户端和钱包客户端。 在本节中，您将同时使用 viem 和 viem：

- 从合约中读取；以及
- 写入合约。

为编写本指南，我们在 [Remix IDE](https://remix.ethereum.org/) 上编译并部署了 simple_storage 合约。 因此，我们将通过调用 `retrieve` 函数从该合约中读取内容，并通过调用 `store` 函数向该合约发送事务。

### 1. 从合约中读取

为了读取合约，我们使用了 [readContract](https://viem.sh/docs/contract/readContract#readcontract) 方法，该方法在内部使用 [Public Client](https://viem.sh/docs/clients/public) 调用带有 [ABI 编码数据](https://viem.sh/docs/contract/encodeFunctionData) 的 [call action](https://viem.sh/docs/actions/public/call)。 要查看实际效果，请在您的 `interact.js` 中粘贴以下代码。

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

### 2. 写入合约

为了写入合约，我们使用了 [writeContract](https://viem.sh/docs/contract/writeContract#writecontract) 方法，该方法内部使用 [Wallet Client](https://viem.sh/docs/clients/wallet) 来调用带有 [ABI 编码数据](https://viem.sh/docs/contract/encodeFunctionData) 的 [sendTransaction action](https://viem.sh/docs/actions/wallet/sendTransaction)。 要查看实际效果，请在您的 `interact.js` 中粘贴以下代码。

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

**输出**

要运行脚本并与智能合约交互，请在终端中粘贴以下命令：

```bash
npx ts-node interact.ts
```

如果交易成功，你将看到交易哈希值和存储在终端中的值。

![](/img/references/viem-interact.png)

有关 viem 的更深入指南，请参阅 [viem docs](https://viem.sh/docs/getting-started)。 此外，您还可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/sdk-and-libraries-for-interacting-with-klaytn-node/viem) 上找到本指南的完整实现代码。



