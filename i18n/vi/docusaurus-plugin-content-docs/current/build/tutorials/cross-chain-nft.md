# Xây dựng NFT đa chuỗi trên Kaia với Chainlink CCIP: Hướng dẫn thực hành

## Giới thiệu

NFT đã trở thành một trong những ứng dụng nổi bật nhất của công nghệ blockchain, cho phép tạo ra các tài sản kỹ thuật số duy nhất và có thể xác minh. Tuy nhiên, các triển khai NFT truyền thống bị giới hạn trong một blockchain duy nhất. Hạn chế này làm giảm tính linh hoạt và ngăn cản tài sản di chuyển tự do giữa các hệ sinh thái, nơi các cộng đồng, thanh khoản và tính hữu dụng có thể khác nhau.

NFTs xuyên chuỗi giải quyết thách thức này bằng cách cho phép NFTs di chuyển một cách liền mạch giữa các chuỗi khối trong khi vẫn giữ nguyên tính duy nhất và nguồn gốc của chúng. Với giao thức tương tác chuỗi chéo (CCIP) của Chainlink, các nhà phát triển có thể xây dựng các cầu nối đáng tin cậy giữa các chuỗi bằng cách sử dụng một khung làm việc tin nhắn tiêu chuẩn và an toàn.

Trong hướng dẫn này, bạn sẽ tạo và triển khai một NFT Crosschain sử dụng mô hình đốt và đúc. Một NFT sẽ được đốt trên chuỗi nguồn và đúc lại trên chuỗi đích với cùng tokenId và metadata, đảm bảo rằng chỉ có một bản sao hợp lệ tồn tại tại bất kỳ thời điểm nào.

## Điều kiện tiên quyết

Trước khi bắt đầu, hãy đảm bảo rằng bạn đã có các thiết lập sau:

