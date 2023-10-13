<template>
  <div class="d-flex flex-column justify-center align-center h-screen mx-auto">
    <h4 class="ma-4">Welcome Back! Sign In to Dive into Videos</h4>
    <v-sheet min-width="250" max-width="400" class="w-50">
      <v-form @submit.prevent>
        <div v-if="showAlert">
          <v-alert
            color="red-accent-4"
            icon="fas fa-exclamation"
            title="Invalid credentials"
            text="Check your credentials"
            :value="showAlert"
          ></v-alert>
        </div>

        <v-text-field
          type="email"
          label="Email"
          variant="outlined"
          class="font-weight-bold"
          style="padding-top: 20px"
          v-model="email"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          variant="outlined"
          class="font-weight-bold"
          v-model="password"
          autocomplete="false"
        ></v-text-field>
        <v-btn
          color="#da4e44"
          type="submit"
          block
          rounded="lg"
          size="x-large"
          class="mt-2 font-weight-bold text-decoration-none"
          @click="login"
          >Login</v-btn
        >
      </v-form>
      <p class="my-4 text-center">
        or
        <router-link to="/forgot"
          ><a
            style="cursor: pointer; color: #da4e44"
            class="text-decoration-underline font-weight-bold"
            >Forgot Password</a
          ></router-link
        >
      </p>
      <hr />
      <p class="my-4 text-center">
        Don't have an account ?
        <router-link
          to="/register"
          style="cursor: pointer; color: #da4e44"
          class="text-decoration-underline font-weight-bold"
          >Sign up
        </router-link>
      </p>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showAlert: false,
    };
  },
  methods: {
    // onSubmit() {
    //   const credentials = { email: this.email, password: this.password };
    //   console.log(credentials);
    // },
    async login() {
      const apiUrl = "http://localhost:3000/auth/login";
      const credentials = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.token);
          console.log("Login successful", data);
          this.$router.push("/home");
        } else {
          this.showAlert = true;
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
