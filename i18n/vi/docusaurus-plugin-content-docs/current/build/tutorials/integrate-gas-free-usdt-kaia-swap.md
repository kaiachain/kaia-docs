---
id: ""
title: Tích hợp USDT không cần gas vào KAIA Swaps
---



# Tích hợp USDT không cần gas vào KAIA Swaps

Hướng dẫn này cung cấp tổng quan về tính năng Swap USDT sang KAIA không sử dụng gas, bao gồm mục đích, điều kiện tiên quyết, các bước tích hợp và tài liệu tham khảo API. Nó được thiết kế để giúp các nhà phát triển tích hợp khả năng hoán đổi không tốn gas vào các ứng dụng phi tập trung (DApps) của họ trên mạng Kaia.

## Giới thiệu

API `gasFreeSwapKaia` đã được giới thiệu để cho phép người dùng thực hiện các giao dịch hoán đổi token ERC20 không tốn phí gas (hiện tại chỉ hỗ trợ USDT) trên mạng lưới Kaia mà không cần phải nắm giữ token KAIA để thanh toán phí gas, hoặc thậm chí khi thanh toán phí giao dịch thay cho người dùng. API này hỗ trợ việc đổi USDT sang KAIA bằng cách sử dụng chữ ký cho phép ERC20, mang lại trải nghiệm người dùng hoàn toàn không tốn phí gas.

### Lợi ích

- **Trải nghiệm 100% không cần gas**: Người dùng không cần bất kỳ token KAIA nào để thực hiện các giao dịch hoán đổi.
- **Tối ưu hóa quy trình đăng ký người dùng**: Người dùng mới có thể bắt đầu giao dịch token ngay lập tức mà không cần mua KAIA.
- **Tích hợp ERC20 Permit**: Sử dụng chữ ký ERC20 Permit tiêu chuẩn để phê duyệt token an toàn và không tốn gas.

### Cách thức hoạt động

- **Người dùng khởi tạo giao dịch hoán đổi**: Người dùng chọn số lượng USDT để hoán đổi sang KAIA.
- **Frontend tạo giấy phép**: Ứng dụng phi tập trung (DApp) tạo chữ ký giấy phép ERC20 cho người dùng ký.
- **Người dùng ký giấy phép**: Người dùng ký vào thông báo giấy phép (không cần gas)
- **Gọi API của DApp**: Giao diện người dùng gửi các thông số giao dịch và chữ ký cho phép đến API.
- **Backend thực thi**: API xác thực giấy phép, thực hiện giao dịch hoán đổi và thanh toán tất cả phí gas.
- **Người dùng nhận KAIA**: Các token KAIA gốc được gửi trực tiếp vào ví của người dùng.

## Điều kiện tiên quyết và Môi trường được hỗ trợ

**Điểm cuối dịch vụ**

<Tabs>
  <TabItem value="Mainnet" label="Kaia Mainnet">
    https://fee-delegation.kaia.io
  </TabItem>

 <TabItem value="Testnet" label="Kairos Testnet">
    https://fee-delegation-kairos.kaia.io
 </TabItem>
</Tabs>

**Cặp token được hỗ trợ**

Hiện tại, API chỉ hỗ trợ một cặp giao dịch duy nhất:

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet">
    Token vào: USDT (`0xd077a400968890eacc75cdc901f0356c943e4fdb`)

```
Token Out: WKAIA (`0x19aac5f612f524b754ca7e7c41cbfa2e981a4432`)
```

  </TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    Token vào: TEST (`0xcb00ba2cab67a3771f9ca1fa48fda8881b457750`)

```
Token Out: WKAIA (`0x043c471bEe060e00A56CcD02c0Ca286808a5A436`)
```

 </TabItem>
</Tabs>

**Nhận mã thử nghiệm**

Để nhận token TEST cho mạng thử nghiệm Kairos:

- Mở [ERC20 Faucet](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1) trên Kaiascan
- Đi đến tab Hợp đồng, sau đó chọn _Viết Hợp đồng_
- Tìm chức năng yêu cầu (token)
- Dán địa chỉ của một token GA được hỗ trợ trên Kairos (đối với hướng dẫn này, hãy sử dụng địa chỉ cho TEST)
- Nhấp vào _Query_ để gửi yêu cầu. Bạn sẽ nhận được các token TEST của mình trong thời gian ngắn.

![](/img/build/tutorials/test-tokens-faucet.png)

**Yêu cầu của Hợp đồng thông minh**

Giao diện lập trình ứng dụng (API) tương tác với hợp đồng thông minh GaslessERC20PermitSwap, hợp đồng này:

