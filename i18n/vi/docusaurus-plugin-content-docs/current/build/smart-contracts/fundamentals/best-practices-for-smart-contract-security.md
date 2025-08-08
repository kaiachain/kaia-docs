# Các phương pháp tốt nhất để bảo mật hợp đồng thông minh

Hướng dẫn này cung cấp một hướng dẫn thực tiễn và có cấu trúc về các phương pháp tốt nhất để đảm bảo an ninh cho hợp đồng thông minh.
Hợp đồng thông minh đóng vai trò là động lực chính của hầu hết các ứng dụng trên chuỗi khối. Họ xác định và thực thi logic đằng sau một loạt các trường hợp sử dụng đa dạng, bao gồm tài chính phi tập trung, trò chơi kiếm tiền, token hóa tài sản thực tế và nhiều hơn nữa.

Trong hệ sinh thái Kaia, đặc biệt là trong cộng đồng các nhà phát triển đang xây dựng các ứng dụng Mini dApps, đã có sự gia tăng nhanh chóng về việc áp dụng và sử dụng các ứng dụng này. Tuy nhiên, càng nhiều giá trị được giao dịch qua hoặc bị khóa trong hợp đồng thông minh, thì khả năng thu hút các tác nhân độc hại càng cao. Những kẻ tấn công thường tập trung vào phần lõi của hệ thống — hợp đồng thông minh.

Do đó, bảo mật hợp đồng thông minh không được coi là một vấn đề phụ. Đây nên là ưu tiên hàng đầu từ giai đoạn phát triển ban đầu cho đến khi triển khai và trong quá trình tương tác liên tục với hợp đồng.

## Bảo mật hợp đồng thông minh là gì?

Hợp đồng thông minh là một chương trình được lưu trữ trên blockchain và tự động thực thi khi các điều kiện đã được định trước được đáp ứng. Sau khi được triển khai, mã nguồn của nó trở nên bất biến, có nghĩa là nó không thể bị thay đổi. Tính bất biến này đảm bảo tính minh bạch và loại bỏ nhu cầu về các bên trung gian, nhưng nó cũng mang lại những rủi ro nghiêm trọng. Nếu hợp đồng chứa lỗ hổng bảo mật, chúng không thể được vá sau khi triển khai, điều này có thể dẫn đến việc tiền bị đánh cắp và mất niềm tin.

Bảo mật hợp đồng thông minh đề cập đến tập hợp các thực hành và biện pháp được sử dụng để bảo vệ các hợp đồng này khỏi các cuộc tấn công độc hại và lỗi lập trình. Một hợp đồng được bảo mật chặt chẽ giúp ngăn chặn truy cập trái phép, thao túng dữ liệu và tổn thất tài chính, từ đó bảo vệ tính toàn vẹn của giao thức của bạn.

## Tại sao bảo mật hợp đồng thông minh lại quan trọng?

Vì hợp đồng thông minh không thể thay đổi sau khi triển khai, bất kỳ lỗi hoặc lỗ hổng bảo mật nào cũng trở thành vĩnh viễn. Các tác nhân độc hại có thể lợi dụng những lỗ hổng này để rút cạn quỹ hoặc thao túng hành vi của một giao thức. Trong nhiều trường hợp, một lỗi nhỏ trong mã nguồn có thể dẫn đến thiệt hại hàng triệu đô la.

Theo DeFiLlama, tính đến tháng 6 năm 2025, tổng số tiền bị đánh cắp trong các cuộc tấn công tài chính phi tập trung (DeFi) được định giá là $6,6 tỷ. Trong số này, các lỗ hổng trong hợp đồng thông minh chiếm khoảng $3,3 tỷ, tương đương khoảng 51%. Các con số này cho thấy tầm quan trọng không thể phủ nhận của bảo mật hợp đồng thông minh đối với bất kỳ giao thức trên chuỗi khối nào.

## Các phương pháp tốt nhất để viết hợp đồng thông minh an toàn

