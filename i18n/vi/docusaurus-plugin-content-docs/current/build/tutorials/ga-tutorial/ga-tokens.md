# 3. Các loại token được hỗ trợ

Nhà phát triển nên tra cứu danh sách các token được hỗ trợ hiện tại trước khi thực hiện các giao dịch không tốn gas.

## 3.1. Tiêu chí đủ điều kiện của token

- **Tuân thủ ERC-20:** Các token phải tuân thủ hoàn toàn tiêu chuẩn ERC-20.
- **Không tính phí chuyển nhượng:** Các token tính phí chuyển nhượng (FoT) không được hỗ trợ, vì chúng có thể gây ra sự không khớp về số lượng token trong quá trình hoán đổi, dẫn đến giao dịch thất bại.
- **Danh sách trắng quản trị:** `GaslessSwapRouter` duy trì một danh sách các token được hỗ trợ, được quản lý bởi Kaia Foundation.

## 3.2 Các loại token hiện được hỗ trợ

Giao dịch không cần gas hiện tại hỗ trợ các token sau. Các token CL bổ sung và stablecoin có thể được bổ sung trong tương lai.

- **USDT**
- **BORA**

## 3.3 Cách kiểm tra danh sách token được hỗ trợ

Bạn có thể tìm thấy địa chỉ hợp đồng chính thức [KIP-247 GaslessSwapRouter](https://docs.kaia.io/references/contract-addresses/) cho cả mạng chính (mainnet) và mạng thử nghiệm (testnet) trong tài liệu Kaia Docs.

**Địa chỉ hợp đồng GaslessSwapRouter:**

- **Mainnet**: `0xCf658F786bf4AC62D66d70Dd26B5c1395dA22c63`
- **Kairos Testnet**: `0x4b41783732810b731569E4d944F59372F411BEa2`

Luôn tham khảo tài liệu chính thức để biết địa chỉ mới nhất.

### Sử dụng Trình khám phá khối (KaiaScan)

Để kiểm tra các token được hỗ trợ bằng cách sử dụng trình khám phá blockchain như KaiaScan:

![](/img/build/tutorials/ga3.png)

1. Truy cập [KaiaScan](https://kaiascan.io/) (hoặc [kairos.kaiascan.io](https://kairos.kaiascan.io/) để truy cập mạng thử nghiệm).
2. Tìm địa chỉ `GaslessSwapRouter`.
3. Chuyển đến tab **Hợp đồng** và chọn **Đọc hợp đồng**.
4. Tìm hàm `getSupportedTokens()` và nhấp vào **Query**. Điều này sẽ trả về một mảng các địa chỉ token ERC20 được hỗ trợ.

### Tra cứu theo chương trình

Để kiểm tra các token được hỗ trợ một cách tự động, bạn có thể sử dụng các phương thức của hợp đồng GaslessSwapRouter.

**Sử dụng phương pháp GSR:**

```solidity
function getSupportedTokens() external view returns (address[] memory);
function dexAddress(address token) external view returns (address dex); // reverts if token unsupported
```

**Sử dụng SDK (Ví dụ)**

```javascript
// Ethers-ext.js
const ethers = require("ethers6");
const { gasless } = require('@kaiachain/ethers-ext');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const router    = await gasless.getGaslessSwapRouter(provider);
const supported = await router.getSupportedTokens();

// Web3-ext.js
const { Web3 } = require("@kaiachain/web3js-ext");

const provider = new Web3.providers.HttpProvider(RPC_URL);
const web3 = new Web3(provider);

const router    = await gasless.getGaslessSwapRouter(web3);
const supported = await router.methods.getSupportedTokens().call();
```