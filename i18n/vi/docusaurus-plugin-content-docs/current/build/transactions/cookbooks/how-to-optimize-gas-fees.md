# Cách tối ưu hóa phí gas trong hợp đồng thông minh Solidity

Hướng dẫn này cung cấp một hướng dẫn thực hành, từng bước chi tiết về cách tối ưu hóa chi phí gas khi viết hợp đồng thông minh bằng Solidity.

## Tại sao tối ưu hóa khí đốt lại quan trọng?

Tối ưu hóa gas là một phần quan trọng trong phát triển hợp đồng thông minh. Nó giúp đảm bảo rằng các hợp đồng thông minh vẫn hoạt động hiệu quả và tiết kiệm chi phí, ngay cả trong điều kiện mạng lưới bị quá tải. Bằng cách giảm thiểu chi phí tính toán trong quá trình thực thi hợp đồng, các nhà phát triển có thể giảm phí giao dịch, tăng tốc thời gian xác nhận và cải thiện khả năng mở rộng tổng thể của các ứng dụng phi tập trung (dApps) của họ.

Đối với các nhà phát triển, tối ưu hóa gas là việc viết mã sạch, an toàn và dự đoán được để giảm thiểu các tính toán không cần thiết. Đối với người dùng, điều quan trọng là đảm bảo họ có thể tương tác với hợp đồng của bạn mà không phải trả các khoản phí quá cao.

## Tại sao điều này đặc biệt quan trọng trên Kaia

Với hơn 83 ứng dụng Mini dApps đã được ra mắt và con số này vẫn đang tiếp tục tăng, blockchain Kaia đã vươn lên trở thành chuỗi khối tương thích EVM hàng đầu về khối lượng giao dịch, chủ yếu nhờ vào sự tăng trưởng mạnh mẽ của các ứng dụng trên chuỗi này.

Mỗi ứng dụng Mini dApp đều dựa vào hợp đồng thông minh để thực hiện các tác vụ trên chuỗi khối. Dù là đúc vật phẩm, đặt cược hay quản lý tài sản trong game, mọi tương tác hợp đồng đều tiêu tốn gas. Nếu không được tối ưu hóa, các ứng dụng phi tập trung (dApps) này có thể nhanh chóng trở nên quá đắt đỏ đối với người dùng để tương tác — đặc biệt là khi quy mô mở rộng.

Đó là lý do tại sao hiệu suất nhiên liệu không chỉ là một tính năng tiện ích. Đó là điều cần thiết. Các nhà phát triển xây dựng trên Kaia phải đảm bảo rằng mỗi cuộc gọi hàm được tối ưu hóa để giảm thiểu chi phí đồng thời duy trì tính năng và bảo mật.

## Các kỹ thuật tối ưu hóa khí

### Đóng gói lưu trữ

Lưu trữ và truy xuất dữ liệu trên blockchain là một trong những thao tác tiêu tốn nhiều gas nhất, đặc biệt khi dữ liệu cần được duy trì qua các giao dịch và khối. Trong Solidity, dữ liệu này được lưu trữ trong bộ nhớ hợp đồng, là bộ nhớ vĩnh viễn và tiêu tốn chi phí gas. Để giảm thiểu các chi phí này, các nhà phát triển cần tối ưu hóa cẩn thận cách sử dụng bộ nhớ, đặc biệt là khi khai báo các biến trạng thái.

Máy ảo Kaia (KVM) lưu trữ dữ liệu hợp đồng trong các đơn vị được gọi là khe lưu trữ. Mỗi khe lưu trữ có thể chứa chính xác 256 bit (32 byte) dữ liệu. Các kiểu dữ liệu trong Solidity có nhiều kích thước khác nhau — ví dụ, kiểu bool có kích thước 1 byte, và kiểu address có kích thước 20 byte.

