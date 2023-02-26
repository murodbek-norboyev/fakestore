<script setup>
import { defineProps } from "vue";
import { useCartStore } from "@/stores/cart";
const { addItem, isInCart } = useCartStore();

defineProps(["product"]);
</script>

<template>
  <v-card elevation="3" class="pt-4">
    <v-img height="250" :src="product.image"></v-img>

    <v-card-item>
      <RouterLink
        class="text-black text-decoration-none v-card-title"
        :to="`/product/${product.id}`"
      >
        {{ product.title }}
      </RouterLink>

      <v-card-subtitle>
        <span class="text-uppercase">{{ product.category }}</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="product.rating.rate"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">
          {{ product.rating.rate }} ({{ product.rating.count }})
        </div>
      </v-row>

      <div class="mt-4 text-subtitle-1">{{ product.price }} $</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>
    <v-card-actions>
      <v-btn
        v-if="!isInCart(product.id)"
        variant="text"
        color="primary"
        @click="addItem(product)"
      >
        Add to cart</v-btn
      >
      <v-btn v-else>in the cart</v-btn>
    </v-card-actions>
  </v-card>
</template>
