function handleMessage(message, sender, sendResponse) {
  console.log("handleMessage");
  const { titles, descriptions, images } = message;
  //sendResponse({ response: "Response from background script" });
}

browser.runtime.onMessage.addListener(handleMessage);
