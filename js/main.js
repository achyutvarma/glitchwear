// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .product-card, .cat-card, .size-chip, .filter-tab').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '28px';
    cursor.style.height = '28px';
    cursorRing.style.width = '60px';
    cursorRing.style.height = '60px';
    cursorRing.style.borderColor = 'var(--acid-yellow)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '16px';
    cursor.style.height = '16px';
    cursorRing.style.width = '40px';
    cursorRing.style.height = '40px';
    cursorRing.style.borderColor = 'var(--hot-pink)';
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(5,5,5,0.97)';
  } else {
    navbar.style.background = 'rgba(10,10,10,0.85)';
  }
});

// ===== MOBILE NAV =====
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileNav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('glitchwear_cart') || '[]');
const cartDrawer = document.querySelector('.cart-drawer');
const cartBackdrop = document.querySelector('.cart-backdrop');
const cartCountBadge = document.querySelector('.cart-count');

function saveCart() {
  localStorage.setItem('glitchwear_cart', JSON.stringify(cart));
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountBadge.textContent = total;
  cartCountBadge.style.display = total > 0 ? 'flex' : 'none';
}

function openCart() {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.add('open');
  renderCart();
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.remove('open');
}

document.querySelector('.cart-btn').addEventListener('click', openCart);
document.querySelector('.cart-close').addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);

function renderCart() {
  const cartItems = document.querySelector('.cart-items');
  const cartEmpty = document.querySelector('.cart-empty');
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotalAmount = document.querySelector('.cart-total-amount');

  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartFooter.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'block';

  const existingItems = cartItems.querySelectorAll('.cart-item');
  existingItems.forEach(el => el.remove());

  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="cart-item-img" style="background:${item.color};display:flex;align-items:center;justify-content:center;font-size:2rem;">${item.emoji}</div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-size">Size: ${item.size}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</div>
    `;
    cartItems.appendChild(itemEl);
  });

  cartTotalAmount.textContent = '₹' + total.toLocaleString();
}

window.changeQty = (idx, delta) => {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart();
  updateCartCount();
  renderCart();
};

// ===== ADD TO CART =====
function addToCart(name, price, size, color, emoji) {
  const existingIdx = cart.findIndex(item => item.name === name && item.size === size);
  if (existingIdx >= 0) {
    cart[existingIdx].qty++;
  } else {
    cart.push({ name, price, size, color, emoji, qty: 1 });
  }
  saveCart();
  updateCartCount();
  showToast(`${name} added to cart!`);
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.querySelector('.toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== CHECKOUT =====
document.querySelector('.checkout-btn').addEventListener('click', () => {
  if (cart.length > 0) {
    showToast('Redirecting to checkout...');
    setTimeout(() => {
      alert('🔥 Checkout coming soon! Stay glitched.');
    }, 1500);
  }
});

// ===== FILTER TABS =====
const filterTabs = document.querySelectorAll('.filter-tab');
const productCards = document.querySelectorAll('.product-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ===== SIZE SELECTION =====
document.querySelectorAll('.product-card').forEach(card => {
  const sizeChips = card.querySelectorAll('.size-chip');
  sizeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      sizeChips.forEach(c => c.style.borderColor = '');
      chip.style.borderColor = 'var(--acid-yellow)';
      chip.style.color = 'var(--acid-yellow)';
      card.dataset.selectedSize = chip.textContent;
    });
  });
});

// ===== ADD TO CART BUTTONS =====
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const name = card.querySelector('.product-name').textContent;
    const priceText = card.querySelector('.product-price').textContent.replace('₹', '').replace(',', '');
    const price = parseInt(priceText);
    const selectedSize = card.dataset.selectedSize || 'M';
    const color = card.dataset.color || '#161616';
    const emoji = card.dataset.emoji || '👕';
    addToCart(name, price, selectedSize, color, emoji);
  });
});

// ===== WISHLIST =====
let wishlist = JSON.parse(localStorage.getItem('glitchwear_wishlist') || '[]');

document.querySelectorAll('.wish-btn').forEach(btn => {
  const card = btn.closest('.product-card');
  const name = card.querySelector('.product-name').textContent;
  if (wishlist.includes(name)) btn.innerHTML = '♥';

  btn.addEventListener('click', () => {
    const idx = wishlist.indexOf(name);
    if (idx >= 0) {
      wishlist.splice(idx, 1);
      btn.innerHTML = '♡';
      showToast('Removed from wishlist');
    } else {
      wishlist.push(name);
      btn.innerHTML = '♥';
      showToast('Added to wishlist!');
    }
    localStorage.setItem('glitchwear_wishlist', JSON.stringify(wishlist));
  });
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ===== NEWSLETTER =====
document.querySelector('.nl-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('.nl-input');
  if (input.value) {
    showToast('You\'re in! Stay glitched 🌀');
    input.value = '';
  }
});

// ===== INIT =====
updateCartCount();
