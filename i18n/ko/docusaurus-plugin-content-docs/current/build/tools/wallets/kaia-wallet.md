# 카이아 지갑

카이아 지갑은 카이아의 dApp(탈중앙화 애플리케이션) 개발자를 위한 브라우저 기반 계정 관리 도구입니다. 개발자는 카이아 노드를 로컬에서 실행할 필요 없이 웹 브라우저를 통해 직접 새 계정을 만들거나 기존 계정 정보를 확인할 수 있습니다. 또한 카이아 지갑은 사용자가 테스트 목적으로 다른 계정으로 KAIA또는 카이아 토큰을 전송할 수 있도록 지원합니다.

#### 보안 관련 중요 공지사항 <a id="important-notice-on-security"></a>

> 카이아 지갑은 개발 및 테스트 목적으로만 사용해야 합니다. 클레이나 카이아 토큰을 보관하거나 전송하는 등 상업적 또는 개인적 용도로 카이아 지갑을 사용해서는 안됩니다. 카이아 지갑은 상업적 수준의 보안 테스트를 거치지 않았으며, 악의적인 공격에 취약할 수 있습니다. 카이아 지갑은 브라우저의 로컬 저장소에 사용자의 개인키를 저장하며, 이는 브라우저의 보안 취약점을 악용한 공격에 취약할 수 있습니다.

