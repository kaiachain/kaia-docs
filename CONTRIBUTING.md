# 📝 Contributing to Kaia Docs

Thank you for your interest in contributing to Kaia Docs! As an open-source project, Kaia Docs is always open to the developer community and we warmly welcome your contributions. Please follow the guidelines below to ensure a smooth and enjoyable collaboration experience.

## 📚 How to Contribute to Kaia Docs

1. **Read this [Contributing Document](./CONTRIBUTING.md).**
2. **Sign the [Contributor License Agreement (CLA)](https://github.com/kaiachain/kaia-docs/blob/main/.github/CLA.md).**
3. **Submit an issue with proper [labelling](#️-usage-of-labels).**
4. **Wait for Contribution Approval:** Our moderators will review your issue and update the label to `contribution welcome` if it's ready to be worked on. Please avoid duplicate efforts by checking the issue status before starting your contribution.
5. **Start Contributing:** Once your issue is approved, you can begin working on the changes. Update the issue to inform other contributors that you're actively working on it.
6. **Make a Pull Request (PR):** Ensure your proposed changes are accurate, well-documented, and linked to the corresponding issue. Submit a PR against the `main` branch and wait for code review and approval.
7. **Address Review Feedback:** The reviewer may request additional commits or changes. Be responsive and address their feedback to ensure your contribution aligns with the project's standards.
8. **PR Merge and Branch Deletion:** Once approved, the project moderator will merge your PR into the main branch. You can then safely delete your working branch.
9. **Content Update:** The Kaia Docs website ([https://docs.kaia.io/](https://docs.kaia.io/)) will be updated with your merged contribution.

## 🧩 Types of Contribution

There are various ways to contribute and participate. Please read the guidelines below regarding the process for each type of contribution.

- [Issues and Typos](#-issues-and-typos)
- [Content Contribution](#-content-contribution)
- [Content Translation](#-content-translation)

### 🐞 Issues and Typos

If you spot issues or typos in Kaia Docs, please ensure the following before submitting an issue:

- The issue is **not a duplicate**.
- The issue has **not been covered** in the latest release of Kaia Docs.
- The issue addresses **minor typos or errors** in the existing content.

**Please do not use the issue tracker for personal support requests.** Use [dev@kaia.io](mailto:dev@kaia.io) for personal support.

After confirming your report meets the above criteria, [submit the issue](https://github.com/kaiachain/kaia-docs/issues). Please use the `issues-and-typos` label to categorize your issue.

### 📄 Content Contribution

For major content changes in Kaia Docs, please follow these steps:

- Ensure the issue is **not a duplicate**.
- Confirm the issue has **not been addressed** in the latest release.
- The issue involves **major content changes** (e.g., adding/removing paragraphs or chapters, adding/removing graphical explanations).

**Avoid using the issue tracker for personal support requests.** Instead, contact [dev@kaia.io](mailto:dev@kaia.io).

Once verified, [submit the issue](https://github.com/kaiachain/kaia-docs/issues) with the `content-contribution` label.

### 🌐 Content Translation

If you are fluent in a language other than English and want to contribute translations or improve the localized documentation, [submit an issue](https://github.com/kaiachain/kaia-docs/issues). Please use [labels](#️-usage-of-labels) to specify your issue as `content-translation`.

You need to use the [Crowdin](https://crowdin.com/project/kaia-docs) platform to contribute translations. For more information, see the [Internationalization](https://docs.kaia.io/misc/internationalization/) page.

> [!IMPORTANT]  
> For content translation, avoid using a pull request to submit changes by modifying the files under the [i18n](https://github.com/kaiachain/kaia-docs/tree/main/i18n) directory directly. </br> </br> Unlike other types of contribution, the translations are managed by Crowdin localization management platform. If a translation is submitted and has been approved in Crowdin, an automated PR will be made to Kaia docs repo. Once the PR is approved and merged by the project moderators, the localized Kaia docs will be updated with the suggested changes (merged content).

## 🏷️ Usage of Labels

Proper labeling helps us manage contributions efficiently. Here are the labels used:

### Initial Issue Categories

- **`issues-and-typos`**: Minor content typos and inaccuracies.
- **`content-contribution`**: Major content contributions.
- **`content-translation`**: Content translations.

### Status of Open Issues

- **(no label)**: Default status.
- **`open/need more information`**: Additional information is required from the issue creator.
- **`open/reviewing`**: The issue is under review.
- **`open/re-label needed`**: Label needs to be updated to one of the initial categories.
- **`open/contribution welcome`**: The content is approved and ready for contribution.

### Status of Closed Issues

- **`closed/fixed`**: Issue has been resolved.
- **`closed/duplicate`**: Issue is a duplicate of another.
- **`closed/invalid`**: Issue is not applicable to Kaia Docs.
- **`closed/reject`**: Issue has been rejected after review.

## ⭐ Contribution Best Practices

Here are some best practices to follow when contributing to Kaia Docs.

### 🧰 Content Creation Tools

We encourage the use of productivity tools to help create high-quality documentation:

#### 🤖 AI-Assisted Writing

AI tools can help with drafting technical content, generating code examples, and improving documentation clarity. To learn how to effectively use these tools in your contribution workflow, refer to our [Contributing Documentation: AI-Assisted Writing Guide](https://github.com/kaiachain/kaia-docs/blob/main/.github/ai-writing-guide.md).

When using AI tools for content creation:

- Always review and verify the generated content for technical accuracy.
- Ensure all content follows our style and formatting guidelines.
- Maintain consistent terminology with existing documentation.

#### ✍️ Text Style Linters

Linting tools can help maintain consistent writing style and formatting across the documentation. Consider using tools like [Vale](https://vale.sh/) to ensure your content aligns with a writing guideline without consulting a style guide.

The Vale comes with several [pre-configured style guides](https://github.com/errata-ai/packages?tab=readme-ov-file#available-styles), including the Microsoft Writing Style Guide, Google Developer Documentation Style Guide, and more. It can be easily integrated into your text editor (e.g., VS Code) or CI/CD pipeline. You can also create a custom style guide to match the Kaia Docs [style guide](https://github.com/kaiachain/kaia-docs/blob/main/.github/style-guide.md).

### 💬 Commit Messages

- **Start with a capitalized and imperative verb.**  
  Examples: "Update", "Fix", "Add", "Improve".

- **Use a consistent format for commit messages.**  
  A common pattern is `"verb: description of change"` (e.g., "Update contract addresses for Kaia chain").

- **Keep the subject line short and descriptive.**  
  It should clearly communicate the scope and focus of the change.

### 🛠️ Build and Dependencies

If your contribution involves adding new code or dependencies, ensure the project continues to build successfully after your changes by running a build command (for example, `npm run build`).

### 🖼️ Image Processing

- **Keep all images optimized and compressed** to minimize file size (under 30KB whenever possible). This helps improve website loading speed and keeps the repository size manageable. Consider using tools like [Trimage](https://trimage.org/) to optimize your images.
- **Use rounded corners on screenshots** for a more professional look that improves focus on content and matches modern design standards. Consider using a free online tool (e.g. https://www.quickpicturetools.com/en/rounded_corners/) to add rounded corners to your screenshots.

## 📜 Contributor License Agreement (CLA)

Keep in mind when you submit your first pull request, you'll need to sign the CLA by posting the comment "I have read the CLA Document and I hereby sign the CLA" in the PR. You will have to sign the CLA just one time, either as an individual or corporation.