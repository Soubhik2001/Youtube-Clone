import { createRouter, createWebHistory } from "vue-router";
import AppLogin from '../components/auth/AppLogin.vue';
import AppRegister from '../components/auth/AppRegister.vue';
import AppForgotPassword from '../components/auth/AppForgotPassword.vue';
import AppHome from '../components/home/AppHome.vue';
import CreateChannel from '../components/channel/CreateChannel.vue';
import Profile from '../components/user/Profile.vue';

const routes = [
  { path: '/', component: AppLogin },
  { path: '/register', component: AppRegister},
  { path: '/forgot', component: AppForgotPassword},
  { path: '/home', component: AppHome},
  { path: '/channel', component:CreateChannel},
  { path: '/profile', component:Profile}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
