// Keeps tab open when clicking off the browser
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("src/entrypoints/popup/index.html")
  });
});
