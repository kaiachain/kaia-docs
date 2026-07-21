# Bản báo cáo kỹ thuật Kaia Blockchain phiên bản 1.3

## Important Notice

Các mã thông báo kỹ thuật số của Dự án Kaia (sau đây gọi tắt là “KAIA” với mã chứng khoán là KAIA) không nhằm mục đích trở thành một sản phẩm được quản lý như chứng khoán, token tiền pháp định hoặc tiền điện tử, tài sản ảo được chấp nhận hoặc các khoản đầu tư cụ thể – mỗi khái niệm được định nghĩa theo Quy định về Dịch vụ và Thị trường Tài chính năm 2015 của Thị trường Toàn cầu Abu Dhabi (“FSMR”), hoặc các quy định tương đương, hay bất kỳ sản phẩm nào khác được quản lý tại bất kỳ khu vực pháp lý nào.

Hiện tại, Quỹ không bắt buộc phải có giấy phép do Cơ quan Quản lý Dịch vụ Tài chính (“FSRA”) thuộc Thị trường Toàn cầu Abu Dhabi (“ADGM”) cấp, do KAIA không phải là sản phẩm thuộc diện quản lý tại ADGM. Quỹ không cung cấp bất kỳ dịch vụ nào thuộc phạm vi quản lý cũng như không thực hiện bất kỳ hoạt động nào thuộc phạm vi quản lý tại ADGM hay tại bất kỳ khu vực pháp lý nào.

Please note that you may not be able to recover any monies paid for KAIA in the event that the KAIA Token Economy fails to materialize or where the vision or objects of the Foundation fails.

This Whitepaper is meant to provide more information on the KAIA Token Economy and functions of KAIA, and does not constitute a prospectus or offer document of any sort.

This Whitepaper does not constitute or form part of any opinion or any advice to sell, or any recommendation or solicitation of any offer to purchase KAIA nor shall it or any part of it or the fact of its presentation form the basis of, or be relied upon in connection with, any contract or investment decision.

No person is bound to enter into any contract or binding legal commitment in relation to the sale and purchase of KAIA and no digital tokens or other form of payment is to be accepted on the basis of this Whitepaper.

Any agreement between the Foundation and you as a recipient or purchaser, and in relation to any airdrop, sale or purchase of KAIA is to be governed by a separate document setting out the terms and conditions (the “T&Cs”) of such agreement. In the event of any inconsistencies between the T&Cs and this Whitepaper, the T&Cs shall prevail. Your eligibility to receive, purchase or sell KAIA on any digital token trading platform or exchange is subject to your compliance with their respective terms and conditions.

No regulatory authority has approved any of the information set out in this Whitepaper. No such action has been or will be taken under the laws, regulatory requirements or rules of any jurisdiction. Việc xuất bản, phân phối hoặc phổ biến Báo cáo chuyên sâu này không có nghĩa là các luật, yêu cầu quy định hoặc quy tắc hiện hành đã được tuân thủ.

This Whitepaper, any part thereof and any copy thereof must not be taken or transmitted to any country where distribution or dissemination of this Whitepaper is prohibited or restricted.

No part of this Whitepaper is to be reproduced, distributed or disseminated without including this section and the section titled “IMPORTANT NOTES” at the back of this Whitepaper.

**PLEASE READ THE SECTION TITLED “IMPORTANT NOTES” AT THE BACK OF THIS WHITEPAPER VERY CAREFULLY.**

**IF YOU ARE IN ANY DOUBT AS TO THE ACTION YOU SHOULD TAKE, YOU SHOULD CONSULT YOUR LEGAL, FINANCIAL, TAX OR OTHER PROFESSIONAL ADVISOR(S).**

## Introduction

### Our Origin

Blockchain Finschia, dựa trên nền tảng LINE Blockchain do công ty nhắn tin toàn cầu LINE khởi xướng vào năm 2018, và blockchain Klaytn, được thành lập vào năm 2019 trên nền tảng của Kakao, công ty phần mềm hàng đầu của Hàn Quốc, đã hợp nhất blockchain và hệ sinh thái của mình với mục tiêu chung là thúc đẩy việc áp dụng rộng rãi công nghệ blockchain, từ đó tạo ra blockchain Kaia.

Kaia Blockchain is a Layer 1 blockchain based on EVM (Ethereum Virtual Machine) and has been designed with scalability, convenience, and reliability as top priorities. Kaia Blockchain focuses on transformative changes that will empower not only technology and business but also individuals in the Web 3.0 era. Quỹ Kaia DLT và các thành viên trong hệ sinh thái hướng tới việc giúp công nghệ blockchain trở nên dễ tiếp cận hơn và tạo điều kiện cho nhiều người hơn tham gia vào cuộc cách mạng Web 3.0. Kaia Blockchain will settle as a trusted stratum that connects people from different backgrounds all over the world.

To build the infrastructure for the collaborative Web 3.0 playground, Kaia Blockchain will combine powerful integrated community and infrastructure technologies to discover new opportunities and accelerate innovation.

### Sứ mệnh

Mục tiêu của chúng tôi là xây dựng một tương lai công bằng và cởi mở hơn bằng cách đảm bảo cho mọi người có nhiều cơ hội kinh tế hơn và quyền được tham gia thông qua công nghệ blockchain.

### Tầm nhìn

Tầm nhìn cốt lõi của Kaia Blockchain là kết nối một cộng đồng người dùng rộng lớn, khối lượng tài sản trên chuỗi khổng lồ cùng với công nghệ tiên tiến, nhằm hỗ trợ các nhà phát triển nhanh chóng triển khai và mở rộng các ý tưởng của họ, từ đó đạt được những thành công rực rỡ. Với tư cách là một nền tảng, Kaia Blockchain cung cấp các công cụ và môi trường cần thiết cho các nhà phát triển, đồng thời mang đến cho họ cơ hội giới thiệu các giải pháp sáng tạo đến đông đảo công chúng. Họ dự định tạo ra giá trị mới bằng cách tận dụng các tài sản trên chuỗi và theo đuổi sự đổi mới vượt ra ngoài những giới hạn công nghệ. Sự phát triển và thành công bền vững của cộng đồng các nhà phát triển là một trong những mục tiêu cốt lõi của Kaia Blockchain. Để các nhà phát triển bất động sản biến khát vọng của mình thành hiện thực, chúng tôi sẽ hỗ trợ họ hiện thực hóa tầm nhìn đó, từ giai đoạn hình thành ý tưởng cho đến triển khai, thâm nhập thị trường và phát triển.

## Lợi ích mang lại

Kaia Blockchain đặt mục tiêu xây dựng nền tảng blockchain số 1 châu Á thông qua việc tích hợp hai mạng chính và dẫn đầu xu hướng áp dụng Web3 – đây cũng chính là mục tiêu chung của hai nền tảng blockchain này. Tầm nhìn này có thể được hiện thực hóa bằng cách hỗ trợ các nhà phát triển hình thành ý tưởng, phát triển và triển khai thành công các dự án thông qua cơ sở người dùng rộng lớn, nguồn tài sản trên chuỗi phong phú và vị thế dẫn đầu về công nghệ như được trình bày dưới đây. Kaia Blockchain cung cấp một cơ sở hạ tầng vững chắc cho các dự án Web3 ở mọi quy mô, tạo ra một môi trường lý tưởng cho các nhà phát triển mong muốn biến những ý tưởng sáng tạo thành hiện thực.

### Cơ sở người dùng rộng lớn

1. **Khả năng tiếp cận của người dùng Web2**: Một trong những thách thức lớn nhất mà các dự án Web3 phải đối mặt là thu hút người dùng Web2. Kaia Blockchain giúp người dùng Web2 hiện tại dễ dàng tiếp cận thông qua ví tích hợp ứng dụng nhắn tin, nhờ sự hợp tác với Kakao – nền tảng có 50 triệu người dùng tại Hàn Quốc – và LINE – nền tảng có 200 triệu người dùng tại Nhật Bản, Đài Loan, Indonesia và Thái Lan.
2. **Khả năng tiếp cận của người dùng Web3**: Bên cạnh người dùng Web2, nền tảng này giúp thu hút người dùng Web3 tham gia dự án một cách nhanh chóng và dễ dàng thông qua việc cung cấp hơn 1,2 triệu địa chỉ ví đang hoạt động cùng một giao diện kết nối người dùng với dự án.
3. **Hỗ trợ xây dựng cộng đồng**: Chương trình này giúp người dùng tập hợp và triển khai các dự án thông qua các hoạt động tiếp thị chung với Quỹ Kaia DLT, đồng thời tạo ra một môi trường dễ tiếp cận và sử dụng cho người dùng từ các chuỗi khối khác nhau.

### Hỗ trợ thanh khoản dồi dào

1. **Kết nối với Tài sản Thực (RWA)**: Các tài sản thực như vàng, tàu thuyền và bất động sản đã tồn tại trên blockchain Kaia. Ngoài ra, các tài sản trong thế giới thực như các loại stablecoin được bảo đảm bằng tiền pháp định và trái phiếu sẽ được đưa lên chuỗi khối, giúp các nhà phát triển có thể tận dụng một loạt tài sản đa dạng hơn.
2. **Quỹ Hệ sinh thái Quy mô Lớn (Kaia Ecosystem Fund):** Một quỹ hệ sinh thái quy mô lớn có thể được thành lập dựa trên KAIA và hỗ trợ các lĩnh vực khác nhau cần thanh khoản, chẳng hạn như DeFi và GameFi.
3. **Lợi suất bản địa trên chuỗi**: Tính năng khai thác MEV (Giá trị có thể khai thác tối đa) được tích hợp sẵn cho phép những người tham gia staking KAIA tự động thu được lợi nhuận từ MEV ngay trên chuỗi. Điều này dẫn đến việc tăng tính thanh khoản của chuỗi và đồng thời cung cấp một phương thức để tiêu hủy token.

### Công nghệ cốt lõi hàng đầu và sự thuận tiện trong phát triển

