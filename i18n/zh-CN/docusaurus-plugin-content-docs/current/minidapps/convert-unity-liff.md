# 将您的 Unity 构建转换为 LINE LIFF 应用程序

现在是激动人心的部分--将你的 Unity WebGL 构建转化为可通过 LINE 访问的迷你 dApp！

## 第 1 步：创建您的 LIFF 应用程序<a id="create-liff-app"></a>

首先，让我们在 LINE 生态系统中设置您的应用程序：

1. LINE 开发人员控制台设置：

   - 访问 LINE 开发人员控制台。
   - 创建一个提供程序（如果已经有一个，请跳过）。

   ![](/img/minidapps/unity-minidapp/create-provider-lc.png)

   - 创建新的 LINE 登录通道。

   ![](/img/minidapps/unity-minidapp/line-login-lc.png)

   - 导航至 LIFF 选项
   - 点击 "添加 LIFF 应用程序

   ![](/img/minidapps/unity-minidapp/line-liff-add.png)

2. 配置 LIFF 设置：

```code
Size: Choose one of:
├── Full (entire screen)
├── Tall (75% of screen)
└── Compact (50% of screen)
Endpoint URL: https://example.com (temporary)
Permissions: Enable as needed
```

:::note
保存您的 LIFF ID - 下一步将用到它！
:::

## 第 2 步：修改 WebGL 模板<a id="modify-webgl-template"></a>

index.html 文件可帮助我们检查 web3 是否可用、设置 LINE 集成 (LIFF)、加载 Unity 游戏并将所有内容连接在一起。

```code
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Unity WebGL - Mini dApp</title>
    
    <!-- Add Web3.js BEFORE other scripts -->
    <script src="./scripts/web3.min.js"></script>
    <!-- LIFF SDK -->
    <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <!-- Unity Loader -->
    <script src="Build/minidapp.loader.js"></script>
    <script>
      // Allow paste anywhere on the page
      document.addEventListener('keydown', function(e) {
          if (e.ctrlKey && e.key === 'v') {
              // Trigger paste event
              navigator.clipboard.readText().then(function(text) {
                  var pasteEvent = new ClipboardEvent('paste', {
                      clipboardData: new DataTransfer()
                  });
                  pasteEvent.clipboardData.setData('text', text);
                  document.dispatchEvent(pasteEvent);
              });
          }
      });
  </script>
    <style>
      html, body { height: 100%; margin: 0; padding: 0; }
      #unity-canvas { width: 100%; height: 100%; display: block; }
    </style>
  </head>
  <body>
    <div id="loading">Loading...</div>
    <canvas id="unity-canvas"></canvas>
    
    <script>
      var myGameInstance = null;
      
      // Add this function to check Web3 availability
      function checkWeb3() {
        if (typeof Web3 !== 'undefined') {
          console.log("Web3 is available");
          return true;
        }
        console.error("Web3 is not available");
        return false;
      }
      async function initializeLiff() {
        try {
          // Check Web3 first
          if (!checkWeb3()) {
            throw new Error("Web3 is not loaded");
          }
          await liff.init({
            liffId: "2006555499-b4Z6DegW"
          });
          console.log("LIFF initialized");
          
          initializeUnity();
        } catch (error) {
          console.error("Initialization failed:", error);
          document.getElementById('loading').textContent = 'Error: ' + error.message;
        }
      }
      function initializeUnity() {
        createUnityInstance(document.querySelector("#unity-canvas"), {
          dataUrl: "Build/minidapp.data.unityweb",
          frameworkUrl: "Build/minidapp.framework.js.unityweb",
          codeUrl: "Build/minidapp.wasm.unityweb",
        }).then((unityInstance) => {
          console.log("Unity initialized");
          myGameInstance = unityInstance;
          document.getElementById('loading').style.display = 'none';
        });
      }
      // Wait for page to load completely before initializing
      window.addEventListener('load', function() {
        // Give a small delay to ensure Web3 is loaded
        setTimeout(initializeLiff, 500);
      });
    </script>
  </body>
</html>

```

确保在上述代码片段中更改您的 LIFF-ID 。

## 第 3 步：部署 WebGL 构建<a id="step3-deploy-webgl-build"></a>

- 为 WebGL 构建您的 Unity 项目
- 将所有构建文件上传到网络服务器。 在本指南中，我已将 WebGL 构建上传到 Netlify，可在 [此处](https://kaia-minidapp-example.netlify.app/) 查阅。

您的部署文件夹结构应如下所示：

```bash
Minidapp/
├── Build/
│   ├── minidapp.data.unityweb
│   ├── minidapp.framework.js.unityweb
│   ├── mini.loader.js
│   └── minidapp.wasm.unityweb
├── scripts/
│   └── web3.min.js
└── index.html
```

## 步骤 4：最终配置和测试<a id="step4-final-config-testing"></a>

1. 更新您的 LIFF 端点：
   - 返回 LINE 开发人员控制台
   - 查找您的 LIFF 应用程序
   - 点击 "编辑
   - 更新已部署网站的 URL : https://kaia-minidapp-example.netlify.app/

现在，您的迷你 dApp 应可随时访问 https://liff.line.me/2006555499-b4Z6DegW

## 总结<a id="summing-up"></a>

恭喜！ 您已成功使用 Unity 创建了第一个 LINE mini dApp！ 完成本指南后，您就实现了一个具有代币铸造功能的迷你 dApp。 构建 LINE mini dApp 超越了传统的应用程序开发，而是要在用户已经信任并每天使用的生态系统中创建无缝的 Web3 体验。

通过 Kaia 的集成，您可以将区块链功能直接带到用户的指尖，消除 Web3 采用的常见障碍。 LINE 的广泛影响力与 Web3 的功能相结合，为我们创造了一个独特的创新机会，这在以前是不可能实现的。

LINE mini dApps 的强大之处在于其多功能性和易用性。 无论您是探索新区块链实施方法的开发人员，还是希望提高客户参与度的企业，抑或是寻求创造新颖数字体验的创新者，该平台都能为您提供实现愿景所需的所有工具。

有关开发 LINE mini dApp 的更多详细信息，请浏览这些综合资源：

- [Kaia文档](https://docs.kaia.io/)
- [行开发人员文档](https://developers.line.biz/en/docs/line-mini-app/)
- [统一文档](https://docs.unity.com/)

## 附录<a id="appendix"></a>

### 附录 A<a id="appendix-a"></a>

[KaiaPlugin.jslib源代码](https://gist.github.com/ayo-klaytn/2aad97e1e263b00f5403177a7ad1fff1#file-kaiaplugin-jslib)

### 附录 B<a id="appendix-b"></a>

[Web3Manager.cs源代码](https://gist.github.com/ayo-klaytn/2aad97e1e263b00f5403177a7ad1fff1#file-web3manager-cs)
