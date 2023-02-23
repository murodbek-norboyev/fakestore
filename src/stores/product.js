import { defineStore } from "pinia";
import { api } from "../../api";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    categories: [],
    product: null,
    loading: false,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await api.get("/products");
        this.products = response.data;
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    async fetchCategories() {
      try {
        const response = await api.get("/products/categories");
        this.categories = response.data;
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    async fetchProduct(id) {
      try {
        this.loading = true;
        const response = await api.get(`/products/${id}`);
        this.product = response.data;
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
