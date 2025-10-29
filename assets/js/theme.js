const toggle = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');
const root = document.documentElement;

const moonIcon = `<path d="M21.75 15.5A9 9 0 0 1 12 3a9 9 0 1 0 9.75 12.5z"/>`;
const sunIcon = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-6.95-1.41 1.41M6.46 17.54l-1.41 1.41M17.54 17.54l1.41 1.41M6.46 6.46 5.05 5.05"/>`;

function setTheme(isDark) {
  root.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  icon.innerHTML = isDark ? sunIcon : moonIcon;
}

const saved = localStorage.getItem('theme') === 'dark';
setTheme(saved);

toggle.addEventListener('click', () => setTheme(!root.classList.contains('dark')));