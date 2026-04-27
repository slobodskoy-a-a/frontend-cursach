export function createAbout() {
  const el = document.createElement("main");
  el.className = "about";

  el.innerHTML = `
    <div class="container">
      <h1>О магазине</h1>

      <section class="about__section">
        <h2>История</h2>
        <p>PC Components Store — специализированный интернет-магазин комплектующих для персональных компьютеров. Мы работаем с 2020 года и обслужили более 50 000 довольных клиентов.</p>
      </section>

      <section class="about__section">
        <h2>Наша миссия</h2>
        <p>Предоставить каждому пользователю доступ к качественным комплектующим для ПК по справедливым ценам. Помочь собрать идеальную конфигурацию для любых задач — от офисной работы до профессионального гейминга и видеомонтажа.</p>
      </section>

      <section class="about__section">
        <h2>Что мы предлагаем</h2>
        <ul>
          <li>Процессоры Intel и AMD (Core i9, Ryzen 9 и другие)</li>
          <li>Видеокарты NVIDIA и AMD последних поколений</li>
          <li>Оперативная память DDR4, DDR5 от Kingston, Corsair, G.Skill</li>
          <li>Твердотельные накопители NVMe и SATA</li>
          <li>Материнские платы LGA1700, AM5, AM4</li>
          <li>Блоки питания 80+ Bronze до 80+ Titanium</li>
          <li>Системы охлаждения воздушные и жидкостные</li>
          <li>Корпуса ПК различных размеров и конфигураций</li>
        </ul>
      </section>

      <section class="about__section">
        <h2>Команда</h2>
        <p>Наша команда состоит из опытных специалистов в области компьютерного оборудования. Мы всегда готовы помочь вам выбрать нужные компоненты и ответить на любые вопросы.</p>
      </section>

      <section class="about__section">
        <h2>Контакты</h2>
        <p>Email: <strong>info@pccomponents.ru</strong></p>
        <p>Телефон: <strong>+7 (495) 123-45-67</strong></p>
        <p>Адрес: <strong>г. Москва, ул. Примерная, д. 1</strong></p>
      </section>
    </div>
  `;

  return { el };
}
