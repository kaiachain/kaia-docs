---
sidebar_label: Embed the widget
---

# Embed the Kaia Bridge widget

The widget puts the Kaia Bridge on your website with one iframe. Your users pick chains and tokens, compare every provider's offer, and sign with their own wallet. You don't need a backend or any bridge code.

## 1. Request a widget key {#request-a-widget-key}

Email [ecosystem@kaia.io](mailto:ecosystem@kaia.io) with your project name and **every website that will show the widget**, as scheme and host, for example `https://app.example.com`. List each subdomain separately. Kaia sends you:

- a **widget key**, `kaia_pk_…`, and
- the embed code.

The widget key is public: it's meant to sit in your page's HTML. It works only inside the Kaia widget, only on the websites you listed, and only with your access settings (providers, chains, tokens and rate limit). It can't be used to call the API from anywhere else.

It isn't the same as an API key (`kaia_…`), which is secret. Never put an API key in a page.

## 2. Add the iframe {#add-the-iframe}

```html
<iframe
  src="https://bridge-aggregator.kaia.io/widget?key=kaia_pk_YOUR_KEY"
  title="Kaia Bridge"
  style="width: 420px; max-width: 100%; height: 640px; border: 0"
  allow="clipboard-write"
></iframe>
```

Browsers show the widget only on the websites you listed. On any other site, the frame stays empty.

### URL parameters {#url-parameters}

| Parameter | Required | What it does |
|-----------|----------|--------------|
| `key` | Yes | Your widget key. If it's missing, wrong or turned off, the widget shows "This widget isn't available". |
| `fromChainId` | No | The source chain to start with, for example `1` for Ethereum. |
| `toChainId` | No | The destination chain to start with. Defaults to Kaia (`8217`). |

Kaia stays on one side of every route. If a user picks another chain on one side, the other side moves to Kaia, and a URL like `?fromChainId=1&toChainId=56` opens as Ethereum → Kaia.

## 3. Let the iframe fit its content (recommended) {#resize}

The widget's height changes as users move through it. The easiest way to keep the iframe the right size is the helper script, which creates the iframe and resizes it for you:

```html
<script src="https://bridge-aggregator.kaia.io/widget-helper.js"></script>
<div id="kaia-bridge-widget"></div>
<script>
  const widget = KaiaBridgeWidget.init({
    container: "#kaia-bridge-widget",
    options: { key: "kaia_pk_YOUR_KEY", fromChainId: 1 },
    minHeight: 560,
  });
  // Later: widget.updateOptions({ fromChainId: 56 }); widget.destroy();
</script>
```

| Option | Default | What it does |
|--------|---------|--------------|
| `container` | (required) | The element, or a CSS selector, to put the iframe in. |
| `options` | (required) | The URL parameters above. `key` is required. |
| `url` | `/widget` on the host the script came from | The widget page. Load the script from the QA host to embed the QA widget. |
| `minHeight` | `560` | The iframe never gets shorter than this, in pixels. |
| `onMessage` | none | Called with each message from the widget. |

If you'd rather write the iframe yourself, listen for the widget's height messages. The widget sends `{ type: "widget-resize", height }` only to your page. Check that each message comes from the widget before using it:

```html
<iframe id="kaia-bridge" src="https://bridge-aggregator.kaia.io/widget?key=kaia_pk_YOUR_KEY"
        title="Kaia Bridge" style="width: 100%; max-width: 480px; height: 640px; border: 0"></iframe>
<script>
  const WIDGET_ORIGIN = "https://bridge-aggregator.kaia.io";
  const frame = document.getElementById("kaia-bridge");
  window.addEventListener("message", (event) => {
    if (event.origin !== WIDGET_ORIGIN || event.source !== frame.contentWindow) return;
    if (event.data?.type === "widget-resize") frame.style.height = Math.max(event.data.height, 560) + "px";
  });
</script>
```

## What your users see {#what-users-see}

- **Bridge:** pick the source and destination, enter an amount, compare every provider's offer (amount received, fee and time), then sign. The widget asks for any token approval first and follows the transfer until it arrives.
- **Wormhole routes:** the widget says up front that there are two steps, sending and then claiming on the destination chain, and shows a **Claim** button when the claim is ready. Transfers waiting to be claimed are listed again if the user comes back later.
- **Swaps on Kaia:** when both sides are Kaia, the widget swaps between Kaia tokens.
- **Earn:** users can deposit USDT on Kaia into SuperEarn. Withdrawals happen on [superearn.io](https://superearn.io/earn/earnusdt).
- **Wallets:** browser-extension wallets (MetaMask, Rabby, Kaia Wallet and others), and WalletConnect for wallet apps on phones. On a phone with no wallet in the browser, the widget offers **Open in MetaMask** or **Open in Kaia Wallet**.
- **No surprise pop-ups:** opening the page never opens the wallet. A returning user whose wallet is unlocked and already approved your site is reconnected quietly.
- **Clear outcomes:** after the user signs, the widget confirms the transaction through the wallet and through public chain RPCs. If nothing confirms within 10 minutes, it shows "Sent, but not confirmed yet" with an explorer link, instead of inviting a second send.

## Security {#security}

- Only the widget key goes in your pages. Keep any API key on your server.
- In your own `message` listener, always check `event.origin` and `event.source`, as shown above.
- Wallet support inside iframes differs between wallets. Before launch, test the wallets your users have on your real domain.
- To add or remove a website, or to replace a leaked widget key, email [ecosystem@kaia.io](mailto:ecosystem@kaia.io). A replaced key stops working at once, so update your embed code at the same time.

## Troubleshooting {#troubleshooting}

| What you see | Likely cause |
|--------------|--------------|
| An empty frame, and the browser console mentions `frame-ancestors` | Your page's exact address isn't on your list. Check `https://` against `http://`, `www.`, subdomains and ports. Changes apply within a minute. |
| "This widget isn't available" | The `key` is missing or mistyped, or the widget was turned off for your project. |
| A chain or token is missing | It isn't in your access settings, or there's no live route to or from Kaia right now. |
| No offers for an amount | The amount is below the providers' minimums. Try a larger amount. |

## Test on QA {#test-on-qa}

Use `https://bridge-aggregator-qa.kaia.io/widget?key=…` with a QA widget key, or load `widget-helper.js` from `https://bridge-aggregator-qa.kaia.io`. QA keys and websites are set up separately from production.
