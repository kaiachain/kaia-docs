# UI 생성

이 섹션에서는 지갑 연결, 잔액 업데이트, 채굴 기능 등 디앱의 사용자 인터페이스(UI)를 구축해 보겠습니다.

## 메인 장면 설정 <a id="setting-up-main-scene"></a>

### 1단계: 장면 폴더 만들기 <a id="create-scene-folder"></a>

 - 프로젝트의 **자산** 폴더로 이동합니다.
 - 마우스 오른쪽 버튼을 클릭하고 **폴더 만들기**를 선택합니다.
 - 장면\*\*의 이름을 지정합니다. (이미지 삽입)
 - 씬 폴더 내에서 마우스 오른쪽 버튼을 클릭하고 **만들기 → 씬**을 선택합니다.

![](/img/minidapps/cocos-creator/cp-create-scene-r.png)

 - 메시지가 표시되면 장면 파일을 저장합니다.
 - 새로 생성한 장면을 두 번 클릭하여 **기본 장면**으로 설정합니다.

### 2단계: 기본 캔버스 만들기 <a id="creating-base-canvas"></a>

 - 계층 구조 창에서 **씬**을 마우스 오른쪽 버튼으로 클릭합니다.
 - 생성 → UI 컴포넌트 → 캔버스\*\*로 이동합니다.
 - 이름을 **캔버스**로 변경합니다.

![](/img/minidapps/cocos-creator/cp-create-canvas-r.png)

### 3단계: Web3UI 컨테이너 만들기 <a id="create-web3ui-container"></a>

 - 새로 만든 **캔버스**를 마우스 오른쪽 버튼으로 클릭합니다.
 - 생성 → 노드 비우기\*\*를 선택합니다.
 - Web3UI\*\*로 이름을 변경합니다.

![](/img/minidapps/cocos-creator/cp-create-web3-ui-r.png)

### 4단계: 기본 UI 개체 설정하기 <a id="setting-up-main-ui-objects"></a>

Web3UI 내에서 다음 컴포넌트를 생성합니다:

**1. 지갑 연결 버튼**

 - Web3UI → 생성 → UI 컴포넌트 → 버튼\*\*을 마우스 오른쪽 버튼으로 클릭합니다.

![](/img/minidapps/cocos-creator/cp-connect-button-r.png)

 - 이름을 **ConnectWallet**으로 변경합니다.
 - 검사기 창\*\*에서 버튼 레이블 텍스트를 **지갑 연결**로 설정합니다.

![](/img/minidapps/cocos-creator/cp-connect-label-r.png)

**2. 민트 버튼**

 - Web3UI → 생성 → UI 컴포넌트 → 버튼\*\*을 마우스 오른쪽 버튼으로 클릭합니다.
 - 민트버튼\*\*으로 이름을 변경합니다.
 - 버튼 라벨 텍스트를 **민트 버튼**으로 설정합니다.

**3. 주소 라벨**

 - Web3UI → 생성 → 2D 개체 → 레이블\*\*을 마우스 오른쪽 버튼으로 클릭합니다.

![](/img/minidapps/cocos-creator/cp-address-label-r.png)

 - 주소 라벨\*\*로 이름을 바꿉니다.
 - 레이블 텍스트를 \*\*연결된 주소:\*\*로 설정합니다.

![](/img/minidapps/cocos-creator/cp-connected-address-r.png)

**4. 잔액 라벨**

 - Web3UI → 생성 → 2D 개체 → 레이블\*\*을 마우스 오른쪽 버튼으로 클릭합니다.
 - 밸런스 라벨\*\*로 이름을 바꿉니다.
 - 라벨 텍스트를 **0.000ET**로 설정합니다.

모든 컴포넌트를 추가한 후 계층 구조는 다음과 같이 보일 것입니다:

```bash
Canvas
└── Web3UI
    ├── ConnectWallet
    ├── MintButton
    ├── AddressLabel
    ├── BalanceLabel
```

![](/img/minidapps/cocos-creator/cp-ui-view-r.png)

:::note
컴포넌트를 올바르게 정렬하려면 씬 상단의 정렬 도구를 사용합니다. 각 구성 요소를 클릭하고 필요에 따라 위치를 조정합니다.
:::
