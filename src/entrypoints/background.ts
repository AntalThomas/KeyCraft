export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  
  // Handle extension icon click to open popup in new tab
  chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("src/entrypoints/popup/index.html")
    });
  });
});