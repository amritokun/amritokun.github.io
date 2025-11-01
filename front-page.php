<?php get_header(); ?>

  <section class="hero">
    <h1>lumipuchi.</h1>
    <p>handpicked kawaii items and cozy decor to brighten your space.</p>
  </section>

  <div class="container">
    <h2>Featured Products</h2>
    <div class="product-grid">
        <?php
            $args = array(
                'post_type' => 'product',
                'posts_per_page' => 4,
                'features' => true,
            );
            $loop = new WP_Query($args);
            if ($loop->have_posts()) {
                while ($loop->have_posts()) : $loop->the_post();
                    wc_get_template_part('content', 'product');
                endwhile;
            } else {
                echo __('No products found');
            }
            wp_reset_postdata();
        ?>
    </div><!--/.products-->
  </div>

<?php get_footer(); ?>