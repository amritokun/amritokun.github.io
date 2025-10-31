<?php
defined('ABSPATH') || exit;

global $product;

// Ensure visibility.
if (empty($product) || !$product->is_visible()) {
    return;
}
?>
<div <?php wc_product_class('card', $product); ?>>
    <?php echo woocommerce_get_product_thumbnail(); ?>
    <div class="card-content">
        <h3><a href="<?php echo esc_url($product->get_permalink()); ?>"><?php echo $product->get_name(); ?></a></h3>
        <p><?php echo esc_html(wp_strip_all_tags($product->get_short_description())); ?></p>
        <div class="price">
            <?php echo $product->get_price_html(); ?>
        </div>
        <?php woocommerce_template_loop_add_to_cart(); ?>
    </div>
</div>