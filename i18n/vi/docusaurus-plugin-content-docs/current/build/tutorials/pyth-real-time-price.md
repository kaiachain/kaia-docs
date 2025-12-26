# Cách lấy giá thời gian thực trên Kaia bằng Python

## Giới thiệu

Pyth là một mạng lưới oracle phi tập trung có cách tiếp cận độc đáo trong một hệ sinh thái chủ yếu được vận hành bởi các oracle dựa trên cơ chế đẩy. Thay vì đẩy dữ liệu đến hợp đồng của bạn theo các khoảng thời gian cố định, Pyth cho phép bạn kéo dữ liệu thực tế theo yêu cầu. Mô hình này cung cấp cho các nhà phát triển quyền kiểm soát nhiều hơn và giúp tránh các bản cập nhật không cần thiết trên chuỗi khối. Với tích hợp này, các nhà phát triển có thể truy xuất dữ liệu thời gian thực và sử dụng mô hình thanh toán theo nhu cầu, trong đó phí chỉ được áp dụng khi có yêu cầu cập nhật.

Trong hướng dẫn này, bạn sẽ học cách sử dụng nguồn dữ liệu giá thời gian thực của Pyth để đọc giá trị của IDR, một loại tiền tệ fiat. Hợp đồng thông minh Solidity của bạn sẽ lấy giá USD/IDR từ Pyth bằng cách sử dụng [pyth-sdk-solidity](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity), và bạn sẽ cập nhật và lấy giá mới nhất bằng cách sử dụng [hermes-client](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/hermes/client/js).