### 1. Sử dụng các thư viện hoặc hàm đã được kiểm thử kỹ lưỡng và an toàn.

Sử dụng các phụ thuộc bên ngoài trong hợp đồng thông minh của bạn có thể đưa mã độc hại vào hệ thống nếu các phụ thuộc đó không được kiểm thử hoặc đánh giá kỹ lưỡng. Để giảm thiểu rủi ro này, hãy luôn sử dụng các thư viện đã được kiểm thử kỹ lưỡng và được tin cậy rộng rãi như [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master), được duy trì bởi một cộng đồng mạnh mẽ và được kiểm toán định kỳ.

Ngoài ra, hãy tiến hành kiểm tra kỹ lưỡng mã nguồn của bên thứ ba trước khi tích hợp vào hợp đồng của bạn. Kiểm thử và đánh giá mã nguồn bên ngoài giúp đảm bảo rằng mã nguồn đó không chứa các lỗ hổng bảo mật ẩn hoặc gây ra hành vi không mong muốn trong giao thức của bạn.

### 2. Áp dụng các mẫu bảo mật phát triển

Các mẫu bảo mật là các kỹ thuật tiêu chuẩn hóa để phòng thủ chống lại các vector tấn công đã biết, chẳng hạn như tái nhập (reentrancy). Họ cung cấp một phương pháp đáng tin cậy và được chấp nhận rộng rãi để ngăn chặn các lỗ hổng bảo mật trước khi chúng xảy ra. Việc tích hợp các mẫu thiết kế này vào mã nguồn của bạn sẽ nâng cao độ bền vững của mã và giảm thiểu rủi ro bị khai thác.
Dưới đây là một số mẫu bảo mật quan trọng cần xem xét:

#### 2.1 Mô hình CEI (Kiểm tra - Hiệu quả - Tương tác)

Mô hình CEI giúp đảm bảo rằng tất cả các bước xác thực cần thiết được hoàn tất trước khi bất kỳ tương tác bên ngoài nào diễn ra. Cấu trúc này giúp giảm thiểu nguy cơ xảy ra các hành vi bất thường hoặc độc hại trong quá trình thực thi hợp đồng thông minh.

Khi được triển khai đúng cách, mẫu CEI tuân theo thứ tự sau:

- Kiểm tra: Xác minh rằng tất cả các điều kiện cần thiết đã được đáp ứng (ví dụ: xác minh rằng người dùng có đủ số dư).
- Hiệu ứng: Cập nhật trạng thái nội bộ của hợp đồng (ví dụ: giảm số dư của người dùng).
- Tương tác: Chuyển tiền hoặc gọi hợp đồng bên ngoài.

Bằng cách tuân theo cấu trúc này, bạn có thể giảm đáng kể nguy cơ xảy ra các cuộc tấn công tái nhập.

Ví dụ dưới đây là dễ bị tấn công vì nó gửi Ether cho người dùng trước khi cập nhật số dư của họ.

```solidity
contract InSecureBank {

    mapping(address => uint256) public balances;

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        // Checks: if user have enough balance
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // observe that this is an this external interaction.
        // should be made after deducting the `amount` from the user's balance
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
        // Effects: Update the user's balance
        balances[msg.sender] -= amount;
    }
}
```

Mã nguồn trên dễ bị tấn công tái nhập (reentrancy attack), cho phép một tác nhân độc hại gọi hàm withdraw nhiều lần trước khi số dư được cập nhật. Mô hình CEI giúp ngăn chặn điều này bằng cách đảm bảo trạng thái của hợp đồng được cập nhật trước khi thực hiện bất kỳ cuộc gọi bên ngoài nào.

Dưới đây là phiên bản cập nhật của mã trên tuân theo mẫu CEI:

```solidity
contract SecureBank {

    mapping(address => uint256) public balances;

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        // Checks: Ensure that the user has enough balance to withdraw the requested amount
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // Effects: Update the user's balance
        balances[msg.sender] -= amount;
        // Interactions: Transfer the requested amount to the user
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
    }
}
```

