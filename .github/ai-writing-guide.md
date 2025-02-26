# 🤖 Contributing Documentation: AI-Assisted Writing Guide 🚀

Modern technical content creation increasingly benefits from AI-assisted writing tools. AI assistants can significantly reduce the time and effort needed to create comprehensive documentation by generating first drafts quickly with contextual understanding. This approach not only helps contributors overcome writer's block but also enables teams to maintain consistency in style and terminology across large projects.

**GitHub Copilot**, combined with **Visual Studio Code**, provides an ideal environment to showcase these benefits. GitHub Copilot excels at analyzing open text-based files to offer inline suggestions and contextual assistance, making it easier for contributors to draft content from scratch. VS Code, as a widely adopted and versatile editor, offers a seamless integration with Copilot, enhancing its capabilities through features like the enhanced Editor Inline Chat. This makes it a powerful duo for producing high-quality initial drafts of documentation.

This tutorial walks you through setting up your environment for GitHub Copilot-assisted content writing in VS Code. It covers both inline suggestions, how to leverage context from open text-based files, and the enhanced Editor Inline Chat features for more in-depth assistance.

## 📑 Table of Contents

- [Prerequisites](#-prerequisites)
- [Setting Up GitHub Copilot in VS Code](#️-setting-up-github-copilot-in-vs-code)
- [Creating Technical Content with Copilot](#-creating-technical-content-with-copilot)
  - [Using Inline Suggestions](#-using-inline-suggestions)
  - [Leveraging Copilot's Contextual Awareness](#-leveraging-copilots-contextual-awareness)
  - [Utilizing Inline Chat for Complex Requests](#-utilizing-inline-chat-for-complex-requests)
- [Leveraging Documentation Templates](#-leveraging-documentation-templates)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Conclusion](#-conclusion)

## 🔍 Prerequisites

Before getting started, ensure you have:

- [Visual Studio Code](https://code.visualstudio.com/) installed
- An active [GitHub account](https://github.com/)
- A GitHub Copilot subscription (individual or enterprise)
  - Individual subscriptions can be purchased at [github.com/features/copilot](https://github.com/features/copilot).
  - Students can apply for the [GitHub Student Developer Pack](https://education.github.com/pack) for free access.
  - Check with your organization if they provide enterprise access.
- Basic familiarity with Markdown syntax

## ⚙️ Setting Up GitHub Copilot in VS Code

![Image](https://github.com/user-attachments/assets/c3da4ac2-a259-42db-b0bb-355975633c6c)

1. **Install the GitHub Copilot extension**:
   - Run VS Code.
   - Navigate to the Extensions view by clicking the Extensions icon in the Activity Bar.
   - Search for "GitHub Copilot".
   - Click "Install".
   - Make sure to reload VS Code after installation.

2. **Sign in to GitHub**:
   - After installation, you'll be prompted to sign in to your GitHub account.
   - Follow the authentication flow to authorize VS Code to use GitHub Copilot.
   - Once authenticated, you should see a "GitHub Copilot" status icon next to **Command Palette**.
   ![Image](https://github.com/user-attachments/assets/15fd54d6-bf14-49a1-9750-8b8008d996d2)

3. **Verify installation**:
   - Create a new file with a supported extension. (e.g., `.md` for Markdown)
   - Type a comment or some starter text.
   - Copilot should begin offering suggestions. (displayed in light gray text)

## 📝 Creating Technical Content with Copilot

This section provides guidance on effectively using GitHub Copilot to create technical documentation, focusing on a tutorial for deploying smart contracts using Hardhat as an example.

### ✨ Using Inline Suggestions

Copilot offers real-time suggestions as you type, which is particularly useful for technical documentation. Here's how to use this feature effectively:

1. Create a new markdown file.
    - Click **File** > **New File** or press `Ctrl+N` (`Cmd+N` on macOS).
    - Save the file with a `.md` extension (e.g., `smart-contract-tutorial.md`).

2. Begin with a main heading and subheadings for each section. For example, for a Hardhat deployment tutorial:

    ```markdown
    # Deploying Smart Contracts with Hardhat

    ##
    ```

    When you pause after typing this, Copilot will suggest text to complete the heading, such as:

    ```markdown
    # Deploy a Smart Contract Using Hardhat
   
    ## Introduction
    ```

    Accept the suggestion by pressing `Tab` if you like it. If you keep typing sub heading signs (`##`) and accepting without entering text, Copilot will continue to suggest headings based on the context such as:

    ```markdown
    # Deploy a Smart Contract Using Hardhat
   
    ## Introduction

    ## Prerequisites

    ## Setting Up a Hardhat Project

    ## Writing a Simple Smart Contract

    ## Compiling Smart Contracts

    ## Deploying to a Local Network

    ## Deploying to a Testnet

    ## Verifying Your Contract

    ## Conclusion
    ```

3. Add a brief description under each heading to guide Copilot's suggestions.

   ```markdown
   # Deploy a Smart Contract Using Hardhat
   
   ## Introduction
   
   In this tutorial, we will learn how to
   ```

   Then, Copilot will suggest text to complete your sentence, such as:

   ```markdown
   deploy a smart contract on the Ethereum blockchain using Hardhat, a development environment for Ethereum software.
   ```

> [!NOTE]
> **Options for accepting suggestions**:
> - When Copilot shows a suggestion you like, press `Tab` to accept it.
> - Press `Esc` to dismiss a suggestion.
> - Use `Alt+]` (Windows/Linux) or `Option+]` (macOS) to see alternative suggestions.

> [!NOTE]
> **Limitation of inline suggestions**:
>
> Copilot's inline suggestions work best when you're starting a new line or finishing one, but it doesn't give any suggestions when you're typing in the middle of a sentence or paragraph.  This makes it less helpful when you're trying to edit something you've already written.

#### 🎯 Tips for guiding Copilot with prompts

To get the most relevant suggestions from GitHub Copilot for your documentation:

- **Use descriptive prompts** to steer suggestions:
  - Start with clear, specific headings.
  - Begin sentences that hint at what should follow.

- **Focus your prompt on the technical domain**:
  - For blockchain documentation, use relevant terms like "Hardhat," "smart contract," or "Ethereum".
  - Include version numbers when applicable.

- **Structure prompts for the content you want**:
  - For procedures: "To implement X, follow these steps:"
  - For explanations: "Understanding X is important because"
  - For examples: "Here's an example of X in action:"

- **Signal content format with syntax**:
  - For lists, start with a hyphen or number and Copilot will continue the pattern:

    ```markdown
    - Step 1: Install Hardhat
    - Step 2: Create a new project
    ```

  - For code blocks, start with triple backticks and language identifier:

    ```markdown
    ```javascript
    
    ```

- **Adjust your prompt if results aren't satisfactory**:
  - If suggestions are too basic, add technical terms
  - If suggestions are too complex, request simpler explanations

### 🔄 Leveraging Copilot's Contextual Awareness

Copilot analyzes open files to maintain context across your documentation, allowing for more coherent assistance:

> [!NOTE]
> While Copilot considers the context from open files, there are token limits based on the underlying model. This means that if the files are too lengthy or if you're working with many files at once, only a subset of that content may be used for context.

1. Open all files relevant to your current task. This may include:
     - **Documentation:** README.md, API docs, tutorials.
     - **Source Code:** Main scripts, configuration files.
     - **Helper Scripts:** Utility functions, configuration files.
     - **Template Files:** Document templates, boilerplate code.

    For example, when documenting a Hardhat deployment tutorial, open your `hardhat.config.js`, sample contracts, and deployment scripts.

2. Mention specific functions, variables, or concepts that appear in your open files.

    For example, with `hardhat.config.js` open, you might write:

     ```markdown
     ## Configuring Hardhat
     
     As shown in our configuration file, we need to set up the network information:
     ```

    If the `hardhat.config.js` contains a Kairos network configuration, Copilot will likely suggest:

     ```markdown
     ```javascript
      module.exports = {
        solidity: "0.8.17",
        networks: {
          kairos: {
            url: process.env.KAIROS_TESTNET_URL || "",
            gasPrice: 250000000000,
            accounts:
              process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
          }
        }
      };
     ```

    This configuration includes our local Hardhat network for development and the Kairos testnet for testing deployments in a more realistic environment.

> [!TIP]
> **Maintain consistent terminology**:
>
> Copilot will pick up on technical terms you use consistently. For example, if you always refer to "deploying a contract" rather than "publishing a contract," Copilot will maintain this terminology in its suggestions

### 💬 Utilizing Inline Chat for Complex Requests

The **Editor Inline Chat** is a powerful feature that provides a conversational interface for more nuanced and in-depth content refinement. It complements the inline suggestions by allowing interactive modifications and expansions.

#### When to use Inline Chat

- **After Drafting a Section:**
  - Refine or expand upon your hand-written draft for clarity and depth.
  
- **When Encountering Blockers:**
  - Seek detailed assistance when inline suggestions fall short.
  
- **For Interactive Editing:**
  - Engage in a back-and-forth dialogue to iteratively improve content.

#### How to use Inline Chat

1. Highlight the text you want to refine or expand.
2. Press `Ctrl+I` (Windows/Linux) or `Cmd+I` (macOS) to open the Inline Chat. Alternatively, right-click the selected text and click **Copilot** > **Editor Inline Chat**.
3. Enter a specific prompt to guide Copilot in modifying the selected text. Here are some prompt examples:

    - **Improvement Prompt:**
      - `"Rephrase this paragraph to make it more engaging and detailed."`

    - **Expansion Prompt:**
      - `"Expand on the steps for setting up a Hardhat project with more detailed explanations."`

    - **Clarification Prompt:**
      - `"Improve this deployment script with additional error handling and logging."`

4. Review and Accept Suggestions:

    - **Accept:** Apply the suggestion as is.
    - **Retry:** Request alternative suggestions.
    - **Edit:** Manually tweak the suggestion to better fit your needs.

## 📋 Leveraging Documentation Templates

When creating technical content with GitHub Copilot, starting with a well-structured template can significantly improve your results and save time.

One of the best resources for documentation templates is [The Good Docs Project](https://thegooddocsproject.dev/), a community-driven initiative focused on improving documentation quality. The Good Docs Project offers high-quality templates for various documentation types that serve as excellent starting points:

1. **Browse available templates** at [The Good Docs Project repository](https://gitlab.com/tgdp/templates/-/tree/main), including:
   - README templates
   - Tutorial templates
   - API Reference templates
   - Release Notes templates
   - Concept guides
   - How-to guides

2. **Copy the template** in Markdown format and paste it into your VS Code document.

3. **Guide Copilot with the template structure** by placing your cursor within each section and either:
   - Waiting for inline suggestions
   - Using Inline Chat to request specific content for that section

For example, if you're creating a tutorial, you might start with their tutorial template which includes sections for prerequisites, step-by-step instructions, and troubleshooting. This structure gives Copilot clear guidance on what content to generate for each section.

This workflow combines professional documentation standards with Copilot's AI-assisted content generation, resulting in more consistent and complete technical documentation.

## ⭐ Best Practices

For optimal results when using Copilot for documentation:

1. **Start with a clear outline**:
   - Define your document structure before generating content.
   - Use descriptive headings to guide Copilot's suggestions.
   - Consider using templates from The Good Docs Project as starting points.

2. **Be specific in your prompts**:
   - Instead of "Write about testing" try "Explain how to write unit tests for smart contracts using Hardhat's testing framework with Mocha and Chai".

3. **Provide contextual information**:
   - Keep related files open while writing.
   - Reference specific code or concepts from your project.

4. **Review generated content carefully**:
   - Copilot may occasionally generate outdated or incorrect information.
   - Verify technical steps and commands by testing them.
   - Check that code examples are syntactically correct and follow best practices.
   - Pay special attention to security-related content like environment variables and private keys.

5. **Iterate with follow-up requests**:
   - If the first suggestion isn't quite right, use Inline Chat to request improvements.
   - Be specific about what needs to be changed or added.

6. **Maintain a consistent voice**:
   - Edit generated content to match your project's tone and style.
   - Use consistent terminology throughout your documentation.

## 🔧 Troubleshooting

### Copilot isn't offering suggestions in Markdown files.

**Solution**:

- Ensure the GitHub Copilot extension is properly installed and authenticated.
- Check if suggestions are disabled for Markdown in settings.
- Try restarting VS Code.
- Check your subscription status on GitHub.

### Suggestions are irrelevant or off-topic.

**Solution**:

- Provide more context in your document.
- Open relevant files in other tabs.
- Use more specific headings or prompts.
- Try typing more content to give Copilot better context.

### Inline Chat is not available.

**Solution**:

- Make sure you have the latest version of the GitHub Copilot extension.
- Check if Inline Chat is enabled in VS Code settings.
- Try the keyboard shortcut `Ctrl+I` or `Cmd+I`.
- Try reinstalling the extension.

## 🏁 Conclusion

GitHub Copilot is a powerful tool for accelerating technical documentation creation when used effectively. By combining its inline suggestions, contextual awareness, and Inline Chat capabilities, you can quickly generate high-quality first drafts that require minimal editing.

Starting with well-structured templates from resources like The Good Docs Project and then leveraging Copilot to fill in content provides an optimal workflow that balances structural consistency with efficient content generation.

Remember that while Copilot excels at producing well-structured content with appropriate technical details, human oversight remains essential to ensure accuracy, completeness, and alignment with your project's specific needs. Use Copilot as a collaborative assistant rather than a replacement for subject matter expertise.

The process demonstrated with Hardhat in this tutorial can be applied to documenting other technical frameworks and tools. By incorporating Copilot into your documentation workflow, you can significantly reduce the time spent on initial drafting, allowing you to focus more on refining content quality and addressing the unique aspects of your technical project.