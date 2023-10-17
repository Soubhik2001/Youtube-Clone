<template>
  <app-header></app-header>
  <v-container class="main">
    <!-- Video Player -->
    <v-card class="video-card">
      <v-responsive>
        <video controls :src="videoUrl" class="video-player"></video>
      </v-responsive>
    </v-card>

    <!-- Actions -->
    <v-card class="actions">
      <v-card-title class="headline">{{ videoTitle }}</v-card-title>
      <v-card-subtitle>
        <i
          @click="toggleLike"
          :style="{ color: likeColor }"
          class="fas fa-thumbs-up"
          style="font-size: 25px; padding: 10px"
        ></i> {{ likesCount }} Likes
        <i
          @click="toggleDislike"
          :style="{ color: dislikeColor }"
          class="fa fa-thumbs-down"
          style="font-size: 25px; padding: 10px"
        ></i>{{ dislikesCount }} Dislikes
      </v-card-subtitle>
      <div class="video-metadata">
        <v-avatar class="avatar">
          <img :src="channelImage" alt="Channel Image" />
        </v-avatar>
        <div class="channel-name">{{ channelName }}</div>
      </div>
      <v-card-text>
        <v-textarea v-model="comment" label="Add a Comment"></v-textarea>
        <v-btn @click="postComment">Post Comment</v-btn>
      </v-card-text>
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
            <v-card-title class="subheading">{{
              relatedVideo.title
            }}</v-card-title>
            <v-card-subtitle>{{ relatedVideo.channelName }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
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
      videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      videoTitle: "Sample Video Title",
      videoViews: 1000,
      channelImage:
        "https://yt3.googleusercontent.com/ytc/AOPolaS101j27Disa_BYArytv-hXMRl8wNMtqZMTkrfH=s176-c-k-c0x00ffffff-no-rj",
      channelName: "Channel Name",
      likesCount: 500,
      dislikesCount:20,
      relatedVideos: [
        {
          thumbnail:
            "https://i.ytimg.com/vi/6TYkDy54q4E/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBWCIWtkNOQuG_8cs42HbQygXoCTA",
          title: "Related Video 1",
          channelName: "Related Channel 1",
        },
        {
          thumbnail:
            "https://i.ytimg.com/vi/rioc6mTWOZs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJiTR6fmKJU7LmK2o1lfq5F7PXEw",
          title: "Related Video 2",
          channelName: "Related Channel 2",
        },
      ],
      likeColor: "grey", 
      dislikeColor: "grey", 
      comment: "",
      likeState: false,
      dislikeState: false,
    };
  },
  methods:{
  toggleLike() {
      this.likeState = !this.likeState;
      this.dislikeState = false; 
      this.updateColors();
    },
    toggleDislike() {
      this.dislikeState = !this.dislikeState;
      this.likeState = false; 
      this.updateColors();
    },
    updateColors() {
      this.likeColor = this.likeState ? "blue" : "grey";
      this.dislikeColor = this.dislikeState ? "red" : "grey";
    },
  },
  postComment() {
   
    console.log("Posted Comment:", this.comment);
  }
};
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
  padding-top: 10px;
  padding-left:10px;
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
