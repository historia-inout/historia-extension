chrome.extension.onMessage.addListener(function(request, sender, response) {
  if (request.type === 'getDoc') {
    response(document.body.innerHTML);
  }

  return true;
});