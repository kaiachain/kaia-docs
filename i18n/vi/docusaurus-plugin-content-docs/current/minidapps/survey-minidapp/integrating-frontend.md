# Tích hợp ứng dụng frontend Next.js với hợp đồng thông minh

Ở các bước trước, bạn đã xây dựng và triển khai thành công hợp đồng thông minh tới máy chủ cục bộ. Bây giờ đã đến lúc tương tác với nó từ giao diện. Phần giao diện sử dụng Next.js, tích hợp Semaphore để có tính năng bảo mật và Mini Dapp SDK để xác thực.

## Thiết lập & Cài đặt <a id="setup-installation"></a>

Sau khi đã sao chép kho lưu trữ dự án bao gồm cả giao diện Next.js, việc tiếp theo bạn muốn làm là tạo tệp .env trong thư mục gốc bằng cách sử dụng lệnh bên dưới:

```bash
touch .env
```

> Lưu ý: Đảm bảo bạn đang ở thư mục gốc trước khi chạy lệnh trên.

Bên trong tệp .env bạn vừa tạo, hãy thêm nội dung sau:

```bash
SURVEY_FACTORY_V1_CONTRACT_ADDRESS=[factory address]
NEXT_PUBLIC_SURVEY_FACTORY_V1_CONTRACT_ADDRESS=[factory address]
NODE_URL=http://localhost:8545
```

:::note
Đảm bảo thay thế `SURVEY_FACTORY_V1_CONTRACT_ADDRESS` và `NEXT_PUBLIC_SURVEY_FACTORY_V1_CONTRACT_ADDRESS` bằng địa chỉ hợp đồng mà bạn đã triển khai tới máy chủ cục bộ trước đó trong hướng dẫn này.
:::

Bây giờ chúng ta hãy xem xét các chức năng cốt lõi của ứng dụng:

## Quản lý khảo sát <a id="survey-management"></a>

### 1. Tạo Khảo sát <a id="creating-survey"></a>

**Định nghĩa giao diện:**

Giao diện SurveyInfo chuẩn hóa cách xử lý dữ liệu khảo sát trên toàn bộ ứng dụng, đảm bảo tính nhất quán về kiểu dữ liệu và cấu trúc.

```typescript
// types/index.ts
export interface SurveyInfo {
  title: string;          // Survey's display title
  desc: string;          // Detailed survey description
  id: string;           // Unique identifier (contract address)
  remaining: number;    // Number of responses still needed
  reward: string;       // Per-response reward amount
  respondents: number;  // Current number of participants
  daysleft: number;    // Time until expiration
  finished: boolean;   // Survey completion status
}
```

**Triển khai và sử dụng**

**MỘT. Lấy dữ liệu**: Lớp này quản lý việc giao tiếp giữa các hợp đồng thông minh và ứng dụng, chuyển đổi dữ liệu blockchain thô sang định dạng SurveyInfo.

```typescript
// backend/survey.tsx
export const getSurvey = async (address: string): Promise<SurveyInfo> => {
  const survey = getSurveyV1(address);
  const info = await survey.surveyInfo();
  return decodeSurveyInfo(info, address);
};
// Decode contract data to SurveyInfo
const decodeSurveyInfo = (info: any[], contractAddr: string): SurveyInfo => {
  return {
    title: info[0],
    desc: info[1],
    id: contractAddr,
    remaining: remainedSurvey(info[4], info[5]),
    reward: ethers.formatEther(info[3]),
    respondents: info[5],
    daysleft: daysLeft(info[7]),
    finished: info[10]
  };
};

// Helper functions
const remainedSurvey = (targetNumber: number, respondents: number) => {
  return targetNumber - respondents;
};
const daysLeft = (duration: bigint) => {
  const now = BigInt(Math.floor(Date.now() / 1000));
  return Number(duration - now) / 86400; // Convert to days
};
```

**B. Hiển thị các thành phần**: Thành phần React này xử lý việc thể hiện trực quan dữ liệu khảo sát, bao gồm các chỉ báo trạng thái, theo dõi tiến trình và các thành phần tương tác khác.

