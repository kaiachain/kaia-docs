# Integrating a Next.js frontend application with smart contract

In the previous steps, you successfully built and deployed the smart contract to a localhost. Now, it's time to interact with it from the frontend. The frontend uses Next.js, integrates Semaphore for privacy features and the Mini Dapp SDK for authentication.

## Setup & Installation <a id="setup-installation"></a>

Having already cloned the project repo inclusive of Next.js frontend, the next thing you want to do is to create a .env file in the root directory by using the command below:

```bash
touch .env
```

> Note: Ensure you are in the root directory before running the command above.

Inside the .env file you just created, add the following:

```bash
SURVEY_FACTORY_V1_CONTRACT_ADDRESS=[factory address]
NEXT_PUBLIC_SURVEY_FACTORY_V1_CONTRACT_ADDRESS=[factory address]
NODE_URL=http://localhost:8545
```

:::note
Make sure to Replace `SURVEY_FACTORY_V1_CONTRACT_ADDRESS`  and `NEXT_PUBLIC_SURVEY_FACTORY_V1_CONTRACT_ADDRESS` with the contract address you deployed to localhost earlier in this tutorial.
:::

Now lets take a look at the core functionalities of the app:

## Survey Management <a id="survey-management"></a>

### 1. Creating Survey <a id="creating-survey"></a>

**Interface Definition:**

The SurveyInfo interface standardizes how survey data is handled across the application, ensuring consistency in data types and structure.

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
**Implementation and Usage**

**A. Data Fetching**: This layer manages the communication between the smart contracts and the application, converting raw blockchain data into the SurveyInfo format.

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
 
**B. Display components**: This React component handles the visual representation of survey data, including status indicators, progress tracking, and other interactive elements.

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
**C. Survey Listing**: Handles the organization and display of survey collections, featuring sections like *Hot Topics* and *Ending Soon* to improve user navigation.

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

### 2. Answering Survey <a id="answering-survey"></a>

**A. Interface Definition**: The Answer interface provides a standardized format for survey responses, including both the answer data and privacy-related proof information.

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

**B. Submission Function:** This function manages the interaction with the smart contract, including transaction creation and confirmation.

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

**C. Display components**: The frontend component manages form data collection, validates user input, interacts with Web3 providers, and handles the submission process while providing appropriate user feedback.

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

## Authentication and Social Features Integration <a id="authentication-social-feature-integration"></a>

### LINE LIFF Authentication <a id="line-liff-authentication"></a>

Provides secure user authentication and access to LINE user profiles while ensuring the application runs properly in the LINE environment.

**LIFF Initialization**

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

**Login Implementation**

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

### Web3 Integration <a id="web3-integration"></a>

Handles wallet connection, account management, and blockchain interactions while maintaining state across the application.

**Web3 Provider Setup**

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

**Wallet Connection**

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

### Extended Social Features <a id="extended-social-features"></a>

#### Friend Invitation System <a id="friend-invitation-system"></a>

The platform incorporates LINE's social features to enable users to invite friends through a seamless sharing experience. This is implemented through the LIFF ShareTargetPicker, which provides a native LINE interface for friend selection.

**Provider Interface**

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

**Friend Invitation Implementation**

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

#### Referral System <a id="referral-system"></a>

The referral system tracks user invitations through encoded UIDs in the URL parameters.

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

#### Share Message Template <a id="share-message-template"></a>

Customizable LINE Flex Message for invitations, supporting multiple languages.

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

**Combined Provider Setup**

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

#### Friend Invitation Component <a id="friend-invitation-component"></a>

The platform implements a dedicated component for friend invitations, making it easily accessible within the survey interface.

**Component Implementation**

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

**Integration with Survey Page**

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

## Privacy & Security: Semaphore Protocol Implementation <a id="privacy-security"></a>

In decentralized survey systems, protecting user privacy while ensuring response authenticity is crucial. The Semaphore Protocol is implemented to solve several critical challenges:

1. **Anonymous Participation**: Users need to prove they're eligible to participate in surveys without revealing their identity.
2. **Double-Submission Prevention**: The system must prevent multiple submissions while maintaining anonymity.
3. **Response Privacy**: Survey answers should be confidential and untraceable to individual users.
4. **Verifiable Authenticity**: Despite anonymity, responses must be verifiably from authorized participants.

The Semaphore Protocol addresses these challenges by using zero-knowledge proofs, allowing users to prove their membership in a group and submit responses without revealing their identity. This ensures both privacy and data integrity in the survey process.

**1. Identity Creation**: Generates a deterministic identity using multiple factors to ensure uniqueness and security while maintaining privacy.

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

**2. Group Management**: Handles group membership operations and verification without revealing individual identities.
	
**Join Group Implementation**

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

## Component Structure <a id="component-structure"></a>

In this section, we will do a breakdown of the components structure. Your components folder should look like this:

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







