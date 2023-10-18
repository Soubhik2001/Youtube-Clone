<template>
  <app-header></app-header>
  <v-container class="main">
    <div v-if="videoDetails">
      <!-- Video Player -->
      <v-card class="video-card">
        <v-responsive>
          <video
            controls
            :src="videoDetails.video_url"
            class="video-player"
          ></video>
        </v-responsive>
      </v-card>

      <!-- Actions -->
      <v-card class="actions">
        <v-card-title class="headline">{{ videoDetails.title }}</v-card-title>
        <v-card-subtitle>
          <i
            @click="toggleLike"
            :style="{ color: likeColor }"
            class="fas fa-thumbs-up"
            style="font-size: 25px; padding: 10px"
          ></i>
          {{ videoDetails.likes }} Likes
          <i
            @click="toggleDislike"
            :style="{ color: dislikeColor }"
            class="fa fa-thumbs-down"
            style="font-size: 25px; padding: 10px"
          ></i>
          {{ videoDetails.dislikes }} Dislikes
        </v-card-subtitle>
        <div class="video-metadata">
          <v-avatar class="avatar">
            <img :src="videoDetails.channel_pic_url" alt="Channel Image" />
          </v-avatar>
          <div class="channel-name">{{ videoDetails.channel_name }}</div>
        </div>
        <v-card-text>
          <p class="upload-date">Uploaded {{ daysAgo }} days ago</p>
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
              <v-card-title class="subheading">
                {{ relatedVideo.title }}
              </v-card-title>
              <v-card-subtitle>{{ relatedVideo.channelName }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <div v-else>
      <v-progress-circular
        indeterminate
        color="primary"
        class="centered-progress"
        model-value="20"
        :size="70"
        :width="5"
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import axiosInstance from "@/axiosInstance";
import AppHeader from "../common/AppHeader.vue";
import axios from "axios";
export default {
  components: {
    AppHeader,
  },
  data() {
    return {
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
      videoDetails: null,
      loading: false,
      error: null,
      baseUrl: "http://localhost:3000",
    };
  },
  computed: {
  daysAgo() {
    if (!this.videoDetails || !this.videoDetails.upload_date) {
      return "";
    }
    const uploadDate = new Date(this.videoDetails.upload_date);
    const currentDate = new Date();

    const timeDifference = currentDate - uploadDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  },
},

  methods: {
    constructVideoUrl(relativePath) {
      return this.baseUrl + "/" + relativePath;
    },
    async toggleLike() {
      // this.likeState = !this.likeState;
      // this.dislikeState = false;
      // this.updateColors();

      const videoId = this.$route.query.videoId;
      const apiUrl = `http://localhost:3000/like/addLike/${videoId}`;

      try {
        // console.log(videoId);
        if (!this.likeState) {
          const response = await axiosInstance.post(apiUrl);
          if (response.status === 200) {
            this.likeState = true;
            this.updateColors();
            this.videoDetails.likes++;
            if (this.dislikeState) {
              this.dislikeState = false;
              this.updateColors();
              this.videoDetails.dislikes--;
            }
          } else {
            console.log("Failed to add like");
          }
        } else {
          const deleteUrl = `http://localhost:3000/like/deleteLike/${videoId}`;
          const response = await axiosInstance.delete(deleteUrl);
          if (response.status === 200) {
            this.likeState = false;
            this.updateColors();
            this.videoDetails.likes--;
          } else {
            console.log("Failed to remove like");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async toggleDislike() {
      // this.dislikeState = !this.dislikeState;
      // this.likeState = false;
      // this.updateColors();

      const videoId = this.$route.query.videoId;
      const apiUrl = `http://localhost:3000/like/addDislike/${videoId}`;

      try {
        if (!this.dislikeState) {
          const response = await axiosInstance.post(apiUrl);
          if (response.status === 200) {
            this.dislikeState = true;
            this.updateColors();
            this.videoDetails.dislikes++;
            if (this.likeState) {
              this.likeState = false;
              this.updateColors();
              this.videoDetails.likes--;
            }
          } else {
            console.log("Failed to add dislike");
          }
        } else {
          const deleteUrl = `http://localhost:3000/like/deleteDislike/${videoId}`;
          const response = await axiosInstance.delete(deleteUrl);
          if (response.status === 200) {
            this.dislikeState = false;
            this.updateColors();
            this.videoDetails.dislikes--;
          } else {
            console.log("Failed to remove dislike");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    updateColors() {
      this.likeColor = this.likeState ? "blue" : "grey";
      this.dislikeColor = this.dislikeState ? "red" : "grey";
    },
    postComment() {
      console.log("Posted Comment:", this.comment);
    },
    async getVideoDetails() {
      this.loading = true;
      this.error = null;

      try {
        const videoId = this.$route.query.videoId;

        const apiUrl = `http://localhost:3000/user/getVideo/${videoId}`;
        const response = await axiosInstance.get(apiUrl);
        console.log(response);

        if (response.status === 200) {
          this.videoDetails = response.data.results[0];
          if (this.videoDetails.userLike) {
            this.likeState = true;
            this.likeColor = "blue";
          }
          if (this.videoDetails.userDislike) {
            this.dislikeState = true;
            this.dislikeColor = "red";
          }
          console.log(this.videoDetails.video_url);
        } else {
          this.error = "Failed to fetch video";
        }
      } catch (error) {
        console.log(error);
        this.error = "An error occurred while fetching video details";
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.getVideoDetails();
  },
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
  padding-left: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
}
.channel-name {
  margin-left: 10px;
  font-weight: bold;
}
/* .icon {
  margin-left: 10px;
} */
/* .likes {
  margin-right: 20px;
} */
.related-videos {
  margin-top: 20px;
}
.related-video-card {
  margin-bottom: 20px;
}
.centered-progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.upload-date {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
}
</style>
