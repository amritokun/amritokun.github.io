document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    });

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    // Check local storage for theme
    if (localStorage.getItem('theme') === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                html.classList.add('light');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                html.classList.remove('light');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Search Toggle Logic ---
    const searchBtn = document.getElementById('search-btn');
    const searchContainer = document.querySelector('.search-container');
    
    if (searchBtn && searchContainer) {
        searchBtn.addEventListener('click', () => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                document.querySelector('.search-input').focus();
            }
        });
    }

    // --- Cart Logic (LocalStorage) ---
    let cart = JSON.parse(localStorage.getItem('lumipuchi_cart')) || [];

    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalEl = document.querySelector('.cart-total');
    const clearCartBtn = document.querySelector('.clear-btn');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    // Open/Close Modal
    function openCart() {
        if(cartModal) cartModal.classList.add('active');
    }

    function closeCartModal() {
        if(cartModal) cartModal.classList.remove('active');
    }

    if(cartBtn) cartBtn.addEventListener('click', openCart);
    if(closeCart) closeCart.addEventListener('click', closeCartModal);
    if(cartOverlay) cartOverlay.addEventListener('click', closeCartModal);

    // Save Cart
    function saveCart() {
        localStorage.setItem('lumipuchi_cart', JSON.stringify(cart));
        renderCart();
    }

    // Render Cart UI (Modal & Page)
    function renderCart() {
        let total = 0;
        
        // 1. Update Modal
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<div class="empty-cart-msg" style="text-align:center; padding: 2rem; color: var(--muted);">Your cart is empty ✨</div>';
            } else {
                cart.forEach((item, index) => {
                    total += parseFloat(item.price) * item.qty;
                    const itemEl = document.createElement('div');
                    itemEl.classList.add('cart-item');
                    itemEl.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <span>$${item.price} x ${item.qty}</span>
                        </div>
                        <button class="remove-item" data-index="${index}" aria-label="Remove item">&times;</button>
                    `;
                    cartItemsContainer.appendChild(itemEl);
                });
            }
        }

        // Update Modal Total
        if (cartTotalEl) {
            cartTotalEl.textContent = '$' + total.toFixed(2);
        }

        // 2. Update Cart Page (if exists)
        const cartTableBody = document.getElementById('cart-table-body');
        const pageSubtotal = document.getElementById('cart-subtotal');
        const pageTotal = document.getElementById('cart-total-page');

        if (cartTableBody) {
            cartTableBody.innerHTML = '';
            if (cart.length === 0) {
                cartTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 2rem;">Your cart is empty. <a href="index.html#shop">Go shopping!</a></td></tr>';
            } else {
                cart.forEach((item, index) => {
                    const row = document.createElement('tr');
                    row.classList.add('woocommerce-cart-form__cart-item', 'cart_item');
                    row.innerHTML = `
                        <td class="product-remove">
                            <a href="#" class="remove remove-item" data-index="${index}" aria-label="Remove this item">&times;</a>
                        </td>
                        <td class="product-thumbnail">
                            <img src="${item.image}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" style="width:60px; border-radius:8px;">
                        </td>
                        <td class="product-name" data-title="Product">
                            <a href="#">${item.name}</a>
                        </td>
                        <td class="product-price" data-title="Price">
                            <span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>${item.price}</bdi></span>
                        </td>
                        <td class="product-quantity" data-title="Quantity">
                            <div class="quantity">
                                <input type="number" class="input-text qty text" value="${item.qty}" readonly style="width:50px; text-align:center;">
                            </div>
                        </td>
                        <td class="product-subtotal" data-title="Subtotal">
                            <span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>${(item.price * item.qty).toFixed(2)}</bdi></span>
                        </td>
                    `;
                    cartTableBody.appendChild(row);
                });
            }
            if(pageSubtotal) pageSubtotal.textContent = total.toFixed(2);
            if(pageTotal) pageTotal.textContent = total.toFixed(2);
        }

        // Re-attach remove listeners
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                saveCart();
            });
        });
    }

    // Add to Cart Logic
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const product = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: btn.dataset.price,
                image: btn.dataset.image,
                qty: 1
            };

            // Check if exists
            const existing = cart.find(item => item.id === product.id);
            if (existing) {
                existing.qty++;
            } else {
                cart.push(product);
            }
            saveCart();

            // Animation
            const originalText = btn.innerText;
            btn.innerText = 'Added!';
            btn.style.background = 'var(--primary-2)';
            gsap.to(btn, { x: [-5, 5, -5, 5, 0], duration: 0.4 });

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                openCart(); // Open cart to show item
            }, 1000);
        });
    });

    // Clear Cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            saveCart();
        });
    }

    // Initial Render
    renderCart();
});