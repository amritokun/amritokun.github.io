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
    // If the search bar is active, the click should submit the form.
    // If it's not active, prevent form submission and show the bar.
    if (!searchContainer.classList.contains('active')) {
        e.preventDefault();
        searchContainer.classList.add('active');
        searchInput.focus();
    }
  });

  // Close search bar when clicking outside
  document.addEventListener('click', (e) => {
    if (searchContainer.classList.contains('active') && !searchContainer.contains(e.target)) {
      searchContainer.classList.remove('active');
    }
  });
}