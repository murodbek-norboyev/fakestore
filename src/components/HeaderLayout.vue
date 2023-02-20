<template>
  <v-app-bar>
    <v-app-bar-title>
      <router-link class="text-decoration-none" to="/">Fake store</router-link>
    </v-app-bar-title>
    <v-text-field
      placeholder="Search countries"
      variant="solo"
      density="compact"
      hide-details
    />
    <v-spacer />
    <v-btn class="text-none" stacked>
      <v-badge content="9" color="primary">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>
