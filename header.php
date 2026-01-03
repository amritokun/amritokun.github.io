<!DOCTYPE html>
<html <?php language_attributes(); ?> class="light">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <header class="site-header">
        <nav>
            <div class="logo-wrapper">
                <a href="<?php echo home_url(); ?>" class="logo">Lumipuchi</a>
                <span class="logo-tagline">COSMIC CURIOSITIES</span>
            </div>

            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container' => false,
                'menu_class' => 'nav-links',
                'fallback_cb' => false
            ));
            ?>

            <div class="nav-actions">
                <div class="search-container">
                    <form role="search" method="get" class="search-form" action="<?php echo home_url( '/' ); ?>">
                        <input type="search" class="search-input" placeholder="Search stars..." value="<?php echo get_search_query(); ?>" name="s">
                        <button type="button" class="nav-btn" id="search-btn" aria-label="Search">
                            <svg class="nav-icon" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </form>
                </div>

                <?php if (class_exists('WooCommerce')) : ?>
                <a href="<?php echo get_permalink( get_option('woocommerce_myaccount_page_id') ); ?>" class="nav-btn" aria-label="Account">
                    <svg class="nav-icon" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </a>
                <a href="<?php echo wc_get_cart_url(); ?>" class="nav-btn" id="cart-btn" aria-label="View Cart">
                    <svg class="nav-icon" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                </a>
                <?php endif; ?>

                <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode">
                    <svg id="theme-icon" class="nav-icon" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                </button>
            </div>
        </nav>
    </header>