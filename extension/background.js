chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'performAction') {
      // Perform the desired action here
      console.log('Action performed');
    }
  });