- [Node.js](https://nodejs.org/) và [npm](https://www.npmjs.com/)
- Mũ bảo hộ
  - Cài đặt: `npm install --save-dev hardhat`
  - Khởi tạo dự án: `npx hardhat --init`
- [MetaMask](https://metamask.io/en-GB/download) ví
  - Tạo hoặc thiết lập ví phát triển.
  - Thêm cả mạng thử nghiệm Kaia Kairos Testnet và mạng Ethereum Sepolia vào MetaMask.
- Kiểm tra token từ các vòi nước
  - [KAIA](https://faucet.kaia.io/): Thanh toán phí gas trên Kaia khi triển khai hợp đồng hoặc gửi giao dịch.
  - [LINK](https://faucets.chain.link/kaia-testnet) (testnet): Miễn phí CCIP khi thanh toán bằng LINK.
  - [Sepolia ETH](https://faucets.chain.link/sepolia): thanh toán phí gas trên Sepolia và cũng có thể thanh toán phí CCIP bằng ETH gốc nếu được chọn.
- Tài khoản [Filebase](https://filebase.com/)
  - Cần tải lên và truy xuất metadata của NFT (lưu trữ IPFS).

## Các NFT xuyên chuỗi hoạt động như thế nào?

Một NFT là một token kỹ thuật số duy nhất được ghi lại trên một blockchain duy nhất. Hành vi cốt lõi của nó, bao gồm việc đúc, chuyển nhượng và quyền sở hữu, được xác định bởi một hợp đồng thông minh liên kết với chuỗi đó. Do đó, một NFT không thể tự nhiên di chuyển giữa các blockchain mà không có các cơ chế bổ sung. Để đảm bảo khả năng tương tác, các nhà phát triển triển khai các hợp đồng phụ trợ trên nhiều chuỗi khối và kết nối chúng thông qua tin nhắn xuyên chuỗi. Kết quả là một NFT xuyên chuỗi: các token tương đương tồn tại trên nhiều blockchain, nhưng chỉ có một bản sao hoạt động tại bất kỳ thời điểm nào.

NFT xuyên chuỗi thường được triển khai theo một trong ba cách sau:

- **Đốt và đúc**: NFT được đốt trên chuỗi nguồn, sau đó một bản sao tương đương được đúc trên chuỗi đích.

- **Khóa và đúc**: NFT được khóa trên chuỗi nguồn và một bản sao được đúc trên chuỗi đích. Để khôi phục, bạn cần xóa bản sao để mở khóa bản gốc.

- **Khóa và mở khóa**: Các bộ sưu tập giống hệt nhau được triển khai trên nhiều chuỗi. Chủ sở hữu khóa NFT trên một chuỗi để mở khóa phiên bản tương ứng trên chuỗi khác, đảm bảo chỉ có một bản sao có thể được sử dụng tại một thời điểm.

Trong hướng dẫn này, chúng ta sẽ sử dụng mô hình burn and mint cho NFT Crosschain của mình. NFT sẽ được gỡ bỏ khỏi một chuỗi khối và tạo lại trên một chuỗi khối khác, với toàn bộ quá trình được hỗ trợ bởi Chainlink CCIP.

## Bắt đầu

Trong hướng dẫn này, bạn sẽ tạo và chuyển NFT chuỗi chéo giữa Kaia Kairos Testnet và Ethereum Sepolia bằng cách sử dụng Chainlink CCIP.

Cuối cùng, bạn sẽ có thể:

- Khởi tạo một dự án Hardhat được cấu hình cho cả mạng thử nghiệm Kairos và Ethereum Sepolia.
- Thêm các hợp đồng và giao diện Chainlink CCIP làm phụ thuộc.
- Triển khai hợp đồng NFT đa chuỗi có cơ chế đốt và đúc để hỗ trợ chuyển giao giữa các chuỗi khối.
- Triển khai hợp đồng thông minh lên cả hai mạng lưới và chuyển NFT qua các chuỗi khối.

### Tạo dự án Hardhat

Trong hướng dẫn này, chúng ta sẽ sử dụng [Hardhat 3](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3) để triển khai và tương tác với hợp đồng của mình. Hardhat 3 cung cấp các tính năng mới như hỗ trợ tích hợp cho kho khóa mã hóa, khả năng viết thử nghiệm bằng Solidity và cải tiến công cụ quản lý dự án.

Thực hiện các bước sau để thiết lập dự án của bạn:

1. Kiểm tra cài đặt Node.js và npm

   Chạy các lệnh sau để kiểm tra xem Node.js và npm đã được cài đặt hay chưa:

```bash
node -v
npm -v
```

2. Tạo một thư mục dự án mới

   Tạo một thư mục mới, truy cập vào thư mục đó và khởi tạo một dự án Node.js:

```bash
mkdir ccip-nft-kaia-hardhat-example  
cd ccip-nft-kaia-hardhat-example  
npm init -y  
```

3. Tạo dự án Hardhat

   Chạy:

```bash
npx hardhat --init 
```

Khi được yêu cầu, hãy chọn dự án mẫu bao gồm trình chạy thử nghiệm Node.js và ethers. Khởi tạo nó trong thư mục hiện tại và cài đặt tất cả các phụ thuộc cần thiết.

### Cài đặt các hợp đồng bắt buộc

Cài đặt các hợp đồng Chainlink CCIP:

```bash
npm i @chainlink/contracts-ccip --save-dev
```

Cài đặt các hợp đồng Chainlink tiêu chuẩn:

```bash
npm i @chainlink/contracts --save-dev
```

Cài đặt các hợp đồng OpenZeppelin (cung cấp các triển khai cơ bản như ERC-721 và các tiêu chuẩn khác):

```bash
npm i @openzeppelin/contracts --save-dev
```

## Cấu hình metadata NFT

Trước khi soạn thảo hợp đồng, hãy xác định các thông số kỹ thuật của NFT mà chúng ta sẽ đúc. Mỗi NFT cần có metadata mô tả tên, mô tả và hình ảnh của nó, được lưu trữ trong một tệp JSON và lưu trữ trên IPFS.

Trong hướng dẫn này, chúng ta sẽ sử dụng Filebase để lưu trữ cả hình ảnh và metadata. Nếu bạn muốn tạo NFT của riêng mình, hãy tải lên hình ảnh và tệp JSON metadata của bạn lên IPFS thông qua Filebase. Sau khi tải lên, nhấp vào tên tệp trong tab Tệp và sao chép URL IPFS. Nó sẽ trông tương tự như sau:

```bash
https://disastrous-turquoise-parakeet.myfilebase.com/ipfs/QmY1LZF8JHo2r3h4X5VzLLXtJujqnBFGTyo2aqR9joXnt8 
```

Dưới đây là một tệp metadata mẫu mà bạn có thể sử dụng:

```json
{
    "name": "Kairos NFT",
    "description": "gkaia frens! gazuaaaaa!!!",
    "image": "https://disastrous-turquoise-parakeet.myfilebase.com/ipfs/QmRvQc4wZCp6NF7dFL4ywiWTG7FSH3KKGUAkXGgsdYfcKi"
}
```

## Viết Hợp đồng thông minh

Trong phần này, bạn sẽ triển khai hợp đồng cho phép chuyển nhượng NFT giữa các blockchain bằng mô hình đốt và đúc (burn-and-mint) được hỗ trợ bởi Chainlink CCIP.

Tạo một tệp mới trong thư mục hợp đồng của dự án có tên `CrosschainNFT.sol`, và dán mã sau vào tệp đó:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Client} from "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";
import {IAny2EVMMessageReceiver} from "@chainlink/contracts-ccip/contracts/interfaces/IAny2EVMMessageReceiver.sol";
import {OwnerIsCreator} from "@chainlink/contracts/src/v0.8/shared/access/OwnerIsCreator.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
 // Source chain is Ethereum Sepolia
 // Destination chain is Kairos Testnet
contract CrosschainNFT is ERC721, ERC721URIStorage, ERC721Burnable, IAny2EVMMessageReceiver, ReentrancyGuard, OwnerIsCreator {
    using SafeERC20 for IERC20;
    enum PayFeesIn {
        Native,
        LINK
    }
    error InvalidRouter(address router);
    error OnlyOnEthereumSepolia();
    error NotEnoughBalanceForFees(uint256 currentBalance, uint256 calculatedFees);
    error NothingToWithdraw();
    error FailedToWithdrawEth(address owner, address target, uint256 value);
    error ChainNotEnabled(uint64 chainSelector);
    error SenderNotEnabled(address sender);
    error OperationNotAllowedOnCurrentChain(uint64 chainSelector);
    struct crosschainNFTDetails {
        address crosschainNFTAddress;
        bytes ccipExtraArgsBytes;
    }
    uint256 constant ETHEREUM_SEPOLIA_CHAIN_ID = 11155111;
    string tokenNFTURI = "https://disastrous-turquoise-parakeet.myfilebase.com/ipfs/QmY1LZF8JHo2r3h4X5VzLLXtJujqnBFGTyo2aqR9joXnt8";
    IRouterClient internal immutable i_ccipRouter;
    LinkTokenInterface internal immutable i_linkToken;
    uint64 private immutable i_currentChainSelector;
    uint256 private _nextTokenId;
    mapping(uint64 destChainSelector => crosschainNFTDetails crosschainNFTPerChain) public s_chains;
    event ChainEnabled(uint64 chainSelector, address xNftAddress, bytes ccipExtraArgs);
    event ChainDisabled(uint64 chainSelector);
    event CrossChainSent(
        address from, address to, uint256 tokenId, uint64 sourceChainSelector, uint64 destinationChainSelector
    );
    event CrossChainReceived(
        address from, address to, uint256 tokenId, uint64 sourceChainSelector, uint64 destinationChainSelector
    );
    modifier onlyRouter() {
        if (msg.sender != address(i_ccipRouter)) {
            revert InvalidRouter(msg.sender);
        }
        _;
    }
    modifier onlyOnEthereumSepolia() {
        if (block.chainid != ETHEREUM_SEPOLIA_CHAIN_ID) {
            revert OnlyOnEthereumSepolia();
        }
        _;
    }
    modifier onlyEnabledChain(uint64 _chainSelector) {
        if (s_chains[_chainSelector].crosschainNFTAddress == address(0)) {
            revert ChainNotEnabled(_chainSelector);
        }
        _;
    }
    modifier onlyEnabledSender(uint64 _chainSelector, address _sender) {
        if (s_chains[_chainSelector].crosschainNFTAddress != _sender) {
            revert SenderNotEnabled(_sender);
        }
        _;
    }
    modifier onlyOtherChains(uint64 _chainSelector) {
        if (_chainSelector == i_currentChainSelector) {
            revert OperationNotAllowedOnCurrentChain(_chainSelector);
        }
        _;
    }
    constructor(address ccipRouterAddress, address linkTokenAddress, uint64 currentChainSelector)
        ERC721("Cross Chain NFT", "XNFT")
    {
        if (ccipRouterAddress == address(0)) revert InvalidRouter(address(0));
        i_ccipRouter = IRouterClient(ccipRouterAddress);
        i_linkToken = LinkTokenInterface(linkTokenAddress);
        i_currentChainSelector = currentChainSelector;
    }
    function mint() external onlyOnEthereumSepolia {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenNFTURI);
    }
    function enableChain(uint64 chainSelector, address crosschainNFTAddress, bytes memory ccipExtraArgs)
        external
        onlyOwner
        onlyOtherChains(chainSelector)
    {
        s_chains[chainSelector] = crosschainNFTDetails({crosschainNFTAddress: crosschainNFTAddress, ccipExtraArgsBytes: ccipExtraArgs});
        emit ChainEnabled(chainSelector, crosschainNFTAddress, ccipExtraArgs);
    }
    function disableChain(uint64 chainSelector) external onlyOwner onlyOtherChains(chainSelector) {
        delete s_chains[chainSelector];
        emit ChainDisabled(chainSelector);
    }
    function crossChainTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        uint64 destinationChainSelector,
        PayFeesIn payFeesIn
    ) external nonReentrant onlyEnabledChain(destinationChainSelector) returns (bytes32 messageId) {
        string memory tokenUri = tokenURI(tokenId);
        _burn(tokenId);
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(s_chains[destinationChainSelector].crosschainNFTAddress),
            data: abi.encode(from, to, tokenId, tokenUri),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: s_chains[destinationChainSelector].ccipExtraArgsBytes,
            feeToken: payFeesIn == PayFeesIn.LINK ? address(i_linkToken) : address(0)
        });
        // Get the fee required to send the CCIP message
        uint256 fees = i_ccipRouter.getFee(destinationChainSelector, message);
        if (payFeesIn == PayFeesIn.LINK) {
            if (fees > i_linkToken.balanceOf(address(this))) {
                revert NotEnoughBalanceForFees(i_linkToken.balanceOf(address(this)), fees);
            }
            // Approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
            i_linkToken.approve(address(i_ccipRouter), fees);
            // Send the message through the router and store the returned message ID
            messageId = i_ccipRouter.ccipSend(destinationChainSelector, message);
        } else {
            if (fees > address(this).balance) {
                revert NotEnoughBalanceForFees(address(this).balance, fees);
            }
            // Send the message through the router and store the returned message ID
            messageId = i_ccipRouter.ccipSend{value: fees}(destinationChainSelector, message);
        }
        emit CrossChainSent(from, to, tokenId, i_currentChainSelector, destinationChainSelector);
    }
    /// @inheritdoc IAny2EVMMessageReceiver
    function ccipReceive(Client.Any2EVMMessage calldata message)
        external
        virtual
        override
        onlyRouter
        nonReentrant
        onlyEnabledChain(message.sourceChainSelector)
        onlyEnabledSender(message.sourceChainSelector, abi.decode(message.sender, (address)))
    {
        uint64 sourceChainSelector = message.sourceChainSelector;
        (address from, address to, uint256 tokenId, string memory tokenUri) =
            abi.decode(message.data, (address, address, uint256, string));
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
        emit CrossChainReceived(from, to, tokenId, sourceChainSelector, i_currentChainSelector);
    }
    function withdraw(address _beneficiary) public onlyOwner {
        uint256 amount = address(this).balance;
        if (amount == 0) revert NothingToWithdraw();
        (bool sent,) = _beneficiary.call{value: amount}("");
        if (!sent) revert FailedToWithdrawEth(msg.sender, _beneficiary, amount);
    }
    function withdrawToken(address _beneficiary, address _token) public onlyOwner {
        uint256 amount = IERC20(_token).balanceOf(address(this));
        if (amount == 0) revert NothingToWithdraw();
        IERC20(_token).safeTransfer(_beneficiary, amount);
    }
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    function getCCIPRouter() public view returns (address) {
        return address(i_ccipRouter);
    }
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return interfaceId == type(IAny2EVMMessageReceiver).interfaceId || super.supportsInterface(interfaceId);
    }
}
```

### Hướng dẫn chi tiết về mã nguồn

CrosschainNFT là một hợp đồng ERC-721 tích hợp Chainlink CCIP để chuyển NFT giữa các blockchain. Nó đốt NFT trên chuỗi nguồn và đúc lại nó trên chuỗi đích với cùng tokenId và tokenURI. Hợp đồng duy trì một danh sách các chuỗi đích được phê duyệt thông qua enableChain, sử dụng Chainlink Router (IRouterClient) cho việc truyền tin giữa các chuỗi, và hỗ trợ thanh toán phí bằng cả token gas gốc hoặc LINK.

Các chức năng chính

- Kích hoạt chuỗi

Cho phép chủ sở hữu hợp đồng đăng ký một blockchain đích. Nó lưu trữ địa chỉ hợp đồng NFT đối tác và các tham số CCIP trong bản đồ s_chains, cho phép chuỗi đó là mục tiêu chuyển nhượng hợp lệ. Sự kiện ChainEnabled được phát ra khi quá trình thiết lập hoàn tất.

- Chuyển giao chuỗi chéo từ

Thực hiện việc chuyển giao NFT giữa các chuỗi khối. Nó trước tiên kiểm tra xem chuỗi đích đã được kích hoạt hay chưa, sau đó lấy metadata của NFT (tokenURI) và đốt token trên chuỗi nguồn. Tiếp theo, nó tạo một tin nhắn CCIP chứa thông tin chuyển khoản, tính toán phí cần thiết và thanh toán bằng LINK hoặc gas gốc. Khi tin nhắn được gửi qua router, sự kiện CrossChainSent được phát ra để ghi lại giao dịch.

Bây giờ khi đã hiểu rõ luồng chính của `CrosschainNFT.sol`, chúng ta hãy tiếp tục sang bước tiếp theo.

## Biên dịch các hợp đồng thông minh

Để biên dịch các hợp đồng thông minh của bạn, hãy chạy:

```bash
npx hardhat build
```

## Triển khai Hợp đồng thông minh

Trong phần này, chúng ta sẽ cấu hình các biến cần thiết và sau đó triển khai hợp đồng `CrosschainNFT.sol` trên cả Ethereum Sepolia (chuỗi nguồn) và Kairos Testnet (chuỗi đích).

### Sử dụng Kho khóa được mã hóa

Một trong những lợi ích của Hardhat 3 là khả năng lưu trữ các giá trị nhạy cảm, chẳng hạn như khóa riêng tư và URL RPC, trong một kho khóa được mã hóa thay vì các tệp văn bản thuần túy. Trong hướng dẫn này, chúng ta sẽ mã hóa _PRIVATE_KEY_ và _RPC URLs_ cho Sepolia và Kairos.

**Thêm khóa riêng của bạn**

```bash
npx hardhat keystore set PRIVATE_KEY
```

Lần đầu tiên bạn chạy lệnh này, Hardhat sẽ yêu cầu bạn tạo mật khẩu cho kho khóa. Bạn sẽ cần mật khẩu này mỗi khi thêm hoặc cập nhật giá trị.

**Thêm URL RPC cho từng mạng**

```bash
npx hardhat keystore set KAIROS_RPC_URL
npx hardhat keystore set SEPOLIA_RPC_URL
```

Cuối cùng, chỉnh sửa tệp `hardhat.config.ts` của bạn để tải các giá trị đã được mã hóa này và cấu hình hai mạng.

```typescript
import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable } from "hardhat/config";
const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    kairosTestnet: {
      type: "http",
      chainType: "l1",
      url: configVariable("KAIROS_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
    ethereumSepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
};
export default config;
```

Bước tiếp theo là triển khai hợp đồng thông minh CrosschainNFT lên Ethereum Sepolia và Kairos Testnet tương ứng.

### Triển khai CrosschainNFT.sol lên Ethereum Sepolia

Trước khi triển khai, hãy lấy các giá trị sau cho Ethereum Sepolia từ [Chainlink CCIP Directory](https://docs.chain.link/ccip/directory/testnet/chain/ethereum-testnet-sepolia):

- Chọn chuỗi
- Địa chỉ router CCIP
- Địa chỉ token LINK

Các giá trị này sẽ được yêu cầu trong kịch bản triển khai của bạn. Tiếp theo, truy cập vào thư mục _ignition/modules_ trong dự án của bạn và tạo một tệp mới có tên: `deployEthereumSepolia.ts`, sau đó dán mã sau vào tệp đó:

```typescript
// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const ETHEREUM_SEPOLIA_ROUTER_ADDRESS = `0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59`;
const ETHEREUM_SEPOLIA_LINK_TOKEN_ADDRESS = `0x779877A7B0D9E8603169DdbD7836e478b4624789`;
const ETHEREUM_SEPOLIA_CHAIN_SELECTOR = `16015286601757825753`;
const CrosschainNFTSepoliaModule = buildModule("CrosschainNFTSepoliaModule", (m) => {
  const crosschainNFTSepolia = m.contract("CrosschainNFT", [ETHEREUM_SEPOLIA_ROUTER_ADDRESS, ETHEREUM_SEPOLIA_LINK_TOKEN_ADDRESS, ETHEREUM_SEPOLIA_CHAIN_SELECTOR], {
  });
  return { crosschainNFTSepolia };
});
export default CrosschainNFTSepoliaModule;
```

Chạy kịch bản triển khai:

```bash
npx hardhat ignition deploy ignition/modules/deployEthereumSepolia.ts --network ethereumSepolia
```

### Triển khai CrosschainNFT.sol lên mạng thử nghiệm Kairos.

Trước khi triển khai, hãy lấy các giá trị sau cho Kairos Testnet từ [Chainlink CCIP Directory](https://docs.chain.link/ccip/directory/testnet/chain/kaia-testnet-kairos):

- Chọn chuỗi
- Địa chỉ router CCIP
- Địa chỉ token LINK

Các giá trị này sẽ được yêu cầu trong kịch bản triển khai của bạn. Tiếp theo, truy cập vào thư mục _ignition/modules_ trong dự án của bạn và tạo một tệp mới có tên: `deployKairosTestnet.ts`, sau đó dán mã sau vào tệp đó:

```typescript
// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const KAIROS_TESTNET_ROUTER_ADDRESS = `0x41477416677843fCE577748D2e762B6638492755`;
const KAIROS_TESTNET_LINK_TOKEN_ADDRESS = `0xAF3243f975afe2269Da8Ffa835CA3A8F8B6A5A36`;
const KAIROS_TESTNET_CHAIN_SELECTOR = `2624132734533621656`;
const CrosschainNFTKairosModule = buildModule("CrosschainNFTKairosModule", (m) => {
  const crosschainNFTKairos = m.contract("CrosschainNFT", [KAIROS_TESTNET_ROUTER_ADDRESS, KAIROS_TESTNET_LINK_TOKEN_ADDRESS, KAIROS_TESTNET_CHAIN_SELECTOR], {
  });
  return { crosschainNFTKairos };
});
export default CrosschainNFTKairosModule;
```

Chạy kịch bản triển khai:

```bash
npx hardhat ignition deploy ignition/modules/deployKairosTestnet.ts --network kairosTestnet
```

## Tương tác với Hợp đồng thông minh

Trong phần này, chúng ta sẽ tương tác với hợp đồng thông minh CrosschainNFT đã được triển khai bằng cách thực thi các hàm enableChain, mint và crosschainTransfer tương ứng.

### Bước 1: Trên Ethereum Sepolia, gọi hàm enableChain

Chuẩn bị các giá trị sau đây trước khi gọi hàm enableChain:

- **Địa chỉ hợp đồng Sepolia**: Địa chỉ của hợp đồng CrosschainNFT.sol được triển khai trên mạng Ethereum Sepolia.
- **Địa chỉ hợp đồng Kairos**: Địa chỉ của hợp đồng CrosschainNFT.sol được triển khai trên mạng thử nghiệm Kairos.
- **Chọn chuỗi**: 2624132734533621656 (mã chọn chuỗi CCIP cho mạng thử nghiệm Kairos).
- **CCIP extraArgs**: 0x97a657c9000000000000000000000000000000000000000000000000000000000007A120 (Đây là giá trị mã hóa mặc định của extraArgs với giới hạn gas được đặt là 500.000).

Tiếp theo, tạo một tệp TypeScript mới trong thư mục scripts, đặt tên là: `enableChainSepolia.ts` và dán mã sau vào tệp đó:

```typescript
// scripts/enableChainSepolia.ts
import { network } from "hardhat";
async function main() {
  const connection = await network.connect({
    network: "ethereumSepolia"
  });
  const { ethers } = connection;
  const [signer] = await ethers.getSigners();
  console.log(`Using account: ${signer.address}`);
  // Get the contract factory by name
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);
  // Contract addresses and parameters
  const crosschainNFTAddressEthereumSepolia = `0xb1fe42BBd7842703820C7480c22409b872319B22`;
  const crosschainNFTAddressKairosTestnet = `0x8c464Bb9Bf364F68b898ed0708b8f5F66EF6Cfb1`;
  const chainSelectorKairosTestnet = `2624132734533621656`;
  const ccipExtraArgs = `0x97a657c9000000000000000000000000000000000000000000000000000000000007A120`;
  // Attach to the deployed contract
  const crosschainNFTSepolia = CrosschainNFT.attach(crosschainNFTAddressEthereumSepolia);
  console.log(`Enabling chain for Kairos Testnet...`);
  const tx = await crosschainNFTSepolia.enableChain(
    chainSelectorKairosTestnet,
    crosschainNFTAddressKairosTestnet,
    ccipExtraArgs
  );
  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);
  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`Chain enabled successfully!`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Gọi hàm bằng cách chạy lệnh sau:

