document.addEventListener('selectionchange', function () {
  var selectedText = window.getSelection().toString();
  if (selectedText) {
    chrome.runtime.sendMessage({ selectedText });
  }
});
