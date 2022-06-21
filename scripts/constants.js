var netflixConstants = {
  episodeContainerClass: "titleCardList--container",
  imageClass: "titleCard-imageWrapper",
  titleClass: "titleCard-title_text",
  descriptionClass: "titleCard-synopsis ",
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
  episodeContainerClass: "StandardEmphasisHorizontalTile__container",
  imageClass: "StandardEmphasisHorizontalTileThumbnail__image-container",
  titleClass: "StandardEmphasisHorizontalTileContent__title",
  descriptionClass: "StandardEmphasisHorizontalTileContent__description",
  getProgress: (node) => {
    const progressBar = node.querySelector(".StatusBar__progress");
    if (!progressBar) return 0;

    const percentage = progressBar.getAttribute("aria-label").split("%")?.[0] || "0";


    return parseFloat(percentage);
  }
}

var supportedPlatforms = {
  NETFLIX: netflixConstants,
  HULU: huluConstants,
}

var getWebsite = () => {
  const currentWebsite = window.location.hostname.split(".")[1]?.toUpperCase() || "";
  return supportedPlatforms[currentWebsite] ? currentWebsite : "NETFLIX";
};

var WEBSITE_KEY = getWebsite().toUpperCase();

var currentPlatform = supportedPlatforms[WEBSITE_KEY];
