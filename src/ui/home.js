export function createHome() {
  const el = document.createElement("main");
  el.className = "home";

  el.innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">PC Components Store</h1>
          <p class="hero__subtitle">Комплектующие для вашего компьютера</p>
          <div class="hero__description">
            <p>Широкий ассортимент процессоров, видеокарт, оперативной памяти и других компонентов от ведущих производителей.</p>
            <p>Цены от официальных поставщиков. Гарантия на все товары.</p>
          </div>
          <button class="btn btn-primary" data-goto-catalog>Перейти в каталог</button>
        </div>
        <div class="hero__image">
          <div class="hero__pc-icon">🖥️</div>
        </div>
      </div>
    </section>

    <section class="categories">
      <div class="container">
        <h2>Популярные категории</h2>
        <div class="categories-grid">
          <div class="category-card" data-category="Процессоры">
            <div class="category-card__icon">💾</div>
            <div class="category-card__title">Процессоры</div>
            <div class="category-card__desc">Intel и AMD</div>
          </div>
          <div class="category-card" data-category="Видеокарты">
            <div class="category-card__icon">🎮</div>
            <div class="category-card__title">Видеокарты</div>
            <div class="category-card__desc">NVIDIA и AMD</div>
          </div>
          <div class="category-card" data-category="Память">
            <div class="category-card__icon">⚡</div>
            <div class="category-card__title">Память</div>
            <div class="category-card__desc">DDR4 и DDR5</div>
          </div>
          <div class="category-card" data-category="Охлаждение">
            <div class="category-card__icon">🔌</div>
            <div class="category-card__title">БП и охлаждение</div>
            <div class="category-card__desc">Надежные компоненты</div>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>Почему выбирают нас</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature__icon">✓</div>
            <div class="feature__title">Оригинальность</div>
            <p>Только оригинальные товары от производителей</p>
          </div>
          <div class="feature">
            <div class="feature__icon">✓</div>
            <div class="feature__title">Гарантия</div>
            <p>3 года гарантии на все компоненты</p>
          </div>
          <div class="feature">
            <div class="feature__icon">✓</div>
            <div class="feature__title">Консультация</div>
            <p>Бесплатная консультация от специалистов</p>
          </div>
          <div class="feature">
            <div class="feature__icon">✓</div>
            <div class="feature__title">Доставка</div>
            <p>Быстрая доставка по всей России</p>
          </div>
        </div>
      </div>
    </section>
  `;

  const catalogBtn = el.querySelector("[data-goto-catalog]");
  const categoryCards = el.querySelectorAll(".category-card");

  catalogBtn.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("navigate", { detail: "catalog" }));
  });

  categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;
      // Сохраняем выбранную категорию в sessionStorage
      sessionStorage.setItem("selectedCategory", category);
      // Отправляем событие навигации на каталог
      window.dispatchEvent(new CustomEvent("navigate", { detail: "catalog" }));
    });

    // Добавляем стиль курсора
    card.style.cursor = "pointer";
  });

  return { el };
}
