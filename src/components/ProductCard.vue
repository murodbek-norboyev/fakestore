<script setup>
import { defineProps } from "vue";
import { useCartStore } from "@/stores/cart";
const { addItem } = useCartStore();

const props = defineProps(["product"]);
</script>

<template>
  <v-card elevation="3" class="pt-4">
    <v-img height="250" :src="props.product.image"></v-img>

    <v-card-item>
      <RouterLink
        class="text-black text-decoration-none v-card-title"
        :to="`/product/${props.product.id}`"
      >
        {{ props.product.title }}
      </RouterLink>

      <v-card-subtitle>
        <span class="text-uppercase">{{ props.product.category }}</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="props.product.rating.rate"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">
          {{ props.product.rating.rate }} ({{ props.product.rating.count }})
        </div>
      </v-row>

      <div class="mt-4 text-subtitle-1">{{ props.product.price }} $</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>
    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        variant="text"
        @click="addItem(product)"
      >
        Add to cart</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
