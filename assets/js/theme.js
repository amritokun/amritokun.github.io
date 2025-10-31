function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;

  if (!toggle || !icon) return;

  const moonIcon = `<path d="M21.64 13a9 9 0 1 1-9-11 7 7 0 0 0 9 11z"/>`;
  const sunIcon = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-6.95-1.41 1.41M6.46 17.54l-1.41 1.41M17.54 17.54l1.41 1.41M6.46 6.46 5.05 5.05"/>`;

  function setTheme(isDark) {
    root.classList.toggle('dark', isDark); // Use the second argument to force state
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    icon.innerHTML = isDark ? sunIcon : moonIcon;
  }

  // Set the correct icon on initial load, but don't re-set the theme class
  if (root.classList.contains('dark')) {
    icon.innerHTML = sunIcon;
  }

  toggle.addEventListener('click', () => setTheme(!root.classList.contains('dark')));
}