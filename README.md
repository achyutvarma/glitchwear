# ⚡ GLITCHWEAR — E-Commerce Website

> Gen Z Y2K streetwear brand. Oversized fits. Bold energy. No algorithm approval required.

## 🌀 About

**GLITCHWEAR** is a fully responsive, Y2K-aesthetic e-commerce frontend for a Gen Z clothing brand specializing in oversized shirts and baggy pants.

## 📁 Folder Structure

```
glitchwear/
├── index.html           # Homepage (Hero, Products, Categories, Newsletter)
├── css/
│   ├── style.css        # Main global styles
│   └── pages.css        # Page-specific overrides
├── js/
│   └── main.js          # Cart, filters, cursor, animations
└── pages/
    ├── shirts.html      # Oversized Shirts collection
    ├── pants.html       # Baggy Pants collection
    └── about.html       # Brand story & values
```

## ✨ Features

- **Y2K / Retro Aesthetic** — glitch animations, neon palette, grid backgrounds
- **Custom Cursor** — animated yellow dot + pink ring cursor
- **Shopping Cart** — slide-in drawer, add/remove items, quantity controls, localStorage persistence
- **Wishlist** — save favorites, persisted in localStorage
- **Product Filtering** — filter by category with smooth transitions
- **Size Selection** — interactive size chips per product card
- **Scroll Reveal Animations** — staggered reveal on scroll
- **Glitch Text Effect** — hero title chromatic aberration
- **Marquee Strips** — scrolling brand text banners
- **Mobile Responsive** — hamburger menu, responsive grid
- **Newsletter Signup** — form with toast notification
- **Toast Notifications** — bottom center feedback messages

## 🎨 Design System

| Token | Value |
|-------|-------|
| Acid Yellow | `#FFE600` |
| Hot Pink | `#FF2D78` |
| Electric Blue | `#00F0FF` |
| Neon Green | `#39FF14` |
| Deep Black | `#0A0A0A` |
| Purple | `#9B00FF` |

**Fonts:**
- Display: `Bebas Neue` (headings)
- UI: `Orbitron` (brand, buttons, prices)
- Body: `Space Mono` (body text, labels)

## 🚀 Getting Started

Just open `index.html` in your browser — no build step required!

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/glitchwear.git

# Open in browser
open index.html
# or
npx serve .
```

## 📦 Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage with hero, categories, products grid, manifesto |
| `pages/shirts.html` | Oversized shirts collection with filters |
| `pages/pants.html` | Baggy pants collection with filters |
| `pages/about.html` | Brand story, values, stats |

## 🔧 Extending

To add products: copy any `.product-card` block and update the `data-category`, `data-color`, `data-emoji` attributes and product info.

To add pages: copy any existing page, update the nav `style="color:var(--acid-yellow)"` to highlight the current page.

---

**© 2025 GLITCHWEAR. Drop Different. ⚡**
