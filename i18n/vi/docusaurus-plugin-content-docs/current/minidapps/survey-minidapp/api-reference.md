# Tài liệu tham khảo API

Hệ thống API của nền tảng khảo sát (destat) xử lý các hoạt động quan trọng ở phía sau để quản lý khảo sát, bảo mật nhóm và xử lý thanh toán. Các API này đóng vai trò là cầu nối giữa ứng dụng giao diện người dùng và tương tác blockchain, đảm bảo việc tham gia khảo sát an toàn và riêng tư. Hệ thống được xây dựng xung quanh hai chức năng chính: quản lý nhóm bằng Giao thức Semaphore để bảo vệ quyền riêng tư khi tham gia khảo sát và xử lý thanh toán thông qua Cổng thông tin dApp để xử lý các giao dịch mã thông báo KAIA.

Các điểm cuối này được thiết kế để duy trì quyền riêng tư của người dùng đồng thời đảm bảo sự tham gia có thể xác minh và xử lý thanh toán an toàn trong hệ sinh thái khảo sát phi tập trung.

**Quản lý nhóm**

Các điểm cuối này quản lý quyền thành viên và xác minh nhóm khảo sát bằng Giao thức Semaphore để đảm bảo quyền riêng tư.

_LẤY /api/group/members_

Truy xuất danh sách thành viên nhóm và mã định danh nhóm cho một khảo sát cụ thể.

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

_POST /api/nhóm/tham gia_

Xử lý các yêu cầu tham gia nhóm khảo sát, xác minh danh tính và thêm thành viên.

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

**API xử lý thanh toán**

Xử lý các giao dịch thanh toán thông qua tích hợp Cổng thông tin dApp.

_POST/api/cửa hàng_

Xử lý các yêu cầu thanh toán để tạo khảo sát hoặc mua sản phẩm.

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

**Ví dụ sử dụng**

**Quản lý nhóm**

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

**Xử lý thanh toán**

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

## Phần kết luận

Hoan hô 🥳, bạn đã xây dựng thành công một ứng dụng khảo sát Mini dApp bảo vệ quyền riêng tư với Solidity, Next.js, Semaphore, Mini Dapp SDK được hỗ trợ bởi blockchain Kaia. Ứng dụng phi tập trung nhỏ này chứng minh sức mạnh của việc kết hợp blockchain với bằng chứng không kiến thức cho các trường hợp sử dụng thực tế.

Để biết thông tin chi tiết hơn về việc phát triển LINE mini dApps, hãy khám phá các tài nguyên toàn diện sau:

- [Tài liệu Kaia](https://docs.kaia.io/)
- [Các nhà phát triển LINE](https://developers.line.biz/en/docs/liff/)
- [Tài liệu Hardhat](https://hardhat.org/docs)
- [Tài liệu về Semaphore](https://docs.semaphore.pse.dev/)