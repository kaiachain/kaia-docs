# Kaiabridge

Finschia 用户可以按固定交换率将其在 Finshia 网络上的 FNSA 代币交换为 Kaia 网络上的 KAIA 代币。 这种交换由一套智能合约和程序（统称为 Kaiabridge）进行调解。

代币交换过程由 Finschia 用户将 FNSA 代币发送到 `fwsap` 模块开始。 代币首先从 "cony "交换到 "kei "面值，然后转移到 "fbridge "模块。 fbridge "事件由可信中继器识别，并提交给 Kaia 链上的桥接智能合约。 桥接请求分多个步骤处理：

- 飞行中：代币到达 Finschia 的 "fbridge "模块，但中继器没有向 Kaia 智能合约报告。
- 确认：转述人向合同（"条款"）提交了申请。 现在，请求进入 30 分钟的时间锁定。
- 已认领：时间锁定到期后，令牌已被转移（"认领"）到 Kaia 链上的目标账户。

Kaiabridge 智能合约内置多重签名功能。 例如，需要操作员账户进行多次备付交易，申请才能得到确认。 每个操作员账户由一个中继器持有，中继器由 Kaia 基金会和 Finschia 基金会管理。

您可以在 [kaiachain GitHub](https://github.com/kaiachain/kaia/tree/dev/contracts/contracts/system_contracts/kaiabridge) 中找到合同源代码，在 [合同地址](https://docs.kaia.io/references/contract-addresses/) 页面中找到部署地址。