# Tích hợp Dịch vụ ủy quyền phí Kaia

Hướng dẫn này cung cấp tổng quan về Dịch vụ Ủy quyền Phí Kaia, cách đăng ký truy cập, các điều kiện tiên quyết, ví dụ về tích hợp và tài liệu tham khảo API. Nó được thiết kế để giúp các nhà phát triển tích hợp khả năng ủy quyền phí vào các ứng dụng phi tập trung (DApps) của họ trên mạng Kaia.

## 1. Tổng quan

### Dịch vụ ủy quyền phí Kaia là gì?

Tính năng ủy quyền phí giao dịch của mạng Kaia cho phép một tài khoản khác thanh toán phí gas giao dịch thay mặt cho người dùng. Dịch vụ Đại lý Phí Kaia tận dụng khả năng này để cho phép người dùng tương tác với ứng dụng phi tập trung (DApp) của bạn mà không cần nắm giữ token KAIA để thanh toán phí gas. Thay vì người dùng tự trả phí gas, ứng dụng của bạn sẽ trả phí thay cho họ thông qua máy chủ ủy quyền phí do kaia quản lý.

:::note

Dịch vụ ủy quyền phí của Kaia hoạt động như một dịch vụ quản lý để tích hợp các ứng dụng phi tập trung (DApps) và cung cấp trải nghiệm ủy quyền phí mượt mà hơn. Tính năng ủy quyền phí được tích hợp sẵn trong blockchain Kaia, và các nhà phát triển có thể triển khai tính năng ủy quyền phí cho người dùng của mình bằng cách tự thiết lập hạ tầng.

:::

### Lợi ích

- **Trải nghiệm người dùng tốt hơn**: Người dùng không cần token KAIA để sử dụng ứng dụng phi tập trung (DApp) của bạn.
- **Onboarding**: Người dùng mới có thể bắt đầu sử dụng DApp của bạn ngay lập tức.
- **Ví đơn giản**: Người dùng chỉ cần các token mà họ muốn giao dịch/sử dụng.

### Cách thức hoạt động

1. **Người dùng ký giao dịch** - Người dùng tạo và ký một giao dịch ủy quyền phí bằng ví của mình.
2. **DApp gửi đến Dịch vụ ủy quyền phí** - Hệ thống backend của DApp gửi giao dịch đã ký đến điểm cuối API của Dịch vụ ủy quyền phí.
3. **Máy chủ xác minh và thanh toán phí** - Dịch vụ ủy quyền phí xác minh giao dịch và thanh toán phí gas thay mặt người dùng nếu giao dịch hợp lệ.

![Quy trình làm việc của Dịch vụ ủy quyền phí](/img/build/tutorials/fee-delegation-workflow.png)

## 2. Đăng ký truy cập

