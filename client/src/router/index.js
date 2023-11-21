import { createRouter, createWebHistory } from "vue-router";
import AppLogin from '../components/auth/AppLogin.vue';
import AppRegister from '../components/auth/AppRegister.vue';
import AppForgotPassword from '../components/auth/AppForgotPassword.vue';
import AppHome from '../components/home/AppHome.vue';
import CreateChannel from '../components/channel/CreateChannel.vue';
import Profile from '../components/user/Profile.vue';
import Subscriptions from '../components/channel/Subscriptions.vue';
import LikedVideos from '../components/videos/LikedVideos.vue';
import ExploreVideos from '../components/videos/ExploreVideos.vue';
import TrendingVideos from '../components/videos/TrendingVideos.vue';
import ViewVideo from '../components/videos/ViewVideo.vue';
import ChannelInfo from '../components/channel/ChannelInfo.vue';
import MyChannel from '../components/channel/MyChannel.vue';
import Notification from '../components/user/Notification.vue';
import SearchResults from '../components/search/SearchResults.vue';
import { authGuard } from "./auth";

const routes = [
  { path: '/', component: AppLogin },
  { path: '/register', component: AppRegister },
  { path: '/forgot', component: AppForgotPassword },
  { path: '/home', name:'home', component: AppHome, beforeEnter:authGuard },
  { path: '/channel', name:'channel', component:CreateChannel, beforeEnter:authGuard },
  { path: '/profile', component:Profile, beforeEnter:authGuard },
  { path: '/subscriptions', component:Subscriptions, beforeEnter:authGuard },
  { path: '/likedVideos', name:'liked-videos', component:LikedVideos, beforeEnter:authGuard },
  { path: '/exploreVideos', name:'explore-videos', component:ExploreVideos },
  { path: '/trendingVideos', name:'trending-videos', component:TrendingVideos },
  { path: '/viewVideo', component:ViewVideo, beforeEnter:authGuard },
  { path: '/channelInfo/:channelId', name:'channel-info', component:ChannelInfo, beforeEnter:authGuard },
  { path: '/myChannel', name:'my-channel',component:MyChannel, beforeEnter:authGuard },
  { path: '/notification', component:Notification, beforeEnter:authGuard },
  { path: '/searchResults', name:'search-results', component:SearchResults },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from ,next) => {
  if(to.path ==='/'){
    const isAuthenticated = localStorage.getItem('token');
    if(isAuthenticated){
      localStorage.removeItem('token');
      alert('You have been logged out. Please login again');
    }
  }
  next();
});

export default router;
