import { formatPrice } from "../utils/format.js";

export function createCartModal({ cart, onChange }) {
  const el = document.createElement("div");
  el.className = "modal";
  el.setAttribute("aria-hidden", "true");

  el.innerHTML = `
    <div class="modal__backdrop" data-close></div>
    <div class="modal__dialog modal__dialog--wide" role="dialog" aria-modal="true" aria-label="Корзина">
      <button class="modal__close" type="button" data-close aria-label="Закрыть">✕</button>
      <div class="modal__content">
        <div class="cart">
          <div class="cart__header">
            <div class="cart__title">Корзина</div>
            <button class="btn btn--ghost" type="button" data-clear>Очистить</button>
          </div>

          <div class="cart__body">
            <div class="cart__items" data-items></div>
            <div class="cart__summary">
              <div class="cart__total">
                <span>Итого:</span>
                <strong data-total>0 ₽</strong>
              </div>
              <button class="btn" type="button" data-checkout>Оформить (демо)</button>
              <div class="cart__hint">Оформление заказа можно добавить позже (необязательно для курсовой).</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const itemsEl = el.querySelector("[data-items]");
  const totalEl = el.querySelector("[data-total]");
  const clearBtn = el.querySelector("[data-clear]");

  function close() {
    el.classList.remove("modal--open");
    el.setAttribute("aria-hidden", "true");
    document.body.classList.remove("page--lock");
  }

  function open() {
    render();
    el.classList.add("modal--open");
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("page--lock");
  }

  function render() {
    const items = cart.toArray();
    itemsEl.innerHTML = "";

    if (items.length === 0) {
      itemsEl.innerHTML = `<div class="state__empty"><div class="state__title">Корзина пуста</div></div>`;
      totalEl.textContent = formatPrice(0);
      return;
    }

    for (const { product, qty } of items) {
      const row = document.createElement("div");
      row.className = "cart-item";

      row.innerHTML = `
        <img class="cart-item__img" src="${product.thumbnail}" alt="${escapeAttr(product.title)}" />
        <div class="cart-item__info">
          <div class="cart-item__title">${escapeHtml(product.title)}</div>
          <div class="cart-item__price">${formatPrice(product.price)}</div>
        </div>

        <div class="cart-item__qty">
          <button class="cart-item__qty-btn" type="button" data-dec aria-label="Уменьшить">−</button>
          <input class="cart-item__qty-input" type="number" min="1" max="999" value="${qty}" />
          <button class="cart-item__qty-btn" type="button" data-inc aria-label="Увеличить">+</button>
        </div>

        <div class="cart-item__sum">${formatPrice(product.price * qty)}</div>

        <button class="cart-item__remove" type="button" aria-label="Удалить" data-remove>Удалить</button>
      `;

      const input = row.querySelector(".cart-item__qty-input");

      row.querySelector("[data-dec]").addEventListener("click", () => {
        cart.setQty(product.id, qty - 1);
        render();
        onChange?.();
      });

      row.querySelector("[data-inc]").addEventListener("click", () => {
        cart.setQty(product.id, qty + 1);
        render();
        onChange?.();
      });

      input.addEventListener("change", () => {
        cart.setQty(product.id, input.value);
        render();
        onChange?.();
      });

      row.querySelector("[data-remove]").addEventListener("click", () => {
        cart.remove(product.id);
        render();
        onChange?.();
      });

      itemsEl.append(row);
    }

    totalEl.textContent = formatPrice(cart.getTotal());
  }

  clearBtn.addEventListener("click", () => {
    cart.clear();
    render();
    onChange?.();
  });

  el.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && el.classList.contains("modal--open")) close();
  });

  return { el, open, close };
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
