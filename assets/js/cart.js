const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const clearCartBtn = document.getElementById('clear-cart');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <button onclick="removeItem('${item.id}')">&times;</button>
    `;
    cartItemsContainer.appendChild(el);
  });
  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = cart.length;
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

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
  }
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => addToCart(btn));
});

cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'flex';
});

cartModal.addEventListener('click', e => {
  if (e.target === cartModal) cartModal.style.display = 'none';
});

clearCartBtn.addEventListener('click', clearCart);

window.addEventListener('DOMContentLoaded', updateCartUI);

// expose for inline remove
window.removeItem = removeItem;
