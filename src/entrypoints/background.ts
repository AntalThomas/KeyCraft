export default defineBackground(() => {
  browser.action.onClicked.addListener((tab) => {
    const uiPage = browser.runtime.getURL("/popup.html"); 
    browser.tabs.create({ url: uiPage });
  });
});