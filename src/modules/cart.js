export class Cart {
  constructor({ storageKey }) {
    this.storageKey = storageKey;
    /** @type {Map<number, {product: any, qty: number}>} */
    this.items = new Map();
  }

  load() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      this.items = new Map(
        (parsed.items ?? []).map((x) => [x.product.id, { product: x.product, qty: x.qty }]),
      );
    } catch {
      this.items = new Map();
    }
  }

  save() {
    const payload = {
      items: [...this.items.values()].map((x) => ({ product: x.product, qty: x.qty })),
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(this.storageKey, JSON.stringify(payload));
  }

  add(product, qty = 1) {
    const current = this.items.get(product.id);
    const nextQty = (current?.qty ?? 0) + qty;
    this.items.set(product.id, { product, qty: nextQty });
    this.save();
  }

  remove(productId) {
    this.items.delete(productId);
    this.save();
  }

  setQty(productId, qty) {
    const item = this.items.get(productId);
    if (!item) return;

    const next = Math.max(1, Math.min(999, Number(qty) || 1));
    this.items.set(productId, { ...item, qty: next });
    this.save();
  }

  clear() {
    this.items.clear();
    this.save();
  }

  getCount() {
    let count = 0;
    for (const x of this.items.values()) count += x.qty;
    return count;
  }

  getTotal() {
    let total = 0;
    for (const x of this.items.values()) total += (x.product.price ?? 0) * x.qty;
    return total;
  }

  toArray() {
    return [...this.items.values()];
  }
}
