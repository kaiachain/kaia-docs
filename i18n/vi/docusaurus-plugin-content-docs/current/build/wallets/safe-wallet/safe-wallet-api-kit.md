---
title: Bộ công cụ API an toàn
sidebar_label: Bộ công cụ API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bộ công cụ API an toàn

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **31 tháng 8 năm 2026**. Vui lòng sử dụng Safe Wallet dành cho Kaia Network tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới. Các Tài khoản Safe hiện có của bạn sẽ tự động tương thích với Safe Wallet.

:::

Bộ công cụ API giúp bạn tương tác một cách an toàn với [Dịch vụ Giao dịch An toàn](https://docs.safe.global/core-api/transaction-service-overview). Những người ký có quyền hạn có thể đề xuất và chia sẻ các giao dịch, thu thập chữ ký ngoài chuỗi, cũng như truy cập thông tin trên Safe (lịch sử, các giao dịch đang chờ xử lý, các mô-đun, các cơ chế bảo vệ và nhiều nội dung khác).

Dịch vụ Giao dịch được lưu trữ của Safe hỗ trợ cả hai mạng Kaia, do đó bạn chỉ cần ID chuỗi và khóa API — không cần điểm cuối tùy chỉnh.

| Mạng                   | ID chuỗi |
| ---------------------- | -------- |
| Mạng chính Kaia        | 8217     |
| Mạng thử nghiệm Kairos | 1001     |

## Quickstart <a id="Quickstart"></a>

Khi kết thúc hướng dẫn này, bạn sẽ đề xuất một giao dịch cho dịch vụ và thu thập chữ ký của chủ sở hữu để thực hiện giao dịch.

## Prerequisites <a id="Prerequisites"></a>

1. [Node.js và npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)—Node 20.12 trở lên, vì ví dụ này sử dụng hàm tích hợp sẵn `process.loadEnvFile()`
2. Một két sắt có nhiều người ký trên Kairos (hoặc Mainnet)
3. Một khóa API an toàn

### Lấy khóa API <a id="api-key"></a>

Các yêu cầu gửi đến Dịch vụ Giao dịch của Safe cần có khóa API. Đăng nhập vào [Bảng điều khiển dành cho nhà phát triển Safe](https://developer.safe.global/), mở phần **API Keys** và tạo một khóa API. Chìa khóa là một JWT — bạn có thể thiết lập thời hạn hiệu lực của nó và thu hồi nó bất cứ lúc nào.

Số lượng truy cập không cần xác thực được giới hạn ở mức 2 yêu cầu mỗi giây và 5.000 yêu cầu mỗi tháng, chỉ dành cho mục đích khám phá. Các yêu cầu không có khóa sẽ trả về mã trạng thái `401 Unauthorized`; việc vượt quá hạn mức của bạn sẽ trả về mã trạng thái `429 Too Many Requests`.

Không đưa khóa vào hệ thống kiểm soát phiên bản. Hướng dẫn này sẽ đọc thông tin này, cùng với URL RPC và các khóa ký, từ tệp `.env` — xem [Bước 6](#step-6-configure-setup).

## Set up environment <a id="Setup-environment"></a>

### Bước 1: Tạo thư mục dự án

```sh
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### Bước 2: Khởi tạo một dự án npm

```sh
npm init -y
```

### Bước 3: Cài đặt các gói phụ thuộc

<Tabs>
  <TabItem value="npm" label="npm">
    ```
    npm install @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit
    ```
  </TabItem>

 <TabItem value="yarn" label="yarn">
    ```
    yarn add @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit
    ```
 </TabItem>
</Tabs>

:::note

Các kiểu dữ liệu hiện đã có sẵn trong `@safe-global/types-kit`. Gói `@safe-global/safe-core-sdk-types` cũ đã được đổi tên — nếu bạn đang nâng cấp một dự án hiện có, hãy cập nhật lệnh import.

:::

### Bước 4: Kích hoạt các mô-đun ES

Các ví dụ dưới đây sử dụng cú pháp `import`, vì vậy hãy thêm đoạn mã này vào `package.json`:

```json
{
  "type": "module"
}
```

### Bước 5: Nhập các thư viện phụ thuộc

Tạo tệp `app.js` và thêm nội dung sau:

```js
import SafeApiKit từ '@safe-global/api-kit'
import Safe từ '@safe-global/protocol-kit'
import { OperationType } từ '@safe-global/types-kit'
```

### Bước 6: Cấu hình thiết lập

Hãy sử dụng két sắt có ít nhất hai chủ sở hữu và mức độ bảo mật 2 để yêu cầu nhiều chữ ký.

Tạo tệp `.env` trong thư mục gốc của dự án:

```sh
# Mạng thử nghiệm Kaia Kairos — https://chainlist.org/?search=kaia&testnets=true
RPC_URL=https://public-en-kairos.node.kaia.io
CHAIN_ID=1001
EXPLORER_TX_URL=https://kairos.kaiascan.io/tx/

# Khóa API từ https://developer.safe.global
SAFE_API_KEY=

# Safe 2-of-2 được triển khai trên Kairos (https://app.safe.global)
SAFE_ADDRESS=

# Chủ sở hữu 1 đề xuất VÀ thực thi, do đó cần KAIA thử nghiệm để thanh toán phí gas
OWNER_1_ADDRESS=
OWNER_1_PRIVATE_KEY=

# Chủ sở hữu 2 chỉ ký ngoài chuỗi, do đó không cần số dư
OWNER_2_PRIVATE_KEY=

# Người nhận của giao dịch mẫu 1 wei (mặc định là OWNER_1_ADDRESS)
# TO_ADDRESS=
```

:::danger

Tệp `.env` chứa các khóa riêng. Hãy thêm nó vào tệp `.gitignore` trước khi thực hiện lần commit đầu tiên, và tuyệt đối không sử dụng các khóa chứa tiền thật trong hướng dẫn này.

:::

Tải tệp này vào `app.js` và báo lỗi ngay lập tức nếu thiếu bất kỳ thành phần nào:

```js
// Tải tệp .env vào process.env (tích hợp sẵn trong Node >= 20.12 / 21.7, không cần phụ thuộc)
process.loadEnvFile()

const {
  RPC_URL,
  CHAIN_ID,
  SAFE_API_KEY,
  SAFE_ADDRESS,
  OWNER_1_ADDRESS,
  OWNER_1_PRIVATE_KEY,
  OWNER_2_PRIVATE_KEY,
  EXPLORER_TX_URL
} = process.env

const REQUIRED = [
  'RPC_URL',
  'CHAIN_ID',
  'SAFE_API_KEY',
  'SAFE_ADDRESS',
  'OWNER_1_ADDRESS',
  'OWNER_1_PRIVATE_KEY',
  'OWNER_2_PRIVATE_KEY'
]

const missing = REQUIRED.filter((key) => !process.env[key])
if (missing.length > 0) {
  console.error(`Thiếu các biến môi trường bắt buộc trong .env: ${missing.join(', ')}`)
  process.exit(1)
}

// Địa chỉ người nhận của giao dịch mẫu nhận 1 wei
const TO_ADDRESS = process.env.TO_ADDRESS || OWNER_1_ADDRESS
```

## Use API Kit <a id="use-api-kit"></a>

### Step 1: Initialize API Kit

Hãy cung cấp ID chuỗi và khóa API của bạn. Safe sẽ tự động xác định điểm cuối của Dịch vụ Giao dịch cho bạn, do đó không cần thiết phải chỉ định `txServiceUrl` trên Kaia hoặc Kairos.

```js
const apiKit = new SafeApiKit({
  chainId: BigInt(CHAIN_ID), // 1001 cho Kairos, 8217 cho Kaia Mainnet
  apiKey: SAFE_API_KEY
})
```

`txServiceUrl` vẫn có thể sử dụng được nếu bạn chạy phiên bản Dịch vụ Giao dịch của riêng mình; khi thiết lập tham số này, bạn không cần phải điền `apiKey`.

### Step 2: Initialize Protocol Kit

```js
const protocolKitOwner1 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
```

### Bước 3: Đề xuất một giao dịch tới dịch vụ

```js
const safeTransactionData = {
  to: TO_ADDRESS,
  value: '1', // 1 wei
  data: '0x',
  operation: OperationType.Call
}
const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData]
})
const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)
const signature = await protocolKitOwner1.signHash(safeTxHash)
try {
  await apiKit.proposeTransaction({
    safeAddress: SAFE_ADDRESS,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: OWNER_1_ADDRESS,
    senderSignature: signature.data
  })
} catch(err) {
  console.log(err)
}
```

### Step 4: Retrieve pending transaction

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// Các thao tác đọc khác có sẵn trên cùng một phiên bản:
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)
```