1. **Tính cuối cùng của giao dịch cấp cao nhất**: Mang lại TPS cao hơn và mức độ phi tập trung cao hơn, đồng thời vẫn duy trì tính cuối cùng của giao dịch trong vòng 1 giây.
2. **Khả năng tương thích với Ethereum:** Các ứng dụng phi tập trung (dApps) dựa trên EVM có thể được tích hợp mà không cần bất kỳ sự điều chỉnh nào, nhờ khả năng tương thích 100% với Ethereum.
3. **Mô hình tài khoản tiện lợi:** Mô hình tài khoản của Kaia Blockchain cho phép gán các khóa khác nhau cho các tài khoản, từ đó tăng cường bảo mật tài khoản và nâng cao trải nghiệm người dùng.
4. **Cấu trúc phi tập trung và không cần xin phép**: Kaia Blockchain đang chuyển đổi sang mô hình xác thực không cần xin phép, đồng thời tăng cường tính phi tập trung của mạng lưới.

## Nền kinh tế dựa trên token

### Giới thiệu

Các nền tảng blockchain công khai được duy trì thông qua mô hình token, điều này có ảnh hưởng lớn đến hướng phát triển của nền tảng. Vì các chuỗi khối nói chung không có cơ quan quản lý trung tâm, nên việc khuyến khích những cá nhân duy trì và phát triển chuỗi khối là điều vô cùng quan trọng để đảm bảo sự tồn tại lâu dài của nó. Tuy nhiên, việc kỳ vọng các bên tham gia sẽ tham gia vào công tác bảo mật blockchain chỉ vì động cơ vị tha mà không tìm kiếm bất kỳ lợi ích tài chính nào là không thực tế. Do đó, cần phải có một hệ thống khuyến khích để thúc đẩy các thành viên trong hệ sinh thái blockchain duy trì và phát triển mạng lưới.

Trong các hệ thống blockchain, các cơ cấu quản trị là động lực thúc đẩy sự thay đổi. Các nền tảng blockchain phải thay đổi để bắt kịp với những diễn biến bên ngoài, khi các công nghệ sẵn có tiếp tục phát triển và nhu cầu thị trường thay đổi. Khác với các sản phẩm thông thường do một công ty duy nhất hoặc một cơ quan quản lý trung ương phát triển và duy trì, blockchain công khai không phù hợp để một thực thể duy nhất đưa ra và thực thi các quyết định đơn phương. Ví dụ, ngay cả khi các nhà phát triển chính quyết định thực hiện một bản cập nhật phần mềm, các thợ đào có thể sẽ không áp dụng bản cập nhật đó. Do đó, cần có một quy trình quản trị nhằm thu thập ý kiến của tất cả các bên tham gia trong hệ sinh thái và đưa ra quyết định dựa trên những ý kiến thu thập được, để mạng lưới blockchain có thể thực hiện các thay đổi kịp thời. Phải có một cơ cấu quản trị ổn định để blockchain có thể điều chỉnh một cách phù hợp trước những thay đổi từ bên ngoài.

Chương này giải thích về mô hình token và hệ thống quản trị của Kaia Blockchain. Kaia Blockchain hướng đến mục tiêu hỗ trợ các nhà phát triển nhanh chóng triển khai, mở rộng quy mô và đạt được kết quả thành công nhờ vào cơ sở người dùng rộng lớn, khối lượng tài sản trên chuỗi khổng lồ cùng nền tảng công nghệ của mình. Tài liệu này sẽ trình bày các nguyên tắc thiết kế được áp dụng để phát triển các tính năng hiện tại của Kaia Blockchain cũng như cách thức các tính năng này có thể thay đổi. Thông tin được cung cấp trong tài liệu này sẽ được xác minh dựa trên các dữ liệu liên quan, và một phần nội dung này có thể sẽ được điều chỉnh sau khi đã qua quá trình xác minh và rà soát kỹ lưỡng.

### Các nguyên tắc thiết kế

Việc thiết kế hệ thống kinh tế dựa trên token và cơ cấu quản trị của một nền tảng blockchain là một vấn đề phức tạp. Trước hết, hệ thống kinh tế dựa trên token và các cơ cấu quản trị được thử nghiệm trong các điều kiện được kiểm soát, vốn không phản ánh đầy đủ thực tế. Do đó, không thể lường trước được mọi tình huống. Cũng cần lưu ý rằng ngành công nghiệp blockchain vẫn đang ở giai đoạn sơ khai và chúng ta vẫn chưa chứng kiến một hệ thống nào hoạt động thành công trong dài hạn. Kaia Blockchain đã xem xét các yếu tố môi trường này và xác định các nguyên tắc nội bộ không bị chi phối bởi các tác động bên ngoài, thay vì duy trì một mô hình cụ thể duy nhất. Cơ chế kinh tế dựa trên token và cơ cấu quản trị chi tiết có thể linh hoạt điều chỉnh để phù hợp với điều kiện thị trường và các quy định. Tuy nhiên, các nguyên tắc thiết kế sẽ vẫn được giữ nguyên như một giá trị cốt lõi chung của tất cả các thành viên trong hệ sinh thái.

Các nguyên tắc thiết kế cốt lõi của mô hình token trên blockchain Kaia là:

- **Thưởng cho những người đóng góp cho hệ sinh thái:** Để một nền tảng blockchain có thể phát triển bền vững và mang lại giá trị lớn cho người dùng, việc chỉ duy trì mạng lưới là chưa đủ; sự phát triển của hệ sinh thái nền tảng cũng rất quan trọng. Do đó, Kaia Blockchain sẽ xác định các chủ thể đóng góp vào sự tăng trưởng này và trao thưởng cũng như hỗ trợ tương xứng với mức độ đóng góp của từng thành viên. Điều này sẽ giúp không chỉ những người đóng góp vào quá trình tạo và xác minh khối, mà cả các nhà cung cấp dịch vụ đã góp phần vào sự phát triển của hệ sinh thái nền tảng cũng nhận được mức thù lao hợp lý tương xứng với đóng góp của họ, từ đó trở thành động lực hấp dẫn đối với những người đóng góp tiềm năng từ bên ngoài.
- **Phần thưởng cho đóng góp:** Một ví dụ cụ thể về việc áp dụng nguyên tắc này. Thông qua cơ chế phân phối dựa trên đóng góp, các thành viên trong mạng lưới — bao gồm các nhà xác thực và thành viên cộng đồng — những người tích cực đóng góp vào các chỉ số đóng góp đã được xác định sẽ nhận được phần thưởng tương xứng với mức độ đóng góp của họ, trong khi các phần thưởng chưa xứng đáng sẽ bị tiêu hủy, từ đó làm giảm lượng phát hành ròng thực tế.
- **Elastic Token Economy:** The token economy has numerous active participants with different interests and is greatly affected by various internal and external changes. Therefore, the token economy will be flexible to external variables based on consistent core principles rather than maintaining a single model. Based on these core principles, the token economy of Kaia Blockchain can respond quickly and flexibly to external changes. At the same time, it can support the ecosystem participants to operate stably and align the direction to promote overall growth.
- **Sustainable Growth:** Blockchain platforms must maintain continuous growth. In other words, it must retain the existing and new participants within the ecosystem based on a reasonable incentive model and a system that can flexibly respond to the needs and impacts of rapidly changing markets within and outside the ecosystem. In return, Kaia Blockchain will be able to achieve balanced and stable growth based solely on the contributions of ecosystem participants without any artificial value expansion.
- **Simplicity:** Kaia Blockchain will be explainable simply and clearly. This will allow for quick optimizations and fixes in the future. Its simplicity will allow everyone involved to easily understand the functionality.
- **Experiment and Optimize with Data:** How high should inflation be? What types of rewards should be given for what actions? These questions are difficult to answer without testing and verification. Kaia Blockchain will transparently analyze data obtained and managed on the blockchain, optimize the platform by testing various hypotheses, and transparently share the results through technical reports.

### Kaia Blockchain Tokenomics

#### KAIA

KAIA is the platform-native cryptocurrency of the Kaia Blockchain, used to enhance the security of the Kaia Blockchain through staking or to pay transaction fees. Transaction fees are incurred when deploying or executing smart contracts, or when transferring tokens.

KAIA is an essential element and fuel for operating the Kaia Blockchain platform. The users’ KAIA is paid to the validators to execute tasks requested by clients of the platform. In other words, KAIA is an incentive that will ensure developers write high-quality application codes (wasteful codes cost more) and the network remains healthy (validators are compensated for the contributed resources).

#### Kaia Blockchain’s Incentive Mechanism

The incentive mechanism of Kaia Blockchain seeks to achieve the following goals:

- Ability to maintain sufficient economic security and network over the long term.
- Support for entities promoting economic activity

In general, incentives in public blockchains are used to maintain the network and ensure economic security. Maintaining a blockchain requires someone to continuously store block data and process new transactions. Due to this, blockchains such as Bitcoin or Ethereum provide block rewards to miners processing block creation. Incentives are also closely related to economic security. Simply put, economic security is proportional to the cost required to carry out an attack on a blockchain. This cost typically becomes higher as the potential profit of the block creator increases during the block creation process.

Incentives are necessary to ensure a high level of economic security and a well-maintained network. And for the system to operate stably, the value of cryptocurrency must be maintained or rise. If the value of cryptocurrency falls suddenly, the economic security and network stability may decline proportionally.

The stability or increase in value of KAIA largely depends on its utility. This utility comes from a large number of people using and burning KAIA, which occurs when high-quality service providers actively provide services on Kaia Blockchain.

#### Economically Sourced Incentives

Kaia Blockchain provides incentives through the issuance of new KAIA and transaction fees. Additionally, to maintain the value of KAIA as a means of economic support, sustainable methods for distributing and burning KAIA exist.

##### Minting

