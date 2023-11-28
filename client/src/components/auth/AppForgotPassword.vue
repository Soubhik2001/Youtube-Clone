<template>
  <div class="d-flex flex-column justify-center align-center h-screen mx-auto">
    <h4 class="ma-4">Forgot Password ?</h4>
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :rules="emailRules"
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
import axiosInstance from '@/axiosInstance';

export default {
  data() {
    return {
      isClicked: false,
      email: "",
      emailRules: [
        (value) => !!value || "You must enter an email",
        (value) => /.+@.+\..+/.test(value) || "Enter a valid email address",
      ],
    };
  },
  methods: {
    async onSubmit() {
      this.isClicked = true;

      try {
        const response = await axiosInstance.post("",{email: this.email});

        if(response.status === 200){
          console.log("Reset mail sent");
        } else{
          console.log("Failed to send reset mail");
        }
      } catch (error) {
        console.error("An error occured", error);
      }
    },
  },
};
</script>
