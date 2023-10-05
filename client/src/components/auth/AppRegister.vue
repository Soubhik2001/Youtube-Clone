<template>
    <div class="d-flex flex-column justify-center align-center h-screen mx-auto">
      <h4 class="ma-4">Join the World of Videos: Sign Up to Explore!</h4>
      <v-sheet width="400">
        <v-form @submit.prevent="onSubmit">
          <v-text-field label="User Name" variant="outlined" class="font-weight-bold" v-model="username"></v-text-field>
          <v-text-field label="Email Id" variant="outlined" class="font-weight-bold" v-model="email"></v-text-field>
          <v-text-field label="Password" variant="outlined" class="font-weight-bold" v-model="password"></v-text-field>
          <v-btn color="#da4e44" type="submit" block rounded="lg" size="x-large" class="mt-2 font-weight-bold">Register Now</v-btn>
        </v-form>
        <hr class="ma-4">
        <p class="my-4 text-center">Already have an account ? <router-link to="/" style="cursor: pointer; color: #da4e44; "
            class=" text-decoration-underline font-weight-bold">Login
          </router-link></p>
      </v-sheet>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      }
    },
    methods: {
        onSubmit(){
            const credentials = { username: this.username, email: this.email, password: this.password }
          console.log(credentials);
        }
    }
  }
  </script>
  