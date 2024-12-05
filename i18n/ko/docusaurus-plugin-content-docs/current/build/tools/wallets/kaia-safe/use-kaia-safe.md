# Kaia Safe 사용

## 금고 만들기

여기서는 카이아 네트워크에서 세이프 생성 방법과 이점을 평가하는 방법을 보여드리겠습니다.

**Step 1:** Navigate to [Kaia Safe App](https://safe.kaia.io/). 웹 브라우저에서 애플리케이션으로 이동하면 Kaia Safe의 기능을 살펴볼 수 있습니다.

**2단계**: [지갑](https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/)을 연결합니다. At the moment, Kaia Safe support various wallets like [Kaia Wallet](https://docs.kaiawallet.io/), [MetaMask](../../../tutorials/connecting-metamask.mdx) wallet, etc.

이 가이드에서는 MetaMask를 사용하겠습니다. Make sure you have Kaia networks([Mainnet](../../../tutorials/connecting-metamask.mdx#connect-to-kaia-network) or [Kairos Testnet](../../../tutorials/connecting-metamask.mdx#connect-to-kaia-network)) added to your MetaMask wallet to connect successfully.

![](/img/build/tools/kaia-safe/kaia-safe-connect-wallet.png)

**Step 3:**  Once your wallet is connected, click **Create Account** and give your new Safe a **name**. 이 이름은 모든 자금을 보관하고 저장하는 다중 서명 지갑인 금고 계정과 연결됩니다.

**4단계**: 트랜잭션을 제출하고 승인할 권한이 있는 주소를 입력하여 소유자/서명자를 추가합니다. 원하는 만큼 서명자를 추가하고 언제든지 서명자를 제거하거나 교체할 수 있습니다.

**5단계**: 금고 계정의 거래를 승인하는 데 필요한 서명자 확인 횟수를 선택합니다. 기본적으로 저희 앱은 한 번의 서명자 확인을 허용합니다. 하지만 안전한 계정 보안을 위해 1보다 높은 임계값을 사용하는 것이 좋습니다. 아래와 같이 전체 소유자의 51%(예: 3명 중 2명, 5명 중 3명 등)의 임계값을 사용하는 것이 좋습니다:

![](/img/build/tools/kaia-safe/kaia-safe-create-acct.gif)

**6단계**: 검토 및 금고 배포

모든 안전 매개변수에 완전히 만족하면 금고 계정 생성을 제출하고 화면의 안내에 따라 계정 생성을 완료할 수 있습니다.

![](/img/build/tools/kaia-safe/kaia-safe-create-review.gif)

Kaia Safe 계정을 성공적으로 생성하신 것을 축하드립니다!

## 자산 추가

이 섹션에서는 안전계좌에 자산(KLAY, FT, NFT)을 추가하고 자금을 안전하게 보관하는 방법을 살펴보겠습니다.

### KAIA 입금

안전계좌에 **KLAY**를 추가하는 방법은 다음과 같습니다.

**1단계**: 계정 대시보드에서 금고 주소를 복사합니다.

![](/img/build/tools/kaia-safe/ks-deposit-copy-addr.png)

**2단계**: MetaMask 지갑을 열고 **send**를 클릭해 안전계좌로 자산을 전송합니다.

안전계좌로 자산을 전송하는 방법은 여러 가지가 있습니다. [하드웨어 지갑](https://docs.ethhub.io/using-ethereum/wallets/hardware/), [웹 지갑](https://docs.ethhub.io/using-ethereum/wallets/web/) 또는 스마트 컨트랙트에서 전송할 수 있습니다. 이 사례에서는 MetaMask라는 웹 지갑을 사용하고 있습니다.

![](/img/build/tools/kaia-safe/ks-token-send-btn.png)

**3단계**: 아래와 같이 검색 필드에 금고 주소를 붙여넣습니다.

**4단계**: **amount**을 입력하고 **next**을 클릭합니다.

![](/img/build/tools/kaia-safe/ks-token-send-details.png)

**5단계**: 트랜잭션을 확인하고 자산 대시보드를 확인합니다. MetaMask 계정에서 Kaia Safe 계정으로 이체된 금액을 확인할 수 있습니다.

![](/img/build/tools/kaia-safe/kaia-safe-klay-bal.png)

### KIP-7 입금

이제 아래 단계에 따라 KIP7(대체 가능한 토큰)을 금고에 입금하는 방법을 살펴보겠습니다.

**1단계**: 계정 대시보드에서 금고 주소를 복사합니다.

![](/img/build/tools/kaia-safe/ks-deposit-ft-copy.png)

**2단계**: Metamask Wallet을 열고 **assets** 탭으로 이동합니다.

**3단계**: 송금하고 싶은 토큰을 선택하고 **send**를 클릭합니다.

![](/img/build/tools/kaia-safe/ks-ft-send-btn.png)

**4단계**: **KLAY 입금**의 **3**, **4**, **5** 단계를 반복합니다.

![](/img/build/tools/kaia-safe/ks-ft-send-details.png)

**5단계**: 자산 대시보드에서 KIP7 토큰이 안전 계좌로 이체되는 것을 확인할 수 있습니다. 마찬가지로 모든 대체 가능한 토큰을 안전 계좌로 이체할 수 있습니다.

![](/img/build/tools/kaia-safe/ks-ft-balance.png)

### KIP-17 토큰(NFT) 입금

이제 아래 단계에 따라 KIP17(대체 불가능한 토큰)을 금고에 입금하는 방법을 살펴보겠습니다.

다양한 방법으로 NFT를 안전 계좌로 이체할 수 있습니다. 다음은 [OpenSea](https://opensea.io/about)를 사용하여 NFT를 안전계좌로 이체하는 방법의 예시입니다.

1. [OpenSea 계정](https://testnets.opensea.io/account) 프로필 페이지로 이동합니다.
2. 전송하고 싶은 NFT로 이동합니다. 카이아 네트워크에 있는 NFT(Mainnet 또는 Kairos)를 선택해야 합니다.
3. 다음 페이지에서 전송 버튼을 클릭합니다.
4. 텍스트 상자에 금고 주소를 붙여넣고 금고로 전송합니다.
5. Kaia Safe의 자산 섹션에서 OpenSea의 NFT를 찾을 수 있습니다.

![](/img/build/tools/kaia-safe/kaia-safe-trf-nft.gif)

NFT 전송에 대한 자세한 내용은 OpenSea에서 제공하는 [가이드](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea)를 참조하시기 바랍니다.

## 자산 보내기

이 섹션에서는 Kaia Safe 계정에서 KAIA와 KIP-7 토큰을 전송하는 방법을 알아보겠습니다.

### KAIA 및 KIP7 토큰 보내기 <a id="Send KAIA from Safe"></a>

**Step 1:** Click the **New Transaction** button in the side menu and select **Send tokens** to begin a new asset transfer.

![](/img/build/tools/kaia-safe/kaia-safe-init-send-token.gif)

**2단계**: 이전할 자산을 선택합니다.

- **KAIA**

> **KLAY**
> 참고: 송금 KAIA를 보내려면 **수취인 주소**와 **금액**을 추가하세요.

![](/img/build/tools/kaia-safe/kaia-safe-send-token-details.gif)

- **KIP-7 토큰**

위 이미지와 같이 자산 드롭다운에서 보내려는 토큰을 선택합니다.

> 참고: 수신자 주소와 토큰 개수를 추가하여 KIP7 토큰을 전송하세요.

**3단계**: 트랜잭션을 검토하고 제출합니다. 서명자 지갑으로 트랜잭션에 서명해야 하며, 확인 임계값에 도달하면 트랜잭션이 실행됩니다.

![](/img/build/tools/kaia-safe/kaia-safe-review-send-tokens.gif)

### NFT 보내기 <a id="Send NFTs from Safe"></a>

이 섹션에서는 Kaia Safe 계정에서 대체 불가능한 토큰을 전송하는 방법을 알아보겠습니다.

**Step 1:** Click the **New Transaction** button in the side menu and select **Send NFTs** to begin a new asset transfer.

![](/img/build/tools/kaia-safe/kaia-safe-init-send-nft.gif)

**2단계**: 이전할 자산을 선택합니다.

![](/img/build/tools/kaia-safe/kaia-safe-send-nft-details.gif)

**3단계**: 트랜잭션을 검토하고 제출합니다. 서명자 지갑으로 트랜잭션에 서명해야 하며, 확인 임계값에 도달하면 트랜잭션이 실행됩니다.

![](/img/build/tools/kaia-safe/kaia-safe-review-send-nft.gif)

## 추가 참고 사항 <a id="Points to Note"></a>

Kaia Safe 사용 시 유의해야 할 사항은 다음과 같습니다:

### 트랜잭션 수수료 <a id="Transaction Fees"></a>

자산 전송이든 컨트랙트 트랜잭션이든 Kaia Safe 트랜잭션에는 트랜잭션을 실행하는 서명자(일반적으로 필요한 서명 임계값에 도달한 마지막 서명자)가 지불하는 수수료가 발생합니다.

### 세이프 nonce <a id="Safe Nonce"></a>

보안상의 이유로 Safe를 사용한 트랜잭션은 순서대로 실행되어야 합니다. 이를 위해 각 트랜잭션이 한 번만 실행될 수 있도록 **nonce**라는 번호가 트랜잭션에 할당됩니다.

![](/img/build/tools/kaia-safe/ks-nounce.png)

특정 시간에는 nonce가 _마지막 실행된 트랜잭션 +1_ 인 트랜잭션만 실행할 수 있습니다. 더 높은 nonce를 가진 트랜잭션은 실행을 위해 대기열에 대기합니다. 따라서 트랜잭션이 완료될 때마다 대기열에 있는 다음 트랜잭션이 충분한 서명을 축적했다면 실행할 수 있게 됩니다.

![](/img/build/tools/kaia-safe/ks-pending-tx.png)

### 체인별 주소 <a id="Chain-specific addresses"></a>

체인 접두사가 있는 주소 복사 선택이 가능합니다.

- 체인 접두사가 있는 주소 복사:

![](/img/build/tools/kaia-safe/ks-chain-spec-addr.png)

위와 같이 대시보드에서 지갑에 붙여넣을 금고 주소를 복사할 때, 확인란을 클릭하여 체인 이름을 추가할지 여부를 선택할 수 있습니다. 위의 오류를 방지하려면 체크하지 않은 상태로 두는 것이 좋습니다.

![](/img/build/tools/kaia-safe/ks-chain-addr-err.png)
