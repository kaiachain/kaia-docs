# Hướng dẫn triển khai

Có nhiều cách khác nhau để triển khai hợp đồng thông minh trên Kaia. Tài liệu này cung cấp hướng dẫn từng bước để triển khai hợp đồng mẫu bằng Remix IDE.

Trong hướng dẫn này, chúng ta sẽ sử dụng [Kaia Toolkit](https://toolkit.kaia.io/account/) để tạo tài khoản và tài khoản được tạo sẽ được sử dụng để ký giao dịch thông qua Remix Kaia Plugin.

## Remix Online IDE <a id="remix-ide"></a>

Open your internet browser and go to [Kaia Plugin for Remix](https://ide.kaia.io).

1. Thêm tập tin mới.

![](/img/build/smart-contracts/d-remix-create.png)

2. Sao chép và dán mã mẫu sau đây (hoặc bất kỳ mã nào bạn muốn triển khai) vào tập tin mới. Mã bên dưới là hợp đồng CoinFlip được thiết kế để cho phép hai người chơi tham gia trò chơi và người chiến thắng sẽ giành được giải thưởng.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

hợp đồng CoinFlip {
    địa chỉ công khai player1;
    địa chỉ công khai player2;
    uint256 nhóm công khai;
    uint256 người chiến thắng công khai;
    địa chỉ công khai winnerAddress;
    
    sự kiện GameStarted(địa chỉ được lập chỉ mục player1, địa chỉ được lập chỉ mục player2, nhóm uint256);
    sự kiện GameFinished(địa chỉ được lập chỉ mục winnerAddress, chuỗi người chiến thắng, nhóm uint256);
    
    function enter() public paid {
        require(msg.value == 0.01 ether, "Phải gửi 0.01 Kaia để vào");
        if (player1 == address(0)) {
            player1 = msg.sender;
        } else {
            require(player2 == address(0), "Cả hai người chơi đều đã vào");
            player2 = msg.sender;
            emit GameStarted(player1, player2, pool);
        }
        pool += msg.value;
        winner = 0;
        winnerAddress = address(0);
    }
    
    function flipCoin() public {
        require(msg.sender == player1 || msg.sender == player2, "Người gửi không phải là người chơi");
        uint256 result = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, block.coinbase))) % 2;
        winner = result == 0 ? 1 : 2;
        winnerAddress = winner == 1 ? player1 : player2;
        string memory winnerName = winner == 1 ? "player1" : "player2";
        phát GameFinished(winnerAddress, winnerName, pool);
        phải trả(winnerAddress).transfer(pool);
        pool = 0;
        player1 = địa chỉ(0);
        player2 = địa chỉ(0);
    }
}
```

3. Chọn Trình biên dịch trong bảng biểu tượng. Nhấp vào nút **Biên dịch Coinflip.sol** để biên dịch mã mẫu trước khi triển khai thực tế.

![](/img/build/smart-contracts/d-remix-compile.png)

4. Chọn môi trường EVM mong muốn trong tab plugin Kaia. Đối với hướng dẫn này, chúng tôi sẽ chọn Kairos (mạng thử nghiệm).

![](/img/build/smart-contracts/d-remix-env.png)

Tiếp theo là nhập tài khoản để ký giao dịch. Bạn có thể xuất khóa riêng của mình từ bất kỳ ví nào tương thích với Kaia hoặc tạo tài khoản dev bằng Kaia Toolkit. Đối với hướng dẫn này, chúng tôi sẽ tạo một tài khoản dev bằng [Kaia Toolkit](https://toolkit.kaia.io/account)

5. Nhập tài khoản bằng cách nhấp vào nút dấu cộng bên cạnh Tài khoản.

![](/img/build/smart-contracts/d-remix-import-account.png)

:::note
Đảm bảo rằng tài khoản có đủ KAIA để thanh toán cho giao dịch triển khai hợp đồng thông minh. Nhận một số KAIA thử nghiệm từ [vòi](https://faucet.kaia.io/) nếu bạn chưa có KAIA thử nghiệm.
:::

6. Thiết lập Giới hạn gas và Giá trị cần gửi.

 - Nếu bạn triển khai một hợp đồng phức tạp hơn, bạn có thể cần thiết lập Giới hạn gas cao hơn. Bạn có thể để nguyên giá trị hiện tại trong ví dụ này.
 - Đặt `Value` là 0 trừ khi bạn muốn gửi `KAIA` đến hợp đồng vào thời điểm triển khai.

7. Nhấp vào nút **Triển khai**

Nếu hợp đồng được triển khai thành công, bạn sẽ thấy mã băm giao dịch tương ứng trong thiết bị đầu cuối và có thể xác minh trên [Kaiascan](https://kairos.kaiascan.io)

![](/img/build/smart-contracts/d-remix-deploy-btn.png)

![](/img/build/smart-contracts/d-remix-txhash.png)

8. Bạn có thể tương tác với hợp đồng bằng cách nhấp vào các nút hàm.

Các hàm được đại diện bằng các nút có màu sắc khác nhau. Các hàm `pure` hoặc `view` trong Solidity có nút màu xanh lam (`player1`, `player2`, `pool`, v.v. trong ví dụ) và không tạo giao dịch mới, do đó chúng không tốn bất kỳ chi phí nào. Các nút màu đỏ (`enter` trong ví dụ) biểu thị các chức năng `có thể thanh toán` giúp thay đổi trạng thái trên blockchain, tiêu thụ gas và có thể chấp nhận giá trị. Các nút màu cam (`flipCoin` trong ví dụ) dành cho các chức năng `không thanh toán` dùng để thay đổi trạng thái hợp đồng nhưng KHÔNG chấp nhận giá trị.

![](/img/build/smart-contracts/d-remix-deployed.png)

Xin chúc mừng nếu bạn đã đọc hết hướng dẫn này. Nếu bạn có bất kỳ câu hỏi nào, hãy truy cập [Diễn đàn Kaia](https://devforum.kaia.io/). Tuy nhiên, dưới đây là danh sách các tài nguyên hữu ích mà bạn có thể cần khi tiếp tục xây dựng với Remix IDE trên Kaia.

 - [Tài liệu phối lại](https://remix-ide.readthedocs.io/en/latest/)