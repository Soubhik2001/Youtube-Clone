<template>
  <app-header></app-header>
  <v-row justify="center" style="padding-top: 100px;">
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
          <br>
          <v-row>
            <v-col
              v-for="(card, index) in cards"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card
                class="video-card"
                :class="{ 'card-hover': isHovered === index }"
                @mouseover="isHovered = index"
                @mouseout="isHovered = null"
              >
                <v-img
                  :src="card.profile"
                  aspect-ratio="16/9"
                  height="200"
                  cover
                ></v-img>
                <v-card-title>{{ card.channelName }}</v-card-title>
                <v-card-subtitle
                  >{{ card.subscribers }} Subscribers</v-card-subtitle
                >
              </v-card>
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
              <v-text-field label="Channel name*" required></v-text-field>
            </v-row>
            <v-row>
              <v-textarea label="Channel description" required></v-textarea>
            </v-row>
            <v-row>
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                label="Channel Thumbnail*"
                required
                variant="filled"
                prepend-icon="fas fa-camera"
              ></v-file-input>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-lighten-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="red-lighten-1" variant="text" @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AppHeader from "../common/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
  data: () => ({
    dialog: false,
    cards: [
      {
        profile:
          "https://yt3.googleusercontent.com/UlKrbeZ4Xz79DUbEbF3FvC0FQ4A_cvpIIzhJQ_wigP8CL_Xf_WF-ryYrrtGpqpD9WzAplsUz=s176-c-k-c0x00ffffff-no-rj",
        channelName: "Hyperplexed",
        subscribers: "637k",
      },
      {
        profile:
          "https://yt3.googleusercontent.com/tWGVfHXn5SaAsw-7livA-p-Db6VrWKtLESCqIaR0Gw6cMN47dhUWt3nMPYcoF7ueZBDsUq4atg=s176-c-k-c0x00ffffff-no-rj",
        channelName: "Benny Productions",
        subscribers: "11M",
      },
      {
        profile:
          "https://yt3.googleusercontent.com/ytc/AOPolaS101j27Disa_BYArytv-hXMRl8wNMtqZMTkrfH=s176-c-k-c0x00ffffff-no-rj",
        channelName: "Web Dev Simplified",
        subscribers: "1.2M",
      },
      {
        profile:
          "https://yt3.googleusercontent.com/okRlBwXJN68DuPhHs_AaMlOHVwfnHWEL7is5lV3RTyYlJSDvOy58-q-OyCm5bSOU71csOHyaKQ=s176-c-k-c0x00ffffff-no-rj",
        channelName: "Corridor Crew",
        subscribers: "6.7M",
      },
    ],
  }),
};
</script>

<style scoped>
.channel-creation-container {
  text-align: center;
  padding: 20px;
  padding-left:100px;
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

</style>