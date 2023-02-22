import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    total: null,
  }),
  getters: {
    totalQuantity() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  actions: {
    addItem(item) {
      const existing = this.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        item.quantity = 1;
        this.items.push(item);
      }
      this._saveToLocalStorage();
    },
    removeItem(item) {
      const index = this.items.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        this.items.splice(index, 1);
      }
      this._saveToLocalStorage();
    },
    clear() {
      this.items = [];
      this._saveToLocalStorage();
    },
    quantityIncrement(item) {
      item.quantity += 1;
      this._saveToLocalStorage();
    },
    quantityDecrement(item) {
      item.quantity -= 1;
      this._saveToLocalStorage();
    },
    _saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    _loadFromLocalStorage() {
      const items = localStorage.getItem("cart");
      if (items) this.items = JSON.parse(items);
    },
    initialize() {
      this._loadFromLocalStorage();
    },
  },
});
