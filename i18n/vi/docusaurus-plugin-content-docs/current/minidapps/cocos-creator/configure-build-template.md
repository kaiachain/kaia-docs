# Tích hợp Mini Dapp SDK

Trong phần này, chúng tôi sẽ đảm bảo Mini Dapp SDK được tải trong trò chơi của chúng tôi. Để thực hiện được điều đó, thư mục build-templates của Cocos Creator cho phép tùy chỉnh cách xây dựng trò chơi cho nền tảng web, khiến việc tải trước SDK trước khi trò chơi bắt đầu trở nên cần thiết.

Bằng cách tạo mẫu tùy chỉnh trong **build-templates/web-desktop**, chúng ta có thể tự động đưa SDK vào mọi bản dựng, hợp lý hóa quá trình phát triển và triển khai.

## Bước 1: Tạo thư mục build-templates <a id="create-build-template-directory"></a>

Mở dự án của bạn trong VS Code và chạy lệnh sau trong terminal:

```bash
mkdir -p build-templates/web-desktop
```

## Bước 2: Thực hiện bản dựng ban đầu trong Cocos Creator <a id="perform-initial-build"></a>

1. Vào **Menu → Dự án → Xây dựng**.

![](/img/minidapps/cocos-creator/cp-build-r.png)

2. Đặt **Nền tảng** thành **Web Desktop**.

3. Nhấp vào **Xây dựng**.

![](/img/minidapps/cocos-creator/cp-build-details-r.png)

## Bước 3: Sao chép tệp index.html từ Thư mục bản dựng <a id="copy-index-html-from-build-dir"></a>

Sau khi quá trình xây dựng hoàn tất, hãy sao chép tệp index.html vào thư mục build-templates:

```bash
cp build/web-desktop/index.html build-templates/web-desktop/
```

## Bước 4: Sửa đổi index.html để Bao gồm Mini Dapp SDK <a id="modify-index-html-to-include-dapp-portal-sdk"></a>

Chỉnh sửa `build-templates/web-desktop/index.html` và thêm thẻ tập lệnh Mini Dapp SDK sau vào phần `<head> </head>`:

```bash
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

## Bước 5: Xác minh Thiết lập Bản dựng <a id="verify-build-setup"></a>

- Xây dựng lại dự án của bạn trong Cocos Creator.
- Kiểm tra `build/web-desktop/index.html` đã tạo.
- Xác nhận rằng **script Mini Dapp SDK** đã được bao gồm chính xác.

## Bước 6: Xây dựng & Xem trước Dự án <a id="build-preview-project"></a>

Sau khi hoàn tất thiết lập, hãy nhấp vào _Phát trên thiết bị_ ở đầu Trình chỉnh sửa Cocos Creator. Trò chơi của bạn sẽ mở trong một tab trình duyệt mới.

![](/img/minidapps/cocos-creator/cp-play-game-r.png)

![](/img/minidapps/cocos-creator/cp-localhost-build-r.png)

# Định tuyến Web build đến Localhost:3000 <a id="route-web-build"></a>

Vì mục đích bảo mật và phát triển, Mini Dapp SDK hiện đang hoạt động trên localhost:3000. Hiện tại, bản dựng Unity WebGL mặc định sử dụng các cổng ngẫu nhiên (như 7457) và để ứng dụng của chúng tôi hoạt động hiệu quả, chúng tôi cần cấu hình bản dựng Unity WebGL để mở trên localhost:3000.

Để thực hiện, hãy làm theo các bước dưới đây:

1. Sao chép và dán mã bên dưới vào terminal dự án của bạn

```bash
# Install http-server globally
npm install -g http-server
```

2. Điều hướng đến thư mục xây dựng

```bash
cd build/web-desktop
```

3. Khởi động máy chủ trên cổng 3000

```bash
http-server -p 3000
```

# Kiểm tra và chạy ứng dụng <a id="route-web-build"></a>

Bây giờ dự án của chúng ta đã chạy, hãy thử nghiệm và tương tác với nó.

- Nhấp vào nút Kết nối ví để kết nối với Ví Dapp Portal.
- Sau khi kết nối, đúc một số tiền cố định vào địa chỉ được kết nối.

![](/img/minidapps/cocos-creator/cocos-demo.gif)
