# 为 DApp Portal SDK 配置构建模板

在本节中，我们将确保在游戏中加载 DApp Portal SDK。 为此，Cocos Creator 的 build-templates 目录允许自定义游戏在网络平台上的构建方式，这对于在游戏开始前预载 SDK 至关重要。

通过在 **build-templates/web-desktop** 中创建自定义模板，我们可以在每次构建时自动包含 SDK，从而简化开发和部署。

## 步骤 1：创建构建模板目录<a id="create-build-template-directory"></a>

在 VS Code 中打开项目，在终端运行以下命令：

```bash
mkdir -p build-templates/web-desktop
```

## 步骤 2：在 Cocos Creator 中执行初始构建<a id="perform-initial-build"></a>

1. 转到 **菜单 → 项目 → 构建**。

![](/img/minidapps/cocos-creator/cp-build-r.png)

2. 将**平台**设置为**网络桌面**。

3. 点击 **构建**。

![](/img/minidapps/cocos-creator/cp-build-details-r.png)

## 第 3 步：从构建目录复制 index.html 文件<a id="copy-index-html-from-build-dir"></a>

创建完成后，将 index.html 文件复制到 build-templates 目录中：

```bash
cp build/web-desktop/index.html build-templates/web-desktop/
```

## 步骤 4：修改 index.html 以包含 DApp Portal SDK<a id="modify-index-html-to-include-dapp-portal-sdk"></a>

编辑 `build-templates/web-desktop/index.html` 并在 `<head> </head>` 部分中添加以下 DApp Portal SDK 脚本标记：

```bash
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

## 步骤 5：验证构建设置<a id="verify-build-setup"></a>

- 在 Cocos Creator 中重建项目。
- 检查生成的 `build/web-desktop/index.html`。
- 确认已正确包含 **DApp Portal SDK 脚本**。

## 第 6 步：构建和预览项目<a id="build-preview-project"></a>

完成设置后，单击 Cocos Creator 编辑器顶部的_Play on Device_（在设备上播放）。 您的游戏应在新的浏览器标签页中打开。

![](/img/minidapps/cocos-creator/cp-play-game-r.png)

![](/img/minidapps/cocos-creator/cp-localhost-build-r.png)

# 将网络构建路由至 Localhost:3000<a id="route-web-build"></a>

出于安全和开发目的，DApp Portal SDK 目前在 localhost:3000 上运行。 目前，默认的 Unity WebGL 构建使用随机端口（如 7457），为了让我们的应用程序高效运行，我们需要将 Unity WebGL 构建配置为在 localhost:3000 上打开。

为此，请按照以下步骤操作：

1. 在项目终端复制并粘贴以下代码

```bash
# Install http-server globally
npm install -g http-server
```

2. 导航至构建文件夹

```bash
cd build/web-desktop
```

3. 在 3000 端口启动服务器

```bash
http-server -p 3000
```

# 测试和运行应用程序 <a id="route-web-build"></a>

现在，我们的项目已经运行，让我们对其进行测试和交互。

- 点击连接钱包按钮，连接到 Dapp Portal 钱包。
- 连接后，向连接地址发送固定金额的薄荷糖。

![](/img/minidapps/cocos-creator/cocos-demo.gif)

