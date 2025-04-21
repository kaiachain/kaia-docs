# 整合 Next.js 前端應用程式與智慧契約

在之前的步驟中，您已成功建立智慧型契約並將其部署到 localhost。 現在，是時候從前端與它互動了。 前端使用 Next.js，整合了用於隱私功能的 Semaphore 和用於驗證的 Mini Dapp SDK。

## 設定與安裝<a id="setup-installation"></a>

在克隆了包含 Next.js 前端的專案 repo 之後，接下來您要做的就是使用以下指令在根目錄中建立 .env 檔案：

```bash
touch .env
```

> 注意：執行上述指令前，請確保您在根目錄。

在您剛剛建立的 .env 檔案中，加入下列內容：

```bash
SURVEY_FACTORY_V1_CONTRACT_ADDRESS=[factory address]
NEXT_PUBLIC_SURVEY_FACTORY_V1_CONTRACT_ADDRESS=[factory address]
NODE_URL=http://localhost:8545
```

:::note
確保將 `SURVEY_FACTORY_V1_CONTRACT_ADDRESS` 和 `NEXT_PUBLIC_SURVEY_FACTORY_V1_CONTRACT_ADDRESS` 替換為您在本教程較早前部署到 localhost 的合約位址。
:::

現在讓我們看看應用程式的核心功能：

## 調查管理<a id="survey-management"></a>

### 1. 建立調查<a id="creating-survey"></a>

**介面定義：**

SurveyInfo 介面將應用程式中處理調查問卷資料的方式標準化，確保資料類型和結構的一致性。

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

**實施與使用**

**A. 資料擷取**：此層管理智慧型契約與應用程式之間的通訊，將原始區塊鏈資料轉換為 SurveyInfo 格式。

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

**B. 顯示元件**：此 React 元件處理調查資料的視覺呈現，包括狀態指標、進度追蹤及其他互動元素。

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

**C. 調查問卷列表**：處理調查問卷集的組織和顯示，具有 \* 熱門主題\* 和 \* 即將結束\* 等區段，可改善使用者導覽。

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

### 2. 回答問卷<a id="answering-survey"></a>

**A. 介面定義**：答案介面提供調查問卷回覆的標準格式，包括答案資料和隱私權相關證明資訊。

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

**B. 提交功能：** 此功能管理與智慧型契約的互動，包括交易建立與確認。

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

**C. 顯示元件**：前端元件管理表單資料收集、驗證使用者輸入、與 Web3 提供者互動，並處理提交程序，同時提供適當的使用者回饋。

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

## 驗證與社交功能整合<a id="authentication-social-feature-integration"></a>

### LINE LIFF 驗證<a id="line-liff-authentication"></a>

提供安全的使用者驗證和存取 LINE 使用者設定檔，同時確保應用程式在 LINE 環境中正常執行。

**LIFF 初始化**

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

**登入實施**

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

### Web3 整合<a id="web3-integration"></a>

處理錢包連線、帳戶管理和區塊鏈互動，同時維持整個應用程式的狀態。

**Web3 供應商設定**

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

**錢包連線**

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

### 延伸的社交功能<a id="extended-social-features"></a>

#### 朋友邀請系統<a id="friend-invitation-system"></a>

該平台結合了 LINE 的社交功能，讓使用者透過無縫的分享體驗邀請朋友。 這是透過 LIFF ShareTargetPicker 來實作的，它提供了原生的 LINE 介面來選擇朋友。

\*\* 提供者介面\*\*

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

\*\* 好友邀請實施\*\*

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

#### 轉介系統<a id="referral-system"></a>

轉介系統會透過 URL 參數中的編碼 UID 來追蹤使用者的邀請。

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

#### 分享訊息範本<a id="share-message-template"></a>

可自訂邀請函的 LINE Flex Message，支援多國語言。

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

\*\* 組合提供商設定\*\*

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

#### 朋友邀請元件<a id="friend-invitation-component"></a>

本平台實作了朋友邀請的專屬元件，使其可在調查問卷介面中輕鬆存取。

**元件實施**

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

**與調查頁面整合**\*

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

## 隱私與安全：Semaphore 通訊協定實作<a id="privacy-security"></a>

在分散式調查系統中，保護使用者隱私同時確保回覆的真實性至關重要。 Semaphore 通訊協定的實施是為了解決幾個重要的挑戰：

1. **匿名參與**：使用者需要證明自己有資格參與調查問卷，而不透露身份。
2. \*\* 防止雙重提交\*\*：系統必須防止多重提交，同時維持匿名性。
3. \*\* 回覆隱私權\*\*：調查問卷的答案應該是保密的，個人使用者無法追蹤。
4. \*\* 可驗證的真實性\*\*：儘管是匿名，但回覆必須可驗證是來自授權的參與者。

Semaphore 通訊協定使用零知識證明來解決這些挑戰，允許使用者證明他們在群組中的成員身份，並在不透露身份的情況下提交回應。 這可確保調查過程中的隱私和資料完整性。

**1. 身分建立**：使用多重因素產生確定的身分，以確保唯一性和安全性，同時維護隱私。

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

**2. 群組管理**：處理群組成員操作及驗證，而不會透露個人身分。

**加入群組實施**

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

## 元件結構<a id="component-structure"></a>

在本節中，我們將分解元件結構。 您的元件資料夾應該是這樣的：

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







