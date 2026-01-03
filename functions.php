<?php
function lumipuchi_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('woocommerce');
    
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'lumipuchi'),
    ));
}
add_action('after_setup_theme', 'lumipuchi_setup');

function lumipuchi_scripts() {
    // Fonts
    wp_enqueue_style('lumipuchi-fonts', 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Quicksand:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&family=Cormorant+Garamond:wght@400;500;600&display=swap');
    
    // AOS
    wp_enqueue_style('aos-css', 'https://unpkg.com/aos@2.3.1/dist/aos.css');
    wp_enqueue_script('aos-js', 'https://unpkg.com/aos@2.3.1/dist/aos.js', array(), null, true);
    
    // GSAP
    wp_enqueue_script('gsap-js', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js', array(), null, true);
    
    // Main Style
    wp_enqueue_style('lumipuchi-style', get_stylesheet_uri());
    
    // Main Script
    wp_enqueue_script('lumipuchi-script', get_template_directory_uri() . '/script.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'lumipuchi_scripts');
?>