Bằng cách sử dụng kỹ thuật gọi là đóng gói bộ nhớ, chúng ta có thể sắp xếp các biến nhỏ hơn một cách chặt chẽ để vừa vặn trong một ô bộ nhớ 32 byte duy nhất. Điều này giúp giảm lượng khí sử dụng vì việc đọc hoặc ghi vào một khe lưu trữ duy nhất rẻ hơn đáng kể so với việc truy cập nhiều khe lưu trữ.

Hãy xem xét ví dụ sau đây:

![](/img/build/wallets/storagePacking.png)

**Phân tích chi tiết:**

Trong phiên bản chưa được tối ưu hóa (**SlotUnOptimized**), Solidity lưu trữ cấu trúc như sau:

- Địa chỉ đến -> chiếm 20 byte -> được lưu trữ trong khe 0
- uint256 numConfirmations -> chiếm 32 byte -> được lưu trữ trong khe 1
- Giá trị uint80 (10 byte) và bool đã thực thi (1 byte) -> được lưu trữ trong khe 2

Mặc dù các biến **value** và **executed** có kích thước nhỏ, Solidity vẫn đặt chúng vào các ô bộ nhớ riêng biệt do yêu cầu căn chỉnh bộ nhớ, trừ khi chúng được sắp xếp lại một cách rõ ràng. Do đó, cấu trúc này sử dụng 3 ô lưu trữ, điều này có nghĩa là chi phí gas cho các thao tác lưu trữ sẽ cao gấp 3 lần. Tuy nhiên, tổng kích thước của `address (20 byte) + uint80 (10 byte) + bool (1 byte)` là **31 byte** và nằm trong giới hạn **32 byte** của một khe (slot) duy nhất. Bằng cách sắp xếp lại các tuyên bố sao cho các biến nhỏ hơn được nhóm lại với nhau, Solidity có thể gói chúng vào cùng một ô nhớ. Đây là bản chất của việc đóng gói lưu trữ.

Trong phiên bản tối ưu hóa (**SlotOptimized**) như đã trình bày ở trên, tất cả các biến nhỏ hơn được đặt cạnh nhau, cho phép trình biên dịch lưu trữ chúng trong ít khe nhớ hơn — giảm chi phí triển khai và chi phí gas khi chạy.

### Bộ nhớ đệm

Ngoài cách các biến được lưu trữ trong các ô nhớ, việc hiểu chi phí gas liên quan đến việc truy cập và sửa đổi bộ nhớ cũng rất quan trọng.

Mỗi khe lưu trữ trên Máy ảo Kaia có chi phí như sau:
20.000 gas để khởi tạo (lần ghi đầu tiên)
5.000 gas để cập nhật (các lần ghi tiếp theo)
Do đó, việc giảm thiểu số lần đọc và ghi trực tiếp vào bộ nhớ lưu trữ là vô cùng quan trọng, đặc biệt là trong các hàm được gọi thường xuyên. Một mẫu hiệu quả là lưu trữ các biến bộ nhớ vào bộ nhớ khi bạn cần truy cập chúng nhiều lần trong một hàm.

Hãy xem xét ví dụ sau đây:

![](/img/build/wallets/cacheStorage.png)

### Tránh khởi tạo biến với giá trị mặc định.

Trong Solidity, mỗi kiểu dữ liệu đều có giá trị mặc định được định nghĩa sẵn. Ví dụ: **address** mặc định là address(0), **bool** mặc định là false, và **uint** mặc định là 0. Một tình trạng kém hiệu quả thường gặp xảy ra khi các nhà phát triển gán các giá trị mặc định một cách rõ ràng trong quá trình khai báo biến, chẳng hạn như viết `bool isActive = false` hoặc `uint total = 0`.

