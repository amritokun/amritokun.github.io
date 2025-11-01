function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;

  if (!toggle || !icon) return;

  const moonIcon = `<path d="M21.64 13a9 9 0 1 1-9-11 7 7 0 0 0 9 11z"/>`;
  const sunIcon = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-6.95-1.41 1.41M6.46 17.54l-1.41 1.41M17.54 17.54l1.41 1.41M6.46 6.46 5.05 5.05"/>`;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    icon.innerHTML = isDark ? sunIcon : moonIcon;
  }

  function setTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }

  // Set initial theme based on localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(prefersDark.matches ? 'dark' : 'light');
  }

  // Listen for system preference changes
  prefersDark.addEventListener('change', (e) => {
    // Only change if no manual override is set
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  toggle.addEventListener('click', () => {
    const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
  });
}