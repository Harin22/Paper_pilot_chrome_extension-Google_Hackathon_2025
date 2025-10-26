
chrome.action.onClicked.addListener((tab) => {
  console.log("ICON CLICKED, trying to open panel..."); // added for backup
  chrome.sidePanel.open({ tabId: tab.id });

});
