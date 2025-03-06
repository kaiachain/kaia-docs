# WebGL 빌드 설정

이 섹션에서는 웹용 디앱을 구성해 보겠습니다! 이렇게 하면 Web3 호환성을 위해 Unity를 구성하고 Kaia 통합을 위한 커스텀 템플릿을 생성합니다.

## 1단계: WebGL 플랫폼으로 전환

1. 파일 → 빌드 설정으로 이동합니다.
2. WebGL을 선택하고 "플랫폼 전환"을 클릭합니다.

:::note
처음 전환하는 경우 몇 분 정도 걸릴 수 있습니다.
:::

![](/img/minidapps/unity-minidapp/ui-webgl-switch.png)

## 2단계: 사용자 지정 WebGL 템플릿 만들기

Web3 기능을 통합하려면 사용자 지정 템플릿이 필요합니다. 폴더 구조는 다음과 같습니다:

```code
Assets/
└── WebGLTemplates/
    └── KaiaTemplate/
        ├── index.html
        └── scripts/
            └── dapp_portal_sdk.js
```

:::info

\*\*왜 맞춤 템플릿인가?

기본 Unity 템플릿에는 Web3 지원이 포함되어 있지 않습니다. 사용자 지정 템플릿이 제공됩니다:

- 필요한 Web3 라이브러리를 로드합니다.
- Kaia 지갑 통합을 활성화합니다.
- 블록체인 상호작용을 올바르게 처리하세요.
 :::

## 3단계: index.html 설정

아래 코드를 복사하여 `index.html` 파일에 붙여넣습니다:

```
<!DOCTYPE html>
<html lang="en-us">
 <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Unity WebGL Player</title>
   <script src="scripts/dapp_portal_sdk.js"></script>
   <style>
     body { margin: 0; padding: 0; }
     #unity-container { width: 100%; height: 100%; position: absolute; }
     #unity-canvas { width: 100%; height: 100%; background: #231F20; }
     #unity-loading-bar { display: none; }
     #unity-progress-bar-empty { width: 141px; height: 18px; margin-top: 10px; background: url('Build/minidapp.progress-bar-empty-dark.png') no-repeat center; }
     #unity-progress-bar-full { width: 0%; height: 18px; margin-top: 10px; background: url('Build/minidapp.progress-bar-full-dark.png') no-repeat center; }
   </style>
 </head>
 <body>
   <div id="unity-container">
     <canvas id="unity-canvas"></canvas>
     <div id="unity-loading-bar">
       <div id="unity-progress-bar-empty">
         <div id="unity-progress-bar-full"></div>
       </div>
     </div>
   </div>
   <script src="Build/minidapp.loader.js"></script>
   <script>
     var sdk = null;
     var connectedAddress = null;
     var myGameInstance = null;

     var Module = {
       onRuntimeInitialized: function() {
         console.log("Runtime initialized");
       },
       env: {
         MintToken: function(amount) {
           window.MintToken(amount);
         },
         GetBalance: function() {
           window.GetBalance();
         },
         ConnectWallet: function() {
           window.ConnectWallet();
         },
         GetConnectedAddress: function() {
           var address = window.GetConnectedAddress();
           var bufferSize = lengthBytesUTF8(address) + 1;
           var buffer = _malloc(bufferSize);
           stringToUTF8(address, buffer, bufferSize);
           return buffer;
         }
       }
     };

     async function initializeSDK() {
       try {
         sdk = await DappPortalSDK.init({
           clientId: 'PASTE CLIENT ID',
           chainId: '1001'
         });
         console.log("SDK initialized");
         return true;
       } catch (error) {
         console.error("SDK init error:", error);
         return false;
       }
     }

     window.ConnectWallet = async function() {
       try {
         if (!sdk) {
           const initialized = await initializeSDK();
           if (!initialized) return null;
         }

         const provider = sdk.getWalletProvider();
         const accounts = await provider.request({ method: 'kaia_requestAccounts' });

         if (accounts && accounts.length > 0) {
           connectedAddress = accounts[0];
           myGameInstance.SendMessage('Web3Manager', 'OnWalletConnected', connectedAddress);
         }
       } catch (error) {
         myGameInstance.SendMessage('Web3Manager', 'OnWalletError', error.message);
       }
     }

     window.GetConnectedAddress = function() {
       return connectedAddress || '';
     }

     window.MintToken = async function(amount) {
       try {
         const provider = sdk.getWalletProvider();

         const mintSignature = '0xa0712d68';
         const amountHex = amount.toString(16).padStart(64, '0');
         const data = mintSignature + amountHex;

         const tx = {
           from: connectedAddress,
           to: '0x099D7feC4f799d1749adA8815eB21375E13E0Ddb',
           value: '0x0',
           data: data,
           gas: '0x4C4B40'
         };

         const txHash = await provider.request({
           method: 'kaia_sendTransaction',
           params: [tx]
         });

         myGameInstance.SendMessage('Web3Manager', 'OnMintSuccess', txHash);
         GetBalance(); // Get updated balance after mint
       } catch (error) {
         myGameInstance.SendMessage('Web3Manager', 'OnMintError', error.message);
       }
     }

     window.GetBalance = async function() {
       try {
         const provider = sdk.getWalletProvider();

         const balanceSignature = '0x70a08231';
         const addressParam = connectedAddress.substring(2).padStart(64, '0');
         const data = balanceSignature + addressParam;

         const result = await provider.request({
           method: 'kaia_call',
           params: [{
             from: connectedAddress,
             to: '0x099D7feC4f799d1749adA8815eB21375E13E0Ddb',
             data: data
           }, 'latest']
         });

         const balance = parseInt(result, 16);
         myGameInstance.SendMessage('Web3Manager', 'OnBalanceReceived', balance.toString());
       } catch (error) {
         myGameInstance.SendMessage('Web3Manager', 'OnBalanceError', error.message);
       }
     }

     createUnityInstance(document.querySelector("#unity-canvas"), {
       dataUrl: "Build/minidapp.data",
       frameworkUrl: "Build/minidapp.framework.js",
       codeUrl: "Build/minidapp.wasm",
       streamingAssetsUrl: "StreamingAssets",
       companyName: "DefaultCompany",
       productName: "minidapp",
       productVersion: "0.1",
     }).then((unityInstance) => {
       myGameInstance = unityInstance;
     });
   </script>
 </body>
</html>

```

