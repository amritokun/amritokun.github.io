<?php

function lumipuchi_theme_setup() {
    // Add support for WooCommerce
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}
add_action('after_setup_theme', 'lumipuchi_theme_setup');

function lumipuchi_enqueue_scripts() {
    // Enqueue the main stylesheet
    wp_enqueue_style('lumipuchi-style', get_stylesheet_uri());

    // Enqueue JavaScript files
    // The 'true' at the end tells WordPress to load them in the footer
    wp_enqueue_script('lumipuchi-theme', get_template_directory_uri() . '/assets/js/theme.js', array(), '1.0', true);
    wp_enqueue_script('lumipuchi-search', get_template_directory_uri() . '/assets/js/search.js', array(), '1.0', true);

    // Note: cart.js will be replaced by WooCommerce's built-in functionality,
    // so we don't enqueue it here.
}
add_action('wp_enqueue_scripts', 'lumipuchi_enqueue_scripts');

?>