Bạn có thể yêu cầu truy cập vào Dịch vụ Ủy quyền Phí Kaia bằng cách xem xét và hoàn thành biểu mẫu Google này [Google form](https://docs.google.com/forms/d/e/1FAIpQLScSMnI8fD1xbyeoAL3TI81YxT3V1UfoByca84M7TZzYII5Pmw/viewform).

:::note

Đội ngũ Kaia sẽ liên lạc và cấu hình Dapp vào FeeDelegationServer và thông báo cho đối tác dApp ngay sau khi biểu mẫu Google được gửi.

:::

## 3. Điều kiện tiên quyết và Môi trường hỗ trợ

### Điểm cuối dịch vụ

- **Sản xuất**: `https://fee-delegation.kaia.io`
- **Mạng thử nghiệm**: `https://fee-delegation-kairos.kaia.io`

Để xem tài liệu Swagger, vui lòng truy cập:

- **Sản xuất**: `https://fee-delegation.kaia.io/api/docs`
- **Mạng thử nghiệm**: `https://fee-delegation-kairos.kaia.io/api/docs`

### Tương thích ví (Tích hợp giao diện người dùng)

:::info

Khi tích hợp Dịch vụ Ủy quyền Phí Kaia từ phía frontend, hãy đảm bảo rằng ví của bạn hỗ trợ tiêu chuẩn ủy quyền phí Kaia cho việc ký giao dịch có ủy quyền phí.

:::

Các ví hiện được hỗ trợ cho tích hợp giao diện người dùng:

- Ví Kaia
- Ví OKX
- Ví Bitget

Nếu người dùng của bạn đang sử dụng các ví khác, họ có thể không thể ký các giao dịch ủy quyền phí một cách chính xác từ giao diện người dùng.

:::note

**Tích hợp phía máy chủ** không phụ thuộc vào ví. Bạn có thể xử lý việc ký tên và gửi tệp trên máy chủ để có quyền kiểm soát hoàn toàn và tương thích rộng hơn.

:::

## 4. Mô hình truy cập và bảo mật

Phần này giải thích mô hình truy cập và các tính năng bảo mật của Dịch vụ Ủy quyền Phí Kaia.

### Hệ thống danh sách trắng

Dịch vụ sử dụng hệ thống API Key & Địa chỉ được phép để xử lý việc phân bổ phí cho các ứng dụng phi tập trung (DApps).

#### 1. Xác thực bằng khóa API

Đối với các ứng dụng phi tập trung (DApps) đã cấu hình khóa API, bạn phải gọi dịch vụ bằng khóa API hợp lệ VÀ hoặc hợp đồng thông minh HOẶC người gửi có thể được thêm vào danh sách trắng.

#### 2. Danh sách trắng truy cập

Đối với các ứng dụng phi tập trung (DApps) chưa cấu hình khóa API, hoặc hợp đồng thông minh HOẶC người gửi phải là địa chỉ được phép trong danh sách trắng:

- **Địa chỉ hợp đồng thông minh**: Địa chỉ hợp đồng thông minh mà người dùng tương tác.
- **Địa chỉ người gửi**: Địa chỉ ví của người dùng thực hiện giao dịch.

### Quy tắc xác thực giao dịch

**Dành cho Testnet:**\
Tất cả các giao dịch đều được phép để thử nghiệm dễ dàng (không áp dụng xác thực)

**Đối với Mainnet:**\
Giao dịch của bạn sẽ được phê duyệt khi các điều kiện sau được đáp ứng:

1. **Với API Key**: Bạn cung cấp một API Key hợp lệ VÀ địa chỉ hợp đồng hoặc địa chỉ người gửi của bạn đã được thêm vào danh sách trắng (bất kỳ địa chỉ người gửi và địa chỉ hợp đồng nào cũng sẽ hoạt động với API Key hợp lệ nếu không có danh sách trắng được cấu hình)
2. **Không có khóa API**: Hoặc hợp đồng của bạn hoặc địa chỉ người gửi đã được thêm vào danh sách trắng trong một ứng dụng phi tập trung (DApp) không yêu cầu khóa API.

### Các tùy chọn kiểm soát truy cập

**Tùy chọn 1: Truy cập mở (Không cần khóa API + Địa chỉ được phép)**

- Bất kỳ ai cũng có thể sử dụng các hợp đồng/địa chỉ được phép của bạn và phí sẽ được trừ trực tiếp từ số dư DApp của bạn.
- Phù hợp cho: Dịch vụ công cộng, trò chơi mở, công cụ cộng đồng
- Có thể sử dụng các lệnh API trong cả phần frontend hoặc backend.

**Tùy chọn 2: Truy cập được xác thực (Sử dụng khóa API + Địa chỉ được phép)**

- Chỉ ứng dụng phi tập trung (DApp) của bạn mới có thể sử dụng các hợp đồng thông minh/địa chỉ đã được đưa vào danh sách trắng.
- Phù hợp cho: Ứng dụng phi tập trung (DApps) riêng tư, ứng dụng doanh nghiệp, quyền truy cập được kiểm soát.
- Được khuyến nghị gọi API bằng khóa từ phía máy chủ.

**Tùy chọn 3: Truy cập không giới hạn (API Keys + Không yêu cầu địa chỉ được phép)**

- Ứng dụng phi tập trung (DApp) của bạn có thể gửi bất kỳ giao dịch nào với khóa API hợp lệ.
- Phù hợp cho: Ứng dụng ví điện tử, các ứng dụng phi tập trung (DApps) đa năng.
- Được khuyến nghị gọi API bằng khóa từ phía máy chủ.

## 5. Ví dụ về tích hợp

Phần này cung cấp các ví dụ mã nguồn để tích hợp Dịch vụ Phân quyền Phí Kaia vào cả ứng dụng backend và frontend.

### Backend (JavaScript/Node.js) Ví dụ

```javascript
const { Wallet, TxType, JsonRpcProvider, parseKaia } = require('@kaiachain/ethers-ext');

async function sendFeeDelegatedTransaction() {
  try {
    // 1. Setup wallet and provider
    const provider = new JsonRpcProvider('https://public-en-kairos.node.kaia.io');
    const wallet = new Wallet('your_private_key_here', provider);
    
    // 2. Create fee-delegated transaction
    const tx = {
      type: TxType.FeeDelegatedValueTransfer
      from: wallet.address,
      to: '0xAB', // replace your wallet address
      value: parseKaia('0.005'), // 0.005 KAIA
      gasLimit: 100000,
      gasPrice: await provider.getGasPrice(),
      nonce: await wallet.getTransactionCount(),
    };
    
    // 3. Sign transaction
    const signedTx = await wallet.signTransaction(tx);
    
    // 4. Send to fee delegation server
    const response = await fetch('https://fee-delegation-kairos.kaia.io/api/signAsFeePayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_api_key_here'
      },
      body: JSON.stringify({
        userSignedTx: { raw: signedTx }
      })
    });
    
    // 5. Handle response
    const result = await response.json();
    if (result.status) {
      console.log('Success! Transaction hash:', result.data.transactionHash);
    } else {
      console.log('Failed:', result.message);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}
sendFeeDelegatedTransaction();
```

### Ví dụ về Frontend (React.js)

```javascript
import { useState } from 'react';
import { Web3Provider, TxType, parseKaia } from '@kaiachain/ethers-ext/v6';

// Optional API key
const config = {
  serverUrl: 'https://fee-delegation-kairos.kaia.io',
  apiKey: 'kaia_your_api_key_here'
};

export default function FeeDelegationComponent() {
  const [wallet, setWallet] = useState({ address: null, connected: false });
  const [form, setForm] = useState({ toAddress: '', amount: '0.005' });
  const { Web3Provider, TxType, parseKaia } = await import('@kaiachain/ethers-ext/v6');

  // 1. Connect wallet
  const connectWallet = async () => {
    try {
      const accounts = await window.klaytn?.enable();
      setWallet({ address: accounts[0], connected: true });
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  // 2. Send fee-delegated transaction
  const sendTransaction = async () => {
    try {
      const provider = new Web3Provider(window.klaytn);
      const signer = await provider.getSigner(wallet.address);
      
      // 3. Create and sign transaction
      const tx = {
        type: TxType.FeeDelegatedValueTransfer,
        from: wallet.address,
        to: form.toAddress,
        value: parseKaia(form.amount)
      };
      
      const signedTx = await signer.signTransaction(tx);
      
      // 4. Send to fee delegation server
      const response = await fetch(`${config.serverUrl}/api/signAsFeePayer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          userSignedTx: { raw: signedTx }
        })
      });
      
      // 5. Handle response
      const result = await response.json();
      if (result.status) {
        console.log('Success! Transaction hash:', result.data.transactionHash);
      } else {
        console.log('Failed:', result.message);
      }
      
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {wallet.connected ? 'Connected' : 'Connect Kaia Wallet'}
      </button>
      
      <input 
        value={form.toAddress}
        onChange={(e) => setForm({...form, toAddress: e.target.value})}
        placeholder="Recipient address"
      />
      
      <input 
        value={form.amount}
        onChange={(e) => setForm({...form, amount: e.target.value})}
        placeholder="Amount"
      />
      
      <button onClick={sendTransaction} disabled={!wallet.connected}>
        Send Transaction
      </button>
    </div>
  );
}

