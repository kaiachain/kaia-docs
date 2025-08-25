# Web3 통합

이 섹션에서는 웹3.0을 Unity 프로젝트에 통합하기 위해 필요한 부분을 구축해 보겠습니다.

## KIP7 스마트 컨트랙트 생성 및 배포

먼저 Kaia 컨트랙트 마법사를 사용하여 스마트 컨트랙트를 생성합니다.

### 1단계: Kaia 계약 마법사 사용하기

1. Kaia 계약 마법사로 이동합니다.
2. KIP7(ERC20과 유사한 Kaia의 토큰 표준)을 선택합니다.
3. 토큰을 구성합니다:
   - Name: 예제 토큰 (또는 다른 이름!)
   - 심볼: ET(토큰 시세)
   - 프리프린트: 100 (초기 토큰 공급량)
   - 특징: 체크 ✅ 민테이블

이 가이드에서는 소유자 수정자만 갖지 않도록 민트 함수를 조정하겠습니다. 이렇게 하려면 ownable.sol 가져오기 및 소유 가능 상속을 제거해야 합니다. 이제 조정된 코드는 다음과 같이 보일 것입니다:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
contract ExampleTokens is KIP7 {
    constructor() KIP7("ExampleTokens", "ET") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
    function mint(uint256 amount) public  {
        _mint(msg.sender, amount);
    }
}
```

:::info
원래 배포자나 컨트랙트의 소유자 외에는 누구나 민트 함수를 호출할 수 있도록 유일한 소유자 수정자를 제거했습니다.
:::

### 2단계: Remix IDE를 통한 배포

1. 위의 코드를 복사하여 Remix IDE에서 새로 생성한 파일 `ET.sol`에 붙여넣습니다.
2. Remix IDE에서:
   - 계약 컴파일\*\* 버튼을 클릭합니다.
   - 플러그인 관리자에서 **Kaia 플러그인**을 활성화합니다.
   - Kaia 플러그인 탭의 환경 아래에서 **인젝션된 공급자** - **Kaia 월렛**을 선택합니다.
   - 컨트랙트\*\* 드롭다운에서 컨트랙트(예시 토큰)를 찾습니다.
   - 토큰을 배포하려면 **배포**를 클릭하세요!
3. Kaia 지갑이 나타나면:
   - 배포 세부 정보를 검토합니다.
   - 확인을 클릭하여 Kaia Kairos 테스트넷에 배포합니다.

:::important
배포된 계약 주소를 복사하여 저장합니다. 튜토리얼의 뒷부분에 필요하게 될 것입니다.
:::

## Unity-Web3 브리지 구축

이제 Unity와 Web3 기능 간의 중요한 연결을 만들어 보겠습니다. 유니티 애플리케이션에 블록체인 기능을 도입할 수 있는 곳입니다!

### 1부: 1부: 플러그인 브리지 만들기(kaiaPlugin.jslib)

먼저 Unity가 Web3와 통신할 수 있는 자바스크립트 브릿지를 빌드하겠습니다:

1. 플러그인 디렉토리를 만듭니다:

```
Assets/
└── Plugins/
    └── WebGL/
        └── KaiaPlugin.jslib    // We'll create this file
```

2. 왜 .jslib인가? 웹3 인터랙션에 필수적인 Unity의 C#과 브라우저의 자바스크립트 사이의 번역기라고 생각하면 됩니다!

3. 플러그인은 세 가지 핵심 기능을 처리합니다:
   - ConnectWallet() - Kaia 월렛 연결을 처리합니다.
   - GetTokenBalance() - 토큰 잔액을 확인합니다.
   - MintTokens() - 토큰 발행을 관리합니다.

이 파일을 VS Code에서 열고 [부록 A](convert-unity-liff.md#appendix-a)에 `KaiaPlugin.jslib` 소스 코드를 붙여넣습니다:

### 2부: C# 관리자 만들기(Web3Manager.cs)

다음으로 모든 Web3 작업을 관리하기 위한 C# 스크립트를 만들겠습니다:

1. 스크립트 디렉토리를 만듭니다:

```js
Assets/
└── Scripts/
    └── Web3/
        └── Web3Manager.cs    // We'll create this file
```

:::info

\*\*웹3매니저의 기능은 무엇인가요?

- 모든 Web3 작업의 주요 지휘자 역할을 합니다.
- JavaScript 플러그인과의 통신을 관리합니다.
- 블록체인 이벤트에 따라 UI 요소를 업데이트합니다.
- 모든 지갑 및 토큰 작업을 처리합니다.
- '지갑 연결' 및 '민트' 버튼을 각각의 기능으로 연결합니다.
  :::

2. 이 파일을 VS Code에서 열고 [부록 B](convert-unity-liff.md#appendix-b)에 `Web3Manager.cs` 소스 코드를 붙여넣습니다.

### 파트 3: Web3Manager 게임 오브젝트 설정하기

마지막으로, 이 모든 것을 Unity로 통합해 보겠습니다:

1. 관리자 개체를 만듭니다:
   - 계층 구조 창(루트 수준)을 마우스 오른쪽 버튼으로 클릭합니다.
   - "빈 개체 만들기"를 선택합니다.
   - 이름을 "Web3Manager"로 지정합니다.
2. 스크립트 첨부하기:
   - Web3Manager 게임 오브젝트를 선택합니다.
   - 인스펙터에서 컴포넌트 추가를 클릭합니다.
   - "Web3Manager"를 검색하여 선택합니다.
3. UI 요소를 연결합니다:
   - Web3Manager를 선택한 상태에서 인스펙터를 살펴봅니다.
   - UI 요소를 계층 구조에서 해당 필드로 끌어다 놓습니다:
     - 상태 텍스트
     - 주소 텍스트
     - 토큰 잔액 텍스트
     - 연결, 연결 끊기, 민트 버튼
     - 입력 필드

![](/img/minidapps/unity-minidapp/connect-ui-manager.png)
