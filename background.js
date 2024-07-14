// chrome.action.onClicked.addListener((tab) => {
//   console.log('Extension clicked. Tab ID:', tab.id);
//   // Check if the tab's URL is a valid web URL (not chrome://, about://, etc.)
//   const url = new URL(tab.url);
//   if (url.protocol === 'http:' || url.protocol === 'https:') {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ['content.js']
//     });
//   } else {
//     console.warn('Cannot inject script into special pages.');
//   }
// });
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

chrome.action.onClicked.addListener((tab) => {
  const url = new URL(tab.url);
  if (url.protocol === 'http:' || url.protocol === 'https:') {
    chrome.storage.sync.get('isEnabled', (data) => {
      const newState = !data.isEnabled;
      chrome.storage.sync.set({ isEnabled: newState }, () => {
        if (newState) {
          injectContentScript(tab.id);
        }
        chrome.tabs.sendMessage(tab.id, { action: newState ? 'enable' : 'disable' });
      });
    });
  } else {
    console.warn('Cannot inject script into special pages.');
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith('http')) {
    chrome.storage.sync.get('isEnabled', (data) => {
      if (data.isEnabled) {
        injectContentScript(tabId);
      }
    });
  }
});