# UI Creation

In this section, we will build our dApp's user interface! We'll create a structured UI system with three main panels for status updates, actions, and minting functionality.

## Setting Up the Main Canvas

First, let's create our base canvas:

1. In the Hierarchy window, right-click on "Sample Scene".
2. Navigate to GameObject → UI → Canvas.

## Creating the Web3UI Container

1. Right-click on your new Canvas.
2. Select "Create Empty".
3. Rename it to "Web3UI".

## Setting Up Main Panels

Inside Web3UI, create three panel objects:

1. Right-click on Web3UI and select "Create Empty".
2. Create and rename these panels:
   - StatusPanel - Your dApp's information display
   - ButtonPanel - For user interactions
   - MintPanel - For token minting features

## Creating Panel Components

### StatusPanel Components

This panel shows all your important Web3 information:

- Right click on StatusPanel, click on UI → Text - TextMeshPro and then rename to StatusText. Make sure to fill the “Text Input” field in the Inspector pane e.g. "Status..."

:::note
**TextMeshPro (TMP) Setup**

When you first create a TextMeshPro element (UI - Text - TextMeshPro), Unity automatically prompts you to import TMP Essentials. If you accidentally skip this prompt, you can manually import it through Window > TextMeshPro > Import TMP Essentials.

Why we need this: TextMeshPro requires core resources (shaders, default fonts, and materials) to properly display text in your game. Without these essentials, your text components won't render correctly and you'll see shader/material errors in your project. This is a one-time setup that's necessary for text to work properly.
:::

![](/img/minidapps/unity-minidapp/status_text.png)

- Right click on StatusPanel, click on UI → Text - TextMeshPro and then rename to AddressText. Make sure to fill the text object e.g "Address Text..."
- Right click on StatusPanel, click on UI → Text - TextMeshPro and then rename to TokenBalanceText. Make sure to fill the text object e.g "0.0000 ET"

```code
├── StatusText (TextMeshPro)
│   └── Default: "Status..."
├── AddressText (TextMeshPro)
│   └── Default: "Address Text..."
└── TokenBalanceText (TextMeshPro)
    └── Default: "0.0000 ET"
```

### ButtonPanel Components

Your main interaction buttons:

- Right click on ButtonPanel, click on UI → Button - TextMeshPro and then rename it to ConnectWalletButton. Make sure to fill the "Text Input" field in the Inspector pane with "Connect Wallet".

- Right click on ButtonPanel, click on UI → Button - TextMeshPro and then rename it to DisconnectWalletButton. Make sure to fill the "Text Input" field in the Inspector pane with “Disconnect Wallet".

```code
ButtonPanel
├── ConnectWalletButton (Button - TextMeshPro)
│   └── Text: "Connect Wallet"
├── DisconnectWalletButton (Button - TextMeshPro)
│   └── Text: "Disconnect Wallet"
```

### MintPanel Components

The token minting interface:

- Right click on MintPanel, click on UI → Input Field → TextMeshPro and then rename to MintAmountInput. Make sure to fill the placeholder object with "Enter Amount…"
- Right click on MintPanel, click on UI → Button → TextMeshPro and then rename to MintButton. Make sure to fill the text object with "Mint"

```code
MintPanel
├── MintAmountInput (Input Field - TextMeshPro)
│   └── Placeholder: "Enter Amount..."
└── MintButton (Button - TextMeshPro)
    └── Text: "Mint"
```

After creating all components, your hierarchy should look like this:

```code
Canvas
└── Web3UI
    ├── StatusPanel
    ├── ButtonPanel
    └── MintPanel
```

![](/img/minidapps/unity-minidapp/unity-ui-canvas.png)

:::note
For your component to be well arranged as seen in the image above, you have to manually arrange them with the icon on the right-hand side when you click on each component.
:::
