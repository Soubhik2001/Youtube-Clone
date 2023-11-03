<template>
  <app-header></app-header>
  <v-container class="main">
    <v-row>
      <v-col>
        <h2>Notifications</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-card class="notification">
        <v-row>
          <img
            src="https://yt3.googleusercontent.com/ytc/AOPolaRbWvcPuAZMiqeKn637mEoXt2qZg-z1Aic6mFg=s176-c-k-c0x00ffffff-no-rj"
            alt="Profile picture"
            class="profile-pic"
          />
          <div class="notification-content">
            <p>Soubhik liked the video.</p>
            <p class="created-at">01.01.2000</p>
          </div>
          <div class="remove-button">
            <i class="fas fa-xmark"></i>
          </div>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="notification">
        <v-row>
          <img
            src="https://yt3.googleusercontent.com/ytc/AOPolaRbWvcPuAZMiqeKn637mEoXt2qZg-z1Aic6mFg=s176-c-k-c0x00ffffff-no-rj"
            alt="Profile picture"
            class="profile-pic"
          />
          <div class="notification-content">
            <p>Soubhik liked the video.</p>
            <p class="created-at">01.01.2000</p>
          </div>
          <div class="remove-button">
            <i class="fas fa-xmark"></i>
          </div>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="notification">
        <v-row>
          <img
            src="https://yt3.googleusercontent.com/ytc/AOPolaRbWvcPuAZMiqeKn637mEoXt2qZg-z1Aic6mFg=s176-c-k-c0x00ffffff-no-rj"
            alt="Profile picture"
            class="profile-pic"
          />
          <div class="notification-content">
            <p>Soubhik liked the video.</p>
            <p class="created-at">01.01.2000</p>
          </div>
          <div class="remove-button">
            <i class="fas fa-xmark"></i>
          </div>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="notification">
        <v-row>
          <img
            src="https://yt3.googleusercontent.com/ytc/AOPolaRbWvcPuAZMiqeKn637mEoXt2qZg-z1Aic6mFg=s176-c-k-c0x00ffffff-no-rj"
            alt="Profile picture"
            class="profile-pic"
          />
          <div class="notification-content">
            <p>Soubhik liked the video.</p>
            <p class="created-at">01.01.2000</p>
          </div>
          <div class="remove-button">
            <i class="fas fa-xmark"></i>
          </div>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import AppHeader from "../common/AppHeader.vue";
export default {
  components: {
    AppHeader,
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
  width:100%;
  min-height:80px;
  
}
.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 40px;
  margin-left:10px;
}

.notification-content {
  flex: 1;
}

.created-at {
  font-size: 12px;
  color: #888;
  text-align: right;

}
.remove-button {
  margin-top: auto;
  margin-bottom: auto;
  margin-right:20px;
  margin-left:20px;
}
.notification-content p {
  margin: 0;
  font-size: 16px;
  color: #333;
}
</style>
