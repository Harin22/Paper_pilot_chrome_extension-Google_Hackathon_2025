// background.js

// 1. Listen for the user clicking the extension icon
chrome.action.onClicked.addListener((tab) => {
  console.log("ICON CLICKED, trying to open panel..."); // We added this line
  chrome.sidePanel.open({ tabId: tab.id });
});