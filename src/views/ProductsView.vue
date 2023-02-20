<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/product";
import ProductCard from "../components/ProductCard.vue";
import { ref, computed } from "vue";

const { products, categories, loading } = storeToRefs(useProductStore());
const { fetchProducts, fetchCategories } = useProductStore();

fetchProducts();
fetchCategories();

const selectedCategories = ref([]);
const priceRange = ref([0, 100]);

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter((product) =>
      selectedCategories.value.includes(product.category)
    );
  }

  // filtered = filtered.filter(
  //   (product) =>
  //     product.price >= priceRange.value[0] &&
  //     product.price <= priceRange.value[1]
  // );

  return filtered;
});

// const filteredProducts = computed(() => {
//   if (selectedCategories.value.length === 0) {
//     return products.value;
//   } else {
//     return products.value.filter((product) => {
//       return selectedCategories.value.includes(product.category);
//     });
//   }
// });

// const filteredProducts = computed(() => {
//   return products.value.filter(
//     (product) =>
//       product.price >= filterPrice.value[0] &&
//       product.price <= filterPrice.value[1]
//   );
// });
</script>

<template>
  <v-container>
    <p v-if="loading">Loading...</p>
    <v-row>
      <v-col lg="3">
        <v-card class="mb-6">
          <v-card-title>Categories</v-card-title>
          <v-divider />
          <v-card-item>
            <v-checkbox
              v-for="(category, index) in categories"
              :key="index"
              v-model="selectedCategories"
              :label="category"
              hide-details
              :value="category"
              color="primary"
              class="text-capitalize"
            ></v-checkbox>
          </v-card-item>
        </v-card>
        <v-card>
          <v-card-title>Choose price range:</v-card-title>
          <v-divider />
          <div class="pt-10 px-6">
            <v-range-slider
              v-model="priceRange"
              step="1"
              thumb-label="always"
            ></v-range-slider>
          </div>
        </v-card>
      </v-col>
      <v-col lg="9">
        <v-row>
          <v-col lg="3" v-for="product in filteredProducts" :key="product.id">
            <ProductCard :product="product" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