```

### Ví dụ thực hiện bổ sung (liên kết)

Để xem các ví dụ triển khai chi tiết hơn, vui lòng tham khảo:

- [ethers-ext@V6 Ví dụ HTML](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-html/main.js#L294)
- [ethers-ext@V6 Ví dụ ReactJS](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)
- [Ví dụ web3js](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/browser-html/main.js#L265)
- [Viem-ext ví dụ](https://github.com/kaiachain/kaia-sdk/blob/dev/viem-ext/examples/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)

## 6. Tham chiếu API

Phần này cung cấp chi tiết về các điểm cuối API có sẵn cho Dịch vụ Ủy quyền Phí Kaia.

### `POST /api/ký_như_người_thanh_toán`

**Mô tả:** Giao dịch ủy quyền phí

**Tiêu đề:**

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

**Nội dung yêu cầu:**

```
{
  "userSignedTx": {
    "raw": "<RLP_encoded_signed_transaction>"
  }
}
```

**Tham số:**

- `userSignedTx.raw` (chuỗi, bắt buộc): Giao dịch được mã hóa RLP và ký bởi người dùng.

**Trả lời:**

```json
// Transaction Success
{
  "message": "Request was successful",
  "data": <TransactionReceipt>,
  "status": true
}
```

:::note

Tham khảo 'Mã phản hồi API SignAsFeePayer và ví dụ' bên dưới để biết thông tin chi tiết về phản hồi.

:::

### `GET /api/balance`

**Mô tả:** Kiểm tra xem số dư có đủ (lớn hơn 0,1 KAIA) hay không.

Với khóa API:

```
GET /api/balance
Authorization: Bearer your_api_key_here
```

Không có API Key (sử dụng địa chỉ):

```
GET /api/balance?address=0x742d35Cc6634C0532925a3b8D2A4DDDeAe0e4Cd3
```

**Tiêu đề:**

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

**Tham số truy vấn:**

- `address` (chuỗi, tùy chọn): Địa chỉ hợp đồng hoặc địa chỉ người gửi để kiểm tra số dư (bắt buộc khi không cung cấp khóa API)

**Trả lời:**

```json
{
  "message": "Request was successful",
  "data": true,  // true if sufficient balance, false if insufficient
  "status": true
}
```

### Mã phản hồi API SignAsFeePayer và ví dụ

#### 200 phản hồi thành công

```javascript
// Transaction Success
{
  "message": "Request was successful",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "contractAddress": null,
    "cumulativeGasUsed": "31000",
    "from": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
    "gasPrice": "27500000000",
    "gasUsed": "31000",
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "index": 0,
    "logs": [],
    "logsBloom": '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    "status": 1,
    "to": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
  },
  "status": true
}

