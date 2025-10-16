# 鏈條 CCIP

![](/img/banners/kaiaXchainlink.png)

## 導言

[Chainlink Cross-Chain Interoperability Protocol](https://docs.chain.link/ccip) (CCIP) 為開發人員和分散式應用程式 (dApp) 提供安全、有效的跨區塊鏈互動方式。 透過 CCIP，您可以傳送代幣和任意訊息，以觸發目的合約上的動作，例如鑄造 NFT、重新平衡指數或呼叫自訂函式。

在本教程中，您將學習如何使用 Chainlink CCIP 從 Kaia 智慧型契約傳送訊息和代幣到另一條鏈上的契約，以及如何將訊息和代幣接收回來。

## 先決條件。

- 代工安裝
  - 使用 `curl -L https://foundry.paradigm.xyz | bash` 安裝，然後執行 `foundryup`。
  - 使用 `forge --version,``cast --version` 和 `anvil --version` 進行驗證。
- [MetaMask](https://metamask.io/en-GB/download) 錢包
  - 設定開發人員錢包
  - 將 Kaia Kairos 測試網路和 Ethereum Sepolia 網路加入 MetaMask。
- 從水龍頭測試代幣
  - [KAIA](https://faucet.kaia.io)：從 Kaia 部署和傳送的瓦斯。
  - [LINK](https://faucets.chain.link/kaia-testnet) (testnet)：用 LINK 付款時，適用 CCIP 費用。
  - 目的鏈上的原生代幣（例如，[Sepolia ETH](https://faucets.chain.link/sepolia)：用於部署，如果選擇，用於以原生代幣支付 CCIP 費用）。

## 開始使用

在本指南中，您將使用 Chainlink CCIP 在 Kaia (Kairos Testnet) 和 Ethereum Sepolia 之間傳送和接收跨鏈訊息。

到最後，您將會

- 初始化為 Kairos 和 Sepolia 設定的 Foundry 專案
- 新增 Chainlink CCIP 契約和介面為依賴項目
- 實作一個 Messenger 契約，可跨鏈傳送和接收訊息
- 部署至兩個網路並驗證往返訊息

### 建立專案

在本節中，您將使用 [Foundry](https://docs.kaia.io/build/smart-contracts/deployment-and-verification/deploy/foundry) 設定開發環境。 若要建立新的 Foundry 專案，請先建立一個新目錄：

```bash
mkdir kaia-foundry-ccip-example
```

那就跑吧

```bash
cd kaia-foundry-ccip-example
forge init
```

這將以下列基本配置建立一個 Foundry 專案：

```bash
├── foundry.toml
├── script
├── src
└── test
```

### 安裝 Chainlink 智慧型契約

若要在您的 Foundry 專案中使用 Chainlink CCIP，您需要使用 forge install 安裝 Chainlink CCIP 智慧型契約作為專案的相依性。

若要安裝 Chainlink CCIP 智慧型契約，請執行：

```bash
forge install smartcontractkit/chainlink-ccip@2114b90f39c82c052e05af7c33d42c1ae98f4180
forge install smartcontractkit/chainlink-evm@ff814eb0a01f89d9a215f825d243bf421e6434a9
```

安裝完成後，建立一個 `remapping.txt` 檔案：

```bash
forge remappings > remappings.txt
```

然後將以下內容貼到您新建立的檔案中：

```bash
@chainlink/contracts/=lib/chainlink-evm/contracts/
@chainlink/contracts-ccip/=lib/chainlink-ccip/chains/evm/contracts/
```

## 撰寫智慧型契約

在本節中，您將使用下面的程式碼來跨鏈傳送和接收訊息。

在專案的 rc 目錄下製作一個新檔案，命名為 `Messenger.sol`，並將下列程式碼複製到檔案中：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import { IRouterClient } from "@chainlink/contracts-ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts/src/v0.8/shared/access/OwnerIsCreator.sol";
import { Client } from "@chainlink/contracts-ccip/libraries/Client.sol";
import { CCIPReceiver } from "@chainlink/contracts-ccip/applications/CCIPReceiver.sol";
import {IERC20} from "@chainlink/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@chainlink/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/utils/SafeERC20.sol";
/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
/// @title - A simple messenger contract for sending/receiving string data across chains.
contract Messenger is CCIPReceiver, OwnerIsCreator {
    using SafeERC20 for IERC20;
    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance.
    error NothingToWithdraw(); // Used when trying to withdraw Ether but there's nothing to withdraw.
    error FailedToWithdrawEth(address owner, address target, uint256 value); // Used when the withdrawal of Ether fails.
    error DestinationChainNotAllowlisted(uint64 destinationChainSelector); // Used when the destination chain has not been allowlisted by the contract owner.
    error SourceChainNotAllowlisted(uint64 sourceChainSelector); // Used when the source chain has not been allowlisted by the contract owner.
    error SenderNotAllowlisted(address sender); // Used when the sender has not been allowlisted by the contract owner.
    error InvalidReceiverAddress(); // Used when the receiver address is 0.
    // Event emitted when a message is sent to another chain.
    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        string text, // The text being sent.
        address feeToken, // the token address used to pay CCIP fees.
        uint256 fees // The fees paid for sending the CCIP message.
    );
    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        string text // The text that was received.
    );
    bytes32 private s_lastReceivedMessageId; // Store the last received messageId.
    string private s_lastReceivedText; // Store the last received text.
    // Mapping to keep track of allowlisted destination chains.
    mapping(uint64 => bool) public allowlistedDestinationChains;
    // Mapping to keep track of allowlisted source chains.
    mapping(uint64 => bool) public allowlistedSourceChains;
    // Mapping to keep track of allowlisted senders.
    mapping(address => bool) public allowlistedSenders;
    IERC20 private s_linkToken;
    /// @notice Constructor initializes the contract with the router address.
    /// @param _router The address of the router contract.
    /// @param _link The address of the link contract.
    constructor(address _router, address _link) CCIPReceiver(_router) {
        s_linkToken = IERC20(_link);
    }
    /// @dev Modifier that checks if the chain with the given destinationChainSelector is allowlisted.
    /// @param _destinationChainSelector The selector of the destination chain.
    modifier onlyAllowlistedDestinationChain(uint64 _destinationChainSelector) {
        if (!allowlistedDestinationChains[_destinationChainSelector])
            revert DestinationChainNotAllowlisted(_destinationChainSelector);
        _;
    }
    /// @dev Modifier that checks if the chain with the given sourceChainSelector is allowlisted and if the sender is allowlisted.
    /// @param _sourceChainSelector The selector of the destination chain.
    /// @param _sender The address of the sender.
    modifier onlyAllowlisted(uint64 _sourceChainSelector, address _sender) {
        if (!allowlistedSourceChains[_sourceChainSelector])
            revert SourceChainNotAllowlisted(_sourceChainSelector);
        if (!allowlistedSenders[_sender]) revert SenderNotAllowlisted(_sender);
        _;
    }
    /// @dev Modifier that checks the receiver address is not 0.
    /// @param _receiver The receiver address.
    modifier validateReceiver(address _receiver) {
        if (_receiver == address(0)) revert InvalidReceiverAddress();
        _;
    }
    /// @dev Updates the allowlist status of a destination chain for transactions.
    function allowlistDestinationChain(
        uint64 _destinationChainSelector,
        bool allowed
    ) external onlyOwner {
        allowlistedDestinationChains[_destinationChainSelector] = allowed;
    }
    /// @dev Updates the allowlist status of a source chain for transactions.
    function allowlistSourceChain(
        uint64 _sourceChainSelector,
        bool allowed
    ) external onlyOwner {
        allowlistedSourceChains[_sourceChainSelector] = allowed;
    }
    /// @dev Updates the allowlist status of a sender for transactions.
    function allowlistSender(address _sender, bool allowed) external onlyOwner {
        allowlistedSenders[_sender] = allowed;
    }
    /// @notice Sends data to receiver on the destination chain.
    /// @notice Pay for fees in LINK.
    /// @dev Assumes your contract has sufficient LINK.
    /// @param _destinationChainSelector The identifier (aka selector) for the destination blockchain.
    /// @param _receiver The address of the recipient on the destination blockchain.
    /// @param _text The text to be sent.
    /// @return messageId The ID of the CCIP message that was sent.
    function sendMessagePayLINK(
        uint64 _destinationChainSelector,
        address _receiver,
        string calldata _text
    )
        external
        onlyOwner
        onlyAllowlistedDestinationChain(_destinationChainSelector)
        validateReceiver(_receiver)
        returns (bytes32 messageId)
    {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
            _receiver,
            _text,
            address(s_linkToken)
        );
        // Initialize a router client instance to interact with cross-chain router
        IRouterClient router = IRouterClient(this.getRouter());
        // Get the fee required to send the CCIP message
        uint256 fees = router.getFee(_destinationChainSelector, evm2AnyMessage);
        if (fees > s_linkToken.balanceOf(address(this)))
            revert NotEnoughBalance(s_linkToken.balanceOf(address(this)), fees);
        // Approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
        s_linkToken.approve(address(router), fees);
        // Send the CCIP message through the router and store the returned CCIP message ID
        messageId = router.ccipSend(_destinationChainSelector, evm2AnyMessage);
        // Emit an event with message details
        emit MessageSent(
            messageId,
            _destinationChainSelector,
            _receiver,
            _text,
            address(s_linkToken),
            fees
        );
        // Return the CCIP message ID
        return messageId;
    }
    /// @notice Sends data to receiver on the destination chain.
    /// @notice Pay for fees in native gas.
    /// @dev Assumes your contract has sufficient native gas tokens.
    /// @param _destinationChainSelector The identifier (aka selector) for the destination blockchain.
    /// @param _receiver The address of the recipient on the destination blockchain.
    /// @param _text The text to be sent.
    /// @return messageId The ID of the CCIP message that was sent.
    function sendMessagePayNative(
        uint64 _destinationChainSelector,
        address _receiver,
        string calldata _text
    )
        external
        onlyOwner
        onlyAllowlistedDestinationChain(_destinationChainSelector)
        validateReceiver(_receiver)
        returns (bytes32 messageId)
    {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
            _receiver,
            _text,
            address(0)
        );
        // Initialize a router client instance to interact with cross-chain router
        IRouterClient router = IRouterClient(this.getRouter());
        // Get the fee required to send the CCIP message
        uint256 fees = router.getFee(_destinationChainSelector, evm2AnyMessage);
        if (fees > address(this).balance)
            revert NotEnoughBalance(address(this).balance, fees);
        // Send the CCIP message through the router and store the returned CCIP message ID
        messageId = router.ccipSend{value: fees}(
            _destinationChainSelector,
            evm2AnyMessage
        );
        // Emit an event with message details
        emit MessageSent(
            messageId,
            _destinationChainSelector,
            _receiver,
            _text,
            address(0),
            fees
        );
        // Return the CCIP message ID
        return messageId;
    }
    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    )
        internal
        override
        onlyAllowlisted(
            any2EvmMessage.sourceChainSelector,
            abi.decode(any2EvmMessage.sender, (address))
        ) // Make sure source chain and sender are allowlisted
    {
        s_lastReceivedMessageId = any2EvmMessage.messageId; // fetch the messageId
        s_lastReceivedText = abi.decode(any2EvmMessage.data, (string)); // abi-decoding of the sent text
        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            abi.decode(any2EvmMessage.data, (string))
        );
    }
    /// @notice Construct a CCIP message.
    /// @dev This function will create an EVM2AnyMessage struct with all the necessary information for sending a text.
    /// @param _receiver The address of the receiver.
    /// @param _text The string data to be sent.
    /// @param _feeTokenAddress The address of the token used for fees. Set address(0) for native gas.
    /// @return Client.EVM2AnyMessage Returns an EVM2AnyMessage struct which contains information for sending a CCIP message.
    function _buildCCIPMessage(
        address _receiver,
        string calldata _text,
        address _feeTokenAddress
    ) private pure returns (Client.EVM2AnyMessage memory) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        return
            Client.EVM2AnyMessage({
                receiver: abi.encode(_receiver), // ABI-encoded receiver address
                data: abi.encode(_text), // ABI-encoded string
                tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array as no tokens are transferred
                extraArgs: Client._argsToBytes(
                    // Additional arguments, setting gas limit and allowing out-of-order execution.
                    // Best Practice: For simplicity, the values are hardcoded. It is advisable to use a more dynamic approach
                    // where you set the extra arguments off-chain. This allows adaptation depending on the lanes, messages,
                    // and ensures compatibility with future CCIP upgrades. Read more about it here: https://docs.chain.link/ccip/concepts/best-practices/evm#using-extraargs
                    Client.GenericExtraArgsV2({
                        gasLimit: 200_000, // Gas limit for the callback on the destination chain
                        allowOutOfOrderExecution: true // Allows the message to be executed out of order relative to other messages from the same sender
                    })
                ),
                // Set the feeToken to a feeTokenAddress, indicating specific asset will be used for fees
                feeToken: _feeTokenAddress
            });
    }
    /// @notice Fetches the details of the last received message.
    /// @return messageId The ID of the last received message.
    /// @return text The last received text.
    function getLastReceivedMessageDetails()
        external
        view
        returns (bytes32 messageId, string memory text)
    {
        return (s_lastReceivedMessageId, s_lastReceivedText);
    }
    /// @notice Fallback function to allow the contract to receive Ether.
    /// @dev This function has no function body, making it a default function for receiving Ether.
    /// It is automatically called when Ether is sent to the contract without any data.
    receive() external payable {}
    /// @notice Allows the contract owner to withdraw the entire balance of Ether from the contract.
    /// @dev This function reverts if there are no funds to withdraw or if the transfer fails.
    /// It should only be callable by the owner of the contract.
    /// @param _beneficiary The address to which the Ether should be sent.
    function withdraw(address _beneficiary) public onlyOwner {
        // Retrieve the balance of this contract
        uint256 amount = address(this).balance;
        // Revert if there is nothing to withdraw
        if (amount == 0) revert NothingToWithdraw();
        // Attempt to send the funds, capturing the success status and discarding any return data
        (bool sent, ) = _beneficiary.call{value: amount}("");
        // Revert if the send failed, with information about the attempted transfer
        if (!sent) revert FailedToWithdrawEth(msg.sender, _beneficiary, amount);
    }
    /// @notice Allows the owner of the contract to withdraw all tokens of a specific ERC20 token.
    /// @dev This function reverts with a 'NothingToWithdraw' error if there are no tokens to withdraw.
    /// @param _beneficiary The address to which the tokens will be sent.
    /// @param _token The contract address of the ERC20 token to be withdrawn.
    function withdrawToken(
        address _beneficiary,
        address _token
    ) public onlyOwner {
        // Retrieve the balance of this contract
        uint256 amount = IERC20(_token).balanceOf(address(this));
        // Revert if there is nothing to withdraw
        if (amount == 0) revert NothingToWithdraw();
        IERC20(_token).safeTransfer(_beneficiary, amount);
    }
}
```

上面的程式碼是一個雙向的 CCIP 契約，可以在允許清單的鏈上傳送和接收字串訊息，並有擁有者控制、LINK 或原生費用支付。 讓我們來看看本合約中要用到的主要功能：

**1. 所有清單**

- **allowlistSourceChain(selector, allowed)**：控制允許哪些來源鏈傳送訊息到此契約。
- **allowlistDestinationChain(selector, allowed)**：控制允許此契約傳送至哪些目的地鏈。
- **allowlistedSenders[address] (via allowlistSender(addr, allowed))**：當訊息到達時，限制信任來源鏈上的哪些寄件者位址。

:::note
測試前在兩端都設定好。 來源必須信任寄件者和連鎖。 目的地也必須允許傳送。
:::

**2. 傳送訊息**

**sendMessagePayLINK(selector, receiver, text)**：傳送訊息並在 LINK 中支付 CCIP 費用。 這會建立訊息、報價費用、檢查 LINK 結餘、核准 Router，然後執行 ccipSend。 當完成時，它會回傳一個與傳送訊息相關的唯一 ID。

**sendMessagePayNative(selector, receiver, text)**：傳送訊息並以原生代幣支付 CCIP 費用。 這會建立訊息、報價費用、檢查本機餘額，然後執行 ccipSend(value:費用)。 完成後，它會回傳一個與傳送訊息相關的唯一 ID。

**3. 建立訊息**

_buildCCIPMessage(receiver, text, feeTokenAddress) -> EVM2AnyMessage

- 編碼接收器和文字
- 未傳送任何代幣（tokenAmounts 為空）
- 使用 GenericExtraArgsV2 與可設定 gasLimit 的 extraArgs 套件
- 設定 feeToken 為 LINK 或 address(0)。

**4. 接收訊息**

CCIP 呼叫 _ccipReceive(...) 在目的地鏈上。 合約：

- 根據允許清單驗證來源鏈和寄件者
- 解碼字串
- 將其儲存為最後收到的有效負載
- 輸出 MessageReceived
- 讀取最後一次入站的有效負載： getLastReceivedMessageDetails() -> (messageId, text)

## 編譯智慧型契約

要編譯您的智慧型契約，請執行

```bash
forge build
```

## 部署智慧型契約

### 設定您的錢包為部署者

在您將智慧型契約部署到網路之前，您需要設定一個錢包作為部署者。 為此，您可以使用 [cast wallet import](https://book.getfoundry.sh/reference/cast/cast-wallet-import) 指令，將錢包的私密金鑰匯入 Foundry 安全加密的 keystore：

```bash
cast wallet import deployer --interactive
```

執行上述指令後，系統會提示您輸入私人密碼匙，以及簽署交易的密碼。

若要確認已將錢包匯入為 Foundry 專案中的部署者帳戶，請執行：

```bash
cast wallet list
```

### 設定環境變數

要設定您的環境，請在專案的主目錄建立 .env 檔案，並為 Kairos Testnet 和 Ethereum Sepolia 加入 RPC URL、[CCIP 鏈選擇器](https://docs.chain.link/ccip/directory/testnet)、[CCIP 路由器位址](https://docs.chain.link/ccip/directory/testnet) 和 [LINK 令牌位址](https://docs.chain.link/resources/link-token-contracts)：

```bash
KAIROS_RPC_URL="https://public-en-kairos.node.kaia.io"
ETH_SEPOLIA_RPC_URL="https://ethereum-sepolia-rpc.publicnode.com"
KAIROS_CHAIN_SELECTOR=2624132734533621656
ETH_SEPOLIA_CHAIN_SELECTOR=16015286601757825753
KAIROS_ROUTER_ADDRESS="0x41477416677843fCE577748D2e762B6638492755"
ETH_SEPOLIA_ROUTER_ADDRESS="0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59"
KAIROS_LINK_ADDRESS="0xAF3243f975afe2269Da8Ffa835CA3A8F8B6A5A36"
ETH_SEPOLIA_LINK_ADDRESS="0x779877A7B0D9E8603169DdbD7836e478b4624789"
```

一旦建立了 `.env` 檔案，執行下列指令即可在目前的指令行會話中載入環境變數：

```bash
source .env
```

完成合約編譯與環境設定後，您就可以部署智慧型合約了。

若要使用 Foundry 部署智慧型契約，您可以使用 forge create 指令。 該指令需要您指定要部署的智慧型契約、要部署到的網路的 RPC URL，以及要部署的帳號。

### 部署寄件者合約至 Kairos Testnet

要將 Sender 智慧型契約部署到 Kaia Kairos Testnet，請執行下列指令：

```bash
forge create --rpc-url $KAIROS_RPC_URL --account deployer --broadcast src/Messenger.sol:Messenger --constructor-args $KAIROS_ROUTER_ADDRESS $KAIROS_LINK_ADDRESS
```

出現提示時，輸入之前匯入錢包私人密碼匙時設定的密碼。

執行上述指令後，合約將部署在 Kairos 測試網路上。 您可以使用 [Kaiascan block explorer](https://kairos.kaiascan.io) 檢視部署狀態和合約。

#### 啟用您的合約發送 CCIP 訊息至 Ethereum Sepolia 上的接收者合約

首先，我們需要更新目的地鏈的交易允許列表狀態。 若要執行，請執行下列指令：

```bash
cast send `SENDER_DEPLOYED_ADDRESS` --rpc-url $KAIROS_RPC_URL "allowlistDestinationChain(uint64, bool)" $ETH_SEPOLIA_CHAIN_SELECTOR true --account deployer
```

上面的程式碼呼叫 _allowlistDestinationChain()_ 來設定 Sender 契約允許的目的地鏈選擇器。 各鏈選擇器可在 [CCIP 目錄] (https://docs.chain.link/ccip/directory) 中找到。

### 將 Receiver 合約部署至 Ethereum Sepolia

要將 Receiver 智慧型契約部署到 Ethereum Sepolia，請執行下列指令：

```bash
forge create --rpc-url $ETH_SEPOLIA_RPC_URL --account deployer --broadcast src/Messenger.sol:Messenger --constructor-args $ETH_SEPOLIA_ROUTER_ADDRESS $ETH_SEPOLIA_LINK_ADDRESS
```

出現提示時，輸入之前匯入錢包私人密碼匙時設定的密碼。

執行上述指令後，該契約將部署在 Ethereum Sepolia 上。 您可以使用 [ETH Sepolia 区块浏览器](https://sepolia.etherscan.io/) 查看部署状态和合约。

#### 啟用您的合約，以便從 Kairos Testnet 上的寄件者合約接收 CCIP 訊息

首先，我們需要更新交易來源鏈的允許列表狀態。 若要執行，請執行下列指令：

```bash
cast send `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $ETH_SEPOLIA_RPC_URL "allowlistSourceChain(uint64, bool)" $KAIROS_CHAIN_SELECTOR true --account deployer
```

