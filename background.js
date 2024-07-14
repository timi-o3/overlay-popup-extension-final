chrome.action.onClicked.addListener((tab) => {
  console.log('Extension clicked. Tab ID:', tab.id);
  // Check if the tab's URL is a valid web URL (not chrome://, about://, etc.)
  const url = new URL(tab.url);
  if (url.protocol === 'http:' || url.protocol === 'https:') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  } else {
    console.warn('Cannot inject script into special pages.');
  }
});
