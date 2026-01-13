# Kaiabridge

Finschia users can swap their FNSA tokens on Finshia network to KAIA tokens on Kaia network at a fixed swap rate. The swap is mediated by a set of smart contract and programs, collectively called Kaiabridge.

온라인 툴킷](https://toolkit.kaia.io/kaiaBridge)에서 카이아브리지에 액세스하여 사용할 수 있습니다.

컨트랙트 소스 코드는 [깃허브 카이아체인/카이아 저장소](https://github.com/kaiachain/kaia/tree/dev/contracts/contracts/system_contracts/kaiabridge)에서, 배포된 주소는 [컨트랙트 주소](https://docs.kaia.io/references/contract-addresses/) 페이지에서 확인할 수 있습니다.

# 카이아브리지 사용자 가이드

## 전제 조건

### 1. 계정을 메타마스크 또는 카이아 월렛으로 옮기기

#### 원시 개인 키 사용

계정을 원시 개인키로 내보낼 수 있는 경우, 원시 개인키를 복사하여 메타마스크 또는 Kaia 지갑에서 가져옵니다.

- [메타마스크](https://support.metamask.io/start/use-an-existing-wallet#import-using-a-private-key)
- [카이아 월렛](https://www.kaiawallet.io/en_US/faq/?id=25)

#### 복구 문구 포함

계정을 복구 문구로만 내보낼 수 있는 경우, 복구 문구에서 원시 개인 키를 계산하세요. BIP-39 파생 경로를 지원하는 모든 도구를 사용할 수 있습니다. 이러한 도구에는 [ethers.js](https://docs.ethers.org/v6/api/wallet/#HDNodeWallet), [viem](https://viem.sh/docs/accounts/local/hdKeyToAccount), [Foundry](https://getfoundry.sh/cast/reference/wallet/), [BIP39 도구](https://github.com/iancoleman/bip39) 등이 있습니다. 핀키아 지갑은 기본 파생 경로로 "m/44'/438'/0'/0/0" 경로([SLIP-044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)에 따름)를 사용하는 경우가 많습니다. 핀키아 지갑에 여러 개의 계정이 있거나 다른 구성을 사용하는 경우 다른 파생 경로를 사용해야 할 수도 있습니다.

개인키를 계산했으면 위 섹션 [원시 개인키 사용](#with-raw-private-key)의 지침을 따릅니다.

:::note[Example BIP39 도구 사용]

이 페이지에서 개인 키를 계산할 수 있습니다: [BIP39 - 니모닉 코드](https://iancoleman.io/bip39/).

예방을 위해 페이지의 '오프라인 사용' 지침을 따르고 이 과정에서 인터넷 연결을 차단하는 것이 좋습니다.

1. "BIP39 니모닉" 필드에 복구 문구를 붙여넣습니다.
2. "코인" 필드를 "ETH - 이더리움"으로 설정합니다.
3. "파생 경로"를 "BIP32"로 설정합니다.
4. "클라이언트"를 "사용자 지정 파생 경로"로 설정합니다.
5. "BIP32 파생 경로"를 "m/44'/438'/0'/0"으로 설정합니다.
6. "파생 주소"에서 "경로"에 "m/44'/438'/0'/0/0"이 표시된 첫 번째 행을 찾으면 "개인 키" 필드에 원시 개인 키가 표시됩니다.

:::

:::note[Example 파운드리 도구 사용]

1. 파운드리](https://getfoundry.sh/)를 설치합니다.
2. 니모닉\`에 복구 구문과 함께 다음 명령을 입력합니다. 원시 개인 키가 인쇄됩니다.
   ```
   캐스트 지갑 개인 키 --m니모닉 "테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 정크" --m니모닉 파생 경로 "m/44'/438'/0'/0/0"
   ```

:::

### 2. 네트워크 확인

메타마스크를 사용하는 경우, 아직 추가하지 않았다면 네트워크에 카이아 메인넷을 수동으로 추가하세요.

- [메타마스크와 카이아 연결하기](https://docs.kaia.io/build/tutorials/connecting-metamask/)

### 3. 계정 충전

스왑을 위해 트랜잭션을 전송하려면 가스가 필요합니다. 자세한 안내는 [KAIA 받기](https://docs.kaia.io/build/get-started/getting-kaia/)를 참조하세요.

가스 요금은 최소 0.1 KAIA를 사용하는 것이 좋습니다.

## 핀치아를 카이아로 교환

:::warning[This 스왑은 되돌릴 수 없습니다]

제공 및 청구 요청은 한 번만 처리할 수 있으며 되돌릴 수 없습니다.
이 지침을 따르기 전에 주의 깊게 읽어보세요.

:::

### 1. 지갑 연결

#### 1.1 메타마스크 연결

"메타마스크 연결" 버튼을 클릭합니다.

<p align="center"><img src="/img/misc/kaiabridge_connect_metamask.png" alt="Connect MetaMask" width="30%"/></p>

'계정'에 주소가 표시되는지 확인합니다.
그렇지 않은 경우 메타마스크 확장 프로그램을 열고 페이지에 연결되지 않았다는 메시지가 표시되는지 확인하세요. 그렇다면 '계정 연결' 버튼을 누릅니다.

<p align="center"><img src="/img/misc/kaiabridge_connect_account.png" alt="Connect Account" width="30%"/></p>

#### 1.2 카이아 지갑 연결

카이아 지갑을 사용하는 경우, 사이트에서 카이아 지갑을 dApp(이 경우 카이아 온라인 툴킷)에 연결하도록 요청할 수 있습니다.

<p align="center"><img src="/img/misc/kaiabridge_connect_kaiawallet.png" alt="Connect Kaia Wallet" width="30%"/></p>

"연결"을 클릭하여 Kaia 지갑을 연결합니다.

#### 2. 카이아 메인넷으로 전환

네트워크를 '카이아 메인넷' 또는 '메인넷'으로 올바르게 설정했는지 확인하세요. 그렇지 않은 경우 카이아 메인넷으로 전환하세요. 메타마스크를 사용 중이고 메타마스크에 Kaia 메인넷 네트워크를 추가하지 않은 경우, [네트워크 확인](#2-check-your-network)을 참조하세요.

#### 3. 핀치아 주소 도출

"핀키아 주소 도출"을 클릭합니다. 메시지에 서명하라는 메시지가 표시되면 '확인' 또는 '서명'을 클릭합니다.

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_sign_metamask.png" alt="Sign message in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_sign_kaiawallet.png" alt="Sign message in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
'파생된 핀키아 주소'가 원래 핀키아 주소와 일치하는지, '코니 잔액'이 핀키아 네트워크(CONY)의 잔액과 일치하는지 확인합니다.

<div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
  <img src="/img/misc/kaiabridge_address_and_conybalance_page.png" alt="Address and CONY balance shown in the page" style={{width: "50%"}} />
  <img src="/img/misc/kaiabridge_address_and_conybalance_wallet.png" alt="Address and CONY balance shown in your wallet" style={{width: "30%", height: "60%"}} />
</div>

<br/><br/>
또한 계정에 가스 요금을 결제할 수 있는 KAIA가 있는지 확인하세요(지갑에서 확인할 수 있습니다).

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_balance_metamask.png" alt="KAIA balance in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_balance_kaiawallet.png" alt="KAIA balance in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
계정에 KAIA가 없는 경우 [계정 충전하기](#3-gas-up-your-account)를 참조하세요.

#### 4. 프로비저닝 요청

"제공 요청"을 클릭합니다. 메시지에 서명하고 트랜잭션을 보내라는 메시지가 표시되면 '확인'을 클릭합니다.

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_provision_metamask.png" alt="Confirm provision transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_provision_kaiawallet.png" alt="Confirm provision transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
이 과정은 몇 초 정도 소요됩니다. 거래가 완료될 때까지 기다립니다.
페이지에서 결과를 확인할 수 있습니다.

<p align="center"><img src="/img/misc/kaiabridge_provision_success.png" alt="Provision request successful" width="80%"/></p>

<br/>
그렇지 않은 경우 새로 고침하고 처음부터 다시 시작하세요.

#### 5. 클레임 요청

'청구 요청'을 클릭합니다. 트랜잭션을 전송하라는 메시지가 표시되면 '확인'을 클릭합니다.

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_claim_metamask.png" alt="Confirm claim transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_claim_kaiawallet.png" alt="Confirm claim transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
이 과정은 몇 초 정도 소요됩니다. 거래가 완료될 때까지 기다립니다.
페이지에서 결과를 확인할 수 있습니다.

<p align="center"><img src="/img/misc/kaiabridge_claim_success.png" alt="Claim request successful" width="80%"/></p>

<br/>
업데이트된 잔액을 확인하세요. 청구 금액은 (코니 잔액) * (전환율, 약 148)을 [kei](https://docs.kaia.io/learn/token-economics/kaia-native-token/#units-of-kaia-)로 계산해야 합니다.