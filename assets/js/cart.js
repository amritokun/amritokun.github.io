/**
 * Lumipuchi Cart System
 * Full cart functionality with localStorage persistence
 */

class LumipuchiCart {
  constructor() {
    this.items = [];
    this.loadCart();
    this.bindEvents();
    this.updateCartUI();
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const saved = localStorage.getItem('lumipuchi_cart');
      this.items = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to load cart:', e);
      this.items = [];
    }
  }

  // Save cart to localStorage
  saveCart() {
    try {
      localStorage.setItem('lumipuchi_cart', JSON.stringify(this.items));
    } catch (e) {
      console.warn('Failed to save cart:', e);
    }
  }

  // Add item to cart
  addItem(id, name, price, image, quantity = 1) {
    const existingItem = this.items.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ id, name, price: parseFloat(price), image, quantity });
    }

    this.saveCart();
    this.updateCartUI();
    this.showToast(`${name} added to cart!`);
  }

  // Remove item from cart
  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
    this.updateCartUI();
  }

  // Update item quantity
  updateQuantity(id, quantity) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
      this.updateCartUI();
    }
  }

  // Clear all items
  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartUI();
    this.showToast('Cart cleared');
  }

  // Get cart total
  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Get total items count
  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Update all cart UI elements
  updateCartUI() {
    this.updateCartBadge();
    this.updateCartModal();
    this.updateCheckoutPage();
  }

  // Update cart badge count
  updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
      const count = this.getItemCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  // Update cart modal content
  updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItems) return;

    if (this.items.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart">
          <span class="empty-cart-icon">🛒</span>
          <p>Your cart is empty</p>
          <a href="#products" class="cta-btn secondary" onclick="closeCartModal()">Start Shopping</a>
        </div>
      `;
    } else {
      cartItems.innerHTML = this.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span>₹${item.price.toLocaleString()} × ${item.quantity}</span>
          </div>
          <button class="remove-item" onclick="cart.removeItem('${item.id}')" title="Remove">×</button>
        </div>
      `).join('');
    }

    if (cartTotal) {
      cartTotal.textContent = `₹${this.getTotal().toLocaleString()}`;
    }
  }

  // Update checkout page if we're on it
  updateCheckoutPage() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');

    if (!checkoutItems) return;

    if (this.items.length === 0) {
      checkoutItems.innerHTML = '<p class="empty-message">No items in cart. <a href="index.html#products">Continue shopping</a></p>';
    } else {
      checkoutItems.innerHTML = this.items.map(item => `
        <div class="checkout-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="checkout-item-info">
            <h4>${item.name}</h4>
            <div class="quantity-control">
              <button class="qty-btn minus" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn plus" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            </div>
          </div>
          <div class="checkout-item-price">
            <span>₹${(item.price * item.quantity).toLocaleString()}</span>
            <button class="remove-btn" onclick="cart.removeItem('${item.id}')">Remove</button>
          </div>
        </div>
      `).join('');
    }

    const subtotal = this.getTotal();
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;

    if (checkoutSubtotal) {
      checkoutSubtotal.textContent = `₹${subtotal.toLocaleString()}`;
    }

    const shippingEl = document.getElementById('checkout-shipping');
    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
    }

    if (checkoutTotal) {
      checkoutTotal.textContent = `₹${total.toLocaleString()}`;
    }
  }

  // Show toast notification
  showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Bind event listeners
  bindEvents() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.add-to-cart-btn');
      if (addBtn) {
        e.preventDefault();
        const { id, name, price, image } = addBtn.dataset;
        this.addItem(id, name, price, image);
      }
    });

    // Cart modal toggle
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const clearCartBtn = document.getElementById('clear-cart');

    if (cartBtn && cartModal) {
      cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeCart) {
      closeCart.addEventListener('click', () => closeCartModal());
    }

    if (cartOverlay) {
      cartOverlay.addEventListener('click', () => closeCartModal());
    }

    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => this.clearCart());
    }

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartModal();
      }
    });
  }
}

// Close cart modal helper
function closeCartModal() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize cart
const cart = new LumipuchiCart();

// Export for global use
window.cart = cart;
window.closeCartModal = closeCartModal;