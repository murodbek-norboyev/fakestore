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
const sortlist = [
  { title: "Price high - low" },
  { title: "Price low - high" },
  { title: "Alphabetically" },
];
const selectedSort = ref(null);

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (filterCategories.value.length > 0) {
    filtered = filtered.filter((product) =>
      filterCategories.value.includes(product.category)
    );
  }

  if (selectedSort.value != null) {
    if (selectedSort.value === 0) {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (selectedSort.value === 1) {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

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
      </v-col>
      <v-col lg="9">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-item>
                <v-row>
                  <v-col
                    lg="auto"
                    v-for="(item, index) in sortlist"
                    :key="item.title"
                  >
                    <div
                      role="button"
                      :class="{ 'text-primary': selectedSort === index }"
                      class="font-weight-medium"
                      @click="selectedSort = index"
                    >
                      {{ item.title }}
                    </div>
                  </v-col>
                </v-row>
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
