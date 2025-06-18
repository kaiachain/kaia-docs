import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Move the actual component into a function that only executes in browser
function KaiaChatBrowser() {
  // Import dynamically to prevent SSR issues
  const { ChatbotWidget } = require('@kaiachain/kaia-chat-ui');
  require('@kaiachain/kaia-chat-ui/dist/kaia-chat-ui.css');
  
  return (
    <ChatbotWidget
      apiBaseUrl="https://api-aiagent.dev.kaia.io"
      botName="Kaia Docs Assistant"
      welcomeMessage="Hi! I am {botName}. How can I help you with our documentation today?"
      xLocation="90px"
      yLocation="70px"
      mobileXLocation="90px"
      mobileYLocation="70px"
    />
  );
}

export default function KaiaChat() {
  return (
    <BrowserOnly>
      {() => <KaiaChatBrowser />}
    </BrowserOnly>
  );
}