```typescript
// components/SurveyCard.tsx
interface SurveyCardProps extends SurveyInfo {}
export default function SurveyCard({
  id,
  title,
  desc,
  reward,
  remaining,
  respondents,
  daysleft,
  finished,
}: SurveyCardProps) {
  return (
    <div className="flex flex-col rounded-lg bg-violet-400">
      {/* Status Badge */}
      {finished ? (
        <div className="bg-red-400 rounded-2xl">
          <span>Finished</span>
        </div>
      ) : (
        <div className="bg-lime-400 rounded-2xl">
          <span>In Progress</span>
        </div>
      )}
      {/* Time Remaining */}
      {!finished && (
        daysleft < 1 ? (
          <div className="bg-amber-600 rounded-2xl">
            <span>{`h-${Math.floor(daysleft * 24)}`}</span>
          </div>
        ) : (
          <div className="bg-teal-500 rounded-2xl">
            <span>D-{Math.floor(daysleft)}</span>
          </div>
        )
      )}
      {/* Reward Display */}
      <span className="text-white">
        <span className="font-bold">{reward}</span> KAIA
      </span>
      {/* Survey Details */}
      <div className="px-5 pt-2">
        <h1 className="text-xl font-bold">
          {title.length > 20 ? title.substring(0, 20) + "..." : title}
        </h1>
        <p className="text-white mt-1 break-words">
          {desc.length > 65 ? desc.substring(0, 65) + "..." : desc}
        </p>
      </div>
      {/* Statistics */}
      <div className="flex justify-start">
        <div className="flex flex-col mr-8">
          <span>Remains</span>
          <span className="font-bold">{remaining}</span>
        </div>
        <div className="flex flex-col">
          <span>Respondents</span>
          <span className="font-bold">{respondents}</span>
        </div>
      </div>
    </div>
  );
}
```

**C. Danh sách khảo sát**: Xử lý việc tổ chức và hiển thị các bộ sưu tập khảo sát, có các mục như _Chủ đề nóng_ và _Sắp kết thúc_ để cải thiện khả năng điều hướng của người dùng.

```typescript
// app/[locale]/square/surveys/page.tsx
export default async function SurveysPage() {
  const data = await getAllSurveyV1s();
  // Sort and filter surveys
  const hotTopics = data
    .sort((a, b) => b.respondents - a.respondents)
    .slice(0, 10);
  const endingSoon = data
    .filter((survey) => survey.daysleft < 2);
  return (
    <div className="flex flex-col mt-5">
      {/* Hot Topics Section */}
      {hotTopics.length > 0 && (
        <div>
          <h1 className="text-3xl font-bold">Hot Topics</h1>
          <div className="flex overflow-x-scroll">
            {hotTopics.map((survey) => (
              <SurveyCard key={survey.id} {...survey} />
            ))}
          </div>
        </div>
      )}
      {/* Ending Soon Section */}
      {endingSoon.length > 0 && (
        <div>
          <h1 className="text-3xl font-bold">Ending Soon</h1>
          <div className="flex overflow-x-scroll">
            {endingSoon.map((survey) => (
              <SurveyCard key={survey.id} {...survey} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### 2. Trả lời khảo sát <a id="answering-survey"></a>

**MỘT. Định nghĩa giao diện**: Giao diện Trả lời cung cấp định dạng chuẩn cho các phản hồi khảo sát, bao gồm cả dữ liệu câu trả lời và thông tin bằng chứng liên quan đến quyền riêng tư.

```typescript
// types/index.ts
interface Answer {
  respondent: string;           // Wallet address of respondent
  answers: number[];           // Array of selected answer indices
  merkleTreeDepth: number;     // Depth of merkle tree for proof
  merkleTreeRoot: string;      // Root of merkle tree
  nullifier: string;          // Unique identifier to prevent double submission
  points: number[];          // Proof points for zero-knowledge verification
}
```

**B. Chức năng gửi:** Chức năng này quản lý tương tác với hợp đồng thông minh, bao gồm tạo và xác nhận giao dịch.

```typescript
// browser/survey.tsx