### Step 5: Confirm the transaction

Ký bằng Protocol Kit và gửi chữ ký qua [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction).

```js
const protocolKitOwner2 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
const signature2 = await protocolKitOwner2.signHash(safeTxHash)
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)
```

### Step 6: Execute the transaction

Thực thi thông qua [Safe Wallet](https://app.safe.global/), [Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction), Safe CLI hoặc một công cụ tương thích khác.

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Giao dịch đã được thực hiện:');
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

Ví dụ đầy đủ về `app.js`:

```js
import SafeApiKit từ '@safe-global/api-kit'
import Safe từ '@safe-global/protocol-kit'
import {
  OperationType
} từ '@safe-global/types-kit'

// Tải tệp .env vào process.env (được tích hợp sẵn trong Node >= 20.12 / 21.7, không cần phụ thuộc)
process.loadEnvFile()

const {
  RPC_URL,
  CHAIN_ID,
  SAFE_API_KEY,
  SAFE_ADDRESS,
  OWNER_1_ADDRESS,
  OWNER_1_PRIVATE_KEY,
  OWNER_2_PRIVATE_KEY,
  EXPLORER_TX_URL
} = process.env

const REQUIRED = [
  'RPC_URL',
  'CHAIN_ID',
  'SAFE_API_KEY',
  'SAFE_ADDRESS',
  'OWNER_1_ADDRESS',
  'OWNER_1_PRIVATE_KEY',
  'OWNER_2_PRIVATE_KEY'
]

const missing = REQUIRED.filter((key) => !process.env[key])
if (missing.length > 0) {
  console.error(`Thiếu các biến môi trường bắt buộc trong .env: ${missing.join(', ')}`)
  process.exit(1)
}

// Địa chỉ người nhận của giao dịch mẫu nhận 1 wei
const TO_ADDRESS = process.env.TO_ADDRESS || OWNER_1_ADDRESS

const apiKit = new SafeApiKit({
  chainId: BigInt(CHAIN_ID),
  apiKey: SAFE_API_KEY
})

const protocolKitOwner1 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

// 1. Tạo giao dịch
const safeTransactionData = {
  to: TO_ADDRESS,
  value: '1', // 1 wei
  data: '0x',
  operation: OperationType.Call
}

const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData]
})

const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)
const signature = await protocolKitOwner1.signHash(safeTxHash)

// 2. Đề xuất giao dịch cho dịch vụ
try {
  await apiKit.proposeTransaction({
    safeAddress: SAFE_ADDRESS,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: OWNER_1_ADDRESS,
    senderSignature: signature.data
  })
} catch(err) {
  console.log(err)
}

console.log("Hash giao dịch là "+safeTxHash)
const transaction = await apiKit.getTransaction(safeTxHash)
// Các thao tác đọc khác có sẵn trên cùng một phiên bản:
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)

// 3. Xác nhận từ Chủ sở hữu 2
const protocolKitOwner2 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// Xác nhận giao dịch Safe
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)

console.log(signatureResponse)

// 4. Thực thi giao dịch
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)

const receipt = await executeTxReponse.transactionResponse?.wait();

console.log('Giao dịch đã được thực hiện:');
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

Dự án hoàn chỉnh và có thể chạy được — bao gồm `app.js`, `.env.example` và `package.json` — có tại [kaia-safe-api-kit](https://github.com/praveen-kaia/kaia-safe-api-kit). Xem [Tài liệu tham khảo Bộ công cụ API](https://docs.safe.global/sdk/api-kit/reference) để xem danh sách đầy đủ các phương thức.
