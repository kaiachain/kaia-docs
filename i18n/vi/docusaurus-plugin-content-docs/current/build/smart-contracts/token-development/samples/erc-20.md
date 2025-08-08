# ERC-20

## Tổng quan <a id="overview"></a>

Tạo một token có thể thay thế trên Kaia có các bước tương tự như trên Ethereum và sử dụng tiêu chuẩn [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20).

Để tuân thủ tiêu chuẩn, bạn sẽ triển khai một hợp đồng thông minh thực hiện các sự kiện và hàm sau:

```solidity
function name() public view returns (string) //optional
function symbol() public view returns (string) //optional
function decimals() public view returns (uint8) //optional
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

- **name**: Phương thức trả về tên của token.
- **biểu tượng**: Một phương thức trả về biểu tượng của token.
- **số thập phân**: Một phương thức trả về số chữ số thập phân mà token sử dụng. Nó được sử dụng để xác định đơn vị nhỏ nhất của token. Ví dụ, nếu một token ERC-20 có giá trị thập phân là 18, điều này có nghĩa là token có thể được chia nhỏ đến mười tám chữ số thập phân.
- **totalSupply**: Phương thức xác định tổng số lượng token của bạn; khi giới hạn này được đạt đến, hợp đồng thông minh sẽ từ chối tạo ra các token mới.
- **balanceOf**: Phương thức trả về số lượng token mà địa chỉ ví đang sở hữu.
- **Chuyển nhượng**: Một phương thức lấy một lượng token nhất định từ tổng nguồn cung và chuyển cho người dùng.
- **transferFrom**: Một phương thức chuyển giao khác được sử dụng để chuyển token giữa các người dùng.
- **Xác nhận**: Phương thức này kiểm tra xem hợp đồng thông minh có được phép phân bổ một lượng token nhất định cho người dùng hay không, dựa trên tổng nguồn cung.
- **Phép cho phép**: Phương pháp này hoàn toàn giống với phương pháp đã được phê duyệt, ngoại trừ việc nó kiểm tra xem một người dùng có đủ số dư để gửi một lượng token nhất định cho người dùng khác hay không.
- **Sự kiện chuyển nhượng**: được phát ra khi các token được chuyển nhượng.
- **Sự kiện phê duyệt**: được phát ra khi có sự phê duyệt token.

## Bắt đầu <a id="getting-started"></a>

Trong phần này, bạn sẽ tạo và triển khai hợp đồng token ERC20 của mình bằng cách sử dụng Remix Online IDE. Có nhiều phiên bản token tuân thủ tiêu chuẩn ERC20 được phát triển bởi các nhóm khác nhau, mỗi phiên bản được phát triển với nhiều yếu tố được xem xét kỹ lưỡng. Để đảm bảo tính tiện lợi và an toàn, chúng tôi sẽ sử dụng hợp đồng [OpenZeppelin ERC-20](https://docs.openzeppelin.com/contracts/5.x/erc20) để tạo token của mình. Với OpenZeppelin, chúng ta không cần phải viết toàn bộ giao diện ERC-20. Thay vào đó, chúng ta có thể nhập thư viện hợp đồng và sử dụng các hàm của nó.

### Bước 1: Tạo hợp đồng token ERC20 <a id="create-erc20-token-contract"></a>

**Trình hướng dẫn hợp đồng OpenZeppelin**

- Mở [Trình hướng dẫn hợp đồng OpenZeppelin](https://wizard.openzeppelin.com)
- Chọn **ERC20**.
- Cung cấp một **tên** và một **biểu tượng** cho token. Ví dụ: _Hy Lạp_ và _GK_ tương ứng.
- Trong trường **Premint**, hãy đặt giá trị là 10.000. Điều này tạo ra một lượng token ban đầu cho người triển khai.
- Trong phần **Tính năng**, hãy đánh dấu vào ô **Mintable** để cho phép các tài khoản có quyền truy cập đặc quyền (chỉ chủ sở hữu) có thể tạo thêm nguồn cung.
- Nhấp vào biểu tượng **Sao chép** để sao chép mã để sử dụng trên Remix trong phần tiếp theo.

![](/img/build/smart-contracts/oz-erc20-setup.png)

### Bước 2: Triển khai hợp đồng token ERC20 <a id="deploy-erc20-token-contract"></a>

**Trình chỉnh sửa mã nguồn Remix**

- Trong [Remix](https://remix.ethereum.org), hãy điều hướng đến **File Explorer** và tạo một tệp mới có tên `Greek.sol` trong thư mục contracts.
- Chuyển đến tab **Solidity Compiler** và nhấp vào **Compile Greek.sol** để biên dịch hợp đồng token.
- Chuyển đến tab **Deploy & run transactions**
- Chọn **Môi trường** > **Nhà cung cấp được chèn** > **MetaMask**.
- Trong menu thả xuống **Hợp đồng**, hãy chọn hợp đồng của bạn. Ví dụ: _Hy Lạp_.
- Trong trường **Deploy**, hãy cung cấp tham số constructor cho recipient và initialOwner.
- Nhấp vào **Deploy/transact**

![](/img/build/smart-contracts/remix-erc20-deploy.png)

Sau khi triển khai, bạn có thể gọi hàm **balanceOf** với tài khoản đã được sử dụng để triển khai hợp đồng. Bạn sẽ thấy có 100.000.000.000.000.000.000.000 token có sẵn trong tài khoản của bạn như sau.

Vì bạn đã đặt số thập phân là 18 khi triển khai hợp đồng trên, nó đã đúc một số lượng cố định là 10.000 token trong hàm tạo, với mỗi token có giá trị thập phân là 10^18. Phương pháp TotalSupply sẽ trả về tổng số token đã được đúc, con số này cũng phải là 10000000000000000000000.

![](/img/build/smart-contracts/remix-erc20-bal-totalsupply.png)

### Bước 3: Tương tác với token ERC-20 từ MetaMask <a id="interact-with-erc20-token-from-MetaMask"></a>

Bạn có thể sử dụng MetaMask để kiểm tra số dư và chuyển các token ERC-20 tương thích với đồng tiền Hy Lạp mà bạn vừa triển khai. Để xem số dư token của bạn trên MetaMask, hãy làm theo các bước sau:

**MetaMask**

- Mở MetaMask
- Nhấp vào biểu tượng **Ba chấm** ở góc xa bên phải, sau đó nhấp vào **Nhập token**.

![](/img/build/smart-contracts/mm-import-tokens-e20g.png)

- Hãy đảm bảo chọn Kaia Kairos Network trong trường **Chọn mạng** và dán địa chỉ hợp đồng Greek mới được triển khai vào trường **Địa chỉ hợp đồng token**.

![](/img/build/smart-contracts/mm-custom-tokens-e20g.png)

- Nhấp vào **Nhập** là bước cuối cùng.

![](/img/build/smart-contracts/mm-custom-tokens-imported-e20g.png)

Sau khi hoàn tất, bạn sẽ thấy một cửa sổ pop-up với thông báo: "_Token đã được nhập: Bạn đã nhập thành công GK_" và token đã nhập (GK) sẽ xuất hiện trong danh sách các token trong ví MetaMask của bạn.

