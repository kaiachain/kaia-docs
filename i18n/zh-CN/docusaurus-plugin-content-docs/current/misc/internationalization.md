# 国际化

Kaia Docs 的目标是面向全球受众。 我们感谢社区为翻译和改进我们的文档所做的贡献。

## 可用语言

Kaia Docs 目前有以下语言版本：

- [English](https://docs.kaia.io/)
- [한국어](https://docs.kaia.io/ko/)
- [日本語](https://docs.kaia.io/ja/)
- [简体中文](https://docs.kaia.io/zh-CN/)
- [繁體中文](https://docs.kaia.io/zh-TW/)
- [Tiếng Việt](https://docs.kaia.io/vi/)

## Kaia Docs 翻译如何工作

- **English** 是源语言，在 [GitHub](https://github.com/kaiachain/kaia-docs) 中管理。
- 当英文内容更新时，更改会同步到我们的翻译管理平台 [Crowdin](https://crowdin.com/project/kaia-docs)。
- 某些语言（日语、简体中文和繁体中文、韩语和越南语）使用**机器翻译（MT）**，以便即时获取新内容。
- **人工审核和改进**：社区贡献者和版主审核并改进 Crowdin 中的翻译。
- **自动更新**：一旦翻译获得批准，Crowdin 将向 Kaia Docs GitHub 存储库创建拉取请求 (PR)。 合并后，多语言文档网站将得到更新。

Kaia Docs 翻译工作流程](/img/misc/translation-workflow.svg)

## 如何通过 Crowdin 贡献翻译作品

Kaia Docs 的所有翻译都通过协作翻译平台 Crowdin 进行管理。

1. \*\* 转到 [Crowdin 上的 Kaia-Docs 项目](https://crowdin.com/project/kaia-docs).\*\*
2. **创建一个 Crowdin 帐户**（如果已有帐户，请登录）。
3. **从项目页面选择您希望贡献的语言**。 如果您的语言未在列表中，您可以通过在 GitHub 上打开一个问题 使用 "content-translation "标签申请一种新的语言。
4. **加入翻译团队**，翻译您所选择的语言。 您的申请可能需要项目经理的批准。
5. **选择要翻译或审阅的文件**。
6. **开始翻译：** 使用 Crowdin 在线编辑器。
   - 输入源字符串的新翻译。
   - 对现有翻译提出改进建议。
   - 对他人提出的建议进行表决。
   - 如果您有问题或想讨论具体的字符串，请留言。
7. \*\* 快速质量保证检查表（审核员）：\*\*
   - ✔️ 将代码片段、命令、变量名和品牌名等不可翻译的内容保留为英文（使用 Crowdin 中的 "隐藏可见 "功能）。
   - ✔️ 点击编辑器中的 "术语 "选项卡，与 Kaia 术语保持一致。
   - ✔️ 重点关注菜单项、标题和标题，使其清晰明了。

![Crowdin 编辑界面](/img/misc/crowdin-editor.png)

有关编辑器的详细用法，请参阅官方[Crowdin 文档](https://support.crowdin.com/online-editor/)。

## 翻译角色

- **翻译员**：任何在 Crowdin 上加入项目的人都可以为文件中的字符串提出翻译建议。 注重准确性和清晰度。
- **审校（QA）**：经验丰富的译员可能会被要求对建议的译文进行语言质量保证 (QA)。 这包括检查一致性、术语的一致性、清晰度，以及正确处理不可翻译的元素（如代码片段）。 审稿人侧重于语言质量，但不执行最终审批步骤。
- \*\* 管理员\*\*：项目维护者，负责审核 QA 反馈并最终批准 Crowdin 中的翻译。 获得批准的译文也会加入 Crowdin 使用的翻译记忆库。

## 了解 Crowdin 中的文件

在 Crowdin 中浏览 Kaia Docs 项目时，你会看到为翻译而组织的不同文件和文件夹。 了解每项内容有助于您了解您的翻译将出现在 Kaia Docs 实时网站的哪个位置：

![Crowdin文件结构](/img/misc/crowdin-dashboard.png)

- \*\*`docs/``**：该文件夹包含以 Markdown（`.md`或`.mdx\` 文件）编写的 Kaia 文档页面的主要内容。 在此翻译文件可直接翻译您在网站主要内容区域看到的文章、指南和教程。

- **`i18n/en/code.json`**：包含直接嵌入网站用户界面（UI）代码的文本字符串，通常使用特定的翻译函数或组件（如 `<Translate>`）。 这包括标签、按钮、自定义功能中的信息以及其他特定文件未涵盖的网站主题部分。 您在此处的翻译将出现在整个网站的界面元素中。

- **`i18n/en/docusaurus-plugin-content-docs/current.json`**：保存与文档结构本身相关的标签翻译。 这主要包括侧边栏类别名称和文档系统自动生成的其他导航元素。 翻译这些内容可确保用户能用自己的语言浏览文档部分。

- **`i18n/en/docusaurus-theme-classic/footer.json`**：包含网站每个页面底部页脚区域的所有可翻译文本。 这通常包括版权声明、链接和其他特定的页脚文本。

- **`i18n/en/docusaurus-theme-classic/navbar.json`**：包含网站顶部主导航栏中的所有可翻译文本。 这包括链接、下拉菜单和其他导航元素的标签。

## 机器翻译 (MT) 政策

为了让我们的全球用户更快地获取新的和更新的内容，我们对某些语言使用了机器翻译 (MT)，如上述列表所示。

- **工作原理：** 更新英文文档时，MT 会自动提供初始翻译。 经过维护者审核后，这些信息会同步回 Kaia 文档网站。
- **免责声明：** 主要由 MT 翻译的页面将显示免责声明，告知用户内容可能包含不准确之处，并邀请用户通过 Crowdin 帮助改进。
- **您的贡献很重要：** 即使是 MT，社区贡献对提高准确性、上下文和自然措辞也至关重要。

## 源内容更新的影响

我们的文档资料在不断更新。 当 GitHub 仓库中的源英文内容更新时，Crowdin 中的相应字符串也会更新。

- 翻译重置：\*\* 这一同步过程意味着**修改字符串\*的现有翻译将被**重置\*\*（要么重置为新的英文文本，要么重置为新的机器翻译）。
- **为什么？** 这样可以确保翻译文件准确反映最新英文源的结构和核心信息。
- **贡献价值：** 虽然单个字符串可能会被重置，但您的贡献仍然非常有价值，可以确保_当时_文档的准确性和质量，并有助于完善整体本地化工作。

## 讨论与社区

- 加入 [Crowdin Discussions](https://crowdin.com/project/kaia-docs/discussions) 或项目的 [GitHub Discussions](https://github.com/kaiachain/kaia-docs/discussions) 与其他贡献者和维护者交流。

## 行为准则

请尊重所有社区成员。 项目经理保留在必要时删除冒犯性内容和取消贡献权限的权利。 请遵守我们的 [行为准则](https://github.com/kaiachain/kaia-docs/blob/main/code-of-conduct.md)。