function initSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchContainer = document.querySelector('.search-container');
  const searchInput = document.getElementById('search-input');

  if (!searchBtn || !searchInput || !searchContainer) {
    console.log('Search elements not found, skipping init.');
    return;
  }

  // Toggle search bar visibility
  searchBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click from closing the bar immediately
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
      searchInput.focus();
    }
  });

  // Client-side product filtering
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    const productCards = productGrid.querySelectorAll('.card');

    productCards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent.toLowerCase() || '';
      const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
      card.style.display = isVisible ? '' : 'none';
    });
  });

  // Close search bar when clicking outside
  document.addEventListener('click', (e) => {
    if (searchContainer.classList.contains('active') && !searchContainer.contains(e.target)) {
      searchContainer.classList.remove('active');
    }
  });
}