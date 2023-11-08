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


const routes = [
  { path: '/', component: AppLogin },
  { path: '/register', component: AppRegister },
  { path: '/forgot', component: AppForgotPassword },
  { path: '/home', name:'home', component: AppHome },
  { path: '/channel', name:'channel', component:CreateChannel },
  { path: '/profile', component:Profile },
  { path: '/subscriptions', component:Subscriptions },
  { path: '/likedVideos', name:'liked-videos', component:LikedVideos },
  { path: '/exploreVideos', name:'explore-videos', component:ExploreVideos },
  { path: '/trendingVideos', name:'trending-videos', component:TrendingVideos },
  { path: '/viewVideo', component:ViewVideo },
  { path: '/channelInfo/:channelId', name:'channel-info', component:ChannelInfo },
  { path: '/myChannel', name:'my-channel',component:MyChannel },
  { path: '/notification', component:Notification },
  { path: '/searchResults', name:'search-results', component:SearchResults },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
