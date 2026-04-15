# Trở thành Người xác thực

## Tổng quan <a id="overview"></a>

:::info Giai đoạn 1 không cần xin phép

Hướng dẫn này mô tả cách các chuỗi khối (GC) hiện tại quản lý các trình xác thực của mình thông qua Cổng thông tin Quản lý Trình xác thực trong giai đoạn **Giai đoạn 1 không cần xin phép**. Việc mở rộng quyền tham gia cho tất cả mọi người thông qua mạng lưới không cần xin phép sẽ diễn ra trong **Giai đoạn 2 (dự kiến vào cuối tháng 9)**, và hướng dẫn này sẽ được cập nhật vào thời điểm đó. Để biết thêm chi tiết, vui lòng tham khảo [Tổng quan về triển khai không cần xin phép](https://govforum.kaia.io/t/permissionless-implementation-overview/1218) và [Lộ trình phát triển PGT](https://govforum.kaia.io/t/pgt-permissionless-governance-tokenomics-roadmap-introduction/1447).

:::

Kaia cung cấp [Cổng thông tin quản lý trình xác thực](https://portal.kaia.io/validators) để đăng ký và quản lý thông tin trình xác thực. Hướng dẫn này sẽ hướng dẫn bạn cách các nhà xác thực có thể tham gia mạng lưới Kaia thông qua cổng thông tin.

Vì thông tin cần thiết cho hoạt động của trình xác thực phải được ghi lại trong các hợp đồng trên chuỗi, nên bất kỳ trình xác thực nào cũng có thể sử dụng cổng thông tin để gửi các giao dịch nhằm ghi hoặc cập nhật thông tin đó. Cổng thông tin này cũng cho phép các nhà xác thực quản lý các hợp đồng staking mà họ sở hữu khi đưa một nhà xác thực mới vào mạng Kaia hoặc loại bỏ một nhà xác thực hiện tại khỏi mạng này.

Hiện tại, cổng thông tin này hỗ trợ các tính năng sau.

![Trang chủ Portal](/img/nodes/become-a-validator/image01.png)

- **Trang chủ**: màn hình chính hiển thị các hợp đồng staking được triển khai bởi trình quản lý trình xác thực.
- **Triển khai hợp đồng staking**: triển khai một hợp đồng staking mới.
- **Quản lý Staking**: chỉnh sửa thông tin trên hợp đồng staking đã được triển khai.
- **Trở thành Người xác thực**: Tham gia với tư cách là người xác thực bằng cách đăng ký hợp đồng staking đã được triển khai.
- **Quản lý trình xác thực**: chỉnh sửa thông tin của một trình xác thực đã được tích hợp.
- **Yêu cầu đang chờ xử lý**: màn hình quản trị được đội ngũ Kaia sử dụng.

:::note

Tất cả các tính năng nêu trên cũng được hỗ trợ trên mạng thử nghiệm. Chúng tôi khuyến nghị bạn nên thực hiện các thao tác thử nghiệm trên mạng thử nghiệm trước.

:::

## Bạn sẽ làm gì <a id="what-youll-do"></a>

Quy trình hướng dẫn sử dụng sẽ được trình bày trong các trang sau, theo thứ tự như sau:

1. [Điều kiện tiên quyết](./prerequisites.md) — kết nối ví quản lý trình xác thực (khuyến nghị sử dụng Kaia Safe) và chuẩn bị các tài khoản cần thiết.
2. [Hướng dẫn tham gia cho người xác thực](./onboarding.md) — triển khai và khởi tạo hợp đồng staking của bạn, sau đó gửi yêu cầu tham gia.
3. [Quản lý hợp đồng staking](./manage-staking.md) — cập nhật thông tin quản trị viên, đặt cược/rút cược KAIA, thay đổi địa chỉ nhận phần thưởng, quản lý đa chữ ký và nhiều tính năng khác.
4. [Quản lý thông tin người xác thực](./manage-validator.md) — chuyển nhượng tài khoản quản lý, yêu cầu ngừng tham gia và quản lý các hợp đồng đặt cược phụ.

## Tài nguyên liên quan <a id="related-resources"></a>

- [Hướng dẫn sử dụng Kaia Safe](../../../build/wallets/kaia-safe/kaia-safe.md)
- [KIP-277: Đăng ký trình xác thực tự động](https://kips.kaia.io/KIPs/kip-277)
- [KIP-163: Chuyển giao lại](https://kips.kaia.io/KIPs/kip-163)
