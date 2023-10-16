<template>
  <app-header></app-header>
  <v-container class="main">
    <h2>Liked Videos</h2>
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
            :src="card.thumbnail_url"
            aspect-ratio="16/9"
            height="200"
            class="image"
          ></v-img>
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-subtitle>{{ card.like_count }} Likes</v-card-subtitle>
          <div class="video-details">
            <!-- <div class="duration">{{ card.duration }}</div> -->
            <div class="channel-info">
              <v-img
                :src="card.channel_pic_url"
                height="30"
                width="30"
                style="border-radius: 15px"
              ></v-img>
              <div class="channel-name">{{ card.channel_name }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from "axios";
import AppHeader from "../common/AppHeader.vue";
import axiosInstance from "@/axiosInstance";

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      cards: [],
      isHovered: null,
    };
  },
  methods: {
    async getLikedVideos() {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/user/getLikedVideos"
        );

        console.log(response);
        if (response.status === 200) {
          this.cards = response.data.likedVideos;
        } else {
          console.log("Unable to fetch Liked Videos");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getLikedVideos();
  },
};
</script>

<style scoped>
.main {
  padding-left: 100px;
  padding-top: 100px;
}
.image {
  padding: 2px;
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

.video-details {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.duration {
  color: #9a9a9a;
  font-size: 0.8rem;
}

.channel-info {
  display: flex;
  align-items: center;
}

.channel-name {
  color: #9a9a9a;
  font-size: 0.8rem;
  margin-left: 5px;
}
</style>
