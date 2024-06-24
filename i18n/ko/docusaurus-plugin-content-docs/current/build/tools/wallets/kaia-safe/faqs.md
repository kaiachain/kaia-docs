# Frequently Asked Questions

## 금고 생성 후 새 소유자를 추가할 수 있나요? <a id="Can i add new owners after creating a safe"></a>

가능합니다! 금고 계정을 생성한 후 Kaia Safe에서 금고 소유자를 관리할 수 있습니다(소유자 추가, 제거, 교체, 기존 소유자 이름 변경 등).

참고: 이 변경을 실행하려면 현재 소유자 중 한 명과 연결되어 있어야 합니다.

아래 단계에서는 Safe 계정을 만든 후 새 소유자 또는 서명자를 추가하는 방법을 설명합니다.

**Step 1:** Go to **Settings** in the sidebar menu, you ll see the **Manage Safe Account signers** card under the **Setup** section.

**2단계**: 페이지 오른쪽 하단의 **Add new owner** 버튼을 클릭합니다. 이 버튼을 클릭하면 새 창이 열립니다.

![](/img/build/tools/kaia-safe/ks-owners-change.png)

**3단계**: 새 소유자의 **name**을 입력하고 **owner's address**를 붙여넣습니다. 그런 다음 페이지 오른쪽 하단의 next 버튼을 클릭합니다.

**4단계**: 새 서명 정책을 설정합니다. 이 경우 기존 서명 정책을 변경하거나 유지할 수 있습니다. 아래 이미지에서는 트랜잭션을 확인하고 실행하려면 소유자 4명 중 2명의 서명이 필요합니다.

![](/img/build/tools/kaia-safe/ks-owners-details.png)

**5단계**: 거래를 검토하고 제출합니다.

제출하기 전에 모든 변경 사항이 올바른지 확인하세요. 그런 다음 **submit** 버튼을 클릭하여 변경 사항을 제출할 수 있습니다.

'Submit'을 클릭하면 연결된 지갑에서 변경 사항을 확인하라는 메시지가 표시됩니다. 기존 서명 정책에 따라 다른 소유자는 일반 거래와 마찬가지로 변경 사항을 확인해야 합니다.

![](/img/build/tools/kaia-safe/ks-review-owners.gif)

## 필수 서명자 확인 횟수를 변경할 수 있나요? <a id="Can i change the number of required signer confirmation"></a>

예! 아래 단계에 따라 필요한 서명자 확인 횟수를 변경할 수 있습니다. 이는 금고 계정과 관련된 거래를 확인하는 데 필요한 소유자 또는 서명자를 변경하고 싶을 수 있으므로 중요한 사항입니다.

**Step 1:** Go to **Settings** in the sidebar menu, you ll see the **Required Confirmation** card under the **Setup** section.

그러면 현재 서명 정책이 표시되며, 아래 이미지에서 볼 수 있듯이 모든 거래를 확인하려면 소유자 4명 중 2명의 서명이 필요합니다.

![](/img/build/tools/kaia-safe/ks-policy-page.png)

**2단계**: **change** 버튼을 클릭합니다.

그러면 새 서명 임계값을 선택할 수 있는 새 창이 나타납니다.

![](/img/build/tools/kaia-safe/ks-policy-change-btn.png)

**3단계**: **Submit** 버튼을 클릭합니다.

기존 서명 정책에 따라 일반 거래와 마찬가지로 다른 소유자가 변경 사항을 확인해야 한다는 점에 유의하세요.

![](/img/build/tools/kaia-safe/ks-review-policy.gif)

## 기존 금고는 어떻게 추가하나요? <a id="How do i add an existing safe"></a>

Using your exported Safe data, which contains your added Safe accounts, address book, and settings, you can easily add your Safe account.

> Note: You must have downloaded your Safe data as shown in the image below:

![](/img/build/tools/kaia-safe/ks-data-export.png)

![](/img/build/tools/kaia-safe/ks-export-data.gif)

인터페이스에 기존 안전장치를 추가하거나 로드해야 하는 경우는 다양합니다. 여기에는 다음이 포함될 수 있습니다:

- 다른 브라우저에서 금고에 액세스하려는 경우.
- 다른 사람이 소유자로 지정한 금고와 상호 작용하고 싶습니다.
- 읽기 전용 모드에서 기존 금고를 추가하려는 경우.

다음 단계에 따라 기존 금고를 추가하는 절차를 진행하겠습니다. **참고**: 서명자의 지갑이 연결되어 있는지 확인하시기 바랍니다.

**1단계**: 사이드바 메뉴에서 _Settings_으로 이동하여 _Owners_ 섹션을 선택합니다.

**Step 2:** Scroll to the **Data Import** card under the **Data** section.

![](/img/build/tools/kaia-safe/ks-data-import-details.png)

Here you can either Drag and Drop a JSON file or choose your file as seen in the image above.

**2단계**: **Add existing safe** 버튼을 클릭합니다.

![](/img/build/tools/kaia-safe/ks-data-import.png)

![](/img/build/tools/kaia-safe/ks-import-data.gif)

그러면 이제 금고 계정에 액세스할 수 있습니다.

## 일반 금고 설정

이는 금고를 설정할 때 결정해야 할 사항에 대한 몇 가지 지침을 제공하는 경향이 있습니다. 여기에는 다음이 포함될 수 있습니다:

- 소유자 수는 몇 명인가요?

- 임계값은 얼마인가요?

- 호환되는 지갑은 무엇인가요?

이 세 가지 질문에 대한 정답은 없으므로 최적의 세이프 구성은 존재하지 않습니다. 실제로 모든 것은 특정 사용 사례에 따라 달라집니다. 그럼에도 불구하고 고려해야 할 사항에 대한 몇 가지 제안을 제공하고자 노력합니다:

**소유자 수는 몇 명인가요?**

일반적으로 소유자 계정을 여러 개 만드는 것이 현명한 선택입니다. 여러 사람이 그룹으로 자금을 관리할 때는 여러 사람이 안전 계좌에 액세스하는 것이 좋습니다. 자금을 관리하는 개인은 두 개 이상의 인증 요소를 사용할 수 있도록 여러 개의 계정을 보유하는 것이 좋습니다.

**임계값은 무엇인가요?**

금고의 임계값은 거래가 성공적으로 실행되기 전에 승인해야 하는 최소 소유자 계정 수입니다. 임계값을 1보다 크게 설정하여 하나의 계정으로 거래를 실행하는 것보다 항상 최소 하나의 추가 계정이 있어야 금고 거래를 검증하고 실행할 수 있도록 하는 것이 좋습니다. 이렇게 하면 공격자가 하나의 계정에 액세스하더라도 자금을 이동할 수 없습니다.

따라서 한 명의 소유자가 계정에 액세스할 수 없게 되더라도 사용자가 금고에 있는 모든 돈을 즉시 잠그지 않고 다른 소유자가 계속 거래를 수행할 수 있으며, 예를 들어 분실된 소유자 계정을 대체할 수 있습니다. 이것이 복구 메커니즘의 역할을 한다고 주장할 수 있습니다.

**어떤 지갑과 호환되나요?**
현재 Kaia Safe는 [MetaMask](../../../tutorials/connecting-metamask)와 호환됩니다.
