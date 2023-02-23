<script setup>
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart";

const route = useRoute();
const { product, loading } = storeToRefs(useProductStore());
const { fetchProduct } = useProductStore();
fetchProduct(route.params.id);

const { addItem, isInCart } = useCartStore();
</script>

<template>
  <v-container>
    <p v-if="loading">Loading post...</p>
    <div v-if="product">
      <v-container>
        <v-row align="center" justify="center">
          <v-col lg="3">
            <v-img cover :src="product.image" :alt="product.title" />
          </v-col>
          <v-col lg="4">
            <v-card>
              <v-card-title>{{ product.title }}</v-card-title>
              <v-card-text>
                <div>
                  <span class="text-h6 text-blue">Category:</span>
                  <span class="text-subtitle-1">{{ product.category }}</span>
                </div>
                <div class="d-flex align-center">
                  <div class="text-grey me-4">
                    <span class="text-h5 text-blue">Rate:</span>
                    {{ product.rating.rate }} ({{ product.rating.count }})
                  </div>
                  <v-rating
                    :model-value="product.rating.rate"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="medium"
                  ></v-rating>
                </div>
                <div class="mt-3 text-subtitle-1">
                  <span class="text-h6 text-blue">Price:</span>
                  {{ product.price }} $
                </div>
                <div class="mb-3">
                  <span class="text-h6 text-blue">Description:</span>
                  {{ product.description }}
                </div>
                <v-btn
                  v-if="!isInCart(product.id)"
                  color="primary"
                  @click="addItem(product)"
                >
                  Add to cart</v-btn
                >
                <v-btn v-else>in the cart</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>