- Hỗ trợ các phê duyệt dựa trên giấy phép theo tiêu chuẩn ERC20.
- Tích hợp với sàn giao dịch phi tập trung (DEX) tương thích với Uniswap V2.
- Chuyển đổi WKAIA sang KAIA gốc một cách tự động.
- Áp dụng giới hạn hoán đổi tối đa cho mục đích bảo mật.

**Yêu cầu của người dùng**

Trên mạng chính, người dùng phải có số dư KAIA bằng 0 để sử dụng dịch vụ hoán đổi không phí gas này. Yêu cầu này đảm bảo dịch vụ chỉ được sử dụng bởi những người dùng thực sự cần giao dịch không cần gas cho mục đích đăng ký. Trong môi trường testnet, hạn chế này được nới lỏng cho mục đích thử nghiệm.

Số tiền hoán đổi tối đa được giới hạn ở mức 1 USDT trên cả mạng chính (mainnet) và mạng thử nghiệm (testnet). Tính năng này được thiết kế để người dùng có thể nhận đủ KAIA để bắt đầu trải nghiệm của họ trên Kaia Chain.

## Các bước tích hợp

### Ví dụ về tích hợp hoàn chỉnh

```javascript
const { JsonRpcProvider, Wallet } = require('@kaiachain/ethers-ext/v6');
const { Contract, parseUnits, formatUnits, Signature } = require('ethers');

async function fetchJson(url, init) {
  if (typeof fetch !== 'undefined') {
    return fetch(url, init);
  }
  const { default: nodeFetch } = await import('node-fetch');
  return nodeFetch(url, init);
}

const GASLESS_SWAP_ABI = [
  'function usdtToken() view returns (address)',
  'function wkaiaToken() view returns (address)',
  'function maxUsdtAmount() view returns (uint256)',
  'function getExpectedOutput(address tokenIn, address tokenOut, uint256 amountIn) view returns (uint256)',
  'function executeSwapWithPermit(address user, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMin, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
];

const ERC20_METADATA_ABI = [
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function nonces(address owner) view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
];

async function buildPermitSignature({ token, owner, spender, value, deadline, domainVersion = '1' }) {
  const [name, version, network, verifyingContract, nonce] = await Promise.all([
    token.name(),
    Promise.resolve(domainVersion),
    owner.provider.getNetwork(),
    token.getAddress(),
    token.nonces(owner.address),
  ]);

  const domain = {
    name,
    version,
    chainId: Number(network.chainId),
    verifyingContract,
  };

  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const message = {
    owner: owner.address,
    spender,
    value,
    nonce,
    deadline,
  };

  return Signature.from(await owner.signTypedData(domain, types, message));
}

async function executeGaslessSwap({
  rpcUrl,
  serverUrl,
  userWallet,
  contractAddress,
  amountIn = '0.01', // Amount in USDT
  slippageBps = 50,   // 0.5% slippage
  permitDeadlineSeconds = 600 // 10 minutes
}) {
  console.log('🚀 Starting gasless swap');

  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = userWallet.connect(provider);
  const swap = new Contract(contractAddress, GASLESS_SWAP_ABI, provider);

  // Get token addresses from contract
  const [tokenInAddress, tokenOutAddress, maxUsdtAmount] = await Promise.all([
    swap.usdtToken(),
    swap.wkaiaToken(),
    swap.maxUsdtAmount(),
  ]);

  const tokenIn = new Contract(tokenInAddress, ERC20_METADATA_ABI, provider);
  const tokenOut = new Contract(tokenOutAddress, ERC20_METADATA_ABI, provider);

  const [tokenInDecimals, tokenOutDecimals, tokenInSymbol, tokenOutSymbol] = await Promise.all([
    tokenIn.decimals(),
    tokenOut.decimals(),
    tokenIn.symbol(),
    tokenOut.symbol(),
  ]);

  const amountInWei = parseUnits(amountIn, tokenInDecimals);
  
  // Check if amount exceeds contract maximum
  if (amountInWei > maxUsdtAmount) {
    throw new Error(`Amount (${amountIn} ${tokenInSymbol}) exceeds contract cap (${formatUnits(maxUsdtAmount, tokenInDecimals)} ${tokenInSymbol})`);
  }

  // Get expected output and calculate minimum with slippage
  const expectedOut = await swap.getExpectedOutput(tokenInAddress, tokenOutAddress, amountInWei);
  const amountOutMin = (expectedOut * BigInt(10_000 - slippageBps)) / 10_000n;

  // Create permit signature
  const deadline = BigInt(Math.floor(Date.now() / 1000) + permitDeadlineSeconds);
  const signature = await buildPermitSignature({
    token: tokenIn,
    owner: wallet,
    spender: contractAddress,
    value: amountInWei,
    deadline,
  });

  // Prepare API payload
  const payload = {
    swap: {
      user: wallet.address,
      tokenIn: tokenInAddress,
      tokenOut: tokenOutAddress,
      amountIn: amountInWei.toString(),
      amountOutMin: amountOutMin.toString(),
      deadline: deadline.toString(),
    },
permitSignature: signature.serialized,
  };

  console.log('From:', wallet.address);
  console.log('Swap amount:', formatUnits(amountInWei, tokenInDecimals), tokenInSymbol);
  console.log('Minimum out:', formatUnits(amountOutMin, tokenOutDecimals), tokenOutSymbol);

  // Check balance before swap
  const balanceBefore = await provider.getBalance(wallet.address);
  
  // Call the API
  const response = await fetchJson(`${serverUrl}/api/gasFreeSwapKaia`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  console.log('HTTP status:', response.status);
  console.log('Response:', JSON.stringify(result, null, 2));

  if (response.ok && result.status) {
    console.log('🎉 Gasless swap request succeeded');
    
    // Check balance after swap
    const balanceAfter = await provider.getBalance(wallet.address);
    console.log('Balance before:', formatUnits(balanceBefore, 18), 'KAIA');
    console.log('Balance after:', formatUnits(balanceAfter, 18), 'KAIA');
    console.log('Balance difference:', formatUnits(balanceAfter - balanceBefore, 18), 'KAIA');
    
    return result;
  } else {
    console.error('❌ Gasless swap request failed');
    throw new Error(`Swap failed: ${result.data || result.message || 'Unknown error'}`);
  }
}

// Usage example
async function main() {
  try {
    const userWallet = new Wallet('your_private_key');
    
    const result = await executeGaslessSwap({
      rpcUrl: 'https://public-en-kairos.node.kaia.io',
      serverUrl: 'https://fee-delegation-kairos.kaia.io',
      userWallet: userWallet,
      contractAddress: '0xaaFe47636ACe87E2B8CAaFADb03E87090277Ff7B',
      amountIn: '0.002',
      slippageBps: 50,
    });
    
    console.log('Transaction hash:', result.data.hash);
  } catch (error) {
    console.error('💥 Swap failed:', error.message);
  }
}

main();
```

