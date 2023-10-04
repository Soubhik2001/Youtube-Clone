<template>
  <div class="d-flex flex-column justify-center align-center h-screen mx-auto">
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :rules="rules"
          label="Email"
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
    <div v-if="isClicked">
      <v-alert
        color="success"
        icon="$success"
        title="Link to reset password sent successfully..."
        text="The link to reset password is sent successfully to your registered email password."
      ></v-alert>
    </div>
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
