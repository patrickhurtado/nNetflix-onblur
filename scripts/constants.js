var netflixConstants = {
  episodeContainer: ".titleCardList--container",
  getImage: (card) => card.querySelector(`.titleCard-imageWrapper`),
  getTitle: (card) => card.querySelector(`.titleCard-title_text`),
  getDescription: (card) => card.querySelector(`.titleCard-synopsis`),
  getProgress: (node) => {
    const progressBar = node.getElementsByTagName("progress")?.[0];
    if (progressBar) {
      const value = parseFloat(progressBar.getAttribute("value") || "0");
      return value;
    }
    return 0;
  }
};

var huluConstants = {
  episodeContainer: ".StandardEmphasisHorizontalTile__container",
  getImage: (card) => card.querySelector(`.StandardEmphasisHorizontalTileThumbnail__image-container`),
  getTitle: (card) => card.querySelector(`.StandardEmphasisHorizontalTileContent__title`),
  getDescription: (card) => card.querySelector(`.StandardEmphasisHorizontalTileContent__description`),
  getProgress: (node) => {
    const progressBar = node.querySelector(".StatusBar__progress");
    if (!progressBar) return 0;

    const percentage = progressBar.getAttribute("aria-label").split("%")?.[0] || "0";


    return parseFloat(percentage);
  }
}

var disneyplusConstants = {
  episodeContainer: "a[data-gv2elementkey=contentTile]",
  getImage: (card) => card.querySelector(`.image-container`),
  getTitle: (card) => card.querySelector(`b`),
  getDescription: (card) => card.getElementsByClassName(`metadata text-color--secondary text--left`)?.[0],
  getProgress: (node) => {
    const progressBar = node.getElementsByTagName("progress")?.[0];
    if (progressBar) {
      const maxValue = parseFloat(progressBar.getAttribute("max") || "1");
      const currentValue = parseFloat(progressBar.getAttribute("value") || "0");

      return currentValue / maxValue;
    }
    return 0;
  }
};

var supportedPlatforms = {
  NETFLIX: netflixConstants,
  HULU: huluConstants,
  DISNEYPLUS: disneyplusConstants,
}

var getWebsite = () => {
  const currentWebsite = window.location.hostname.split(".")[1]?.toUpperCase() || "";
  return supportedPlatforms[currentWebsite] ? currentWebsite : "NETFLIX";
};

var WEBSITE_KEY = getWebsite().toUpperCase();

var currentPlatform = supportedPlatforms[WEBSITE_KEY];
