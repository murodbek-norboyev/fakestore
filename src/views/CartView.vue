<script setup>
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import CartItem from "@/components/CartItem.vue";

const { items, totalQuantity, totalPrice } = storeToRefs(useCartStore());
const { clear } = useCartStore();
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-3">
          <div class="d-flex align-center justify-space-between">
            <h1>Cart</h1>
            <v-btn
              v-if="items.length"
              append-icon="mdi-delete"
              variant="text"
              color="red"
              @click="clear"
            >
              Clear all
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="items.length">
        <v-row>
          <v-col lg="8">
            <v-row>
              <v-col cols="12" v-for="item in items" :key="item.id">
                <CartItem :item="item" />
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="4">
            <v-card class="pa-3" elevation="3">
              <div class="text-h5">Total quantity: {{ totalQuantity }}</div>
              <div class="text-h5">Total price: {{ totalPrice }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-else>
        <div>You have no items in your shopping cart!</div>
      </v-col>
    </v-row>
  </v-container>
</template>
