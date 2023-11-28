<template>
  <div class="d-flex flex-column justify-center align-center h-screen mx-auto">
    <h4 class="ma-4">Join the World of Videos: Sign Up to Explore!</h4>
    <v-sheet width="400">
      <v-form @submit.prevent>
        <v-text-field
          label="User Name"
          variant="outlined"
          class="font-weight-bold"
          :rules="usernameRules"
          style="padding-top: 20px"
          v-model="username"
        ></v-text-field>
        <v-text-field
          label="Email Id"
          variant="outlined"
          class="font-weight-bold"
          :rules="emailRules"
          style="padding-top: 20px"
          v-model="email"
        ></v-text-field>
        <v-text-field
          label="Password"
          variant="outlined"
          class="font-weight-bold"
          :rules="passwordRules"
          style="padding-top: 20px"
          v-model="password"
        ></v-text-field>
        <v-btn
          color="#da4e44"
          type="submit"
          block
          rounded="lg"
          size="x-large"
          class="mt-2 font-weight-bold"
          @click="register"
          >Register Now</v-btn
        >
      </v-form>
      <hr class="ma-4" />
      <p class="my-4 text-center">
        Already have an account ?
        <router-link
          to="/"
          style="cursor: pointer; color: #da4e44"
          class="text-decoration-underline font-weight-bold"
          >Login
        </router-link>
      </p>
    </v-sheet>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      showAlert: false,
      passwordRules: [
        (value) => !!value || "You must enter a password",
        (value) => value.length >= 6 || "The password must be atleast 6 characters long",
      ],
      usernameRules: [
        (value) => !!value || "You must enter a username",
        (value) => value.length >=3 || "The username must be atleast 3 characters long",
      ],
      emailRules: [
        (value) => !!value || "You must enter an email",
        (value) => /.+@.+\..+/.test(value) || "Enter a valid email address",
      ],
    };
  },
  methods: {
    async register() {
      const apiUrl = "http://localhost:3000/auth/register";

      const registrationData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      try {
        const response = await axios.post(apiUrl, registrationData);
        if (response.status === 200) {
          const data = response.data;
          // console.log("Registration successful", data);
          this.$toast.open({
            message: "Registered successfully",
            type: "success",
          });
          this.$router.push("/");
        } else {
          this.$toast.open({
            message: "Registration unsuccessful",
            type: "error",
          });
          throw new Error("Registration failed");
        }
      } catch (error) {
        this.$toast.open({
          message: "Registration unsuccessful",
          type: "error",
        });
      }
    },
  },
};
</script>