// Transaction Reverted (200 but failed)
{
  "message": "Transaction reverted",
  "error": "REVERTED",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "status": 0,
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "index": 0,
    "logs": [],
    "logsBloom": '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  "status": false
}

```

#### 400 Phản hồi yêu cầu không hợp lệ

```javascript
// Invalid API Key
{
  "message": "Bad request",
  "data": "Invalid API key",
  "error": "BAD_REQUEST",
  "status": false
}

// Missing userSignedTx
{
  "message": "Bad request",
  "data": "userSignedTx is required, [format] -- { userSignedTx: { raw: user signed rlp encoded transaction } }",
  "error": "BAD_REQUEST",
  "status": false
}

// Not Whitelisted
{
  "message": "Bad request",
  "data": "Contract or sender address are not whitelisted",
  "error": "BAD_REQUEST",
  "status": false
}

// DApp Inactive
{
  "message": "Bad request",
  "data": "DApp is inactive. Please contact the administrator to activate the DApp.",
  "error": "BAD_REQUEST",
  "status": false
}

// Insufficient Balance
{
  "message": "Bad request",
  "data": "Insufficient balance in fee delegation server, please contact the administrator.",
  "error": "BAD_REQUEST",
  "status": false
}

// DApp Terminated
{
  "message": "Bad request",
  "data": "DApp is terminated. Please contact the administrator to activate the DApp.",
  "error": "BAD_REQUEST",
  "status": false
}

```

#### Lỗi máy chủ nội bộ 500

```javascript
// Transaction failed
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: <ERROR MESSAGE>",
  "error": "INTERNAL_ERROR",
  "status": false
}

