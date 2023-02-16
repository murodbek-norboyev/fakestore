<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/product";
import ProductCard from "../components/ProductCard.vue";

const { products, loading } = storeToRefs(useProductStore());
const { fetchProducts } = useProductStore();
fetchProducts();
</script>

<template>
  <v-container>
    <p v-if="loading">Loading...</p>
    <v-row v-if="products">
      <v-col lg="3" v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>
