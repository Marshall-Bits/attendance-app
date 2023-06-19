document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: 'performAction' });
      });
    });
  });