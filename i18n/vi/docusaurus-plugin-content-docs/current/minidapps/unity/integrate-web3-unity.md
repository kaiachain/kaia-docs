# Tích hợp Web3

Trong phần này, chúng ta sẽ xây dựng các phần để tích hợp web3 vào dự án Unity của mình.

## Tạo và triển khai hợp đồng thông minh KIP7

Đầu tiên, chúng ta sẽ sử dụng Kaia Contract Wizard để tạo hợp đồng thông minh.

### Bước 1: Sử dụng Kaia Contract Wizard

1. Điều hướng đến Kaia Contract Wizard.
2. Chọn KIP7 (tiêu chuẩn mã thông báo của Kaia, tương tự như ERC20).
3. Cấu hình mã thông báo của bạn:
   - Tên: ExampleTestToken (hoặc tên khác!)
   - Biểu tượng: ET (mã token của bạn)
   - Đúc trước: 100 (nguồn cung cấp token ban đầu)
   - Tính năng: Kiểm tra ✅ Có thể đúc

Trong hướng dẫn này, chúng tôi sẽ điều chỉnh hàm mint để không chỉ có trình sửa đổi onlyOwner. Để thực hiện điều này, chúng ta phải xóa lệnh import ownable.sol và lệnh kế thừa Ownable. Mã đã chỉnh sửa bây giờ sẽ trông như thế này:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
contract ExampleTokens is KIP7 {
    constructor() KIP7("ExampleTokens", "ET") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
    function mint(uint256 amount) public  {
        _mint(msg.sender, amount);
    }
}
```

:::info
Chúng tôi đã xóa trình sửa đổi onlyOwner để cho phép bất kỳ ai gọi hàm mint ngoài người triển khai hoặc chủ sở hữu hợp đồng ban đầu.
:::

### Bước 2: Triển khai thông qua Remix IDE

1. Sao chép và dán mã ở trên vào tệp `ET.sol` mới tạo trên Remix IDE.
2. Trong Remix IDE:
   - Nhấp vào nút **Biên dịch hợp đồng**.
   - Kích hoạt **Plugin Kaia** trong trình quản lý plugin.
   - Trong mục Môi trường của tab Plugin Kaia, chọn **Nhà cung cấp được tiêm** - **Ví Kaia**.
   - Tìm hợp đồng của bạn (ExampleTokens) trong danh sách thả xuống **Hợp đồng**.
   - Nhấp vào **Triển khai** để khởi chạy mã thông báo của bạn!
3. Khi Ví Kaia của bạn hiện lên:
   - Xem lại thông tin chi tiết triển khai.
   - Nhấp vào Xác nhận để triển khai lên Kaia Kairos Testnet.

:::important
Sao chép và lưu địa chỉ hợp đồng đã triển khai. Bạn sẽ cần đến nó sau trong phần hướng dẫn.
:::

## Xây dựng cầu nối Unity-Web3

Bây giờ chúng ta sẽ tạo kết nối quan trọng giữa Unity và chức năng Web3. Đây là nơi chúng tôi mang khả năng blockchain vào ứng dụng Unity của bạn!

### Phần 1: Tạo cầu nối plugin (kaiaPlugin.jslib)

Đầu tiên, chúng ta sẽ xây dựng cầu nối JavaScript cho phép Unity giao tiếp với Web3:

1. Tạo thư mục plugin của bạn:

```
Assets/
└── Plugins/
    └── WebGL/
        └── KaiaPlugin.jslib    // We'll create this file
```

2. Tại sao lại là .jslib? Hãy coi nó như một trình biên dịch giữa C# của Unity và JavaScript của trình duyệt - rất cần thiết cho các tương tác trên Web3!

3. Plugin này sẽ xử lý ba chức năng cốt lõi:
   - ConnectWallet() - Xử lý kết nối Kaia Wallet
   - GetTokenBalance() - Kiểm tra số dư token
   - MintTokens() - Quản lý việc đúc token

Mở tệp này trong VS Code và dán mã nguồn `KaiaPlugin.jslib` vào [Phụ lục A](convert-unity-liff.md#appendix-a):

### Phần 2: Tạo Trình quản lý C# (Web3Manager.cs)

Tiếp theo, chúng ta sẽ tạo tập lệnh C# để quản lý tất cả các hoạt động Web3:

1. Tạo thư mục tập lệnh của bạn:

```js
Assets/
└── Scripts/
    └── Web3/
        └── Web3Manager.cs    // We'll create this file
```

:::info

**Web3Manager có chức năng gì?**

- Hoạt động như một đơn vị chỉ huy chính cho mọi hoạt động của Web3.
- Quản lý giao tiếp bằng plugin JavaScript của chúng tôi.
- Cập nhật các thành phần UI dựa trên các sự kiện blockchain.
- Xử lý mọi hoạt động liên quan đến ví và mã thông báo.
- Kết nối các nút `Connect Wallet` và `Mint` với các chức năng tương ứng của chúng
  :::

2. Mở tệp này trong VS Code và dán mã nguồn `Web3Manager.cs` vào [Phụ lục B](convert-unity-liff.md#appendix-b)

### Phần 3: Thiết lập Web3Manager GameObject

Cuối cùng, chúng ta hãy kết hợp tất cả lại trong Unity:

1. Tạo đối tượng quản lý:
   - Nhấp chuột phải vào cửa sổ Phân cấp (cấp gốc).
   - Chọn "Tạo đối tượng rỗng".
   - Đặt tên là "Web3Manager".
2. Đính kèm tập lệnh của bạn:
   - Chọn GameObject Web3Manager.
   - Trong Inspector, nhấp vào Thêm thành phần.
   - Tìm kiếm và chọn "Web3Manager".
3. Kết nối các thành phần UI:
   - Khi đã chọn Web3Manager, hãy nhìn vào Inspector.
   - Kéo và thả các thành phần UI của bạn từ Phân cấp vào các trường tương ứng:
     - Trạng tháiVăn bản
     - Địa chỉVăn bản
     - TokenBalanceVăn bản
     - Kết nối, Ngắt kết nối, Nút Mint
     - Các trường nhập liệu

![](/img/minidapps/unity-minidapp/connect-ui-manager.png)
