<template>
  <app-header></app-header>
  <v-row justify="center" style="padding-top: 100px">
    <v-dialog v-model="dialog" persistent width="800">
      <template v-slot:activator="{ props }">
        <v-container class="channel-creation-container">
          <h2 class="create-channel-heading">Create your Channel</h2>
          <p class="create-channel-description">
            Fill in the details to create your channel.
          </p>
          <v-btn
            v-bind="props"
            style="margin: 20px; background-color: #da4e44; color: #ffffff"
            class="font-weight-bold"
          >
            Create Channel
          </v-btn>
          <hr style="border-top: 1px solid #dad5d5" />
          <h2 class="explore-channels-heading">Explore channels</h2>
          <br />
          <v-row>
            <v-col
              v-for="(card, index) in cards"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            ><router-link :to="{name: 'channel-info',  params: { channelId: card.id }}" style="text-decoration: none;">
              <v-card
                class="video-card"
                :class="{ 'card-hover': isHovered === index }"
                @mouseover="isHovered = index"
                @mouseout="isHovered = null"
              >
                <v-img
                  :src="card.channel_pic_url"
                  aspect-ratio="16/9"
                  height="200"
                  cover
                ></v-img>
                <v-card-title>{{ card.channel_name }}</v-card-title>
                <v-card-subtitle
                  >{{ card.subscriber_count }} Subscribers</v-card-subtitle
                >
              </v-card>
            </router-link>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Channel</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                v-model="channelName"
                label="Channel name*"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-textarea
                v-model="description"
                label="Channel description"
                required
              ></v-textarea>
            </v-row>
            <v-row>
              <v-text-field
                v-model="channel_pic_url"
                label="Channel thumbnail url*"
                required
                prepend-icon="fas fa-camera"
              ></v-text-field>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-lighten-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="red-lighten-1" variant="text" @click="saveChannel">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// import axios from "axios";
import AppHeader from "../common/AppHeader.vue";
import axiosInstance from "@/axiosInstance";

export default {
  components: {
    AppHeader,
  },
  data: () => ({
    dialog: false,
    cards: [],
    isHovered: null,
    channelName: "",
    description: "",
    channel_pic_url: "",
  }),
  methods: {
    async getChannels() {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/user/getAllChannels"
        );

        // console.log(response);
        if (response.status === 200) {
          this.cards = response.data.channelResults;
        } else {
          console.log("Failed to fetch channels");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async saveChannel() {
      const data = {
        channelName: this.channelName,
        description: this.description,
        channel_pic_url: this.channel_pic_url,
      };

      try {
        const response = await axiosInstance.post(
          "http://localhost:3000/channel/add",
          data
        );

        if (response.status === 200) {
          this.dialog = false;
          this.getChannels();
          this.channelName = "";
          this.description = "";
          this.channel_pic_url = "";
          // console.log("Channel created successfully");
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getChannels();
  },
};
</script>

<style scoped>
.channel-creation-container {
  text-align: center;
  padding: 20px;
  padding-left: 100px;
}

.create-channel-heading {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.create-channel-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.explore-channels-heading {
  font-size: 24px;
  margin-top: 40px;
}
.video-card {
  background: #f1f1f1;
  border-radius: 15px;
  padding: 10px 10px;
  transition: transform 0.5s ease-in-out;
}

.card-hover {
  transform: scale(1.05);
}
</style>
