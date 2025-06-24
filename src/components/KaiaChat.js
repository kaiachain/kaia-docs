import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Move the actual component into a function that only executes in browser
function KaiaChatBrowser() {
  // Import dynamically to prevent SSR issues
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { ChatbotWidget } = require('@kaiachain/kaia-chat-ui');
  require('@kaiachain/kaia-chat-ui/dist/kaia-chat-ui.css');
  
  return (
    <ChatbotWidget
      apiBaseUrl={customFields.apiBaseUrl}
      agentId={customFields.agentId}
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