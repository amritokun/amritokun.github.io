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
    wp_enqueue_script('lumipuchi-cart', get_template_directory_uri() . '/assets/js/cart.js', array(), '1.0', true);
    wp_enqueue_script('lumipuchi-search', get_template_directory_uri() . '/assets/js/search.js', array(), '1.0', true);

    $init_script = "document.addEventListener('DOMContentLoaded', () => { if(typeof initTheme === 'function') initTheme(); if(typeof initSearch === 'function') initSearch(); if(typeof initCart === 'function') initCart(); });";
    wp_add_inline_script('lumipuchi-theme', $init_script);
}
add_action('wp_enqueue_scripts', 'lumipuchi_enqueue_scripts');