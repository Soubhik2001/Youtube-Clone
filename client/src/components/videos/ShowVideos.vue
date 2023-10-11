<template>
    <v-container>
      <v-row style="margin-left:80px">
        <v-col v-for="video in videos" :key="video.id" cols="12" sm="6" md="4">
          <v-card class="video">
            <!-- Video Thumbnail -->
            <v-img :src="video.thumbnailUrl" aspect-ratio="16/9" height="200"></v-img>
  
            <!-- Video Title -->
            <v-card-title>{{ video.title }}</v-card-title>
  
            <!-- Video Views -->
            <v-card-subtitle>{{ video.views }} views</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        videos: [
          {
            id: 1,
            title: "Sample Video 1",
            thumbnailUrl: "https://media.istockphoto.com/id/1398231633/vector/3d-refresh-update-reload-icon-vector.jpg?s=612x612&w=0&k=20&c=da2QRMcFVCSacx5g3xymzhFxSN5JnZs5kgKmW9nGD80=",
            views: 10000,
          },
          {
            id: 2,
            title: "Sample Video 2",
            thumbnailUrl: "https://media.istockphoto.com/id/1130035011/vector/isometric-business-people-came-from-different-way-but-have-same-target.jpg?s=612x612&w=0&k=20&c=vXr7RDpRB49Zgx0VJUg_KxULE3QXE9zNu7dRTxb7vt4=",
            views: 7500,
          },
          // Add more sample videos here
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .video {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  </style>
  