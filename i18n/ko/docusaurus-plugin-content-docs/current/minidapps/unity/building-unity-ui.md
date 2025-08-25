# UI 생성

이 섹션에서는 디앱의 사용자 인터페이스를 구축해 보겠습니다! 상태 업데이트, 작업, 채굴 기능을 위한 세 가지 주요 패널로 구성된 구조화된 UI 시스템을 만들 것입니다.

## 메인 캔버스 설정

먼저 기본 캔버스를 만들어 보겠습니다:

1. 계층 구조 창에서 "샘플 씬"을 마우스 오른쪽 버튼으로 클릭합니다.
2. 게임 오브젝트 → UI → 캔버스로 이동합니다.

## Web3UI 컨테이너 만들기

1. 새 캔버스를 마우스 오른쪽 버튼으로 클릭합니다.
2. "비어 있음 만들기"를 선택합니다.
3. 이름을 "Web3UI"로 변경합니다.

## 메인 패널 설정

Web3UI 내에서 세 개의 패널 객체를 만듭니다:

1. Web3UI를 마우스 오른쪽 버튼으로 클릭하고 "비어 있음 만들기"를 선택합니다.
2. 이러한 패널을 만들고 이름을 변경합니다:
    - StatusPanel - 디앱의 정보 디스플레이
    - ButtonPanel - 사용자 상호작용용
    - MintPanel - 토큰 채굴 기능용

## 패널 구성 요소 만들기

### 상태 패널 구성 요소

이 패널에는 모든 중요한 Web3 정보가 표시됩니다:

 - StatusPanel을 마우스 오른쪽 버튼으로 클릭하고 UI → 텍스트 - TextMeshPro를 클릭한 다음 이름을 StatusText로 변경합니다. 인스펙터 창의 "텍스트 입력" 필드(예: "상태...")를 입력해야 합니다.

:::note
**텍스트메시프로(TMP) 설정**

TextMeshPro 엘리먼트를 처음 생성할 때(UI - 텍스트 - TextMeshPro), Unity는 자동으로 TMP 에센셜을 임포트하라는 메시지를 표시합니다. 실수로 이 프롬프트를 건너뛴 경우, 창 > TextMeshPro > TMP 에센셜 임포트를 통해 수동으로 임포트할 수 있습니다.

필요한 이유 텍스트 메시 프로는 게임에서 텍스트를 제대로 표시하기 위해 핵심 리소스(셰이더, 기본 글꼴, 머티리얼)가 필요합니다. 이러한 필수 요소가 없으면 텍스트 컴포넌트가 올바르게 렌더링되지 않고 프로젝트에 셰이더/머티리얼 오류가 표시됩니다. 이 설정은 텍스트가 제대로 작동하는 데 필요한 일회성 설정입니다.
:::

![](/img/minidapps/unity-minidapp/status_text.png)

 - StatusPanel을 마우스 오른쪽 버튼으로 클릭하고 UI → 텍스트 - TextMeshPro를 클릭한 다음 이름을 AddressText로 변경합니다. 텍스트 객체(예: "주소 텍스트...")를 채워야 합니다.
 - StatusPanel을 마우스 오른쪽 버튼으로 클릭하고 UI → 텍스트 - TextMeshPro를 클릭한 다음 이름을 토큰밸런스텍스트로 변경합니다. 텍스트 개체를 채워야 합니다(예: "0.0000 ET").

```code
├── StatusText (TextMeshPro)
│   └── Default: "Status..."
├── AddressText (TextMeshPro)
│   └── Default: "Address Text..."
└── TokenBalanceText (TextMeshPro)
    └── Default: "0.0000 ET"
```

### 버튼패널 컴포넌트

주요 상호작용 버튼:

 - 버튼패널을 마우스 오른쪽 버튼으로 클릭하고 UI → 버튼 - TextMeshPro를 클릭한 다음 이름을 ConnectWalletButton으로 변경합니다. 인스펙터 창의 '텍스트 입력' 필드에 '지갑 연결'을 입력해야 합니다.

 - 버튼패널을 마우스 오른쪽 버튼으로 클릭하고 UI → 버튼 - TextMeshPro를 클릭한 다음 이름을 DisconnectWalletButton으로 변경합니다. 인스펙터 창의 '텍스트 입력' 필드에 '지갑 연결 해제'를 입력해야 합니다.

```code
ButtonPanel
├── ConnectWalletButton (Button - TextMeshPro)
│   └── Text: "Connect Wallet"
├── DisconnectWalletButton (Button - TextMeshPro)
│   └── Text: "Disconnect Wallet"
```

### 민트패널 구성 요소

토큰 채굴 인터페이스입니다:

 - MintPanel을 마우스 오른쪽 버튼으로 클릭하고 UI → 입력 필드 → TextMeshPro를 클릭한 다음 이름을 MintAmountInput으로 변경합니다. 플레이스홀더 객체에 "금액 입력…"을 입력해야 합니다.
 - MintPanel을 마우스 오른쪽 버튼으로 클릭하고 UI → 버튼 → TextMeshPro를 클릭한 다음 이름을 MintButton으로 변경합니다. 텍스트 개체를 "민트"로 채워야 합니다.

```code
MintPanel
├── MintAmountInput (Input Field - TextMeshPro)
│   └── Placeholder: "Enter Amount..."
└── MintButton (Button - TextMeshPro)
    └── Text: "Mint"
```

모든 컴포넌트를 생성한 후 계층 구조는 다음과 같아야 합니다:

```code
Canvas
└── Web3UI
    ├── StatusPanel
    ├── ButtonPanel
    └── MintPanel
```

![](/img/minidapps/unity-minidapp/unity-ui-canvas.png)

:::note
위 이미지와 같이 컴포넌트가 잘 정렬되려면 각 컴포넌트를 클릭할 때 오른쪽에 있는 아이콘을 사용하여 수동으로 정렬해야 합니다.
:::
