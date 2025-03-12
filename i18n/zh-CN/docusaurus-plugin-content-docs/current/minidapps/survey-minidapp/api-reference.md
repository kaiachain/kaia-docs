# 应用程序接口参考

调查（destat）平台的应用程序接口系统可处理调查管理、小组隐私和支付处理等关键的后台操作。 这些应用程序接口是前端应用程序和区块链交互之间的桥梁，可确保安全、私密地参与调查。 该系统围绕两个主要功能构建：使用 Semaphore 协议进行小组管理，以保护调查参与的隐私；通过 dApp 门户处理 KAIA 代币交易的支付处理。

这些终端旨在维护用户隐私，同时确保分散式调查生态系统中可验证的参与和安全的支付处理。

**集团管理**

这些端点使用 Semaphore 协议管理调查组成员资格并进行验证，以保护隐私。

_GET /api/group/members_

检索特定调查表的小组成员名单和小组标识符。

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

处理加入调查小组的请求，验证身份并添加成员。

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

**支付处理应用程序接口**

通过 dApp 门户集成处理支付交易。

_POST/api/store_

处理创建调查表或购买物品的付款申请。

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

**使用示例**

**集团管理**

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

**付款处理**

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

## 结论

万岁🥳，您已经使用 Solidity、Next.js、Semaphore 和由 Kaia 区块链驱动的 Mini Dapp SDK 成功构建了一个隐私保护调查迷你应用程序。 这款迷你 dApp 展示了区块链与零知识证明相结合在实际应用案例中的威力。

有关开发 LINE mini dApp 的更多详细信息，请浏览这些综合资源：

- [Kaia Docs](https://docs.kaia.io/)
- [LINE Developers](https://developers.line.biz/en/docs/liff/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Semaphore Documentation](https://docs.semaphore.pse.dev/)