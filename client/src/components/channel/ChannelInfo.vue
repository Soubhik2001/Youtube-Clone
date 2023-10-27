<template>
  <app-header></app-header>
  <v-container class="main">
    <!-- Channel Info Section -->
    <v-row v-if="channelData && channelData.length > 0">
      <v-col cols="12" md="6">
        <h2 class="channel-name">{{ channelData[0].channel_name }}</h2>
        <p class="channel-description">{{ channelData[0].description }}</p>
        <p class="channel-description">
          {{ channelData[0].subscriber_count }} subscribers
        </p>
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
      <v-col>
        <v-btn
          style="background-color: #da4e44; color: #ffffff; margin-top: 100px"
          v-if="showUploadButton"
          @click="openUploadDialog"
        >
          Upload Video
        </v-btn>
      </v-col>
    </v-row>
    <hr class="divider" v-if="channelData && channelData.length > 0" />

    <!-- Video Section -->
    <h2 class="video-heading" v-if="channelData && channelData.length > 0">
      Videos
    </h2>
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
          <v-card-title class="no-data-title"
            >No channel data available</v-card-title
          >
          <v-card-text class="no-data-text">
            The Channel has not posted any video.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Video Upload Dialog -->
    <v-dialog v-model="uploadDialog" max-width="700">
      <v-card>
        <v-card-title class="headline">Upload Video</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitVideo">
            <v-text-field
              v-model="title"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              v-model="description"
              label="Description"
              required
            ></v-textarea>
            <v-text-field
              v-model="thumbnail_url"
              label="Thumbnail URL"
              required
            ></v-text-field>
            <v-text-field
              v-model="video_url"
              prepend-icon="fas fa-video"
              required
              label="Video URL"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn style="color: #da4e44" @click="submitVideo">Upload</v-btn>
          <v-btn style="color: #da4e44" @click="closeUploadDialog"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      showUploadButton: false,
      uploadDialog: false,
      title:"",
      description:"",
      thumbnail_url:"",
      video_url:"",
    };
  },
  methods: {
    //to fetch channel data
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
    openUploadDialog() {
      this.uploadDialog = true;
    },

    closeUploadDialog() {
      this.uploadDialog = false;
    },
    async submitVideo() {
      const data = {
        title: this.title,
        description: this.description,
        thumbnail_url: this.thumbnail_url,
        video_url: this.video_url,
        channel_id: this.$route.params.channelId,
      };
      try {
        const response = await axiosInstance.post(
          "http://localhost:3000/video/upload",
          data
        );
        if(response.status === 200){
          this.closeUploadDialog();
          this.fetchChannelData();
          this.title = "";
          this.description ="";
          this.thumbnail_url = "";
          this.video_url = "";
        }else{
          console.log("Failed to upload video");
        }
      } catch (error) {
        console.error(error);
      }
      this.closeUploadDialog();
    },
  },

  //beforeRouteEnter guard to check the previous route and show the upload button accordingly
  beforeRouteEnter(to, from, next) {
    const showUploadButton = from.name === "my-channel";
    next((vm) => {
      vm.showUploadButton = showUploadButton;
    });
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
  margin: 150px;
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
