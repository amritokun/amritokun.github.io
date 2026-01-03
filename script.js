document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    // Check local storage
    if (localStorage.getItem('theme') === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
    }

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

    // Search Toggle
    const searchBtn = document.getElementById('search-btn');
    const searchContainer = document.querySelector('.search-container');
    
    searchBtn.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            document.querySelector('.search-input').focus();
        }
    });

    // Cart Modal
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    function openCart() {
        cartModal.classList.add('active');
    }

    function closeCartModal() {
        cartModal.classList.remove('active');
    }

    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    cartOverlay.addEventListener('click', closeCartModal);

    // Add to Cart Animation (Simple)
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = btn.innerText;
            btn.innerText = 'Added!';
            btn.style.background = 'var(--primary-2)';
            
            // Shake animation using GSAP
            gsap.to(btn, { x: [-5, 5, -5, 5, 0], duration: 0.4 });

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                openCart(); // Open cart to show item
            }, 1000);
        });
    });
});