// document.addEventListener('DOMContentLoaded', function() {
//     var toggleButton = document.getElementById('toggleButton');
    
//     chrome.storage.sync.get('isEnabled', function(data) {
//       toggleButton.textContent = data.isEnabled ? 'Turn Off' : 'Turn On';
//     });
  
//     toggleButton.addEventListener('click', function() {
//       chrome.storage.sync.get('isEnabled', function(data) {
//         var isEnabled = !data.isEnabled;
//         chrome.storage.sync.set({isEnabled: isEnabled}, function() {
//           toggleButton.textContent = isEnabled ? 'Turn Off' : 'Turn On';
//           chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {action: isEnabled ? 'enable' : 'disable'});
//           });
//         });
//       });
//     });
//   });x