# APIリファレンス

アンケート（destat）プラットフォームのAPIシステムは、アンケート管理、グループプライバシー、支払い処理などの重要なバックエンド業務を処理する。 これらのAPIは、フロントエンドのアプリケーションとブロックチェーンとのやり取りを橋渡しする役割を果たし、安全でプライベートなアンケートへの参加を保証する。 セマフォ・プロトコルを利用したグループ管理によるプライバシー保護と、dAppポータルを利用したKAIAトークンの決済処理です。

これらのエンドポイントは、分散型アンケートのエコシステムにおいて、検証可能な参加と安全な支払い処理を保証しながら、ユーザーのプライバシーを維持するように設計されています。

\*\*グループ経営

これらのエンドポイントは、プライバシーのためにセマフォプロトコルを使用して、調査グループのメンバーシップと検証を管理する。

_GET /api/group/members_

特定のアンケートのグループメンバーのリストとグループ識別子を取得します。

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

アンケートグループへの参加リクエストを処理し、身元を確認し、メンバーを追加します。

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

\*\*支払い処理API

dAppポータルとの連携による決済処理を行います。

_POST/api/store_

アンケート作成または商品購入のための支払い請求を処理する。

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

\*\*使用例

\*\*グループ経営

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

\*\*支払い処理

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

## 結論

万歳🥳、Solidity、Next.js、Semaphore、KaiaブロックチェーンによるMini Dapp SDKを使って、プライバシーを保護するMini dAppの構築に成功しました。 このミニdAppは、ブロックチェーンとゼロ知識証明を組み合わせることで、実際のユースケースに対応できることを実証している。

LINE mini dAppsの開発に関するより詳細な情報については、以下の包括的なリソースをご覧ください：

- [カイア・ドックス](https://docs.kaia.io/)
- [LINE Developers](https://developers.line.biz/en/docs/liff/)
- [ハードハット・ドキュメント](https://hardhat.org/docs)
- [セマフォ・ドキュメント](https://docs.semaphore.pse.dev/)