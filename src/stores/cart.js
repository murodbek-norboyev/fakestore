import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    totalQuantity: null,
    totalPrice: null,
  }),
  getters: {
    calcTotalQuantity: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),
    calcTotalPrice: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    isInCart: (state) => (id) =>
      state.items.findIndex((item) => item.id === id) !== -1,
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
      toast.success("Added to cart successfully");
      this._cartTotal();
      this._saveToLocalStorage();
    },
    removeItem(item) {
      const index = this.items.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        this.items.splice(index, 1);
      }
      toast.success("Successfully removed from cart");
      this._cartTotal();
      this._saveToLocalStorage();
    },
    clear() {
      this.items = [];
      toast.success("All products in the cart have been deleted");
      this._cartTotal();
      this._saveToLocalStorage();
    },
    quantityIncrement(item) {
      item.quantity += 1;
      this._cartTotal();
      this._saveToLocalStorage();
    },
    quantityDecrement(item) {
      if (item.quantity > 1) item.quantity -= 1;
      this._cartTotal();
      this._saveToLocalStorage();
    },
    _saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    _loadFromLocalStorage() {
      const items = localStorage.getItem("cart");
      if (items) this.items = JSON.parse(items);
    },
    _cartTotal() {
      this.totalQuantity = this.calcTotalQuantity;
      this.totalPrice = this.calcTotalPrice.toFixed(2);
    },
    initialize() {
      this._loadFromLocalStorage();
      this._cartTotal();
    },
  },
});
