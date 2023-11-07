<template>
  <app-header></app-header>
  <v-container class="main">
    <v-row>
      <v-col>
        <h2>Notifications</h2>
      </v-col>
    </v-row>
    <v-row v-for="notification in notifications" :key="notification.id">
      <v-card class="notification">
        <v-row>
          <img
            :src="notification.notify_from_profile_pic"
            alt="Profile picture"
            class="profile-pic"
          />
          <div class="notification-content">
            <p class="content">
              {{ generateNotificationContent(notification) }}
            </p>
            <p class="created-at">
              {{ formattedCommentDate(notification.created_at) }}
            </p>
          </div>
          <img
            :src="getThumbnailOrChannelPic(notification)"
            alt="Profile picture"
            class="thumbnail"
          />
          <div class="remove-button" @click="removeNotification(notification.id)">
            <i class="fas fa-xmark"></i>
          </div>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axiosInstance from "@/axiosInstance";
import AppHeader from "../common/AppHeader.vue";
import socketioService from "@/services/socketio.service";
export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    async fetchNotifications() {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/notification/getNotification"
        );
        console.log(response);
        if (response.status === 200) {
          this.notifications = response.data.results;
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async removeNotification(notificationId) {
      try {
        const response  = await axiosInstance.delete(
          `http://localhost:3000/notification/deleteNotification/${notificationId}`
        );
        if (response.status === 200) {
          this.notifications = this.notifications.filter(
            (notification) => notification.id !== notificationId
          );
        }else{
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    generateNotificationContent(notification) {
      switch (notification.type) {
        case "like":
          return `${notification.notify_from_username} liked your video.`;
        case "dislike":
          return `${notification.notify_from_username} disliked your video.`;
        case "subscribe":
          return `${notification.notify_from_username} subscribed to your channel.`;
        case "comment":
          return `${notification.notify_from_username} commented on your video.`;
        default:
          return "New notification";
      }
    },
    getThumbnailOrChannelPic(notification){
      return notification.type === 'subscribe' ? notification.channel_pic : notification.video_thumbnail;
    },
  },
  computed: {
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
  created() {
    this.fetchNotifications();
    const socket = socketioService.getSocket();
    socket.on('newNotifications',()=>{
      this.fetchNotifications();
    })
  },
};
</script>

<style scoped>
.main {
  padding-left: 100px;
  padding-top: 100px;
}
.notification {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 80%;
  min-height: 80px;
  transition: transform 0.2s;
}
.notification:hover {
  transform: scale(1.02);
}
.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 40px;
  margin-left: 10px;
}

.notification-content {
  flex: 1;
}

.created-at {
  font-size: 12px;
  color: #646464;
}
.remove-button {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 20px;
  margin-left: 20px;
  transition: transform 0.2s;
}
.remove-button:hover {
  transform: scale(1.2);
}
.content {
  margin: 0;
  font-size: 16px;
  color: #1b1b1b;
}
.thumbnail {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
