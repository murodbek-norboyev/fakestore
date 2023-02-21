<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/product";
import ProductCard from "../components/ProductCard.vue";
import { ref, computed } from "vue";

const { products, categories, loading } = storeToRefs(useProductStore());
const { fetchProducts, fetchCategories } = useProductStore();

fetchProducts();
fetchCategories();

const filterCategories = ref([]);
const sortProducts = ref(null);
const priceRange = ref([0, 200]);
const sortlist = ["Price high - low", "Price low - high", "Alphabetically"];

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (filterCategories.value.length > 0) {
    filtered = filtered.filter((product) =>
      filterCategories.value.includes(product.category)
    );
  }

  if (sortProducts.value != null) {
    if (sortProducts.value === 0) {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortProducts.value === 1) {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  // filtered = filtered.filter(
  //   (product) =>
  //     product.price >= priceRange.value[0] &&
  //     product.price <= priceRange.value[1]
  // );

  return filtered;
});
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
              v-model="filterCategories"
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
          <v-col cols="12">
            <v-card>
              <v-card-item>
                <v-radio-group
                  v-model="sortProducts"
                  color="primary"
                  inline
                  hide-details
                >
                  <v-radio
                    v-for="(item, index) in sortlist"
                    :label="item"
                    :value="index"
                    :key="index"
                  ></v-radio>
                </v-radio-group>
              </v-card-item>
            </v-card>
          </v-col>
          <v-col lg="3" v-for="product in filteredProducts" :key="product.id">
            <ProductCard :product="product" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