Để bắt đầu nhanh chóng, bạn có thể tìm thấy mã nguồn đầy đủ cho hướng dẫn này trên [GitHub](https://github.com/ayo-klaytn/pyth-kaia-hardhat-example). Điều này cung cấp một tài liệu tham khảo sẵn sàng sử dụng và giúp bạn thiết lập dự án và cài đặt nhanh chóng hơn.

## Điều kiện tiên quyết

Trước khi bắt đầu, hãy đảm bảo bạn có các thứ sau:

- [Node.js và npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

  Yêu cầu cài đặt các gói phụ thuộc và chạy các công cụ phát triển.

- Một ví được nạp bằng token KAIA trên mạng thử nghiệm.

  Bạn sẽ cần KAIA để thanh toán phí triển khai và phí giao dịch trên mạng thử nghiệm Kairos. Bạn có thể yêu cầu KAIA miễn phí trên mạng thử nghiệm (testnet) từ [Kaia Faucet](https://faucet.kaia.io/).

## Cài đặt môi trường phát triển

Trong phần này, bạn sẽ thiết lập môi trường phát triển, biên dịch hợp đồng Oracle của mình và chuẩn bị để triển khai bằng Hardhat.

**1. Tạo Dự án Hardhat**

Tạo một thư mục mới cho dự án của bạn và khởi tạo Hardhat:

```bash
mkdir pyth-kaia-hardhat-example && cd pyth-kaia-hardhat-example
npm init -y
npx hardhat@next --init
```

Chấp nhận các phản hồi mặc định khi được yêu cầu. Trong hướng dẫn này, chúng ta sẽ sử dụng mẫu Mocha và Ethers.

Kiểm tra phiên bản Hardhat để xác minh cài đặt của bạn:

```bash
npx hardhat --version
```

**2. Đặt các bí mật được mã hóa**

Bạn sẽ lưu trữ URL RPC và khóa riêng tư của mình bằng kho khóa được mã hóa của Hardhat.

Chạy các lệnh sau:

```bash
npx hardhat keystore set KAIROS_RPC_URL
npx hardhat keystore set PRIVATE_KEY
```

Hãy đảm bảo nhập mật khẩu và giá trị cho từng biến để giữ chúng được mã hóa.

**3. Tham chiếu các bí mật trong tệp cấu hình của bạn**

Mở tệp `hardhat.config.ts` và cập nhật phần `networks` để tham chiếu đến các bí mật đã được mã hóa. Nếu bạn đã sử dụng các tên bí mật khác nhau, hãy cập nhật các khóa tương ứng.

```typescript
import { configVariable } from "hardhat/config";
module.exports = {
  networks: {
    kairos: {
      url: configVariable("KAIROS_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
};
```

## Tạo hợp đồng và lấy giá từ Pyth Oracles

Trong phần này, bạn sẽ cài đặt [Pyth Solidity SDK](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity), tạo hợp đồng PriceConsumer và triển khai nó bằng Hardhat. Hợp đồng sẽ đọc dữ liệu giá từ Pyth, mà sau đó bạn sẽ cập nhật bằng dữ liệu giá lấy từ Hermes.

### Cài đặt SDK Python

Pyth cung cấp một SDK Solidity cho phép bạn tương tác với các hợp đồng cung cấp dữ liệu giá Pyth trên chuỗi khối. SDK cung cấp giao diện IPyth và các cấu trúc liên quan.

Cài đặt SDK bằng npm:

```bash
npm install --save-dev @pythnetwork/pyth-sdk-solidity
```

### Tạo hợp đồng PriceConsumer

Tạo một tệp mới tại `contracts/PriceConsumer.sol` và thêm mã sau:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
contract PriceConsumer {
    IPyth public pyth;
    constructor(address pythContract) {
        pyth = IPyth(pythContract);
    }
    function updatePrice(bytes[] calldata priceUpdateData)
        external
        payable
    {
        // Pay the Pyth fee for receiving price updates
        uint fee = pyth.getUpdateFee(priceUpdateData);
        require(msg.value >= fee, "Not enough fee sent");
        // Update the Pyth price state
        pyth.updatePriceFeeds{value: fee}(priceUpdateData);
        // Can fetch the price and use it as well
        //PythStructs.Price memory currentBasePrice = pyth.getPriceNoOlderThan(priceFeedId, 60);
    }
    function getLatestPrice(bytes32 priceFeedId) public view returns (int64, int32) {
        // Read the current price from a price feed if it is less than 60 seconds old.
        // Each price feed (e.g., USD/IDR) is identified by a price feed ID.
        // The complete list of feed IDs is available at https://docs.pyth.network/price-feeds/price-feeds
        PythStructs.Price memory currentBasePrice = pyth.getPriceNoOlderThan(priceFeedId, 60);
        
        // uint256 basePrice = PythUtils.convertToUint(
        //   currentBasePrice.price,
        //   currentBasePrice.expo,
        //   18
        // );
        
        return (currentBasePrice.price, currentBasePrice.expo);
    }
}
```

**Hướng dẫn chi tiết**

Hợp đồng Giá cả và Người tiêu dùng:

- Nhập các giao diện và cấu trúc của Pyth từ `@pythnetwork/pyth-sdk-solidity`.
- Cửa hàng:
  - Thực thể hợp đồng Pyth (pyth).
  - Mã nguồn giá cho cặp tiền USD/IDR (usdIdrPriceId).
- Phơi bày phương thức `updateAndGetUsdIdrPrice`, có chức năng:
  - Tính toán phí cập nhật bằng cách sử dụng hàm IPyth.getUpdateFee.
  - Gọi hàm IPyth.updatePriceFeeds với phí yêu cầu.
  - Gọi hàm IPyth.getPriceNoOlderThan để đọc giá USD / IDR mới nhất.
  - Trả về giá gốc, hệ số mũ và thời gian công bố.

Sau đó, client Hermes offchain của bạn sẽ xây dựng mảng bytes priceUpdate và truyền nó vào hàm này khi bạn cần cập nhật giá mới.

### Soạn thảo hợp đồng

Chạy lệnh sau để biên dịch các hợp đồng của bạn:

```
npx hardhat compile
```

## Triển khai Hợp đồng

Để triển khai hợp đồng PriceConsumer, bạn sẽ tạo một mô-đun Ignition và sau đó chạy lệnh triển khai.

**Tạo mô-đun Ignition**

Tạo một tệp mới tại `ignition/modules/PriceConsumer.ts`:

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43"; 
export default buildModule("PriceConsumerModule", (m) => {
  const priceConsumer = m.contract("PriceConsumer", [pythContractAddress]);
  return { priceConsumer };
});
```

**Triển khai hợp đồng**

Triển khai hợp đồng PriceConsumer lên mạng thử nghiệm Kairos bằng mô-đun Ignition của bạn:

```bash
npx hardhat ignition deploy --network kairos ignition/modules/PriceConsumer.ts
```

Khi được yêu cầu, hãy nhập mật khẩu keystore mà bạn đã cấu hình trước đó cho các bí mật được mã hóa của mình.

Sau khi hoàn tất, hợp đồng `PriceConsumer.sol` của bạn sẽ được triển khai trên mạng thử nghiệm Kairos và sẵn sàng để lấy dữ liệu giá USD/IDR theo thời gian thực từ Pyth.

## Tương tác từ TypeScript

Trong bước cuối cùng này, bạn sẽ tương tác với hợp đồng PriceConsumer đã được triển khai bằng TypeScript. Kịch bản này sẽ lấy giá USD/IDR mới nhất bằng cách yêu cầu dữ liệu cập nhật giá từ Pyth thông qua client Hermes và gửi dữ liệu đó lên chuỗi khối.

**Cài đặt các thành phần phụ thuộc**

Cài đặt các gói phần mềm cần thiết:

```bash
npm install --save-dev tsx @pythnetwork/hermes-client @dotenv
```

**Thiết lập tệp .env**

Tạo một tệp .env trong thư mục gốc của dự án và thêm khóa riêng tư của bạn:

```bash
PRIVATE_KEY="0xDEAD....." // REPLACE WITH YOUR PRIVATE KEY
```

**Tạo kịch bản tương tác**

Tạo một tệp mới tại **scripts/interact.ts** và thêm nội dung sau:

```typescript
import { HermesClient } from "@pythnetwork/hermes-client";
import { ethers } from "ethers";
import 'dotenv/config'

// 1. Setup
const hermes = new HermesClient("https://hermes.pyth.network");
const provider = new ethers.JsonRpcProvider(
  "https://public-en-kairos.node.kaia.io"
);

const PK = process.env.PRIVATE_KEY; 
const wallet = new ethers.Wallet(PK, provider);


// 2. Your deployed contract
const priceConsumerAddress = "0x91e89aa32224dEd5dA483a83a4de45bF4bE57caA"; // REPLACE WITH DEPLOYED PRICE CONSUMER CONTRACT

const priceConsumerAbi = [
  "function updatePrice(bytes[] priceUpdateData) external payable",
  "function getLatestPrice(bytes32 priceId) public view returns(int64, int32)",
];

const priceConsumer = new ethers.Contract(
  priceConsumerAddress,
  priceConsumerAbi,
  wallet
);

// 3. Price feed IDs
const priceId =
  "0x6693afcd49878bbd622e46bd805e7177932cf6ab0b1c91b135d71151b9207433"; // FX.USD/IDR Beta Price Feed ID

async function run() {
  // Fetch Hermes price update binary
  const update = await hermes.getLatestPriceUpdates([priceId], {
    encoding: "hex",
  });
  console.log(update);

  const priceUpdateData = ["0x" + update.binary.data]; // must be array of bytes

  console.log(priceUpdateData);

  // Estimate fee required by Pyth contract
  // EVM Network Price Feed Contract Addresses: https://docs.pyth.network/price-feeds/core/contract-addresses/evm

  const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43";
  const pythAbi = [
    "function getUpdateFee(bytes[] calldata data) external view returns(uint)",
  ];
  console.log("Pyth contract address:", pythContractAddress);
  const pyth = new ethers.Contract(pythContractAddress, pythAbi, wallet);
  const fee = await pyth.getUpdateFee(priceUpdateData);
  console.log("Pyth fee:", fee.toString());

  // Call your contract
  const tx = await priceConsumer.updatePrice(priceUpdateData, {
    value: fee, // pay the pyth update fee
    gasLimit: 500000,
  });
  console.log("Tx sent:", tx.hash);
  const receipt = await tx.wait();
  console.log("Tx confirmed");
  console.log(receipt);

  // 4. Get latest price from contract
  try {
    console.log("=== Latest Price from Contract ===");
    const [price, expo] = await priceConsumer.getLatestPrice(priceId);
    console.log("Price Value : " + price.toString());
    console.log("Exponent Value : " + expo.toString());
  } catch (error) {
    console.log(error);
    // @ts-ignore
    console.error("\nError calling getLatestPrice:", error.message);
    console.log(
      "This usually means the price is older than 60 seconds or hasn't been updated yet."
    );
    console.log("Make sure updatePrice() was called successfully first.");
  }
}
run();

```

**Chạy kịch bản**

Chạy kịch bản bằng cách:

```bash
npx tsx scripts/interact.ts
```

**Ví dụ về kết quả đầu ra**

```bash
Tx sent: 0x79c5dcb7abd9605b070bf9062ba2e2382272d23d58f7b50446c3107b7784fc8e
Tx confirmed
=== Latest Price from Contract ===
Price Value : 1669784988
Exponent Value : -5
======== —— =========
```

Giao dịch của bạn có thể được xác minh trên Kairos Explorer bằng cách dán mã giao dịch vào thanh tìm kiếm. Điều này xác nhận rằng các thao tác cập nhật và đọc đã thành công.

## Kết luận

Trong hướng dẫn này, bạn đã tạo một hợp đồng Solidity đọc giá thời gian thực từ Pyth, triển khai nó lên mạng thử nghiệm Kairos và tương tác với nó thông qua client Hermes. Bạn cũng đã tìm hiểu cách thiết kế dựa trên kéo (pull-based design) của Pyth cho phép bạn kiểm soát thời điểm và cách thức cập nhật giá diễn ra.

Để biết thêm thông tin, hãy khám phá:

- [Tham chiếu hợp đồng EVM](https://api-reference.pyth.network/price-feeds/evm/getPriceNoOlderThan) cho API Pyth
- [Ví dụ về AMM của Pyth Oracle](https://github.com/pyth-network/pyth-examples/tree/main/price_feeds/evm) cho một triển khai hoàn chỉnh từ đầu đến cuối.



