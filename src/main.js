import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia/dist/pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const pinia = createPinia();
loadFonts();

createApp(App).use(router).use(vuetify).use(pinia).use(Toast).mount("#app");