// If transaction receipt not found
{
  "message": "Internal server error",
  "data": "Transaction was failed",
  "error": "INTERNAL_ERROR",
  "status": false
}
```

## 7. Xử lý lỗi và các thực hành tốt nhất

### Xử lý lỗi thông thường

| Thông báo lỗi                                                                                                        | Cần làm gì                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Giao dịch đã thất bại sau 5 lần thử, mạng đang bận. Thông báo lỗi: <ERROR MESSAGE>\` | 1. Kiểm tra xem payload `userSignedTx.raw` đã được định dạng và ký đúng cách hay chưa <br/>2. Đối với vấn đề **Low Nonce**, hãy đảm bảo không có giao dịch nào đang chờ xử lý trong ví của bạn. (Đối với ví Kaia, hãy hủy tất cả các giao dịch đang chờ xử lý và xóa lịch sử trước khi thử lại).  <br/>3. Đối với **vấn đề giao dịch đã biết**, vui lòng kiểm tra lại xem giao dịch hiện tại của bạn đã hoàn tất chưa và chuyển sang các giao dịch khác. |
| Khóa API không hợp lệ                                                                                                | Đảm bảo rằng bạn đang sử dụng khóa API hợp lệ. Nếu bạn không có mã hoặc mã đã hết hạn, vui lòng liên hệ với đội ngũ Kaia để nhận mã mới.                                                                                                                                                                                                                                                                                                                                                                                                           |
| userSignedTx là trường bắt buộc.                                                                     | Đảm bảo rằng phần nội dung yêu cầu của bạn bao gồm chính xác đối tượng `userSignedTx` với trường `raw` chứa giao dịch đã ký được mã hóa RLP. Kiểm tra lại cấu trúc JSON và đảm bảo dữ liệu giao dịch được mã hóa đúng cách.                                                                                                                                                                                                                                                                                                                        |
| Địa chỉ hợp đồng hoặc địa chỉ người gửi không nằm trong danh sách trắng.                             | Xác minh rằng địa chỉ hợp đồng thông minh mà người dùng của bạn đang tương tác hoặc địa chỉ ví của người dùng khởi tạo giao dịch đã được thêm vào danh sách trắng cho DApp của bạn.                                                                                                                                                                                                                                                                                                                                                                                |
| DApp không hoạt động. Vui lòng liên hệ với quản trị viên để kích hoạt DApp.          | Trạng thái của DApp của bạn hiện đang không hoạt động trên dịch vụ ủy quyền phí. Liên hệ với đội ngũ Kaia hoặc quản trị viên được chỉ định để tìm hiểu về việc kích hoạt DApp của bạn.                                                                                                                                                                                                                                                                                                                                                             |
| Số dư không đủ trong máy chủ phân phối phí, vui lòng liên hệ với quản trị viên.                      | Số dư của máy chủ ủy quyền phí cho DApp của bạn quá thấp để chi trả phí giao dịch. Liên hệ với quản trị viên hoặc đội ngũ Kaia để nạp thêm tiền vào tài khoản DApp của bạn. Bạn cũng có thể nhận được thông báo qua email trước khi điều này xảy ra.                                                                                                                                                                                                                                                                               |
| DApp đã bị kết thúc. Vui lòng liên hệ với quản trị viên để kích hoạt DApp.           | Quyền truy cập của DApp của bạn vào dịch vụ ủy quyền phí đã bị chấm dứt. Liên hệ với đội ngũ Kaia hoặc quản trị viên để hiểu lý do chấm dứt và thảo luận về khả năng kích hoạt lại.                                                                                                                                                                                                                                                                                                                                                                |

### Các phương pháp tốt nhất

#### Quản lý giao dịch

Khi gửi nhiều giao dịch (giao dịch hàng loạt hoặc giao dịch liên tiếp) từ cùng một địa chỉ người gửi, hãy quản lý thứ tự giao dịch cẩn thận để tránh các lỗi liên quan đến nonce:

1. **Chờ xác nhận**: Đảm bảo mỗi giao dịch đã được xác nhận (tức là bạn đã nhận được biên lai giao dịch) trước khi gửi giao dịch tiếp theo.
2. **Đảm bảo quản lý nonces đúng cách:** đảm bảo các giao dịch được gửi đi với nonce chính xác và các nonce không thành công hoặc cũ hơn được xử lý đúng cách trước khi các giao dịch mới được thực hiện.
3. **Thực hiện logic thử lại**: Xây dựng cơ chế thử lại để xử lý các lỗi tạm thời, giao dịch bị hủy hoặc xác nhận bị trì hoãn.
4. **Người dùng ví tiền điện tử trên giao diện người dùng (frontend):** Nếu sử dụng ví tiền điện tử dựa trên trình duyệt (như Kaia Wallet, OKX Wallet hoặc Bitget) từ giao diện người dùng, hãy khuyến nghị người dùng xóa các giao dịch đang chờ xử lý hoặc bị kẹt bằng cách sử dụng tính năng “Xóa lịch sử” của ví để tránh xung đột nonce.

#### Gọi API

Khi gọi API, nếu yêu cầu **API KEY**, chúng tôi khuyến nghị sử dụng nó từ phần backend của DApp. Nếu không yêu cầu **API KEY**, ứng dụng DApp có thể gọi API từ cả giao diện người dùng (frontend) hoặc từ phía máy chủ (backend).

## 8. Hỗ trợ và Tài nguyên

### Hỗ trợ & Tài nguyên

- [Ví dụ về phân bổ Kaia Fee](https://docs.kaia.io/build/tutorials/fee-delegation-example/)
- [Phân quyền phí cổng DApp](https://docs.dappportal.io/extra-packages/gas-fee-delegation)
- [Kaia SDK Tài liệu tham khảo](https://docs.kaia.io/references/sdk/)

### Tích hợp tùy chỉnh

Đối với các tích hợp danh sách trắng giao dịch nâng cao hoặc tùy chỉnh vượt ngoài hệ thống danh sách trắng tiêu chuẩn (như xác thực token chuyên biệt, logic định tuyến phức tạp hoặc các giao thức DeFi tùy chỉnh), vui lòng liên hệ với đội ngũ Kaia để được tư vấn giải pháp tùy chỉnh.

## 9. Câu hỏi thường gặp

**Q: Sự khác biệt giữa việc ủy quyền phí có hoặc không có Dịch vụ Ủy quyền Phí Kaia là gì?**\
**A:** Dịch vụ Ủy quyền Phí Kaia hoạt động như một dịch vụ quản lý để tích hợp các ứng dụng phi tập trung (DApps) và cung cấp trải nghiệm ủy quyền phí mượt mà hơn. Lưu ý rằng tính năng ủy quyền phí đã được tích hợp sẵn trong chuỗi Kaia, và người dùng có thể ủy quyền phí cho người dùng của mình bằng cách tự thiết lập hạ tầng.

**Q: Sự khác biệt giữa danh sách trắng hợp đồng và danh sách trắng người gửi là gì?**\
**A:** Danh sách trắng hợp đồng cho phép bất kỳ người dùng nào tương tác với các hợp đồng thông minh cụ thể thông qua ứng dụng DApp của bạn. Danh sách trắng người gửi cho phép các địa chỉ ví cụ thể thực hiện bất kỳ giao dịch nào. Bạn có thể sử dụng cả hai cùng lúc.

**Q: Nếu số dư của tôi hết thì sao?**\
**A:** Giao dịch sẽ bị từ chối với thông báo "Số dư không đủ". Chúng tôi sẽ gửi email thông báo cho bạn trước khi số dư của bạn xuống quá thấp (nếu đã được cấu hình).

**Q: Tôi có thể thêm nhiều hợp đồng vào danh sách trắng cho một DApp không?**\
**A:** Có, bạn có thể thêm nhiều hợp đồng và địa chỉ người gửi vào danh sách trắng cho một DApp duy nhất.

**Q: Khi số dư hết, sẽ xảy ra điều gì?**\
**A:** Để tiếp tục sử dụng dịch vụ, bạn cần liên hệ với đội ngũ Kaia để nạp tiền hoặc yêu cầu thêm số dư. Tuy nhiên, bạn cũng có thể gọi API **`/api/balance?address=${address}`** để kiểm tra xem tài khoản của bạn có đủ số dư hay không và kiểm tra từ bảng điều khiển [**https://fee-delegation.kaia.io/rank**](https://fee-delegation.kaia.io/rank)

**Q: Sau khi đã thêm danh sách trắng hoặc khóa API, liệu có cần thay đổi mã nguồn trên DApp hoặc phần backend của DApp không?**\
**A:** Đối với khóa API, bạn cần thêm nó vào tiêu đề "Authorization" với định dạng “Bearer your_api_key” khi gọi API **`/api/signAsFeePayer`**. Tuy nhiên, nếu chỉ là danh sách trắng địa chỉ mà không cần API Key, không cần thay đổi mã nguồn.

**Q: Nên sử dụng lệnh gọi API này ở đâu?**\
**A:** Các lệnh gọi API **không có khóa API** có thể được sử dụng cả trong **frontend và backend**, vì chúng tuân theo các **quy tắc xác thực nghiêm ngặt hơn** (ví dụ: yêu cầu địa chỉ được phép).\
Tuy nhiên, khi sử dụng **API keys**, chúng tôi **khuyến nghị mạnh mẽ** rằng các yêu cầu này nên được thực hiện từ **backend** để đảm bảo an toàn, vì việc sử dụng API keys thường ít kiểm tra xác thực hơn và có thể tiết lộ nhiều quyền truy cập hơn.