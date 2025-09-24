# Xây dựng các ứng dụng nhỏ (Mini DApps) trên Kaia

Mini DApps là những ứng dụng nhỏ, được hỗ trợ bởi công nghệ blockchain, có thể hoạt động trực tiếp bên trong ứng dụng LINE Messenger. Họ giúp người dùng dễ dàng sử dụng các tính năng Web3 mà không cần rời khỏi ứng dụng chat mà họ đã quen thuộc.

## Mini DApps là gì?

Hãy xem Mini DApps như những công cụ hoặc trò chơi đơn giản được xây dựng trên blockchain Kaia. Chúng hoạt động bên trong LINE, một ứng dụng nhắn tin phổ biến với hơn 200 triệu người dùng hàng tháng, chủ yếu ở Nhật Bản, Đài Loan, Thái Lan và Indonesia. Các nhà phát triển tạo ra các ứng dụng này để tích hợp các tính năng blockchain hữu ích, như thanh toán an toàn, phần thưởng hoặc giao dịch token, trực tiếp vào các cuộc trò chuyện hàng ngày.

Đối với người dùng, điều này rất đơn giản. Không cần tải xuống các ứng dụng bổ sung hoặc học các kiến thức phức tạp về blockchain. Bạn chỉ cần mở LINE, tìm một Mini DApp thông qua Dapp Portal (một trung tâm khám phá tích hợp sẵn) và bắt đầu sử dụng nó. Các ví dụ bao gồm tích lũy điểm thưởng, trao đổi token, mua NFT hoặc thậm chí chơi các trò chơi nhanh. Mọi thứ đều diễn ra tại một nơi.

Kaia là động lực thúc đẩy tất cả những điều này diễn ra một cách âm thầm. Đây là một blockchain nhanh chóng và chi phí thấp (được hình thành từ việc sáp nhập Klaytn và Finschia) chuyên xử lý các phần bảo mật, như ghi chép giao dịch hoặc thực thi hợp đồng thông minh. Các công cụ của Kaia, chẳng hạn như ví điện tử, được tích hợp chặt chẽ với LINE, vì vậy việc quản lý tài sản kỹ thuật số trở nên tự nhiên. Ngoài ra, các tính năng như ủy quyền phí cho phép người dùng thường không phải tự mình trả phí gas.

Sức mạnh thực sự nằm ở chỗ các ứng dụng Mini DApps mở ra cơ hội cho việc sử dụng rộng rãi. Họ kết hợp Web3 với một ứng dụng đáng tin cậy, tiếp cận những người có thể không khám phá blockchain nếu không có ứng dụng này. Các doanh nghiệp có thể xây dựng hệ thống thưởng. Nhà phát triển có thể tạo ra các trải nghiệm tương tác. Tất cả đều hướng đến việc làm cho công nghệ phi tập trung trở nên thực tiễn và phù hợp với từng địa phương — được thiết kế riêng cho các khu vực khác nhau đồng thời kết nối trên quy mô toàn cầu.

## Các SDK chính để phát triển các ứng dụng phi tập trung (DApps) nhỏ gọn

Để phát triển một ứng dụng dApp Mini, bạn sẽ làm việc với một số SDK chính. Mỗi phần chịu trách nhiệm về một phần khác nhau: cơ bản về blockchain, khám phá người dùng và tích hợp LINE. Dưới đây là một tóm tắt ngắn gọn kèm theo các liên kết đến thông tin chi tiết thêm.

### Kaia SDK (Công cụ lõi blockchain)

SDK này cung cấp cho bạn các tính năng cơ bản để kết nối với mạng Kaia. Đây là bộ thư viện dành cho các tác vụ như viết hợp đồng thông minh, gửi giao dịch hoặc quản lý ví.

Mục đích sử dụng: Sử dụng chủ yếu ở phía server. Ví dụ, nếu ứng dụng Mini dApp của bạn cần triển khai hợp đồng để đúc token hoặc xử lý thanh toán, bạn thường sẽ sử dụng SDK này. Nó được xây dựng dựa trên các công cụ quen thuộc như Ethers.js hoặc Web3.js, kèm theo các tiện ích mở rộng như ethers-ext cho JavaScript.

Các tính năng chính bao gồm gửi giao dịch, đọc dữ liệu hợp đồng và phát triển ứng dụng có khả năng mở rộng. Trong các ứng dụng dApp nhỏ, nó thường được sử dụng để thực hiện các tác vụ như đúc token hoặc giao dịch NFT.

Để biết thêm chi tiết, vui lòng tham khảo [Kaia SDK reference](../references/sdk/sdk.md) trong tài liệu của chúng tôi. Ở đó đã được đề cập chi tiết, vì vậy hãy bắt đầu từ đó nếu bạn đang thiết lập hợp đồng.

### SDK Cổng thông tin Dapp (Kết nối với Trung tâm Khám phá)

Dapp Portal là nền tảng của LINE dành cho việc tìm kiếm và quảng bá các ứng dụng Mini dApps. Thư viện JavaScript SDK này kết nối ứng dụng của bạn với nó, xử lý các tác vụ Web3 như đăng nhập ví hoặc giao dịch.

