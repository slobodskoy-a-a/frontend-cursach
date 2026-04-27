import { formatPrice } from "../utils/format.js";

export function createProductModal({ cart, onAddToCart }) {
  const el = document.createElement("div");
  el.className = "modal";
  el.setAttribute("aria-hidden", "true");

  el.innerHTML = `
    <div class="modal__backdrop" data-close></div>
    <div class="modal__dialog" role="dialog" aria-modal="true" aria-label="Товар">
      <button class="modal__close" type="button" data-close aria-label="Закрыть">✕</button>
      <div class="modal__content" data-content></div>
    </div>
  `;

  const content = el.querySelector("[data-content]");

  function close() {
    el.classList.remove("modal--open");
    el.setAttribute("aria-hidden", "true");
    document.body.classList.remove("page--lock");
  }

  function open(product) {
    content.innerHTML = `
      <div class="product">
        <img class="product__image" src="${product.thumbnail}" alt="${escapeAttr(product.title)}" />
        <div class="product__info">
          <div class="product__title">${escapeHtml(product.title)}</div>
          <div class="product__price">${formatPrice(product.price)}</div>
          <div class="product__desc">${escapeHtml(product.description ?? "")}</div>

          <div class="product__actions">
            <button class="btn" type="button" data-add>В корзину</button>
            <button class="btn btn--ghost" type="button" data-close>Закрыть</button>
          </div>
        </div>
      </div>
    `;

    content.querySelector("[data-add]").addEventListener("click", () => {
      cart.add(product, 1);
      onAddToCart?.(product);
    });

    content.querySelector("[data-close]").addEventListener("click", close);

    el.classList.add("modal--open");
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("page--lock");
  }

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
