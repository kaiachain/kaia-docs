# Contributing Guidelines

Thank you for your interest in contributing to Kaia Docs. As an open source project, Kaia Docs is always open to the developer community and we welcome your contribution. Please read the guideline below and follow it in all interactions with the project.

## How to Contribute on Kaia Docs

1. Read this [contributing document](./CONTRIBUTING.md).
2. Sign [Contributor Licensing Agreement (CLA)](#contributor-license-agreement-cla).
3. Submit an issue with a proper [labelling](#usage-of-labels).
4. Wait for contribution approval: The project moderators will review your issue and update the label to `contribution welcome` if it's ready to be worked on. Please avoid duplicate efforts by checking the issue status before starting your contribution.
5. Start contributing: Once your issue is approved, you can start working on the changes. Update the issue to inform other contributors that you're actively working on it.
6. Make a Pull Request (PR): Ensure your proposed changes are accurate, well-documented, and linked to the corresponding issue. Submit a PR against the `main` branch and wait for code review and approval.
7. Address review feedback: The reviewer may request additional commits or changes. Be responsive and address their feedback to ensure your contribution aligns with the project's standards.
8. PR merge and branch deletion: Once approved, the project moderator will merge your PR into the main branch. You can then safely delete your working branch.
9. Content update: The Kaia Docs website (https://docs.kaia.io/) will be updated with your merged contribution.

## Types of Contribution

There are various ways to contribute and participate. Please read the guidelines below regarding the process of each type of contribution.

- [Issues and Typos](#issues-and-typos)
- [Content Contribution](#content-contribution)
- [Content Translation](#content-translation)

### Issues and Typos

If you could identify issues and typos in Kaia docs, before submitting an issue, please invest some extra time to figure out that:

- The issue is not a duplicate issue.
- The issue has not been covered in the latest release of Kaia Docs.
- The issue covers minor typos or errors on the existing content of Kaia Docs.
Please do not use the issue tracker for personal support requests. Use developers@klaytn.foundation for the personal support requests.

After confirming your report meets the above criteria, [submit the issue](https://github.com/kaiachain/kaia-docs/issues). Please use [labels](#usage-of-labels) to specify your issue as `issues-and-typos`.

### Content Contribution

If you would recommend major content change in Kaia docs, before submitting an issue, please invest some extra time to figure out that:

- The issue is not a duplicate issue.
- The issue has not been covered in the latest release of Kaia Docs.
- The issue covers major content change (e.g. Adding/removing paragraph and chapter in Kaia Docs, adding/removing graphical explanation, etc.) on the existing content of Kaia Docs.
Please do not use the issue tracker for personal support requests. Use developers@klaytn.foundation for the personal support requests.

After confirming your report meets the above criteria, [submit the issue](https://github.com/kaiachain/kaia-docs/issues). Please use [labels](#usage-of-labels) to specify your issue as `content-contribution`.

### Content Translation

If you are fluent in a language other than English and want to contribute translations or improve the localized documentation, [submit an issue](https://github.com/kaiachain/kaia-docs/issues). Please use [labels](#usage-of-labels) to specify your issue as `content-translation`.

You need to use the [Crowdin](https://crowdin.com/project/klaytn-docs) platform to contribute translations. For more information, see the [Internationalization](https://docs.klaytn.foundation/docs/misc/internationalization/) page.

> [!IMPORTANT]  
> For content translation, avoid using a pull request to submit changes by modifying the files under the [i18n](https://github.com/klaytn/klaytn-docs/tree/main/i18n) directory directly. </br> </br> Unlike other types of contribution, the translations are managed by Crowdin localization management platform. If a translation is submitted and has been approved in Crowdin, an automated PR will be made to Kaia docs repo. Once the PR is approved and merged by the project moderators, the localized Kaia docs will be updated with the suggested changes (merged content).

## Usage of Labels

You can use the following labels:

Labels for initial issue categories:

- issue/issues-and-typos: Issues with the minor content typos and inaccuracy.
- issue/content-contribution: Issues with major content contributions.
- issue/content-translation: Issues with content translations.

Status of open issues (will be tagged by the project moderators):

- (no label): The default status.
- open/need more information : The issue's creator needs to provide additional information to review.
- open/reviewing: The issue is under review.
- open/re-label needed: The label needs to be changed to confirmed as being a `issues-and-typos`, future `content-contribution`, or `content-translation`.
- open/contribution welcome: The content fix or update is approved and you are invited to contribute to it.

Status of closed issues:

- closed/fixed: A fix for the issue was provided.
- closed/duplicate: The issue is also reported in a different issue and is being managed there.
- closed/invalid: The issue is not applicable to the Kaia Docs.
- closed/reject: The issue is rejected after review.

## Additional Contribution Guidelines

Here are some additional guidelines to follow when contributing to Kaia Docs:

### Commit Messages

- Start with a capitalized and imperative verb. Examples include "Update", "Fix", "Add", "Improve", etc.
- Use a consistent format for commit messages. A common pattern is "verb: description of change" (for example, "Update contract addresses for Kaia chain").
- Keep the subject line short and descriptive. It should clearly communicate the scope and focus of the change.

### Build and Dependencies

If your contribution involves adding new code or dependencies, ensure the project continues to build successfully after your changes by running a build command (for example, `npm run build`).

### Image Optimization

- Keep all images optimized and compressed to minimize file size (under 30kb whenever possible). This helps to improve website loading speed and keeps the repository size manageable.
- Consider using tools like [Trimage](https://trimage.org/) to optimize your images.

## Contributor License Agreement (CLA)

Keep in mind when you submit your pull request, you'll need to sign the CLA via [CLA-Assistant](https://cla-assistant.io/klaytn/klaytn-docs) for legal purposes. You will have to sign the CLA just one time, either as an individual or corporation.

You will be also prompted to sign the agreement by CLA Assistant (bot) when you open a Pull Request for the first time. Post the comment "I have read the CLA Document and I hereby sign the CLA" in the PR.