Trong phiên bản cập nhật tuân theo mẫu CEI, sự cân bằng được điều chỉnh trước khi bất kỳ token nào được chuyển giao. Như vậy, ngay cả khi người dùng cố gắng truy cập lại chức năng, yêu cầu sẽ bị từ chối vì số dư của họ đã bị trừ.

#### 2.2. Mẫu dừng khẩn cấp

Mô hình Dừng khẩn cấp, thường được gọi là cầu dao ngắt mạch, cho phép tạm dừng các chức năng được chọn trong hợp đồng thông minh trong trường hợp khẩn cấp. Nó cung cấp một cách để nhanh chóng vô hiệu hóa các tác vụ quan trọng nếu phát hiện lỗ hổng bảo mật hoặc hành vi bất thường.

Để chủ động theo dõi hợp đồng của bạn về các vấn đề này, bạn có thể sử dụng các công cụ theo dõi hoặc bot được tùy chỉnh cho mục đích này. Các bot này quét các mẫu giao dịch cụ thể hoặc những thay đổi bất thường trong trạng thái hợp đồng để phát hiện các mối đe dọa tiềm ẩn.

Dưới đây là một ví dụ minh họa cách triển khai cơ chế ngắt mạch trong hợp đồng của bạn:

```solidity
contract CircuitBreaker {

    address public owner;
    bool public contractStopped = false;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not the owner");
        _;
    }

    // Only works when contract is running
    modifier haltInEmergency() {
        require(!contractStopped, "Contract is stopped");
        _;
    }

    // Only works when contract is paused
    modifier enableInEmergency() {
        require(contractStopped, "Contract is running");
        _;
    }

    // Owner can pause/unpause contract
    function toggleContractStopped() public onlyOwner {
        contractStopped = !contractStopped;
    }

    // Normal operations (when running)
    function deposit() public payable haltInEmergency {
        // Deposit logic here
    }

    // Emergency functions (when paused)
    function emergencyWithdrawal() public onlyOwner enableInEmergency {
        // Emergency withdrawal logic here
    }
}
```

#### 2.3. Mẫu gờ giảm tốc

Mô hình Speed Bump giới thiệu một khoảng thời gian trì hoãn trước khi thực thi các hành động quan trọng trên chuỗi khối, chẳng hạn như rút tiền hoặc quyết định quản trị. Sự chậm trễ này đóng vai trò như một biện pháp bảo vệ, cho phép người dùng hoặc quản trị viên có thời gian phát hiện và phản ứng với các hoạt động đáng ngờ.

Ví dụ: Bạn có thể giới hạn việc rút tiền bằng cách thiết lập một khoảng thời gian chờ cố định hoặc một giới hạn số tiền rút tối đa. Điều này giúp ngăn chặn truy cập trái phép hoặc việc cạn kiệt quỹ nhanh chóng do các hành động độc hại.

Ví dụ dưới đây minh họa cách hoạt động của mẫu này bằng cách áp dụng quy định chờ 5 ngày trước khi người dùng có thể rút tiền.

```solidity
contract BankWithSpeedBump { 
    
    struct Withdrawal { 
        uint amount; 
        uint requestedAt; 
    } 

    mapping (address => uint) public balances; 
    mapping (address => Withdrawal) public withdrawals; 

    uint constant WAIT_PERIOD = 5 days;
  
    function deposit() public payable { 
        balances[msg.sender] += msg.value;
    }

    function requestWithdrawal() public { 
        if (balances[msg.sender] > 0) { 
        uint amountToWithdraw = balances[msg.sender]; 
        balances[msg.sender] = 0; 
        withdrawals[msg.sender] = Withdrawal({ amount: amountToWithdraw, requestedAt: block.timestamp}); 
        } 
    }

    function withdraw() public {
        require(withdrawals[msg.sender].amount > 0, "No pending withdrawal");
        require(
            block.timestamp > withdrawals[msg.sender].requestedAt + WAIT_PERIOD,
            "Wait period not completed"
        );
        
        uint amount = withdrawals[msg.sender].amount; 
        withdrawals[msg.sender].amount = 0; 
        
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Withdraw failed");
    }
}
```

