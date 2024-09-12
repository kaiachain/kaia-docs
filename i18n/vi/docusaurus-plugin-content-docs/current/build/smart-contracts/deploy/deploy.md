# Hướng dẫn triển khai

Có nhiều cách khác nhau để triển khai hợp đồng thông minh trên Kaia. Tài liệu này cung cấp hướng dẫn từng bước để triển khai một hợp đồng mẫu bằng các công cụ khác nhau. Chúng tôi giả định rằng bạn đã có tài khoản Klaytn với đủ KAIA để thanh toán phí giao dịch. To create an account, you can use [Kaia Online Toolkit](https://toolkit.kaia.io/account/accountKeyLegacy)."

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

## solc & caver-js <a id="solc-caver-js"></a>

Một cách khác để triển khai hợp đồng là biên dịch hợp đồng thủ công bằng trình biên dịch solc và triển khai chúng bằng thư viện caver-js.

1. Tạo `KaiaGreeter.sol` và viết đoạn mã sau.

```
pragma solidity 0.5.6;

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

2. Cài đặt solc 0.5.6.

```
$ sudo npm install -g solc@0.5.6
```

3. Biên dịch hợp đồng.

```
$ solcjs KaiaGreeter.sol --bin
```

4. Cài đặt caver-js.

```
$ npm install caver-js.
```

5. Tạo `deploy.js` trong cùng thư mục bằng đoạn mã sau.

```
const Caver = require("caver-js");
const caver = new Caver("https://public-en-kairos.node.kaia.io")

const walletInstance = caver.kaia.accounts.privateKeyToAccount(
  '0x3de0c9...' // enter your private key to deploy contract with
);
caver.kaia.accounts.wallet.add(walletInstance);

const fs = require('fs')
const bytecode = fs.readFileSync('./KaiaGreeter_sol_KaiaGreeter.bin') // compiled output

const constructorType = ['string']  // enter appropriate constructor type
const constructorValue = ['Hello, Kaia!']

const params = caver.kaia.abi.encodeParameters(constructorType, constructorValue);

caver.kaia.sendTransaction({
  from: caver.kaia.accounts.wallet[0].address,
  gas: "50000000",
  data: bytecode.toString() + params.substring(2, params.length)
})
.once("receipt", receipt => {
  console.log(receipt)
})
.once("error", error => {
  console.log(error);
})
```

_LƯU Ý_: Không khuyến nghị sử dụng ví dụ này cho mục đích sản xuất. Hãy đặc biệt cẩn trọng khi sử dụng các khóa riêng tư.

6. Triển khai hợp đồng sử dụng môi trường nút mạng.

```
$ node deploy.js
```
