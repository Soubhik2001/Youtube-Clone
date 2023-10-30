<template>
    <app-header></app-header>
    <v-container class="main">
      <v-row>
        <v-col>
          <h2>My Channels</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(channel, index) in channels"
          :key="channel.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        ><router-link :to="{name: 'channel-info',  params: { channelId: channel.id }}" style="text-decoration: none;">
          <v-card
            class="video-card"
            :class="{ 'card-hover': isHovered === index }"
            @mouseover="isHovered = index"
            @mouseout="isHovered = null"
          >
            <v-img
              :src="channel.channel_pic_url"
              aspect-ratio="16/9"
              height="200"
              cover
            ></v-img>
            <v-card-title>{{ channel.channel_name }}</v-card-title>
            <!-- <div class="channel-metadata">
              <div class="likes">{{ channel.likes }} Likes</div>
            </div> -->
          </v-card>
        </router-link>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axiosInstance from "@/axiosInstance";
  import AppHeader from "../common/AppHeader.vue";
  export default {
    components: {
      AppHeader,
    },
    data() {
      return {
        channels: [],
        isHovered: null,
      };
    },
    created() {
      this.fetchMyChannels();
    },
    methods: {

      //fetch channels of the user logged-in
      async fetchMyChannels() {
        try {
          const response = await axiosInstance.get(
            "http://localhost:3000/user/myChannel"
          );
          console.log(response);
          if (response.status === 200) {
            this.channels = response.data.results;
          } else {
            console.log("Failed to fetch channels");
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .main {
    padding-top: 100px;
    padding-left: 100px;
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
  