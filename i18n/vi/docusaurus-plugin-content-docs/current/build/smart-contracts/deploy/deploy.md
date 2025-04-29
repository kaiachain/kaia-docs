# Hướng dẫn triển khai

Có nhiều cách khác nhau để triển khai hợp đồng thông minh trên Kaia. Tài liệu này cung cấp hướng dẫn từng bước để triển khai một hợp đồng mẫu bằng các công cụ khác nhau. Chúng tôi giả định rằng bạn đã có tài khoản Klaytn với đủ KAIA để thanh toán phí giao dịch. Để tạo tài khoản, bạn có thể sử dụng [Kaia Toolkit](https://toolkit.kaia.io/account/)."

## Remix Online IDE <a id="remix-ide"></a>

Open your internet browser and go to [Kaia Plugin for Remix](https://ide.kaia.io).

1. Thêm tập tin mới.

![](/img/build/smart-contracts/01_deployment_ide.png)

2. Sao chép và dán mã mẫu sau đây (hoặc bất kỳ mã nào bạn muốn triển khai) vào tập tin mới. Mã bao gồm hai hợp đồng được gọi là Mortal và KaiaGreeter và mã này cho phép bạn chạy thông báo "Hello World!".

```
pragma solidity 0.5.12;

contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KaiaGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

3. Chọn Trình biên dịch trong bảng biểu tượng. Chọn môi trường EVM mong muốn. For the Kaia networks, you can choose between Kairos (testnet) and Mainnet. Nhấp vào `Compile` khi mã nguồn mẫu đã sẵn sàng để được biên dịch trước khi triển khai thực tế.

![](/img/build/smart-contracts/02_deployment_compile.png)

4. Bây giờ, chúng ta có thể triển khai hợp đồng. Nhấp vào logo Kaia trong bảng biểu tượng. Nhập tài khoản bằng cách nhấp vào nút hình dấu cộng bên cạnh `Account`. Hãy đảm bảo rằng tài khoản có đủ KAIA để thanh toán cho giao dịch triển khai các hợp đồng thông minh cần thiết.

![](/img/build/smart-contracts/05_deployment_account.png)

5. Thiết lập Giới hạn gas và Giá trị cần gửi.

- Nếu bạn triển khai một hợp đồng phức tạp hơn, bạn có thể cần thiết lập Giới hạn gas cao hơn. Bạn có thể để nguyên giá trị hiện tại trong ví dụ này.
- Đặt `Value` là 0 trừ khi bạn muốn gửi `KAIA` đến hợp đồng vào thời điểm triển khai.

6. Nhập "Hello World!" làm đối số cho hàm khởi tạo và nhấp vào nút `Deploy`.

![](/img/build/smart-contracts/03_deployment_hello.png)

7. Nếu hợp đồng được triển khai thành công, bạn sẽ nhìn thấy biên lai giao dịch tương ứng và kết quả chi tiết trên bảng điều khiển.

8. Bạn có thể tương tác với hợp đồng bằng cách nhấp vào các nút hàm. Các hàm được đại diện bằng các nút có màu sắc khác nhau. Các hàm `constant` hoặc `pure` trong Solidity có các nút màu xanh (ví dụ như `greet`) và không tạo giao dịch mới, do đó chúng không tốn bất kỳ gas nào. Các nút màu đỏ (ví dụ như `kill`) thể hiện các hàm `payable` thay đổi trạng thái trên blockchain, tiêu thụ gas và có thể nhận giá trị. Các nút màu cam đại diện cho các hàm `non-payable` thay đổi trạng thái của hợp đồng nhưng KHÔNG nhận giá trị.

![](/img/build/smart-contracts/06_deployment_functions.png)

Để biết thêm chi tiết, vui lòng tham khảo [liên kết](../ide-and-tools/ide-and-tools.md) này.

## VVISP <a id="vvisp"></a>

vvisp là một công cụ/bộ khung CLI dễ sử dụng để phát triển các hợp đồng thông minh, do HEACHI LABS cung cấp. Bạn có thể dễ dàng thiết lập môi trường, triển khai và thực thi các hợp đồng thông minh Kaia với một lệnh duy nhất. Tham khảo liên kết sau để biết thêm chi tiết.

- https://henesis.gitbook.io/vvisp/deploying-smart-contracts