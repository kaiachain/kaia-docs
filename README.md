# Kaia Docs

Welcome to the Kaia documentation repository! This repo contains the source files for the official Kaia documentation available at https://docs.kaia.io.

## Contributing

We welcome contributions to help us improve and expand the Kaia documentation. There are a few ways you can contribute:

### Contributing to Documentation

Whether fixing a typo, suggesting an improvement, or adding new content, your help is valuable.

* **Minor fixes** (typos, broken links) can be submitted directly via Pull Request by anyone.
* For **other changes**, the standard process involves submitting an Issue first.
* Internal maintainers and recognized regular contributors may have an expedited workflow for all types of changes.

Please see our detailed **[Contributing Guide](https://github.com/kaiachain/kaia-docs/blob/main/CONTRIBUTING.md)** for the full workflows, issue labeling, and guidelines applicable to all contributors.

### Contributing Translations

Kaia docs is available in the following languages:

- English
- 한국어
- 日本語
- 简体中文
- 繁體中文
- Tiếng Việt

If you are fluent in another language and want to contribute translations or improve existing ones:

1. **Use Crowdin:** All translation contributions are managed via the **[Kaia-Docs Crowdin project](https://crowdin.com/project/kaia-docs)**.
2. **Read the Guide:** Please refer to the detailed **[Internationalization](https://docs.kaia.io/misc/internationalization/)** page on our documentation site for step-by-step instructions on how to join, translate, and understand the process (including Machine Translation usage and review).
3. Use GitHub issues with the `content-translation` label *only* for requesting new languages or reporting major, systemic translation problems. Do not use issues for suggesting individual string changes.

> [!IMPORTANT]
> Do not submit Pull Requests directly modifying translation files in the `i18n` directory.

## Developing Kaia Docs

This website is built using Docusaurus v3.

### Installation

```
$ npm i
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true npm run deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
