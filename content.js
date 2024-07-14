// (function() {
//   // Create the horizontal bar element
//   const bar = document.createElement('div');
//   bar.id = 'horizontalBarOverlay';
//   bar.className = 'horizontal-bar';

//   // Add the bar to the document
//   document.body.appendChild(bar);

//   // Handle bar movement
//   window.addEventListener('mousemove', (event) => {
//     const y = event.clientY;
//     bar.style.top = `${y}px`;
//   });
// })();

// (function() {
//   const topOverlay = document.createElement('div');
//   const bottomOverlay = document.createElement('div');

//   topOverlay.className = 'overlay top-overlay';
//   bottomOverlay.className = 'overlay bottom-overlay';

//   // Add the overlays to the document
//   document.body.appendChild(topOverlay);
//   document.body.appendChild(bottomOverlay);

//   // Handle overlay movement
//   window.addEventListener('mousemove', (event) => {
//     const y = event.clientY;
//     const gap = 50; // Height of the gap around the mouse

//     topOverlay.style.height = `${Math.max(0, y - gap/2)}px`;
//     bottomOverlay.style.top = `${y + gap/2}px`;
//     bottomOverlay.style.height = `${Math.max(0, window.innerHeight - y - gap/2)}px`;
//   });
// })();

(function() {
  // Create two overlay elements
  const topOverlay = document.createElement('div');
  const bottomOverlay = document.createElement('div');

  topOverlay.className = 'overlay top-overlay';
  bottomOverlay.className = 'overlay bottom-overlay';

  // Add the overlays to the document
  document.body.appendChild(topOverlay);
  document.body.appendChild(bottomOverlay);

  // Handle overlay movement
  function updateOverlays(event) {
    const y = event.clientY;
    const gap = 150; // Height of the gap around the mouse

    topOverlay.style.height = `${Math.max(0, y - gap/2)}px`;
    bottomOverlay.style.top = `${y + gap/2}px`;
    bottomOverlay.style.height = `${Math.max(0, window.innerHeight - y - gap/2)}px`;
  }

  window.addEventListener('mousemove', updateOverlays);

  // Initial positioning
  updateOverlays({ clientY: window.innerHeight / 2 });
})();