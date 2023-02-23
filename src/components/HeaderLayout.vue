<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart";
const { totalQuantity } = storeToRefs(useCartStore());
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
      <v-badge
        :content="totalQuantity"
        color="primary"
        v-if="totalQuantity > 0"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
      <v-icon v-else>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
</template>