### 3. Sử dụng phiên bản mới nhất của trình biên dịch Solidity

Luôn sử dụng phiên bản mới nhất của trình biên dịch Solidity. Các phiên bản mới thường bao gồm các bản vá bảo mật quan trọng và các cải tiến về ngôn ngữ. Ví dụ, phiên bản Solidity 0.8.x trở lên đã giới thiệu các cơ chế bảo vệ tích hợp sẵn chống lại các lỗi tràn và tràn ngược trong phép tính, vốn là những lỗ hổng bảo mật phổ biến trong hợp đồng thông minh trước đây.

Giữ cho mã nguồn của bạn luôn được cập nhật giúp đảm bảo rằng mã nguồn của bạn được hưởng lợi từ các tính năng bảo mật mới nhất và các kiểm tra của trình biên dịch.

### 4. Giữ hợp đồng thông minh đơn giản

Đơn giản là nguyên tắc cơ bản khi viết hợp đồng thông minh an toàn. Logic phức tạp thường dẫn đến rủi ro không cần thiết và các lỗ hổng ẩn. Tốt nhất là nên giữ mã hợp đồng và cấu trúc của nó đơn giản và rõ ràng nhất có thể. Khi sự phức tạp là không thể tránh khỏi, hãy chia nhỏ logic thành các chức năng nhỏ hơn, mỗi chức năng có một mục đích cụ thể.

### 5. Kiểm tra hợp đồng thông minh của bạn trong môi trường mô phỏng

Trước khi triển khai hợp đồng thông minh của bạn lên mạng lưới sản xuất, hãy luôn chạy nó trong môi trường mô phỏng như Kairos Testnet. Kiểm thử trong môi trường được kiểm soát này cho phép bạn đánh giá một cách nghiêm ngặt cách hợp đồng của bạn hoạt động dưới các điều kiện khác nhau và các trường hợp biên.
Quy trình này giúp phát hiện các lỗ hổng bảo mật, xác nhận các hành vi dự kiến và nâng cao độ tin cậy tổng thể. Nó cũng giảm thiểu rủi ro triển khai logic sai sót có thể dẫn đến mất mát tài chính hoặc sự cố hệ thống.

Dưới đây là một số phương pháp kiểm thử được khuyến nghị để xác thực hợp đồng thông minh của bạn:

#### 5.1 Kiểm thử đơn vị

Kiểm thử đơn vị tập trung vào việc đánh giá các chức năng riêng lẻ trong một hợp đồng thông minh. Để thực hiện các bài kiểm thử đơn vị một cách hiệu quả, bạn cần chia hợp đồng thành các hàm nhỏ, có mục đích duy nhất và có thể được kiểm thử độc lập.

Một phương pháp phổ biến là sử dụng các khẳng định — những tuyên bố rõ ràng mô tả hành vi mong đợi của một hàm. Sau đó, bạn kiểm tra xem các khẳng định đó có đúng hay không trong các điều kiện khác nhau. Kiểm thử đơn vị luôn phải được thực hiện trước khi tiến hành kiểm thử tích hợp, vì nó giúp phát hiện và khắc phục các vấn đề ngay từ giai đoạn đầu của quá trình phát triển.

#### 5.2. Kiểm thử tích hợp

Kiểm thử tích hợp đánh giá cách các thành phần khác nhau của hợp đồng của bạn hoạt động cùng nhau. Điều này bao gồm việc kiểm tra tương tác giữa các hàm, hợp đồng bên ngoài và các hệ thống như API.
Loại kiểm thử này là cần thiết để phát hiện các vấn đề liên quan đến cuộc gọi giữa các hợp đồng, phụ thuộc và chức năng được thừa kế. Nó đảm bảo rằng các bộ phận riêng lẻ hoạt động chính xác khi được kết hợp và rằng hợp đồng hoạt động như mong đợi trong bối cảnh hệ thống rộng lớn hơn.

