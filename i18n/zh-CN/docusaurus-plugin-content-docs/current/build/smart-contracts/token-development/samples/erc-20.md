# ERC-20

## 概述<a id="overview"></a>

在 Kaia 上创建可替代代币的步骤与在以太坊上类似，它使用 [ERC20 标准](https://ethereum.org/en/developers/docs/standards/tokens/erc-20)。

为了遵循标准，您将部署一个能实现以下事件和功能的合同：

```solidity
function name() public view returns (string) //optional
function symbol() public view returns (string) //optional
function decimals() public view returns (uint8) //optional
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

- **name**：返回令牌名称的方法。
- **符号**：返回标记符号的方法。
- **小数**：返回令牌使用的小数位数的方法。 它用于定义标记的最小单位。 例如，如果 ERC-20 令牌的小数点后数值为 18，这就意味着该令牌可以分割到小数点后 18 位。
- **总供应量**：定义代币总供应量的方法；当达到此限额时，智能合约将拒绝创建新代币。
- **balanceOf**：返回钱包地址拥有的代币数量的方法。
- **转移**：从总供应量中提取一定数量的代币并将其交给用户的方法。
- **transferFrom**：另一种传输方式，用于在用户之间传输令牌。
- **批准**：该方法用于验证是否允许智能合约向用户分配一定数量的代币，同时考虑到总供应量。
- **allowance**：除了检查一个用户是否有足够的余额向另一个用户发送一定数量的代币外，该方法与批准方法完全相同。
- **转移事件**：代币转移时发出的事件
- **批准事件**：当令牌获得批准时发出。

## 入门<a id="getting-started"></a>

在本节中，您将使用 Remix Online IDE 创建和部署您的 ERC20 令牌合约。 不同团队开发了多种符合 ERC20 标准的代币，每种代币的开发都考虑了多个因素。 为了方便和安全起见，我们将使用 [OpenZeppelin ERC-20](https://docs.openzeppelin.com/contracts/5.x/erc20) 合约来创建我们的令牌。 有了 OpenZeppelin，我们无需编写整个 ERC-20 接口。 相反，我们可以导入库合同并使用它的函数。

### 第 1 步：创建 ERC20 代币合约<a id="create-erc20-token-contract"></a>

**开放式齐柏林合同向导**

- 打开 [OpenZeppelin 合同向导](https://wizard.openzeppelin.com)
- 选择 **ERC20**。
- 为令牌提供**名称**和**符号**。 例如分别为 _Greek_ 和 _GK_。
- 在 **Premint** 字段中，将其设置为 10,000。 这将为部署者创建初始数量的代币。
- 在 "**功能**"部分，选中 "可铸币 "复选框，允许特权账户（仅业主）创建更多供应。
- 点击**复制**图标，复制代码以便在下一节的 Remix 中使用。

![](/img/build/smart-contracts/oz-erc20-setup.png)

### 第 2 步：部署 ERC20 代币合约<a id="deploy-erc20-token-contract"></a>

**混音 IDE**

- 在 [Remix](https://remix.ethereum.org) 中，导航至 \*\* 文件资源管理器\*\*，在 contracts 文件夹中新建一个名为 `Greek.sol`的文件。
- 导航至 **Solidity Compiler** 选项卡，然后单击 **Compile Greek.sol** 来编译令牌合约。
- 导航至**部署和运行事务**选项卡
- 选择 **Environment** > **Injected Provider** > **MetaMask**。
- 在**合同**下拉菜单中，选择您的合同。 例如，_希腊语_。
- 在 **Deploy** 字段中，为接收者和 initialOwner 提供构造函数参数。
- 单击 **部署/事务**

![](/img/build/smart-contracts/remix-erc20-deploy.png)

部署后，您可以使用部署合同时使用的账户调用 **balanceOf** 。 您会发现账户中有 1000000000000000000 个代币，如下所示。

由于您在部署上述合约时将十进制值设置为 18，因此它在构造函数中铸造了固定数量的 10000 个代币，其中一个代币的十进制值为 10^18。 TotalSupply 方法将返回已铸造代币的总供应量，也应该是 10000000000000000000000。

![](/img/build/smart-contracts/remix-erc20-bal-totalsupply.png)

### 步骤 3：与 MetaMask 的 ERC-20 令牌互动<a id="interact-with-erc20-token-from-MetaMask"></a>

您可以使用 MetaMask 查看余额，并转移您刚刚部署的与 ERC-20 兼容的希腊代币。 要在 MetaMask 上查看令牌余额，请按以下步骤操作：

**元掩码**

- 打开 MetaMask
- 点击最右侧的**省略号**图标，然后点击**导入令牌**

![](/img/build/smart-contracts/mm-import-tokens-e20g.png)

- 确保在**选择网络**字段中选择 Kaia Kairos 网络，并在**代币合约地址**字段中粘贴最近部署的希腊合约地址。

![](/img/build/smart-contracts/mm-custom-tokens-e20g.png)

- 点击**导入**作为最后一步

![](/img/build/smart-contracts/mm-custom-tokens-imported-e20g.png)

完成后，您会看到一个模态窗口，其中显示以下信息："_令牌已导入：您已成功导入 GK_"，导入的代币（GK）将成为 MetaMask 钱包中代币列表的一部分。

