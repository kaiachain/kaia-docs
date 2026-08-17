# Quản lý hợp đồng staking

![Menu Quản lý Staking](/img/nodes/become-a-validator/image23.png)

Trong menu **Quản lý Staking**, bạn có thể chỉnh sửa thông tin về các hợp đồng staking đã được triển khai trước đó.

Nếu bạn kết nối bằng ví đã triển khai các hợp đồng, bạn có thể xem danh sách các hợp đồng staking, chọn một hợp đồng cụ thể và nhấp vào **[Quản lý Staking]** để truy cập vào màn hình quản lý của hợp đồng đó.

![Nhập địa chỉ hợp đồng staking](/img/nodes/become-a-validator/image24.png)

Ngoài ra, nếu bạn đăng nhập bằng bất kỳ ví quản trị hợp đồng staking nào, bạn có thể nhập địa chỉ hợp đồng staking vào ô **[Nhập địa chỉ hợp đồng CnStaking để quản lý]** để truy cập vào màn hình quản lý.

![Tổng quan về Quản lý Staking](/img/nodes/become-a-validator/image25.png)

Trên màn hình này, bạn có thể thực hiện các thao tác sau.

## Quản lý hành chính <a id="admin-management"></a>

1. **Thêm quản trị viên** — thêm quản trị viên hợp đồng staking.
2. **Xóa quản trị viên** — xóa quản trị viên của hợp đồng staking.
3. **Yêu cầu cập nhật** — thay đổi ngưỡng đa chữ ký cho hợp đồng staking.

## Hoạt động đặt cược <a id="staking-operations"></a>

![Đặt cược / Hủy đặt cược / Yêu cầu rút tiền đang chờ xử lý](/img/nodes/become-a-validator/image26.png)
![Chi tiết các thao tác đặt cược](/img/nodes/become-a-validator/image27.png)

4. **Đặt cược KAIA** — nếu tính năng Ủy quyền công khai bị tắt, bạn có thể đặt cược KAIA theo ý muốn.
5. **Rút KAIA khỏi staking** — nếu tính năng Ủy quyền công khai bị tắt, quản trị viên hợp đồng staking có thể rút KAIA khỏi staking theo quyết định của mình.
6. **Giao dịch rút tiền đang chờ xử lý** — sau khi nhấp vào nút “Unstake”, bạn có thể nhận KAIA sau **7 ngày** đến **14 ngày**.

## Quản lý địa chỉ và theo dõi <a id="address-and-tracker-management"></a>

![Địa chỉ nhận phần thưởng & người bỏ phiếu](/img/nodes/become-a-validator/image28.png)

7. **Địa chỉ nhận phần thưởng** — nếu tính năng Ủy quyền công khai bị tắt, bạn có thể thay đổi địa chỉ nhận phần thưởng.
8. **Trình theo dõi người bỏ phiếu & đặt cược** — thay đổi địa chỉ người bỏ phiếu được sử dụng cho việc bỏ phiếu GC. Khi Staking Tracker được cập nhật, bạn cũng có thể thay đổi địa chỉ của Staking Tracker.

## Chuyển giao lại <a id="redelegation"></a>

![Chuyển giao lại](/img/nodes/become-a-validator/image29.png)

9. **Chuyển giao lại** — bật hoặc tắt tính năng Chuyển giao lại, giúp bỏ qua thời gian rút tiền đặt cọc 7 ngày và chuyển KAIA ngay lập tức giữa các hợp đồng đặt cọc. Cả hợp đồng staking nguồn và hợp đồng staking đích đều phải bật tính năng Redelegation. Xem [KIP-163](https://kips.kaia.io/KIPs/kip-163) để biết thêm chi tiết.

## Yêu cầu đa chữ ký <a id="multisig-requests"></a>

![Yêu cầu xác nhận đa chữ ký](/img/nodes/become-a-validator/image30.png)

10. **Yêu cầu đa chữ ký** — khi ngưỡng đa chữ ký là 2 hoặc nhiều hơn, việc thực hiện bất kỳ hành động nào trong số các hành động từ 1 đến 9 đều yêu cầu sự xác nhận từ các quản trị viên hợp đồng staking. Đối với các yêu cầu chưa thu thập đủ số lượt xác nhận, mỗi quản trị viên có thể đăng nhập qua màn hình này và thực hiện quy trình xác nhận. Ngay khi thu thập đủ số lượng xác nhận, yêu cầu thay đổi sẽ được thực hiện.
