<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart";
const { items } = storeToRefs(useCartStore());
const { initialize } = useCartStore();
initialize();
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>
      <router-link class="text-decoration-none" to="/">Fake store</router-link>
    </v-app-bar-title>
    <v-spacer />
    <v-btn class="text-none" stacked to="/cart">
      <v-badge :content="items.length" color="primary">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>
