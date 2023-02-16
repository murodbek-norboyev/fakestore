<template>
  <v-app>
    <HeaderLayout />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import HeaderLayout from "@/components/HeaderLayout";
</script>
