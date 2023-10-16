<template>
    <app-header></app-header>
    <v-container class="main">
    <!-- Video Player -->
    <v-card class="video-card">
      <v-responsive>
        <video controls :src="videoUrl" class="video-player"></video>
      </v-responsive>
    </v-card>

    <!-- Video Details -->
    <v-card class="video-details">
      <v-card-title class="headline">{{ videoTitle }}</v-card-title>
      <v-card-subtitle>{{ likesCount }} Likes</v-card-subtitle>
      <div class="video-metadata">
        <v-avatar class="avatar">
          <img :src="channelImage" alt="Channel Image" />
        </v-avatar>
        <div class="channel-name">{{ channelName }}</div>
        <v-icon class="icon">mdi-thumb-up</v-icon>
        <!-- <div class="likes">{{ likesCount }}</div> -->
      </div>
    </v-card>

    <!-- Related Videos -->
    <v-card class="related-videos">
      <v-card-title class="headline">Related Videos</v-card-title>
      <v-row>
        <v-col
          v-for="(relatedVideo, index) in relatedVideos"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="related-video-card">
            <v-img :src="relatedVideo.thumbnail" aspect-ratio="16/9"></v-img>
            <v-card-title class="subheading">{{ relatedVideo.title }}</v-card-title>
            <v-card-subtitle>{{ relatedVideo.channelName }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import AppHeader from '../common/AppHeader.vue';
export default {
    components:{
        AppHeader
    },
    data() {
    return {
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      videoTitle: 'Sample Video Title',
      videoViews: 1000,
      channelImage: "https://yt3.googleusercontent.com/ytc/AOPolaS101j27Disa_BYArytv-hXMRl8wNMtqZMTkrfH=s176-c-k-c0x00ffffff-no-rj",
      channelName: 'Channel Name',
      likesCount: 500,
      relatedVideos: [
        {
          thumbnail: 'https://i.ytimg.com/vi/6TYkDy54q4E/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBWCIWtkNOQuG_8cs42HbQygXoCTA',
          title: 'Related Video 1',
          channelName: 'Related Channel 1',
        },
        {
          thumbnail: 'https://i.ytimg.com/vi/rioc6mTWOZs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJiTR6fmKJU7LmK2o1lfq5F7PXEw',
          title: 'Related Video 2',
          channelName: 'Related Channel 2',
        },
      ],
    };
  },
}
</script>

<style scoped>
.main {
  padding-left: 100px;
  padding-top: 100px;
}
.video-card {
  margin-bottom: 20px;
}
.video-player {
  width: 100%;
}
.video-details {
  padding: 20px;
}
.video-metadata {
  display: flex;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
}
.channel-name {
  margin-left: 10px;
  font-weight: bold;
}
.icon {
  margin-left: 10px;
}
.likes {
  margin-right: 20px;
}
.related-videos {
  margin-top: 20px;
}
.related-video-card {
  margin-bottom: 20px;
}
</style>