Mục đích của nó là gì: Nó cho phép người dùng kết nối ví Kaia (liên kết với LINE), đúc token, kiểm tra số dư hoặc truy cập phần thưởng và thị trường - tất cả đều có thể thực hiện ngay trong ứng dụng Mini dApp của bạn. Hãy xem nó như một cầu nối cho các tương tác blockchain hướng đến người dùng.

Bạn sẽ thêm nó vào mã frontend của mình, thường là trong HTML hoặc các tệp script. Ví dụ, trong các hướng dẫn của Unity hoặc Cocos, nó được sử dụng cho kết nối ví và các chức năng token. Các phương pháp chính bao gồm khởi tạo SDK, yêu cầu tài khoản và gửi giao dịch.

Xem tài liệu [Dapp Portal](https://docs.dappportal.io/) để biết chi tiết về API và hướng dẫn cài đặt. Chúng tôi khuyến nghị thực hiện kiểm thử trên `localhost:3000` trong quá trình phát triển để đảm bảo an ninh.

### LIFF SDK (Tích hợp vào LINE Messenger)

LIFF là viết tắt của LINE Front-end Framework. Đây là công cụ của LINE để phát triển ứng dụng web hoạt động mượt mà bên trong ứng dụng nhắn tin.

Mục đích của nó là gì: Điều này quản lý phía frontend, như cho phép người dùng đăng nhập qua tài khoản LINE và hiển thị ứng dụng của bạn trong trình duyệt của LINE. Nó đơn giản hóa quy trình onboarding — không cần mật khẩu bổ sung. Thiết lập ứng dụng LIFF trong LINE Developers Console, chọn kích thước (toàn màn hình hoặc gọn nhẹ) và thêm quyền truy cập.

Trong quy trình làm việc, bạn thường bắt đầu từ đây để xây dựng giao diện, sau đó tích hợp các SDK khác. Ví dụ, các hướng dẫn cho thấy cách chỉnh sửa tệp index.html để tích hợp LIFF cho các bản dựng Unity WebGL.

Thông tin chi tiết có trong [tài liệu LIFF của LINE](https://developers.line.biz/en/docs/liff/overview/). Nó là một thành phần bên ngoài, nhưng rất quan trọng đối với các ứng dụng Mini dApps.

## Cách các SDK này hoạt động cùng nhau

Xây dựng một ứng dụng dApp nhỏ không hề phức tạp khi bạn hiểu rõ quy trình. Bắt đầu với LIFF để thiết lập ứng dụng trong LINE — quản lý đăng nhập và giao diện cơ bản. Sau đó, sử dụng Kaia SDK cho các tác vụ blockchain phía server, chẳng hạn như triển khai hợp đồng thông minh. Cuối cùng, thêm SDK Cổng thông tin Dapp để kết nối ví và kích hoạt các tính năng như đúc token hoặc phần thưởng.

![](/img/minidapps/sdk-overview.png)

Hãy lấy một ví dụ đơn giản: Một trò chơi mà người chơi kiếm được token. Bạn sẽ sử dụng LIFF cho màn hình trò chơi trong LINE. SDK Cổng thông tin Dapp kết nối ví và phân phối phần thưởng. Kaia SDK triển khai hợp đồng token trên Kaia.
Cấu hình này đảm bảo tính bảo mật và thân thiện với người dùng. Để xem các hướng dẫn thực hành, vui lòng tham khảo các bài hướng dẫn của chúng tôi trên [Unity](https://docs.kaia.io/minidapps/unity/quick-start/), [Cocos Creator](https://docs.kaia.io/minidapps/cocos-creator/quick-start/) hoặc [Survey Mini dApp](https://docs.kaia.io/minidapps/survey-minidapp/intro/).

## Bắt đầu với phát triển ứng dụng Mini DApp

Để bắt đầu phát triển ứng dụng Mini DApp của bạn, hãy thực hiện các bước sau:

1. Đăng ký truy cập SDK Mini DApp [tại đây](https://tally.so/r/w4Y5BB) và chờ phê duyệt.
2. Nhận token thử nghiệm từ [Kaia Faucet](https://faucet.kaia.io/).
3. Hãy thiết lập môi trường phát triển của bạn bằng cách làm theo các hướng dẫn cho [Unity](./unity/quick-start.md), [Cocos Creator](./cocos-creator/quick-start.md) hoặc [Survey Mini dApp](./survey-minidapp/intro.md).

Tìm hiểu thêm về các bộ công cụ phát triển phần mềm (SDK) Mini DApp tại [Trang tài liệu SDK Dapp Portal](https://developers.dappportal.io/sdk), cung cấp hướng dẫn chi tiết về triển khai và tích hợp.

Nếu bạn mới bắt đầu xây dựng trên Kaia, hãy truy cập trang [Bắt đầu với Kaia](../build/get-started/get-started.mdx) của chúng tôi để tìm hiểu kiến thức cơ bản.

Để giải đáp thắc mắc và hỗ trợ cộng đồng, vui lòng tham khảo [Diễn đàn Phát triển Kaia](https://devforum.kaia.io/).