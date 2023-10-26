<template>
  <app-header></app-header>
  <v-container class="main">
    <v-row v-if="channelData && channelData.length > 0">
      <v-col cols="12" md="6">
        <h2 class="channel-name">{{ channelData[0].channel_name }}</h2>
        <p class="channel-description">{{ channelData[0].description }}</p>
        <p class="channel-description">{{ channelData[0].subscriber_count }} subscribers</p>
      </v-col>
      <v-col>
        <v-avatar size="150">
          <img
            :src="channelData[0].channel_pic_url"
            alt="channel_pic"
            class="channel-image"
          />
        </v-avatar>
      </v-col>
    </v-row>
    <hr class="divider" v-if="channelData && channelData.length > 0" />
    <h2 class="video-heading" v-if="channelData && channelData.length > 0">Videos</h2>
    <v-row v-if="channelData && channelData.length > 0">
      <v-col
        v-for="(video, index) in channelData"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <router-link
          :to="{ path: '/viewVideo', query: { videoId: video.id } }"
          style="text-decoration: none"
        >
          <v-card
            class="video-card"
            :class="{ 'card-hover': isHovered === index }"
            @mouseover="isHovered = index"
            @mouseout="isHovered = null"
          >
            <v-img
              :src="video.thumbnail_url"
              aspect-ratio="16/9"
              class="video-image"
            ></v-img>
            <v-card-title class="video-title">{{ video.title }}</v-card-title>
            <p class="video-likes">{{ video.like_count }} Likes</p>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card class="no-data-card">
          <v-card-title class="no-data-title">No channel data available</v-card-title>
          <v-card-text class="no-data-text">
            The Channel has not posted any video.
          </v-card-text>
        </v-card>
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
      channelData: null,
      isHovered: null,
    };
  },
  methods: {
    async fetchChannelData() {
      try {
        const channelId = this.$route.params.channelId;
        const response = await axiosInstance.get(
          `http://localhost:3000/channel/getVideoFromChannel/${channelId}`
        );
        if (response.status === 200) {
          this.channelData = response.data.results;
        } else {
          console.log("Failed to fetch channel data");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchChannelData();
  },
};
</script>

<style scoped>
.main {
  padding-left: 100px;
  padding-top: 100px;
}
.channel-name {
  font-size: 24px;
  margin-bottom: 10px;
}
.channel-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}
.channel-image {
  border-radius: 50%;
}
.divider {
  border-top: 1px solid #ddd;
  margin-top: 20px;
  margin-bottom: 20px;
}
.video-card {
  background: #f1f1f1;
  border-radius: 15px;
  padding: 10px 10px;
  transition: transform 0.5s ease-in-out;
}
.video-image {
  border-radius: 10px;
}
.video-title {
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.video-likes {
  font-size: 14px;
  color: #888;
}
.card-hover {
  transform: scale(1.05);
}
.video-heading {
  padding-bottom: 20px;
}
.no-data-card {
  background: #f1f1f1;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  margin:150px;
}

.no-data-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.no-data-text {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}
</style>
