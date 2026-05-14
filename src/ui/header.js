export function createHeader({ onOpenCart, onNavigate }) {
  const el = document.createElement("header");
  el.className = "header";

  el.innerHTML = `
    <div class="header__inner container">
      <div class="header__brand">
        <div class="header__logo" data-nav="home">PC Store</div>
        <div class="header__subtitle">Комплектующие для ПК</div>
      </div>

      <nav class="header__nav">
        <a class="header__link" data-nav="home" href="#">Главная</a>
        <a class="header__link" data-nav="catalog" href="#">Каталог</a>
        <a class="header__link" data-nav="about" href="#">О магазине</a>
        <a class="header__link" data-nav="contacts" href="#">Контакты</a>
        <a class="header__link header__link--cart" data-nav="cart" href="#">
          Корзина
          <span class="header__cart-count" data-cart-count>0</span>
        </a>
      </nav>

      <button class="header__menu-toggle" aria-label="Меню">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="header__mobile-nav">
        <a class="header__link" data-nav="home" href="#">Главная</a>
        <a class="header__link" data-nav="catalog" href="#">Каталог</a>
        <a class="header__link" data-nav="about" href="#">О магазине</a>
        <a class="header__link" data-nav="contacts" href="#">Контакты</a>
        <a class="header__link header__link--cart" data-nav="cart" href="#">
          Корзина
          <span class="header__cart-count" data-cart-count>0</span>
        </a>
      </nav>
    </div>
  `;

  const countEl = el.querySelector("[data-cart-count]");
  const countMobileEl = el.querySelector(".header__mobile-nav [data-cart-count]");
  const navLinks = el.querySelectorAll(".header__nav [data-nav]");
  const mobileNavLinks = el.querySelectorAll(".header__mobile-nav [data-nav]");
  const logo = el.querySelector(".header__logo");
  const menuToggle = el.querySelector(".header__menu-toggle");
  const mobileNav = el.querySelector(".header__mobile-nav");

  // Menu toggle functionality
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });

  // Close menu when link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mobileNav.classList.remove("active");
    });
  });

  logo.addEventListener("click", (e) => {
    e.preventDefault();
    menuToggle.classList.remove("active");
    mobileNav.classList.remove("active");
    onNavigate?.("home");
  });

  const allNavLinks = [...navLinks, ...mobileNavLinks];
  allNavLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const route = link.dataset.nav;
      onNavigate?.(route);
    });
  });

  return {
    el,
    setCartCount(n) {
      countEl.textContent = String(n);
      countMobileEl.textContent = String(n);
      countEl.style.display = n > 0 ? "inline-flex" : "none";
      countMobileEl.style.display = n > 0 ? "inline-flex" : "none";
    },
    setActiveLink(route) {
      allNavLinks.forEach(link => {
        if (link.dataset.nav === route) {
          link.classList.add("header__link--active");
        } else {
          link.classList.remove("header__link--active");
        }
      });
    },
  };
}
