<template>
    <app-header></app-header>
  <v-container class="main">
    <h2 class="explore-channels-heading">Subscribed Channels</h2>
    <br />
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
          <v-card-subtitle>{{ card.subscribers }} Subscribers</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppHeader from '../common/AppHeader.vue';
export default {
    components:{
        AppHeader
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
.explore-channels-heading {
  padding-top: 100px;
}
.main{
    padding-left:90px;
}
</style>