On the Kaia Blockchain mainnet, a certain amount of KAIA is issued whenever a new block is created. Mỗi khi một khối mới được tạo ra, một lượng KAIA nhất định sẽ được phát hành mới, và tỷ lệ lạm phát hàng năm mục tiêu ban đầu (lượng KAIA được phát hành mới mỗi năm / tổng số token KAIA trên thị trường) của Kaia Blockchain sẽ được thiết lập ở mức 5,2%[^1]. The number of newly issued KAIA per block at this point is not permanently set; it can be changed through governance voting. By default, the inflation rate of KAIA reflects the economic growth rate of Kaia Blockchain. Although the goal is a lower value, the exact value will be determined through the governance. In the mid to long term, the inflation rate and new issuance quantity per block can be automatically calculated and applied based on the inflation algorithm inherent in the chain.

Cần lưu ý rằng mặc dù tỷ lệ lạm phát tổng và khối lượng phát hành trên mỗi khối vẫn không thay đổi, nhưng tỷ lệ lạm phát ròng thực tế có thể thấp hơn tỷ lệ danh nghĩa. Điều này là do các phần thưởng đóng góp chưa được hưởng sẽ bị tiêu hủy theo cơ chế phần thưởng đóng góp đã được cơ quan quản trị phê duyệt, từ đó làm giảm khối lượng thực tế của KAIA mới được phát hành đưa vào lưu thông. Nói cách khác, bên cạnh cơ chế đốt token hiện có, còn xuất hiện thêm áp lực giảm phát do các phần thưởng đóng góp không dựa trên thành tích. Mức độ giảm này phụ thuộc vào tổng mức đóng góp của các trình xác thực đang hoạt động trong bất kỳ khoảng thời gian nào. Để biết thêm chi tiết, hãy tham khảo phần “Đốt dựa trên lượng đóng góp” trong Mô hình đốt 4 lớp.

##### Transaction Fee

Kaia Blockchain has determined its transaction fee policy to maximize service orientation, user-centricity, and enterprise-friendliness while maintaining network stability. The transaction fee policy takes into account the following points pursued by Kaia Blockchain.

- Improved User Experience
  - We aim to minimize complicated or unnecessary procedures when users pay transaction fees. This will allow users not familiar with blockchain technology to easily use Kaia Blockchain. For example, tasks such as manually entering gas prices should be minimized. The volatility of the transaction fee should also be minimized so that users can use Kaia Blockchain comfortably.
- Improved Operational Processes for Service Providers
  - Service providers can pay for the transaction fees on behalf of users through the unique account model in Kaia Blockchain. Therefore, business convenience for dApp service providers is also a major consideration in fee policy.
  - The basic elements to reduce the burden on service providers are low transaction fees and low volatility fee policies. The low fee is to assist in the expansion of services using the fee delegation feature in the Kaia account model, while the low volatility is to help predict business costs due to the payment fee.
- Protection against Network Attacks
  - Blockchain data storage and computation incur costs. Without transaction fees, attackers may DDoS or spam attack the blockchain by sending meaningless transactions. To prevent meaningless transactions, a reasonable fee will be imposed on transactions.

Kaia Blockchain applies a dynamic gas fee model to the network to achieve the above goals. In the dynamic gas fee model of Kaia Blockchain, a low fee is applied in general cases where there are not many transactions on the network. However, in special situations such as a rapid increase in transactions on the network or a DDoS or spam attack, the gas fee increases. This results in a reduction of meaningless transactions. The dynamic gas fee model could change the gas fee per block unit dynamically depending on the transaction congestion within the network, but the range of change is predictable to some extent. Transactions entered into a block have transaction fees calculated with an identical block gas fee (baseFee), and only transactions with a gas fee greater than or equal to the block gas fee can be entered into the block. Block gas fees automatically increase or decrease depending on the gas usage of the previous block with the current maximum fluctuation set to 5%. A portion of the transaction fee used in each block is set to be automatically burned. Various parameters of the dynamic gas fee model can be changed via the governance function.

The transaction fees for Kaia Blockchain are currently determined by applying a dynamic gas fee model. However, a new gas fee model or transaction fee policy may be required according to the environmental changes. If necessary, changes to the gas fee model or transaction fee policy of Kaia Blockchain will be made through the governance process.

##### Block Reward Distribution

The block reward for each block is determined by the sum of the KAIA issued at the time of block creation and the transaction fee. This is distributed as follows. However, the specific ratio and category of the block reward distribution may be changed by governance.

- Validators and Community: 50%
  - Trong số 50% đó, 20% là phần thưởng đóng góp
  - Of the 50%, 80% is staking rewards
- KEF (Kaia Ecosystem Fund): 25%
- KIF (Kaia Infrastructure Fund): 25%

_Khoản phân bổ dành cho phần thưởng đóng góp sẽ được tích lũy vào Quỹ Hiệu suất Kaia (KPF) — một quỹ phần thưởng chuyên dụng dành cho phần thưởng đóng góp — mỗi khi một khối được tạo ra, và sau đó có thể được phân phối hoặc tiêu hủy theo khung cơ chế phần thưởng đóng góp đã được cơ quan quản trị phê duyệt._

##### Burning

The method for maintaining or enhancing the KAIA value is an essential element of any incentive structure based on KAIA. In Kaia Blockchain’s ecosystem growth stage, the additional issuance of the KAIA motivates the ecosystem members to participate. However, a method to control the circulation volume is necessary for it to operate as a long-term sustainable incentive. Mô hình đốt token 4 lớp của Kaia Blockchain giúp ngăn chặn lạm phát quá mức. Mô hình đốt 4 lớp là một khái niệm toàn diện, không chỉ bao gồm chức năng đốt vốn có của Kaia Blockchain mà còn bao gồm khái niệm đốt có thể diễn ra thông qua các cơ chế đóng góp của các validator và mối quan hệ với các dự án trong hệ sinh thái. This extensive burn model will effectively regulate circulation volume and provide stable value incentives to the network participants when the Kaia Blockchain ecosystem reaches maturity. The description of each Layer is as follows.

1. Transaction-Based Burning

This is the default burning method provided by Kaia Blockchain. Users generate transactions to use the blockchain and a portion of the transaction fee is automatically burned. Since transaction-based burning can be interpreted as reduced profits of the node operators, the burning extent is adjusted through agreement and consensus among key network participants through on-chain governance.

2. MEV(Maximal Extractable Value) Burning

A validator may receive additional profits (e.g. maximal extractable value) by taking advantage of the fact that they can determine the transaction order during the block proposal process. This structure can escalate into issues of censorship or unfairness. As a result, Kaia Blockchain seeks to share the authority of the validator among all users through the implementation of technologies such as on-chain auctions. Part of the profit generated in this process will be burned due to it being generated through a special structural qualification called a validator.

3. Business-Based Burning

Business-based burning is not an inherent function of Kaia Blockchain. Rather it is implemented through the ecosystem services and business relationships. Ecosystem services can receive support from protocols such as Kaia Ecosystem Fund to initially accelerate growth. Additionally, the value of KAIA or the activation of Kaia Blockchain affects the activation of services considering services utilize blockchain functions. Kaia Blockchain encourages the ecosystem services to install the concept of burning KAIA within the service to ensure that the service and blockchain maintain the value of KAIA under the same goal.

4. Đốt dựa trên đóng góp

Theo cơ chế phần thưởng đóng góp, một phần của khoản phân bổ phần thưởng dành cho người xác thực sẽ chỉ được phân phối cho những người xác thực đáp ứng các ngưỡng đóng góp trên chuỗi đã được quy định. Khi các nhà xác thực không đáp ứng đầy đủ các ngưỡng này, phần chưa được hưởng trong tổng phần thưởng đóng góp sẽ không được phân phối mà sẽ bị đốt. Điều này tạo ra mối liên hệ trực tiếp giữa mức độ tham gia vào mạng lưới và nguồn cung token. Số lượng token bị đốt được xác định một cách xác định dựa trên dữ liệu đóng góp trên chuỗi và được Quỹ thực hiện định kỳ theo khung phần thưởng đóng góp đã được cơ chế quản trị phê duyệt, mà không cần phải tiến hành một cuộc bỏ phiếu quản trị riêng biệt cho mỗi lần đốt.

### Validator Incentives

Validators are operators in Kaia Blockchain who are responsible for block creation and verification based on the consensus algorithm. Validators are required to stake at least 5 million KAIA on the nodes they operate. In addition, validators participate in the on-chain vote of Kaia Blockchain and have the qualifications of GC (Governance Council), which makes key decisions in the ecosystem. In the future, the concepts of validator participating in block creation and GC participating in decision-making will be separated, so that anyone meeting certain conditions could participate in block creation and verification even if they are not a GC. Research and development of building this permissionless network is in progress.

Có hai loại phần thưởng được cung cấp nhằm khuyến khích các nhà xác thực thuộc Hội đồng Quản trị đóng góp vào việc đảm bảo an ninh và thúc đẩy sự phát triển của mạng lưới: phần thưởng đóng góp và phần thưởng staking.

- Phần thưởng đóng góp khuyến khích các nhà xác thực tích cực đóng góp vào sự phát triển của mạng lưới, không chỉ dừng lại ở việc tạo và xác minh các khối. 10% (tương đương 20% của 50% phần thưởng dành cho người xác thực và cộng đồng) trong tổng lượng lạm phát hàng năm được phát hành sẽ được phân bổ vào quỹ phần thưởng đóng góp và được phân phối theo tỷ lệ tương ứng với những đóng góp có thể đo lường được trên chuỗi của từng người xác thực. Bất kỳ phần nào trong số lượng được phân bổ mà chưa được kiếm được — do các nhà xác thực không đáp ứng các ngưỡng đóng góp đã quy định — sẽ bị tiêu hủy, từ đó làm giảm tỷ lệ lạm phát thực tế. Điều này đảm bảo rằng việc phát hành token gắn liền với sự tăng trưởng thực tế của mạng lưới, thay vì việc phân phối vô điều kiện. Các chỉ số đóng góp và thông số vận hành được Quỹ xác định và công bố theo khuôn khổ Phần thưởng Đóng góp đã được cơ quan quản trị phê duyệt, và có thể được điều chỉnh.
- Staking rewards are for staking KAIAs and contributing to the network stability and economic stability of Kaia Blockchain. The size of the reward is determined in proportion to the amount staked by a specific validator to the total amount of KAIA staked by all validators. 40% of the total inflation will be allocated as staking rewards. The size of the rewards in a specific block may vary depending on the number of the total KAIA staked by the validators active at a specific time.

