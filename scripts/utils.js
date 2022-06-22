var addClass = (component, cls) => {
  component?.classList?.add(cls);
};

var removeClass = (component, cls) => {
  component?.classList?.remove(cls);
};

var blurText = (component) => {
  addClass(component, "blur-text");
};

var unblurText = (component) => {
  removeClass(component, "blur-text");
};

var blurImage = (component) => {
  addClass(component, "blur-image");
};

var unblurImage = (component) => {
  removeClass(component, "blur-image");
};

var isWatchedEpisode = (card) => {
  const currentProgress = currentPlatform.getProgress(card);
  return currentProgress > 0;
};