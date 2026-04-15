# 스테이킹 컨트랙트 정보 변경

![Manage Staking 메뉴](/img/nodes/become-a-validator/image23.png)

Manage Staking 메뉴에서는 기존에 배포한 스테이킹 컨트랙트의 정보를 수정할 수 있습니다.

컨트랙트를 배포했던 지갑으로 접속하면 스테이킹 컨트랙트 목록을 조회할 수 있으며, 특정 컨트랙트를 선택해서 \[Manage Staking\] 버튼을 눌러 관리 화면으로 진입할 수 있습니다.

![스테이킹 컨트랙트 주소 입력](/img/nodes/become-a-validator/image24.png)

그 외 스테이킹 컨트랙트 admin 지갑으로 로그인했다면 \[Enter a CnStaking contract address to manage it\] 박스에 스테이킹 컨트랙트 주소를 입력해서 관리 화면으로 진입할 수 있습니다.

![Manage Staking 전체 화면](/img/nodes/become-a-validator/image25.png)

이 화면에서는 다음과 같은 동작을 수행할 수 있습니다.

## Admin 관리 <a id="admin-management"></a>

1. **Add Admin** - 스테이킹 컨트랙트 admin을 추가합니다.
2. **Remove Admin** - 스테이킹 컨트랙트 admin을 제거합니다.
3. **Update Requirement** - 스테이킹 컨트랙트 내의 멀티시그 threshold를 변경합니다.

## 스테이킹 동작 <a id="staking-operations"></a>

![Stake / Unstake / Pending Withdrawals](/img/nodes/become-a-validator/image26.png)
![스테이킹 상세](/img/nodes/become-a-validator/image27.png)

4. **Stake KAIA** - Public Delegation 기능이 비활성화된 경우, 임의로 KAIA를 스테이킹할 수 있습니다.
5. **Unstake KAIA** - Public Delegation 기능이 비활성화된 경우, 스테이킹 컨트랙트 admin이 임의로 KAIA를 언스테이킹할 수 있습니다.
6. **Pending Withdrawals** - 언스테이킹 버튼을 누른 뒤 7일 뒤, 14일 이내에 KAIA를 수령할 수 있습니다.

## 주소 및 Tracker 관리 <a id="address-and-tracker-management"></a>

![Reward address & voter](/img/nodes/become-a-validator/image28.png)

7. **Reward Address** - Public Delegation 기능이 비활성화된 경우, 리워드 주소를 변경할 수 있습니다.
8. **Voter & Staking Tracker** - GC 투표에 사용할 voter address를 변경할 수 있다. Staking Tracker의 업데이트가 있을 때 Staking Tracker 주소를 변경할 수 있습니다.

## Redelegation <a id="redelegation"></a>

![Redelegation](/img/nodes/become-a-validator/image29.png)

9. **Redelegation** - 스테이킹 컨트랙트 간에 7일의 unstaking period를 면제하고 즉시 KAIA를 옮기는 Redelegation 기능을 활성화 또는 비활성화합니다. 단, 출발지와 도착지 양 쪽의 스테이킹 컨트랙트에서 Redelegation이 켜져있어야 합니다. 자세한 내용은 [KIP-163](https://kips.kaia.io/KIPs/kip-163) 를 참조합니다.

## 멀티시그 요청 <a id="multisig-requests"></a>

![Multisig requests](/img/nodes/become-a-validator/image30.png)

10. **Multisig requests** - 멀티시그 threshold가 2 이상인 경우, 1\~9번의 변경을 수행하기 위해서는 스테이킹 컨트랙트 admin들의 confirmation이 필요합니다. 충분한 수의 confirmation이 확보되지 않은 요청의 경우 이 화면을 통해 각 admin 계정으로 접속한 뒤 confirmation 절차를 진행할 수 있습니다. 충분한 수의 confirmation이 확보되는 순간 변경 요청이 실행됩니다.
