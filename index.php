<?php get_header(); ?>

<main class="container" style="padding-top: 4rem; padding-bottom: 4rem;">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) : the_post();
            the_content();
        endwhile;
    else :
        echo '<p>No content found</p>';
    endif;
    ?>
</main>

<?php get_footer(); ?>