- 메인넷용 카이아 지갑: [https://wallet.klaytn.com](https://wallet.klaytn.com)
- Kairos 테스트넷용 카이아 지갑: [https://baobab.wallet.klaytn.foundation](https://baobab.wallet.klaytn.foundation)

![](/img/build/tools/00-main.png)

## 카이아 지갑 기능 <a id="klaytn-wallet-functions"></a>

카이아 지갑은 다음과 같은 기능을 제공합니다.

- 계정 및 키 관리
  - 새 계정 만들기
  - 개인 키 또는 키스토어 파일을 사용하여 기존 계정 불러오기
  - 새 키스토어 파일 다운로드
- 자산 관리
  - 계정 잔액 보기
  - 지갑에 토큰 추가하기
  - KAIA및 카이아 토큰 전송하기
- Kairos 테스트넷 KAIA Faucet

## 새 계정 만들기 <a id="create-a-new-account"></a>

> 이미 카이아 계정이 있는 경우, 이 과정을 건너뛰고 [기존 계정 액세스](#access-existing-account)로 이동하실 수 있습니다.

카이아 지갑을 사용하여 새로운 카이아 계정을 만들 수 있습니다. 새 계정을 만들려면 왼쪽 메뉴바에서 `Create Account` 버튼을 클릭한 후 아래 단계를 따르세요.

- 1단계. 새 계정의 키스토어 파일 비밀번호 설정하기
- 2단계. 키스토어 파일을 로컬 저장소에 다운로드
- 3단계. 새 계정의 카이아 지갑 키 저장하기

### 계속하기 전에 몇 가지 주의 사항을 알려드립니다: <a id="before-continuing-a-few-words-of-caution"></a>

- '월렛 키' 또는 `private `key`를 다른 사람과 절대 공유하지 마세요. '지갑 키' 또는 `private `key`에 대한 정보를 제공한다는 것은 계정에 대한 완전하고 영구적인 액세스 권한을 넘겨주는 것을 의미합니다.
- 이 정보를 인터넷에 연결된 기기에 보관하지 마세요. 해커가 로컬 저장소에서 자격 증명을 훔칠 수 있습니다.
- 강력한 비밀번호를 선택하고 중요한 정보를 여러 위치에 저장하세요.
- 카이아는 '지갑 키' 또는 '개인키'를 분실했을 때 복원할 수 없습니다. 키 정보를 분실하지 않도록 최대한 주의하시기 바랍니다.

### 1단계. 키스토어 파일의 비밀번호 설정 <a id="step-1-set-password-for-your-keystore-file"></a>

새 계정을 만드는 첫 단계로 키스토어 파일에 비밀번호를 생성해야 합니다. 키스토어 파일은 계정 주소와 계정과 연결된 개인키를 포함한 카이아 계정 정보를 안전하게 저장하는 JSON 파일입니다. 키스토어 파일의 비밀번호는 파일에 저장된 개인키를 보호하는 역할을 하므로 카이아의 보안 표준을 충족할 만큼 강력해야 합니다.

![](/img/build/tools/01-create-new-1.png)

비밀번호 입력 양식을 클릭하면 위에 툴팁이 표시되고 입력한 비밀번호가 보안 요구 사항을 충족하는지 여부를 입력할 때 확인할 수 있습니다. 비밀번호가 모든 요구 사항을 충족하면 `Next Step` 버튼이 활성화됩니다. !

### 2단계. 키스토어 파일 다운로드 <a id="step-2-download-the-keystore-file"></a>

두 번째 단계에서는 제출한 비밀번호로 암호화된 키스토어 파일을 다운로드합니다. `Download & Next Step` 버튼을 클릭하면 키스토어 파일을 바로 다운로드하고 마지막 단계로 넘어갑니다. (다운로드한 키스토어 파일을 분실했을 경우 `View Account Info` 메뉴에서 새로운 키스토어 파일을 다운로드할 수 있습니다.)

![](/img/build/tools/01-create-new-4.png)

### 3단계. 카이아 지갑 키와 개인키 저장하기 <a id="step-3-save-your-klaytn-wallet-key-and-private-key"></a>

마지막 단계에서는 새로 만든 계정에 해당하는 지갑 키와 개인 키가 표시됩니다. 이 키는 연결이 끊긴 별도의 저장소에 보관하실 것을 강력히 권장합니다.

카이아 계정에 대한 더 자세한 정보는 카이아 문서에서 [Account](../../../learn/accounts.md) 섹션을 참고하세요.

![](/img/build/tools/01-create-new-5.png)

## 기존 계정에 액세스 <a id="access-existing-account"></a>

계정의 KAIA또는 KAIA토큰 잔액을 확인하거나 다른 계정으로 토큰을 전송하려면 계정에 액세스해야 합니다. 카이아 지갑은 두 가지 방법으로 계정에 접근할 수 있습니다.

- **카이아 지갑 키 또는 개인키 사용하기**
  카이아 지갑 키는 계정과 연결된 110개의 16진수 문자열이고, 개인키는 64개의 16진수 문자열입니다(문자 수에는 16진수를 나타내는 접두사 "0x"가 포함되지 않습니다). 이를 포함하면 카이아 지갑 키의 길이는 112자, 개인키의 길이는 66자입니다). 개인키 사용은 항상 최후의 수단으로 접근해야 하며, 다른 모든 방법이 실패했을 때만 사용해야 합니다. 다른 사람이 계정에 액세스하는 주요 경로가 되어서는 안 됩니다. 개인 키는 계정에 대한 완전한 액세스를 허용하기 때문에 가장 민감한 정보입니다. 따라서 개인 키를 안전하게, 안전하게, 비밀리에 보관하는 것이 매우 중요합니다.
- **키스토어 파일 및 비밀번호** 키스토어 파일은 암호화된 개인키와 계정 주소 정보를 저장하는 JSON 파일입니다. 이 파일은 사용자가 제공한 비밀번호를 사용하여 암호화됩니다.

### 카이아 지갑 키 또는 개인키를 사용하여 기존 계정에 액세스 <a id="access-existing-account-using-klaytn-wallet-key-or-private-key"></a>

#### 1단계. 지갑 키 또는 개인키 입력 <a id="step-1-enter-the-wallet-key-or-private-key"></a>

계정에 접근하려면 왼쪽 메뉴 바에서 `View Account Info` 버튼을 클릭하고 화면의 `Private `key\\` 탭으로 이동합니다. 입력란에 접근하고자 하는 계정의 카이아 지갑 키 또는 개인키를 입력합니다.

![](/img/build/tools/03-access-1pk-1.png)

#### 2단계. 체크박스에 체크하고 `Access` 버튼 클릭 <a id="step-2-check-the-checkbox-and-click-access-button"></a>

`Access` 버튼을 클릭하여 계정 페이지로 이동합니다. 입력한 키 정보가 키 형식에 맞지 않으면 `Access` 버튼이 활성화되지 않습니다.

![](/img/build/tools/03-access-1pk-2.png)

### 키스토어 파일 및 비밀번호를 사용하여 기존 계정에 액세스 <a id="access-existing-account-using-keystore-file-and-password"></a>

#### 1단계. 키스토어 파일 탭으로 이동 <a id="step-1-go-to-the-keystore-file-tab"></a>

화면의 `Keystore File` 탭으로 이동합니다.

![](/img/build/tools/03-access-2ks-1.png)

#### 2단계. 사용할 키스토어 파일 선택 <a id="step-2-select-the-keystore-file-to-use"></a>

`Upload` 버튼을 클릭하고 키스토어 파일을 찾습니다.

![](/img/build/tools/03-access-2ks-2.png)

#### 3단계. 키스토어 파일 비밀번호 입력 <a id="step-3-enter-keystore-file-password"></a>

선택한 키스토어 파일에 해당하는 비밀번호를 입력한 후 `Access` 버튼을 클릭하면 계정 페이지로 이동합니다.

![](/img/build/tools/03-access-2ks-3.png)

### 계정 정보 보기 <a id="view-account-info"></a>

이 페이지에서 계정 주소, 개인키, 카이아 지갑 키 정보를 확인할 수 있습니다. 페이지 오른쪽에서는 보유한 클레이와 다른 카이아 토큰의 잔액을 확인할 수 있습니다. 보안상의 이유로 잔액 확인이 필요할 때마다 계정을 잠금 해제하고 싶지 않은 블록체인 애플리케이션 개발자는 카이아 지갑을 사용하여 계정 잔액을 확인하는 것을 권장합니다.

![](/img/build/tools/04-balance-3.png)

## 카이아 토큰을 추가하는 방법 <a id="how-to-add-klaytn-tokens"></a>

카이아 지갑은 클레이와 카이아 토큰을 등록하여 잔액을 확인할 수 있도록 지원합니다. 카이아 지갑에 카이아 토큰을 등록하려면 아래 단계를 따라주세요.

### 1단계. 기존 계정의 정보에 액세스하기 <a id="step-1-access-existing-account-s-information"></a>

[기존 계정에 액세스하기](#access-existing-account)의 단계에 따라 계정 페이지로 이동합니다.

### 2단계. 잔액 섹션에서 토큰 추가 버튼을 클릭합니다 <a id="step-2-click-the-add-token-button-in-the-balance-section"></a>.

화면 오른쪽 하단의 `Balance` 영역에서 '+' 버튼을 클릭합니다.

![](/img/build/tools/05-addtoken-3.png)

### 3단계. 토큰 정보 입력 <a id="step-3-enter-token-information"></a>

`Token Symbol`, `Token Contract Address`, `Decimals`를 입력합니다. `Save` 버튼을 클릭하면 계정 잔액 섹션에 토큰이 표시됩니다.

![](/img/build/tools/05-addtoken-4.png)

## 클레이와 토큰을 보내는 방법 <a id="how-to-send-klay-and-tokens"></a>

카이아 지갑을 사용해 다른 계정으로 KAIA또는 카이아 토큰을 보낼 수 있습니다. KAIA 또는 토큰을 보낼 때는 트랜잭션 수수료를 지불할 수 있는 최소한의 KAIA를 계정에 보유하고 있어야 합니다.

### 1단계. <a id="step-1-go-to-send-klay-tokens-menu"></a>

왼쪽 메뉴 바에서 `Send KAIA & Token` 버튼을 클릭하거나 메인 페이지에서 동일한 버튼을 클릭합니다.

![](/img/build/tools/06-send-1.png)

### 2단계. 계정에 액세스하기 <a id="step-2-access-your-account"></a>

아직 지갑에 계정을 불러오지 않은 경우, [기존 계정에 액세스](#access-existing-account)의 단계에 따라 불러오시기 바랍니다.

### 3단계. 전송할 토큰 선택 <a id="step-3-select-the-token-to-send"></a>

`Step 1. Select Tokens` 영역에서 전송할 토큰을 선택합니다.

![](/img/build/tools/06-send-3.png)

### 4단계. 토큰 전송 정보 선택 <a id="step-4-select-token-transfer-information"></a>

전송할 토큰을 선택한 후 `Step 2. 필요한 정보(`To Address`, `Amount to Send`)를 입력한 다음 `Send Transaction\\` 버튼을 클릭합니다.

![](/img/build/tools/06-send-4.png)

### 5단계. 송금 확인 <a id="step-5-confirm-the-transfer"></a>

확인 페이지가 나타납니다. 송금할 금액과 수취인 주소를 다시 한 번 확인합니다. 모든 것이 정확하다면 `Yes, I'm sure`을 클릭합니다. 그렇지 않으면 이전 페이지로 돌아가 토큰 전송 정보를 수정할 수 있습니다.

![](/img/build/tools/06-send-9.png)

### 6단계. 이전 세부 정보 검토 <a id="step-6-review-transfer-details"></a>

트랜잭션 요청이 완료되었습니다. Klaytnscope에서 트랜잭션의 상태를 확인할 수 있습니다. `View Transaction Info`를 클릭하면 카이아 스코프가 실행되어 트랜잭션 상세 정보를 확인할 수 있습니다.

![](/img/build/tools/06-send-10.png)

## Kairos 테스트넷 KAIA를 받는 방법 <a id="how-to-receive-baobab-testnet-klay"></a>

테스트넷 KAIAFaucet은 Kairos 네트워크에서 실행됩니다. Faucet은 [Kairos Kaia Wallet](https://baobab.wallet.klaytn.foundation)에서 접속할 수 있습니다.

테스트넷 KAIA를 받으려면 유효한 카이아 계정이 있어야 합니다.

- 계정이 없는 경우, [새 계정 만들기](#create-a-new-account)의 단계에 따라 계정을 생성하세요.
- [기존 계정에 접근하기](#access-existing-account)의 단계에 따라 지갑에 계정을 로드합니다. 로드된 계정으로 테스트넷 KAIA가 전송됩니다.

### 1단계. 테스트넷 KAIA Faucet으로 이동 <a id="step-1-go-to-the-testnet-klay-faucet"></a>

[Kairos 카이아 지갑](https://baobab.wallet.klaytn.foundation)에서 좌측 바의 `KLAY Faucet` 메뉴를 클릭하면 테스트넷 KAIA요청 페이지로 이동합니다.

요청 페이지에 주소와 계정의 현재 테스트넷 KAIA 잔액이 표시됩니다.

![](/img/build/tools/test_klay_faucet.png)

### 2단계. Run Faucet <a id="step-2-run-faucet"></a>

`Run Faucet` 버튼을 클릭하면 5개의 테스트넷 KAIA가 전송되고 잔액이 업데이트됩니다. 계정당 24시간에 한 번씩 Faucet를 실행할 수 있습니다.
