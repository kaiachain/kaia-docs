# SafePal S1

![](/img/banners/kaia-safepal.png)

## 소개 <a id="introduction"></a>

하드웨어 지갑은 인터넷 연결에 의존하는 소프트웨어 지갑에서 발생하는 수많은 해킹이나 위협을 피하기 위해 거래 서명에 필요한 개인키를 인터넷 연결과 분리된 오프라인 환경에 보관함으로써 암호화폐 지갑의 역사를 새로 썼습니다. 이렇게 하면 사용자의 암호화폐 자산이 더욱 안전하게 보호되고 소프트웨어 지갑으로 인한 인터넷 위험으로부터 보호됩니다.

Kaia와 통합된 하드웨어 지갑 중 하나는 **SafePal S1 하드웨어 지갑**입니다. SafePal S1은 대중에게 안전하고 간단하며 즐거운 암호화폐 관리 솔루션을 제공하는 것을 목표로 하는 암호화폐 하드웨어 지갑입니다. SafePal은 비트코인, Kaia, Kaia 호환 토큰(KCT), 이더리움, ERC20 토큰 등 암호화폐와 대체 불가능한 토큰을 보호하고 관리할 수 있는 하드웨어 지갑입니다.

이 가이드에서는 다음을 다룹니다:

- SafePal S1 하드웨어 지갑으로 KAIA 및 모든 Kaia 호환 토큰(KCT) 추가, 수신 및 보내기

## 전제조건 <a id="prerequisites"></a>

- [SafePal 하드웨어 지갑 설정](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752)

## 시작하기 <a id="getting-started"></a>

지갑을 성공적으로 설정했으면 다음 단계는 지갑이 실제로 작동하는지 확인하는 것입니다. 이 튜토리얼에서는 SafePal S1 하드웨어 지갑을 사용해 KAIA 네이티브 코인과 Kaia 호환 토큰(KCT)을 추가, 수신, 전송하는 방법을 살펴보겠습니다.

### 암호화폐 토큰 추가하기 <a id="adding-crypto-tokens"></a>

하드웨어 지갑에 암호화폐 토큰을 추가하려면 아래 단계를 따르세요:

**1단계**: SafePal 앱을 열고 지갑 탭에서 줄임표 아이콘을 클릭한 다음 아래 그림과 같이 코인 관리 버튼을 클릭합니다:

![](/img/build/tools/safepal/sp-hw-manage-coins.png)

**2단계**: 추가하려는 코인을 검색한 다음 켜기로 전환합니다.

**네이티브 토큰 - KAIA**

- 검색창에 KAIA를 입력한 후 켜세요.

![](/img/build/tools/safepal/sp-app-search-kaia.jpg)

**융통성 토큰 - USDT**

- 검색창에 USDT Kaia를 입력하고 켜세요.

![](/img/build/tools/safepal/sp-app-search-usdt.jpg)

**3단계**: 하단의 **코인 추가**를 클릭합니다.

![](/img/build/tools/safepal/sp-hw-add-coins.png)

**4단계**: SafePal 앱과 S1 하드웨어 지갑을 앞뒤로 스캔하고 장치 PIN 코드를 입력하여 앱과 장치 간에 데이터가 올바르게 동기화되도록 합니다.

**4단계**: 코인이 성공적으로 추가되면 이제 S1 기기의 **Asset Management** 탭에서 코인을 확인할 수 있습니다.

![](/img/build/tools/safepal/sp-hw-asset-display.png)

:::note
위의 단계는 Kaia 호환 토큰을 추가할 때 적용됩니다.
:::

### 암호화폐 토큰 받기 <a id="receiving-crypto-tokens"></a>

코인(KLAY, KCT)이 성공적으로 추가되면 S1 장치의 **Asset Management** 탭에서 확인할 수 있습니다. 다음 방법을 사용하여 암호화폐 토큰을 받을 수 있습니다:

#### SafePal 앱 사용

1. 스왑, 수신, 송금 옵션을 제공하는 KAIA 또는 USDT와 같은 기타 대체 가능한 토큰을 선택합니다. 수신을 탭합니다.
2. KAIA 또는 USDT 지갑 주소를 복사하거나 QR 코드를 저장하거나 상대방이 내 기기에서 직접 QR 코드를 스캔하도록 할 수 있습니다.

#### SafePal S1 하드웨어 지갑 사용하기

1. SafePal S1 장치를 시작하고 '자산 관리'로 이동합니다.
2. 받고자 하는 코인으로 KAIA 또는 USDT와 같은 다른 대체 가능한 토큰을 선택합니다.
3. '받기' 버튼을 클릭합니다.
4. S1 디바이스의 PIN 코드를 입력합니다.
5. 그런 다음 코인 주소의 QR 코드를 확인하고 다른 사람에게 보여 주면 다른 사람이 코인을 스캔하여 보낼 수 있습니다.

![](/img/build/tools/safepal/sp-hw-receive-tokens.png)

:::note
위의 단계는 Kaia 호환 토큰을 받을 때 적용됩니다.
:::

### 암호화폐 토큰 보내기 <a id="sending-crypto-tokens"></a>

하드웨어 지갑에서 암호화폐 토큰을 전송하려면 아래 단계를 따르세요:

**1단계**: SafePal 앱에서 송금하려는 코인을 선택하고 **송금**을 클릭합니다.

**네이티브 토큰 - KAIA**

![](/img/build/tools/safepal/sp-hw-sp-app-send.png)

**융통성 토큰 - USDT**

![](/img/build/tools/safepal/sp-hw-sp-app-usdt-send.png)

**2단계**: 도착지 주소와 금액을 입력하고 '다음'을 클릭하여 세부 정보를 다시 확인합니다. 이 단계에서 송금 세부 정보를 반드시 확인하세요.

![](/img/build/tools/safepal/sp-hw-sp-app-send-details.png)

**3단계**: S1 디바이스의 서명 프로세스를 시작합니다.

이 단계에서는 송금 세부 정보가 포함된 QR코드(아래 그림 참조)가 SafePal 앱에 표시됩니다. S1 하드웨어 지갑을 시작하고 **스캔** 탭으로 들어갑니다. 다음은 SafePal 앱에서 QR 코드를 스캔하고 SafePal 장치에서 PIN 코드를 입력하는 것입니다.

이렇게 하면 S1 장치가 오프라인 환경에서 이체 세부 정보를 수신합니다.

![](/img/build/tools/safepal/sp-hw-sign-tx.png)

**4단계**: 서명을 SafePal 앱에 다시 동기화합니다.

S1 장치에서 전송에 성공적으로 서명하면 S1 장치에 동적 QR 코드 세트가 표시됩니다. SafePal 앱에서 'Next'를 클릭하여 휴대폰 카메라를 엽니다. SafePal 앱을 사용하여 S1 장치에 표시된 동적 QR 코드를 스캔합니다.

이렇게 하면 앱이 QR코드에 포함된 서명을 수신하고 블록체인(Kaia)으로 전송을 브로드캐스트할 준비가 된 것입니다.

**5단계**: 앱에서 **방송**을 클릭하고 전송이 완료될 때까지 기다립니다.

![](/img/build/tools/safepal/sp-hw-broadcast-tx.png)

:::note
위의 단계는 Kaia 호환 토큰을 전송할 때 적용됩니다.
:::

## 추가 참조 <a id="further-references"></a>

- [SafePal S1 업그레이드 지침](https://www.safepal.com/en/upgrade/s1)
- [SafePal S1 사용자 매뉴얼](https://docs.safepal.io/safepal-hardware-wallet/user-manual)