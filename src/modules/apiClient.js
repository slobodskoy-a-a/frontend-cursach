export class ApiClient {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  async request(path) {
    const url = `${this.baseUrl}${path}`;

    let res;
    try {
      res = await fetch(url);
    } catch {
      throw new Error("Ошибка сети. Проверьте подключение к интернету.");
    }

    if (!res.ok) {
      throw new Error(`Ошибка API: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  async getCategories() {
    return this.request("/products/categories");
  }

  async getProducts({ q = "", category = "", sort = "relevance", limit = 12, skip = 0 } = {}) {
    let data;

    if (q.trim()) {
      data = await this.request(`/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`);
    } else if (category) {
      data = await this.request(`/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`);
    } else {
      data = await this.request(`/products?limit=${limit}&skip=${skip}`);
    }

    let products = data.products ?? [];
    const total = data.total ?? products.length;

    if (sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);
    if (sort === "rating-desc") products = [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    return { products, total };
  }
}
