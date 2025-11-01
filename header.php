<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <?php wp_head(); ?>
  <script>
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  </script>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
  <nav>
    <div class="logo-wrapper">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">lumipuchi</a>
      <span class="logo-tagline">handpicked kawaii items</span>
    </div>
    <ul class="nav-links"></ul>
    <div class="nav-actions">
      <div class="search-container">
        <input type="search" id="search-input" class="search-input" placeholder="Search products...">
        <button id="search-btn" class="nav-btn" aria-label="Search">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </div>
      <button id="cart-btn" class="nav-btn" aria-label="View cart">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.65 16h9.7a2 2 0 0 0 1.97-1.61L23 6H6"/>
        </svg>
      </button>
      <button id="theme-toggle" class="nav-btn" aria-label="Toggle dark mode">
        <svg id="theme-icon" class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21.64 13a9 9 0 1 1-9-11 7 7 0 0 0 9 11z"/>
        </svg>
      </button>
      <a href="<?php echo esc_url(get_permalink(get_option('woocommerce_myaccount_page_id'))); ?>" class="nav-btn" aria-label="My Account">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
        </svg>
      </a>
    </div>
  </nav>
</header>

<main>