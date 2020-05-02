chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  console.log(request);

  if (request.clicked) {

    chrome.tabs.query({active: true, currentWindow: true}, 
      function(tabs) {

        //send request to content script
        chrome.tabs.sendRequest(tabs[0].id, {monitor: true}, 
          function(response) {

            //send playbackRate back to popup for display
            if (response) sendResponse({playbackRate: response.playbackRate});
          }
        );
      }
    );

    return true;
  }
  else if (request.found) {

    chrome.runtime.sendMessage(request);
  }
});