Mặc dù điều này về mặt chức năng là chính xác, nhưng nó gây ra chi phí gas không cần thiết trong quá trình triển khai vì Solidity đã thiết lập các giá trị này theo mặc định. Bằng cách khai báo biến trạng thái mà không gán giá trị cho chúng, bạn giảm kích thước bytecode của hợp đồng và tránh các thao tác lưu trữ thừa. Sự điều chỉnh nhỏ này giúp hợp đồng thông minh của bạn hoạt động hiệu quả hơn và dễ dàng bảo trì hơn, đặc biệt khi làm việc với nhiều biến số.

Hãy xem xét ví dụ sau đây:

![](/img/build/wallets/variableInit.png)

### Giảm thiểu dữ liệu trên chuỗi

Biết rõ rằng phần lớn chi phí gas trong một giao dịch đến từ dữ liệu được lưu trữ trong bộ nhớ hợp đồng. Tốt nhất là luôn đặt câu hỏi về dữ liệu nào thực sự cần được lưu trữ trên chuỗi (on-chain) hay ngoài chuỗi (off-chain) và xem xét các ưu nhược điểm của cả hai lựa chọn. Chúng ta có thể thấy điều này trong trường hợp của các NFT hoàn toàn trên chuỗi (onchain) và mức giá cao của chúng so với các NFT truyền thống có metadata ngoài chuỗi (off-chain). Điều này có nghĩa là bạn có thể giảm đáng kể lượng gas tiêu thụ của các hợp đồng thông minh bằng cách lưu trữ thông tin ngoài chuỗi, chỉ vì bạn đã phân bổ ít biến hơn cho bộ nhớ.

### Giải phóng dung lượng lưu trữ không sử dụng

Thỉnh thoảng, chúng ta quên giải phóng dữ liệu không sử dụng trong hợp đồng của mình, điều này không tránh khỏi việc tăng chi phí gas và gây ra tình trạng tắc nghẽn mạng. Trong mọi trường hợp, việc giải phóng bộ nhớ không sử dụng chỉ đơn giản là đặt giá trị trở lại 0 sau khi bạn chắc chắn rằng nó sẽ không còn được sử dụng nữa. Bạn cũng có thể sử dụng từ khóa đặc biệt `delete` trong Solidity để giải phóng bất kỳ kiểu dữ liệu nào.

Hãy xem xét ví dụ sau đây:

![](/img/build/wallets/freeUpUnusedVariable.png)

### Lưu trữ dữ liệu trong calldata thay vì bộ nhớ cho các tham số của một số hàm.

Một kỹ thuật hiệu quả trong lập trình golf là sử dụng calldata cho các tham số mảng chỉ đọc trong các hàm của bạn. Calldata là một khu vực không thể sửa đổi và không lưu trữ vĩnh viễn, nơi các tham số hàm được lưu trữ trong quá trình gọi hàm từ bên ngoài. Nó rẻ hơn đáng kể so với bộ nhớ vì không yêu cầu phân bổ bộ nhớ hoặc sao chép dữ liệu.

Khi hàm của bạn chỉ cần đọc một mảng hoặc chuỗi đầu vào mà không thay đổi nó, việc khai báo tham số dưới dạng calldata giúp giảm tiêu thụ gas. Điều này đặc biệt hữu ích cho các chức năng được gọi thường xuyên hoặc xử lý dữ liệu đầu vào lớn, chẳng hạn như chuyển dữ liệu theo lô hoặc phân phối airdrop cho nhiều người nhận.

Hãy xem xét ví dụ sau đây:

![](/img/build/wallets/memory-calldata.png)

### Sử dụng Mappings thay vì Arrays

Ở cốt lõi, có hai cấu trúc dữ liệu chính được sử dụng để quản lý dữ liệu trong Solidity: **mảng** và **bảng ánh xạ**. Mảng lưu trữ các tập hợp các phần tử, trong đó mỗi phần tử được gán cho một chỉ số cụ thể, khiến chúng phù hợp cho các danh sách có thứ tự. Mappings, mặt khác, hoạt động như các kho lưu trữ khóa-giá trị cho phép truy cập trực tiếp vào các giá trị thông qua các khóa duy nhất.

