<template>
  <div class="d-flex flex-column justify-center align-center h-screen mx-auto">
    <h4 class="ma-4">Forgot Password?</h4>
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :rules="rules"
          label="Email"
          variant="outlined"
          class="font-weight-bold"
        ></v-text-field>
        <v-btn
          color="#da4e44"
          type="submit"
          block
          rounded="lg"
          size="x-large"
          class="mt-2 font-weight-bold"
          >Reset Password</v-btn
        >
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClicked: false,
      email: "",
      rules: [
        (value) => {
          if (value) return true;

          return "You must enter a email.";
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.isClicked = true;
    },
  },
};
</script>
