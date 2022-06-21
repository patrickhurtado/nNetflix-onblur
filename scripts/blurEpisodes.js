
let isBlurTitle = true;
let isBlurDescription = true;
let isBlurImages = true;

const setFlags = (options = { images: true, descriptions: true, titles: true }) => {
  const { images, descriptions, titles } = options;
  isBlurTitle = titles;
  isBlurDescription = descriptions;
  isBlurImages = images;
};

const isWatchedEpisode = (card) => {
  const currentProgress = currentPlatform.getProgress(card);
  return currentProgress > 0;
};

const addClass = (component, cls) => {
  component?.classList.add(cls);
};

const removeClass = (component, cls) => {
  component?.classList.remove(cls);
};

const blurText = (component) => {
  addClass(component, "blur-text");
};

const unblurText = (component) => {
  removeClass(component, "blur-text");
};

blurImage = (component) => {
  addClass(component, "blur-image");
};

unblurImage = (component) => {
  removeClass(component, "blur-image");
};

const updateEpisodeList = (nodes) => {
  for (const node of nodes) {
    if (!node) {
      continue;
    };

    const cardContainer = `.${supportedPlatforms[WEBSITE_KEY].episodeContainerClass}`;

    const titleCards = node.querySelectorAll(cardContainer);

    // Check direct changes
    for (const card of titleCards) {
      modifyCard(card);
    }

    // Check parent changes
    const parentCard = node.closest(cardContainer);
    if (parentCard) {
      modifyCard(parentCard);
    };
  }
};

const modifyCard = (card) => {

  const { titleClass, descriptionClass, imageClass } = supportedPlatforms[WEBSITE_KEY];

  const titleComponent = card.querySelector(`.${titleClass}`);
  const descriptionComponent = card.querySelector(`.${descriptionClass}`);
  const imageComponent = card.querySelector(`.${imageClass}`);
  if (!(titleComponent && descriptionComponent && imageComponent)) {
    return;
  };

  if (isWatchedEpisode(card)) {
    unblurText(titleComponent);
    unblurText(descriptionComponent);
    unblurImage(imageComponent);
    return;
  }

  isBlurTitle && titleComponent ? blurText(titleComponent) : unblurText(titleComponent);
  isBlurDescription && descriptionComponent
    ? blurText(descriptionComponent)
    : unblurText(descriptionComponent);
  isBlurImages && imageComponent ? blurImage(imageComponent) : unblurImage(imageComponent);
};

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {

    if (!(mutation.addedNodes || mutation.target)) return;

    const nodes = [...mutation.addedNodes];

    if (mutation.target) {
      nodes.push(mutation.target);
    }

    updateEpisodeList(nodes);
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
    const titleCards = document.querySelectorAll(`.${currentPlatform.episodeContainerClass}`);
    for (const card of titleCards) {
      setFlags(message);
      modifyCard(card);
    }
  }
}

chrome.storage.local.get(WEBSITE_KEY, (blurWebsites) => setFlags(blurWebsites[WEBSITE_KEY]));

chrome.runtime.onMessage.addListener(updateNetflixBlurs);
