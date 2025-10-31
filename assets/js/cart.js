let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// rebuild cart UI
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">your cart’s empty ✨</p>`;
  }

  cart.forEach(item => {
    total += item.price;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>₹${item.price}</span>
      </div>
      <button class="remove-btn" aria-label="Remove" onclick="removeItem('${item.id}')">&times;</button>
    `;
    cartItemsContainer.appendChild(el);
  });

  if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
}

// remove single item
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

// clear cart
function clearCart() {
  cart = [];
  saveCart();
}

// add item
function addToCart(btn) {
  const item = {
    id: btn.dataset.id,
    name: btn.dataset.name,
    price: parseFloat(btn.dataset.price),
    image: btn.dataset.image
  };

  if (!cart.some(p => p.id === item.id)) {
    cart.push(item);
    saveCart();

    // subtle add animation
    btn.textContent = "Added ✓";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Add to cart";
      btn.disabled = false;
    }, 1200);
  }
}

function initCart() {
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const clearCartBtn = document.getElementById('clear-cart');
  const closeCart = document.getElementById('close-cart');
  const overlay = document.querySelector('.cart-overlay');

  // attach event listeners
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn));
  });

  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      cartModal.classList.add('active');
    });
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => {
      cartModal.classList.remove('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      cartModal.classList.remove('active');
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }

  // init on load
  updateCartUI();
}