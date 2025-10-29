// apply theme early to reduce flash
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark-preload');
}

const toggle = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');
const body = document.body;

const moonIcon = `<path d="M12 3a9 9 0 0 0 0 18c4.97 0 9-4.03 9-9 0-.46-.04-.91-.1-1.35A6.5 6.5 0 0 1 12 3z"/>`;
const sunIcon = `<path d="M12 4.5V2m0 20v-2.5M4.5 12H2m20 0h-2.5M5.64 5.64 4.22 4.22m15.56 15.56-1.42-1.42M18.36 5.64l1.42-1.42M5.64 18.36l-1.42 1.42M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>`;

function setTheme(isDark) {
  body.classList.toggle('dark', isDark);
  icon.innerHTML = isDark ? sunIcon : moonIcon;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// load saved preference
const saved = localStorage.getItem('theme') === 'dark';
setTheme(saved);

// toggle on click
toggle.addEventListener('click', () => setTheme(!body.classList.contains('dark')));