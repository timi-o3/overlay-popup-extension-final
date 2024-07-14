chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ isEnabled: false });
});

function injectContentScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js']
  });
  chrome.scripting.insertCSS({
    target: { tabId: tabId },
    files: ['overlay.css']
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith('http')) {
    chrome.storage.sync.get('isEnabled', (data) => {
      if (data.isEnabled) {
        injectContentScript(tabId);
      }
    });
  }
});