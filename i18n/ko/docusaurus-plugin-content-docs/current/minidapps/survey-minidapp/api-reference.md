# API 참조

설문조사(데스탯) 플랫폼의 API 시스템은 설문조사 관리, 그룹 개인정보 보호 및 결제 처리를 위한 중요한 백엔드 작업을 처리합니다. 이러한 API는 프론트엔드 애플리케이션과 블록체인 상호작용을 연결하는 가교 역할을 하며, 안전한 비공개 설문조사 참여를 보장합니다. 이 시스템은 두 가지 주요 기능을 중심으로 구축되었습니다: 개인 정보를 보호하는 설문조사 참여를 위한 세마포어 프로토콜을 사용한 그룹 관리와 KAIA 토큰 거래를 처리하기 위한 디앱 포털을 통한 결제 처리입니다.

이러한 엔드포인트는 분산형 설문조사 생태계에서 검증 가능한 참여와 안전한 결제 처리를 보장하면서 사용자 개인정보를 유지하도록 설계되었습니다.

**그룹 관리**

이러한 엔드포인트는 개인정보 보호를 위해 세마포어 프로토콜을 사용하여 설문조사 그룹 멤버십 및 인증을 관리합니다.

_GET /api/group/members_

특정 설문조사의 그룹 구성원 목록과 그룹 식별자를 검색합니다.

```typescript
//.. api/group/members
export async function GET(req: NextRequest) {
  try {
// 1. Extract survey ID
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      throw Error("Invalid contract address");
    }
// 2. Get group information
    const groupId = await getGroupId(id);
    const members = await getGroupMembers(groupId);
// 3. Return response
    return NextResponse.json(
      { data: JSON.stringify({ members, groupId }) },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: JSON.stringify(e) }, { status: 400 });
  }
}
```

_POST /api/group/join_

설문조사 그룹 가입 요청, 본인 확인 및 구성원 추가를 처리합니다.

```typescript
// Request Interface
interface JoinGroupData {
  id: string;                    // Survey contract address
  commitment: bigint;            // Identity commitment
  signature: ethers.SignatureLike; // Wallet signature
  idToken: string;              // LINE authentication token
  account: string;              // Wallet address
}
// Implementation
export async function POST(req: NextRequest) {
  try {
    const data: JoinGroupData = await req.json();
    // 1. Join group with verification
    const receipt = await joinGroup(
      data.id,
      BigInt(data.commitment),
      data.signature,
      data.idToken,
      data.account
    );
    // 2. Return success response
    return NextResponse.json(
      { data: JSON.stringify(receipt) },
      { status: 200 }
    );
  } catch (e) {
    console.log(JSON.stringify(e));
    return NextResponse.json(
      { error: JSON.stringify(e) }, 
      { status: 400 }
    );
  }
}
```

**결제 처리 API**

dApp 포털 통합을 통해 결제 거래를 처리합니다.

_POST/api/store_

설문조사 생성 또는 아이템 구매에 대한 결제 요청을 처리합니다.

```typescript
interface buyReq {
  buyerAddress: string;
  itemIdentifier: string;
  name: string;
  imageUrl: string;
  pgType: string;
  currencyCode: string;
  price: string;
  testMode: boolean;
}
export async function POST(req: NextRequest) {
  try {
    const data: buyReq = await req.json();
    const result = await fetch(
      "https://payment.dappportal.io/api/payment-v1/payment/create",
      {
        method: "POST",
        headers: {
          "X-Client-Id": process.env.DAPP_PORTAL_CLIENT_ID as string,
          "X-Client-Secret": process.env.PAYMENT_SECRET as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerDappPortalAddress: data.buyerAddress,
          pgType: data.pgType,
          currencyCode: data.currencyCode,
          price: data.price,
          confirmCallbackUrl: confirmUrl,
          lockUrl: lockUrl,
          unlockUrl: unlockUrl,
          items: [
            {
              itemIdentifier: data.itemIdentifier,
              name: data.name,
              imageUrl: data.imageUrl,
              price: data.price,
              currencyCode: data.currencyCode,
            },
          ],
          testMode: data.testMode,
        }),
      }
    );
    const pId = (await result.json()).id;
    return NextResponse.json({ pId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Payment is failed" }, { status: 400 });
  }
}
```

사용 예\*\* \*\*사용 예

**그룹 관리**

```typescript
// Fetching group
  const getGroup = async (id: string) => {
    const result = await fetch(`${API_URL}/api/group/members?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status !== 200) {
      console.log("Failed to fetch group members");
      return { members: [], groupId: "" };
    }
    const jsonResult = await result.json();
    return JSON.parse(jsonResult.data);
  };
// Joining a group
  const joinRequest = async () => {
    if (!provider) {
      alert("Please connect the wallet first!");
      return;
    }
    if (!identity || !liff.isInClient()) {
      alert("You need to access with LINE if you want to join the group");
      return;
    }
    const idToken = liffObject.getAccessToken();
    const result = await fetch(`${API_URL}/api/group/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        commitment: identity.commitment.toString(),
        signature: identity.privateKey,
        idToken,
        account,
      }),
    });
    if (result.status === 200) {
      const receipt = await result.json();
      console.log(receipt);
      setIsJoining(true);
      do {
        const { members } = await getGroup(id);
        if (members.includes(identity.commitment.toString())) {
          setIsJoining(false);
          break;
        }
      } while (true);
      alert("Successfully joined the group!");
    } else if (result.status === 500) {
      const error = JSON.parse((await result.json()).error);
      console.log(error);
    } else {
      const error = JSON.parse((await result.json()).error);
      alert(error.shortMessage + ": " + error.reason);
    }
  };
```

**결제 처리**

```typescript
// Creating a payment
  const hostPayment = async () => {
    console.log(provider, account, pProvider);
    if (!pProvider || !account || !provider) return;
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/store`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            buyerAddress: account,
            itemIdentifier: Props.itemIdentifier,
            name: Props.name,
            imageUrl: Props.imageUrl,
            pgType: "CRYPTO",
            currencyCode: "KAIA",
            price: Props.price,
            testMode: true,
          }),
        }
      );
      const data = await result.json();
      pProvider.startPayment(data.pId).then(() => {
        alert("Payment is success");
      });
    } catch (error) {
      alert("Payment is failed");
    }
  };
```

## 결론

만세 🥳, 솔리디티, Next.js, 세마포어, 카이아 블록체인 기반 미니 댑 SDK로 개인 정보를 보호하는 설문조사 미니 댑을 성공적으로 구축했습니다. 이 미니 디앱은 실제 사용 사례를 위해 블록체인을 영지식 증명과 결합하는 힘을 보여줍니다.

LINE 미니 디앱 개발에 대한 자세한 내용은 다음 종합 리소스를 참조하세요:

- [카이아 문서](https://docs.kaia.io/)
- [LINE 개발자](https://developers.line.biz/en/docs/liff/)
- [하드햇 문서](https://hardhat.org/docs)
- [세마포어 문서](https://docs.semaphore.pse.dev/)