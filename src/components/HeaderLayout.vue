<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart";
const { totalQuantity } = storeToRefs(useCartStore());
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>
      <router-link class="text-decoration-none" to="/">Fake store</router-link>
    </v-app-bar-title>
    <v-spacer />
    <v-btn class="text-none" icon to="/cart">
      <v-badge
        v-if="totalQuantity > 0"
        :content="totalQuantity"
        color="primary"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
      <v-icon v-else>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
</template>