export const submitAnswer = async (
  surveyAddress: string,
  provider: Web3Provider,
  answer: Answer
) => {
  const signer = await provider.getSigner(0);
// Get contract instance
  const survey = getSurveyV1(surveyAddress, signer);
  try {
// Submit transaction
    const tx = await survey.submitAnswer(answer, { gasLimit: 5000000 });
// Wait for confirmation
    const receipt = await tx.wait();
    return receipt;
  } catch (e: any) {
    console.log("error", e);
    return e.message;
  }
};
```

**C. Hiển thị các thành phần**: Thành phần giao diện quản lý việc thu thập dữ liệu biểu mẫu, xác thực thông tin đầu vào của người dùng, tương tác với các nhà cung cấp Web3 và xử lý quy trình gửi dữ liệu trong khi cung cấp phản hồi phù hợp cho người dùng.

```typescript
// Component for submitting answers
export default function SubmitAnswerForm({
  id,
  questions,
}: {
  id: string;
  questions: Question[];
}) {
  const { provider, identity, account } = useWeb3();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 1. Validate prerequisites
      if (!provider || !account) {
        alert("Please connect wallet first!");
        return;
      }
      if (!identity) {
        alert("You need to login with LINE first!");
        return;
      }
      // 2. Collect form data
      const formData = new FormData(e.target as HTMLFormElement);
      const answers = Array.from(formData.values()).map(val => 
        parseInt(val as string)
      );
      // 3. Generate proof
      const group = new Group(members);
      const proof = await generateProof(
        identity,
        group,
        new Uint8Array(answers),
        groupId
      );
      // 4. Prepare answer object
      const answer = {
        respondent: account,
        answers,
        merkleTreeDepth: proof.merkleTreeDepth,
        merkleTreeRoot: proof.merkleTreeRoot,
        nullifier: proof.nullifier,
        points: proof.points
      };
      // 5. Submit answer
      const receipt = await submitAnswer(id, provider, answer);
      // 6. Handle success
      if (receipt.status) {
        alert("Successfully submitted!");
        router.push(`/square/surveys/${id}`);
      }
    } catch (error) {
      // Handle specific error cases
      if (error.code === 'INSUFFICIENT_FUNDS') {
        alert("Insufficient funds for transaction");
      } else if (error.code === 'ALREADY_SUBMITTED') {
        alert("You have already submitted an answer");
      } else {
        alert("Failed to submit: " + error.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

## Xác thực và Tích hợp Tính năng Xã hội <a id="authentication-social-feature-integration"></a>

### Xác thực LINE LIFF <a id="line-liff-authentication"></a>

Cung cấp xác thực người dùng an toàn và quyền truy cập vào hồ sơ người dùng LINE đồng thời đảm bảo ứng dụng chạy đúng trong môi trường LINE.

**Khởi tạo LIFF**

```typescript
// context/LiffProvider.tsx
export const LiffProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [liffObject, setLiffObject] = useState<typeof liff | null>(null);
  const [liffError, setLiffError] = useState(null);
  useEffect(() => {
    // Check if running in LINE environment
    if (liff.isInClient()) {
      liff
        .init({ 
          liffId: process.env.NEXT_PUBLIC_LIFF_ID as string 
        })
        .then(() => {
          console.log("LIFF initialization succeeded");
          setLiffObject(liff);
        })
        .catch((error: any) => {
          console.error("LIFF initialization failed:", error);
          setLiffError(error.toString());
        });
    }
  }, []);
  return (
    <LiffContext.Provider value={{ liffObject, liffError }}>
      {children}
    </LiffContext.Provider>
  );
};
```

**Triển khai đăng nhập**

```typescript
// components/buttons/LineLoginBtn.tsx
export default function LineLoginBtn() {
  const { liffObject } = useLiff();
  const loginRequest = async () => {
    if (!liffObject) {
      return;
    }
    const login = await liffObject.login();
    if (!login) {
      return;
    }
  };
  return (
    <button
      onClick={() => {
        loginRequest();
      }}
    >
      LINE Login
    </button>
  );
}
```

### Tích hợp Web3 <a id="web3-integration"></a>

Xử lý kết nối ví, quản lý tài khoản và tương tác blockchain trong khi vẫn duy trì trạng thái trên toàn bộ ứng dụng.

**Cài đặt nhà cung cấp Web3**

```typescript
// context/Web3Provider.tsx
export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { liffObject, dappPortalSDK } = useLiff();
  // Initialize from session storage
  useEffect(() => {
    const storedAccount = sessionStorage.getItem(WALLET_ACCOUNT_KEY);
    const storedIsConnected = sessionStorage.getItem(WALLET_IS_CONNECTED_KEY);
    
    if (storedAccount) {
      setAccount(storedAccount);
    }
    if (storedIsConnected) {
      setIsConnected(true);
    }
  }, []);
  // Persist state changes
  useEffect(() => {
    if (account) {
      sessionStorage.setItem(WALLET_ACCOUNT_KEY, account);
    } else {
      sessionStorage.removeItem(WALLET_ACCOUNT_KEY);
    }
  }, [account]);
  return (
    <Web3Context.Provider value={{ provider, account, isConnected }}>
      {children}
    </Web3Context.Provider>
  );
};
```

**Kết nối ví**

```typescript
const connectWallet = async () => {
  try {
    // 1. Get wallet provider from Mini Dapp SDK
    const provider = dappPortalSDK?.getWalletProvider();
    // 2. Create Web3 provider instance
  const web3Provider = new w3(provider);
    // 3. Request account access
    const accounts = await web3Provider.send("kaia_requestAccounts", []);
    
    // 4. Get payment provider for transactions
    const pProvider = dappPortalSDK?.getPaymentProvider();
     setPProvider(pProvider as PaymentProvider);
    // 5. Create identity if necessary
    if (
      provider &&
      liffObject &&
      (provider.getWalletType() === WalletType.Liff ||
        provider.getWalletType() === WalletType.Web) &&
      liffObject.isLoggedIn()
    ) {
      const identity = await createIdentity(
        web3Provider,
        accounts[0],
        liffObject
      );
      setIdentity(identity);
    }
    // 6. Update state
    setProvider(web3Provider);
    setAccount(accounts[0]);
    setIsConnected(true);
    
  } catch (error) {
    console.error("Wallet connection error:", error);
    throw error;
  }
};
```

### Tính năng xã hội mở rộng <a id="extended-social-features"></a>

#### Hệ thống mời bạn bè <a id="friend-invitation-system"></a>

Nền tảng này kết hợp các tính năng xã hội của LINE để cho phép người dùng mời bạn bè thông qua trải nghiệm chia sẻ liền mạch. Tính năng này được triển khai thông qua LIFF ShareTargetPicker, cung cấp giao diện LINE gốc để chọn bạn bè.

**Giao diện nhà cung cấp**

```typescript
interface LiffContextType {
  // Core authentication properties
  liffObject: any;
  liffError: any;
  
  // Social feature properties
  inviteFriends: () => void;
  encodedUID: string | null;
  loading: boolean;
}
```

**Triển khai lời mời kết bạn**

```typescript
const inviteFriends = async () => {
  // 1. Check authentication
  if (liff && !liff.isLoggedIn()) {
    liff.login();
    return;
  }
  // 2. Generate invitation code
  let encodedUID;
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/invite/encode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: liff.getAccessToken(),
        }),
      }
    );
    encodedUID = result.encodedUID;
  } catch (error) {
    alert("Error when encoding user ID");
    return;
  }
  // 3. Share with friends
  const msg = getFlexMessage(locale, encodedUID);
  if (liff.isApiAvailable("shareTargetPicker")) {
    await liff.shareTargetPicker([msg]);
  }
};
```

#### Hệ thống giới thiệu <a id="referral-system"></a>

Hệ thống giới thiệu theo dõi lời mời của người dùng thông qua UID được mã hóa trong các tham số URL.

```typescript
// Referral check in LiffProvider
useEffect(() => {
  liff.init({
    liffId: process.env.NEXT_PUBLIC_LIFF_ID as string,
  }).then(() => {
    // Parse referral code if present
    if (window.location.search !== "") {
      const encodedUID = parseEncodedUID(window.location.search);
      setEncodedUID(encodedUID);
      // Handle referral logic
    }
  });
}, []);
```

#### Chia sẻ mẫu tin nhắn <a id="share-message-template"></a>

Tin nhắn LINE Flex có thể tùy chỉnh cho lời mời, hỗ trợ nhiều ngôn ngữ.

```typescript
const getFlexMessage = (locale: string, encodedUID: string): LiffMessage => {
  const message = inviteMessages[locale] || inviteMessages["en"];
  return {
    type: "flex",
    altText: message.altText,
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "your-image-url",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: encodedUID,
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: message.contentsText2,
            wrap: true,
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            style: "primary",
            action: {
              type: "uri",
              label: message.footerLabel,
              uri: `https://liff.line.me/your-liff-id?encodedUID=${encodedUID}`,
            },
          },
        ],
      },
    },
  };
};
```

**Thiết lập nhà cung cấp kết hợp**

```typescript
export const LiffProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Authentication states
  const [liffObject, setLiffObject] = useState<typeof liff | null>(null);
  const [liffError, setLiffError] = useState(null);
  
  // Social feature states
  const [encodedUID, setEncodedUID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Initialize everything
  useEffect(() => {
    initializeLIFF();
    initializeDappPortal();
    checkForReferral();
  }, []);
  return (
    <LiffContext.Provider value={{
      // Auth values
      liffObject,
      liffError,
      // Social features
      inviteFriends,
      encodedUID,
      loading
    }}>
      {children}
    </LiffContext.Provider>
  );
};
```

#### Thành phần lời mời kết bạn <a id="friend-invitation-component"></a>

Nền tảng này triển khai một thành phần chuyên dụng cho lời mời kết bạn, giúp bạn dễ dàng truy cập vào thành phần này trong giao diện khảo sát.

**Triển khai thành phần**

```typescript
// components/Friends.tsx
"use client";
export default function Friends() {
  const params = useParams();
  const { liffObject, loading, inviteFriends } = useLiff();
  const locale = params.locale as keyof typeof inviteMessages;
  const messages = inviteMessages[locale] || inviteMessages.en;
  // Environment and loading checks
  if (loading) return <div></div>;
  if (liffObject && !liffObject.isInClient()) return <div></div>;
  return (
    <div className="flex flex-row items-center justify-center mb-3">
      <label htmlFor="inviteButton" className="text-xl font-bold">
        {messages.inviteMessage}
      </label>
      <button
        id="inviteButton"
        onClick={() => inviteFriends()}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 ml-2 rounded"
      >
        {messages.invite}
      </button>
    </div>
  );
}
```

**Tích hợp với Trang khảo sát**

```typescript
// app/[locale]/square/surveys/page.tsx
export default async function SurveysPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const data = await getAllSurveyV1s();
  const { locale } = await params;
  // Sort surveys for different sections
  const hotTopics = data
    .sort((a, b) => b.respondents - a.respondents)
    .slice(0, 10);
  const endingSoon = data.filter((survey) => survey.daysleft < 2);
  return (
    <div className="flex flex-col mt-5">
      {/* Friend Invitation Component */}
      <Friends />
      {/* Survey Sections */}
      {hotTopics.length !== 0 && (
        // Hot Topics section
      )}
      {endingSoon.length !== 0 && (
        // Ending Soon section
      )}
      {/* All Surveys */}
      <div className="flex flex-wrap gap-5 justify-center mt-5 mb-10">
        {data.map((survey) => (
          <SurveyCard
            key={survey.id}
            {...survey}
          />
        ))}
      </div>
    </div>
  );
}
```

## Quyền riêng tư & Bảo mật: Triển khai Giao thức Semaphore <a id="privacy-security"></a>

Trong các hệ thống khảo sát phi tập trung, việc bảo vệ quyền riêng tư của người dùng đồng thời đảm bảo tính xác thực của phản hồi là rất quan trọng. Giao thức Semaphore được triển khai để giải quyết một số thách thức quan trọng:

1. **Tham gia ẩn danh**: Người dùng cần chứng minh rằng họ đủ điều kiện để tham gia khảo sát mà không cần tiết lộ danh tính.
2. **Ngăn chặn nộp bài trùng**: Hệ thống phải ngăn chặn việc nộp bài trùng nhiều lần trong khi vẫn đảm bảo tính ẩn danh.
3. **Quyền riêng tư của phản hồi**: Câu trả lời khảo sát phải được bảo mật và không thể theo dõi người dùng.
4. **Tính xác thực có thể xác minh**: Mặc dù ẩn danh, phản hồi phải có thể xác minh được từ những người tham gia được ủy quyền.

Giao thức Semaphore giải quyết những thách thức này bằng cách sử dụng bằng chứng không kiến thức, cho phép người dùng chứng minh tư cách thành viên của họ trong một nhóm và gửi phản hồi mà không tiết lộ danh tính. Điều này đảm bảo tính riêng tư và tính toàn vẹn của dữ liệu trong quá trình khảo sát.

**1. Tạo danh tính**: Tạo danh tính xác định bằng nhiều yếu tố để đảm bảo tính duy nhất và bảo mật trong khi vẫn duy trì quyền riêng tư.

```typescript
//.. browser/survey.tsx
export const createIdentity = async (
  web3: Web3Provider,
  address: string,
  liffObject: typeof liff
) => {
// 1. Get LINE user identity
  const idToken = liffObject.getDecodedIDToken();
  if (!idToken) {
    throw Error("Failed to get ID token");
  }
  try {
// 2. Extract unique LINE user ID
    const uid = idToken.sub;
// 3. Create deterministic message
    const msg = "hello destat" + uid + address;
    const hexMsg = ethers.hexlify(ethers.toUtf8Bytes(msg));
// 4. Get wallet signature as entropy source
    // const secret = await web3.send("kaia_signLegacy", [address, hexMsg]);
    const secret = await web3.send("personal_sign", [hexMsg, address]);
// 5. Create Semaphore identity
    return new Identity(secret);
  } catch (e) {
    console.log("error", e);
    throw Error("Failed to create identity");
  }
};
```

**2. Quản lý nhóm**: Xử lý các hoạt động xác minh và quản lý thành viên nhóm mà không tiết lộ danh tính cá nhân.

**Tham gia triển khai nhóm**

```typescript
//..backend/survey.tsx
	
