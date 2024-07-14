let topOverlay, bottomOverlay;
const FONT_SIZE_INCREASE = 150; // 150% of original size

function createOverlays() {
  if (!topOverlay && !bottomOverlay) {
    topOverlay = document.createElement('div');
    bottomOverlay = document.createElement('div');

    topOverlay.className = 'overlay top-overlay';
    bottomOverlay.className = 'overlay bottom-overlay';

    document.body.appendChild(topOverlay);
    document.body.appendChild(bottomOverlay);

    window.addEventListener('mousemove', updateOverlays);
    updateOverlays({ clientY: window.innerHeight / 2 });
  }
  setFontSize(FONT_SIZE_INCREASE);
}

function removeOverlays() {
  if (topOverlay) {
    topOverlay.remove();
    topOverlay = null;
  }
  if (bottomOverlay) {
    bottomOverlay.remove();
    bottomOverlay = null;
  }
  window.removeEventListener('mousemove', updateOverlays);
  setFontSize(100); // Reset to original size
}

function updateOverlays(event) {
  const y = event.clientY;
  const gap = 150;

  topOverlay.style.height = `${Math.max(0, y - gap/2)}px`;
  bottomOverlay.style.top = `${y + gap/2}px`;
  bottomOverlay.style.height = `${Math.max(0, window.innerHeight - y - gap/2)}px`;
}

function setFontSize(size) {
  document.body.style.fontSize = size + '%';
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enable') {
    createOverlays();
  } else if (request.action === 'disable') {
    removeOverlays();
  }
});

// Check if the extension is enabled when the content script loads
chrome.storage.sync.get('isEnabled', (data) => {
  if (data.isEnabled) {
    createOverlays();
  }
});