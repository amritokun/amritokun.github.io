document.addEventListener('DOMContentLoaded', () => {
  // These functions are defined in other files (theme.js, cart.js, etc.)
  // and will be available if the files are enqueued correctly.
  if (typeof initTheme === 'function') initTheme();
  if (typeof initCart === 'function') initCart();
  if (typeof initSearch === 'function') initSearch();
  if (typeof initPremiumFeatures === 'function') initPremiumFeatures();
});