# Chainlink CCIP

![](/img/banners/kaiaXchainlink.png)

## Introduction

[Chainlink Cross-Chain Interoperability Protocol](https://docs.chain.link/ccip) (CCIP) gives developers and decentralized applications (dApps) a secure, efficient way to interact across blockchains. With CCIP, you can send tokens and arbitrary messages to trigger actions on destination contracts, such as minting NFTs, rebalancing indexes, or calling custom functions.

In this tutorial, you’ll learn how to send messages and tokens from a Kaia smart contract to a contract on another chain and how to receive them back, using Chainlink CCIP.

## Prerequisites. 
- Foundry Installed
    - Install with `curl -L https://foundry.paradigm.xyz | bash` then run `foundryup`.
    - Verify with `forge --version,` `cast --version`, and `anvil --version`.
- [MetaMask](https://metamask.io/en-GB/download) wallet
    - Set up a dev wallet
    - Add the Kaia Kairos testnet and Ethereum Sepolia network to MetaMask.
- Test tokens from faucets
    - [KAIA](https://faucet.kaia.io): gas for deploying and sending from Kaia.
    - [LINK](https://faucets.chain.link/kaia-testnet) (testnet): for CCIP fees when paying in LINK.
    - Native token on the destination chain (for example, [Sepolia ETH](https://faucets.chain.link/sepolia): for deploying and, if chosen, for paying CCIP fees in native).

## Getting Started 
In this guide, you’ll send and receive cross-chain messages between Kaia (Kairos Testnet) and Ethereum Sepolia using Chainlink CCIP.

By the end, you’ll:
- Initialize a Foundry project configured for Kairos and Sepolia
- Add Chainlink CCIP contracts and interfaces as dependencies
- Implement a Messenger contract that sends and receives messages across chains
- Deploy to both networks and verify a round-trip message

### Creating a Project 

In this section, you will set up a development environment using [Foundry](https://docs.kaia.io/build/smart-contracts/deployment-and-verification/deploy/foundry). To create a new Foundry project, first create a new directory:

```bash
mkdir kaia-foundry-ccip-example
```
Then run:

```bash
cd kaia-foundry-ccip-example
forge init
```
This will create a Foundry project with the following basic layout:

```bash
├── foundry.toml
├── script
├── src
└── test
```

### Installing Chainlink smart contracts

To use Chainlink CCIP within your Foundry project, you need to install Chainlink CCIP smart contracts as a project dependency using forge install.

To install Chainlink CCIP smart contracts, run:

```bash
forge install smartcontractkit/chainlink-ccip@2114b90f39c82c052e05af7c33d42c1ae98f4180
forge install smartcontractkit/chainlink-evm@ff814eb0a01f89d9a215f825d243bf421e6434a9
```
Once installed, create a `remapping.txt` file:

```bash
forge remappings > remappings.txt
```
And then paste the following in your newly created file:

```bash
@chainlink/contracts/=lib/chainlink-evm/contracts/
@chainlink/contracts-ccip/=lib/chainlink-ccip/chains/evm/contracts/
```

## Writing the smart contracts

In this section, you will use the code below to both send and receive messages across chains. 

Create a new file under your project’s src directory named `Messenger.sol` and copy the code below into the file:


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

The code above is a bidirectional CCIP contract that sends and receives string messages across allowlisted chains, with owner-gated controls, LINK or native fee payments. Let's take a look at the major functions we will use in this contract:

**1. Allowlists**

- **allowlistSourceChain(selector, allowed)**: Controls which source chains are allowed to deliver messages to this contract.
- **allowlistDestinationChain(selector, allowed)**: Controls which destination chains this contract is allowed to send to.
- **allowlistedSenders[address] (via allowlistSender(addr, allowed))**: Restricts which sender addresses on the source chain are trusted when a message arrives.

:::note
Set these on both ends before testing. The source must trust the sender and chain. Destination must also be allowlisted for sends.
:::

**2. Sending messages**

**sendMessagePayLINK(selector, receiver, text)**: Send a message and pay CCIP fees in LINK. This builds a message, quotes a fee, checks LINK balance, approves Router and then executes ccipSend. When completed, it returns a unique ID associated with the sent message.

**sendMessagePayNative(selector, receiver, text)**: Sends a message and pays CCIP fees in the native token. This builds a message, quotes a fee, checks native balance and then executes ccipSend(value: fees). Upon completion, it returns a unique ID associated with the sent message.


**3. Building the message**

_buildCCIPMessage(receiver, text, feeTokenAddress) -> EVM2AnyMessage

- Encodes receiver and text
- Sends no tokens (tokenAmounts is empty)
- Packages extraArgs using GenericExtraArgsV2 with a configurable gasLimit
- Sets feeToken to LINK or address(0) for native

**4. Receiving messages**

CCIP calls _ccipReceive(...) on the destination chain. The contract:

- Validates the source chain and sender against the allowlists
- Decodes the string
- Stores it as the last received payload
- Emits MessageReceived
- Reads back the last inbound payload with: getLastReceivedMessageDetails() -> (messageId, text)

## Compiling the smart contracts

To compile your smart contracts, run:
```bash
forge build
```

## Deploying the smart contract

### Setting up your wallet as the deployer

Before you can deploy your smart contract to a network, you will need to set up a wallet to be used as the deployer. To do so, you can use the [cast wallet import](https://book.getfoundry.sh/reference/cast/cast-wallet-import) command to import the private key of the wallet into Foundry’s securely encrypted keystore:

```bash
cast wallet import deployer --interactive
```
After running the command above, you will be prompted to enter your private key, as well as a password for signing transactions.

To confirm that the wallet was imported as the deployer account in your Foundry project, run:

```bash
cast wallet list
```

### Setting up environment variables

To set up your environment, create an .env file in the home directory of your project, and add the RPC URLs, [CCIP chain selectors](https://docs.chain.link/ccip/directory/testnet), [CCIP router addresses](https://docs.chain.link/ccip/directory/testnet), and [LINK token addresses](https://docs.chain.link/resources/link-token-contracts) for both Kairos Testnet and Ethereum Sepolia:

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
Once the `.env` file has been created, run the following command to load the environment variables in the current command line session:

```bash
source .env
```

With your contracts compiled and environment setup, you are ready to deploy the smart contracts.

To deploy a smart contract using Foundry, you can use the forge create command. The command requires you to specify the smart contract you want to deploy, an RPC URL of the network you want to deploy to, and the account you want to deploy with.

### Deploying the Sender contract to Kairos Testnet

To deploy the Sender smart contract to the Kaia Kairos Testnet, run the following command:

```bash
forge create --rpc-url $KAIROS_RPC_URL --account deployer --broadcast src/Messenger.sol:Messenger --constructor-args $KAIROS_ROUTER_ADDRESS $KAIROS_LINK_ADDRESS
```
When prompted, enter the password that you set earlier, when you imported your wallet’s private key.

After running the command above, the contract will be deployed on the Kairos test network. You can view the deployment status and contract by using the [Kaiascan block explorer](https://kairos.kaiascan.io).

#### Enable your contract to send CCIP messages to Receiver Contract on Ethereum Sepolia

First we need to update the allowlist status of a destination chain for transactions. To do so, run the following command:

```bash
cast send `SENDER_DEPLOYED_ADDRESS` --rpc-url $KAIROS_RPC_URL "allowlistDestinationChain(uint64, bool)" $ETH_SEPOLIA_CHAIN_SELECTOR true --account deployer
```
The code above calls the *allowlistDestinationChain()* to set the destination chain selector to be allowed on the Sender contract. Each chain selector is found on the [CCIP Directory](https://docs.chain.link/ccip/directory).

### Deploying the Receiver contract to Ethereum Sepolia

To deploy the Receiver smart contract to the Ethereum Sepolia, run the following command:

```bash
forge create --rpc-url $ETH_SEPOLIA_RPC_URL --account deployer --broadcast src/Messenger.sol:Messenger --constructor-args $ETH_SEPOLIA_ROUTER_ADDRESS $ETH_SEPOLIA_LINK_ADDRESS
```
When prompted, enter the password that you set earlier, when you imported your wallet’s private key.

After running the command above, the contract will be deployed on Ethereum Sepolia. You can view the deployment status and contract by using the [ETH Sepolia block explorer](https://sepolia.etherscan.io/).

#### Enable your contract to receive CCIP messages from  Sender Contract on Kairos Testnet

First we need to update the allowlist status of a source chain for transactions. To do so, run the following command:

```bash
cast send `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $ETH_SEPOLIA_RPC_URL "allowlistSourceChain(uint64, bool)" $KAIROS_CHAIN_SELECTOR true --account deployer
```
The code above calls the *allowlistSourceChain()* to set the source chain selector to be allowed on the Receiver contract. Each chain selector is found on the [CCIP Directory](https://docs.chain.link/ccip/directory).

#### Enable your contract to receive CCIP messages from the Sender contract on Kairos Testnet

To update the allowlist status of a sender for transactions, run the following command:

```bash
cast send `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $ETH_SEPOLIA_RPC_URL "allowlistSender(address, bool)" 0x12798F1E2013A110E3C8B23aC1f36c00B8DFD4d9 true --account deployer
```

:::note
At this point, you have one sender contract on Kairos Testnet and one receiver contract on Ethereum Sepolia. As security measures, you enabled the sender contract to send CCIP messages to Ethereum Sepolia and the receiver contract to receive CCIP messages from the sender and Kairos Testnet.
:::

## Funding your smart contracts

In order to pay for the fees associated with sending messages, the Sender contract will need to hold a balance of LINK tokens, ETH  and KAIA if sending data and paying with native tokens. 

**LINK**

Fund your contract directly from your wallet, or by running the following cast command:

```bash
cast send $KAIROS_LINK_ADDRESS --rpc-url $KAIROS_RPC_URL "transfer(address,uint256)" `SENDER_DEPLOYED_ADDRESS` 5000000000000000000 --account deployer
```
The above command sends 5 LINK tokens on Kairos Testnet to the Sender contract.

:::note
Replace SENDER_DEPLOYED_ADDRESS with the contract address of your deployed Sender contract before running the provided cast command.
:::

## Interacting with the smart contract

In this section, you will interact with deployed smart contracts and call their function using the Foundry cast command-line tool.

### Send data and pay in LINK

In this step, you will use CCIP to send a text and the CCIP fees for using CCIP will be paid in LINK. 

To do so, you use the cast command to call the *sendMessagePayLINK(uint64, address, string)* function on the Sender contract deployed to Kairos Testnet in order to send message data to the Receiver contract on Ethereum Sepolia.

To call the *sendMessagePayLINK(uint64, address, string)* function of the Sender smart contract, run:

```bash
cast send `SENDER_DEPLOYED_ADDRESS` --rpc-url $KAIROS_RPC_URL "sendMessagePayLINK(uint64, address, string)" $ETH_SEPOLIA_CHAIN_SELECTOR `RECEIVER_DEPLOYED_ADDRESS` "gKaia builders" --account deployer
```

The command above calls the *sendMessagePayLINK(uint64, address, string)* to send a message. The parameters passed in to the method include: The chain selector to the destination chain (Ethereum Sepolia), the Receiver contract address, and the text data to be included in the message (Hello Builders).

After running the command, a unique messageId should be returned.

Once the transaction has been finalized, it will take a few minutes for CCIP to deliver the data to Ethereum Sepolia and call the ccipReceive function on the Receiver contract. To verify  your cross-chain transaction, open the [CCIP explorer](https://ccip.chain.link) and search using the transaction hash.

![](/img/build/tools/ccip-kaia-eth.png)

The next thing to do is to check the receiver contract on the destination chain. To do so, you will call the *getLastReceivedMessageDetails()* by running the command below:

```bash
cast call `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $ETH_SEPOLIA_RPC_URL "getLastReceivedMessageDetails()" 
```

:::note
Replace RECEIVER_DEPLOYED_ADDRESS with the contract addresses of your deployed Receiver contract before running the provided cast command.
:::

You should see the received text and message id returned as hex data like this:

```bash
0x6fe4577cdbf2ebf73a9023b3dd9818f990879fec890ac92cf6b8d6f8bc5e59640000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000e48656c6c6f206275696c64657273000000000000000000000000000000000000

```

To convert the hex data to string especially for the received text, run the command below:

```bash
cast to-utf8 e48656c6c6f206275696c64657273000000000000000000000000000000000000
```
Now you should see **Hello builders** meaning our cross-chain action was successful. 

:::note
These example contracts are designed to work bi-directionally. You can use them to send data from Kairos Testnet to Ethereum Sepolia and from Ethereum Sepolia back to Kairos Testnet.
:::

### Send data and pay in native

In this section, you will send a text message with CCIP and pay the fee in the native token. You will send from Ethereum Sepolia to Kaia (Kairos Testnet). This reverses the earlier direction, so the Sepolia contract acts as the sender and the Kairos contract acts as the receiver.


First we need to fund the sender contract with ETH  on Ethereum Sepolia. To do so, run the following cast command:

```bash
cast send --rpc-url $ETH_SEPOLIA_RPC_URL `SENDER_DEPLOYED_ADDRESS` --value 300000000000000000 --account deployer
```
> This sends **0.3 ETH** on Ethereum Sepolia to your sender contract.

:::note
Replace SENDER_DEPLOYED_ADDRESS with the sender contract address.
:::

Next is to allow destination chain from the sender contract on Ethereum Sepolia. To do so, run the command below:

```bash
cast send `SENDER_DEPLOYED_ADDRESS` --rpc-url $ETH_SEPOLIA_RPC_URL "allowlistDestinationChain(uint64, bool)" $KAIROS_CHAIN_SELECTOR true --account deployer
```

Next is to allow source chain from the receiver contract on Kairos Testnet. To do so, run the command below:

```bash
cast send `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $KAIROS_RPC_URL "allowlistSourceChain(uint64, bool)" $ETH_SEPOLIA_CHAIN_SELECTOR true --account deployer
```

Then execute the allowlistSender on receiver contract on Kairos Testnet by running the command below:
 
```bash
cast send `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $KAIROS_RPC_URL "allowlistSender(address, bool)" 0x09a0CF7628c64c683B9d61a8B9EBc14BB984c65c true --account deployer
```
Having wired your contracts together, you can run this command to send data to the receiver contract :

```bash
cast send `SENDER_DEPLOYED_ADDRESS` --rpc-url $ETH_SEPOLIA_RPC_URL "sendMessagePayNative(uint64, address, string)" $KAIROS_CHAIN_SELECTOR 0x12798F1E2013A110E3C8B23aC1f36c00B8DFD4d9 "gKaia Builders" --account deployer
```

The command above calls the *sendMessagePayNative(uint64, address, string)* to send a message. The parameters passed in to the method include: The chain selector to the destination chain (Kairos Testnet), the receiver contract address, and the text data to be included in the message (gKaia Builders).

After running the command, a unique messageId should be returned.

Once the transaction has been finalized, it will take a few minutes for CCIP to deliver the data to Kairos Testnet and call the ccipReceive function on the Receiver contract. To verify  your cross-chain transaction, open the [CCIP explorer](https://ccip.chain.link) and search using the transaction hash.

![](/img/build/tools/ccip-eth-kaia.png)


The next thing to do is to check the receiver contract on the destination chain. To do so, you will call the *getLastReceivedMessageDetails()* by running the command below:

```bash
cast call `RECEIVER_DEPLOYED_ADDRESS` --rpc-url $KAIROS_RPC_URL "getLastReceivedMessageDetails()" 
```

:::note
Replace RECEIVER_DEPLOYED_ADDRESS with the contract addresses of your receiver contract.
:::

You should see the received text and message id returned as hex data like this:

```bash
0xb4c00b6de96488f16868a8c12878d491a85c64173078650a8ffad8f67e759f800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000e674b616961206275696c64657273000000000000000000000000000000000000
```

To convert the hex data to string especially for the received text, run the command below:

```bash
cast to-utf8 674b616961206275696c64657273000000000000000000000000000000000000
```
Now you should see **gKaia builders** meaning our cross-chain action was successful. 

## Conclusion

In this tutorial, you learned how to use Chainlink CCIP to send messages from Kaia Kairos Testnet to another chain Ethereum Sepolia and vice versa. For more in-depth guides on Chainlink CCIP and how it works, please refer to [Chainlink CCIP Documentation](https://docs.chain.link/ccip/tutorials/evm).

