```bash
npx hardhat run scripts/enableChainSepolia.ts --network ethereumSepolia
```

### Bước 2: Trên mạng thử nghiệm Kairos, gọi hàm enableChain

Chuẩn bị các giá trị sau đây trước khi gọi hàm enableChain:

- **Địa chỉ hợp đồng Kairos**: Địa chỉ của hợp đồng CrosschainNFT.sol được triển khai trên mạng thử nghiệm Kairos.
- **Địa chỉ hợp đồng Sepolia**: Địa chỉ của hợp đồng CrosschainNFT.sol được triển khai trên mạng Ethereum Sepolia.
- **Chuỗi chọn**: 16015286601757825753 (chuỗi chọn CCIP cho mạng thử nghiệm Kairos)
- **CCIP extraArgs**: 0x97a657c9000000000000000000000000000000000000000000000000000000000007A120 (Đây là giá trị mã hóa mặc định của extraArgs với giới hạn gas được đặt là 500.000)

Tiếp theo, tạo một tệp TypeScript mới trong thư mục scripts, đặt tên là: `enableChainKairos.ts`  và dán mã sau vào tệp đó:

```typescript
// scripts/enableChainKairos.ts
import { network } from "hardhat";
async function main() {
  const connection = await network.connect({
    network: "kairosTestnet"
  });
  const { ethers } = connection;
  const [signer] = await ethers.getSigners();
  console.log(`Using account: ${signer.address}`);
  // Get the contract factory by name
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);
  // Contract addresses and parameters 
  const crosschainNFTAddressKairosTestnet = `0x8c464Bb9Bf364F68b898ed0708b8f5F66EF6Cfb1`;
  const crosschainNFTAddressEthereumSepolia = `0xb1fe42BBd7842703820C7480c22409b872319B22`;
  const chainSelectorEthereumSepolia = `16015286601757825753`;
  const ccipExtraArgs = `0x97a657c9000000000000000000000000000000000000000000000000000000000007A120`;
  // Attach to the deployed contract on Kairos
  const crosschainNFTKairos = CrosschainNFT.attach(crosschainNFTAddressKairosTestnet);
  console.log(`Enabling chain for Ethereum Sepolia...`);
  const tx = await crosschainNFTKairos.enableChain(
    chainSelectorEthereumSepolia,         
    crosschainNFTAddressEthereumSepolia,    
    ccipExtraArgs                 
  );
  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);
  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`Chain enabled successfully!`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Gọi hàm bằng cách chạy lệnh sau:

```bash
npx hardhat run scripts/enableChainKairos.ts --network KairosTestnet
```

### Bước 3: Tài trợ hợp đồng bằng LINK trên Ethereum Sepolia

Để thanh toán phí CCIP, hãy nạp tiền vào hợp đồng CrosschainNFT được triển khai trên Ethereum Sepolia (crosschainNFTAddressEthereumSepolia) bằng LINK. Bạn có thể nhận mã thử nghiệm LINK từ [vòi nước](https://faucets.chain.link/sepolia) được cung cấp. Đối với hướng dẫn này, việc gửi 3 LINK là đủ.

![](/img/build/tutorials/cc-ccip-fund-link.png)

### Bước 4: Tạo một NFT chuỗi chéo mới trên Ethereum Sepolia

Tiếp theo, tạo một NFT mới trên hợp đồng CrosschainNFT đã được triển khai trên Ethereum Sepolia.

Tạo một tệp TypeScript mới trong thư mục scripts, đặt tên là `mint.ts` và dán mã sau vào tệp đó:

```typescript
// scripts/mint.ts
import { network } from "hardhat";
async function main() {
  // Connect to the network
  const connection = await network.connect({
    network: "ethereumSepolia"
  });
if (connection.networkName !== "ethereumSepolia") {
    console.error(`Must be called from Ethereum Sepolia`);
    process.exitCode = 1;
    return;
  }
  const { ethers } = connection;
  const [signer] = await ethers.getSigners();
  console.log(`Using account: ${signer.address}`);
  // Get the contract factory
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);
  const crosschainNFTAddressEthereumSepolia = `0xb1fe42BBd7842703820C7480c22409b872319B22`
  // Attach to the deployed contract
  const crosschainNFT = CrosschainNFT.attach(crosschainNFTAddressEthereumSepolia);
  console.log(`Minting NFT...`);
  const tx = await crosschainNFT.mint();
  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);
  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`NFT minted successfully!`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Kịch bản này sẽ xử lý quá trình đúc NFT và chuẩn bị NFT cho việc chuyển giao chuỗi chéo.