## Điểm cuối tham chiếu API

- URL: `/api/gasFreeSwapKaia`
- Phương thức: POST
- Loại nội dung: application/json

### Nội dung yêu cầu

```javascript
{
  "swap": {
    "user": "0x742d35Cc6635C0532925a3b8D400e6D2A4b8E0bb",
    "tokenIn": "0xcb00ba2cab67a3771f9ca1fa48fda8881b457750",
    "tokenOut": "0x043c471bEe060e00A56CcD02c0Ca286808a5A436",
    "amountIn": "1000000",
    "amountOutMin": "950000000000000000",
    "deadline": "1699123456"
  },
  "permitSignature": "0x…65-byte signature string…"
}
```

### Tham số

**đổi** (đối tượng, bắt buộc):

- Người dùng (chuỗi): Địa chỉ của chủ sở hữu token đã ký giấy phép.
- tokenIn (chuỗi): Địa chỉ của token đầu vào (phải trùng khớp với địa chỉ USDT đã cấu hình)
- tokenOut (chuỗi): Địa chỉ của token đầu ra (phải trùng khớp với địa chỉ WKAIA đã cấu hình)
- amountIn (chuỗi): Số lượng token đầu vào dưới dạng chuỗi (đơn vị wei/đơn vị nhỏ nhất)
- amountOutMin (chuỗi): Số lượng token đầu ra tối thiểu dự kiến (bảo vệ trượt giá)
- Hạn chót (chuỗi): Dấu thời gian Unix (giây) cho thời hạn hết hiệu lực của giấy phép và trao đổi.

**permitSignature** (chuỗi, bắt buộc):

- Phải là chuỗi hex hợp lệ có độ dài 65 byte.
- Chứa chữ ký cho phép ERC20 đã được serial hóa.

### Định dạng phản hồi

#### Phản hồi thành công (200)

```javascript
{
  "message": "Request was successful",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "contractAddress": null,
    "cumulativeGasUsed": "215000",
    "from": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
    "gasPrice": "25000000000",
    "gasUsed": "215000",
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "status": 1,
    "to": "0x45bD04d5f14DD9AB908109cFEa816F758FaE6709",
    "type": 49,
    "feePayer": "0x1234567890abcdef1234567890abcdef12345678",
    "feePayerSignatures": ["0x..."],
    "logs": [
      {
        "address": "0x...",
        "topics": ["0x..."],
        "data": "0x..."
      }
    ]
  },
  "status": true,
  "requestId": "req_abc123def456"
}
```

#### Phản hồi lỗi

**400 Yêu cầu không hợp lệ - Lỗi xác thực:**

```javascript
{
  "message": "Bad request",
  "data": "Permit deadline has expired",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_error_123"
}
```

