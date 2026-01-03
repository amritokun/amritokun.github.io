    <footer class="site-footer">
        <div class="footer-grid">
            <div class="footer-section">
                <h3>Lumipuchi</h3>
                <p>Bringing a little bit of magic to your everyday life through curated accessories.</p>
            </div>
            <div class="footer-section">
                <h3>Shop</h3>
                <ul class="footer-links">
                    <li><a href="<?php echo get_permalink( wc_get_page_id( 'shop' ) ); ?>">All Products</a></li>
                    <li><a href="<?php echo get_permalink( wc_get_page_id( 'myaccount' ) ); ?>">My Account</a></li>
                    <li><a href="<?php echo get_permalink( wc_get_page_id( 'cart' ) ); ?>">Cart</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Connect</h3>
                <div class="social-links">
                    <a href="#" aria-label="Instagram"><svg class="nav-icon" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                    <a href="#" aria-label="Twitter"><svg class="nav-icon" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; <?php echo date('Y'); ?> Lumipuchi. All rights reserved.
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>