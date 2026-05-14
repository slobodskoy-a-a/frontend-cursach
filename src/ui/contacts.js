export function createContacts() {
  const el = document.createElement("main");
  el.className = "contacts";

  el.innerHTML = `
    <div class="container">
      <h1>Контакты</h1>

      <div class="contacts__grid">
        <div class="contacts__column">
          <section class="contacts__section">
            <h2>Основная информация</h2>
            <div class="info-item">
              <strong>Компания:</strong> PC Components Store
            </div>
            <div class="info-item">
              <strong>Адрес:</strong> г. Москва, ул. Примерная, д. 1, офис 100
            </div>
            <div class="info-item">
              <strong>Телефон:</strong> <a href="tel:+79021884625">+7 (902) 188-46-25</a>
            </div>
            <div class="info-item">
              <strong>Email:</strong> <a href="mailto:info@pccomponents.ru">info@pccomponents.ru</a>
            </div>
          </section>

          <section class="contacts__section">
            <h2>Время работы</h2>
            <div class="info-item">
              <strong>Пн-Пт:</strong> 09:00 - 18:00
            </div>
            <div class="info-item">
              <strong>Сб:</strong> 10:00 - 16:00
            </div>
            <div class="info-item">
              <strong>Вс:</strong> Выходной
            </div>
          </section>
        </div>

        <div class="contacts__column">
          <section class="contacts__section">
            <h2>Обслуживание клиентов</h2>
            <div class="info-item">
              <strong>Техподдержка:</strong> support@pccomponents.ru
            </div>
            <div class="info-item">
              <strong>Консультация:</strong> <a href="tel:+74959876543">+7 (495) 987-65-43</a>
            </div>
            <div class="info-item">
              <strong>Вопросы по заказам:</strong> orders@pccomponents.ru
            </div>
          </section>

          <section class="contacts__section">
            <h2>Социальные сети</h2>
            <div class="social-links">
              <a href="#" class="social-link">VK</a>
              <a href="#" class="social-link">Telegram</a>
              <a href="#" class="social-link">YouTube</a>
            </div>
          </section>
        </div>
      </div>

      <section class="contacts__section contacts__form-section">
        <h2>Форма обратной связи</h2>
        <form class="contact-form" data-form>
          <input type="text" placeholder="Ваше имя" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Ваше сообщение" rows="5" required></textarea>
          <button type="submit" class="btn btn-primary">Отправить</button>
        </form>
        <div class="form-message" data-message style="display: none;"></div>
      </section>
    </div>
  `;

  const form = el.querySelector("[data-form]");
  const message = el.querySelector("[data-message]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    message.textContent = "Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.";
    message.style.display = "block";
    form.reset();
    setTimeout(() => {
      message.style.display = "none";
    }, 4000);
  });

  return { el };
}
