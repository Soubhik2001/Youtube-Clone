<template>
  <div>
    <app-header></app-header>
  </div>
  <v-container style="padding-top: 100px">
    <h1 class="text-center" style="margin: 20px">Profile</h1>
    <div class="text-center" style="margin: 10px">
      <img
        v-if="user_pic_url"
        class="profile-pic"
        :src="user_pic_url"
        alt="Profile Picture"
        @error="handleImageError"
      />
    </div>
    <v-form>
      <div v-if="showAlert">
        <v-row justify="center">
          <v-col cols="12" sm="6">
            <v-alert
              :color="alertColor"
              :title="alertTitle"
              :text="alertText"
              :icon="alertIcon"
              :value="showAlert"
            ></v-alert>
          </v-col>
        </v-row>
      </div>

      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="email"
            label="Email"
            style="padding-top: 20px"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-text-field v-model="username" label="Username"></v-text-field>
        </v-col>
      </v-row>
      <!-- <v-row justify="center">
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="password"
            :type="passwordVisible ? 'text' : 'password'"
            label="Password"
          ></v-text-field>
        </v-col>
        <v-col cols="1" class="eye-icon">
          <v-btn icon @click="togglePasswordVisibility">
            <v-icon>{{
              passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"
            }}</v-icon>
          </v-btn>
        </v-col>
      </v-row> -->
      <v-row justify="center">
        <v-btn
          style="background-color: #da4e44; color: #ffffff"
          class="font-weight-bold"
          @click="updateProfile"
          >Update</v-btn
        >
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axiosInstance from "@/axiosInstance";
import AppHeader from "../common/AppHeader.vue";
// import axios from "axios";

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
      user_pic_url: null,
      passwordVisible: false,
      showAlert: false,
      alertColor: "",
      alertTitle: "",
      alertText: "",
      alertIcon: "",
    };
  },
  methods: {
    handleImageError() {
      console.log("Error loading image:", this.user_pic_url);
    },
    // togglePasswordVisibility() {
    //   this.passwordVisible = !this.passwordVisible;
    // },

    //fetch the Info of the logged-in user
    async fetchUserProfile() {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/user/getProfile"
        );

        if (response.status === 200) {
          const userData = response.data.results;
          console.log(userData);

          this.username = userData[0].username;
          this.email = userData[0].email;
          this.user_pic_url = userData[0].user_pic_url;

          // Store the original user data for comparison
          this.originalUserData = {
            email: userData[0].email,
            username: userData[0].username,
          };
        } else {
          console.log("Failed to fetch user data");
        }
      } catch (error) {
        console.log(error);
      }
    },

    //send the updated info of the logged-in user to the server
    async updateProfile() {
      const data = {
        email: this.email,
        username: this.username
      };
      try {
        const response = await axiosInstance.patch(
          "http://localhost:3000/user/updateProfile",
          data
        );

        if (response.status === 200) {
          this.$toast.open({
            message: "Profile updated successfully",
            type: "success",
          });
        
        } else {
        this.$toast.open({
            message: "Failed to update profile",
            type: "error",
          });
      }
      } catch (error) {
        this.$toast.open({
            message: "An error occurred while updating your profile",
            type: "error",
          });
      }
    },
  },
  created() {
    this.fetchUserProfile();
    console.log(this.email, this.username);
  },
};
</script>

<style scoped>
.profile-pic {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  object-fit: cover;
}
</style>
