var IS_CHROME = !browser;
var browser = browser || chrome;

function handleMessage(message, sender, sendResponse) {
  console.log("handleMessage");
  const { titles, descriptions, images } = message;
  //sendResponse({ response: "Response from background script" });
}

chrome.runtime.onMessage.addListener(handleMessage);
