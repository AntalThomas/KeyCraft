export default defineBackground(() => {
<<<<<<< HEAD
  browser.action.onClicked.addListener((tab) => {
    const uiPage = browser.runtime.getURL("/popup.html"); 
    browser.tabs.create({ url: uiPage });
=======
  console.log('Hello background!', { id: browser.runtime.id });
  
  // Handle extension icon click to open popup in new tab
  chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("src/entrypoints/popup/index.html")
    });
>>>>>>> 50a7445bc0cbb1c9666ddbe21f478d5310948a19
  });
});