#### Kaia Blockchain Validator Reward Mechanism

Every block will have a committee made up of randomly selected validators. Each committee will have one member to act as a proposer, and all other committee members will act as verifiers.

**Phân phối phần thưởng đóng góp:**
10% tổng lượng lạm phát được phát hành hàng năm (tương đương 20% của phần phân bổ 50% dành cho phần thưởng cho người xác thực và cộng đồng) được dành cho phần thưởng đóng góp và được phân phối dựa trên những đóng góp có thể đo lường được trên chuỗi của các người xác thực. Phần thưởng đóng góp mà mỗi người xác thực nhận được được tính toán và phân phối dựa trên các chỉ số đóng góp được đánh giá theo định kỳ.

Nếu một người xác thực không đóng góp đủ theo các chỉ số đóng góp được đánh giá, người xác thực đó sẽ không nhận được phần thưởng đóng góp cho kỳ đó, và phần token KAIA tương ứng với ngưỡng đóng góp chưa đạt được sẽ bị đốt. Các thông số chi tiết quy định việc phân phối phần thưởng đóng góp, bao gồm ngưỡng đóng góp, khoảng thời gian đánh giá và các giao thức đủ điều kiện, sẽ được công bố công khai và có thể được điều chỉnh định kỳ.

**Phân bổ phí giao dịch:**

Về phí giao dịch, nếu tổng phí giao dịch được tạo ra trong một khối nhỏ hơn phần thưởng dành cho người đề xuất khối, thì số phí đó sẽ bị đốt. Nếu phí giao dịch vượt quá phần thưởng dành cho người đề xuất khối, một nửa số tiền vượt quá sẽ bị tiêu hủy, và nửa còn lại sẽ được trả cho người đề xuất khối dưới dạng phần thưởng.

Quy tắc đó về bản chất vẫn không thay đổi. Tuy nhiên, với việc áp dụng Chương trình Phần thưởng Đóng góp, phần thưởng dành cho người đề xuất sẽ bằng không. Do đó, một nửa phí giao dịch luôn được đốt, còn nửa còn lại luôn được trả cho người đề xuất khối.

**Phân phối phần thưởng staking:**
Phần thưởng staking tương đương 40% (tức 80% của 50% phần thưởng dành cho Validator và Cộng đồng) trong tổng lượng lạm phát hàng năm được phát hành sẽ được chia cho các validator theo tỷ lệ tương ứng với số tiền staking của họ. As long as the Kaia Blockchain validators meet the minimum 5 million KAIA staking requirement, they are free to stake or unstake their KAIA. A one-week delay is required to withdraw the staked KAIA to prevent any immediate withdrawals by malicious members.

### Kaia Blockchain Fund

#### Background

The financial resources of the Kaia Blockchain ecosystem are reorganized and operated into the Kaia Ecosystem Fund (KEF) and Kaia Infrastructure Fund (KIF). Both KEF and KIF will be used to establish stable integrated governance and an active ecosystem and will be transparently executed according to the agreed-upon ratio. The usage plan of the ecosystem resources will be shared with the community in advance. Especially for KEF, individual expenditures will be executed with GC approval. This will allow all ecosystem participants to be proactively aware of the impact of the ecosystem resource execution.

#### Kaia Ecosystem Fund

##### Definition

Kaia Ecosystem Fund (KEF) is a financial resource used to ensure the sustainability of Kaia Blockchain mainnet by strengthening the basic ecosystem infrastructure, supporting developers, and returning profits through indirect investments back to the ecosystem. For this purpose, 25% of the total KAIA issued when creating a block will be distributed to KEF. KEF can only execute funds for agreed purposes with prior approval from the governance with all execution details being transparently disclosed.

##### Usage

The uses of KEF are categorized as follows:

1. Service Contribution Reward (SCR): This reward is given to service developers or users operating on the integrated ecosystem, as compensation for directly or indirectly contributing to the enhancement of the ecosystem's value.
2. Developer Community Development: This includes support for various hackathons, operation of development education programs, collaborative research with academia, and collaborations with various DAOs.
3. Ecosystem Services and Infrastructure Development: This involves the development of services with clear utilities, support for marketing, and securing essential infrastructure for the ecosystem.
4. KEF Indirect Investment: This involves medium to long-term investments carried out indirectly through delegation to professional crypto Venture Capitals. A portion of the profits generated from the recovery of investment amounts is either burned or returned to the Kaia Blockchain ecosystem.
5. Governance Committee Budget: This budget is allocated for the operation of committees in specific sectors such as Gaming, DeFi, and Community. The committees aim to grow the Kaia Blockchain ecosystem in their respective sectors through expertise in investing, marketing, grants, and providing liquidity.
6. Other ecosystem and community-building activities

##### Execution Method

KEF operates under a system where the Governance Council (GC) reviews and approves the use of its funds. The budget executed through the foundation is managed through the following process:

1. Each quarter, necessary budgets by category of expenditure are reported to and approved by the GC.
2. Within the approved budget limits, specific expenditures are also approved individually by the GC.
3. Details of the expenditures are transparently disclosed after their use.

Even if not through the foundation, new proposals for the use of KEF can be made via the GC, and these specific proposals will also require individual approval by the GC. Plans are in place to develop and enhance a structure that allows more ecosystem participants to efficiently propose and participate in the use of KEF. Additionally, for some categories requiring more specialized and rapid decision-making, separate governance committees may operate.

#### Kaia Infrastructure Fund

##### Definition

Kaia Infrastructure Fund (KIF) is a financial resource used for purposes such as R&D, ecosystem acceleration, and foundation operation. For this purpose, 25% of the total KAIA issued when creating a block will be distributed to KIF.

KIF is executed by the foundation through an internal control system after a prior announcement of the budget plan for each detailed category with all execution details being transparently disclosed.

##### Usage

The uses of KIF are categorized as follows:

1. Mainnet and Essential Infrastructure R&D: Advance research on the latest technologies related to mainnet and infrastructure, foundation-led service development, infrastructure establishment, etc.
2. Ecosystem Acceleration: Token swap, financial support for small-scale Kaia Blockchain ecosystem partners, attraction of new GC, provision of market liquidity, etc.
3. Hoạt động của Quỹ Kaia DLT: Chi phí hoạt động (các chi phí dịch vụ khác nhau như phát triển, kế toán, pháp lý, cũng như chi phí vận hành hạ tầng CNTT, chi phí tiếp thị, chi phí nhân công, v.v.), quản lý tài chính, huy động vốn, v.v.

##### Execution Method

The foundation directly establishes a budget plan and executes the funds accordingly for KIF. To ensure transparent execution, the foundation discloses the budget plans and execution details in advance and afterward.

1. Establishment of the budget and fund execution plan by the foundation
2. Disclosure of the budget plans by detailed category
3. Disclosure of the execution details after executing the funds through an internal control system by the foundation

### KAIA Issuance/Distribution Plan

As the Klaytn and Finschia ecosystems merge, KLAY and FNSA, which were the base coins of each ecosystem, will also be consolidated into KAIA. Consequently, the issuance and circulation plan for KAIA will inherit the plans from KLAY and FNSA. This section will examine the historical issuance and circulation data of KLAY and FNSA and, based on this, will outline the plan for the issuance and circulation of KAIA.

#### KLAY Issuance/Distribution Status

##### KLAY Issuance and Burning Volume

