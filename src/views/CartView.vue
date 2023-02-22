<script setup>
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const { items } = storeToRefs(useCartStore());
const { removeItem, clear, quantityIncrement, quantityDecrement } =
  useCartStore();
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-3">
          <div class="d-flex align-center justify-space-between">
            <h1>Cart</h1>
            <v-btn
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
      <v-col lg="8">
        <v-row>
          <v-col cols="12" v-for="item in items" :key="item.id">
            <v-card class="py-3 ps-3 pe-10">
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
                    <p class="text-h6 text-truncate" style="max-width: 600px">
                      {{ item.title }}
                    </p>
                    <div @click="quantityDecrement(item)">-</div>
                    <div>{{ item.quantity }}</div>
                    <div @click="quantityIncrement(item)">+</div>
                  </div>
                </div>
                <div>
                  <v-img :src="item.image" width="100" />
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="4"></v-col>
    </v-row>
  </v-container>
</template>
