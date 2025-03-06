# 미니 디앱 SDK 통합

이 섹션에서는 미니 댑 SDK가 게임에 로드되었는지 확인합니다. 이를 위해 코코스 크리에이터의 빌드 템플릿 디렉터리에서 웹 플랫폼에 맞게 게임을 빌드하는 방법을 사용자 지정할 수 있으므로 게임을 시작하기 전에 SDK를 미리 로드하는 것이 필수적입니다.

빌드 템플릿/웹 데스크톱\*\*에서 사용자 지정 템플릿을 생성하면 모든 빌드에 SDK를 자동으로 포함시켜 개발 및 배포를 간소화할 수 있습니다.

## 1단계: 빌드 템플릿 디렉토리 만들기 <a id="create-build-template-directory"></a>

VS Code에서 프로젝트를 열고 터미널에서 다음 명령을 실행합니다:

```bash
mkdir -p build-templates/web-desktop
```

## 2단계: 코코스 크리에이터에서 초기 빌드 수행하기 <a id="perform-initial-build"></a>

1. 메뉴 → 프로젝트 → 빌드\*\*로 이동합니다.

![](/img/minidapps/cocos-creator/cp-build-r.png)

2. 플랫폼\*\*을 **웹 데스크톱**으로 설정합니다.

3. 빌드\*\*를 클릭합니다.

![](/img/minidapps/cocos-creator/cp-build-details-r.png)

## 3단계: 빌드 디렉토리에서 index.html 파일을 복사합니다. <a id="copy-index-html-from-build-dir"></a>

빌드가 완료되면 index.html 파일을 build-templates 디렉터리에 복사합니다:

```bash
cp build/web-desktop/index.html build-templates/web-desktop/
```

## 4단계: 미니 앱 SDK를 포함하도록 index.html 수정하기 <a id="modify-index-html-to-include-dapp-portal-sdk"></a>

build-templates/web-desktop/index.html`을 편집하고 `<head> </head>\` 섹션에 다음 미니 앱 SDK 스크립트 태그를 추가합니다:

```bash
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

## 5단계: 빌드 설정 확인 <a id="verify-build-setup"></a>

- 코코스 크리에이터에서 프로젝트를 다시 빌드하세요.
- 생성된 `build/web-desktop/index.html`을 확인합니다.
- 미니 앱 SDK 스크립트\*\*가 올바르게 포함되었는지 확인합니다.

## 6단계: 프로젝트 빌드 및 미리보기 <a id="build-preview-project"></a>

설정을 완료한 후 Cocos 크리에이터 에디터 상단의 _장치에서 재생_을 클릭합니다. 게임이 새 브라우저 탭에서 열립니다.

![](/img/minidapps/cocos-creator/cp-play-game-r.png)

![](/img/minidapps/cocos-creator/cp-localhost-build-r.png)

# 웹 빌드를 로컬호스트:3000으로 라우팅 <a id="route-web-build"></a>

보안 및 개발 목적으로 현재 미니 앱 SDK는 로컬호스트:3000에서 작동합니다. 현재 기본 Unity WebGL 빌드는 임의 포트(예: 7457)를 사용하므로 앱이 효율적으로 작동하려면 로컬 호스트:3000에서 열리도록 Unity WebGL 빌드를 구성해야 합니다.

이렇게 하려면 아래 단계를 따르세요:

1. 프로젝트 터미널에 아래 코드를 복사하여 붙여넣으세요.

```bash
# Install http-server globally
npm install -g http-server
```

2. 빌드 폴더로 이동

```bash
cd build/web-desktop
```

3. 포트 3000에서 서버 시작

```bash
http-server -p 3000
```

# 애플리케이션 테스트 및 실행 <a id="route-web-build"></a>

이제 프로젝트가 실행되었으니 테스트하고 상호 작용해 보겠습니다.

- 지갑 연결 버튼을 클릭하여 Dapp 포털 지갑에 연결합니다.
- 연결되면 연결된 주소로 정해진 금액을 발행합니다.

![](/img/minidapps/cocos-creator/cocos-demo.gif)
