<script setup>
import HeaderLayout from "@/components/HeaderLayout";
import { useCartStore } from "@/stores/cart";
const { initialize } = useCartStore();
initialize();
</script>

<template>
  <v-app>
    <HeaderLayout />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