#### 5.3. Kiểm thử mờ

Kiểm thử fuzz bao gồm việc đưa các giá trị đầu vào ngẫu nhiên hoặc cực đoan vào hợp đồng của bạn để quan sát hành vi của nó. Kỹ thuật này giúp phát hiện các lỗ hổng bảo mật có thể không được phát hiện trong quá trình kiểm thử đơn vị hoặc kiểm thử tích hợp.

Fuzzing đặc biệt hữu ích khi hợp đồng của bạn bao gồm các phép toán toán học hoặc logic kiểm tra đầu vào. Nó cho phép bạn kiểm tra độ bền của mã nguồn và phát hiện các hành vi bất thường trong các điều kiện không thông thường.

### 6. Thực hiện kiểm toán hợp đồng thông minh

Kiểm toán là quá trình đánh giá có hệ thống mã nguồn của hợp đồng bởi một đội ngũ độc lập nhằm phát hiện các lỗ hổng bảo mật, lỗi phần mềm hoặc thiếu sót trong thiết kế. Quy trình này giúp tăng cường sự tin tưởng vào tính an toàn và độ tin cậy của hợp đồng thông minh của bạn trước khi triển khai.

Một cuộc kiểm toán thông thường bao gồm:

- Một cuộc kiểm tra thủ công chi tiết về mã nguồn.
- Quét tự động các lỗ hổng bảo mật đã biết
- Kiểm thử để xác minh hành vi của hợp đồng
- Báo cáo chi tiết nêu rõ các vấn đề đã được xác định và các đề xuất cải thiện.

Kiểm toán giúp giảm thiểu rủi ro bị khai thác và đảm bảo hợp đồng thông minh của bạn đáp ứng các tiêu chuẩn bảo mật trước khi triển khai.

### 7. Bao gồm cơ chế an toàn dự phòng

Vì lý do bảo mật, đặc biệt khi làm việc với các hợp đồng mới, việc bao gồm một phương án dự phòng đáng tin cậy là rất quan trọng. Điều này cho phép bạn phản hồi nhanh chóng nếu có bất kỳ vấn đề nào phát sinh. Dưới đây là một số chiến lược cần xem xét:

- **Khả năng nâng cấp**: Đảm bảo hợp đồng của bạn cho phép nâng cấp trong tương lai. Điều này cho phép sửa lỗi và thêm tính năng mới mà không cần thay thế toàn bộ hợp đồng.
- **Kiểm soát phi tập trung**: Tránh tập trung quyền kiểm soát vào một nơi duy nhất. Sử dụng ví đa chữ ký để các hành động quan trọng yêu cầu xác nhận từ nhiều bên.
- **Khóa thời gian**: Thêm thời gian chờ trước khi thực hiện các hành động quan trọng. Điều này cho phép đội ngũ hoặc cộng đồng rộng lớn hơn có thời gian để xem xét các giao dịch và phản hồi nếu cần thiết.

## Kết luận

An ninh không bao giờ nên được coi là điều phụ thuộc. Nó phải là một phần thiết yếu của mọi giai đoạn trong quá trình phát triển phần mềm, từ giai đoạn phát triển đến giai đoạn sản xuất. Các nhà phát triển cần áp dụng tư duy ưu tiên bảo mật khi làm việc với hợp đồng thông minh.

Luôn chuẩn bị cho khả năng thất bại, triển khai các thay đổi một cách cẩn thận, cập nhật thông tin về các thay đổi trong hệ sinh thái, hiểu rõ đặc điểm riêng biệt của EVM và giữ cho các hợp đồng của bạn đơn giản nhất có thể. Bằng cách tuân thủ các nguyên tắc tốt nhất được nêu trên, bạn sẽ giảm thiểu đáng kể rủi ro và nâng cao độ tin cậy của các hợp đồng thông minh của mình.

