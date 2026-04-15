# 밸리데이터 등록 및 관리

## 들어가며 <a id="overview"></a>

:::info Permissionless Phase 1

이 매뉴얼은 Permissionless Phase 1 단계에서 현재 GC들이 포털을 통해 Validator를 관리하는 방법을 안내합니다. Permissionless 네트워크를 통한 참여 개방은 Phase 2(9월 말 예정)에 이루어질 예정이며, 해당 매뉴얼은 Phase 2 시점에 한 번 더 업데이트될 예정입니다. 자세한 업데이트 내용은 다음 문서를 참조해주세요. [Permissionless 구현 계획](https://govforum.kaia.io/t/permissionless-implementation-overview/1218), [PGT 로드맵](https://govforum.kaia.io/t/pgt-permissionless-governance-tokenomics-roadmap-introduction/1447)

:::

이제 Kaia에서 밸리데이터 정보를 등록하고 관리할 수 있는 [밸리데이터 관리 포털](https://portal.kaia.io/validators)을 제공합니다. 이 가이드를 통해서 밸리데이터들은 Kaia 네트워크에 참여할 수 있습니다.

밸리데이터 활동을 위해 필요한 정보들은 온체인 컨트랙트에 기록되어야 하므로, 밸리데이터는 누구나 이 포털을 통해 트랜잭션을 전송하여 컨트랙트에 정보를 입력하거나 수정할 수 있습니다. 또한, 새로운 밸리데이터가 Kaia 네트워크에 온보딩하거나 오프보딩할 경우, 해당 밸리데이터가 보유한 스테이킹 컨트랙트를 관리할 수 있습니다.

구체적으로 현재 다음과 같은 기능들을 지원하고 있습니다.

![포털 홈](/img/nodes/become-a-validator/image01.png)

- **Home**: validator manager가 배포한 스테이킹 컨트랙트 등이 표시되는 메인 화면입니다.
- **Deploy Staking Contract**: 새로운 스테이킹 컨트랙트를 배포할 수 있습니다.
- **Manage Staking**: 배포된 스테이킹 컨트랙트의 정보를 수정할 수 있습니다.
- **Become a Validator**: 배포된 스테이킹 컨트랙트를 등록함으로써 밸리데이터로 온보딩할 수 있습니다.
- **Manage Validator**: 온보딩한 밸리데이터의 정보를 수정할 수 있습니다.
- **Pending Requests**: Kaia Team이 사용하는 관리 기능 화면입니다.

:::note

위 기능들은 현재 테스트넷도 모두 지원합니다. 따라서 테스트 목적일 경우 테스트넷에서 진행하는것을 권장합니다.

:::

## 가이드 구성 <a id="what-youll-do"></a>

온보딩 흐름은 다음 순서로 진행됩니다.

1. [사전 준비](./prerequisites.md) — validator manager 지갑을 연결하고(Kaia Safe 권장) 필요한 계정들을 준비합니다.
2. [밸리데이터 온보딩](./onboarding.md) — 스테이킹 컨트랙트를 배포·초기화하고 온보딩 신청을 제출합니다.
3. [스테이킹 컨트랙트 관리](./manage-staking.md) — admin 관리, KAIA 스테이킹/언스테이킹, 리워드 주소 변경, 멀티시그 처리 등을 수행합니다.
4. [밸리데이터 정보 관리](./manage-validator.md) — manager 계정 이전, 오프보딩 신청, 보조 스테이킹 컨트랙트 관리를 수행합니다.

## 관련 자료 <a id="related-resources"></a>

- [Kaia Safe 사용 가이드](../../../build/wallets/kaia-safe/kaia-safe.md)
- [KIP-277: Self Validator Registration](https://kips.kaia.io/KIPs/kip-277)
- [KIP-163: Redelegation](https://kips.kaia.io/KIPs/kip-163)
