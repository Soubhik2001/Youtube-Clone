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
          <p class="upload-date">Uploaded {{ formattedUploadDate }}</p>
          <v-text-field v-model="comment" label="Add a Comment"></v-text-field>
          <v-btn class="comment-action" @click="clearComment">Clear</v-btn>
          <v-btn class="comment-action" @click="postComment"
            >Post Comment</v-btn
          >
        </v-card-text>

        <!-- Comments Section -->
        <v-card class="comments">
          <v-card-title class="headline">Comments</v-card-title>
          <v-list>
            <v-list-item v-if="comments.length === 0">
              <div class="comment-item">
                <span class="comment-username">No comments yet</span>
              </div>
            </v-list-item>
            <v-list-item v-for="(comment, index) in comments" :key="index">
              <!-- <v-list-item-avatar v-if="comment.user_pic_url">
                <img :src="comment.user_pic_url" alt="User Avatar" />
              </v-list-item-avatar> -->

              <!-- <v-list-item-content v-if="comments">
                 <v-list-item-title>{{ comment.username }}</v-list-item-title>
                <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle> 
              </v-list-item-content> -->
              <div class="comment-item">
                <span class="comment-username">{{ comment.username }}</span>
                <p class="comment-content">{{ comment.content }}</p>
                <p class="comment-date right-align">
                  {{ formattedCommentDate(comment.comment_date) }}
                </p>
              </div>
            </v-list-item>
          </v-list>
        </v-card>
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
import socketioService from "@/services/socketio.service";
import AppHeader from "../common/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      comment: "",
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
      comments: [],
      likeState: false,
      dislikeState: false,
      videoDetails: null,
      loading: false,
      error: null,
      baseUrl: "http://localhost:3000",
      username: "",
    };
  },
  computed: {
    //display the date on which video was uploaded in a formatted way
    formattedUploadDate() {
      if (!this.videoDetails || !this.videoDetails.upload_date) {
        return "";
      }

      const uploadDate = new Date(this.videoDetails.upload_date);
      const currentDate = new Date();
      const timeDifference = currentDate - uploadDate;
      const secondsAgo = Math.floor(timeDifference / 1000);
      const minutesAgo = Math.floor(secondsAgo / 60);
      const hoursAgo = Math.floor(minutesAgo / 60);
      const daysAgo = Math.floor(hoursAgo / 24);
      const monthsAgo = Math.floor(daysAgo / 30.42);
      const yearsAgo = Math.floor(monthsAgo / 12);

      if (yearsAgo > 0) {
        return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
      } else if (monthsAgo > 0) {
        return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
      } else if (daysAgo > 0) {
        return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
      } else if (hoursAgo > 0) {
        return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
      } else if (minutesAgo > 0) {
        return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
      } else {
        return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ago`;
      }
    },

    //display the date on which comment was added in a formatted way
    formattedCommentDate() {
      return (date) => {
        if (!date) {
          return "";
        }

        const uploadDate = new Date(date);
        const currentDate = new Date();
        const timeDifference = currentDate - uploadDate;
        const secondsAgo = Math.floor(timeDifference / 1000);
        const minutesAgo = Math.floor(secondsAgo / 60);
        const hoursAgo = Math.floor(minutesAgo / 60);
        const daysAgo = Math.floor(hoursAgo / 24);
        const monthsAgo = Math.floor(daysAgo / 30.42);
        const yearsAgo = Math.floor(monthsAgo / 12);

        if (yearsAgo > 0) {
          return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
        } else if (monthsAgo > 0) {
          return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
        } else if (daysAgo > 0) {
          return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
        } else if (hoursAgo > 0) {
          return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
        } else if (minutesAgo > 0) {
          return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
        } else {
          return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ago`;
        }
      };
    },
  },

  methods: {
    constructVideoUrl(relativePath) {
      return this.baseUrl + "/" + relativePath;
    },
    clearComment() {
      this.comment = "";
    },

    //to add a like to a video, remove the existing dislike(if exist)
    async toggleLike() {
      const videoId = this.$route.query.videoId;
      const apiUrl = `http://localhost:3000/like/addLike/${videoId}`;

      try {
        // console.log(videoId);
        if (!this.likeState) {
          const response = await axiosInstance.post(apiUrl);
          if (response.status === 200) {
            this.likeState = true;
            this.updateColors();
            socketioService.getSocket().emit("like", videoId);
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

    //to add a dislike to a video, remove the existing like(if exist)
    async toggleDislike() {
      const videoId = this.$route.query.videoId;
      const apiUrl = `http://localhost:3000/like/addDislike/${videoId}`;

      try {
        if (!this.dislikeState) {
          const response = await axiosInstance.post(apiUrl);
          if (response.status === 200) {
            this.dislikeState = true;
            this.updateColors();
            socketioService.getSocket().emit("dislike", videoId);
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

    //to update css of the like button based on like
    updateColors() {
      this.likeColor = this.likeState ? "blue" : "grey";
      this.dislikeColor = this.dislikeState ? "red" : "grey";
    },

    //to post comment
    async postComment() {
      // console.log("Posted Comment:", this.comment);
      if (!this.comment) {
        return;
      }

      const videoId = this.$route.query.videoId;
      try {
        const response = await axiosInstance.post(
          "http://localhost:3000/comment/add",
          {
            videoId: videoId,
            text: this.comment,
          }
        );

        if (response.status === 200 && response.data.success) {
          const newComment = {
            username: this.username,
            content: this.comment,
            comment_date: new Date(),
          };
          this.comments.push(newComment);
          this.$toast.open({
            message: "Comment added successfully",
            type: "success",
          });
          socketioService.getSocket().emit("comment", videoId);
          this.comment = "";
        } else {
          // console.log("Failed to add a comment.");
          this.$toast.open({
            message: "Failed to add comment",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },

    //to fetch all the details of a particular video
    async getVideoDetails() {
      this.loading = true;
      this.error = null;

      try {
        const videoId = this.$route.query.videoId;

        const apiUrl = `http://localhost:3000/user/getVideo/${videoId}`;
        const response = await axiosInstance.get(apiUrl);
        // console.log(response);

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
          // console.log(this.videoDetails.video_url);

          const commentsApiUrl = `http://localhost:3000/comment/videos/${videoId}`;
          const commentsResponse = await axiosInstance.get(commentsApiUrl);
          console.log(commentsResponse);

          if (commentsResponse.status === 200) {
            this.comments = commentsResponse.data.comments;
          } else {
            this.comments = [];
          }
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

    //to fetch the username from the profile
    async getUserProfile() {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/user/getProfile"
        );
        // console.log(response);
        if (response.status === 200) {
          this.username = response.data.results[0].username;
        } else {
          console.log("Failed to fetch user profile");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getVideoDetails();
    this.getUserProfile();
  },
};
</script>

<style scoped>
.main {
  padding-left: 100px;
  padding-top: 110px;
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
  border-radius: 50%;
  overflow: hidden;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.channel-name {
  margin-left: 10px;
  font-weight: bold;
}

.comments {
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  background-color: #f5f5f5;
}
.comments img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.comment-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}
.comment-username {
  font-weight: bold;
}
.comment-content {
  margin-top: 5px;
}

/* Style for related videos */
.related-videos {
  margin-top: 20px;
}
.related-video-card {
  margin-bottom: 20px;
}
.upload-date {
  padding-bottom: 20px;
}
.comment-action {
  margin: 10px;
}
.comment-date {
  color: #777;
  font-size: 12px;
}
.comment-date.right-align {
  text-align: right;
}
</style>
