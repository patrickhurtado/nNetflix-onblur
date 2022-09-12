let isBlurTitle = true;
let isBlurDescription = true;
let isBlurImages = true;

const setFlags = (
  options = { images: true, descriptions: true, titles: true }
) => {
  const { images, descriptions, titles } = options;
  isBlurTitle = titles;
  isBlurDescription = descriptions;
  isBlurImages = images;
};

const updateEpisodeList = (nodes) => {
  for (const node of nodes) {
    if (!node) {
      continue;
    }

    const cardContainer = `${supportedPlatforms[WEBSITE_KEY].episodeContainer}`;

    const titleCards = node.querySelectorAll(cardContainer);

    // Check direct changes
    for (const card of titleCards) {
      modifyCard(card);
    }

    // Check parent changes
    const parentCard = node.closest(cardContainer);
    if (parentCard) {
      modifyCard(parentCard);
    }
  }
};

const modifyCard = (card) => {
  const titleComponent = currentPlatform.getTitle(card);
  const descriptionComponent = currentPlatform.getDescription(card);
  const imageComponent = currentPlatform.getImage(card);
  if (!(titleComponent && descriptionComponent && imageComponent)) {
    return;
  }

  if (isWatchedEpisode(card)) {
    unblurText(titleComponent);
    unblurText(descriptionComponent);
    unblurImage(imageComponent);
    return;
  }

  isBlurTitle && titleComponent
    ? blurText(titleComponent)
    : unblurText(titleComponent);

  isBlurDescription && descriptionComponent
    ? blurText(descriptionComponent)
    : unblurText(descriptionComponent);

  isBlurImages && imageComponent
    ? blurImage(imageComponent)
    : unblurImage(imageComponent);
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

function updateBlurs(message) {
  if (message[WEBSITE_KEY]) {
    const episodes = document.querySelectorAll(
      `${currentPlatform.episodeContainer}`
    );
    for (const card of episodes) {
      setFlags(message[WEBSITE_KEY]);
      modifyCard(card);
    }
  }
}

chrome.storage.local.get(WEBSITE_KEY, (blurWebsites) =>
  setFlags(blurWebsites[WEBSITE_KEY])
);

chrome.runtime.onMessage.addListener(updateBlurs);
