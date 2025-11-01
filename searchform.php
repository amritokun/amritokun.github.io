<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <input type="search" id="search-input" class="search-input" placeholder="<?php esc_attr_e('Search products...', 'lumipuchi'); ?>" value="<?php echo get_search_query(); ?>" name="s" title="<?php esc_attr_e('Search for:', 'lumipuchi'); ?>" />
    <input type="hidden" name="post_type" value="product" />
    <button type="submit" id="search-btn" class="nav-btn" aria-label="Search">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </button>
</form>