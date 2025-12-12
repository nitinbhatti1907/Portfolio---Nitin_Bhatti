// gatsby-browser.js
// Smoothly scroll to in-page anchors and prevent Gatsby's default scroll reset
export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location && location.hash) {
    const el = document.querySelector(location.hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
      return false; // don't reset scroll; we handled it
    }
  }
  return true; // normal behavior when there's no hash
};
