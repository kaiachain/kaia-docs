# API Reference

The survey (destat) platform's API system handles critical backend operations for survey management, group privacy, and payment processing. These APIs serve as the bridge between the frontend application and blockchain interactions, ensuring secure and private survey participation. The system is built around two main functionalities: group management using the Semaphore Protocol for privacy-preserving survey participation, and payment processing through the dApp Portal for handling KAIA token transactions. 

These endpoints are designed to maintain user privacy while ensuring verifiable participation and secure payment handling in the decentralized survey ecosystem.

**Group Management**

These endpoints manage survey group membership and verification using the Semaphore Protocol for privacy.

*GET /api/group/members*

Retrieves the list of group members and the group identifier for a specific survey.

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

*POST /api/group/join*

Handles requests to join a survey group, verifying identity and adding members.

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

**Payment Processing API**

Handles payment transactions through the dApp Portal integration.

*POST/api/store*

Processes payment requests for survey creation or item purchases.

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

**Usage Examples**

**Group Management**

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

**Payment Processing**

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

## Conclusion

Hurray 🥳, you have successfully built a privacy-preserving survey Mini dApp with Solidity, Next.js, Semaphore, Mini Dapp SDK powered by the Kaia blockchain. This mini dApp demonstrates the power of combining blockchain with zero-knowledge proofs for real-world use cases.

For more detailed information on developing LINE mini dApps, explore these comprehensive resources:

- [Kaia Docs](https://docs.kaia.io/)
- [LINE Developers](https://developers.line.biz/en/docs/liff/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Semaphore Documentation](https://docs.semaphore.pse.dev/)