import store from "store";

const sendMessageToTabs = (tabs: any, message: any) => {
  for (let tab of tabs) {
    // @ts-ignore
    browser.tabs.sendMessage(tab.id, message);
  }
};

export const sendMessageToBackground = async (
  message: any,
  callback = () => {}
) => {
  //@ts-ignore
  const sendMessage = browser.runtime.sendMessage(message);
  return sendMessage.then(callback, console.log);
};

export const sendMessageToContentScripts = async (
  message: any,
  callback = () => {}
) => {
  // //@ts-ignore
  // const sendMessage = browser.tabs.sendMessage(message);
  // return sendMessage.then(callback, console.log);

  //@ts-ignore
  return browser.tabs
    .query({
      currentWindow: true,
      active: true,
      url: "*://*.netflix.com/*",
    })
    .then((tabs: any) => sendMessageToTabs(tabs, message));
};

export const getLocalStorage = (key: any) => {
  return store.get(key);
};

export const setLocalStorage = async (key: any, content: any) => {
  //@ts-ignore
  browser.storage.local.set({ [key]: content });
  return store.set(key, content);
};
