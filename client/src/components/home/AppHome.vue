<template>
  <div>
    <app-header></app-header>
    <show-videos></show-videos>
  </div>
</template>

<script>
import AppHeader from "../common/AppHeader.vue";
import ShowVideos from "../videos/ShowVideos.vue";

export default {
  components: {
    AppHeader,
    ShowVideos
  },
  // data(){
  //   return{
  //     createChannelDialog :false,
  //   };
  // },
  // methods:{
  //   openCreateChannelDialog(){
  //     this.createChannelDialog = true;
  //   }
  // }
};
</script>