**400 Yêu cầu không hợp lệ - Giao dịch bị hủy:**

```javascript
{
  "message": "Bad request",
  "data": "execution reverted: Permit already used",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_revert_456"
}
```

**Lỗi máy chủ nội bộ 500:**

```javascript
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: Network timeout",
  "error": "INTERNAL_ERROR",
  "status": false,
  "requestId": "req_error_789"
}
```

## Xử lý lỗi

### Các tình huống lỗi thường gặp

| Lỗi                           | Trạng thái HTTP | Mô tả                                                            | Giải pháp                                                                                 |
| ----------------------------- | --------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Thiếu các trường bắt buộc     | 400             | _swap_ hoặc _permitSignature_ bị thiếu                           | Ba gồm tất cả các tham số bắt buộc.                                       |
| Người dùng có số dư KAIA      | 400             | Người dùng phải có số dư KAIA bằng 0.            | Chỉ những người dùng có số dư KAIA bằng 0 mới có thể sử dụng dịch vụ này. |
| Định dạng chữ ký không hợp lệ | 400             | Chữ ký giấy phép không phải là chuỗi hex hợp lệ. | Cung cấp một chữ ký hex hợp lệ có độ dài 65 byte.                         |
| Địa chỉ không hợp lệ          | 400             | Địa chỉ Ethereum không hợp lệ                                    | Kiểm tra xem các địa chỉ có hợp lệ hay không.                             |
| Token không được hỗ trợ       | 400             | Token không có trong danh sách được phép.        | Chỉ sử dụng các địa chỉ token đã được cấu hình.                           |
| Hạn chót đã hết hạn           | 400             | Hạn chót cấp phép trong quá khứ                                  | Sử dụng dấu thời gian trong tương lai                                                     |
| Số tiền quá lớn               | 400             | Vượt quá giới hạn tối đa trong hợp đồng                          | Kiểm tra _maxUsdtAmount()_ từ hợp đồng                                 |
| Báo giá không đủ              | 400             | Độ trượt quá nghiêm ngặt                                         | Tăng giới hạn trượt hoặc giảm lượng.                                      |
| Giá xăng quá cao              | 400             | Tắc nghẽn mạng                                                   | Chờ giá xăng dầu giảm.                                                    |
| Thời gian chờ mạng            | 500             | Vấn đề liên quan đến nhà cung cấp RPC                            | Thử lại yêu cầu sau khi chờ đợi                                                           |

## Các yếu tố bảo mật

### Bảo vệ giá xăng

API từ chối các giao dịch khi giá gas vượt quá 50 gwei để ngăn chặn chi phí quá cao. Theo dõi giá xăng dầu và thông báo cho người dùng trong các khoảng thời gian giao thông đông đúc.

### Bảo mật chữ ký

- Không bao giờ tái sử dụng chữ ký trên giấy phép.
- Luôn sử dụng thời hạn hợp lý (5-30 phút)
- Kiểm tra tất cả các thông số trước khi ký.
- Sử dụng HTTPS cho tất cả các giao tiếp API.

## Chi tiết Hợp đồng thông minh

### Địa chỉ hợp đồng GaslessERC20PermitSwap

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet">
   ```
   0x45bD04d5f14DD9AB908109cFEa816F758FaE6709
   ```
  </TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    ```
    0xaaFe47636ACe87E2B8CAaFADb03E87090277Ff7B
    ```
 </TabItem>
</Tabs>

### Các chức năng chính

**executeSwapWithPermit** - Thực hiện giao dịch hoán đổi không tiêu tốn gas bằng chữ ký cho phép:

- Xác minh giấy phép và các thông số trao đổi.
- Chuyển giao token bằng giấy phép
- Thực hiện giao dịch hoán đổi trên sàn giao dịch phi tập trung (DEX)
- Chuyển đổi WKAIA sang định dạng gốc KAIA
- Gửi KAIA gốc cho người dùng

**getExpectedOutput** - Chức năng hiển thị để lấy số lượng đầu ra dự kiến:

```javascript
function getExpectedOutput(
  address tokenIn,
  address tokenOut,
  uint256 amountIn
) external view returns (uint256)
```

### Giới hạn hợp đồng

- Số USDT tối đa cho mỗi giao dịch hoán đổi: 1.000.000 (1 USDT với 6 chữ số thập phân)
- Cặp tiền được hỗ trợ: USDT → WKAIA → KAIA gốc
- Bảo vệ chống tái phát qua theo dõi chữ ký

## Tài nguyên bổ sung

- [Tiêu chuẩn cho phép ERC20 (EIP-2612)](https://eips.ethereum.org/EIPS/eip-2612)
- [Kaia Ethers Extension](https://github.com/kaiachain/ethers-ext)


