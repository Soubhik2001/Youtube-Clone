import { createApp } from "vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@fortawesome/fontawesome-free/css/all.css';
import vue3GoogleLogin from 'vue3-google-login';

const vuetify = createVuetify({
  components,
  directives,
});

const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);
app.use(vue3GoogleLogin, {
  clientId: CLIENT_ID
})
app.mount("#app");