export const joinGroup = async (
  surveyAddress: string,
  commitment: bigint,
  signature: ethers.SignatureLike,
  idToken: string,
  address: string
) => {
// 1. Get group contract
  const survey = getManagerConnectedSurveyV1(surveyAddress);
	
// 2. Verify LINE token
  const profile = await isValidToken(idToken);
// 3. Verify wallet ownership
  await verifyLineIdentity(profile.userId, address, signature);
// 4. Add member to group
  const tx = await survey.joinGroup(commitment);
// 5. Verify successful addition
  const receipt = await tx.wait();
  return receipt;
};
```

## Cấu trúc thành phần <a id="component-structure"></a>

Trong phần này, chúng ta sẽ phân tích cấu trúc thành phần. Thư mục thành phần của bạn sẽ trông như thế này:

```bash
buttons/
  ├── dropdown.tsx       -> Handles expandable menu navigation
  ├── LineLoginBtn.tsx   -> Manages LINE authentication flow
  └── WalletBtn.tsx     -> Handles Web3 wallet connections
common/
  ├── index.tsx      -> Exports shared components and utilities
AnswerChart.tsx       -> Displays bar chart of survey responses
AnswerPie.tsx           -> Shows circular visualization of responses
Footer.tsx                  -> Shows app footer content
Header.tsx                -> Contains app header and main navigation
ItemCard.tsx             -> Displays purchasable items with pricing
LinearChart.tsx        -> Shows linear progress indicators
Nav.tsx                      -> Provides main app navigation structure
SubmitAnswerForm  -> Handles survey response submission
SurveyCard.tsx         -> Displays survey information and status
```







