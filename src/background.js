chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      chrome.tabs.sendMessage(tabId, {type: 'getDoc'}, function (doc) {
        console.log(doc);
        console.log(tab.url);
        if(!tab.url.includes("localhost") && !tab.url.includes("/chrome")){
          var postRequestUrl = "http://localhost:8000/scrape/";
          $.ajax({
                url: postRequestUrl,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    url: tab.url
                })
              }).done(function(msg){
                console.log(msg);
              //   alert("Success?")
              })
        }
      });
    }
});