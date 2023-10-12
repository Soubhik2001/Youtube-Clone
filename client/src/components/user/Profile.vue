<template>
  <div>
    <app-header></app-header>
  </div>
  <v-container class="centererd-container" style="padding-top: 100px;">
    <h1 class="text-center" style="margin:20px">Profile</h1>

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
          <v-btn
            icon
            @click="togglePasswordVisibility"
          >
            <v-icon>{{ passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye' }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn style="background-color:#da4e44;color:#ffffff;" class="font-weight-bold" @click="updateProfile">Update</v-btn>
      </v-row>
    </v-form>
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
      email: "", // User's email
      username: "", // User's username
      password: "", // User's password
      passwordVisible: false, // Toggles password visibility
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    updateProfile() {
      // Handle updating the user's profile here
      // You can make an API request or perform any necessary actions
    },
  },
};
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 100% of the viewport height */
}
</style>
