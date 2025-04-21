# API 參考資料

調查問卷 (destat) 平台的 API 系統處理調查問卷管理、群組隱私和付款處理的重要後端作業。 這些 API 可作為前端應用程式與區塊鏈互動之間的橋梁，確保調查問卷參與的安全性與隱私性。 該系統主要圍繞兩個功能而建立：使用 Semaphore 協定進行群組管理，以保護調查參與者的隱私；以及透過 dApp Portal 進行付款處理，以處理 KAIA 代幣交易。

這些端點旨在維護使用者隱私，同時確保分散式調查問卷生態系統中可驗證的參與和安全的付款處理。

**集團管理**

這些端點使用 Semaphore 通訊協定管理調查群組成員資格和驗證隱私。

_GET /api/group/members_

擷取特定調查問卷的群組成員清單和群組識別碼。

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

處理加入調查群組的請求、驗證身分和新增成員。

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

\*\* 付款處理 API\*\*

透過 dApp Portal 整合處理付款交易。

_POST/api/store_

處理建立調查問卷或購買物品的付款請求。

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

\*\* 使用範例\*\*

**集團管理**

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

**付款處理**

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

## 總結

萬歲🥳，您已成功使用 Solidity、Next.js、Semaphore、Mini Dapp SDK 建置了一個由 Kaia 區塊鏈驅動的隱私保護調查 Mini dApp。 這個迷你 dApp 展示了結合區塊鏈與零知識證明的威力，適用於真實世界的使用個案。

如需更多有關開發 LINE mini dApp 的詳細資訊，請探索這些全面的資源：

- [Kaia Docs](https://docs.kaia.io/)
- [LINE Developers](https://developers.line.biz/en/docs/liff/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Semaphore Documentation](https://docs.semaphore.pse.dev/)