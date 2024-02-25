chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    tab.active &&
    tab.url &&
    !tab.url.includes('chrome://') &&
    !tab.contentScriptInjected
  ) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ['content.js'],
      },
      () => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: () => {
            window.contentScriptInjected = true;
          },
        });
      }
    );
  }
});
