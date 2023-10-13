<template>
  <div class="d-flex flex-column justify-center align-center h-screen mx-auto">
    <h4 class="ma-4">Join the World of Videos: Sign Up to Explore!</h4>
    <v-sheet width="400">
      <v-form @submit.prevent>
        <div v-if="showAlert">
          <v-alert
            color="red-accent-4"
            icon="fas fa-exclamation"
            title="Invalid registration data"
            text="Username should be more than 3 letters long.
                  Password should be more than 6 letters long.
                  Email should be valid"
            :value="showAlert"
          ></v-alert>
        </div>
        <v-text-field
          label="User Name"
          variant="outlined"
          class="font-weight-bold"
          style="padding-top: 20px;"
          v-model="username"
        ></v-text-field>
        <v-text-field
          label="Email Id"
          variant="outlined"
          class="font-weight-bold"
          v-model="email"
        ></v-text-field>
        <v-text-field
          label="Password"
          variant="outlined"
          class="font-weight-bold"
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
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      showAlert: false,
    };
  },
  methods: {
    // onSubmit(){
    //     const credentials = { username: this.username, email: this.email, password: this.password }
    //   console.log(credentials);
    // },
    async register() {
      const apiUrl = "http://localhost:3000/auth/register";

      const registrationData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Registration successful", data);
          this.$router.push("/");
        } else {
          this.showAlert = true;
          throw new Error("Registration failed");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
