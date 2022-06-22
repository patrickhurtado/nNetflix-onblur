import store from "store";

const sendMessageToTabs = (tabs: any, message: any) => {
  for (let tab of tabs) {
    // @ts-ignore
    chrome.tabs.sendMessage(tab.id, message);
  }
};

export const sendMessageToBackground = async (
  message: any,
  callback = () => { }
) => {
  //@ts-ignore
  const sendMessage = chrome.runtime.sendMessage(message, callback);
};

export const sendMessageToContentScripts = async (
  message: any,
  callback = () => { }
) => {
  // //@ts-ignore
  // const sendMessage = chrome.tabs.sendMessage(message);
  // return sendMessage.then(callback, console.log);

  //@ts-ignore
  return chrome.tabs
    .query({
      currentWindow: true,
      active: true,
      url: ["*://*.netflix.com/*", "*://*.hulu.com/*", "*://*.disneyplus.com/*"],
    }, (tabs) => sendMessageToTabs(tabs, message));
};

export const getLocalStorage = (key: any) => {
  return store.get(key);
};

export const setLocalStorage = async (key: any, content: any) => {
  //@ts-ignore
  chrome.storage.local.set({ [key]: content });
  return store.set(key, content);
};
