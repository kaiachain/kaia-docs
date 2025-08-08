# ERC-20

## 概述<a id="overview"></a>

在 Kaia 上建立可替代代幣的步驟與您在 Ethereum 上的步驟相似，它使用 [ERC20 標準](https://ethereum.org/en/developers/docs/standards/tokens/erc-20)。

為了遵循標準，您將部署一個可實作下列事件和功能的契約：

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

- **名稱**：返回 token 名稱的方法。
- **symbol**：返回 token 符號的方法。
- **小數**：返回代幣使用的小數點數的方法。 它用來定義代幣的最小單位。 例如，如果 ERC-20 代幣的小數位值為 18，這表示代幣可以分割到小數位十八位。
- **總供應量**：定義您的代幣總供應量的方法；當達到此限制時，智慧契約將拒絕建立新的代幣。
- **balanceOf**：返回錢包地址擁有的代幣數量的方法。
- **轉讓**：從總供應量中抽取一定數量的代幣並提供給使用者的方法。
- **transferFrom**：另一種傳輸方式，用來在使用者之間傳輸代幣。
- **批准**：考慮到總供應量，此方法驗證是否允許智能合約分配一定數量的代幣給使用者。
- **allowance**：除了檢查一個使用者是否有足夠的餘額發送一定數量的代幣給另一個使用者之外，此方法與核准方法完全相同。
- \*\* 轉移事件\*\*：代幣轉移時發出
- **Approval 事件**：有令牌核准時發出。

## 開始使用<a id="getting-started"></a>

在本節中，您將使用 Remix Online IDE 建立並部署您的 ERC20 代幣合約。 由不同團隊開發的符合 ERC20 的代幣有數種實作，每種代幣的開發都考量到數個因素。 為了方便與安全起見，我們會使用 [OpenZeppelin ERC-20](https://docs.openzeppelin.com/contracts/5.x/erc20) 契約來建立我們的代幣。 有了 OpenZeppelin，我們不需要寫整個 ERC-20 介面。 相反地，我們可以匯入函式庫合約並使用它的函式。

### 步驟 1：建立 ERC20 代幣合約<a id="create-erc20-token-contract"></a>

**開放式合約精靈**

- 開啟 [OpenZeppelin Contract Wizard](https://wizard.openzeppelin.com)
- 選擇 **ERC20**。
- 提供標記的 \*\* 名稱\*\* 和 \*\* 代號\*\*。 例如：分別為 _Greek_ 和 _GK_。
- 在 **Premint** 欄位中，設定為 10,000。 這會為部署者建立初始代幣數量。
- 在 \*\* 功能\*\* 部分，勾選 Mintable 方塊，允許特權帳戶 (onlyOwner) 建立更多供應。
- 按一下 **Copy** 圖示，複製代碼以便在下一節的 Remix 上使用。

![](/img/build/smart-contracts/oz-erc20-setup.png)

### 步驟 2：部署 ERC20 代幣合約<a id="deploy-erc20-token-contract"></a>

**Remix IDE**

- 在 [Remix](https://remix.ethereum.org) 中，導覽到 \*\* 檔案總管\*\*，並在 contracts 資料夾中建立一個名為 `Greek.sol` 的新檔案。
- 導覽到 **Solidity Compiler** 索引標籤，然後按一下 **Compile Greek.sol** 來編譯代幣合約。
- 導覽到 \*\* 部署與執行交易\*\* 索引標籤
- 選取 **Environment** > **Injected Provider** > **MetaMask**。
- 在**合約**下拉式選單中，選擇您的合約。 例如，_Greek_。
- 在 **Deploy** 欄位中，提供 recipient 和 initialOwner 的建構參數。
- 按一下 **部署/交易**

![](/img/build/smart-contracts/remix-erc20-deploy.png)

部署之後，您可以使用您的帳戶來呼叫 **balanceOf**，該帳戶是用來部署契約的。 您會發現您的帳戶中有 1000000000000000000 代幣可用，如下所示。

由於您在部署上述合約時將小數位設定為 18，因此它在構建器中鑄造了固定數量的 10000 代幣，其中一個代幣的小數位值為 10^18。 TotalSupply 方法會傳回已鑄造代幣的總供應量，也應該是 10000000000000000000000。

![](/img/build/smart-contracts/remix-erc20-bal-totalsupply.png)

### 步驟 3：與 MetaMask 的 ERC-20 令牌互動<a id="interact-with-erc20-token-from-MetaMask"></a>

您可以使用 MetaMask 檢查您的餘額，並轉移您剛剛部署的 ERC-20 相容希臘代用幣。 要在 MetaMask 上查看您的代幣餘額，請按照以下步驟操作：

**MetaMask**

- 開啟 MetaMask
- 按一下最右邊的 **Ellipsis** 圖示，然後按一下 **Import tokens**

![](/img/build/smart-contracts/mm-import-tokens-e20g.png)

- 請務必在 \*\* 選擇網路\*\* 欄位中選擇 Kaia Kairos Network，同時在 \*\* 代幣合約地址\*\* 欄位中貼上最近部署的希臘合約地址。

![](/img/build/smart-contracts/mm-custom-tokens-e20g.png)

- 按一下 \*\* 匯入\*\* 作為最後一步

![](/img/build/smart-contracts/mm-custom-tokens-imported-e20g.png)

完成後，您應該會看到一個模組，顯示以下訊息："_代幣已匯入：您已成功匯入 GK_"，而匯入的代幣 (GK) 將成為您 MetaMask 荷包中代幣清單的一部分。

