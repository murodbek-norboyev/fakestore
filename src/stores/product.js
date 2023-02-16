import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    product: null,
    loading: false,
    cart: [],
  }),
  actions: {
    fetchProducts: async function () {
      this.loading = true;
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = response.data;
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    async fetchProduct(id) {
      try {
        this.loading = true;
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        this.product = response.data;
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
