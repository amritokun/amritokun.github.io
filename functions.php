<?php

function lumipuchi_theme_setup() {
    // Add support for WooCommerce
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'lumipuchi'),
    ));
add_action('after_setup_theme', 'lumipuchi_theme_setup');

function lumipuchi_enqueue_scripts() {
    // Enqueue the main stylesheet
    wp_enqueue_style('lumipuchi-style', get_stylesheet_uri());

    // Enqueue JavaScript files
    // The 'true' at the end tells WordPress to load them in the footer
    wp_enqueue_script('lumipuchi-theme', get_template_directory_uri() . '/assets/js/theme.js', array(), '1.0', true);
    wp_enqueue_script('lumipuchi-cart', get_template_directory_uri() . '/assets/js/cart.js', array('jquery'), '1.0', true);
    wp_enqueue_script('lumipuchi-search', get_template_directory_uri() . '/assets/js/search.js', array(), '1.0', true);    

    // --- Premium Features ---

    // Enqueue AOS (Animate on Scroll) from a CDN
    wp_enqueue_style('aos-css', 'https://unpkg.com/aos@2.3.1/dist/aos.css', array(), '2.3.1');
    wp_enqueue_script('aos-js', 'https://unpkg.com/aos@2.3.1/dist/aos.js', array(), '2.3.1', true);

    // Enqueue GSAP (GreenSock Animation Platform) from a CDN
    wp_enqueue_script('gsap-js', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js', array(), '3.11.3', true);

    // Enqueue custom styles and scripts for premium features
    wp_enqueue_style('lumipuchi-premium-features', get_template_directory_uri() . '/assets/css/premium-features.css');
    wp_enqueue_script('lumipuchi-premium-features', get_template_directory_uri() . '/assets/js/premium-features.js', array('jquery', 'gsap-js', 'aos-js'), '1.0', true);

    // Initialize scripts
    $init_script = "
        document.addEventListener('DOMContentLoaded', () => { 
            if(typeof initTheme === 'function') initTheme(); 
            if(typeof initSearch === 'function') initSearch(); 
            if(typeof initCart === 'function') initCart(); 
            if(typeof initPremiumFeatures === 'function') initPremiumFeatures(); 
        });
    ";
    wp_add_inline_script('lumipuchi-theme', $init_script);
}
add_action('wp_enqueue_scripts', 'lumipuchi_enqueue_scripts');

if (!function_exists('lumipuchi_remove_downloads_from_account_menu')) {
    /**
     * Remove "Downloads" from My Account menu.
     *
     * @param array $items The original menu items.
     * @return array The modified menu items.
     */
    function lumipuchi_remove_downloads_from_account_menu($items) {
        unset($items['downloads']);
        return $items;
	}
    add_filter('woocommerce_account_menu_items', 'lumipuchi_remove_downloads_from_account_menu');
}

if (!function_exists('lumipuchi_add_floating_dashboard')) {
    /**
     * Adds the HTML for the floating user dashboard to the footer.
     */
    function lumipuchi_add_floating_dashboard() {
        if (is_user_logged_in()) {
            echo '<div id="floating-user-dashboard" class="floating-user-dashboard"><button class="dashboard-toggle">👤</button><div class="dashboard-content"><p>Loading...</p></div></div>';
        }
    }
    add_action('wp_footer', 'lumipuchi_add_floating_dashboard');
}