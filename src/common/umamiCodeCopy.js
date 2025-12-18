import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function handleCopyClick(event) {
  if (!window.umami) return;

  // Detect clicks on Code Hike buttons OR standard Docusaurus copy buttons
  const copyButton = event.target.closest('.ch-code-button') || event.target.closest('.clean-btn'); 
  
  if (!copyButton) return;

  // Attempt to identify the language
  const codeBlock = copyButton.closest('.ch-codeblock') || copyButton.closest('pre');
  let language = 'unknown';

  if (codeBlock) {
    // Check for Code Hike specific attributes or standard class names
    const langMatch = codeBlock.className.match(/language-(\w+)/);
    if (langMatch) language = langMatch[1];
    
    const dataLang = codeBlock.getAttribute('data-language');
    if (dataLang) language = dataLang;
  }

  window.umami.track('code-copy', {
    language,
    page: window.location.pathname,
  });
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('click', handleCopyClick);
}