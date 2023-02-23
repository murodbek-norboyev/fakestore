<script setup>
import { defineProps } from "vue";
import { useCartStore } from "@/stores/cart";
defineProps(["item"]);
const { removeItem, quantityIncrement, quantityDecrement } = useCartStore();
</script>

<template>
  <v-card class="py-3 ps-3 pe-10" elevation="3">
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          icon
          color="red"
          class="me-5"
          @click="removeItem(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <div>
          <p class="font-weight-bold text-h5">{{ item.price }} $</p>
          <RouterLink
            class="text-black text-decoration-none d-inline-block text-h6 text-truncate"
            style="max-width: 600px"
            :to="`/product/${item.id}`"
          >
            {{ item.title }}
          </RouterLink>
          <div class="d-flex align-center mt-6">
            <v-btn @click="quantityDecrement(item)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-text-field
              :model-value="item.quantity"
              hide-details
              readonly
              variant="solo"
              density="compact"
              class="mx-6 justify-center align-center"
              style="max-width: 60px"
            />
            <v-btn @click="quantityIncrement(item)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div>
        <v-img :src="item.image" width="100" />
      </div>
    </div>
  </v-card>
</template>