Khi làm việc với mảng, việc truy xuất một giá trị cụ thể thường yêu cầu lặp qua toàn bộ bộ sưu tập, điều này gây ra chi phí gas cho mỗi bước tính toán. Điều này khiến mảng kém hiệu quả hơn cho việc tra cứu, đặc biệt là trong các tập dữ liệu lớn. Trừ khi việc lặp lại hoặc nhóm các mục tương tự là cần thiết, việc sử dụng bản đồ (mapping) để quản lý danh sách dữ liệu sẽ tiết kiệm tài nguyên hơn.

Bảng ánh xạ cung cấp truy cập với thời gian cố định và tránh được chi phí phát sinh từ việc duyệt mảng, khiến chúng trở thành lựa chọn ưu tiên để tối ưu hóa việc sử dụng gas trong nhiều hợp đồng thông minh.

Hãy xem xét ví dụ sau đây:

![](/img/build/wallets/mappingVsArray.png)

### Mảng có kích thước cố định so với mảng động

Mặc dù các bản đồ (mappings) thường hiệu quả hơn về mặt gas so với các mảng (arrays), vẫn có những trường hợp hợp lý mà mảng là cần thiết. Trong các trường hợp này, nên sử dụng mảng có kích thước cố định khi số lượng phần tử đã được xác định tại thời điểm biên dịch. Mảng có kích thước cố định cung cấp các mẫu lưu trữ dự đoán được và tránh được chi phí phát sinh liên quan đến các thao tác thay đổi kích thước.

Ngược lại, mảng động có thể thay đổi kích thước trong quá trình thực thi hợp đồng, điều này dẫn đến chi phí gas bổ sung cho việc phân bổ bộ nhớ và kiểm tra giới hạn. Bằng cách sử dụng mảng có kích thước cố định khi có thể, bạn giúp giảm tiêu thụ gas và cải thiện hiệu suất tổng thể của hợp đồng thông minh.

Hãy cùng xem ví dụ sau đây:

![](/img/build/wallets/dynamic-fixed-arr.png)

### Sử dụng các giá trị bất biến và hằng số

Một cách hiệu quả để tối ưu hóa chi phí gas trong Solidity là khai báo các biến là hằng số (constant) hoặc bất biến (immutable). Các loại biến đặc biệt này chỉ được gán giá trị một lần, hoặc tại thời điểm biên dịch trong trường hợp hằng số, hoặc trong quá trình triển khai hợp đồng cho các biến bất biến — và trở thành chỉ đọc sau đó. Vì các giá trị này được nhúng trực tiếp vào mã bytecode của hợp đồng, chúng tránh được việc truy cập bộ nhớ, vốn thường là một trong những thao tác tốn kém nhất trong quá trình thực thi hợp đồng thông minh. Điều này khiến chúng trở thành công cụ mạnh mẽ để giảm lượng khí thải đồng thời duy trì tính rõ ràng và hiệu quả của mã nguồn.

Hãy cùng xem ví dụ sau đây:

![](/img/build/wallets/constant-imm.png)

### Xử lý lỗi được tối ưu hóa

Khi tối ưu hóa mã trong Solidity, nguyên tắc giữ cho mã đơn giản và hiệu quả cũng áp dụng cho việc xử lý lỗi. Lỗi tùy chỉnh cung cấp một giải pháp tiết kiệm tài nguyên thay thế cho các câu lệnh require truyền thống sử dụng thông báo chuỗi. Khác với các lỗi dựa trên chuỗi — được lưu trữ trong mã byte của hợp đồng và tăng kích thước tùy thuộc vào độ dài của tin nhắn, các lỗi tùy chỉnh có chi phí thấp hơn đáng kể.

