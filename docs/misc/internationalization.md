# Internationalization

Kaia Docs aims to be accessible to a global audience. We appreciate community contributions to translate and improve our documentation.

## Available Languages

Kaia Docs is currently available in the following languages:

* [English](https://docs.kaia.io/)
* [한국어](https://docs.kaia.io/ko/)
* [日本語](https://docs.kaia.io/ja/)
* [简体中文](https://docs.kaia.io/zh-CN/)
* [繁體中文](https://docs.kaia.io/zh-TW/)
* [Tiếng Việt](https://docs.kaia.io/vi/)

## How Kaia Docs Translation Works

* **English** is the source language, managed in [GitHub](https://github.com/kaiachain/kaia-docs).
* When English content is updated, changes are synced to [Crowdin](https://crowdin.com/project/kaia-docs), our translation management platform.
* **Machine Translation (MT)** is used for some languages (Japanese, Simplified & Traditional Chinese, Korean, and Vietnamese) to provide immediate access to new content.
* **Manual review and improvement**: Community contributors and moderators review and improve translations in Crowdin.
* **Automatic updates**: Once translations are approved, Crowdin creates a pull request (PR) to the Kaia Docs GitHub repository. When merged, the multilingual docs site is updated.

![Kaia Docs Translation Workflow](/img/misc/translation-workflow.svg)

## How to Contribute Translations via Crowdin

All translations for Kaia Docs are managed through Crowdin, a collaborative translation platform.

1. **Go to the [Kaia-Docs project on Crowdin](https://crowdin.com/project/kaia-docs).**
2. **Create a Crowdin account** (or log in if you already have one).
3. **Select the language** you wish to contribute to from the project page. If your language is not listed, you can request a new language by [opening an issue on GitHub](https://github.com/kaiachain/kaia-docs/issues/new?assignees=&labels=content-translation&template=feature_request.md&title=%5BLang%20Request%5D%3A%20Add%20[Your%20Language]) using the `content-translation` label.
4. **Join the translator team** for your chosen language. Your request may require approval from a project manager.
5. **Choose a file** you want to translate or review.
6. **Start Translating:** Use the Crowdin online editor.
   * Enter new translations for source strings.
   * Suggest improvements to existing translations.
   * Vote on suggestions made by others.
   * Leave comments if you have questions or want to discuss specific strings.
7. **Quick QA Checklist (Reviewers):**
   * ✔️ Leave non-translatable content like code snippets, commands, variable names, and brand names in English (Use “Hide Visible” feature in Crowdin).
   * ✔️ Conform to Kaia Terminologies by clicking the "Terms" tab in the editor.
   * ✔️ Focus on menu items, headings, and titles for clarity.

![Crowdin Editor Interface](/img/misc/crowdin-editor.png)

For detailed editor usage, refer to the official [Crowdin documentation](https://support.crowdin.com/online-editor/).

## Translation Roles

* **Translator**: Anyone who joins the project on Crowdin can suggest translations for strings within the files. Focus on accuracy and clarity.
* **Reviewer (QA)**: Experienced translators may be asked to perform linguistic Quality Assurance (QA) on suggested translations. This involves checking for consistency, adherence to terminology, clarity, and correctly handling non-translatable elements (like code snippets). Reviewers focus on the linguistic quality but do not perform the final approval step.
* **Moderator**: Project maintainers who review QA feedback and give the final approval to translations within Crowdin. Approved translations also contribute to the Translation Memory used by Crowdin.

## Understanding the Files in Crowdin

When you browse the Kaia Docs project in Crowdin, you'll see different files and folders organized for translation. Understanding what each contains helps you know where your translations will appear on the live Kaia Docs site:

![Crowdin File Structure](/img/misc/crowdin-dashboard.png)

* **`docs/`**: This folder contains the main content of the Kaia documentation pages, written in Markdown (`.md` or `.mdx` files). Translating files here directly translates the articles, guides, and tutorials you see on the main content area of the site.

* **`i18n/en/code.json`**: Contains text strings embedded directly within the website's user interface (UI) code, often using specific translation functions or components (like `<Translate>`). This includes labels, buttons, messages within custom features, and parts of the site's theme not covered by other specific files. Your translations here will appear throughout the site's interface elements.

* **`i18n/en/docusaurus-plugin-content-docs/current.json`**: Holds translations for labels related to the documentation structure itself. This primarily includes sidebar category names and other navigation elements generated automatically by the documentation system. Translating these ensures users can navigate the documentation sections in their language.

* **`i18n/en/docusaurus-theme-classic/footer.json`**: Contains all translatable text found in the website's footer area at the bottom of each page. This typically includes copyright notices, links, and other footer-specific text.

* **`i18n/en/docusaurus-theme-classic/navbar.json`**: Contains all translatable text found in the website's main navigation bar at the top of the page. This includes labels for links, dropdown menus, and other navigation elements.

## Machine Translation (MT) Policy

To provide faster access to new and updated content for our global users, we utilize Machine Translation (MT) for certain languages, as indicated in the list above.

* **How it Works:** When English documentation is updated, MT automatically provides an initial translation. This is then synced back to the Kaia Docs website after maintainer review.
* **Disclaimer:** Pages translated primarily by MT will display a disclaimer notice, informing users that the content may contain inaccuracies and inviting them to help improve it via Crowdin.
* **Your Contributions Matter:** Even with MT, community contributions are vital for improving accuracy, context, and natural phrasing.

## Impact of Source Content Updates

Our documentation is constantly evolving. When the source English content in the GitHub repository is updated, the corresponding strings in Crowdin are also updated.

* **Translation Resets:** This synchronization process means that existing translations for the *modified strings* will be **reset** (either to the new English text or a new Machine Translation).
* **Why?** This ensures that the translated documentation accurately reflects the structure and core information of the latest English source.
* **Contribution Value:** While individual strings may be reset, your contributions are still highly valuable for ensuring the accuracy and quality of the documentation *at that point in time* and help refine the overall localization.

## Discussion & Community

* Join the [Crowdin Discussions](https://crowdin.com/project/kaia-docs/discussions) or the project's [GitHub Discussions](https://github.com/kaiachain/kaia-docs/discussions) to connect with fellow contributors and maintainers.

## Code of Conduct

Please be respectful towards all community members. Project managers reserve the right to remove offensive content and revoke contribution access if necessary. Please adhere to our [Code of Conduct](https://github.com/kaiachain/kaia-docs/blob/main/code-of-conduct.md).