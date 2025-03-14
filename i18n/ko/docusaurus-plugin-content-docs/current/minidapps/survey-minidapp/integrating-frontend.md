# Next.js 프론트엔드 애플리케이션과 스마트 계약 통합하기

이전 단계에서는 스마트 컨트랙트를 성공적으로 빌드하고 로컬 호스트에 배포했습니다. 이제 프런트엔드에서 상호작용할 차례입니다. 프런트엔드는 Next.js를 사용하며, 개인정보 보호 기능을 위한 Semaphore와 인증을 위한 Mini Dapp SDK를 통합합니다.

## 설정 및 설치 <a id="setup-installation"></a>

이미 Next.js 프론트엔드가 포함된 프로젝트 리포지토리를 복제했으면 다음 작업은 아래 명령을 사용하여 루트 디렉터리에 .env 파일을 생성하는 것입니다:

```bash
touch .env
```

> 참고: 위 명령을 실행하기 전에 루트 디렉터리에 있는지 확인하세요.

방금 만든 .env 파일에 다음을 추가합니다:

```bash
SURVEY_FACTORY_V1_CONTRACT_ADDRESS=[factory address]
NEXT_PUBLIC_SURVEY_FACTORY_V1_CONTRACT_ADDRESS=[factory address]
NODE_URL=http://localhost:8545
```

:::note
이 튜토리얼의 앞부분에서 로컬 호스트에 배포한 계약 주소로 `SURVEY_FACTORY_V1_CONTRACT_ADDRESS` 및 `NEXT_PUBLIC_SURVEY_FACTORY_V1_CONTRACT_ADDRESS`를 바꿔야 합니다.
:::

이제 앱의 핵심 기능을 살펴보겠습니다:

## 설문조사 관리 <a id="survey-management"></a>

### 1. 설문 조사 만들기 <a id="creating-survey"></a>

**인터페이스 정의:**

SurveyInfo 인터페이스는 애플리케이션 전체에서 설문조사 데이터를 처리하는 방식을 표준화하여 데이터 유형과 구조의 일관성을 보장합니다.

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

**구현 및 사용법**

**A. 데이터 가져오기**: 이 레이어는 스마트 컨트랙트와 애플리케이션 간의 통신을 관리하며, 원시 블록체인 데이터를 SurveyInfo 형식으로 변환합니다.

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

**B. 디스플레이 컴포넌트**: 상태 표시기, 진행률 추적 및 기타 대화형 요소를 포함한 설문조사 데이터의 시각적 표현을 처리하는 React 컴포넌트입니다.

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

**C. 설문조사 목록**: 설문조사 컬렉션의 구성 및 표시를 처리하며, 사용자 탐색을 개선하기 위해 _인기 주제_ 및 _종료 예정_과 같은 섹션을 제공합니다.

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

### 2. 설문조사 응답 <a id="answering-survey"></a>

**A. 인터페이스 정의**: 답변 인터페이스는 답변 데이터와 개인정보 관련 증명 정보를 모두 포함하여 설문조사 응답을 위한 표준화된 형식을 제공합니다.

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

\*\*B. 제출 기능: \*\* 이 기능은 트랜잭션 생성 및 확인을 포함한 스마트 컨트랙트와의 상호작용을 관리합니다.

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

**C. 디스플레이 컴포넌트**: 프론트엔드 컴포넌트는 양식 데이터 수집을 관리하고, 사용자 입력의 유효성을 검사하고, Web3 제공업체와 상호 작용하며, 적절한 사용자 피드백을 제공하면서 제출 프로세스를 처리합니다.

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

## 인증 및 소셜 기능 통합 <a id="authentication-social-feature-integration"></a>

### 라인 라이프 인증 <a id="line-liff-authentication"></a>

LINE 환경에서 애플리케이션이 제대로 실행되도록 하면서 안전한 사용자 인증과 LINE 사용자 프로필에 대한 액세스를 제공합니다.

**LIFF 초기화**

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

**로그인 구현**

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

### Web3 통합 <a id="web3-integration"></a>

애플리케이션 전반의 상태를 유지하면서 지갑 연결, 계정 관리, 블록체인 상호작용을 처리합니다.

**웹3 제공업체 설정**

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

**지갑 연결**

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

### 확장된 소셜 기능 <a id="extended-social-features"></a>

#### 친구 초대 시스템 <a id="friend-invitation-system"></a>

이 플랫폼은 LINE의 소셜 기능을 통합하여 사용자가 원활한 공유 경험을 통해 친구를 초대할 수 있도록 지원합니다. 이는 친구 선택을 위한 네이티브 LINE 인터페이스를 제공하는 LIFF ShareTargetPicker를 통해 구현됩니다.

**공급자 인터페이스**

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

**친구 초대 구현**

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

#### 추천 시스템 <a id="referral-system"></a>

추천 시스템은 URL 매개변수의 인코딩된 UID를 통해 사용자 초대를 추적합니다.

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

#### 메시지 템플릿 공유 <a id="share-message-template"></a>

여러 언어를 지원하는 맞춤형 초대장용 LINE 플렉스 메시지.

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

**통합 제공업체 설정**

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

#### 친구 초대 구성 요소 <a id="friend-invitation-component"></a>

이 플랫폼은 친구 초대를 위한 전용 구성 요소를 구현하여 설문조사 인터페이스 내에서 쉽게 액세스할 수 있도록 합니다.

**구성 요소 구현**

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

**설문조사 페이지와 통합**

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

## 개인정보 보호 및 보안: 세마포어 프로토콜 구현 <a id="privacy-security"></a>

분산형 설문조사 시스템에서는 사용자 개인정보를 보호하는 동시에 응답의 신뢰성을 보장하는 것이 매우 중요합니다. 세마포어 프로토콜은 몇 가지 중요한 문제를 해결하기 위해 구현되었습니다:

1. **익명 참여**: 사용자는 자신의 신원을 밝히지 않고 설문조사에 참여할 수 있는 자격이 있음을 증명해야 합니다.
2. **이중 제출 방지**: 시스템은 익명성을 유지하면서 중복 제출을 방지해야 합니다.
3. **응답 개인정보 보호**: 설문조사 답변은 기밀로 유지되어야 하며 개별 사용자를 추적할 수 없어야 합니다.
4. **확인 가능한 진위성**: 익명성이 보장되더라도 응답은 권한이 부여된 참가자의 진위 여부를 확인할 수 있어야 합니다.

세마포어 프로토콜은 영지식 증명을 사용하여 이러한 문제를 해결함으로써 사용자가 자신의 신원을 밝히지 않고도 그룹에 소속되어 있음을 증명하고 응답을 제출할 수 있도록 합니다. 이를 통해 설문조사 과정에서 개인정보 보호와 데이터 무결성을 모두 보장할 수 있습니다.

**1. 신원 생성**: 여러 요소를 사용하여 결정론적 ID를 생성하여 개인 정보를 유지하면서 고유성과 보안을 보장합니다.

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

**2. 그룹 관리**: 개인의 신원을 노출하지 않고 그룹 멤버십 운영 및 확인을 처리합니다.

**그룹 구현에 참여**

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

## 구성 요소 구조 <a id="component-structure"></a>

이 섹션에서는 컴포넌트 구조를 분석해 보겠습니다. 컴포넌트 폴더는 다음과 같은 모습이어야 합니다:

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







