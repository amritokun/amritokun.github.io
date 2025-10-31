const createPartials = async () => {
  // Determine the correct base path for fetching partials
  const path = window.location.pathname;
  const isNested = path.includes('/shop/') || path.includes('/contact/');
  const basePath = isNested ? '../' : './';

  // Helper to fetch and insert HTML
  const insertHTML = async (selector, path) => {
    try {
      const response = await fetch(`${basePath}${path}`);
      if (!response.ok) {
        throw new Error(`Failed to load partial ${basePath}${path}: ${response.statusText}`);
      }
      const text = await response.text();
      const element = document.querySelector(selector);
      if (element) {
        element.innerHTML = text;
        return true;
      }
    } catch (error) {
      console.error('Error inserting partial:', error);
    }
  };

  // Load header and footer
  // We wait for the header to load before initializing other scripts
  const headerLoaded = await insertHTML('header.site-header', '_header.html');
  await insertHTML('footer.site-footer', '_footer.html');

  if (headerLoaded) {
    initTheme();
    initCart();
    initSearch();
  }
};

document.addEventListener('DOMContentLoaded', createPartials);