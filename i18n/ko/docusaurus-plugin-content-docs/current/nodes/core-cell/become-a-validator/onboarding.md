# 밸리데이터 온보딩

관리자 계정 설정을 마친 후, 밸리데이터 온보딩을 위해 온체인 등록 단계를 수행할 수 있습니다. 이를 위해서는 먼저 실제 Consensus Node (kcn)을 구동하여야 한다는 점을 유의해주세요.

Kaia 밸리데이터로 온보딩하기 위해서 1개의 스테이킹 컨트랙트를 배포하고, 스테이킹 컨트랙트 주소를 포함한 정보를 제출해야 합니다.

:::info Permissionless Phase 1 / Phase 2

Permissionless Phase 1 에서는 원활한 운영을 위해 온보딩시 Kaia Team의 행정 승인(administrative approval)이 필요합니다. 따라서 새로운 밸리데이터 운영자는 온보딩 신청을 전송할 수 있고, Kaia Team에서 내부 승인 절차를 거쳐 온체인 등록이 완료됩니다.

곧 도입될 Permissionless Phase 2 부터는 Kaia Team의 행정 승인 없이 바로 온체인에 정보가 등록 가능하게 됩니다.

:::

등록 후에는 AddressBook과 SimpleBlsRegistry 컨트랙트에 밸리데이터의 정보가 기록되며, Kaia 노드들이 컨센서스 과정에서 이를 참조하게 됩니다. 자세한 Self Validator Registration 등록 기술 관련 사항은 [KIP-277](https://kips.kaia.io/KIPs/kip-277) 에서 확인할 수 있습니다.

## 첫 스테이킹 컨트랙트 배포하기 <a id="deploy-your-first-staking-contract"></a>

이제 스테이킹 컨트랙트를 배포하기 위해 Deploy Staking Contract 메뉴로 이동합니다.

현재 한 스테이킹 컨트랙트에 여러개의 admin 계정을 등록할 수 있으나, Permissionless Phase 2 부터는 스테이킹 컨트랙트에 단 하나의 admin 계정만 등록이 가능해지므로, 단일 Kaia Safe 계정을 admin으로 등록하는것을 권장합니다.

스테이킹 컨트랙트를 배포하기 전에 먼저 admin 외에 컨트랙트 배포에 사용할 임시 어카운트가 추가로 필요합니다. 이 어카운트는 contract validator 이며, 이는 하위호환성을 위한 장치입니다. 일반적으로 스테이킹 컨트랙트 admin 계정과 밸리데이터 manager 계정은 분리해서 사용하므로 밸리데이터 manager 계정을 컨트랙트 validator로 사용해도 됩니다.

스테이킹 컨트랙트 admin 지갑과, 임시 컨트랙트 validator 지갑은 소량의 KAIA를 보유하고 있어야 합니다. 모든 준비가 완료됐다면 다음 단계를 진행합니다.

![Deploy Staking Contract 폼](/img/nodes/become-a-validator/image07.png)

1. \[Are you onboarding to the Kaia network?\] 체크박스를 클릭합니다.

2. 미리 준비한 컨트랙트 validator 어카운트 주소를 입력합니다.

3. Consensus Node ID에는 CN console에서 `admin.nodeInfo.nodeAddress` RPC를 호출하여 출력된 주소를 입력합니다.

4. Reward address는 Public Delegation 기능의 사용 유무에 따라 다릅니다. Public Delegation 없이 밸리데이터에 온보딩하려면, 리워드를 수령할 주소를 직접 입력합니다. Public Delegation 기능을 켜고 온보딩하려면, "Public Delegation" 체크박스를 클릭합니다. 이후 리워드는 자동으로 Public Delegation 컨트랙트를 통해 delegator들에게 분배됩니다.

![Public Delegation 설정](/img/nodes/become-a-validator/image08.png)
![Public Delegation 설정(이어서)](/img/nodes/become-a-validator/image09.png)

5. 스테이킹 컨트랙트 admin 주소와 멀티시그 threshold 값을 입력합니다. Admin address에는 Kaia Safe 월렛 주소를 입력하고 threshold를 1로 설정하면 멀티시그 기능을 Kaia Safe에서 담당하게 됩니다. 여러 개의 admin 주소를 입력하고 threshold를 임의로 설정하면 Manage Staking 메뉴에서 멀티시그 기능을 담당하게 됩니다.

![Deploy Contract 버튼](/img/nodes/become-a-validator/image10.png)

6. \[Deploy Contract\] 버튼을 클릭하여 트랜잭션을 실행하면 컨트랙트가 배포되어 \[Not initialized\] 상태가 됩니다.

## 스테이킹 컨트랙트 초기화하기 <a id="initialize-the-staking-contract"></a>

새롭게 배포된 스테이킹 컨트랙트는 초기화를 진행해야 사용 가능한 상태로 변경됩니다. 필수 정보를 입력하고 각 admin 계정으로부터 트랜잭션을 한 번씩 전송하여 지갑을 검증한 뒤에 컨트랙트를 사용할 수 있습니다.

![Set Staking Tracker](/img/nodes/become-a-validator/image11.png)

1. \[Set Staking Tracker\] 버튼을 클릭하여 스테이킹 컨트랙트에 Staking Tracker 주소를 입력합니다. 올바른 Staking Tracker 주소가 자동으로 입력됩니다.

![Set GC ID](/img/nodes/become-a-validator/image12.png)

2. Kaia Team으로부터 GC ID를 할당받아 입력합니다. \[Set GC ID\] 버튼을 클릭하여 스테이킹 컨트랙트에 GC ID를 입력합니다. Permissionless Phase 2부터는 GC ID가 자동 할당될 예정입니다.

![Public Delegation 정보 입력](/img/nodes/become-a-validator/image13.png)
![Public Delegation 정보 입력(이어서)](/img/nodes/become-a-validator/image14.png)

3. Public Delegation을 활성화한 경우 관련 정보를 입력합니다. 컨트랙트 배포시에 Public Delegation을 활성화하지 않았다면 이 단계를 생략합니다.
    1. Owner는 commission recipient와 commission rate를 변경할 수 있는 계정을 입력합니다.
    2. Commission recipient는 commission을 수령할 계정을 입력합니다.
    3. Commission rate는 0과 10000사이의 basis point 단위의 값을 입력합니다.
    4. GC Name은 pdKAIA 토큰 이름으로 노출될 짧은 이름을 입력합니다. 예를 들어, GC Name을 "Hello"라고 하면 해당 Public Delegation의 deposit token명이 "Hello-pdKAIA"가 됩니다. (예시: [kaiascan에서 pdKAIA 검색](https://kaiascan.io/search?tabId=tokens&keyword=pdkaia&page=1))

![Review Conditions](/img/nodes/become-a-validator/image15.png)

4. 앞서 설정했던 컨트랙트 validator와 각 스테이킹 컨트랙트 admin으로부터 트랜잭션을 한 번씩 전송하여 지갑을 검증합니다. 지갑을 변경하며 로그인해서 \[Review Conditions\] 버튼을 한 번씩 클릭합니다.

![Deposit & Init 1](/img/nodes/become-a-validator/image16.png)
![Deposit & Init 2](/img/nodes/become-a-validator/image17.png)

5. 마지막으로 \[Deposit & Init\] 버튼을 클릭하여 컨트랙트 초기화를 마칩니다.

## 온보딩 신청하기 <a id="submit-an-onboarding-request"></a>

Home 메뉴로 돌아오면 배포가 완료된 스테이킹 컨트랙트가 \[Initialized\] 상태로 표시됩니다.

![초기화 완료 상태의 Home](/img/nodes/become-a-validator/image18.png)

\[Onboard Validator\] 버튼을 클릭하여 Kaia Team에 온보딩을 신청합니다.

![Onboard Validator 버튼](/img/nodes/become-a-validator/image19.png)

![온보딩 신청 폼](/img/nodes/become-a-validator/image20.png)

1. 표시되는 정보를 확인합니다.
2. 노드 정보를 확인합니다. Consensus Node ID 주소는 최소 10 KAIA를 보유하고 있어야 하는데, 이는 [Gas Abstraction](../../../build/tutorials/ga-tutorial/ga-intro.md)과 [MEV Auction](../../../build/tutorials/mev-auction-sdk-guide.md) 트랜잭션을 처리하기 위해 필요한 최소 수량입니다. 10 KAIA는 차감되지 않으며 해당 트랜잭션을 처리하면서 잠시 사용되었다가 즉시 반환됩니다.

![BLS 공개키 정보](/img/nodes/become-a-validator/image21.png)

3. 노드로부터 BLS 공개키 정보를 조회하여 입력합니다. CN console에서 `admin.nodeInfo.blsPublicKeyInfo` RPC를 호출해서 나오는 'publicKey'와 'pop'값을 입력합니다.

![Submit Onboarding Request](/img/nodes/become-a-validator/image22.png)

4. \[Submit Onboarding Request\] 버튼을 클릭하여 온보딩 신청을 제출합니다.
