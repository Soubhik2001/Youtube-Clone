<template>
  <app-header></app-header>
  <v-container class="main">
    <h2>Video Results</h2>
    <br />
    <v-row>
      <v-col
        v-for="video in videoResults"
        :key="video.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        ><router-link
          :to="{ path: '/viewVideo', query: { videoId: video.id } }"
          style="text-decoration: none"
        >
          <v-card
            class="video-card"
            :class="{ 'card-hover': isHovered === video.id }"
            @mouseover="isHovered = video.id"
            @mouseout="isHovered = null"
          >
            <v-img
              :src="video.thumbnail_url"
              aspect-ratio="16/9"
              height="200"
              class="image"
            ></v-img>
            <v-card-title>{{ video.title }}</v-card-title>
            <v-card-subtitle>{{ video.likes_count }} likes</v-card-subtitle>
            <div class="video-details">
              <div class="channel-info">
                <v-img
                  :src="video.channel_pic_url"
                  height="30"
                  width="30"
                  style="border-radius: 15px"
                ></v-img>
                <div class="channel-name">{{ video.channel_name }}</div>
              </div>
            </div>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="main">
    <h2>Channel Results</h2>
    <br />
    <v-row>
      <v-col
        v-for="channel in channelResults"
        :key="channel.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        ><router-link
          :to="{ name: 'channel-info', params: { channelId: channel.id } }"
          style="text-decoration: none"
        >
          <v-card
            class="video-card"
            :class="{ 'card-hover': isHovered === channel.id }"
            @mouseover="isHovered = channel.id"
            @mouseout="isHovered = null"
          >
            <v-img
              :src="channel.channel_pic_url"
              aspect-ratio="16/9"
              height="200"
              class="image"
            ></v-img>
            <v-card-title>{{ channel.channel_name }}</v-card-title>
            <v-card-subtitle>
              {{ channel.subscribers_count }} subscribers</v-card-subtitle
            >
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AppHeader from "../common/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      //   videoResults: [],
      //   channelResults: [],
      isHovered: null,
    };
  },
  computed: {
    videoResults() {
      return this.$store.state.videoResults;
    },
    channelResults() {
      return this.$store.state.channelResults;
    },
  },
  created() {
    // this.videoResults = JSON.parse(this.$route.query.videoResults);
    // this.channelResults = JSON.parse(this.$route.query.channelResults);
  },
};
</script>
<style scoped>
.main {
  padding-left: 100px;
  padding-top: 100px;
}
.video-card {
  background: #f1f1f1;
  border-radius: 15px;
  padding: 10px 10px;
  transition: transform 0.5s ease-in-out;
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
