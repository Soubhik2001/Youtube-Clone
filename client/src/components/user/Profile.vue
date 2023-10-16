<template>
  <div>
    <app-header></app-header>
  </div>
  <v-container style="padding-top: 100px">
    <h1 class="text-center" style="margin: 20px">Profile</h1>

    <v-form>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-text-field v-model="email" label="Email"></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-text-field v-model="username" label="Username"></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
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
      </v-row>
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
      passwordVisible: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async fetchUserProfile() {
      try {
        const response = await axiosInstance.get('http://localhost:3000/user/getProfile');

        if (response.status === 200) {
          const userData = response.data.results;
          console.log(userData);

          this.username = userData[0].username;
          this.email = userData[0].email;
        } else {
          console.log('Failed to fetch user data');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateProfile() {
      try {
        const updatedData ={
          email: this.email,
          username: this.username,
          password: this.password,
        };

        const response = await axiosInstance.patch('http://localhost:3000/user/updateProfile', updatedData);
        if(response.status === 200){
          console.log('Profile updated successfully.');
        }else{
          console.log('Failed to update profile');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchUserProfile();
    console.log(this.email, this.username, this.password);
  },
};
</script>

<style scoped>
</style>
