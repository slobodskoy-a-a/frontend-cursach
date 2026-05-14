import "./styles/main.css";

import { Cart } from "./modules/cart.js";
import { createRouter } from "./modules/router.js";
import { createHeader } from "./ui/header.js";
import { createHome } from "./ui/home.js";
import { createCatalog } from "./ui/catalog.js";
import { createAbout } from "./ui/about.js";
import { createContacts } from "./ui/contacts.js";
import { createCartPage } from "./ui/cartPage.js";
import { createCartModal } from "./ui/cartModal.js";
import { createToastHost, toast } from "./ui/toast.js";

const app = document.querySelector("#app");

const cart = new Cart({ storageKey: "mirea-shop-cart-v1" });
cart.load();

createToastHost(document.body);

const router = createRouter();

const home = createHome();
const catalog = createCatalog({
  cart,
  onAddToCart: (product) => {
    cart.add(product, 1);
    header.setCartCount(cart.getCount());
    toast(`Добавлено в корзину: ${product.title}`);
  },
});
const about = createAbout();
const contacts = createContacts();
const cartPage = createCartPage({
  cart,
  onGoBack: () => {
    router.navigate("catalog");
    header.setActiveLink("catalog");
    window.scrollTo(0, 0);
  },
  onRemoveItem: (id) => {
    cart.remove(id);
    header.setCartCount(cart.getCount());
  },
  onUpdateQty: (id, qty) => {
    cart.setQty(id, qty);
  },
  onCheckout: () => {
    header.setCartCount(cart.getCount());
  },
});

// Регистрируем маршруты
router.register("home", home);
router.register("catalog", catalog);
router.register("about", about);
router.register("contacts", contacts);
router.register("cart", cartPage);

const header = createHeader({
  onOpenCart: () => {
    router.navigate("cart");
    header.setActiveLink("cart");
    window.scrollTo(0, 0);
  },
  onNavigate: (route) => {
    router.navigate(route);
    header.setActiveLink(route);
    window.scrollTo(0, 0);
  },
});

const cartModal = createCartModal({
  cart,
  onChange: () => header.setCartCount(cart.getCount()),
});

// Создаём контейнер для страниц
const outlet = document.createElement("div");
outlet.setAttribute("data-router-outlet", "");

app.append(header.el);
app.append(outlet);
document.body.append(cartModal.el);

header.setCartCount(cart.getCount());

// Инициализируем с главной страницы
router.navigate("home");
header.setActiveLink("home");

// Инициализируем каталог и корзину
setTimeout(() => {
  catalog.init();
  cartPage.init();
}, 0);

// Обработка навигации через событие
window.addEventListener("navigate", (e) => {
  const route = e.detail;
  router.navigate(route);
  header.setActiveLink(route);
  window.scrollTo(0, 0);
  
  // Инициализируем каталог при переходе на него
  if (route === "catalog") {
    setTimeout(() => catalog.init(), 0);
  }
});
