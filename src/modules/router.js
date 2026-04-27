export function createRouter() {
  const routes = {};
  let currentRoute = "home";

  return {
    register(path, component) {
      routes[path] = component;
    },

    async navigate(path) {
      if (!routes[path]) return;
      currentRoute = path;

      const container = document.querySelector("[data-router-outlet]");
      if (!container) return;

      container.innerHTML = "";
      const el = routes[path].el || (await routes[path].create?.());
      if (el) container.append(el);
    },

    getCurrentRoute() {
      return currentRoute;
    },
  };
}
