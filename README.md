# frontend-cursach

Одностраничное веб‑приложение (SPA) интернет‑магазина комплектующих для ПК: каталог, поиск/фильтры и корзина.

## Возможности
- 5 разделов: Главная, Каталог, О нас, Контакты, Корзина
- Каталог: поиск, фильтр по категориям, сортировка, пагинация
- Карточки товаров и модальное окно с подробностями
- Корзина: добавление/удаление, изменение количества, итоговая сумма
- Сохранение корзины в `localStorage`, выбранной категории в `sessionStorage`

## Технологии
- JavaScript (ES6+, модули)
- CSS (адаптивная верстка)
- Vite

## Запуск

Требуется Node.js 16+.

```bash
npm install
npm run dev
```

Сборка и предпросмотр:

```bash
npm run build
npm run preview
```

## Структура

- `src/main.js` — инициализация приложения, роутинг, сборка страниц
- `src/modules/router.js` — простой SPA‑роутер
- `src/modules/cart.js` — корзина и сохранение в `localStorage`
- `src/data/products.js` — массив товаров
- `src/ui/*` — UI‑компоненты страниц (home, catalog, cartPage, about, contacts)

## Примечание

В `vite.config.js` задан `base: "/frontend-cursach/"` (удобно для публикации на GitHub Pages).

## 🚀 Деплой на GitHub Pages

### Автоматический деплой через GitHub Actions

1. **Загрузите репозиторий на GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ВАШ_ЮЗЕР/ВАШ_РЕПОЗИТОРИЙ.git
   git push -u origin main
   ```

2. **Настройте GitHub Pages:**
   - Перейдите в `Settings → Pages`
   - Выберите источник: `GitHub Actions`
   - Автоматически при push на `main` будет запущен деплой

3. **Сайт будет доступен по адресу:**
   ```
   https://ВАШ_ЮЗЕР.github.io/frontend-cursach/
   ```

### Ручной деплой (если нужно)

```bash
npm run build
npm run preview
# Затем загрузите папку dist на GitHub Pages вручную
```

## Мобильная адаптивность ✓

- ✅ Гамбургер-меню на мобильных устройствах
- ✅ Адаптивная сетка товаров (1-3 колонки в зависимости от размера экрана)
- ✅ Touch-friendly интерфейс
- ✅ Оптимизация для смартфонов (320px+)