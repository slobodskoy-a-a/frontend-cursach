import { formatPrice } from "../utils/format.js";

export function createCartPage({ cart, onGoBack, onRemoveItem, onUpdateQty, onCheckout }) {
  const el = document.createElement("main");
  el.className = "cart-page";

  el.innerHTML = `
    <div class="container">
      <div class="cart-page__header">
        <h1>Корзина покупок</h1>
        <button class="cart-page__back" type="button">← Назад к каталогу</button>
      </div>

      <div class="cart-page__content">
        <div class="cart-page__items" data-items></div>
        <div class="cart-page__summary" data-summary></div>
      </div>
    </div>
  `;

  const itemsEl = el.querySelector("[data-items]");
  const summaryEl = el.querySelector("[data-summary]");
  const backBtn = el.querySelector(".cart-page__back");

  backBtn.addEventListener("click", () => onGoBack?.());

  function render() {
    const items = cart.toArray();

    if (!items.length) {
      itemsEl.innerHTML = `
        <div class="cart-page__empty">
          <div class="cart-page__empty-icon">🛒</div>
          <div class="cart-page__empty-text">Корзина пуста</div>
          <button class="cart-page__continue-btn" type="button">Продолжить покупки</button>
        </div>
      `;
      summaryEl.innerHTML = "";

      el.querySelector(".cart-page__continue-btn")?.addEventListener("click", () => onGoBack?.());
      return;
    }

    itemsEl.innerHTML = "";
    for (const item of items) {
      const card = document.createElement("article");
      card.className = "cart-item";

      card.innerHTML = `
        <div class="cart-item__image">
          <img src="${item.product.thumbnail}" alt="${escapeAttr(item.product.title)}" />
        </div>

        <div class="cart-item__info">
          <div class="cart-item__title">${escapeHtml(item.product.title)}</div>
          <div class="cart-item__category">${escapeHtml(item.product.category)}</div>
          <div class="cart-item__price">${formatPrice(item.product.price)}</div>
        </div>

        <div class="cart-item__controls">
          <button class="cart-item__btn-minus" type="button" data-minus>−</button>
          <input class="cart-item__qty" type="number" min="1" max="999" />
          <button class="cart-item__btn-plus" type="button" data-plus>+</button>
        </div>

        <div class="cart-item__total">${formatPrice(item.product.price * item.qty)}</div>

        <button class="cart-item__remove" type="button" data-remove aria-label="Удалить">✕</button>
      `;

      const qtyInput = card.querySelector(".cart-item__qty");
      qtyInput.value = item.qty;

      card.querySelector("[data-minus]").addEventListener("click", () => {
        if (item.qty > 1) {
          onUpdateQty?.(item.product.id, item.qty - 1);
        }
      });

      card.querySelector("[data-plus]").addEventListener("click", () => {
        onUpdateQty?.(item.product.id, item.qty + 1);
      });

      qtyInput.addEventListener("change", () => {
        const qty = Math.max(1, Math.min(999, Number(qtyInput.value) || item.qty));
        onUpdateQty?.(item.product.id, qty);
      });

      card.querySelector("[data-remove]").addEventListener("click", () => {
        onRemoveItem?.(item.product.id);
      });

      itemsEl.append(card);
    }

    const total = cart.getTotal();
    summaryEl.innerHTML = `
      <div class="cart-summary">
        <div class="cart-summary__row">
          <span>Товаров:</span>
          <strong>${items.length}</strong>
        </div>
        <div class="cart-summary__row">
          <span>Итого:</span>
          <strong class="cart-summary__total">${formatPrice(total)}</strong>
        </div>
        <button class="cart-summary__checkout" type="button">Оформить заказ</button>
        <button class="cart-summary__clear" type="button">Очистить корзину</button>
      </div>
    `;

    summaryEl.querySelector(".cart-summary__checkout")?.addEventListener("click", () => {
      alert("Спасибо за покупку! (Демо версия)");
      cart.clear();
      onCheckout?.();
      render();
    });

    summaryEl.querySelector(".cart-summary__clear")?.addEventListener("click", () => {
      if (confirm("Вы уверены?")) {
        cart.clear();
        render();
      }
    });
  }

  function init() {
    render();
    // Подписываемся на изменения корзины
    const originalAdd = cart.add.bind(cart);
    const originalRemove = cart.remove.bind(cart);
    const originalSetQty = cart.setQty.bind(cart);

    cart.add = function(...args) {
      const result = originalAdd(...args);
      render();
      return result;
    };

    cart.remove = function(...args) {
      const result = originalRemove(...args);
      render();
      return result;
    };

    cart.setQty = function(...args) {
      const result = originalSetQty(...args);
      render();
      return result;
    };
  }

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
