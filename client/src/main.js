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
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

const vuetify = createVuetify({
  components,
  directives,
});

const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);
app.use(ToastPlugin);
app.use(vue3GoogleLogin, {
  clientId: CLIENT_ID
})
app.mount("#app");
