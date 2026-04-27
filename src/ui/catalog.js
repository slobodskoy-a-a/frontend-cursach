import { debounce } from "../utils/debounce.js";
import { formatPrice } from "../utils/format.js";
import { createProductModal } from "./productModal.js";
import { PC_PRODUCTS } from "../data/products.js";

export function createCatalog({ cart, onAddToCart }) {
  const el = document.createElement("main");
  el.className = "catalog";

  el.innerHTML = `
    <div class="container">
      <section class="catalog__controls controls">
        <div class="controls__row">
          <input class="controls__search" type="search" placeholder="Поиск товаров..." aria-label="Поиск" />
          <select class="controls__select" data-category aria-label="Категория">
            <option value="">Все категории</option>
          </select>
          <select class="controls__select" data-sort aria-label="Сортировка">
            <option value="relevance">Сортировка: по умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
            <option value="rating-desc">Рейтинг: по убыванию</option>
          </select>
        </div>

        <div class="controls__row controls__row--between">
          <div class="controls__meta" data-meta></div>
          <div class="controls__pager">
            <button class="controls__btn" data-prev type="button">Назад</button>
            <button class="controls__btn" data-next type="button">Вперёд</button>
          </div>
        </div>
      </section>

      <section class="catalog__content">
        <div class="state" data-state></div>
        <div class="grid" data-grid></div>
      </section>
    </div>
  `;

  const searchEl = el.querySelector(".controls__search");
  const categoryEl = el.querySelector("[data-category]");
  const sortEl = el.querySelector("[data-sort]");
  const metaEl = el.querySelector("[data-meta]");
  const stateEl = el.querySelector("[data-state]");
  const gridEl = el.querySelector("[data-grid]");
  const prevBtn = el.querySelector("[data-prev]");
  const nextBtn = el.querySelector("[data-next]");

  const productModal = createProductModal({
    cart,
    onAddToCart: (p) => onAddToCart?.(p),
  });
  document.body.append(productModal.el);

  const state = { q: "", category: "", sort: "relevance", limit: 12, skip: 0, total: 0, loading: false };

  // Получить уникальные категории
  const categories = [...new Set(PC_PRODUCTS.map(p => p.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryEl.append(opt);
  });

  function setLoading(isLoading) {
    state.loading = isLoading;
    stateEl.innerHTML = isLoading ? `<div class="state__loader">Загрузка…</div>` : "";
  }

  function setError(message) {
    stateEl.innerHTML = `
      <div class="state__error">
        <div class="state__title">Ошибка</div>
        <div class="state__text">${escapeHtml(message)}</div>
      </div>
    `;
  }

  function setEmpty() {
    stateEl.innerHTML = `
      <div class="state__empty">
        <div class="state__title">Ничего не найдено</div>
        <div class="state__text">Попробуйте изменить поиск или фильтры.</div>
      </div>
    `;
  }

  function renderMeta() {
    const from = state.total === 0 ? 0 : state.skip + 1;
    const to = Math.min(state.skip + state.limit, state.total);

    metaEl.textContent = `Показано: ${from}–${to} из ${state.total}`;

    prevBtn.disabled = state.skip <= 0 || state.loading;
    nextBtn.disabled = state.skip + state.limit >= state.total || state.loading;
  }

  function renderProducts(products) {
    gridEl.innerHTML = "";
    for (const p of products) {
      const card = document.createElement("article");
      card.className = "product-card";

      card.innerHTML = `
        <button class="product-card__image-btn" type="button" aria-label="Открыть товар">
          <img class="product-card__image" src="${p.thumbnail}" alt="${escapeAttr(p.title)}" loading="lazy" />
        </button>

        <div class="product-card__body">
          <div class="product-card__title" title="${escapeAttr(p.title)}">${escapeHtml(p.title)}</div>

          <div class="product-card__meta">
            <div class="product-card__price">${formatPrice(p.price)}</div>
            <div class="product-card__rating">★ ${Number(p.rating ?? 0).toFixed(1)}</div>
          </div>

          <div class="product-card__actions">
            <button class="product-card__btn product-card__btn--ghost" type="button" data-details>Подробнее</button>
            <button class="product-card__btn" type="button" data-add>В корзину</button>
          </div>
        </div>
      `;

      card.querySelector(".product-card__image-btn").addEventListener("click", () => productModal.open(p));
      card.querySelector("[data-details]").addEventListener("click", () => productModal.open(p));
      card.querySelector("[data-add]").addEventListener("click", () => onAddToCart?.(p));

      gridEl.append(card);
    }
  }

  function getFilteredProducts() {
    let products = PC_PRODUCTS.filter(p => {
      const matchesSearch = !state.q || p.title.toLowerCase().includes(state.q.toLowerCase()) || p.description.toLowerCase().includes(state.q.toLowerCase());
      const matchesCategory = !state.category || p.category === state.category;
      return matchesSearch && matchesCategory;
    });

    if (state.sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);
    if (state.sort === "rating-desc") products = [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    return products;
  }

  function load() {
    setLoading(true);

    setTimeout(() => {
      const allProducts = getFilteredProducts();
      state.total = allProducts.length;
      const products = allProducts.slice(state.skip, state.skip + state.limit);

      setLoading(false);
      renderMeta();

      if (!products.length) {
        gridEl.innerHTML = "";
        setEmpty();
        return;
      }

      stateEl.innerHTML = "";
      renderProducts(products);
    }, 300);
  }

  function init() {
    // Проверяем, была ли выбрана категория на главной странице
    const selectedCategory = sessionStorage.getItem("selectedCategory");
    if (selectedCategory) {
      state.category = selectedCategory;
      categoryEl.value = selectedCategory;
      sessionStorage.removeItem("selectedCategory"); // Очищаем после использования
    }
    load();
  }

  const onSearch = debounce(() => {
    state.q = searchEl.value.trim();
    state.skip = 0;
    load();
  }, 350);

  searchEl.addEventListener("input", onSearch);

  categoryEl.addEventListener("change", () => {
    state.category = categoryEl.value;
    state.skip = 0;
    load();
  });

  sortEl.addEventListener("change", () => {
    state.sort = sortEl.value;
    state.skip = 0;
    load();
  });

  prevBtn.addEventListener("click", () => {
    state.skip = Math.max(0, state.skip - state.limit);
    load();
  });

  nextBtn.addEventListener("click", () => {
    state.skip = state.skip + state.limit;
    load();
  });

  return { el, init };
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(s) {
  return escapeHtml(s).replaceAll("`", "&#096;");
}
