# 📝 Contributing to Kaia Docs

Thank you for your interest in contributing to Kaia Docs! As an open-source project, Kaia Docs is always open to the developer community and we warmly welcome your contributions. Please follow the guidelines below to ensure a smooth and enjoyable collaboration experience.

**Contribution Paths:**

* **New / Occasional Contributors:** Please follow the **Standard Workflow** (Submit Issue -> Wait for Approval -> Submit PR).
* **Minor Fixes (Typos, Broken Links):** Anyone can submit a PR directly for these small corrections.
* **Internal Maintainers & Recognized Regular Contributors:** You *may* submit PRs directly for most changes without a prior issue, but please read the specific guidelines below.
* **Translations:** Everyone uses [the Crowdin workflow](#-content-translation).

<details>

<summary>Contribution Workflow Diagram</summary>

![Image](https://github.com/user-attachments/assets/7410add6-8e1d-4fff-a952-35064563b2df)

</details>

## 📚 How to Contribute to Kaia Docs (Standard Workflow for New / Occasional Contributors)

This is the default process for proposing content changes, suggestions, or reporting issues beyond minor typos.

1. **Read this [Contributing Document](./CONTRIBUTING.md).**
2. **Sign the [Contributor License Agreement (CLA)](https://github.com/kaiachain/kaia-docs/blob/main/.github/CLA.md)** (required for your first PR).
3. **Submit an issue** describing your proposed change or the problem you found, using the proper [label](#️-usage-of-labels). Ensure it's not a duplicate.
4. **Wait for Contribution Approval:** Our moderators will review your issue and update the label to `contribution welcome` if it's ready to be worked on. Please avoid duplicate efforts by checking the issue status before starting your contribution.
5. **Start Contributing:** Once your issue is approved, you can begin working on the changes. Update the issue to inform other contributors that you're actively working on it.
6. **Make a Pull Request (PR):** Ensure your proposed changes are accurate, well-documented, and linked to the corresponding issue. Submit a PR against the `main` branch and wait for code review and approval.
7. **Address Review Feedback:** The reviewer may request additional commits or changes. Be responsive and address their feedback to ensure your contribution aligns with the project's standards.
8. **PR Merge and Branch Deletion:** Once approved, the project moderator will merge your PR into the main branch. You can then safely delete your working branch.
9. **Content Update:** The Kaia Docs website ([https://docs.kaia.io/](https://docs.kaia.io/)) will be updated with your merged contribution.

## 🚀 How to Contribute to Kaia Docs (Expedited Workflow for Internal Maintainers & Recognized Regular Contributors)

To facilitate faster contributions from our core team and trusted community members, internal maintainers and recognized regular contributors **may** submit Pull Requests directly for **Issues and Typos** and **Content Contributions** without creating an issue first.

**Guidelines for Expedited Workflow:**

* **Responsibility:** This privilege comes with the responsibility to ensure clarity, avoid conflicts, and maintain high-quality contributions.
* **Clear PR Descriptions:** Since there's no preceding issue, your PR description **must** provide comprehensive context:
  * Clearly explain the **problem** or **goal**.
  * Detail the **changes** made.
  * Explain the **rationale** behind the change.
* **Check for Conflicts:** Before starting significant work, quickly check open PRs and recent commits to minimize the chance of duplicating effort or creating conflicts.
* **Consider Creating Issues Anyway:** For **large, complex, or potentially controversial changes**, we still **strongly encourage** creating an issue first (even if you start work immediately). This aids visibility, tracking, and allows for asynchronous discussion if needed.
* **Translations Exception:** This expedited workflow **does not apply** to Content Translations, which must follow the Crowdin process (see below).

> [!NOTE]
> The process for recognizing "Regular Contributors" is managed internally by the project maintainers.

## 🧩 Types of Contribution

### 🐞 Issues and Typos (Minor Fixes)

If you spot minor issues in Kaia Docs:

* **For minor typos, broken link fixes, or trivial formatting corrections ONLY:**
  * You **do not** need to create an issue first.
  * You can **submit a Pull Request directly**.
  * In your PR description, clearly state it's a minor fix and check the corresponding box in the PR template.
* **For inaccuracies, unclear sentences, or anything requiring more than a trivial fix:**
  * Please ensure the issue is **not a duplicate** and **not already addressed**.
  * [Submit an issue](https://github.com/kaiachain/kaia-docs/issues) using the `issues-and-typos` label. Wait for feedback or approval before submitting a PR if the fix isn't obvious.

**Please do not use the issue tracker for personal support requests.** Use [dev@kaia.io](mailto:dev@kaia.io) for personal support.

### 📄 Content Contribution (Major Changes)

This includes adding/removing paragraphs or sections, adding new pages, significant rewrites, or adding/removing diagrams.

* Ensure the topic is **not a duplicate** and **not already addressed**.
* **You MUST submit an issue first.** Use the `content-contribution` label.
* **Wait for the issue to be approved** (typically marked with `open/contribution welcome`) before starting work and submitting a PR. This allows for discussion and ensures alignment with project goals.

**Avoid using the issue tracker for personal support requests.** Instead, contact [dev@kaia.io](mailto:dev@kaia.io).

### 🌐 Content Translation

Translation contributions don't involve submitting issues or PRs in the GitHub repository. Instead, they are managed through [Crowdin](https://crowdin.com/project/kaia-docs), a collaborative translation platform.

* **Detailed Guide:** For comprehensive instructions on how to contribute translations, including using Crowdin, understanding Machine Translation usage, and the review process, please refer to our dedicated **[Internationalization](https://docs.kaia.io/misc/internationalization/)** page.
* **When to use GitHub Issues (`content-translation` label):** Use GitHub issues with the `content-translation` label *only* for:
  * Requesting a new language to be added to Crowdin.
  * Reporting widespread, systemic issues within an existing translation.
  * Discussing overall translation strategy or major terminology decisions.
  * *Do not* create issues for suggesting corrections to individual words or sentences – please make those suggestions directly in Crowdin.

> **[!IMPORTANT]**
> **Do not submit Pull Requests directly modifying files within the `/i18n/` directory.** Translation updates are managed automatically via an integration between Crowdin and GitHub. Approved translations in Crowdin trigger an automated PR (named "New Crowdin updates") which is then merged by project moderators.

## 🏷️ Usage of Labels

Proper labeling helps us manage contributions efficiently. Here are the labels used:

### Initial Issue Categories

- **`issues-and-typos`**: Minor content typos and inaccuracies in the source (English) documentation.
- **`content-contribution`**: Major content contributions or changes to the source (English) documentation.
- **`content-translation`**: Used for *tracking* requests for new languages, reporting systemic translation issues, or discussing translation strategy (See [Content Translation](#-content-translation) section). Actual translation happens on Crowdin.

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