On June 24, 2019, a total of 10 billion KLAY were issued on the genesis block at the launch of the mainnet of the Klaytn Blockchain. After the launch of the mainnet, a 3% annual inflation rate was applied based on the genesis issuance volume, newly issuing 9.6 KLAY in each block starting from block 1. Căn cứ vào quyết định ban hành vào tháng 10 năm 2022, 6,4 KLAY đã được phát hành cho mỗi khối, bắt đầu từ ngày 13 tháng 11 năm 2022 (#106444801). Về khối lượng KLAY bị đốt, một phần của quỹ dự trữ ban đầu đã được đốt tính đến ngày 16 tháng 4 năm 2023, và một phần của nguồn cung lưu hành đã được đốt thông qua cơ chế đốt từ phí giao dịch và cơ chế mua lại. As a result, the estimated total supply is 5,971M KLAY at the time of integration, as of June 27, 2024.

##### KLAY Private Sale

KLAY did not conduct an ICO after issuance and only conducted private sales for institutional investors.

The private sales were divided into ER (Early Round) and PR (Private Round) from 2018 to 2019. The quantity sold through the private sales was 1,624,251,988 KLAY. The funds were used as operating funds for the mainnet development and operation, and ecosystem expansion. Approximately 1.62 billion KLAY sold through private sales were all unlocked in March 2021 after a step-by-step vesting period, and are already included in the circulating supply.

##### KLAY Circulating Supply

The circulating supply of a cryptocurrency is the total currently tradable supply of the total issued volume of a specific existing cryptocurrency. In other words, it is the amount that is actually traded and distributed in the market. Tính đến ngày 27 tháng 6 năm 2024, ngày dự kiến tích hợp, tổng nguồn cung ước tính của blockchain Klaytn sẽ là 5.971 triệu KLAY, không bao gồm Quỹ Cộng đồng Klaytn (KCF)[^2] chưa được phân phối trị giá 153 triệu KLAY, Quỹ Klaytn Foundation (KFF)[^3] trị giá 29 triệu KLAY, và Quỹ Tạo Giá Trị KLAY (KVCF)[^4] trị giá 2.000 triệu KLAY. These numbers are current estimates and may vary slightly due to block generation status, inflation, and governance proposal approvals. Considering that KVCF requires separate approval from the GC, the circulating supply increases when the execution of KCF or KFF is decided and executed. On the other hand, the circulating supply decreases when it is burned due to transaction fees or buybacks. Theo đó, tính đến ngày 27 tháng 6 năm 2024, tổng lượng KLAY đã phát hành ước tính là 5.971 triệu KLAY, trong khi lượng KLAY đang lưu hành là 3.789 triệu KLAY. There are no plans to use the KVCF until the time of the merger. The KLAY circulating supply will be inherited by the initial circulating supply of KAIA after the chain and token merger.

#### FNSA Issuance/Distribution Status

##### FNSA Issuance and Burning Volume

FNSA of Finschia has been automatically issued in each block at an inflation rate of 15% per year on the current total supply according to the Issuance mechanism of the protocol. Initial total supply was 6,734,458 FNSA. The FNSA issued is distributed to the Network Contribution Reward, Service Contribution Reward, and Reserve at a corresponding ratio of 5:3:2 according to the distribution mechanism. No volume of FNSA was burned. Tính đến cuối tháng 6 năm 2024, thời điểm dự kiến thực hiện việc tích hợp, tổng số FNSA ước tính được phát hành thông qua lạm phát là 7,967 triệu FNSA.

##### FNSA Private Sale

FNSA did not conduct private sales.

##### FNSA Circulating Supply

The total supply and circulating supply of FNSA are equal. In other words, there is no separate uncirculated volume. Additionally, FNSA will set the inflation to 0% and stop new issuance after prior notice before the integration to ensure smooth integration with KLAY. Tính đến cuối ngày 24 tháng 6 năm 2024, ngày dự kiến thực hiện việc tích hợp, tổng số FNSA ước tính được phát hành thông qua lạm phát là 7,967 triệu FNSA. The final confirmed total supply of FNSA will be included in the initial distribution of KAIA and inherited according to the agreed-upon exchange ratio.

#### KAIA Issuance/Distribution Plan

The KAIA token is created by combining the existing KLAY tokens and FNSA tokens at the time of integration. There may be slight changes in the circulating supply of KLAY and FNSA tokens before the integration through the inflation and burning of block rewards. The circulating supply of the existing KLAY and FNSA at the time of integration will be included in the KAIA circulating supply according to the corresponding exchange rate. Details will be guided through a separate post-announcement by the foundation. The exchange rate for each token to KAIA is as follows:

- KLAY: KAIA = 1:1
- FNSA: KAIA = 1:148,079656

The estimated circulating supply at the time of integration and KAIA circulating supply can be explained separately as follows:

##### Estimated Supply of KLAY and FNSA

- Lượng tiền lưu hành ước tính[^5]
  - KLAY: 3,789M KLAY
  - FNSA: 7.967M FNSA
- Estimated Uncirculated Volume
  - Klaytn Value Creation Fund (KVCF): 2,000M KLAY
  - Klaytn Community Fund (KCF): 153M KLAY
  - Klaytn Foundation Fund (KFF): 29M KLAY

##### Estimated KAIA Issuance Volume

- (+) Conversion of circulating supply (4,968M KAIA)
  - Lượng KLAY đang lưu hành đã quy đổi: 3.789 triệu \* 1 = 3.789 triệu KAIA
  - Lượng FNSA đang lưu hành đã quy đổi: 7,967 triệu \* 148,079656 FNSA = 1.179 triệu KAIA
- (-) Chuyển đổi và tiêu hủy lượng tiền chưa lưu hành
  - Chuyển đổi khối lượng ước tính chưa lưu hành: (Quỹ Tạo giá trị Klaytn 2.000 triệu KLAY + Quỹ Cộng đồng Klaytn 153 triệu KLAY + Quỹ Klaytn Foundation 29 triệu KLAY) × 1 = 2.182 triệu KAIA
  - Tiêu hủy 1.382 triệu KAIA trong tổng số 2.182 triệu KAIA, còn lại 800 triệu KAIA
- (+) Chuyển đổi[^6] khối lượng KAIA chưa lưu hành còn lại sau khi đốt thành nguồn cung lưu hành (800 triệu KAIA)
  - LINE NEXT Delegation: 330M KAIA
  - Kaia Ecosystem Fund: 270M KAIA
  - Kaia Infrastructure Fund: 200M KAIA

| Thể loại                     | Số tiền                          |
| ---------------------------- | -------------------------------- |
| Tổng cung lưu hành của KLAY  | 3.789 triệu KAIA |
| Lượng cung lưu hành của FNSA | 1.179 triệu KAIA |
| Đoàn đại biểu LINE NEXT      | 330M KAIA                        |
| Quỹ Hệ sinh thái Kaia        | 270M KAIA                        |
| Quỹ Cơ sở hạ tầng Kaia       | 200M KAIA                        |
| Tổng nguồn cung              | 5.768 triệu KAIA |

Since the entire uncirculated amount gets burned at the time of KAIA conversion, the total supply and the circulating supply match. The estimated circulating supply at this time of integration is about 5,768M KAIA.

Tuy nhiên, các con số nêu trên dựa trên ước tính về lượng phát hành và lượng lưu hành tính đến ngày 14 tháng 5 năm 2024 (theo giờ GST), và các con số cuối cùng có thể có sự chênh lệch nhẹ do tình trạng tạo khối, lạm phát cũng như việc phê duyệt các đề xuất quản trị của Klaytn và Finschia.

Lượng cung lưu hành sau khi hợp nhất token có thể tăng lên theo các biện pháp được đề cập trong mục “3.5. “Quỹ Kaia Blockchain” hoặc giảm do việc tiêu hủy. However, as specified in the relevant section, any additional supply must be announced in advance or approved by governance.

#### Treasury Rebalance Plan

With the launch of the Kaia Blockchain, the new tokenomics mentioned in the Tokenomics section will be applied. This involves a massive scale of tokens, including the conversion of existing FNSA and KLAY circulations to KAIA, new fund allocations, and burned tokens. A treasury rebalance event will occur only once at the launch, which is a critical process that must be systematic, transparent, and auditable. To ensure this, all procedures will be meticulously recorded in smart contracts. Moreover, given the large volume of tokens involved, it is vital to apply various technologies to prevent errors (such as fat finger errors) and minimize security risks. The application of the new tokenomics is structured to proceed safely only after several conditions are met. Ultimately, the new tokenomic state is achieved through the consensus of validators, relying on the highest level of security available on the blockchain.

The overall process is as follows. A contract named TreasuryRebalance is deployed, followed by the uploading of a rebalance configuration into this contract. All stakeholders whose balance will be altered must approve of the configuration. Once all stakeholders have approved, block validators check the validity of the contract at the hardfork block at which the rebalance event takes place. Provided all conditions are met, block validators execute the rebalance event and reach a consensus. After the event was successful, an execution receipt which block providers output will be uploaded to the contract so that anyone can view the rebalance result.

TreasuryRebalance contract is implemented as a finite state machine and has the following states:

- Initialized: right after the deployment. In this state, a list of addresses whose balance will be zeroed, namely “Zeroed”, and addresses whose balance will be allocated, namely “Allocated”, can be registered.
- Registered: after all Zeroed and Allocated has been registered. In this state, there cannot be further registration. All owners of Zeroed must send a consent transaction, which indicates that they approve that their balance will be burnt.
- Approved: after all consents have been collected, the contract can enter Approved state. Any change in this contract is prohibited until the hardfork block passes.
- Finalized: After the hardfork block, the rebalance result, namely “memo”, is recorded and the contract is finalized. The contract is rendered immutable.

The state transition is only possible in the following order. However, there can be a “reset” where all data is deleted and the state goes back to initialized.

![](/img/misc/state-machine.png)

All block validators validate the contract state at the hardfork block. The rebalance event takes place only in the Approved state where no further change can happen. Since this event depends on the consensus of all validators, it is ensured that all validators reach the same world state after this event.

All block validators produce the result of the rebalance event called memo in their validator log. The memo is uploaded to the TreasuryRebalance contract during Finalize. memory is a JSON-formatted string which contains information such as the balance of Zeroed before the rebalance, the balance of Allocated after the rebalance, and the burnt amount. The admin of treasury rebalance validates the consistency of the memo and uploads it to TreasuryRebalance contract. After finalization, the contract becomes immutable forever.

## Governance

### Governance Core Components

Kaia Governance hoạt động dựa trên ba thành phần chính: Cộng đồng Kaia, Hội đồng Kaia và Quỹ Kaia DLT. Kaia Community encompasses all KAIA holders, who have the right to express their opinions on Kaia Mainnet operations via the governance forum and social channel. Kaia Council represents the community and directly participates in the governance decisions of the project based on the coins it holds and voting rights delegated from the community. Cuối cùng, Quỹ Kaia DLT tận dụng chuyên môn về công nghệ blockchain và Web3 để cung cấp các bằng chứng, dựa trên kiến thức chuyên môn và dữ liệu, nhằm hỗ trợ Hội đồng Kaia trong việc ra quyết định và triển khai các quyết định đã được thông qua thông qua cơ chế quản trị. Kaia Governance ensures effective decision-making and execution with this systematic structure and pursues transparent and fair community operation.

### Governance System

Kaia Governance respects the diversity of the governance system and seeks to create a diverse governance ecosystem through the coexistence, cooperation, and competition of multiple systems. It encompasses various forms of governance found in the real world ranging from representative democracy, where each individual grants voting rights to decision-makers to representatives, the DAO system, where all members participate in the decision-making process of the organization, and capitalism, where shareholders influence company decisions through representatives designated by shareholders. Kaia Governance seeks to lay the foundation for a transparent and fair blockchain ecosystem through this comprehensive approach. Its vision is to build a stronger and more flexible system by combining the strengths of multiple governance models.

### Community-Centered Governance

At Kaia, organizations based on various governance systems will participate in governance, express their opinions, and thereby prove the excellence of their systems. More holders and assets will be concentrated in systems that have proven their greater contribution to the sustainable development of the Kaia ecosystem, resulting in more decision-making authority being concentrated in members with successful systems. Also, the council members will replicate successful governance, expanding the system.

As time passes, optimized governance systems for new trends will emerge. Kaia Governance will continue to develop focusing on the optimized governance system in line with these changes, which will contribute to an increased efficiency of the entire ecosystem. In the process, Kaia will present an example of a governance system with both diversity and flexibility and will lead the innovation in governance in the blockchain ecosystem.

Kaia builds the Kaia Governance system based on the belief that Web3 innovation has its roots in the participation of various communities. In line with this hypothesis, greater importance is given to community input in the decision-making process. As a result, it ensures that decision-making power is fairly distributed among different council members. Through this approach, Kaia Governance aims to foster sustainable development and innovation in Web3 by prioritizing the voices of the community and creating a more inclusive and diverse decision-making environment.

### Governance Direction

Kaia Governance adopts a strategy of adjusting the pace of the governance process, considering changes in the cryptocurrency market and the development stage of the Kaia ecosystem. The discussion and processing speed of the agenda are determined through a consensus between the foundation, council, and community, which reflects the rapidly changing cryptocurrency market situation and the ongoing growth process of Project Kaia. Currently, in 2024, the ecosystem of Project Kaia is still in the development stage despite the rapid progress over the past five years, and Kaia takes a governance approach with growth as its priority. By establishing a structure where the agendas can be discussed and decided quickly, the project plans to proactively respond to the changing market environments and accelerate the growth of the ecosystem.

## Technology

### Overview

Kaia Blockchain has three primary technical objectives.

First, performance is paramount. The blockchain emphasizes rapid finality, ensuring that users receive immediate responses. It also aims to process a high volume of user requests quickly, enabling blockchain applications (dApps) on Kaia Blockchain to offer a user experience comparable to conventional mobile apps.

Second, transparency is crucial. Decision-making at the layer 1 protocol has widespread implications across the ecosystem. Therefore, decisions should be made transparently through on-chain governance. Furthermore, Kaia Blockchain intends to publicly disclose all elements related to the operation of the blockchain network, ensuring that it is fully verifiable by anyone.

Third, sustainability is essential. Operating a blockchain over the long term presents various challenges, such as the continuous increase in block data and the economics necessary to sustain network operations. Kaia Blockchain is designed to reduce operational costs and increase profitability, ensuring its long-term viability.

The forthcoming content will cover two main topics. The first is the genesis of the Kaia Blockchain, describing the technologies applied, including consensus mechanisms, smart contracts, and on-chain governance, which collectively reflect the extensive technical considerations made to achieve its goals. The second topic is the evolution of the Kaia Blockchain. It will introduce a variety of new technologies that are planned for the near future, including maintaining high performance while allowing anyone to operate a validator node in a permissionless manner, enhancing transparency in block transaction ordering to mitigate the negative effects of Maximal Extractable Value (MEV), and block archiving techniques for swift verification of historical blocks. These innovations will set the Kaia Blockchain apart, enhancing its uniqueness and attractiveness.

### Birth of Kaia Blockchain

To achieve the aforementioned technical goal, Kaia Blockchain is launched with various technical features. Specifically, the performance goal is facilitated by consensus and network topology, and the transparency and the sustainability is facilitated by smart contracts and on-chain governance. ​​Hiệu suất ban đầu của Kaia Blockchain như sau:

- Process 4,000 transactions/sec (TPS)
- Instant transaction finality
- Creation time of 1 block/second

#### Consensus and Networking

Blockchains use a “distributed ledger,” which consists of a connected network between individuals with several network participants to record and manage the transaction information. Each blockchain adopts a consensus algorithm that is most suitable for it, with the aim of efficient and smooth consensus on transaction validation and block generation among network participants. These consensus algorithms help the system to reach a consensus on the correct state, even if there is a system failure or malicious attack on the network. They play an important role in ensuring the integrity and stability of the blockchain.

##### IBFT (Istanbul Byzantine Fault Tolerance)

Kaia aims to become an enterprise-support and service-oriented platform. Therefore, the finality problem must be solved, with the network allowing many nodes to participate in the network. For this purpose, Kaia uses an optimized version of Istanbul BFT, which implements PBFT with modifications to suit the characteristics of blockchain networks.

Kaia Blockchain has three types of nodes: Consensus Node(CN), Proxy Nodes(PN), and Endpoint Nodes (EN). CN is managed by a validator and is responsible for block creation. These blocks are verified by all the nodes within the network.

![](/img/misc/kaia-nodes.png)

Kaia Blockchain has adopted and enhanced Istanbul BFT to achieve rapid finality. Since validation and consensus occur with each block, there are no forks, and the finality of the blocks where consensus is reached is immediately guaranteed. Block proposers are selected in an unpredictable manner using a Verifiable Random Function (VRF), thereby offering high resistance to centralized Denial of Service (DoS) attacks. CN must deposit a certain amount of tokens, maintaining reasonable networking costs while enabling easy operation by any EN, thus enhancing the scalability of the blockchain network usage.

##### Multi-channel Broadcast

Network latency is greatly affected by network congestion. Assuming the throughput of the network is constant, network latency increases proportionally to the increase in the number of transactions. General users of mobile apps or web services do not tolerate response times longer than a few seconds, and there is no reason to assume that blockchain services will have greater user patience.

Kaia Blockchain adopts a multi-channel approach to deal with network congestion. By allocating separate propagation channels to transactions and blocks, the Kaia network can propagate newly created blocks in a timely manner even when the network faces severe congestion due to a large number of transactions. In turn, Kaia guarantees the dApps on the network to continue responding to end-user requests despite intermittent network traffic surges.

##### Consensus Process

The consensus process consists of the following three stages:

1. Election: The Committee is composed of Consensus Nodes (CNs) that participate in achieving consensus. This is a similar task to the leader election in a general distributed system. The proposer is randomly selected through VRF since knowing them in advance can make them vulnerable to targeted DoS (denial of service).
2. Block Generation: Elected proposers create a block and make a proposal to the committee. The block proposal made through the P2P network is sent to the committee.
3. Block Verification: The committee verifies and signs the block proposed by the proposer. A block is complete when more than a quorum of signatures is collected.

#### Account Model and Smart Contract

Kaia Blockchain offers scalability in service development through its expanded account model and smart contract capabilities. Smart contracts on the blockchain enhance the efficiency of transactions and contracts between individuals through contract automation, and the use of smart contracts has had a significant impact on the blockchain and dApp ecosystem. Contract conditions can be coded into smart contracts and automatically executed, solving the trusted intermediary issue. Smart contracts have allowed the blockchain ecosystem to create new business models and economic systems by reducing the cost and time required to complete transactions. Kaia Blockchain hỗ trợ môi trường thực thi KVM, được thiết kế để hoạt động nhanh chóng và hiệu quả, mang đến môi trường phát triển tốt nhất và nhanh nhất cho các nhà phát triển dApp và các dự án.

##### Account Model

The Kaia Blockchain supports an expanded form of the Account Model. Inside the implementation of an EOA (Externally Owned Account) account, it is possible to store an Account Key, which is an expanded form of the EOA's Public Key. This information allows users to replace the Private Key associated with that account. Additionally, users can register multiple Private Keys for use in Multi-Signature setups or to separate roles among different Private Key users. The roles provided include the authority to create transactions, update registered keys in the Account, and permissions solely for fee delegation purposes.

##### Kaia Virtual Machine (KVM)

The current version of Kaia Virtual Machine (KVM) is a derivative of the Ethereum Virtual Machine (EVM). It supports all Opcodes of the Ethereum Virtual Machine equally while providing additional precompiled contracts unique to the Kaia Virtual Machine. To prevent the additional precompiled contracts of Kaia from colliding with the precompiled contracts of the Ethereum Virtual Machine, the precompiled contract addresses of Kaia are given in a decreasing order starting from 0x03ff.

Kaia Virtual Machine provides several methods to write and run Smart Contracts on the Kaia network. Kaia supports Solidity and maintains interoperability with Ethereum development toolkits such as Remix, Hardhat, Truffle, and Foundry. A smart contract written with Solidity can be compiled using the existing Solidity compiler and can be run on Kaia without additional work. Solidity is the de facto standard contract programming language on Ethereum and is supported by an active community. Therefore, Kaia Blockchain supports the Solidity language to provide the most familiar development environment for Ethereum dApp developers allowing them to easily migrate their work.

##### System contracts

Kaia Blockchain manages a part of protocol as smart contracts, which are called system contracts. Block validators directly or indirectly interact with system contracts. System contracts facilitate transparent and easy-to-access protocol operation. There is a specification that defines a Registry contract which will contain new system contracts. It can be viewed by a REST API and thus users can continuously check and monitor system contracts.

Since system contracts can directly impact the blockchain protocol, they need to be managed in a highly secure manner. They are internally classified as the highest level of security, and thus they are managed as a multi-sig by default. Storing of keys and signing of transactions are performed in an isolated device which is never connected to online. In addition, there are internal manuals and tools for systematic management of system contracts.

These are essential system contracts:

- AddressBook: a contract which manages a list of validators.
- GovParam: a contract for on-chain governance on network parameters .
- SimpleBlsRegistry: a BLS key storage for validators.

#### On-Chain Governance

On-chain governance is an on-chain decision-making system among stakeholders. On-chain governance is implemented in a structure including smart contracts and has several advantages over off-chain governance. The entire process of governance is transparently recorded, and anyone can check the progress of governance on-chain (transparency). Since the governance process proceeds solely according to the contract logic, the voting and results cannot be tampered with maliciously (integrity). Therefore, the intentions of the participants can be reflected without any distortion in the governance process. Also, it is impossible to deny a vote because no one except the voter can vote (non-repudiation). As a result, the voters become accountable for their voting behaviors. An environment where the voting results can be enforced compulsorily or automatically can be created (enforceability). Without enforceability, the implementer may ignore the voting results, which will eventually reduce the credibility of governance.

Kaia Blockchain implements an on-chain governance system satisfying the above properties. The on-chain governance of Kaia Blockchain is designed to be fair and to ensure diverse opinions are shared. Voting entities can vote on all agenda items. Voting rights are calculated in proportion to the amount of staking. However, there is a cap on voting rights to prevent minority opinions from being ignored. Users can delegate their staking amount to other voters.

The voting process is transparent and open. Types of agendas include text agendas, parameter change agendas, and fund expense agendas. For some agendas, such as parameter change agendas, a transaction can be attached to the agenda. In this case, once the agenda is passed, the transaction will be automatically executed. This allows the mandatory performance of governance by automatically reflecting the changes in network parameters as well as executing funds through governance.

Other than this, various detailed policy decisions, such as restrictions on voting rights, voting periods, and voter participation, are needed for a comprehensive and fair decision-making system. A highly reliable network will be built by establishing a governance system that harmoniously reflects the needs and expectations of various stakeholders.

##### Governance Process

The overall governance process of Kaia is as follows:

1. Discussion: Improve the agenda through free discussion among all participants off-chain.
2. On-Chain Agenda Voting: Register the agenda on-chain and proceed with voting.
3. Reflect Results (Activation): Implement when agenda items are approved.

![](/img/misc/gov-process.png)

Agendas registered on-chain go through several states until the voting is complete.

- Pending: Status after the agenda is registered and until voting takes place. As the agenda is registered, the list of voters is determined.
- Active: Voting is in progress. The voting power of the voters gets fixed when voting begins.
- Passed: Agenda passed with the approval of a quorum.
- Failed: Agenda rejected because it did not receive a quorum of approval votes.
- Queued: Waiting period after the passing of the agenda and before the execution.
- Executed: Agenda fully executed.

![](/img/misc/gov-process-2.png)

##### Enforceability

Kaia Blockchain is configurable via several network parameters, with which they can be altered by on-chain governance. An example of network parameters is “upperboundbasefee”, which defines the maximum value to which the dynamic gas fee can go up. There exists a system contract named GovParam, which enables the enforceability of the governance proposal. This contract is a key-value storage with an activation number for each key. A value of network parameter can be updated by submitting a tuple of (param as a key, new value, activation block number), which will be read by validators and be activated starting from the activation block.

![](/img/misc/enforceability.png)

The above figure shows how network parameters are updated via on-chain governance. A governance proposal can contain a transaction, which will be executed once the proposal passes. When proposing, the proposer attaches a transaction which invokes GovParam. When the proposal passes, the secretary sends a transaction to execute the proposal, which will internally invoke the transaction contained in the proposal. Validators check GovParam every block and apply the new network parameter value at the activation block. In this way, the network parameters can be enforced in a decentralized manner.

### Kaia Evolution

The Kaia Blockchain is committed to continuously adopting new technologies to achieve the three technical objectives introduced earlier. Some of these technologies are expected to be developed and implemented in the near future. Specifically, new technologies that Kaia blockchain will adopt can improve the aforementioned three goals; high performance permissionless allows anyone to become a node validator, mitigating the negative effect of MEV with transparent tx ordering, archiving old blocks in a verifiable manner, and public governance delegation can facilitate high performance, transparency, and sustainability.

#### High-Performance Permissionless

BFT-type consensus algorithms generally have restrictions in the process of participating as a validator. This is due to the tendency of the performance of the entire network to deteriorate caused by abnormal nodes when validators participate freely. As an integrated chain, Kaia pursues a completely permissionless network and will develop into a network where anyone can participate as a block creation node while maintaining high performance. After introducing the Permissionless Network, nodes meeting certain conditions will be given the role of block creation nodes. Specifically, an automated qualification verification process will be introduced to check whether the block creation node is qualified to maintain stability. In terms of consensus participating in the creation and verification of blocks, there are “candidates” and validators. In terms of governance, there are Governance Council Members. One can register as a candidate and meet specific conditions to become a validator. Validators can receive rewards by participating in the block creation consensus process. Permissionless Network is implemented through the following factors:

●     _**Thuật toán lựa chọn người đề xuất không thể dự đoán:**_ Một thuật toán giúp tăng cường khả năng chống lại các cuộc tấn công từ chối dịch vụ (DoS) bằng cách thay đổi phương thức lựa chọn người đề xuất khối theo cách khó dự đoán.

●     _**VRank (Khung đánh giá uy tín của người xác thực):**_ Một khung đánh giá uy tín của người xác thực.

●     _**Hệ thống trừ phần thưởng đối với người xác thực tự động:**_ Một hệ thống áp dụng hình phạt đối với các hành vi sai sót hoặc có chủ ý gây hại của người xác thực.

●     _**Giao dịch hệ thống và thông điệp đồng thuận:**_ Phản ánh thông tin đồng thuận mới nhất trong hợp đồng cho từng khối thông qua một “giao dịch hệ thống” được người đề xuất khối tạo ra tự động.

#### Maximal Extraction Value

MEV (Maximal Extractable Value) is the potential benefit that can be gained by strategically ordering or changing the transaction order in a block. MEV involves unfair practices, such as front-running, to gain profits at the expense of other users. Kaia Network aims to build a system that ensures a fair and transparent transaction order to mitigate the negative effects of MEV. Also, a method to redistribute or burn MEV extraction profits into the network ecosystem will be provided to support the sustainable development of the network. Lastly, a system to monitor and share transactions in real time will be implemented to prevent any unfair practices that may be carried out by validators, increasing the reliability of the network. This will not only increase the transparency and fairness of the Kaia network but will also greatly contribute to the sustainable development of the ecosystem.

#### Block Data Archiving

Blockchain continuously has an increase in the blocks (data) stored over time due to transaction history and execution of smart contracts. The capacity of Kaia Blockchain is growing even faster due to its short block time and high transaction throughput (TPS). As a result, the cost of new validators participating in the network and verifying the blocks by synchronizing them is also increasing. The volume of data accumulated over the years is not small, and it takes a lot of resources to verify it. High verification costs work as a barrier for new validators to enter, which can reduce the reliability of the chain. To solve this issue, Kaia Blockchain will study how to reduce the verification cost of past blocks. The following methods will be considered and introduced as they compress or archive old blocks in a verifiable manner so that only the archived data can be quickly verified without each block having to be verified.

- **Verifiable block data compression:** Compresses blocks in a verifiable manner.
  - Block data pruning at a certain block cycle or data unit
  - Convert the blocks pruned in on-chain into a verifiable certificate and record in on-chain. This certificate is compressed and recorded as a Commitment using cryptography (such as KZG) or Proof using the recursion method of ZKP.
  - Support a verification system that can verify certificates in on-chain
    - Verification system efficiently and constantly verifies certificates.
    - At the time of compression, the certificate is verified and recorded in the block when the next block is created.
    - Anyone can verify the corresponding certificate through a verification system.
- **Lightweight block synchronization:** When participating as a new node or verifier, synchronize and verify the compressed certificates and subsequent blocks rather than synchronize the entire block data.
- **Support DA Layer:** Some users and dApps require a checkup on historical data. A DA Layer is provided to provide trusted data without faults.

By dramatically reducing the verification cost by the above methods, new validators will be able to onboard quickly.

#### Public Delegation

Kaia Blockchain provides a function where validator operators can be delegated. To provide this function as a default, Kaia Blockchain will additionally develop and provide a contract providing a public delegation function in conjunction with staking contracts for validators. This will allow users to participate in governance in the future by expanding the voting power of voters by delegating tokens to other voters expressing opinions on their behalf. This structure is similar to representative democracy, a form of politics in which the people elect members of the National Assembly, and the members of the National Assembly vote when the National Assembly passes an agenda. The users, furthermore, can delegate or revoke their delegation whenever they wish in Kaia Blockchain. This will allow general holders to reflect their opinions in governance and a governance system respecting diverse opinions will be established.

## Roadmap

Kaia Blockchain is an integrated mainnet platform that started with the integration of the Finschia Foundation and the Klaytn Foundation. Its core goal is to provide an infrastructure for the adoption of Web3. To achieve this goal, Kaia Blockchain seeks to facilitate the development of blockchain-based projects through builder-centric support. Through this, new potentials of Web3 technology will be explored. Kaia Blockchain provides developers with essential toolkits, SDKs, and IDEs to help them easily implement innovative and competitive solutions at all stages of project development.

In addition, strategies such as messenger integration through cooperation with Kakao and LINE will help Web2 users easily transfer to Web3. This approach will accelerate the adoption of Web3 technology and allow more users to experience the benefits of blockchain technology. Kaia Blockchain will foster the growth of a strong developer community and explore new possibilities in blockchain technology by enabling access to various infrastructure assets and KAIA funds while also supporting decentralized governance and permissionless participation.

The roadmap of the integrated mainnet focuses on supporting developers and driving Web3 adoption at the same time. This will enable Kaia Blockchain to help both developers and general users build successful projects, adopt blockchain technology more broadly, and establish a solid foundation to explore the new possibilities of the Web3 world.

### Long-term Initiatives

- **Xây dựng cơ sở hạ tầng phục vụ nhu cầu của các cơ quan, tổ chức**
  - Establishment of integrated token, Fiat On/Off Ramp, for major Asian countries
  - Establishment of infrastructure for improved accessibility by institutional investors
- **Tăng cường cơ sở hạ tầng DeFi quy mô lớn**
  - Establishment of a new De-fi ecosystem for the integrated mainnet
  - Expansion of RWA (Real World Asset) linked services
- **Ra mắt các đồng stablecoin bản địa**
  - Launching of key stable coins based on the integrated mainnet
  - Expansion of native stable coin-based services
- **Tăng cường cộng đồng châu Á**
  - Re-establishment of developer and user communities in each Asian country
  - Expansion of governance and ecosystem partners in major countries
- **Khám phá các danh mục ứng dụng phi tập trung (DApp) dựa trên trí tuệ nhân tạo (AI)**
  - Establishment of new AI DApp categories and activation of onboarding
  - Discovery of generative AI-based content/avatar/game Dapps
- **Quá trình token hóa trên chuỗi quy mô lớn đối với các tài sản Web2**
  - Linking of Web2 digital items, memberships, and ticket markets
  - Discovery of large-scale item tokenization and mass adoption cases
- **Quá trình tiếp nhận các công ty game SSS châu Á**
  - Interoperable game onboarding based on Brown Friends IP
  - Web3 game onboarding based on Japanese SSS-rated game company IP
- **Hợp tác trong các dự án sở hữu trí tuệ toàn cầu**
  - Web3 project onboarding of large global IP companies
  - Strengthening of onboarding infrastructure for Web2 companies

## Important Notes

### Disclaimer of liability

Trong phạm vi tối đa được cho phép bởi các luật, quy định và quy tắc hiện hành, Quỹ Kaia DLT sẽ không chịu trách nhiệm đối với bất kỳ tổn thất gián tiếp, đặc biệt, ngẫu nhiên, do hậu quả hoặc các tổn thất khác dưới bất kỳ hình thức nào, phát sinh từ hành vi vi phạm dân sự, hợp đồng hoặc các trường hợp khác (bao gồm nhưng không giới hạn ở việc mất doanh thu, thu nhập hoặc lợi nhuận, cũng như mất khả năng sử dụng hoặc mất dữ liệu), phát sinh từ hoặc liên quan đến việc bạn chấp nhận hoặc dựa vào Báo cáo kỹ thuật này hoặc bất kỳ phần nào của nó.

### No representations and warranties

Quỹ Kaia DLT không đưa ra cũng như không có ý định đưa ra, và tại đây tuyên bố từ chối mọi tuyên bố, bảo đảm hoặc cam kết dưới bất kỳ hình thức nào đối với bất kỳ tổ chức hoặc cá nhân nào, bao gồm mọi tuyên bố, bảo đảm hoặc cam kết liên quan đến tính chân thực, tính chính xác và tính đầy đủ của bất kỳ thông tin nào được nêu trong Sách trắng này.

Không có nội dung nào trong Báo cáo chính thức này được coi là hoặc có thể được coi là một lời hứa, tuyên bố hoặc cam kết liên quan đến hiệu quả hoạt động hoặc chính sách trong tương lai của Quỹ Kaia DLT. All information, features, issuances, distributions, and architectures are subject to change at any time, at the sole and absolute discretion of Foundation and/or Kaia Governance depending on the then current roadmap presented in this Whitepaper.

Hơn nữa, Quỹ Kaia DLT từ chối mọi trách nhiệm trong việc cập nhật bất kỳ tuyên bố dự báo nào hoặc công bố công khai bất kỳ sửa đổi nào đối với các tuyên bố dự báo đó nhằm phản ánh những diễn biến, sự kiện hoặc hoàn cảnh trong tương lai, ngay cả khi có thông tin mới hoặc các sự kiện khác xảy ra trong tương lai.

Please note that this Whitepaper is also only a work in progress and the information in this Whitepaper is current only as of the date on the cover hereof. Quỹ Kaia DLT có quyền cập nhật Sách trắng theo từng thời điểm.

### Staking services

Nếu bạn quyết định tham gia chương trình staking của KAIA, bất kỳ dịch vụ nào được cung cấp cho bạn đều có thể được thực hiện thông qua Quỹ Kaia DLT, với tư cách là đơn vị xác thực giao dịch trên nền tảng Kaia và cung cấp các nút riêng của mình để thực hiện staking thay mặt cho bạn. Any applicable Delegation Rewards will be determined by the protocols of the Kaia and will be credited .

Bạn xác nhận và hiểu rằng Quỹ Kaia DLT không đảm bảo rằng bạn sẽ nhận được bất kỳ Phần thưởng Ủy quyền nào và các dịch vụ staking này không phải là sản phẩm tiền gửi có kỳ hạn hay việc phát hành chứng khoán, vốn thuộc phạm vi điều chỉnh của FSMR.

Việc rút các tài sản đã được staking có thể bị trì hoãn do thời gian giải staking theo quy định của giao thức hoặc do điều kiện mạng, và Quỹ Kaia DLT không thể đảm bảo thời điểm và số tiền phân phối của Phần thưởng Đóng góp Mạng. The Kaia Mainnet and relevant interfaces used for the delivery of KAIA staking services have inherent risks and the market for KAIA tokens and rewards may be highly volatile due to factors that include but are not limited to adoption, speculation, technology, security, and regulations. Bạn đồng ý và xác nhận rằng Quỹ Kaia DLT không chịu trách nhiệm hoặc nghĩa vụ pháp lý đối với bất kỳ yếu tố hoặc rủi ro nào trong số này.

### No advice

Không nên coi bất kỳ thông tin nào trong Báo cáo chuyên sâu này là lời khuyên về kinh doanh, pháp lý, tài chính hoặc thuế liên quan đến Quỹ Kaia DLT hoặc KAIA. Bạn nên tham khảo ý kiến của các chuyên gia tư vấn pháp lý, tài chính, thuế hoặc các chuyên gia tư vấn chuyên môn khác về Quỹ Kaia DLT cùng các hoạt động kinh doanh và vận hành của quỹ này, cũng như về KAIA. You should be aware that you may be required to bear the financial risk of any purchase of KAIA for an indefinite period of time.

### Restrictions on distribution and dissemination

The distribution or dissemination of this Whitepaper or any part thereof may be prohibited or restricted by the laws, regulatory requirements and rules of any jurisdiction. Trong trường hợp có bất kỳ hạn chế nào được áp dụng, quý vị phải tự tìm hiểu và tuân thủ mọi hạn chế áp dụng đối với việc sở hữu Sách trắng này hoặc một phần của nó (tùy từng trường hợp) bằng chi phí của chính mình và không gây ra bất kỳ trách nhiệm pháp lý nào cho Quỹ Kaia DLT. Persons who have been provided access to this Whitepaper or to whom a copy of this Whitepaper has been distributed or disseminated or who otherwise have the Whitepaper in their possession shall not circulate it to any other persons, reproduce or otherwise distribute this Whitepaper or any information contained herein for any purpose whatsoever nor permit or cause the same to occur.

### Risks and uncertainties

Những người có ý định mua KAIA nên cân nhắc và đánh giá kỹ lưỡng tất cả các rủi ro và yếu tố không chắc chắn liên quan đến Quỹ Kaia DLT, các hoạt động kinh doanh và vận hành của quỹ này, cũng như toàn bộ thông tin được nêu trong Sách trắng này và các Điều khoản và Điều kiện, trước khi thực hiện bất kỳ giao dịch mua KAIA nào.

You should not transact in KAIA if you are not familiar with digital tokens of this nature. Transacting in digital tokens may not be suitable for you if you are not familiar with the technology in which KAIA services will be provided.

You should be aware that the value of KAIA may fluctuate greatly. You should buy KAIA only if you are prepared to accept the risk of losing all the money you put into KAIA.

As previously indicated, participating dApps will receive allocations of KAIA from the Foundation that are to be distributed to dApp users. Subject to dApp’s respective distribution policies, dApps may from time to time, either directly or indirectly, make large distributions of KAIA to users, which could have the effect of increasing the overall supply of KAIA that is traded on relevant trading platforms. It is possible that such distributions could have a negative impact on the market price of KAIA, particularly if a large number of recipients of KAIA engage in sales of KAIA on relevant trading platforms in a short period of time. Please note that a specific way of each dApp’s distributions of KAIA may vary depending upon each dApp’s jurisdiction or country of registration to fully comply with applicable regulations.

### KAIA issuance costs

Trong mọi trường hợp, Quỹ Kaia DLT sẽ không phải chịu bất kỳ chi phí nào liên quan đến việc phát hành hoặc phân phối KAIA.

**THERE IS NO GUARANTEE THAT THE FUNCTIONALITIES OF KAIA, OR THAT THE KAIA TOKEN ECONOMY INFRASTRUCTURE, WILL BE DELIVERED OR REALISED. NẾU BẤT KỲ RỦI RO VÀ YẾU TỐ BẤT ĐỊNH NÀO TRONG SỐ ĐÓ TRỞ THÀNH SỰ KIỆN THỰC TẾ, HOẠT ĐỘNG KINH DOANH, tình hình tài chính, kết quả hoạt động và triển vọng của KAIA DLT Foundation có thể bị ảnh hưởng nghiêm trọng và tiêu cực. IN SUCH CASES, YOU MAY LOSE ALL OR PART OF THE VALUE OF KAIA. IN THE EVENT THAT YOU HAVE PURCHASED KAIA, YOUR PURCHASE CANNOT BE REFUNDED OR EXCHANGED.**

**IF YOU ARE IN ANY DOUBT AS TO THE ACTION YOU SHOULD TAKE, YOU SHOULD CONSULT YOUR LEGAL, FINANCIAL, TAX OR OTHER PROFESSIONAL ADVISOR(S).**

---

[^1]: Specific figures are subject to change upon further review and governance approval.

[^2]: A fund created to revitalize the Klaytn ecosystem and onboard developers, and expenditures are determined after governance approval.

[^3]: A fund created to operate the existing Klaytn Foundation, and expenditures are also determined after governance approval.

[^4]: A reserve created in preparation for the dramatic growth of the Klaytn blockchain.

[^5]: The circulating supply of the Klaytn and Finschia chain may change due to block rewards, etc. until the chain merger.

[^6]: Future circulation will only change due to inflation and new burning models. Incorporation of the circulation amount of the fund does not necessarily mean liquidation, and it will be executed transparently only within the scope of governance approval.
