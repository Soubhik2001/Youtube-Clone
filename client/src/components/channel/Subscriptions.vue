<template>
    <app-header></app-header>
  <v-container class="main">
    <h2 class="explore-channels-heading">Subscribed Channels</h2>
    <br />
    <v-row>
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="video-card"
          :class="{ 'card-hover': isHovered === index }"
          @mouseover="isHovered = index"
          @mouseout="isHovered = null"
        >
          <v-img
            :src="card.channel_pic_url"
            aspect-ratio="16/9"
            height="200"
            cover
          ></v-img>
          <v-card-title>{{ card.channel_name }}</v-card-title>
          <v-card-subtitle>{{ card.subscriber_count }} Subscribers</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from 'axios';
import AppHeader from '../common/AppHeader.vue';
import axiosInstance from '@/axiosInstance';
export default {
    components:{
        AppHeader
    },
  data: () => ({
    dialog: false,
    cards: [],
    isHovered: null
  }),
  methods:{
    async getSubscribedChannels(){
      try {
        const response = await axiosInstance.get('http://localhost:3000/user/getSubscriptions');
        // console.log(response);
        if(response.status === 200){
          this.cards = response.data.subscribedChannels;
        }else{
          console.log('Failed to fetch Subscribed Channels');
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created(){
    this.getSubscribedChannels();
  }
};
</script>

<style scoped>
/* .explore-channels-heading {
  padding-top: 100px;
} */
.main{
    padding-left:90px;
}
.card-hover {
  transform: scale(1.05);
}
.main{
  padding-left:100px;
  padding-top:100px;
}


.video-card {
  background: #f1f1f1;
  border-radius: 15px;
  padding: 10px 10px;
  transition: transform 0.5s ease-in-out;
}

.card-hover {
  transform: scale(1.05);
}


</style>