上面的程式碼呼叫 _allowlistSourceChain()_ 來設定 Receiver 契約上允許的來源鏈選擇器。 每個鏈選擇器可在 [CCIP 目錄] (https://docs.chain.link/ccip/directory) 中找到。

#### 啟用您的合約，以便從 Kairos Testnet 上的寄件者合約接收 CCIP 訊息

若要更新寄件者的交易允許清單狀態，請執行下列指令：

```bash
cast send `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $ETH_SEPOLIA_RPC_URL "allowlistSender(address, bool)" 0x12798F1E2013A110E3C8B23aC1f36c00B8DFD4d9 true --account deployer
```

:::note
此時，您在 Kairos Testnet 上有一個傳送者合約，在 Ethereum Sepolia 上有一個接收者合約。 作為安全措施，您啟用了傳送者合約，以傳送 CCIP 訊息到 Ethereum Sepolia，並啟用接收者合約，以接收來自傳送者和 Kairos Testnet 的 CCIP 訊息。
:::

## 為您的智慧型契約提供資金

為了支付與傳送訊息相關的費用，傳送者合約需要持有 LINK 代幣的餘額，如果傳送資料並使用原生代幣支付，則需要持有 ETH 和 KAIA。

\*\* 連結\*\*

直接從您的錢包中為您的合約注資，或執行以下 cast 指令：

```bash
cast send $KAIROS_LINK_ADDRESS --rpc-url $KAIROS_RPC_URL "transfer(address,uint256)" `SENDER_DEPLOYED_ADDRESS` 5000000000000000000 --account deployer
```

上述指令會在 Kairos Testnet 上傳送 5 個 LINK 代幣到寄件者合約。

:::note
在執行所提供的 cast 指令之前，請將 SENDER_DEPLOYED_ADDRESS 改為您已部署的 Sender 合約的合約位址。
:::

## 與智慧型契約互動

在本節中，您將與已部署的智慧型契約互動，並使用 Foundry cast 指令列工具呼叫其功能。

### 傳送資料並使用 LINK 付款

在這個步驟中，您將使用 CCIP 傳送簡訊，使用 CCIP 的費用將以 LINK 方式支付。

為此，您使用 cast 指令，在部署到 Kairos Testnet 的 Sender 契約上呼叫 _sendMessagePayLINK(uint64, address, string)_ 函式，以便將訊息資料傳送至 Ethereum Sepolia 上的 Receiver 契約。

要呼叫 Sender 智慧合約的 _sendMessagePayLINK(uint64, address, string)_ 函式，請執行：

```bash
cast send `SENDER_DEPLOYED_ADDRESS` --rpc-url $KAIROS_RPC_URL "sendMessagePayLINK(uint64, address, string)" $ETH_SEPOLIA_CHAIN_SELECTOR `RECEIVER_DEPLOYED_ADDRESS` "gKaia builders" --account deployer
```

上面的指令會呼叫 _sendMessagePayLINK(uint64, address, string)_ 來傳送訊息。 傳入該方法的參數包括目標鏈的鏈選擇器 (Ethereum Sepolia)、Receiver 合約位址，以及要包含在訊息中的文字資料 (Hello Builders)。

執行指令後，應該會傳回唯一的 messageId。

一旦交易完成，CCIP 會花費幾分鐘時間將資料傳送至 Ethereum Sepolia，並呼叫 Receiver 契約上的 ccipReceive 函式。 要驗證您的跨鏈交易，請開啟 [CCIP explorer](https://ccip.chain.link) 並使用交易切細值搜尋。

![](/img/build/tools/ccip-kaia-eth.png)

接下來要做的是檢查目的地鏈上的接收器契約。 為此，您將執行以下指令，呼叫 _getLastReceivedMessageDetails()_ ：

```bash
cast call `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $ETH_SEPOLIA_RPC_URL "getLastReceivedMessageDetails()" 
```

:::note
在執行所提供的 cast 指令之前，請將 RECEIVER_DEPLOYED_ADDRESS 改為您已部署的 Receiver 合約的合約位址。
:::

您應該會看到接收到的文字和訊息 ID 以十六進位資料傳回，就像這樣：

```bash
0x6fe4577cdbf2ebf73a9023b3dd9818f990879fec890ac92cf6b8d6f8bc5e59640000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000e48656c6c6f206275696c64657273000000000000000000000000000000000000

```

若要轉換十六進位資料為字串，尤其是接收到的文字，請執行下列指令：

```bash
cast to-utf8 e48656c6c6f206275696c64657273000000000000000000000000000000000000
```

現在您應該會看到 **Hello builders** 表示我們的跨鏈動作成功了。

:::note
這些範例合約設計為雙向運作。 您可以使用它們將資料從 Kairos Testnet 傳送至 Ethereum Sepolia，再從 Ethereum Sepolia 傳送回 Kairos Testnet。
:::

### 傳送資料並以原生方式付款

在此部分，您將以 CCIP 傳送簡訊，並以原生代幣支付費用。 您將從 Ethereum Sepolia 傳送至 Kaia (Kairos Testnet)。 這顛倒了先前的方向，因此 Sepolia 契約扮演寄件者，而 Kairos 契約扮演收件者。

首先，我們需要在 Ethereum Sepolia 上以 ETH 為寄件者合約提供資金。 若要執行，請執行下列 cast 指令：

```bash
cast send --rpc-url $ETH_SEPOLIA_RPC_URL `SENDER_DEPLOYED_ADDRESS` --value 300000000000000000 --account deployer
```

> 這會在 Ethereum Sepolia 上發送 **0.3 ETH** 到您的寄件者合約。

:::note
將 SENDER_DEPLOYED_ADDRESS 改為寄件者合約地址。
:::

接下來是在 Ethereum Sepolia 上允許寄件者合約的目的地鏈。 若要執行，請執行以下指令：

```bash
cast send `SENDER_DEPLOYED_ADDRESS` --rpc-url $ETH_SEPOLIA_RPC_URL "allowlistDestinationChain(uint64, bool)" $KAIROS_CHAIN_SELECTOR true --account deployer
```

接下來是允許從 Kairos Testnet 上的接收器契約來源鏈。 若要執行，請執行以下指令：

```bash
cast send `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $KAIROS_RPC_URL "allowlistSourceChain(uint64, bool)" $ETH_SEPOLIA_CHAIN_SELECTOR true --account deployer
```

然後執行以下指令，在 Kairos Testnet 的接收器合約上執行 allowlistSender：

```bash
cast send `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $KAIROS_RPC_URL "allowlistSender(address, bool)" 0x09a0CF7628c64c683B9d61a8B9EBc14BB984c65c true --account deployer
```

將契約連線後，您可以執行此指令將資料傳送至接收器契約 ：

```bash
cast send `SENDER_DEPLOYED_ADDRESS` --rpc-url $ETH_SEPOLIA_RPC_URL "sendMessagePayNative(uint64, address, string)" $KAIROS_CHAIN_SELECTOR 0x12798F1E2013A110E3C8B23aC1f36c00B8DFD4d9 "gKaia Builders" --account deployer
```

上面的指令會呼叫 _sendMessagePayNative(uint64, address, string)_ 來傳送訊息。 傳入該方法的參數包括連鎖選擇器到目的地連鎖 (Kairos Testnet)、接收器合約位址，以及要包含在訊息中的文字資料 (gKaia Builders)。

執行指令後，應該會傳回唯一的 messageId。

交易完成後，CCIP 會花費幾分鐘時間將資料傳送至 Kairos Testnet，並呼叫 Receiver 契約上的 ccipReceive 函式。 若要驗證您的跨鏈交易，請開啟 [CCIP explorer](https://ccip.chain.link) 並使用交易切細值搜尋。

![](/img/build/tools/ccip-eth-kaia.png)

接下來要做的是檢查目的地鏈上的接收器契約。 為此，您將執行以下指令，呼叫 _getLastReceivedMessageDetails()_ ：

```bash
cast call `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $KAIROS_RPC_URL "getLastReceivedMessageDetails()" 
```

:::note
將 RECEIVER_DEPLOYED_ADDRESS 改為您的接收者合約地址。
:::

您應該會看到接收到的文字和訊息 ID 以十六進位資料傳回，就像這樣：

```bash
0xb4c00b6de96488f16868a8c12878d491a85c64173078650a8ffad8f67e759f800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000e674b616961206275696c64657273000000000000000000000000000000000000
```

若要轉換十六進位資料為字串，尤其是接收到的文字，請執行下列指令：

```bash
cast to-utf8 674b616961206275696c64657273000000000000000000000000000000000000
```

現在您應該會看到 **gKaia builders** 表示我們的跨鏈動作成功了。

## 總結

在本教程中，您學會了如何使用 Chainlink CCIP 從 Kaia Kairos Testnet 傳送訊息到另一條鏈 Ethereum Sepolia，反之亦然。 如需更深入的 Chainlink CCIP 指南及其運作方式，請參考 [Chainlink CCIP 文件](https://docs.chain.link/ccip/tutorials/evm)。

































