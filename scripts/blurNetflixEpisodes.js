const episodeCardContainer = "titleCardList--container";
const titleClass = "titleCard-title_text";
const descriptionClass = "titleCard-synopsis";
const imageWrapperClass = "titleCard-imageWrapper";

const NETFLIX = "NETFLIX";
const gettingNetflixBlurs = browser.storage.local.get(NETFLIX);

let isBlurTitle = true;
let isBlurDescription = true;
let isBlurImages = true;

const setFlags = (options) => {
  const { images, descriptions, titles } = options;
  isBlurTitle = titles;
  isBlurDescription = descriptions;
  isBlurImages = images;
};

const isWatchedEpisode = (card) => {
  const progressBar = card.getElementsByTagName("progress")?.[0];
  if (progressBar) {
    const value = parseFloat(progressBar.getAttribute("value") || "0");
    return value > 0.1;
  }
  return false;
};

const addClass = (component, cls) => {
  component.classList.add(cls);
};

const removeClass = (component, cls) => {
  component.classList.remove(cls);
};

const blurText = (component) => {
  addClass(component, "blur-text");
};

const unblurText = (component) => {
  removeClass(component, "blur-text");
};

blurImage = (component) => {
  const img = component.getElementsByTagName("img")?.[0];
  if (img) {
    addClass(img, "blur-image");
  }
};

unblurImage = (component) => {
  const img = component.getElementsByTagName("img")?.[0];
  if (img) {
    removeClass(img, "blur-image");
  }
};

const modifyCard = (card) => {
  if (isWatchedEpisode(card)) {
    return;
  }
  const titleComponent = card.querySelector(`.${titleClass}`);
  const descriptionComponent = card.querySelector(`.${descriptionClass}`);
  const imageComponent = card.querySelector(`.${imageWrapperClass}`);

  isBlurTitle ? blurText(titleComponent) : unblurText(titleComponent);
  isBlurDescription
    ? blurText(descriptionComponent)
    : unblurText(descriptionComponent);
  isBlurImages ? blurImage(imageComponent) : unblurImage(imageComponent);
};

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (!(mutation.addedNodes || mutation.target)) return;
    const nodes = [...mutation.addedNodes];
    if (mutation.target) {
      nodes.push(mutation.target);
    }
    for (const node of nodes) {
      const titleCards = node.querySelectorAll(`.${episodeCardContainer}`);
      for (const card of titleCards) {
        modifyCard(card);
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
});

function updateNetflixBlurs(message) {
  if (message) {
    const titleCards = document.querySelectorAll(`.${episodeCardContainer}`);
    for (const card of titleCards) {
      setFlags(message);
      modifyCard(card);
    }
  }
}

gettingNetflixBlurs.then(
  (blurWebsites) => setFlags(blurWebsites[NETFLIX]),
  console.warn
);

browser.runtime.onMessage.addListener(updateNetflixBlurs);