Gọi hàm bằng cách chạy lệnh sau:

```bash
npx hardhat run scripts/mint.ts --network ethereumSepolia
```

### Bước 5: Chuyển NFT giữa các chuỗi khối

Trên Ethereum Sepolia, bạn sẽ gọi hàm crossChainTransferFrom để chuyển NFT của mình sang Kairos Testnet.

Chuẩn bị các giá trị sau:

- **Từ**: Địa chỉ EOA của bạn trên Ethereum Sepolia
- **đến**: địa chỉ EOA của người nhận trên mạng thử nghiệm Kairos (đây cũng có thể là địa chỉ của chính bạn)
- **tokenId**: ID của NFT mà bạn muốn chuyển nhượng
- **destinationChainSelector**: 2624132734533621656 (mã chọn chuỗi CCIP cho mạng thử nghiệm Kairos)
- **payFeesIn**: 1 (cho biết phí CCIP sẽ được thanh toán bằng LINK)

Chạy skript chuyển đổi

Tạo một tệp TypeScript mới trong thư mục scripts, đặt tên là `crossChainTransferNFT.ts` và dán mã sau vào tệp đó:

```typescript
// scripts/crossChainTransferNFT.ts
import { network } from "hardhat";
async function main() {
  // Connect to the network
  const connection = await network.connect({
    network: "ethereumSepolia"
  });
    // Check if we're on the correct network
  if (connection.networkName !== "ethereumSepolia") {
    console.error(`Must be called from Ethereum Sepolia`);
    process.exitCode = 1;
    return;
  }
  const { ethers } = connection;
  const [signer] = await ethers.getSigners();
  console.log(`Using account: ${signer.address}`);
  // Get the contract factory
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);
  const crosschainNFTAddressEthereumSepolia = `0xb1fe42BBd7842703820C7480c22409b872319B22`;
  // Transfer parameters
  const from = `0x7b467A6962bE0ac80784F131049A25CDE27d62Fb`;
  const to = `0x7b467A6962bE0ac80784F131049A25CDE27d62Fb`;
  const tokenId = 0; // Put NFT token id here
  const destinationChainSelector = "2624132734533621656"; // Kairos Testnet
  const payFeesIn = 1; // 0 - Native, 1 - LINK
  // Attach to the deployed contract
  const crosschainNFT = CrosschainNFT.attach(crosschainNFTAddressEthereumSepolia);
  const tx = await crosschainNFT.crossChainTransferFrom(
    from,
    to,
    tokenId,
    destinationChainSelector,
    payFeesIn
  );
  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);
  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`Cross-chain transfer initiated successfully!`);
  console.log(`Note: The NFT will arrive on Kairos Testnet after CCIP processes the message.`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Sau đó, thực thi kịch bản bằng cách:

```bash
npx hardhat run scripts/crossChainTransferNFT.ts --network ethereumSepolia
```

Xác minh giao dịch chuyển khoản

Bạn có thể theo dõi giao dịch chuyển chuỗi trên [CCIP Explorer](https://ccip.chain.link/#/side-drawer/msg/0x2a43cf8076ed6290dd0bf8bdbbc87abe2d238da43b6bf514e70909dd0f35c9db) và xác nhận giao dịch trên [Kaiascan](https://kairos.kaiascan.io/nft/0x7dcdaa882603b1cfeee42d1c382a1ecba595d87c/0?tabId=nftTokenTransfer&page=1).

![](/img/build/tutorials/cc-nft-ccip-explorer.png)

![](/img/build/tutorials/cc-nft-ccip-kaiascan.png)

Khi NFT được đưa lên mạng thử nghiệm Kairos, hãy thêm nó vào ví MetaMask của bạn:

1. Mở tab NFT trong MetaMask.
2. Nhấp vào "Nhập NFT".
3. Nhập địa chỉ hợp đồng CrosschainNFT trên mạng thử nghiệm Kairos và mã tokenId mà bạn đã nhận (ví dụ: 0).

NFT của bạn hiện đã xuất hiện trong ví MetaMask của bạn.

![](/img/build/tutorials/cc-ccip-mm-view-nft.png)

## Kết luận

Trong hướng dẫn này, bạn đã học cách sử dụng Chainlink CCIP để chuyển NFT giữa Kaia Kairos Testnet và Ethereum Sepolia bằng mô hình đốt và đúc.

Để tìm hiểu sâu hơn về CCIP và khám phá các trường hợp sử dụng bổ sung, hãy truy cập tài liệu chính thức [Chainlink CCIP Documentation](https://docs.chain.link/ccip).