Chúng hoạt động bằng cách sử dụng một bộ chọn 4 byte nhỏ gọn, được dérivée từ hàm băm keccak256 của chữ ký lỗi, tương tự như cách tính toán các bộ chọn hàm. Dù được sử dụng bên trong các câu lệnh require hay if, các lỗi tùy chỉnh giúp giảm kích thước bytecode và chi phí gas khi chạy, đồng thời vẫn đảm bảo tính rõ ràng trong quá trình gỡ lỗi.

Hãy cùng xem ví dụ sau đây:

![](/img/build/wallets/custom-err.png)

### Sử dụng bộ điều chỉnh khả năng hiển thị bên ngoài

Khi bạn chắc chắn rằng một hàm chỉ được gọi từ bên ngoài hợp đồng, hoặc bởi một tài khoản được sở hữu bên ngoài hoặc một hợp đồng thông minh khác, việc tuyên bố quyền truy cập của hàm là external là một thực hành tốt. Hướng dẫn này dựa trên cách Solidity xử lý tham số hàm và phân bổ bộ nhớ.

Các hàm ngoại đọc các tham số của mình trực tiếp từ dữ liệu gọi, đây là một phần chỉ đọc được tối ưu hóa cho đầu vào từ bên ngoài. Mặt khác, các chức năng công khai có thể được truy cập cả từ bên trong và bên ngoài. Khi một hàm công khai được gọi từ bên ngoài hợp đồng, nó sẽ đọc các tham số từ dữ liệu gọi (call data) giống như một hàm ngoại vi.

Tuy nhiên, khi được gọi từ bên trong, các tham số được truyền qua bộ nhớ, điều này tốn kém hơn do phải phân bổ bộ nhớ bổ sung và sao chép dữ liệu. Bằng cách đánh dấu một hàm là hàm ngoại, đặc biệt là khi hàm đó không được thiết kế để sử dụng nội bộ, bạn sẽ giảm thiểu các thao tác bộ nhớ và cải thiện hiệu suất gas. Sự thay đổi nhỏ này có thể dẫn đến các hợp đồng thông minh được tối ưu hóa hơn và hiệu quả về chi phí.

Hãy cùng xem ví dụ sau đây:

![](/img/build/wallets/externalVsPublic.png)

### Sử dụng lắp ráp trong dòng

Lắp ráp trong dòng cho phép các nhà phát triển tương tác trực tiếp với các mã lệnh KVM. Kỹ thuật này có thể mang lại hiệu suất sử dụng gas tốt hơn so với mã Solidity tiêu chuẩn trong một số trường hợp cụ thể. Mặc dù nó bỏ qua các kiểm tra an toàn của Solidity và làm giảm tính dễ đọc, nhưng nó đặc biệt hữu ích cho hiệu suất của các thao tác quan trọng như truy cập bộ nhớ trực tiếp, các phép toán bitwise hoặc các luồng điều khiển tùy chỉnh. Khi được sử dụng một cách cẩn thận, lắp ráp trong dòng có thể giúp giảm chi phí nhiên liệu bằng cách cung cấp kiểm soát chính xác về cách các thao tác được thực hiện bên trong hệ thống.

Hãy cùng xem ví dụ sau đây:

![](/img/build/wallets/inline-assembly.png)

## Kết luận

Tối ưu hóa chi phí gas là một phần quan trọng trong việc viết các hợp đồng thông minh hiệu quả và tiết kiệm chi phí trong Solidity. Mặc dù việc triển khai trên Kaia đã mang lại chi phí giao dịch thấp hơn cho người dùng, việc áp dụng các kỹ thuật tối ưu hóa gas đã được chứng minh vẫn là trách nhiệm của nhà phát triển.  Bằng cách tuân thủ các hướng dẫn được nêu trong tài liệu này, bạn có thể giảm đáng kể chi phí thực thi, nâng cao khả năng mở rộng của hợp đồng và cung cấp trải nghiệm mượt mà và bền vững hơn cho người dùng của mình.




