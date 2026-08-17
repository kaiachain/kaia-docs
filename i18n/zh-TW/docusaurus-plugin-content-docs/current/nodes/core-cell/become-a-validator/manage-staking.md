# 管理盯梢合約

![管理定價選單](/img/nodes/become-a-validator/image23.png)

在 **Manage Staking** 功能表中，您可以修改先前部署的定價合約資訊。

如果您使用部署合約的錢包連線，您可以瀏覽定價合約清單，選擇特定合約，然後點擊 **[管理定價]**，進入其管理畫面。

![輸入定價合約地址](/img/nodes/become-a-validator/image24.png)

或者，如果您使用任何定投合約管理錢包登入，您可以在 **[輸入 CnStaking 合約地址來管理它]** 方塊中輸入定投合約地址，以進入管理畫面。

![Manage Staking overview](/img/nodes/become-a-validator/image25.png)

在此畫面中，您可以執行下列動作。

## 行政管理<a id="admin-management"></a>

1. \*\* 新增管理員\*\* - 新增定倉合約管理員。
2. \*\* 移除管理員\*\* - 移除定價合約管理員。
3. \*\* 更新需求\*\* - 變更定價合約的多重位元臨界值。

## 定置作業<a id="staking-operations"></a>

![Stake / Unstake / Pending Withdrawals](/img/nodes/become-a-validator/image26.png)
![Staking Operations detail](/img/nodes/become-a-validator/image27.png)

4. **投注 KAIA** - 如果已停用公開代表權，您可以自行決定投注 KAIA。
5. \*\* 解除 KAIA\*\*-如果已停用公開委託，釣魚合約管理員可以自行決定解除 KAIA 的釣魚合約。
6. \*\* 待提款\*\* - 點擊取消提款按鈕後，您可以在**7天**至**14天**後申領 KAIA。

## 地址與追蹤管理<a id="address-and-tracker-management"></a>

![獎勵地址 & 投票人](/img/nodes/become-a-validator/image28.png)

7. \*\* 獎勵位址\*\* - 如果已停用公開委託，您可以變更獎勵位址。
8. **選民與投票追蹤器** - 變更 GC 投票所使用的選民地址。 更新 Staking Tracker 時，您也可以變更 Staking Tracker 位址。

## 再授權<a id="redelegation"></a>

![Redelegation](/img/nodes/become-a-validator/image29.png)

9. **Redelegation** - 啟用或停用 Redelegation 功能，此功能可免除 7 天的取消認股期，並立即在認股合約之間移動 KAIA。 來源和目的地釣魚合約都必須啟用再轉授。 詳情請參閱 [KIP-163](https://kips.kaia.io/KIPs/kip-163)。

## 多重登入請求<a id="multisig-requests"></a>

![Multisig 請求](/img/nodes/become-a-validator/image30.png)

10. \*\* 多重認證請求\*\* - 當多重認證臨界值為 2 或以上時，執行 1-9 項中的任何動作都需要釣魚合約管理員的確認。 對於尚未收集足夠確認的請求，每位管理員都可以透過此畫面登入，並執行確認流程。 一旦收集到足夠的確認，變更請求就會被執行。
