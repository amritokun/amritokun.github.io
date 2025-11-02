<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Lumipuchi
 */

?>

	</main><!-- #main -->
</div><!-- #page -->

<footer id="colophon" class="site-footer">
    <div class="footer-grid container">
        <div class="footer-section">
            <h3>About LumiPuchi</h3>
            <p>Your one-stop shop for all things cute, cozy, and kawaii. We bring you the most adorable plushies and charms to brighten your day. 💖</p>
        </div>
        <div class="footer-section">
            <h3>Quick Links</h3>
            <ul class="footer-links">
                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>shop/">Shop</a></li>
                <li><a href="<?php echo esc_url( get_permalink( get_option('woocommerce_myaccount_page_id') ) ); ?>">My Account</a></li>
                <li><a href="<?php echo esc_url( get_permalink( get_option('woocommerce_cart_page_id') ) ); ?>">Cart</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Follow Us</h3>
            <p>Stay in touch for new arrivals and special offers!</p>
            <div class="social-links">
                <a href="#" aria-label="Instagram">
                    <svg class="nav-icon" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" aria-label="Twitter">
                    <svg class="nav-icon" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                <a href="#" aria-label="Pinterest">
                     <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12.017 1.993c-5.425 0-9.81 4.385-9.81 9.81 0 4.23 2.67 7.85 6.355 9.186-.05-.38-.013-.83.09-1.2l1.23-5.21c.2-.84.05-1.84-.6-2.48-1.033-1.01-1.21-2.43-.4-3.55 1.12-1.55 3.13-1.28 4.2.25.9 1.3.14 4.4-.9 5.55-1.2 1.3-2.92.5-3.45-.95-.2-.55-.05-1.1.2-1.6.3-.6 1-1.2 1-2.2 0-1.9-1.3-3.3-3.1-3.3-2.3 0-3.9 1.7-3.9 3.8 0 .8.3 1.8.7 2.3.05.07.05.14.03.2l-.2.8c-.05.2-.15.25-.3.15-1.3-.8-2.1-2.5-2.1-4.2 0-3.3 2.6-6.3 6.9-6.3 3.6 0 6.4 2.5 6.4 5.9 0 3.7-2.1 6.6-5.2 6.6-1.7 0-3-1.4-2.6-3 .5-1.6 1.4-3.3 1.4-4.4 0-1.2-.6-2.2-1.8-2.2-1.4 0-2.5 1.5-2.5 3.1 0 1.2.4 2.1.9 2.7.1.1.1.2.1.3l-.3 1.3c-.02.1-.05.1-.1.05-1.1-.5-1.7-1.9-1.7-3.1 0-2.3 1.7-4.8 5.2-4.8 2.8 0 5 2 5 4.9 0 2.9-1.7 5.3-4.1 5.3-.8 0-1.5-.4-1.8-.9l-.5 1.8c-.2.8-.7 1.9-1.1 2.5.9.3 1.9.4 2.9.4 5.425 0 9.81-4.385 9.81-9.81s-4.385-9.81-9.81-9.81z"></path></svg>
                </a>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; <?php echo date('Y'); ?> LumiPuchi. All Rights Reserved. ✨</p>
    </div>
</footer><!-- #colophon -->

<?php wp_footer(); ?>

</body>
</html>