## 4단계: 미니 앱 SDK 설정하기

1. 방문: https://static.kaiawallet.io/js/dapp-portal-sdk.js
2. 스크립트/dapp_portal_sdk.js\`에 콘텐츠를 저장합니다. 로컬 미니 앱 SDK 파일을 사용하면 로드 시간과 안정성이 향상됩니다.

:::note
또는 'index.html'의 '스크립트' 태그에 미니 앱 SDK 링크를 '스크립트'로 직접 추가할 수도 있습니다.

```js
// <script src="scripts/dapp_portal_sdk.js"></script>
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

:::

## 5단계: 커스텀 템플릿을 사용하도록 Unity 구성하기

- 빌드 설정을 엽니다.
- 플레이어 설정으로 이동합니다.
- '해결 및 프레젠테이션'에서 확인하세요:
 - "WebGL 템플릿"을 찾습니다.
 - "카이아템플릿"을 선택합니다.
- '게시 설정'의 압축 형식 필드에서 **사용 안 함**을 선택합니다.

![](/img/minidapps/unity-minidapp/ui-select-webgl-temp.png)

## 6단계: dApp 구축

이제 이 모든 것을 한데 모아 보겠습니다:

1. 빌드 설정을 엽니다(파일 → 빌드 설정).
2. "빌드 및 실행"을 클릭합니다.
3. Unity의 메시지에 따라 빌드 프로젝트를 저장합니다(예: "minidapp").
4. 중요 빌드 파일:

```bash
minidapp/
├── minidapp.loader.js
├── minidapp.data
├── minidapp.framework.js
└── minidapp.wasm
```

## 7단계: 빌드 후 구성

프로젝트를 빌드한 후

1. 빌드 폴더를 엽니다.
2. 생성된 모든 파일 이름을 기록해 두세요.
3. 이 이름과 일치하도록 index.html을 업데이트하세요.
4. 변경 사항을 저장하고 다시 빌드합니다.
5. 이제 브라우저에 탭이 열립니다.

![](/img/minidapps/unity-minidapp/ui_build_app.png)

## 8단계: WebGL 빌드를 Localhost:3000으로 라우팅하기

보안 및 개발 목적으로 현재 미니 앱 SDK는 로컬호스트:3000에서 작동합니다. 현재 기본 Unity WebGL 빌드는 임의의 포트(예: 61445)를 사용하므로 앱이 효율적으로 작동하려면 Unity WebGL 빌드가 localhost:3000에서 열리도록 구성해야 합니다.

이렇게 하려면 아래 단계를 따르세요:

1. 프로젝트 터미널에 아래 코드를 복사하여 붙여넣으세요.

```bash
# Install http-server globally
npm install -g http-server
```

2. 빌드 폴더로 이동

```bash
cd path/to/minidapp
```

3. 포트 3000에서 서버 시작

```bash
http-server -p 3000
```

![](/img/minidapps/unity-minidapp/lh_3000.png)

## 애플리케이션 테스트 및 실행

이제 프로젝트가 실행되었으니 테스트하고 상호 작용해 보겠습니다.

- 지갑 연결 버튼을 클릭하여 Dapp 포털 지갑에 연결합니다.
- 연결되면 연결된 주소로 발행할 세부 정보(금액)를 입력합니다.

![](/img/minidapps/unity-minidapp/minidapp.gif)
