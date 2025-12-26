# Kaiabridge

Finschia 用户可以按固定交换率将其在 Finshia 网络上的 FNSA 代币交换为 Kaia 网络上的 KAIA 代币。 这种交换由一套智能合约和程序（统称为 Kaiabridge）进行调解。

您可以在我们的[在线工具包](https://toolkit.kaia.io/kaiaBridge) 中访问和使用 Kaiabridge。

您可以在[GitHub kaiachain/kaia 代码库](https://github.com/kaiachain/kaia/tree/dev/contracts/contracts/system_contracts/kaiabridge) 中找到合同源代码，在[合同地址](https://docs.kaia.io/references/contract-addresses/) 页面中找到部署地址。

# Kaiabridge 用户指南

## 先决条件

### 1. 将您的账户移至 MetaMask 或 Kaia 钱包

#### 使用原始私人密钥

如果您的账户可以导出原始私钥，请复制原始私钥并导入 MetaMask 或 Kaia 钱包。

- [MetaMask](https://support.metamask.io/start/use-an-existing-wallet#import-using-a-private-key)
- [Kaia 钱包](https://www.kaiawallet.io/en_US/faq/?id=25)

#### 带恢复短语

如果账户只能以恢复短语的形式导出，请根据恢复短语计算原始私钥。 您可以使用任何支持 BIP-39 派生路径的工具。 这些工具包括 [ethers.js](https://docs.ethers.org/v6/api/wallet/#HDNodeWallet)、[viem](https://viem.sh/docs/accounts/local/hdKeyToAccount)、[Foundry](https://getfoundry.sh/cast/reference/wallet/)和[BIP39 工具](https://github.com/iancoleman/bip39)。 Finschia 钱包通常使用 "m/44'/438'/0'/0/0 "路径（根据 [SLIP-044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)）作为默认派生路径。 如果您的 Finschia 钱包有多个账户或使用不同的配置，您可能需要使用其他派生路径。

计算出私钥后，请按照上一节[使用原始私钥](#with-raw-private-key) 中的说明进行操作。

:::note[Example 使用 BIP39 工具]

您可以在此网页上计算私钥：[BIP39 - 助记符代码](https://iancoleman.io/bip39/).

为谨慎起见，强烈建议按照页面上的 "离线使用 "说明操作，并在操作过程中阻止互联网连接。

1. 在 "BIP39 助记符 "字段中粘贴恢复短语。
2. 将 "币 "字段设置为 "ETH - 以太坊"。
3. 将 "派生路径 "设为 "BIP32"。
4. 将 "客户端 "设为 "自定义派生路径"。
5. 将 "BIP32 衍生路径 "设为 "m/44'/438'/0'/0"。
6. 在 "派生地址 "中，查找 "路径 "显示为 "m/44'/438'/0'/0/0 "的第一行，你的原始私钥就显示在 "私钥 "字段中。

:::

:::note[Example 使用铸造工具]

1. 安装 [Foundry](https://getfoundry.sh/)。
2. 键入以下命令，在"--助记符 "中输入恢复短语。 原始私钥将被打印出来。
   ```
   cast wallet private-key --mnemonic "test test test test test test test test junk" --mnemonic-derivation-path "m/44'/438'/0'/0/0"
   ```

:::

### 2. 检查您的网络

如果您正在使用 MetaMask，请手动将 Kaia Mainnet 添加到您的网络（如果您还没有这样做）。

- [将 MetaMask 连接到 Kaia](https://docs.kaia.io/build/tutorials/connecting-metamask/)

### 3. 为您的账户加油

您需要汽油来进行交换交易。 详细说明请参阅 [Get KAIA](https://docs.kaia.io/build/get-started/getting-kaia/)。

我们建议您至少准备 0.1 KAIA 的汽油费。

## 将 Finschia 换成 Kaia

:::warning[This 交换不可逆转]

备付金和报销申请只能处理一次，不能撤销。
请仔细阅读这些说明。

:::

### 1. 连接您的钱包

#### 1.1 连接元掩码

点击 "连接 MetaMask "按钮。

<p align="center"><img src="/img/misc/kaiabridge_connect_metamask.png" alt="Connect MetaMask" width="30%"/></p>

查看 "账户 "是否显示您的地址。
如果没有，请打开 MetaMask 扩展，看看它是否显示您没有连接到页面。 如果是，请点击 "连接账户 "按钮。

<p align="center"><img src="/img/misc/kaiabridge_connect_account.png" alt="Connect Account" width="30%"/></p>

#### 1.2 连接 Kaia 钱包

如果您使用的是 Kaia 钱包，网站可能会要求您将 Kaia 钱包连接到 dApp（此处为 Kaia 在线工具包）。

<p align="center"><img src="/img/misc/kaiabridge_connect_kaiawallet.png" alt="Connect Kaia Wallet" width="30%"/></p>

点击 "连接"，连接您的 Kaia 钱包。

#### 2. 切换到 Kaia 主网

检查是否已将网络正确设置为 "Kaia Mainnet "或 "Mainnet"。 如果没有，请切换到 Kaia Mainnet。 如果您使用的是 MetaMask，且未在 MetaMask 中添加 Kaia Mainnet 网络，请参阅 [检查您的网络](#2-check-your-network)。

#### 3. 得出芬斯基亚地址

单击 "生成 Finschia 地址"。 出现签署信息的提示时，点击 "确认 "或 "签署"。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_sign_metamask.png" alt="Sign message in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_sign_kaiawallet.png" alt="Sign message in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
检查 "派生 Finschia 地址 "是否与您的原始 Finschia 地址一致，以及 "CONY 余额 "是否与您在 Finschia 网络（CONY）中的余额一致。

<div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
  <img src="/img/misc/kaiabridge_address_and_conybalance_page.png" alt="Address and CONY balance shown in the page" style={{width: "50%"}} />
  <img src="/img/misc/kaiabridge_address_and_conybalance_wallet.png" alt="Address and CONY balance shown in your wallet" style={{width: "30%", height: "60%"}} />
</div>

<br/><br/>
此外，请确保您的账户中有可用来支付汽油费的 KAIA（您可以在钱包中查看）。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_balance_metamask.png" alt="KAIA balance in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_balance_kaiawallet.png" alt="KAIA balance in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
如果账户中没有 KAIA，请参阅 [Gas up your account](#3-gas-up-your-account)。

#### 4. 要求提供

点击 "申请提供"。 出现签署信息和发送交易的提示时，点击 "确认"。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_provision_metamask.png" alt="Confirm provision transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_provision_kaiawallet.png" alt="Confirm provision transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
整个过程只需几秒钟。 等待交易完成。
您可以在页面中查看结果。

<p align="center"><img src="/img/misc/kaiabridge_provision_success.png" alt="Provision request successful" width="80%"/></p>

<br/>
如果没有，请刷新并从头开始。

#### 5. 申请索赔

点击 "申请索赔"。 出现发送交易的提示时，点击 "确认"。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_claim_metamask.png" alt="Confirm claim transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_claim_kaiawallet.png" alt="Confirm claim transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
整个过程只需几秒钟。 等待交易完成。
您可以在页面中查看结果。

<p align="center"><img src="/img/misc/kaiabridge_claim_success.png" alt="Claim request successful" width="80%"/></p>

<br/>
查看最新余额。 索赔金额应为（您的余额）*（兑换率，约 148），单位为 [kei](https://docs.kaia.io/learn/token-economics/kaia-native-token/#units-of-kaia-)。