// (function() {
//   // Create two overlay elements
//   const topOverlay = document.createElement('div');
//   const bottomOverlay = document.createElement('div');

//   topOverlay.className = 'overlay top-overlay';
//   bottomOverlay.className = 'overlay bottom-overlay';

//   // Add the overlays to the document
//   document.body.appendChild(topOverlay);
//   document.body.appendChild(bottomOverlay);

//   // Handle overlay movement
//   function updateOverlays(event) {
//     const y = event.clientY;
//     const gap = 150; // Height of the gap around the mouse

//     topOverlay.style.height = `${Math.max(0, y - gap/2)}px`;
//     bottomOverlay.style.top = `${y + gap/2}px`;
//     bottomOverlay.style.height = `${Math.max(0, window.innerHeight - y - gap/2)}px`;
//   }

//   window.addEventListener('mousemove', updateOverlays);

//   // Initial positioning
//   updateOverlays({ clientY: window.innerHeight / 2 });
// })();

let topOverlay, bottomOverlay;

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
}

function updateOverlays(event) {
  const y = event.clientY;
  const gap = 150;

  topOverlay.style.height = `${Math.max(0, y - gap/2)}px`;
  bottomOverlay.style.top = `${y + gap/2}px`;
  bottomOverlay.style.height = `${Math.max(0, window.innerHeight - y - gap/2)}px`;
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