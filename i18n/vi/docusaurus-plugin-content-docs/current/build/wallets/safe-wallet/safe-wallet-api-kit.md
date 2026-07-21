---
title: Bộ công cụ API an toàn
sidebar_label: Bộ công cụ API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bộ công cụ API an toàn

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **9 tháng 8 năm 2026**. Vui lòng sử dụng Safe Wallet dành cho Kaia Network tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới. Các Tài khoản Safe hiện có của bạn sẽ tự động tương thích với Safe Wallet.

:::

Bộ công cụ API giúp bạn tương tác một cách an toàn với [Dịch vụ Giao dịch An toàn](https://docs.safe.global/core-api/transaction-service-overview). Những người ký có quyền hạn có thể đề xuất và chia sẻ các giao dịch, thu thập chữ ký ngoài chuỗi, cũng như truy cập thông tin trên Safe (lịch sử, các giao dịch đang chờ xử lý, các mô-đun, các cơ chế bảo vệ và nhiều nội dung khác).

Mã định danh chuỗi Kaia: **8217** (Mainnet), **1001** (Kairos). Khi `safe.kaia.io` ngừng hoạt động, hãy ưu tiên sử dụng cấu hình Dịch vụ Giao dịch Toàn cầu An toàn (Safe Global Transaction Service) cho các chuỗi được hỗ trợ. Nếu bạn vẫn cần một `txServiceUrl` tùy chỉnh, hãy đảm bảo rằng điểm cuối mà bạn đang sử dụng vẫn khả dụng sau khi hoàn tất quá trình di chuyển.

## Quickstart <a id="Quickstart"></a>

Khi kết thúc hướng dẫn này, bạn sẽ đề xuất một giao dịch cho dịch vụ và thu thập chữ ký của chủ sở hữu để thực hiện giao dịch.

## Prerequisites <a id="Prerequisites"></a>

1. [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Một két sắt có nhiều người ký trên Kairos (hoặc Mainnet)

## Set up environment <a id="Setup-environment"></a>

### Bước 1: Tạo thư mục dự án

```js
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### Bước 2: Khởi tạo một dự án npm

```js
npm init -y
```

### Bước 3: Cài đặt các gói phụ thuộc

<Tabs>
  <TabItem value="npm" label="npm">
    ```
    npm install @safe-global/api-kit@2.4.2 @safe-global/protocol-kit@4.0.2 @safe-global/safe-core-sdk-types@5.0.2
    ```
  </TabItem>

 <TabItem value="yarn" label="yarn">
    ```
    yarn add @safe-global/api-kit@2.4.2 @safe-global/protocol-kit@4.0.2 @safe-global/safe-core-sdk-types@5.0.2
    ```
 </TabItem>
</Tabs>

### Bước 4: Nhập các thư viện phụ thuộc

Tạo tệp `app.js` và thêm nội dung sau:

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
```

### Bước 5: Cấu hình thiết lập

Hãy sử dụng két sắt có ít nhất hai chủ sở hữu và mức độ bảo mật 2 để yêu cầu nhiều chữ ký.

```js
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 Owner Safe Address Ex: 0x123.... SAFE SHOULD 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // ONLY OWNER 1 and SAFE ADDRESS Need to have some test KAIA balance
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // OWNER 2 need not have any test KAIA
const TO_ADDRESS = OWNER_1_ADDRESS; // Receiver address of sample transaction who receives 1 wei
```

## Use API Kit <a id="use-api-kit"></a>

### Step 1: Initialize API Kit

Trên các chuỗi khối hỗ trợ [Dịch vụ Giao dịch An toàn](https://docs.safe.global/core-api/transaction-service-overview), việc chỉ định `chainId` thường là đủ. Bạn vẫn có thể truyền tham số `txServiceUrl` tùy chỉnh khi sử dụng điểm cuối chuyên dụng (hãy đảm bảo rằng tham số này vẫn hợp lệ sau khi giao diện người dùng Kaia ngừng hoạt động).

```js
const apiKit = new SafeApiKit.default({
  chainId: 1001n, // Kairos; sử dụng 8217n cho Kaia Mainnet
  // URL tùy chỉnh nếu cần — hãy đảm bảo URL này vẫn hợp lệ sau khi safe.kaia.io ngừng hoạt động
  // Ưu tiên cấu hình Dịch vụ Giao dịch Toàn cầu Safe khi Kaia được niêm yết:
  // https://docs.safe.global/core-api/transaction-service-overview
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})

```

### Step 2: Initialize Protocol Kit

```js
const protocolKitOwner1 = await Safe.default.init({
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
// 2. Propose transaction to the service
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
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
```

## Step 5: Confirm the transaction

Ký bằng Protocol Kit và gửi chữ ký qua [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction).

```js
const protocolKitOwner2 = await Safe.default.init({
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
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

Ví dụ đầy đủ về `app.js`:

```js
import SafeApiKit từ '@safe-global/api-kit'
import Safe từ '@safe-global/protocol-kit'
import { 
  OperationType
} từ '@safe-global/safe-core-sdk-types'
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 Địa chỉ an toàn của chủ sở hữu Ví dụ: 0x123.... ĐỊA CHỈ AN TOÀN NÊN 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // CHỈ CHỦ SỞ HỮU 1 và ĐỊA CHỈ AN TOÀN mới cần có số dư KAIA thử nghiệm
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // Chủ sở hữu 2 không cần có bất kỳ địa chỉ KAIA thử nghiệm nào
const TO_ADDRESS = OWNER_1_ADDRESS; // Địa chỉ người nhận của giao dịch mẫu nhận 1 wei
const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  // Xác nhận điểm cuối sau khi safe.kaia.io ngừng hoạt động; xem tài liệu Dịch vụ Giao dịch Toàn cầu Safe tại
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})
const protocolKitOwner1 = await Safe.default.init({
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
// 3. Xác nhận từ Chủ sở hữu 2
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
const signature2 = await protocolKitOwner2.signHash(safeTxHash)
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
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

Để biết thêm chi tiết, hãy tham khảo [Tài liệu tham khảo bộ công cụ API](https://docs.safe.global/sdk/api-kit/reference) và [các đoạn mã ví dụ](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/snippets).
