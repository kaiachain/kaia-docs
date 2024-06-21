# Kaia Docs

Welcome to the Kaia documentation repository! This repo contains the source files for the official Kaia documentation available at https://docs.kaia.io.

<!---
## Contributing

We welcome contributions to help us improve and expand the Kaia documentation. There are a few ways you can contribute:

### Contributing to Documentation

If you find issues in the docs or have suggestions for improvements, please open an issue or submit a pull request. See our [Contributing Guide](https://github.com/klaytn/klaytn-docs/blob/main/CONTRIBUTING.md) for more details on the contribution workflow.

Before submitting PRs, make sure to:

- Create an issue with an appropriate [label](https://github.com/klaytn/klaytn-docs/blob/main/CONTRIBUTING.md#usage-of-labels).
- Provide a clear and detailed description of the changes.
- Reference any related issues or pull requests.
- Ensure your changes render correctly and pass all tests.

### Contributing Translations

Kaia docs is available in the following languages:

- English
- 한국어
- Tiếng Việt

If you are fluent in a language other than English and want to contribute translations or improve the localized documentation, see the [Internationalization](https://docs.klaytn.foundation/docs/misc/internationalization/) page for details on how to contribute translations via Crowdin.

Some key points:

- Create an issue with the `content-translation` label.
- Join the translator team on the [Kaia-Docs Crowdin project](https://crowdin.com/project/klaytn-docs).
- Select the language you want to contribute to.
- Choose the files to translate or vote on translations.
- Ensure your word choices conform to the Kaia Terminologies.
- Be respectful and follow the translation Code of Conduct.

Translation suggestions will be reviewed by the maintainers and made available on the localized doc sites when approved and merged.

-->
## Developing Kaia Docs

This website is built using Docusaurus v3.

### Installation

```
$ yarn
```

### Environment variables

Copy and Configure environment variables

```
cp .env.examples .env
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.