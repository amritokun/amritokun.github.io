/**
 * Lumipuchi Main Application
 * Core functionality and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initMobileMenu();
  initSearch();
  initProductFilters();
  initQuickView();
  initTestimonialSlider();
  initNewsletterForm();
  initContactForm();
  initScrollAnimations();
  init3DCategoryCards();
});

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
      });
    });
  }
}

// Search Functionality
function initSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchContainer = document.querySelector('.search-container');
  const searchInput = document.querySelector('.search-input');

  if (searchBtn && searchContainer) {
    searchBtn.addEventListener('click', () => {
      searchContainer.classList.toggle('active');
      if (searchContainer.classList.contains('active') && searchInput) {
        searchInput.focus();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target)) {
        searchContainer.classList.remove('active');
      }
    });

    // Search functionality
    if (searchInput) {
      searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim().toLowerCase();
          filterProducts(query);
        }
      });
    }
  }
}

// Product Filtering
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter products
      const filter = btn.dataset.filter;
      filterProductsByCategory(filter);
    });
  });
}

function filterProductsByCategory(category) {
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const productCategory = product.dataset.category;

    if (category === 'all' || productCategory === category) {
      product.style.display = '';
      product.style.animation = 'fadeIn 0.5s ease forwards';
    } else {
      product.style.display = 'none';
    }
  });
}

function filterProducts(query) {
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const name = product.querySelector('.product-name').textContent.toLowerCase();
    const desc = product.querySelector('.product-description').textContent.toLowerCase();

    if (name.includes(query) || desc.includes(query)) {
      product.style.display = '';
      product.style.animation = 'fadeIn 0.5s ease forwards';
    } else {
      product.style.display = 'none';
    }
  });
}

// Quick View Modal
function initQuickView() {
  const modal = document.getElementById('quick-view-modal');
  const overlay = document.getElementById('quick-view-overlay');
  const closeBtn = document.getElementById('close-quick-view');

  // Product data (in real app, this would come from API)
  const products = {
    1: { id: 1, name: 'Nebula Dreams', category: 'Cosmic Series', description: 'Hand-painted galaxy swirls that capture the essence of distant nebulae. Each piece is unique, featuring mesmerizing purples, pinks, and cosmic dust.', price: 599 },
    2: { id: 2, name: 'Cherry Blossom', category: 'Nature Collection', description: 'Delicate sakura petals preserved in crystal-clear resin. Brings the tranquility of Japanese spring to your everyday carry.', price: 499 },
    3: { id: 3, name: 'Golden Hour', category: 'Minimal Series', description: 'Pure elegance in brushed gold. Minimalist design that speaks volumes about sophisticated taste.', price: 899 },
    4: { id: 4, name: 'Aurora Borealis', category: 'Cosmic Series', description: 'The northern lights captured in a stunning display of greens and blues. Limited edition with holographic effects.', price: 1299 },
    5: { id: 5, name: 'Ocean Wave', category: 'Nature Collection', description: 'Resin-encased sea elements with real beach sand. Feel the ocean breeze every time you reach for your keys.', price: 749 },
    6: { id: 6, name: 'Diamond Dust', category: 'Limited Edition', description: 'Crystalline perfection with embedded micro-diamonds. The ultimate statement piece for those who demand the extraordinary.', price: 1999 }
  };

  // Open quick view
  document.addEventListener('click', (e) => {
    const quickViewBtn = e.target.closest('.quick-view-btn');
    if (quickViewBtn && modal) {
      const productId = quickViewBtn.dataset.id;
      const product = products[productId];

      if (product) {
        document.getElementById('qv-category').textContent = product.category;
        document.getElementById('qv-name').textContent = product.name;
        document.getElementById('qv-description').textContent = product.description;
        document.getElementById('qv-price').textContent = `₹${product.price.toLocaleString()}`;
        document.getElementById('qv-quantity').value = 1;

        // Store product data for add to cart
        const addBtn = document.getElementById('qv-add-to-cart');
        if (addBtn) {
          addBtn.dataset.id = product.id;
          addBtn.dataset.name = product.name;
          addBtn.dataset.price = product.price;
          addBtn.dataset.image = 'assets/images/keychain.jpg';
        }

        // Initialize 3D viewer for this product
        if (window.lumipuchi3D && window.lumipuchi3D.createProductViewer) {
          window.lumipuchi3D.createProductViewer(parseInt(productId));
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  // Close quick view
  if (closeBtn) {
    closeBtn.addEventListener('click', closeQuickView);
  }

  if (overlay) {
    overlay.addEventListener('click', closeQuickView);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
    }
  });

  // Quantity controls
  const minusBtn = document.querySelector('.qv-quantity .minus');
  const plusBtn = document.querySelector('.qv-quantity .plus');
  const quantityInput = document.getElementById('qv-quantity');

  if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener('click', () => {
      quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
    });

    plusBtn.addEventListener('click', () => {
      quantityInput.value = Math.min(10, parseInt(quantityInput.value) + 1);
    });
  }

  // Add to cart from quick view
  const qvAddToCart = document.getElementById('qv-add-to-cart');
  if (qvAddToCart) {
    qvAddToCart.addEventListener('click', () => {
      const { id, name, price, image } = qvAddToCart.dataset;
      const quantity = parseInt(document.getElementById('qv-quantity').value) || 1;

      if (window.cart) {
        window.cart.addItem(id, name, price, image, quantity);
        closeQuickView();
      }
    });
  }
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Testimonial Slider
function initTestimonialSlider() {
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');

  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const cards = track.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;

  function getCardsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function updateSlider() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    currentIndex = Math.min(currentIndex, maxIndex);

    const cardWidth = cards[0].offsetWidth + 32; // Including gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    const maxIndex = totalCards - cardsPerView;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  window.addEventListener('resize', updateSlider);

  // Auto-slide
  setInterval(() => {
    const cardsPerView = getCardsPerView();
    const maxIndex = totalCards - cardsPerView;
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }, 5000);
}

// Newsletter Form
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;

      // Simulate API call
      form.innerHTML = `
        <div class="success-message">
          <span>🎉</span>
          <p>Thanks for subscribing! Check your email for your 10% discount code.</p>
        </div>
      `;
    });
  }
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;

      // Simulate API call
      if (window.cart) {
        window.cart.showToast('Message sent successfully!');
      }

      form.reset();
    });
  }
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });

  // Add animate-in class styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Hide scroll indicator after scroll
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    });
  }
}

// 3D Category Cards Tilt Effect
function init3DCategoryCards() {
  const cards = document.querySelectorAll('.category-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Parallax effect for hero
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.scrollY;
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
  }
});