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
    </div>
  `;

  const countEl = el.querySelector("[data-cart-count]");
  const navLinks = el.querySelectorAll("[data-nav]");
  const logo = el.querySelector(".header__logo");

  logo.addEventListener("click", (e) => {
    e.preventDefault();
    onNavigate?.("home");
  });

  navLinks.forEach(link => {
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
      countEl.style.display = n > 0 ? "inline-flex" : "none";
    },
    setActiveLink(route) {
      navLinks.forEach(link => {
        if (link.dataset.nav === route) {
          link.classList.add("header__link--active");
        } else {
          link.classList.remove("header__link--active");
        }
      });
    },
  };
}
