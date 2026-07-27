# Cách tích hợp tính năng ủy quyền phí vào ví

Nhờ tính năng [ủy quyền phí gốc](/build/transactions/fee-delegation) của Kaia, người dùng có thể thực hiện các giao dịch miễn phí gas trên các ứng dụng phi tập trung (dApps). Để kích hoạt tính năng này, các **ví** phải hỗ trợ các loại giao dịch ủy quyền phí và thực hiện **ký tên người gửi**.

:::info Hướng dẫn này dành cho ai

Hướng dẫn này dành cho các **nhà cung cấp ví**. Ví của bạn chỉ triển khai phần phía người gửi:

- Ký các giao dịch được ủy quyền bằng khóa của người dùng
- Trả về `senderTxHashRLP` cho dApp

Việc ký tên và phát sóng của người thanh toán phí **không** thuộc trách nhiệm của ví. Các tác vụ này được xử lý bởi phần backend của ứng dụng phi tập trung (dApp) hoặc một dịch vụ được quản lý như [Dịch vụ ủy quyền phí Kaia](/build/tutorials/integrate-fee-delegation-service).

:::

## Quy trình từ đầu đến cuối (các vai trò)

Việc ủy quyền thu phí luôn liên quan đến cùng một nhóm các bên liên quan. Sơ đồ dưới đây thể hiện toàn bộ lộ trình; các phần sau sẽ sử dụng lại sơ đồ này và làm nổi bật đối tượng đang được đề cập.

<FeeDelegationFlow></FeeDelegationFlow>

| Bước | Ai                                  | Trách nhiệm                                                                                                              |
| ---- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 1    | **Ví (của bạn)** | Ký giao dịch được ủy quyền về phí và trả về `senderTxHashRLP`. **Không** được phát sóng. |
| 2    | **dApp**                            | Chuyển tiếp `senderTxHashRLP` cho người thanh toán phí.                                                  |
| 3    | **Người nộp phí**                   | Ký lại và gửi giao dịch đã được ký đầy đủ cho Kaia.                                                      |

Trang này trình bày chi tiết về **bước 1**. Các bước 2–3 được tóm tắt ở phần cuối kèm theo các liên kết đến hướng dẫn đầy đủ.

## Những tính năng mà ví phải hỗ trợ

Đây là **bước 1** trong quy trình — phần duy nhất mà ví của bạn phải triển khai.

<FeeDelegationFlow highlight="wallet"></FeeDelegationFlow>

Để hỗ trợ tính năng ủy quyền thanh toán phí, hãy thực hiện các bước sau trong ví của bạn:

1. Thêm [Kaia SDK](https://github.com/kaiachain/kaia-sdk) (ví dụ: `@kaiachain/ethers-ext`) vào cơ sở mã của ví.
2. Khi ví nhận được yêu cầu giao dịch ủy quyền phí (thường thông qua hàm `kaia_signTransaction`), hãy ký giao dịch đó bằng SDK Kaia bằng khóa của người dùng.
3. Trả về `senderTxHashRLP` cho dApp. **Không** được gửi giao dịch từ ví đến một nút Kaia.

:::tip Danh sách kiểm tra dành cho các nhà cung cấp ví điện tử

- Hỗ trợ các loại giao dịch được ủy quyền bằng phí (chuyển khoản, thực hiện hợp đồng và các loại khác nếu cần thiết)
- Ký bằng khóa **người gửi (người dùng)** do ví quản lý
- Trả về `senderTxHashRLP` cho dApp
- **Không** được phát sóng giao dịch chỉ được ký bởi người gửi

:::

### Ví dụ: ký xác nhận giao dịch chuyển giá trị được ủy quyền thu phí

Hãy sử dụng mẫu này trong quy trình ký của ví của bạn (ví dụ: bên trong trình xử lý `kaia_signTransaction`). Trong môi trường sản xuất, hãy sử dụng khóa của người dùng do ví quản lý — chứ không phải khóa riêng được mã hóa cứng — và trả về `senderTxHashRLP` cho bên gọi.

```javascript
const ethers = require("ethers6");
const { Wallet, TxType, parseKaia } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const receiverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";
const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

async function main() {
  const tx = {
    type: TxType.FeeDelegatedValueTransfer,
    from: senderAddr,
    to: receiverAddr,
    value: parseKaia("0.01"),
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

### Ví dụ: thực hiện giao dịch ký kết hợp đồng ủy quyền thu phí

```javascript
const ethers = require("ethers6");
const { Wallet, TxType } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

const contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";
const abi = ["function setNumber(uint256 newNumber)"];

async function main() {
  const contract = new ethers.Contract(contractAddr, abi, provider);
  const data = contract.interface.encodeFunctionData("setNumber", ["0x123"]);

  const tx = {
    type: TxType.FeeDelegatedSmartContractExecution,
    from: senderAddr,
    to: contractAddr,
    value: 0,
    data: data,
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

:::note

Cách kết nối dây cụ thể phụ thuộc vào kiến trúc ví của bạn. Điều quan trọng là: **khi ký các loại hợp đồng được ủy quyền, hãy chỉ định người gửi, trả về `senderTxHashRLP` và không phát sóng.**

:::

## Ngoài ví: người thanh toán phí ký tên

Sau khi ví trả về `senderTxHashRLP`, ứng dụng phi tập trung (dApp) sẽ chuyển tiếp giá trị này (**bước 2**), sau đó người thanh toán phí sẽ ký và gửi (**bước 3**). Phần được đánh dấu bên dưới là người thanh toán phí — đây **không phải** là mã ví.

<FeeDelegationFlow highlight="feepayer"></FeeDelegationFlow>

```javascript
// Fee payer / backend only — not wallet code
const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
console.log("sentTx", sentTx);

const rc = await sentTx.wait();
console.log("receipt", rc);
```

Để tìm hiểu cách người trả phí nhận `senderTxHashRLP` và gửi giao dịch (một bản demo đơn giản về mô hình máy khách/máy chủ — không phải tích hợp ví), hãy xem [Ví dụ về ủy quyền phí](/build/tutorials/fee-delegation-example). Để biết thêm thông tin về người thanh toán phí được ủy quyền, vui lòng tham khảo [Dịch vụ ủy quyền thanh toán phí Kaia](/build/tutorials/integrate-fee-delegation-service).

## Các bước tiếp theo

| Mục tiêu                                                                                                        | Hướng dẫn                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Hiểu về các loại giao dịch ủy quyền phí                                                                         | [Ủy quyền phí](/build/transactions/fee-delegation), [Ủy quyền phí một phần](/build/transactions/partial-fee-delegation)              |
| Xem bản demo về người thanh toán theo mô hình máy khách/máy chủ (không phải mã ví)           | [Ví dụ về ủy quyền phí xây dựng](/build/tutorials/fee-delegation-example)                                                            |
| Sử dụng dịch vụ quản lý người thanh toán phí của Kaia cho các ứng dụng phi tập trung (dApps) | [Tích hợp Dịch vụ ủy quyền phí Kaia](/build/tutorials/integrate-fee-delegation-service)                                              |
| Tài liệu tham khảo SDK cho các giao dịch ủy quyền phí                                                           | [Chuyển giao giá trị được ủy quyền thông qua phí Ethers-Ext](/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer) |
