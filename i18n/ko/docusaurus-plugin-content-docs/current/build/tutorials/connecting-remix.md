# Remix를 카이아에 연결하기

![](/img/build/tutorials/klaytnXremix.png)

## Remix란?

Remix는 Solidity 컨트랙트를 개발하기 위한 브라우저 기반 IDE(통합 개발 환경)입니다. 이 문서에서는 Remix와 Kaia를 연결하는 방법을 다룹니다. Remix 사용법에 대해 더 자세히 알고 싶으시다면 [ **Remix 문서**](https://remix-ide.readthedocs.io/en/latest/) 또는 [**Remix IDE**](https://remix.ethereum.org/)를 참고하시기 바랍니다.

## EVM 버전 설정 <a href="#setup-evm-version" id="setup-evm-version"></a>

카이아는 Solidity로 작성된 컨트랙트를 지원하며, EVM의 **London** 버전과 호환됩니다. 또한 Solidity 버전 0.8.x 이하가 카이아에서 지원됩니다. 따라서 카이아에 컨트랙트를 배포하려면 **London** EVM 버전으로 컨트랙트를 컴파일해야 합니다.

- **solidity compiler**를 클릭한 다음 'Advanced Configurations'에서 **London** EVM 버전을 선택합니다.

![Solidity Complier](/img/build/tutorials/remix-solidity-compiler.png)

## 로컬 플러그인에 연결 <a href="#connect-to-a-local-plugin" id="connect-to-a-local-plugin"></a>

Remix를 사용하여 Kaia 네트워크에 연결하려면 로컬 플러그인이 필요합니다. 그 과정은 아래에 설명되어 있습니다:

- **plugin manager**를 클릭한 다음 **Connect to a Local Plugin**을 클릭합니다.

![Plugin](/img/build/tutorials/remix-environment-plugin.png)

- **URL**에 https\://klaytn-remix-plugin.ozys.net 을 입력합니다. **Plugin Name**과 **Display Name**에 원하는 이름을 입력합니다.

![Local Plugin](/img/build/tutorials/remix-local-plugin.png)

- **Kaia** 탭이 나타나면 카이아와 상호작용할 준비가 된 것입니다.

## 배포 환경 설정하기 <a href="#setting-up-the-deployment-environment" id="setting-up-the-deployment-environment"></a>

- [Klaytn] 탭을 클릭합니다.
- 해당 Environment을 선택합니다.
- **Kairos**, **Mainnet**, **Injected Caver**, **Caver Provider** 또는 **Injected Web3**를 선택할 수 있습니다.
  - **[Kairos]**: Kairos 네트워크에 연결합니다.
  - **[Mainnet]**: 메인 네트워크에 연결합니다.
  - **[Injected Caver]**: 인젝션된 caver(예: Kaikas)에 연결합니다.
  - **[Caver Provider]**: RPC를 지원하는 카이아 노드에 직접 연결합니다.
  - **[Injected Web3]**: 인젝션된 Web3(예: MetaMask)에 연결합니다.

![Kaia Tab](/img/build/tutorials/remix-klaytn-tab.png)

## 계정 가져오기 <a href="#import-account" id="import-account"></a>

**private key** 또는 \*\* Keystore\*\*에서 키를 가져올 수 있습니다.

- **ACCOUNT** 옆에 있는 **plus** 버튼을 클릭합니다.

![Import Keys](/img/build/tutorials/remix-klaytn-import-account.png)

- 개인키 또는 키저장소를 입력합니다.
- **feePaye**의 키를 가져올 수도 있습니다. **private key**만 지원합니다.

## EN(엔드포인트 노드)을 사용하여 카이아 - Remix 연결하기 <a href="#connecting-kaia-remix-using-en" id="connecting-kaia-remix-using-en"></a>

- [**EN 문서**](../smart-contracts/deploy/ken.md#launch-an-en)의 지침에 따라 로컬 환경에서 엔드포인트 노드를 설정합니다.
- [**계정 관리**](../get-started/account/managing-accounts.md)의 지침에 따라 계정을 생성합니다.

  > **참고:** 로컬 환경이 아닌 Kairos의 공용 EN을 사용하는 경우, 개인 API가 비활성화되어 있으므로 계정에 연결되지 않습니다.
- 환경 메뉴에서 [Caver Provider]를 선택합니다.

![Caver Provider](/img/build/tutorials/env-caver-provider.png)

- Caver 공급자 엔드포인트에 EN의 RPC 주소를 입력합니다. 로컬 EN(기본값): [http://localhost:8551](http://localhost:8551/)
- 네트워크에 성공적으로 연결되면 연결된 네트워크의 체인 ID와 계정이 표시됩니다.

## MetaMask를 사용하여 카이아 - Remix 연결하기 <a href="#connecting-kaia-remix-using-metamask" id="connecting-kaia-remix-using-metamask"></a>

- [MetaMask에 연결하기](connecting-metamask)를 참고하여 카이아와 MetaMask를 연결합니다.
- Remix 환경 메뉴에서 [Injected Web3]를 선택합니다.

![Injected Web3](/img/build/tutorials/env-injected-web3.png)

- MetaMask 팝업이 표시되면 해당 계정을 클릭하여 선택합니다.
- 네트워크에 성공적으로 연결되면 연결된 네트워크의 체인 ID와 계정이 표시됩니다.

## Kaikas를 사용하여 카이아 - Remix 연결하기 <a href="#connecting-kaia-remix-using-kaikas" id="connecting-kaia-remix-using-kaikas"></a>

- Remix 환경 메뉴에서 [Injected Caver]를 선택합니다.

![Injected Caver](/img/build/tutorials/env-injected-caver.png)

- Kaikas 팝업이 표시되면 [Connect]를 클릭합니다.
- 네트워크에 성공적으로 연결되면 연결된 네트워크의 체인 ID와 계정이 표시됩니다.

## 튜토리얼: KaiaGreeter 컨트랙트 <a href="#tutorial-kaiagreeter-contract" id="tutorial-kaiagreeter-contract"></a>

여기서는 [**KaiaGreeter**](../smart-contracts/samples/kaiagreeter.md) 샘플 컨트랙트를 사용할 것입니다.

- KaiaGreeter.sol을 추가하고 테스트 코드를 작성합니다.

![Add KaiaGreeter](/img/build/tutorials/remix-add-klaytngreeter.png)

- Solidity 컴파일 탭에서 [Compile KaiaGreeter.sol]을 선택해 컨트랙트 코드를 컴파일합니다.

> 'Auto compile' 옵션을 켜는 것이 좋습니다.

- 트랜잭션 배포 및 실행 탭에서 [Deploy]를 클릭하여 컴파일된 컨트랙트를 배포합니다.

![Deploy the Contract](/img/build/tutorials/remix-deploy-run-tx.png)

- 배포된 컨트랙트를 볼 수 있습니다. 테스트하거나 디버깅할 수 있습니다.

![Check the Contract](/img/build/tutorials/remix-test-or-debug.png)
