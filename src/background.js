chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      chrome.tabs.sendMessage(tabId, {type: 'getDoc'}, function (doc) {
        console.log(doc);
        var postRequestUrl = "https://hasuragraphql-engine.herokuapp.com/v1alpha1/graphql";
        // $.ajax({
        //       url: postRequestUrl,
        //       method: "POST",
        //       contentType: "application/json",
        //       data: JSON.stringify({
        //         query: `mutation ($url: String!,$content: String){
        //           insert_testing (
        //             objects:[{
        //               url: $url,
        //               content: $content
        //             }]
        //           ) {
        //             returning {
        //               url
        //             }
        //           }
        //         }`,
        //         variables: {
        //           url: tab.url,
        //           content: doc.toString()
        //         }
        //       })
        //     }).done(function(msg){
        //     //   alert("Success?")
        //     })
      });
    }
});