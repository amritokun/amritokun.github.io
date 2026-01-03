<?php get_header(); ?>

    <!-- Hero -->
    <section class="hero" data-aos="fade-up">
        <h1>Find Your Sparkle</h1>
        <p>Curated collection of cosmic accessories for the dreamer in you.</p>
        <a href="<?php echo get_permalink( wc_get_page_id( 'shop' ) ); ?>" class="cta-btn">Explore Collection</a>
    </section>

    <!-- Main Content -->
    <main class="container">
        
        <div class="lumipuchi-banner-widget" data-aos="zoom-in">
            <h2 class="widget-title">New Arrivals</h2>
            <p>Check out the latest stardust collection dropping this week!</p>
        </div>

        <!-- Product Grid via WooCommerce Shortcode -->
        <?php echo do_shortcode('[products limit="8" columns="4"]'); ?>
    </main>

<?php get_footer(); ?>